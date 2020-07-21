const mongoose = require('mongoose');
const Joi = require('joi')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    drinks: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
    ]

})

const Model = mongoose.model('DrinkGenre', schema)

function validate(drinkGenre) {
    const schema = {
        name: Joi.string().min(3).max(50).required()
    }
    return Joi.validate(drinkGenre, schema);
}


exports.drinkGenreModel = Model
exports.validate = validate