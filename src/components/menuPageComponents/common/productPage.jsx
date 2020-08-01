import React, { Component, Fragment } from 'react';
import Alert from '@material-ui/lab/Alert';
import NavBar from '../NavBar/navbar';
import { getProduct } from '../../services/products';
import { getCurrentUser } from '../../services/user';
import { addProductToCart } from '../../services/cart';
import CircularProgress from '@material-ui/core/CircularProgress';
import Footer from '../../footer/footer';
import '../../../style/layout/menuBody.scss';
import '../../../style/layout/menuContainer.scss';
import '../../../style/layout/product.scss';

class ProductPage extends Component {
    state = { 
        product: {},
        quantity: 1,
        user: '',
        error: '',
        isloading: true,
     }
    
    async componentDidMount() {
        const productId = this.props.match.params.productId;
        const product = await getProduct(productId);
        const user = await getCurrentUser();
        this.setState({ product, user, isloading: false });
    }

    handleSelect = (e) => {
        let quantity = {...this.state.quantity}
        quantity = Number(e.target.value)
        this.handleInputError(quantity)
        this.setState({ quantity });
    }

    handleInputError = (input) => {
        if (!Number.isInteger(input) || input < 1) {
            const error = 'Please Enter a valid value'
            this.setState({ error })
            return 
        }
        this.setState({ error: '' })
        return 
    }
 

    handleSubmit = async () => {
        if(!this.state.user) {
            return this.props.history.push("/login")   
        };
        if(this.state.error) {
            return this.setState({ quantity:1, error: ''});
        }
        const cartId = this.state.user.userCart._id
        const data = {
            quantity : this.state.quantity,
            productId : this.state.product._id
        }
        await addProductToCart(cartId, data)
        this.props.history.goBack()
    }

    render() {
        const { product, quantity, error, isloading } = this.state 
        return ( 
            <div className="container">
                {isloading ? <CircularProgress className="loadingSpinner"/>:
                (<Fragment>
                    <NavBar />
                    <div className="contentContainer">
                        <div className="product">
                            <div className="product__title">{product.name}</div>
                            <div className="product__contentContainer">
                                <div className="product__productImageWrapper">
                                    <img src={product.avatar} alt={product.name}/>
                                </div>
                                <div className="product__content">
                                    <div className="product__info">
                                        <div className="product__info--price">{`From $${product.price}`}</div>
                                        <div className="product__info--calorie">{`Cal：${product.calorie}kj^`}</div>
                                    </div>
                                    <div className="product__description">{product.description}</div>
                                    <div className="product__action">
                                        <div className="product__action--selectQuantity">
                                            <label>Select Quantity:</label>
                                            <input type="number" onChange={this.handleSelect} min="1" max="99" value={quantity}></input>
                                        </div>
                                        <div className="product__action--add">
                                            <button onClick={this.handleSubmit}>ADD TO MY CART</button>
                                        </div>
                                        {error && <Alert variant="outlined" severity="error" className="errorMessage">
                                            {error}
                                        </Alert>}
                                    </div>
                                </div>
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
 
export default ProductPage;