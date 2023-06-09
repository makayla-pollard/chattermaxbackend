const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    followers: [
        {
            type: String
        }
    ],
    following: [
        {
            type: String
        }
    ]
});

module.exports = mongoose.model('User', userSchema );