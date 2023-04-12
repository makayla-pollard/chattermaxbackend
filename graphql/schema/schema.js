const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
    _id: ID!
    username: String!
    email: String!
    password: String
}

type LoginData{
    userId: ID!
    token: String!
    tkExp: Int!
}

input UserInput{
    username: String!
    email: String!
    password:String!
}

type RootQuery{
    users: [User!]!
    userByUsername(username: String!)
    login(username: String!, password: String!): LoginData!
}

type RootMutation{
    createUser(userInput: UserInput): User
    deleteUser(username: String!): Boolean
}

schema{
    query: RootQuery
    mutation: RootMutation
}
`)