import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getAllPizzaGenre } from '../services/genres';
import { getCurrentUser } from '../services/auth';
import RenderCard from './common/renderCard';
import NavBar from './NavBar/navbar';
import MenuSlider from './slider';
import '../../style/layout/menuBody.scss';
import '../../style/layout/menuContainer.scss';


class MenuPizza extends Component {
    state = {
        pizzaGenres : [],
        isloading: true,
        user: ''
     }

    async componentDidMount() {
        const pizzaGenres = await getAllPizzaGenre();
        const user = await getCurrentUser();
        this.setState({ pizzaGenres, isloading: false, user });
    }

    handleSelect = async (productId) => {
        if(!this.state.user) {
            return this.props.history.push("/login")   
        };
        this.props.history.push(`/product/${productId}`)    
    }
    render() { 
        const { isloading } = this.state;
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
                            <RenderCard 
                                cardList = {pizzaGenre.pizzas}
                                handleSelect = {this.handleSelect}
                            />
                        </div>
                        ))) 
                    }
                </div>
                </div>
         );
    }
}
 
export default MenuPizza;