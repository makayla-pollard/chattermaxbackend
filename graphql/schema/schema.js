const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    picture: String
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
    passConf:String!
    picture: String
}

type RootQuery{
    users: [User!]!
    userByUsername(username: String!): User!
    login(username: String!, password: String!): LoginData!
}

type RootMutation{
    createUser(userInput: UserInput): User
    editUser(username: String!, newUsername: String!, email: String!, oldPassword: String!, password: String!,passConf: String!, picture: String!): User
    deleteUser(username: String!): Boolean
}

schema{
    query: RootQuery
    mutation: RootMutation
}
`)