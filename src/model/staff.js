const mongoose = require('mongoose');
const Joi = require('joi');
const {inboxMailSchema} = require('./inboxMail')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        minlength: 3,
        maxlength: 20,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    inboxMails: [inboxMailSchema],
    avatar:{
        type: String,
        validate: {
            validator: url => !Joi.validate(url, Joi.string().uri()).error,
            msg: 'Invalid url format'
        }
    },
    isAdmin: Boolean
})

const Model = mongoose.model('Staff', schema)

function validate(staff) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.number().required(),
        username: Joi.string().required(),
        password: Joi.string().min(5).max(50).required()
    }
    return Joi.validate(staff, schema);
}

exports.staffModel = Model
exports.validate = validate