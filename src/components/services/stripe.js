import { get, post } from './axios';

const API_STRIPE_URL = "/checkout";

export const addStripe = async (token, price, orders, name) => {
    const { data } = await post(API_STRIPE_URL, {token, price, orders, name})
    return data
}

export const getStripeKey = async () => {
    const { data } = await get(API_STRIPE_URL)
    return data
}
