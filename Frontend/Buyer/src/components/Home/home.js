import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(){
        super()
        this.state = {
            food : ""
        }
        this.inputchange = this.inputchange.bind(this);
        this.submitfood = this.submitfood.bind(this);
    }
    inputchange=(e)=>{
        this.setState({food: e.target.value})
        
    }
    submitfood=()=>{
        sessionStorage.setItem('food', this.state.food)
    }
    render() {
        
        let redirectVarP = null;
        if (localStorage.getItem('decoded_email') == null) {
            redirectVarP = <Redirect to="/login"/>
        }      

        return (
            <div>
                {redirectVarP}
                <div class="home"> 
                    <div class="u-margin-bottom block">
                        <form class= "form1-block">
                        <div class="s-row">
                                <div class="s1-block">
                                    <h3 class=" label2">Who Delivers in your neighbour?</h3>
                                    <input class="input2" type="text" onChange={this.inputchange} name="foodsearch" placeholder=" Pizza,Pasta"></input>
                                    <Link to="/search"><button class="s2-btn s-btn-primary" onClick={this.submitfood}>Find Food</button></Link>
                                </div>
                            </div>
                        </form>
                       
                    </div>
                </div>
                <div class="edit"><Link to="/pastorders">See All Past Orders</Link></div>
                <div class="edit"><Link to="/upcomingorders">See All Upcoming Orders</Link></div>
            </div>
        )
    }
}

export default Home;