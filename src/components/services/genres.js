import { get } from './axios';
import { toast } from 'react-toastify'

const API_PIZZA_GENRE_URL = "/pizzaGenres";
const API_DRINK_GENRE_URL = "/drinkGenres";
const API_DESSERT_GENRE_URL = "/dessertGenres";
const API_SIDE_GENRE_URL = "/sideGenres";


export const getAllPizzaGenre = async () => {
    try {
        const { data } = await get(API_PIZZA_GENRE_URL)
        return data       
    } catch (ex) {
        toast.error("Failed to load pizzas")    
    }
}

export const getAllDessertGenres = async () => {
    try {
        const { data } = await get(API_DESSERT_GENRE_URL)
        return data      
    } catch (ex) {
        toast.error("Failed to load desserts")
    }
}

export const getAllSideGenres = async () => {
    try {
        const { data } = await get(API_SIDE_GENRE_URL);
        return data
    } catch (ex) {
        toast.error("Failed to load sides")
    }   
}


export const getAllDrinkGenres = async () => {
    try {
        const { data } = await get(API_DRINK_GENRE_URL)
        return data     
    } catch (ex) {
        toast.error("Failed to load drinks")
    }
}

