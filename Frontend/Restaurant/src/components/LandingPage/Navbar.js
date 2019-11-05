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
        localStorage.clear();
        sessionStorage.clear();
    }

    render() {
        let navLogin = null;
        if (localStorage.getItem('decoded_email') != null) {
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><button class="s1-btn"><Link class="link" to="/login" onClick={this.handleLogout}>Logout</Link></button></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><button class="s1-btn"><Link class="link" to="/login">Login</Link></button></li>
                </ul>
            )
        }
        let redirectVar = null;
        if (localStorage.getItem('decoded_email') == null) {
            redirectVar = <Redirect to="/profile"/>
        }

        return (
            <div>
                <nav class="navbar navbar-inverse">
                    <div class="container-fluid">
                        <div>
                            <a class="navbar-brand Logo" href="#"></a>
                            <ul class="nav navbar-nav navbar-right">
                                {/* <li><button class="s1-btn"><Link class="link" to="/updateitem" onClick={this.handleLogout}>updateitem</Link></button></li>
                                <li><button class="s1-btn"><Link to="/home" onClick={this.handleLogout}>Home</Link></button></li> */}
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