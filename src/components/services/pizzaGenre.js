import axios from 'axios';

const apiEndpoint = "http://localhost:3900/api/pizzaGenres";


export const getAllPizzaGenre = async () => {
    const { data } = await axios.get(apiEndpoint)
    return data
}

export const getPizzaGenre = async(pizzaGenreId) => {
    const { data } = await axios.get(apiEndpoint + '/' + pizzaGenreId)
    return data
}