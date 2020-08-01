import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../utils/auth';

// axios.defaults.baseURL = "http://localhost:3000/api/v1";
// axios.defaults.baseURL = "https://tranquil-ocean-01454.herokuapp.com/api/v1";
axios.defaults.baseURL = "http://margarita-env.eba-9dxd2kxg.us-east-2.elasticbeanstalk.com/api/v1";

const appendAuthToken = config => {
    const jwtToken = getToken();
    const Authorization = jwtToken && `Bearer ${jwtToken}`;

    return { ...config, headers: { Authorization, ...config.header } };
};

axios.interceptors.response.use(null, error=>{
    const expectedError = 
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        toast.error("An unexpected error occurred.");
    }
    return Promise.reject(error);
})

export const get = (url, config = {}) =>
    axios.get(url, appendAuthToken(config));

export const post = (url, data, config = {}) =>
    axios.post(url, data, appendAuthToken(config));

export const put = (url, data, config = {}) =>
    axios.put(url, data, appendAuthToken(config));

export const del = (url, config = {}) =>
    axios.delete(url, appendAuthToken(config));


