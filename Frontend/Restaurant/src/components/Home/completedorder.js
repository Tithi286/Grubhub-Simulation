import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";


//create the Navbar Component
class Completedorder extends Component {
    constructor(props){
        super(props);
        this.state = {
            s_order:"",
            orders: [],
            s_food: "",
            order_id: "",
            authFlag:"",
            res_name: sessionStorage.getItem('res_name')
        }

    }

    componentDidMount(){
        var data = {
            res_name: this.state.res_name,
           s_order : "completed",
           s_food: this.state.s_food
       }
       this.props.oncomponentDidMount(data);
    //    axios.defaults.withCredentials = true;
    //    axios.post('http://localhost:3001/orders',data, { headers: { Authorization: localStorage.getItem('token') }})
    //            .then((response) => {
    //            //update the state with the response data
    //            this.setState({
    //                orders : this.state.orders.concat(response.data) 
    //            });
    //        });
   }

    render() {
        let redirectVar = null;
        if (localStorage.getItem('decoded_email') == null) {
            console.log("in cookie if")
            redirectVar = <Redirect to="/login" />
        }
        console.log(this.props.orders)
        let details = this.props.orders.map(order => {
            return(
                <div class="u-flex u-flex-justify u-flex-align">
                                        <div class="u-mar1">
                                        <div class="s-list-item-primary u-mar1">Order id: {order._id}</div>
                                        <div class="s-list-item-primary u-mar1">UserName: {order.buyer_email}</div>
                                        <div class="s-list-item-primary u-mar1">Item: {order.item_name}</div>
                                        {/* <div class="s-list-item-primary u-mar1">Quantity: {order.item_quantity}</div>
                                        <div class="s-list-item-primary u-mar1">Price:      {order.item_price}</div> */}
                                            <div class="s-list-item-secondary u-mar1">
                                                <span class="span">Buyer Address: {order.buyer_add}</span></div>
                                        </div>
                                    </div>
            )
        })


        return (
            <div>
                {redirectVar}
                <div class="s-row">
                <div class="s-col1 s-col2 u-dimension-2  s-box1">
                        <h3 class="account-nav-header">Your Account</h3>
                        <ul class="account-nav-items">
                            <li class="account-nav-items-item"><a href="/profile"><span>Profile</span></a></li>
                            <li class="account-nav-items-item"><a href="/home"><span>Home</span></a></li>
                            <li class="account-nav-items-item"><a href="/menu"><span>Menu</span></a></li>
                            <li class="account-nav-items-item"><a href="/items"><span>Add/Delete Item</span></a></li>
                            <li class="account-nav-items-item"><a href="/updateitem"><span>Update Item</span></a></li>
                        </ul>
                    </div>
                    <div class="account-content u-block s-col2 s-box1 s-col-md-9">
                        <form role="form">
                            <div class="u-list ">
                                <div class="u-list-heading h5">
                                    <div class="u-flex u-flex-justify u-flex-align">
                                        <div>COMPLETED ORDERS</div>
                                    <div class="edit"><Link to="/home">See all active orders</Link></div>
                                </div></div>
                                {/* <div class="u-list-heading h5 u-list">
                                    <button class="s2-btn" name="active_orders" onClick={this.activehandler} value="active">Active</button>
                                    <button class="s2-btn" name="completed_orders" onClick={this.completedhandler}  value="completed">Completed</button>
                                    
                                </div> */}
                                <div class="u-clickable u-list">
                                    {details}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
       orders: state.home.orders,
       authFlag: state.home.authFlag
    }
}
const mapDispatchToProps = dispatch => {
    return {
        oncomponentDidMount: (data) => {
            var value = {
                res_name: data.res_name,
                s_order: data.s_order,
                s_food: data.s_food
            }
            console.log(value)
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/orders', value, { headers: { Authorization: localStorage.getItem('token') }})
                .then((response) => {
                    console.log(response)
                    console.log(response.data.message)
                    if (response.status == 200) {
                        dispatch({ type: 'HOME', payload: response, statusCode: 200})                        }
                    else if (response.status == 400) {
                        dispatch({ type: 'HOME', payload: response, statusCode: 400})
                    }
                    
                })
                .catch((error) => {});
        }


    }
}

export default reduxForm({
    form: "completedorder"
})(connect(mapStateToProps, mapDispatchToProps)(Completedorder));