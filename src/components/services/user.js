import axios from 'axios';
import { appendAuthToken } from './auth';

// const apiEndpoint = "http://localhost:3900/api/customers";
const apiEndpoint = "http://localhost:3000/api/v1/customers";

export const register = async (user) => {
    const { data } = await axios.post(apiEndpoint, {
        username: user.username,
        password: user.password,
        name: user.name,
        address: user.address
    })
    return data
}

export const getUser = async (userId) => {
    const { data } = await axios.get(apiEndpoint + '/' + userId, appendAuthToken())
    return data
}



// export const getCurrentUser = async () => {
//     const { data } = await axios.get(apiEndpoint + '/me')
//     return data
// } 