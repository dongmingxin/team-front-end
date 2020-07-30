import { get, post } from './axios';

const API_USER_URL = "/customers";

export const register = async (user) => {
    const { data } = await post(API_USER_URL, {
        username: user.username,
        password: user.password,
        name: user.name,
        address: user.address
    })
    return data
}


export async function getCurrentUser() {
    try {
        const { data } = await get(`${API_USER_URL}/me`)
        return data
    } catch (ex) {
        return null
    }
}
