import React, { Component } from 'react';
import NavBar from '../menuPageComponents/NavBar/navbar';
import deliver from '../../img/orderTrackImage2.png';
import Joi from "joi-browser";
import Input from './input';
import Footer from '../footer/footer';
import { getOrder } from '../services/order';
import '../../style/layout/menuContainer.scss';
import '../../style/layout/orderTrack.scss';

class OrderSearch extends Component{
    state = {
        inputs: {
            orderId: ''
        }, 
        errors: {}
     }
    
    handleChange = (e) => {
        const inputs = {...this.state.inputs}
        inputs[e.target.name] = e.target.value
        this.setState({ inputs });
    }

    validate = () => {
        const { error } = Joi.validate(this.state.inputs, this.schema);
        if (!error) return null;
        const errors = {};
        error.details.map(e=> errors[e.path[0]]= e.message);
        return errors
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {}});
        if (errors) return
        this.doSubmit();
    }

    doSubmit = async () => {
        try {
            await getOrder(this.state.inputs.orderId);
            this.props.history.push(`/track/${this.state.inputs.orderId}`)        
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                const errors = {...this.state.errors};
                errors.orderId = ex.response.data;
                this.setState({ errors });
            }
        }
    }
    


    schema = {
        orderId: Joi.string().required().label('ID').min(24).max(24)
    }

    render() {
        return ( 
            <div className="container">
                <NavBar />
                <div className="contentContainer">
                    <div className="orderSearchPageContainer">
                        <div className="orderSeachPageContent">
                            <div className="orderSeachPageContent__title">
                                Track Your Orders
                            </div>
                            <div className="orderSeachPageContent__input">
                                <Input
                                name="orderId"
                                value={this.state.inputs.orderId}
                                label="Enter Your Order ID"
                                onChange={this.handleChange}
                                error={this.state.errors.orderId} 
                                />
                            </div>
                            <div className="orderSeachPageContent__message">
                                You can find your order number on your confirmation email
                            </div>
                            <div className="orderSeachPageContent__button">
                                <button onClick={this.handleSubmit}>Check Order</button>
                            </div>
                        </div>
                        <div className="orderSearchPageContainer__imageWrapper">
                            <img src={deliver} alt="deliver-logo"/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
         );
    }

}
 
export default OrderSearch;