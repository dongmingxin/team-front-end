import { get } from './axios';

const API_PAIDORDER_URL = "/paidOrder";

export async function getOrder(id) {
    const { data } = await get(`${API_PAIDORDER_URL}/${id}`)
    return data
}