import { post } from './axios';


const API_AUTH_URL = "/customerAuth"

export const login = async (user) => {
    const { data } = await post(API_AUTH_URL, {
        username: user.username,
        password: user.password
    })
    localStorage.setItem("token",data.token)
    return data
}

export function logout() {
    localStorage.removeItem("token");
}

export function loginWithJwt(jwt) {
    localStorage.setItem("token", jwt);
}

export function getJwt() {
    return localStorage.getItem("token")
}

