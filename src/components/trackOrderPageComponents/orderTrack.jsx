import React, { Component } from 'react';
import NavBar from '../menuPageComponents/NavBar/navbar';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { getOrder } from '../services/order';
import '../../style/layout/menuContainer.scss';
import '../../style/layout/orderTrack.scss';


class OrderCheck extends Component {
    state = { 
        currentStep: 1
    }

    async componentDidMount() {
        const orderId = this.props.match.params.orderId
        const order = await getOrder(orderId)
        if (order.status === 'Confirmed') {
            this.setState({ currentStep: 1})
        } else if (order.status === 'Prepared') {
            this.setState({ currentStep: 2})
        } else if (order.status === 'Deliverd') {
            this.setState({ currentStep: 3})
        } else if (order.status === 'Completed') {
            this.setState({ currentStep: 4})
        } else {
            return
        }
    }

    handleActiveStepperTitle = (requiredStep) => {
        const currentStep = this.state.currentStep
        const activeStyle = 'stepperTitleActive'
        if (currentStep >= requiredStep) {
            return activeStyle
        }
        return null
    }

    handleActiveStepper = (requiredStep) => {
        const currentStep = this.state.currentStep
        const activeStyle = 'stepperActive'
        if (currentStep >= requiredStep) {
            return activeStyle
        }
        return null
    }

    render() {
        return ( 
            <div className="container">
                <NavBar />
                <div className="contentContainer">
                    <div className="title">
                        Track delivery status
                    </div>
                    <div className="orderCheck">
                        <div className="stepperContainer">
                            <div className="stepper">
                                <div className="stepper__step" id={this.handleActiveStepper(1)}></div>
                                <div className="stepper__connector" id={this.handleActiveStepper(2)}></div>
                                <div className="stepper__step" id={this.handleActiveStepper(2)}></div>
                                <div className="stepper__connector" id={this.handleActiveStepper(3)}></div>
                                <div className="stepper__step" id={this.handleActiveStepper(3)}></div>
                                <div className="stepper__connector" id={this.handleActiveStepper(4)}></div>
                                <div className="stepper__step" id={this.handleActiveStepper(4)}></div>
                            </div>
                            <div className="stepperTitle">
                                <div className={`stepperTitle__item1 ${this.handleActiveStepperTitle(1)}`}>
                                    <div className="stepperTitle__item1--icon"><DoneAllIcon className="iconSize"/></div>
                                    <div className="stepperTitle__item1--text">Order Confirmation</div>
                                    
                                </div>
                                <div className={`stepperTitle__item2 ${this.handleActiveStepperTitle(2)}`}>
                                    <div className="stepperTitle__item1--icon"><LocalPizzaIcon className="iconSize"/></div>
                                    <div className="stepperTitle__item1--text">Preparation</div>
                                </div>
                                <div className={`stepperTitle__item3 ${this.handleActiveStepperTitle(3)}`}>
                                    <div className="stepperTitle__item1--icon"><LocalShippingIcon className="iconSize"/></div>
                                    <div className="stepperTitle__item1--text">Out for delivery</div>
                                </div>
                                <div className={`stepperTitle__item4 ${this.handleActiveStepperTitle(4)}`}>
                                    <div className="stepperTitle__item1--icon"><SentimentVerySatisfiedIcon className="iconSize"/></div>
                                    <div className="stepperTitle__item1--text">Complete</div>
                                </div>
                            </div>
                        </div>
                        <div className="orderCheck__content">{`ORDER ID: ${this.props.match.params.orderId}`}</div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default OrderCheck;