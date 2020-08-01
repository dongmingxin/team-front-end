import React, { Component, Fragment } from 'react';
import NavBar from './NavBar/navbar';
import TextField from '@material-ui/core/TextField';
import { getCurrentUser } from '../services/user';
import { deleteProductFromCart, deleteAllProductsFromCart } from '../services/cart'
import { addStripe } from "../services/stripe";
import { getStripeKey } from "../services/stripe";
import StripeCheckout from "react-stripe-checkout";
import RenderOrderCard from './common/renderOrderCard';
import { toast } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import Footer from '../footer/footer';
import '../../style/layout/menuBody.scss';
import '../../style/layout/menuContainer.scss';
import '../../style/layout/order.scss';

class MenuCart extends Component {
    state = { 
        user: '',
        orders: [],
        totalPrice: 0,
        stripeKey: '',
        isloading: true,
     }

    async componentDidMount() {
        const user = await getCurrentUser();
        const stripeKey = await getStripeKey();
        this.setState({ user, stripeKey });
        const orders = this.state.user.userCart.orders
        const totalPrice = this.state.user.userCart.totalPrice
        this.setState({ orders, totalPrice, isloading: false})
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

    handlePayment = async (token) => {
        const orders = this.state.orders
        const price = (this.state.totalPrice).toFixed(2)
        const name = this.state.user.name
        const response = await addStripe(token, price, orders, name)
        if(response.status === 'success') {
            this.props.history.push("/")
            toast('Payment Successful!, Please Check your email for Order ID',
            {type: 'success'});
            await deleteAllProductsFromCart(this.state.user.userCart._id)

        } else {
            toast('Payment went wrong, please try again',
            {type: 'error'});
        }
         

    }

    render() {
        const { orders, totalPrice, stripeKey, isloading } = this.state
        return ( 
            <div className="container">
                {isloading ? <CircularProgress className="loadingSpinner"/>:
                    (<Fragment>
                        <NavBar />
                        <div className="contentContainer">
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
                                    stripeKey && totalPrice!==0 && <StripeCheckout
                                    stripeKey={stripeKey}
                                    token={this.handlePayment}
                                    billingAddress
                                    shippingAddress
                                    amount={totalPrice*100}
                                    name="ORDER"
                                    ><button>MAKE PAYMENT</button></StripeCheckout>
                                    }
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </Fragment>)
                }
            </div> 
         );
    }
}
 
export default MenuCart;