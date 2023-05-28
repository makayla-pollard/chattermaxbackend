const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commenter: {
        type: String,
        required: true
    },
    commentee:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comment', commentSchema );