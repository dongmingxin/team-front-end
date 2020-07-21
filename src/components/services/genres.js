import axios from 'axios';

// const pizzaUrl = "http://localhost:3900/api/pizzaGenres";
// const drinkUrl = "http://localhost:3900/api/drinkGenres";
// const dessertUrl = "http://localhost:3900/api/dessertGenres";
// const sideUrl = "http://localhost:3900/api/sideGenres"; 
const pizzaUrl = "http://localhost:3001/api/v1/pizzaGenres";
const drinkUrl = "http://localhost:3001/api/v1/drinkGenres";
const dessertUrl = "http://localhost:3001/api/v1/dessertGenres";
const sideUrl = "http://localhost:3001/api/v1/sideGenres";


export const getAllPizzaGenre = async () => {
    const { data } = await axios.get(pizzaUrl)
    return data
}

export const getAllDessertGenres = async () => {
    const { data } = await axios.get(dessertUrl)
    return data
}

export const getAllSideGenres = async () => {
    const { data } = await axios.get(sideUrl);
    return data
}


export const getAllDrinkGenres = async () => {
    const { data } = await axios.get(drinkUrl)
    return data
}

