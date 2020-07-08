import React, { Component } from 'react';
import { logout } from '../services/auth';

class Logout extends Component {
    componentDidMount() {
        window.location = "/";
        logout();
    }
    render() { 
        return ( null );
    }
}
 
export default Logout;