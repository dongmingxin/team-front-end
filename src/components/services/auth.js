import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getUser } from './user';

const apiEndpoint = "http://localhost:3900/api/auth";

export const login = async (user) => {
    const { data } = await axios.post(apiEndpoint, {
        username: user.username,
        password: user.password
    })
    localStorage.setItem("token",data.token)
    return data
}

export function logout() {
    localStorage.removeItem("token");
}

export async function getCurrentUser() {
    try {
        const jwt = localStorage.getItem("token");
        const userId = jwtDecode(jwt).id;
        const user = await getUser(userId);
        return user;
      } catch (ex) {
          return null
      }
}

export function loginWithJwt(jwt) {
    localStorage.setItem("token", jwt);
}

export function getJwt() {
    return localStorage.getItem("token")
}

export function appendAuthToken(config) {
    const jwtToken = localStorage.getItem("token");
    const Authorization = jwtToken && `Bearer ${jwtToken}`;
    return {...config, headers: { Authorization, ...config.header }};
}
