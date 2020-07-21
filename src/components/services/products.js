import axios from 'axios';

// const productUrl = "http://localhost:3900/api/products";
const productUrl = "http://localhost:3001/api/v1/products";

export const getProduct = async (productId) => {
    const { data } = await axios.get(productUrl + '/' + productId)
    return data
}