import axios from 'axios';

// const cartUrl = "http://localhost:3900/api/carts";
const cartUrl = "http://localhost:3000/api/v1/carts";

export const addProductToCart = async (cartId, data) => {
    await axios.post(cartUrl + '/' + cartId + '/order', data)
}

export const deleteProductFromCart = async (cartId, orderId) => {
    await axios.delete(cartUrl + '/' + cartId + '/order' + '/' + orderId)
}