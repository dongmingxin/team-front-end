import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import '../../../style/layout/menuHeader.scss';
import logo from '../../../img/logo2.png';
import CancelIcon from '@material-ui/icons/Cancel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { getCurrentUser } from '../../services/user';
import { isLoggedIn } from '../../utils/auth';

class NavBar extends Component {
    state = {
        user: '',
        isdropDownListOpen: false
    };

    async componentDidMount() {
        if (isLoggedIn() === false) return;
        const user = await getCurrentUser();
        this.setState({ user });
    }

    handleDropDownList = () => {
        this.setState({ isdropDownListOpen: !this.state.isdropDownListOpen})
    }



    render() { 
        return ( 
            <div className="menuNavbar">
                <div className="menuNavbar__topBarContainer">
                    <div className="menuNavbar__topBarContainer--logo">
                        <img src={logo} alt="logo"/>
                    </div>
                    <div className="menuNavbar__topBarContainer--buttonContainer">
                        <div className="checkOrderButton" onClick={this.handleDropDownList}>
                            <div className="checkOrderButton__title">
                                Check My Order
                            </div>
                            {this.state.isdropDownListOpen &&
                                <CancelIcon className="topBarbuttonStyleSecond" color="error"/>
                            }
                            {!this.state.isdropDownListOpen &&
                                <AccountCircleIcon className="topBarbuttonStyle"/>
                            }
                        </div>
                        {this.state.isdropDownListOpen && 
                            <div className="checkOrderDropdownList">
                                <div className="checkOrderDropdownList__mobileItem">
                                    <NavLink className="checkOrderDropdownList__mobileItem--link" activeClassName="navLinkActive"  to="/pizza">PIZZAS</NavLink>
                                </div>
                                <div className="checkOrderDropdownList__mobileItem">
                                    <NavLink className="checkOrderDropdownList__mobileItem--link" activeClassName="navLinkActive"  to="/sides">SIDES</NavLink>
                                </div>
                                <div className="checkOrderDropdownList__mobileItem">
                                    <NavLink className="checkOrderDropdownList__mobileItem--link" activeClassName="navLinkActive"  to="/drinks">DRINKS</NavLink>
                                </div>
                                <div className="checkOrderDropdownList__mobileItem">
                                    <NavLink className="checkOrderDropdownList__mobileItem--link" activeClassName="navLinkActive"  to="/desserts">DESSERTS</NavLink>
                                </div>
                                {!this.state.user &&
                                    <Fragment>
                                        <div className="checkOrderDropdownList__item">
                                            <NavLink className="checkOrderDropdownList__item--link" activeClassName="navLinkActive"  to="/login">LOGIN</NavLink>
                                        </div>
                                        <div className="checkOrderDropdownList__item">
                                            <NavLink className="checkOrderDropdownList__item--link" activeClassName="navLinkActive"  to="/register">REGISTER</NavLink>
                                        </div>
                                    </Fragment>
                                }
                                <div className="checkOrderDropdownList__item">
                                    <NavLink className="checkOrderDropdownList__item--link" activeClassName="navLinkActive"  to="/track">TRACK ORDER</NavLink>
                                </div>
                                {this.state.user &&
                                    <Fragment>
                                        <div className="checkOrderDropdownList__item">
                                            <NavLink className="checkOrderDropdownList__item--link" activeClassName="navLinkActive"  to="/cart">MY ORDERS</NavLink>
                                        </div>
                                        <div className="checkOrderDropdownList__item">
                                            <NavLink className="checkOrderDropdownList__item--link" activeClassName="navLinkActive"  to="/logout">LOGOUT</NavLink>
                                        </div>
                                    </Fragment>
                                }
                            </div>                        
                        }
                    </div>
                </div>
                <div className="menuNavbar__navigationBarContainer">
                    <div className="menuNavbar__link">
                        <ul>
                            <li><NavLink className="item" activeClassName="navLinkActive"  to="/pizza">PIZZAS</NavLink></li>
                            <li><NavLink className="item" activeClassName="navLinkActive" to="/sides">SIDES</NavLink></li>
                            <li><NavLink className="item" activeClassName="navLinkActive" to="/drinks">DRINKS</NavLink></li>
                            <li><NavLink className="item" activeClassName="navLinkActive" to="/desserts">DESSERTS</NavLink></li>
                            {this.state.user && (
                                <li><NavLink className="item" activeClassName="navLinkActive" to="/cart">MY ORDER</NavLink></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default NavBar;