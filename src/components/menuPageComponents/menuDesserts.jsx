import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getAllDessertGenres } from '../services/genres';
import { getCurrentUser } from '../services/user';
import { isLoggedIn } from '../utils/auth';
import RenderCard from './common/renderCard';
import NavBar from './NavBar/navbar';
import MenuSlider from './slider';
import '../../style/layout/menuBody.scss';
import '../../style/layout/menuContainer.scss';

class MenuDesserts extends Component {
    state = { 
        dessertGenres: [],
        isloading: true,
        user: ''
     }
    
    async componentDidMount() {
        const dessertGenres = await getAllDessertGenres();
        this.setState({ dessertGenres, isloading: false });
        if (!isLoggedIn()===false) {
            const user = await getCurrentUser();
            this.setState({ user });
        };
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
                <NavBar />
                <div className="contentContainer">
                    <MenuSlider />
                    {isloading ? 
                        <CircularProgress className="loadingSpinner"/> : 
                        (this.state.dessertGenres && this.state.dessertGenres.map(dessertGenre => (
                        <div className="category" key={dessertGenre._id}>
                            <div className="category__title">{dessertGenre.name}</div>
                            <RenderCard 
                                cardList = {dessertGenre.desserts}
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
 
export default MenuDesserts;