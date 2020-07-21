import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getAllDessertGenres } from '../services/genres';
import { getCurrentUser } from '../services/auth';
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
        const user = await getCurrentUser();
        this.setState({ dessertGenres, isloading: false, user });
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
                <div className="contentContainer">
                    <NavBar />
                    <MenuSlider />
                    {isloading ? 
                        <CircularProgress className="loadingSpinner"/> : 
                        (this.state.dessertGenres.map(dessertGenre => (
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