import { put, post, del } from './axios';

const API_CART_URL = '/carts';

export const addProductToCart = async (cartId, data) => {
    await post(API_CART_URL + '/' + cartId + '/order', data)
}

export const deleteProductFromCart = async (cartId, orderId) => {
    await del(`${API_CART_URL}/${cartId}/order/${orderId}`)
}

export const deleteAllProductsFromCart = async(cartId) => {
    const { data } = await put(API_CART_URL + '/' + cartId + '/remove');
    return data
} 