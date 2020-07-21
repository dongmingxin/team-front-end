const mongoose = require('mongoose');
const Joi = require('joi')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    calorie: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        validate: {
            validator: url => !Joi.validate(url, Joi.string().uri()).error,
            msg: 'Invalid url format'
        }
    },

})

const Model = mongoose.model('Pizza', schema)

function validate(pizza) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        price: Joi.number().required(),
        calorie: Joi.string().required(),
    }
    return Joi.validate(pizza, schema);
}

exports.pizzaModel = Model
exports.validate = validate