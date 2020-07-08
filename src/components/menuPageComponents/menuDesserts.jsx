import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getAllDessert } from '../services/dessert';
import RenderCard from './common/renderCard';
import NavBar from './NavBar/navbar';
import MenuSlider from './slider';
import '../../style/layout/menuBody.scss';
import '../../style/layout/menuContainer.scss';

class MenuDesserts extends Component {
    state = { 
        desserts: [],
        isloading: true
     }
    
    async componentDidMount() {
        const desserts = await getAllDessert();
        this.setState({ desserts, isloading: false });
    }
    render() {
        const {isloading} = this.state; 
        return ( 
            <div className="container">
                <div className="contentContainer">
                    <NavBar />
                    <MenuSlider />
                    <div className="category">
                        <div className="category__title">ALL DESSERTS</div>
                        {isloading ? 
                            <CircularProgress className="loadingSpinner"/> : 
                            <RenderCard cardList={this.state.desserts}/>}
                    </div>
                </div>
            </div> 
         );
    }
}
 
export default MenuDesserts;