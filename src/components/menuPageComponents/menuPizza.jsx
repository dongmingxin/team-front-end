import React, { Component, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getAllPizzaGenre } from '../services/genres';
import { getCurrentUser } from '../services/user';
import { isLoggedIn } from '../utils/auth';
import RenderCard from './common/renderCard';
import NavBar from './NavBar/navbar';
import MenuSlider from './slider';
import Footer from '../footer/footer';
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
        this.setState({ pizzaGenres});
        if (!isLoggedIn() === false) {
            const user = await getCurrentUser();
            this.setState({ user });
        };
        this.setState({ isloading: false});
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
            {isloading ? <CircularProgress className="loadingSpinner"/>: 
                (<Fragment>
                    <NavBar />
                    <div className="contentContainer">
                        <MenuSlider />
                        {this.state.pizzaGenres && this.state.pizzaGenres.map(pizzaGenre => (
                            <div className="category" key={pizzaGenre._id}>
                                <div className="category__title">{pizzaGenre.name}</div>
                                <RenderCard 
                                    cardList = {pizzaGenre.pizzas}
                                    handleSelect = {this.handleSelect}
                                />
                            </div>
                            ))
                        }
                        </div>
                    <Footer/>
                </Fragment>)
            }
            </div>
         
         
         );
    }
}
 
export default MenuPizza;