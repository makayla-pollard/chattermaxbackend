const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    picture: String
    followers: [String]
    following: [String]
}

type LoginData{
    userId: ID!
    token: String!
    tkExp: Int!
}

type Comment {
    _id: ID!
    commenter: String!
    commentee: String!
    comment: String!
}


input UserInput{
    username: String!
    email: String!
    password: String!
    passConf: String!
    picture: String
}

input CommentInput {
    commenter: String!
    commentee: String!
    comment: String!
}

type RootQuery{
    users: [User!]!
    userByUsername(username: String!): User!
    commentsByCommentee(commentee: String!): [Comment!]!
    login(username: String!, password: String!): LoginData!
}

type RootMutation{
    createUser(userInput: UserInput): User
    editUser(username: String!, newUsername: String!, email: String!): User
    editUserPhoto(username: String!, picture: String!): User
    editUserPassword(username: String!, password: String!, passConf: String!): User
    deleteUser(username: String!): Boolean
    addFollower(username: String!, listHolder: String!): Int
    addFollowing(username: String!, listHolder: String!): Int
    deleteFollower(username: String!, listHolder: String!): Int
    deleteFollowing(username: String!, listHolder: String!): Int
    createComment(commentInput: CommentInput): Comment
    deleteComment(id: String!): Boolean
}

schema{
    query: RootQuery
    mutation: RootMutation
}
`)