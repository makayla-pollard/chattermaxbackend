const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const schema = require('./graphql/schema/schema');
const resolvers = require('./graphql/resolvers/resolvers')
const app = express();
app.use(cors());
app.use(bodyParser.json);

app.use('/graphql', graphqlHTTP({
    schema:schema,
    rootValue: resolvers,
    graphiql: true
}));

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
    }@cluster0.pblcd.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
    
    app.listen(4000);
}).catch(err => {
    console.log(err);
});