import axios from 'axios';

const apiEndpoint = "http://localhost:3900/api/drinks";


export const getAllDrink = async () => {
    const { data } = await axios.get(apiEndpoint)
    return data
}
