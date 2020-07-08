import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../../style/layout/menuHeader.scss';
import logo from '../../../img/logo.png';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { getCurrentUser } from '../../services/auth';

class NavBar extends Component {
    state = {
        user: {}
    }

    async componentDidMount() {
        const user = await getCurrentUser();
        this.setState({ user })
    }

    render() { 
        return ( 
            <div className="menuNavbar">
                <div className="menuNavbar__logo">
                    <img src={logo} alt="logo"/>
                </div>
                <div className="menuNavbar__link">
                    <ul>
                        <li><NavLink className="item" activeClassName="navLinkActive"  to="/pizza">PIZZAS</NavLink></li>
                        <li><NavLink className="item" activeClassName="navLinkActive" to="/sides">SIDES</NavLink></li>
                        <li><NavLink className="item" activeClassName="navLinkActive" to="/drinks">DRINKS</NavLink></li>
                        <li><NavLink className="item" activeClassName="navLinkActive" to="/desserts">DESSERTS</NavLink></li>
                        {!this.state.user && (
                        <li className="loginItem">
                            <NavLink className="item" activeClassName="navLinkActive" to="/login">
                                <div className="item__login"><PersonOutlineOutlinedIcon/>LOGIN</div>
                            </NavLink>
                        </li>
                        )}
                        {this.state.user && (
                            <React.Fragment>
                                <li><NavLink className="item" activeClassName="navLinkActive" to="/cart">CART</NavLink></li>
                                <li className="loginItem">
                                    <NavLink className="item" activeClassName="navLinkActive" to="/logout">LOGOUT</NavLink>
                                </li>
                                {this.state.user.isAdmin && (
                                    <li><NavLink className="item" activeClassName="navLinkActive" to="/admin">ADMIN</NavLink></li>
                                )}
                            </React.Fragment>
                        )}
                    </ul>
                </div>
            </div>
         );
    }
}
 
export default NavBar;