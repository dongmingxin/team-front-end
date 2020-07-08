import React, { Component } from 'react';
import Joi from "joi-browser";
import { Link } from 'react-router-dom'; 
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Button from '@material-ui/core/Button';
import Input from './common/input';
import CheckBox from './checkBox';
import { login } from '../services/auth'
import '../../style/layout/login.scss';

class Login extends Component {
    state = {
        inputs: {
            username: '',
            password: ''
        }, 
        errors: {}
     }

    handleChange = (e) => {
        const inputs = {...this.state.inputs}
        inputs[e.target.name] = e.target.value
        this.setState({ inputs });
    }

    validate = () => {
        const { error } = Joi.validate(this.state.inputs, this.schema, {abortEarly: false});
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
            await login(this.state.inputs);
            window.location = '/';
            
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }

    }


    schema = {
        username: Joi.string().email().required().label('Email').max(255),
        password: Joi.string().required().max(255)
    }  
    render() { 
        return ( 
            <div className="loginContainer">
                <div className="loginBackgroundWrapper"></div>
                <div className="loginForm">
                    <div className="loginForm__logo">
                        <LockOutlinedIcon />
                    </div>
                    <div className="loginForm__title">Sign in</div>
                    <div className="loginForm__input">
                        <div className="loginForm__input--username">
                            <Input 
                                name="username"
                                value={this.state.inputs.username}
                                label="Username/Email"
                                onChange={this.handleChange}
                                type='text'
                                error={this.state.errors.username}
                            />
                        </div>
                        <div className="loginForm__input--password">
                            <Input 
                                    name="password"
                                    value={this.state.inputs.password}
                                    label="Password"
                                    onChange={this.handleChange}
                                    type='password'
                                    error={this.state.errors.password}
                                />
                        </div>
                    </div>
                    <div className="loginForm__checkBox">
                        <CheckBox />
                    </div>
                    <div className="loginForm__submitButton">
                        <Button 
                            variant="contained" 
                            onClick={this.handleSubmit}
                            fullWidth
                            color="primary"
                        >
                            SIGN IN
                        </Button>
                    </div>
                    <div className="loginForm__link">
                        <div className="loginForm__link--forgotPassword">
                            <Link to='/' className="textStyle"> Forgot password ?</Link>
                        </div>
                        <div className="loginForm__link--signUp">
                            <Link to='/register' className="textStyle"> Don't have an account? Sign Up</Link>
                        </div>
                    </div>
                    <div className="loginForm__copyRight">
                        Copyright © JR Academy 2020.
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Login;