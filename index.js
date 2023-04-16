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

app.use(cors());
app.use(bodyParser.json());

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

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.pblcd.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
    app.listen(4000);
}).catch(err => {
    console.log(err);
});