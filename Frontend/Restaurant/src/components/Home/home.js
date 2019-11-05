import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";


//create the Navbar Component
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            s_order: "active",
            orders: [],
            s_food: "new",
            order_id: "",
            authFlag: "",
            res_name: sessionStorage.getItem('res_name'),
        }
        //this.activehandler =  this.activehandler.bind(this);
        // this.completedhandler =  this.completedhandler.bind(this);
        this.updatefoodstatus = this.updatefoodstatus.bind(this)
        this.statuschange = this.statuschange.bind(this)

    }

    componentDidMount() {
        var data = {
            res_name: this.state.res_name,
            s_order: "active",
            s_food: this.state.s_food
        }
        this.props.oncomponentDidMount(data);
        // axios.defaults.withCredentials = true;
        // axios.post('http://localhost:3001/orders', data, { headers: { Authorization: localStorage.getItem('token') }})
        //     .then((response) => {
        //         //update the state with the response data
        //         this.setState({
        //             orders: this.state.orders.concat(response.data)
        //         });
        //     });
    }


    statuschange = (e) => {
        console.log(e.target.value)
        // this.setState({
        //     s_food: e.target.value,
            
        // })
        this.state.s_food = e.target.value
        console.log(this.state.s_food)
    }
    cancelorder = (e, orderid) => {
        //e.preventDefault();
        var data = {
            res_name: this.state.res_name,
            orderid: orderid,
        }
        console.log(data);
        this.props.oncancelorder(data);
        // //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post('http://localhost:3001/cancelorder', data, { headers: { Authorization: localStorage.getItem('token') }})
        //     .then(response => {
        //         console.log("Status Code : ", response);
        //         if (response.data.status == 200) {
        //             this.setState({
        //                 authFlag: true
        //             })
        //         }
        //         else if (response.data.status == 201) {
        //             this.setState({
        //                 authFlag: false,
        //             })
        //         }
        //     }
        //     );
    }

    updatefoodstatus = (e, orderid) => {
        //e.preventDefault();
        var data = {};
        console.log(this.state.s_food)
        if (this.state.s_food == "delivered") {
            data = {
                res_name: this.state.res_name,
                s_food: this.state.s_food,
                orderid: orderid,
                s_order: "completed"
    
            }
        }
        //console.log(this.state.s_order)
        else{
            data = {
                res_name: sessionStorage.getItem('res_name'),
                s_food: this.state.s_food,
                orderid: orderid,
                s_order: "active"
            }
        }
        console.log(data);
        this.props.onupdatefoodstatus(data);
        // //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post('http://localhost:3001/updatefoodstatus', data, { headers: { Authorization: localStorage.getItem('token') }})
        //     .then(response => {
        //         console.log("Status Code : ", response);
        //         if (response.data.status == 200) {
        //             this.setState({
        //                 authFlag: true
        //             })
        //         }
        //         else if (response.data.status == 201) {
        //             this.setState({
        //                 authFlag: false,
        //             })
        //         }
        //     }
        //     );
    }


    render() {
        let redirectVar = null;
        if (localStorage.getItem('decoded_email') == null) {
            console.log("in cookie if")
            redirectVar = <Redirect to="/login" />
        }
        console.log(this.props.orders)
        let details = this.props.orders.map(order => {
            return (
                <div class="u-flex u-flex-justify u-flex-align">
                    <div class="u-mar1">
                        <div class="s-list-item-primary u-mar1">Order id: {order._id}</div>
                        <div class="s-list-item-primary u-mar1">UserName: {order.buyer_email}</div>
                        <div class="s-list-item-primary u-mar1">Item: {order.item_name}</div>
                        {/* <div class="s-list-item-primary u-mar1">Quantity: {order.item_quantity}</div>
                        <div class="s-list-item-primary u-mar1">Price: {order.item_price}</div> */}
                        <div class="s-list-item-secondary u-mar1">
                            <span class="span">Buyer Address: {order.buyer_add}</span></div>
                    </div>
                    
                    <div class="edit" tabIndex="0">
                    <div class="u-mar2">
                        <div >Food Status</div>
                        <select name="food_status" onChange={this.statuschange}>
                            <option value={order.s_food}>{order.s_food}</option>
                            <option value="new">New Order</option>
                            <option value="preparing">Preparing food</option>
                            <option value="ready">Food is ready</option>
                            <option value="delivered">Food is delivered</option>
                            <option value="delivered">Cancel Order</option>
                        </select><br /></div>
                       
                        <button class="s5-btn" name="update" onClick={(e) => {
                            this.updatefoodstatus(e, order._id)
                        }}>Update</button>
                        <button class="s5-btn" name="cancel" onClick={(e) => {
                            this.cancelorder(e, order._id)
                        }}>Cancel Order</button>
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
                                        <div>ACTIVE ORDERS</div>
                                        <div class="edit"><Link to="/completedorder">See all completed orders</Link></div>
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
                .catch((error) => {

                });
        },

        oncancelorder: (data) => {
            var value = {
                res_name: data.res_name,
                orderid: data.orderid,
            }
            console.log(value)
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/cancelorder', value, { headers: { Authorization: localStorage.getItem('token') }})
                .then((response) => {
                    console.log(response)
                    console.log(response.data.message)
                    if (response.status == 200) {
                        dispatch({ type: 'CANCELORDER', payload: response, statusCode: 200})                        }
                    else if (response.status == 400) {
                        dispatch({ type: 'CANCELORDER', payload: response, statusCode: 201})
                    }
                    
                })
                .catch((error) => {

                });
        },

        onupdatefoodstatus: (data) => {
            var value = {
                res_name: data.res_name,
                s_food: data.s_food,
                orderid: data.orderid,
                s_order: data.s_order
            }
            console.log(value)
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/updatefoodstatus', value, { headers: { Authorization: localStorage.getItem('token') }})
                .then((response) => {
                    console.log(response)
                    console.log(response.data.message)
                    if (response.status == 200) {
                        dispatch({ type: 'FOODSTATUS', payload: response, statusCode: 200})                        }
                    else if (response.status == 400) {
                        dispatch({ type: 'FOODSTATUS', payload: response, statusCode: 201})
                    }
                    
                })
                .catch((error) => {

                });
        },


    }
}

export default reduxForm({
    form: "home"
})(connect(mapStateToProps, mapDispatchToProps)(Home));