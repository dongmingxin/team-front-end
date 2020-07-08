import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getAllPizzaGenre } from '../services/pizzaGenre';
import RenderCard from './common/renderCard';
import NavBar from './NavBar/navbar';
import MenuSlider from './slider';
import '../../style/layout/menuBody.scss';
import '../../style/layout/menuContainer.scss';


class MenuPizza extends Component {
    state = {
        pizzaGenres : [],
        isloading: true
     }

    async componentDidMount() {
        const pizzaGenres = await getAllPizzaGenre();
        this.setState({ pizzaGenres, isloading: false });
    }
    render() { 
        const {isloading} = this.state;
        return (
            <div className="container">
            <div className="contentContainer">
                <NavBar />
                <MenuSlider />
                    {isloading ? 
                        <CircularProgress className="loadingSpinner"/> : 
                        (this.state.pizzaGenres.map(pizzaGenre => (
                        <div className="category" key={pizzaGenre._id}>
                            <div className="category__title">{pizzaGenre.name}</div>
                            <RenderCard cardList = {pizzaGenre.pizzas}/>
                        </div>
                        ))) 
                    }
                </div>
                </div>
         );
    }
}
 
export default MenuPizza;