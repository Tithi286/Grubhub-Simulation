import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Navbar from './LandingPage/Navbar';
import Login from './Login/login';
import Signup from './Signup/signup';
import Profile from './Profile/profile';
import Home from './Home/home';
import Search from './Search/search';
import Details from './Details/details';
import Cart from './Details/cart';
import PastOrders from './Home/pastorders';
import UpcomingOrders from './Home/upcomingorders';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/home" component={Home}/>
                <Route path="/search" component={Search}/>
                <Route path="/details" component={Details}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/pastorders" component={PastOrders}/>
                <Route path="/upcomingorders" component={UpcomingOrders}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;