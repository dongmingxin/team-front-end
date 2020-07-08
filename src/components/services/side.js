import axios from 'axios';
import { appendAuthToken } from './auth';

const apiEndpoint = "http://localhost:3900/api/sides";


export const getAllSide = async (config={}) => {
    const jwtToken = localStorage.getItem("token");
    const { data } = await axios.get(apiEndpoint);
    return data
}

