import axios from 'axios';

const apiEndpoint = "http://localhost:3900/api/desserts";


export const getAllDessert = async () => {
    const { data } = await axios.get(apiEndpoint)
    return data
}