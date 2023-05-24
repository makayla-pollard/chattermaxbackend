const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const schema = require('./graphql/schema/schema');
const resolvers = require('./graphql/resolvers/resolvers')
const isAuth = require('./middleware/auth')
const app = express();
const axios = require('axios');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
app.use(express.static("public"));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
})

app.use(isAuth)

app.use('/graphql', graphqlHTTP({
    schema:schema,
    rootValue: resolvers,
    graphiql: true
}));

app.get("/", function(req,res){
    
    res.send('Chattermax API')
});

app.post("/createUser", async function(req, res){

    const options = {
        'method' : 'POST',
        'url': 'https://api.chatengine.io/users',
        'headers' : {
            'Private-Key': `${process.env.PRIVATE_KEY}`
        },
        data: {
            username: `${req.body.username}`,
            secret: `${req.body.secret}`
        }
    }

    try{
        const result = await axios(options);
        res.json(result)
    }catch(e){
        res.json(e)
    }

})

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
    }@cluster0.pblcd.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
    
    app.listen(4000);
}).catch(err => {
    console.log(err);
});