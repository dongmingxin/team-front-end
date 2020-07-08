import React, { Component } from 'react';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Button from '@material-ui/core/Button';
import Input from './common/input';
// import AddressInput from 'material-ui-address-input';
import '../../style/layout/register.scss';
import Joi from 'joi-browser';
import { register } from '../services/user';
import { loginWithJwt } from '../services/auth';

class Register extends Component {
    state = { 
        // address: '',
        // addresses: [],
        inputs: {
            name:'',
            username:'',
            password:'',
            address:''
        },
        errors: {}
     }

    validate = () => {
        const { error } = Joi.validate(this.state.inputs, this.schema, {abortEarly: false});
        if (!error) return null;
        const errors = {};
        error.details.map(e=> errors[e.path[0]]= e.message);
        return errors
    }

    handleChange = (e) => {
        const inputs = {...this.state.inputs}
        inputs[e.target.name] = e.target.value
        this.setState({ inputs });
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
            const data = await register(this.state.inputs)
            loginWithJwt(data.token)
            window.location = '/';
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState( { errors });
            }
           
        }
        
    }

    schema = {
        name: Joi.string().required().max(255),
        username: Joi.string().email().required().label('Email').max(255),
        password: Joi.string().required().max(255),
        address: Joi.string().required().max(1024)
    }


    render() { 
        return (
            <div className="registerContainer">
                <div className="registerBackgroundWrapper"></div>
                <div className="registerForm">
                    <div className="registerForm__logo">
                            <LockOutlinedIcon />
                    </div>
                    <div className="registerForm__title">Register</div>
                    <div className="registerForm__input">
                        <div className="registerForm__input--name">
                            <Input 
                                name="name"
                                value={this.state.inputs.name}
                                label="Full name"
                                onChange={this.handleChange}
                                type='text'
                                error={this.state.errors.name}
                            />
                        </div>
                        <div className="registerForm__input--username">
                            <Input 
                                name="username"
                                value={this.state.inputs.username}
                                label="Username/Email"
                                onChange={this.handleChange}
                                type='text'
                                error={this.state.errors.username}
                            />
                        </div>
                        <div className="registerForm__input--password">
                            <Input 
                                name="password"
                                value={this.state.inputs.password}
                                label="Password"
                                onChange={this.handleChange}
                                type='password'
                                error={this.state.errors.password}
                            />
                        </div>
                        <div className="registerForm__input--address">
                            {/* <AddressInput
                                onAdd={this.handleAddAddress}
                                onChange={this.handleChangeAddress}
                                value={this.state.address}
                                allAddresses={this.state.addresses}
                            /> */}
                             <Input 
                                name="address"
                                value={this.state.inputs.address}
                                label="Your Address"
                                onChange={this.handleChange}
                                type='text'
                                error={this.state.errors.address}
                            />
                        </div>
                    </div>
                    <div className="registerForm__submitButton">
                        <Button 
                            variant="contained" 
                            onClick={this.handleSubmit}
                            fullWidth
                            color="primary"
                        >
                            Sign Up
                        </Button>
                    </div>
                    <div className="registerForm__copyRight">
                        Copyright © JR Academy 2020.
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Register;