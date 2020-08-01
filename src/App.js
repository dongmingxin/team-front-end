import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuPizza from './components/menuPageComponents/menuPizza';
import MenuSides from './components/menuPageComponents/menuSides';
import MenuDrinks from './components/menuPageComponents/menuDrinks';
import MenuCart from './components/menuPageComponents/menuCart';
import MnueDesserts from './components/menuPageComponents/menuDesserts';
import Login from './components/loginPageComponents/login';
import Logout from './components/loginPageComponents/logout';
import Register from './components/loginPageComponents/register';
import ProductPage from './components/menuPageComponents/common/productPage';
import OrderSearch from './components/trackOrderPageComponents/orderSearch';
import OrderCheck from './components/trackOrderPageComponents/orderTrack';
import PageNotFound from './components/pageNotFound/pageNotFound';
import ProtectedRoute from './components/utils/protectedRoute';
import pageUnauthorized from './components/pageNotFound/pageUnauthorized';
import { getCurrentUser } from './components/services/user';
import { isLoggedIn } from './components/utils/auth';

class App extends Component {
  state = {
    user: {}
  };

  async componentDidMount() {
    if (!isLoggedIn === false) return;
    const user = await getCurrentUser();
    this.setState({user}); 
  }

  render() {
    return (
      <Fragment >
        <ToastContainer />
        <Switch>
          <Redirect from="/" exact to="/pizza" />
            <Route exact path="/pizza" component={MenuPizza}/>
            <Route exact path="/sides" component={MenuSides}/>
            <Route exact path="/drinks" component={MenuDrinks}/>
            <Route exact path="/desserts" component={MnueDesserts}/>
            <ProtectedRoute exact path="/cart" component={MenuCart}/>
            <Route exact path="/login" component={Login}/>
            <ProtectedRoute exact path="/logout" component={Logout}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/track" component={OrderSearch}/>
            <Route exact path="/track/:orderId" component={OrderCheck}/>
            <Route exact path="/product/:productId" component={ProductPage}/> 
            <Route exact path="/not-found" component={PageNotFound}/>
            <Route exact path="/unauthorized-page" component={pageUnauthorized}/>          
            <Redirect to="/not-found" />
          </Switch>
      </Fragment>
    );
  }
}

export default App;
