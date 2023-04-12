const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

module.exports = {
    users: async () => {
        try{
            const users = await User.find()
            return users.map(user => {
                return {
                    ...user._doc, 
                    _id: user.id};
            })
        }catch(err){
            throw err
        }
    },
    createUser: async args => {
        try{
            const existingUser =  await User.findOne({email: args.userInput.email})
                if(existingUser){
                    throw new Error("Email exists already.")
                }

            const userTwo = await User.findOne({username: args.userInput.username})
                if(userTwo){
                    throw new Error("Username exists already.")
                }
            
            if( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(args.userInput.email) == false){
                throw new Error("Email not valid");
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
            
            const finalUser = new User({
                username: args.userInput.username,
                email: args.userInput.email,
                password: hashedPassword,
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName
            });
            const result = await finalUser.save();
            
            return {...result._doc, password: null, _id: result.id}
        }catch(err){
            throw err;
        }
    
    
    },
    login: async ({username, password}) => {
        const gottenUser = await User.findOne({username: username});
        if(!gottenUser){
            throw new Error('Username does not exist')
        }
        const isPassword = await bcrypt.compare(password, gottenUser.password);
        if(!isPassword){
            throw new Error('Password not correct');
        }
        const token = jwt.sign({userId: gottenUser.id, username: gottenUser.username}, 'secretkey',{
            expiresIn: '1h'
        });

        return {userId: gottenUser.id, token: token, tkExp: 1, username: gottenUser.username}

    },
    userByUsername: async ({username}) => {
        try{
            const user = await User.findOne({username: username});
            return { 
                ...user._doc, 
                _id: user.id
            };
        }catch(err){
            throw err;
        }
    },
    deleteUser: async ({username}) => {
        try{
            let bool = false;
            const deleted = await User.deleteOne({username: username});
            if(deleted.deletedCount == "1"){
                bool = true;
            };
            return bool;
        }catch(err){
            throw err;
        }
    },
}