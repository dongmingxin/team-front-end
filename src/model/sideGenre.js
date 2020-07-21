const mongoose = require('mongoose');
const Joi = require('joi')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sides: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
    ]

})

const Model = mongoose.model('Side', schema)

function validate(sideGenre) {
    const schema = {
        name: Joi.string().min(3).max(50).required()
    }
    return Joi.validate(sideGenre, schema);
}


exports.sideGenreModel = Model
exports.validate = validate