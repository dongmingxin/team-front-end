const {pizzaModel, validate } = require('../model/pizza');


async function getAllPizza(req,res) {
    const pizzas = await pizzaModel.find()
    res.json(pizzas)

}

async function getPizza(req,res) {
    const pizza = await pizzaModel.findById(req.params.id)
    if(!pizza) return res.status(404).json('The Pizza not found');
    return res.json(pizza)
}

async function addPizza(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const {name, price, calorie} = req.body
    const newPizza = new pizzaModel({
        name,
        price,
        calorie
    })
    const result = await newPizza.save()
    res.json(result)
}

async function updatePizza(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {name, price, calorie} = req.body;
    const pizza = await pizzaModel.findByIdAndUpdate(req.params.id, {
        name,
        price,
        calorie
    },{new: true});

    if (!pizza) {
        return res.status(404).json("Pizza is not found")
    };

    return res.json(pizza);
}

async function deletePizza(req,res) {
    const pizza = await pizzaModel.findByIdAndDelete(req.params.id)
    if(!pizza) return res.status(404).json('The pizza  not found');
    return res.json(pizza)
}

async function updateAvatar(req, res) {
    const { id } = req.params;
    const { avatar } = req.body;
    const pizza = await pizzaModel.findByIdAndUpdate(id, {
        avatar
    });
    if(!pizza) {
        return res.status(404).json('Image missing'); 
    }

    return res.json(pizza)
}

module.exports = {
    getPizza,
    getAllPizza,
    addPizza,
    updatePizza,
    deletePizza,
    updateAvatar
}