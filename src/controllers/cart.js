const { cartModel } = require('../model/cart');
const { orderModel } = require('../model/order');
const { productModel } = require('../model/product');

async function getCart(req, res) {
    const cart = await cartModel.findById(req.params.id).populate("user", "-password -__v")
                                                        .populate({
                                                            path: 'orders',
                                                            populate: {
                                                                path: 'productId'
                                                            }
                                                        })
    if(!cart) return res.status(404).json('Your Cart is not found');
    return res.json(cart)
}

async function addCart(req, res) {
    const { user } = req.body
    const newCart = new cartModel({
        user
    })
    const result = await newCart.save()
    res.json(result)
}

async function addOrder(req, res) {
    const cart = await cartModel.findById(req.params.id);
    if(!cart) return res.status(404).json('Your Cart is not found');
    const { quantity, productId} = req.body;
    const product = await productModel.findById(productId)
    if(!product) return res.status(404).json('The Product is not found');
    const totalPrice = Number(product.price * quantity).toFixed(2);
    if(!totalPrice) return res.status(404).json('Cannot calculate the price');
    const newOrder = new orderModel({
        quantity,
        productId,
        totalPrice
    });
    cart.orders.push(newOrder);
    cart.totalPrice += Number(totalPrice)
    cart.save();
    return res.json(newOrder)
}

async function removeOrder(req, res) {
    const { id, orderId } = req.params 
    const cart = await cartModel.findById(id);
    const order = cart.orders.id(orderId);
    if(!order || !cart ) return res.status(404).json('Cart or Order is not found');
    const cartTotalPrice = cart.totalPrice - Number(order.totalPrice)
    cart.totalPrice =  Math.round(cartTotalPrice * 100) / 100
    if (cart.totalPrice < 0 || cart.orders.length == 0) {
        cart.totalPrice = 0
    };
    order.remove();
    cart.save();
    return res.json(order)
}


module.exports = {
    getCart,
    addCart,
    addOrder,
    removeOrder,
}