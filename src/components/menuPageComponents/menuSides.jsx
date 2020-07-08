import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import RenderCard from './common/renderCard';
import { getAllSide } from '../services/side';
import NavBar from './NavBar/navbar';
import MenuSlider from './slider';
import '../../style/layout/menuBody.scss';
import '../../style/layout/menuContainer.scss';

class MenuSides extends Component {
    state = { 
        sides: [],
        isloading: true
     }
    
    async componentDidMount() {
        // this._isMounted = true;
        const sides = await getAllSide();
        this.setState({ sides, isloading: false });
    }
    render() {
        const {isloading} = this.state; 
        return (
            <div className="container">
                <div className="contentContainer">
                    <NavBar />
                    <MenuSlider />
                    <div className="category">
                        <div className="category__title">ALL SIDES</div>
                        {isloading ? 
                            <CircularProgress className="loadingSpinner"/> : 
                            <RenderCard cardList={this.state.sides}/>}
                    </div>
                </div>
            </div> 
         );
    }
}
 
export default MenuSides;