import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        //sessionStorage.clear();
        console.log("in handlelogout")
        localStorage.clear();
        sessionStorage.clear();

        
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if (localStorage.getItem('decoded_email') != null) {
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><button class="s1-btn"><Link to="/login" onClick={this.handleLogout}>Logout</Link></button></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><button class="s1-btn"><Link to="/login">Login</Link></button></li>
                </ul>
            )
        }
        let redirectVar = null;
        if (localStorage.getItem('decoded_email') != null) {
            redirectVar = <Redirect to="/profile"/>
        }
    
        return (
            <div>
                {redirectVar}
                <nav class="navbar navbar-inverse u-dimension-2 ">
                    <div class="container-fluid ">
                        <div>
                            <a class="navbar-brand Logo" href="#"></a>
                            <ul class="nav navbar-nav navbar-right">
                            </ul>
                            {navLogin}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;