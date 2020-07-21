import React, { Component } from 'react';
import NavBar from './NavBar/navbar';
import TextField from '@material-ui/core/TextField';
import { getCurrentUser } from '../services/auth';
import { deleteProductFromCart } from '../services/cart'
import RenderOrderCard from './common/renderOrderCard'
import '../../style/layout/menuBody.scss';
import '../../style/layout/menuContainer.scss';
import '../../style/layout/order.scss';

class MenuCart extends Component {
    state = { 
        user: '',
        orders: [],
        totalPrice: '',
     }

    async componentDidMount() {
        const user = await getCurrentUser();
        this.setState({ user, orders: user.userCart.orders, totalPrice: user.userCart.totalPrice });
    }

    handleRemove = async (productId) => {
        const cartId = this.state.user.userCart._id;
        await deleteProductFromCart(cartId, productId);
        window.location.reload();
    }

    isCartEmpty = () => {
        const { orders, user } = this.state
        if (user && 
            !orders.length
            ) return true;
        return false
    }

    render() {
        const { orders, totalPrice } = this.state
        return ( 
            <div className="container">
                <div className="contentContainer">
                    <NavBar />
                    <div className="order">
                        <div className="order__voucher">
                            <div className="order__voucher--container">
                                <div className="order__voucher--title">
                                    ENTER VOUCHER CODE HERE
                                </div>
                                <div className="order__voucher--input">
                                    <TextField 
                                        label="Voucher" 
                                        variant="outlined"
                                        size="small"
                                        fullWidth 
                                        />
                                </div>
                            </div>
                        </div>
                        <div className="order__details">
                            <div className="order__details--title">Order Details</div>
                            <RenderOrderCard cardList={orders} handleRemove={this.handleRemove}/>
                        </div>
                        { this.isCartEmpty() &&
                            <div className="order__message">
                                <div>Your Cart is Empty</div>
                            </div>
                        }
                        { !this.isCartEmpty() &&
                            <div className="order__totalPrice">
                                <div>TOTAL</div>
                                <div>{`$${totalPrice}`}</div>
                            </div>
                        }
                        <div className="order__submit">
                            { !this.isCartEmpty() &&
                                <button>Next</button>
                            }
                        </div>
                    </div>
                </div>
            </div> 
         );
    }
}
 
export default MenuCart;