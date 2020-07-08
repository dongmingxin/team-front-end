import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import RenderCard from './common/renderCard';
import { getAllDrink } from '../services/drinks';
import NavBar from './NavBar/navbar';
import MenuSlider from './slider';
import '../../style/layout/menuBody.scss';
import '../../style/layout/menuContainer.scss';

class MenuDrinks extends Component {
    state = { 
        drinks: [],
        isloading: true
     }

    async componentDidMount() {
        const drinks = await getAllDrink();
        this.setState({ drinks, isloading: false });
    }
    render() { 
        const {isloading} = this.state;
        return (
            <div className="container">
                <div className="contentContainer">
                    <NavBar />
                    <MenuSlider />
                    <div className="category">
                        <div className="category__title">ALL DRINKS</div>
                        {isloading ? 
                            <CircularProgress className="loadingSpinner"/> : 
                            <RenderCard cardList={this.state.drinks}/>}
                     </div>
                </div>
            </div> 
         );
    }
}
 
export default MenuDrinks;