import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Cookies from 'universal-cookie';
import Users from './components/Users';
// import Example from './components/Example';
import UsersArticle from './components/UsersArticle';
import UsersArticlePost from './components/UsersArticlePost';
import Home from './views/home';
import Header from './components/header';
import Register from './views/Register';
import Signin from './views/Signin';
import CShop from './views/CShop';
import Admin from './admin/views/index';
import TypeProduct from './admin/views/TypeProduct';
import PaymentAdmit from './admin/views/PaymentAdmin';
import Company from './views/Company';
import MyShop from './views/MyShop';
import ShowProduct from './views/ShowProduct';
import Showall from './views/Showall';
import DetailProduct from './views/DetailProduct';
import Cart from './views/Cart';
import Payment from './views/Payment';
import Tracking from './views/Tracking';
import Order from './views/Order';
import Shop from './views/Shop';
import Profile from './views/Profile';
import Gateway from './views/Gateway';
import PaymentM from './admin/views/PaymentM';
import AboutUs from './admin/views/AboutUs';
import ContactUs from './admin/views/ContactUs';
import Policy from './admin/views/Policy';
import Footer_page from './views/Footer_page';

 class App extends Component {
  render() {
    return (
      <div>
        {/* <Header/> */}
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/users"  component={Users}/>
        <Route path="/users/:id"  render={props => <UsersArticle{...props}/> }/>
        <Route path="/users/post-article"  component={UsersArticlePost}/>
        <Route path="/Register"  component={Register}/>
        <Route path="/Signin"  component={Signin}/>
        <Route path="/CShop" exact component={CShop}/>
        <Route path="/Admin" exact component={Admin}/>
        <Route path="/TypeAdmin"  component={TypeProduct}/>
        <Route path="/PaymentAdmin"  component={PaymentAdmit}/>
        <Route path="/CShop/company"  component={Company}/>
        <Route path="/MyShop"  component={MyShop}/>
        <Route path="/ShowProduct"  component={ShowProduct}/>
        <Route path="/ShowAll/:id"  component={Showall}/>
        <Route path="/DTProduct"  component={DetailProduct}/>
        <Route path="/Cart"  component={Cart}/>
        <Route path="/Payment"  component={Payment}/>
        <Route path="/Tracking"  component={Tracking}/>
        <Route path="/Order"  component={Order}/>
        <Route path="/Shop"  component={Shop}/>
        <Route path="/Profile"  component={Profile}/>
        <Route path="/Gateway" component={Gateway}/>
        <Route path="/Paymentmethod" component={PaymentM}/>
        <Route path="/AboutUs" component={AboutUs}/>
        <Route path="/ContactUs" component={ContactUs}/>
        <Route path="/Policy" component={Policy}/>
        <Route path="/Footer/:id" component={Footer_page}/>
        </Switch>
      </div>
    )
  }
}
export default App