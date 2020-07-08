import axios from 'axios';

const apiEndpoint = "http://localhost:3900/api/users";

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
    const { data } = await axios.get(apiEndpoint + '/' + userId)
    return data
}

export const getCurrentUser = async () => {
    const { data } = await axios.get(apiEndpoint + '/me')
    return data
} 