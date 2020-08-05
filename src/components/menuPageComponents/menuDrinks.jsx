import React, { Component, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import RenderCard from './common/renderCard';
import { getAllDrinkGenres } from '../services/genres';
import { getCurrentUser } from '../services/user';
import { isLoggedIn } from '../utils/auth';
import NavBar from './NavBar/navbar';
import MenuSlider from './slider';
import Footer from '../footer/footer';
import '../../style/layout/menuBody.scss';
import '../../style/layout/menuContainer.scss';

class MenuDrinks extends Component {
    state = { 
        drinkGenres: [],
        isloading: true,
        user: ''
     }

    async componentDidMount() {
        const drinkGenres = await getAllDrinkGenres();
        this.setState({ drinkGenres });
        if (!isLoggedIn()===false) {
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
        const {isloading} = this.state;
        return (
            <div className="container">
                {isloading ? <CircularProgress className="loadingSpinner"/>: 
                    (<Fragment>
                        <NavBar />
                        <div className="contentContainer">
                            <MenuSlider />
                            {this.state.drinkGenres && this.state.drinkGenres.map(drinkGenre => (
                                <div className="category" key={drinkGenre._id}>
                                    <div className="category__title">{drinkGenre.name}</div>
                                    <RenderCard 
                                        cardList = {drinkGenre.drinks}
                                        handleSelect = {this.handleSelect}
                                    />
                                </div>
                            ))} 
                        </div>
                        <Footer/>
                    </Fragment>)
                }
            </div> 
         );
    }
}
 
export default MenuDrinks;