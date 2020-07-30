import { get } from './axios';
import { toast } from 'react-toastify';

const API_PRODUCT_URL = "/products";

export const getProduct = async (productId) => {
    const { data } = await get(API_PRODUCT_URL + '/' + productId)
    return data
}