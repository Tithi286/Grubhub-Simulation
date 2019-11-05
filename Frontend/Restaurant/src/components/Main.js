import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Navbar from './LandingPage/Navbar';
import Login from './Login/login'
import Signup from './Signup/signup';
import Profile from './Profile/profile';
import Home from './Home/home';
import Items from './Items/items';
import Menu from './Menu/menu';
import Updateitem from './Items/updateitem';
import Completedorder from './Home/completedorder';
//import Update from './Profile/updateprofile';
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
                <Route path="/items" component={Items}/>
                <Route path="/menu" component={Menu}/>
                <Route path="/updateitem" component={Updateitem}/>
                <Route path="/completedorder" component={Completedorder}/>

            </div>
        )
    }
}
//Export The Main Component
export default Main;