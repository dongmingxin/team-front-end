import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import MenuPizza from './components/menuPageComponents/menuPizza';
import MenuSides from './components/menuPageComponents/menuSides';
import MenuDrinks from './components/menuPageComponents/menuDrinks';
import MenuCart from './components/menuPageComponents/menuCart';
import MnueDesserts from './components/menuPageComponents/menuDesserts';
import Login from './components/loginPageComponents/login';
import Logout from './components/loginPageComponents/logout';
import Register from './components/loginPageComponents/register';
import { getCurrentUser } from './components/services/auth';

class App extends Component {
  state = {
    user: {}
  };

  async componentDidMount() {
    const user = await getCurrentUser();
    this.setState({user});
    console.log(user); 
  }

  render() {
    return (
      <Switch>
        <Redirect from="/" exact to="/pizza" />
          <Route exact path="/pizza" component={MenuPizza}/>
          <Route exact path="/sides" component={MenuSides}/>
          <Route exact path="/drinks" component={MenuDrinks}/>
          <Route exact path="/desserts" component={MnueDesserts}/>
          <Route exact path="/cart" component={MenuCart}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/logout" component={Logout}/>
          <Route exact path="/register" component={Register}/>            
        </Switch>
    );
  }
}

export default App;
