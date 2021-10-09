import React from "react";
import { BrowserRouter as Router , Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import OrderScreen from "./screens/OrderScreen"
import UsersListScreen from "./screens/UsersListScreen"
import UserEditScreen from "./screens/UserEditScreen"
import ProductListScreen from "./screens/ProductListScreen"
import CreateProductScreen from "./screens/CreateProductScreen"
import ProductEditScreen from "./screens/ProductEditScreen"
import OrdersListScreen from './screens/OrdersListScreen'
import { Container } from "react-bootstrap";
import {Provider} from 'react-redux'
import store from './redux/store'

function App() {
  return (
  <Provider store={store}>
    <Router>
    
        <Header />
        <main className="py-3">
          <Container>
            <Route exact path="/" component={HomeScreen}/>
            <Route  path="/product/:id" component={ProductScreen}/>
            <Route  path="/cart/:id?" component={CartScreen}/>
            <Route  path="/login" component={LoginScreen}/>
            <Route  path="/register" component={RegisterScreen}/>
            <Route path="/profile" component={ProfileScreen}/>
            <Route path="/shipping" component={ShippingScreen}/>
            <Route path="/payment" component={PaymentScreen}/>
            <Route path="/placeorder" component={PlaceOrderScreen}/>
            <Route path='/order/:id' component={OrderScreen}/>
            <Route path='/admin/users' component={UsersListScreen}/>
            <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
            <Route path='/admin/products' component={ProductListScreen} exact/>
            <Route path='/admin/products/:pageNumber' component={ProductListScreen} exact/>
            <Route path='/admin/product/newproduct' component={CreateProductScreen}/>
            <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
            <Route path='/admin/orders' component={OrdersListScreen}/>
            <Route path='/search/:keyword' component={HomeScreen} exact/>
            <Route path='/page/:pageNumber' component={HomeScreen} exact/>
            <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact/>
         </Container>
        </main>
        <Footer />
      
    </Router>
  </Provider>
  );
}

export default App;
