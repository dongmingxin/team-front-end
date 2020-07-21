const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const Model = mongoose.model('Mail', schema)

exports.inboxMailSchema = schema
exports.inboxMailModel = Model