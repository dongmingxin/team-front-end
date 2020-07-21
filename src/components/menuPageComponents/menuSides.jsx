import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import RenderCard from './common/renderCard';
import { getAllSideGenres } from '../services/genres';
import { getCurrentUser } from '../services/auth';
import NavBar from './NavBar/navbar';
import MenuSlider from './slider';
import '../../style/layout/menuBody.scss';
import '../../style/layout/menuContainer.scss';

class MenuSides extends Component {
    state = { 
        sideGenres: [],
        isloading: true,
        user: ''
     }
    
    async componentDidMount() {
        // this._isMounted = true;
        const sideGenres = await getAllSideGenres();
        const user = await getCurrentUser();
        this.setState({ sideGenres, isloading: false, user });
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
                        (this.state.sideGenres.map(sideGenre => (
                        <div className="category" key={sideGenre._id}>
                            <div className="category__title">{sideGenre.name}</div>
                            <RenderCard 
                                cardList = {sideGenre.sides}
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
 
export default MenuSides;