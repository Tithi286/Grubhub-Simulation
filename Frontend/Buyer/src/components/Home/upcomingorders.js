import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Draggable from 'react-draggable';


//create the Navbar Component
class UpcomingOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authFlag: false,
            orders: [],
            order_id: "",
            email: localStorage.getItem('decoded_email'),
            Position: {}

        }

        this.handleDrag = this.handleDrag.bind(this);
    }

    componentDidMount() {
        console.log(this.state.s_order)
        var data = {
            email: this.state.email
        }
        this.props.oncomponentDidMount(data);
        // axios.defaults.withCredentials = true;
        // axios.post('http://localhost:3001/upcomingorders',data, { headers: { Authorization: localStorage.getItem('token') }})
        //         .then((response) => {
        //         //update the state with the response data
        //         this.setState({
        //             orders : response.data.data
        //         });
        //         console.log(response.data)
        //         console.log(this.state.orders)
        //     });
    }

    handleDrag = (e, ui) => {
        const { x, y } = this.state.Position;
        this.setState({
            Position: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }
        });
    }

    render() {
        let redirectVar = null;
        if (localStorage.getItem('decoded_email') == null) {
            redirectVar = <Redirect to="/login" />
        }
        console.log(this.props.orders)
        let details = this.props.orders.map(order => {

            return (
                <div class="u-clickable u-list">
                    <Draggable onDrag={this.handleDrag}>
                        <div class="u-clickable u-list">
                            <div class="u-flex u-flex-justify u-flex-align">
                                <div class="u-mar1">
                                    <div class="s-list-item-primary u-mar1">Order id: {order._id}</div>
                                    <div class="s-list-item-primary u-mar1">Restaurant Name: {order.res_name}</div>
                                    <div class="s-list-item-primary u-mar1">Item: {order.item_name}</div>
                                    <div class="s-list-item-primary u-mar1">Total: {order.total}</div>
                                    <div class="s-list-item-primary u-mar1">Food Status: {order.s_food}</div>
                                </div>
                            </div></div>
                    </Draggable>
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
                                    <li class="account-nav-items-item"><Link to="/profile"><span>Profile</span></Link></li>
                                    <li class="account-nav-items-item"><Link to="/home"><span>Home</span></Link></li>
                                    <li class="account-nav-items-item"><Link to="/pastorders"><span>Past Orders</span></Link></li>
                                    <li class="account-nav-items-item"><Link to="/upcomingorders"><span>Upcoming Orders</span></Link></li>
                                </ul>
                            </div>
                            <div class="account-content u-block s-col2 s-box1 s-col-md-9">
                                <form role="form">
                                    <div class="u-list ">
                                        <div class="u-list-heading h5">
                                            <div class>UPCOMING ORDERS</div>
                                        </div>

                                        {details}

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
                        orders: state.upcomingorders.orders
                }
            }
const mapDispatchToProps = dispatch => {
    return {
                        oncomponentDidMount: (data) => {
            const value = {
                        email: data.email,
                }
                console.log(value)
                axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/upcomingorders', value, {headers: {Authorization: localStorage.getItem('token') } })
                .then((response) => {
                        console.log(response)
                    console.log(response.data.message)
                    if (response.status == 200) {
                        dispatch({ type: 'UPCOMINGOREDERS', payload: response.data, statusCode: 200 })
                    }
                    else if (response.status == 400) {
                        dispatch({ type: 'UPCOMINGOREDERS', payload: response.data, statusCode: 400 })
                    }

                    })
                .catch((error) => {

                    });
            }
        }
    }
    
export default reduxForm({
                        form: "upcomingorders"
                })(connect(mapStateToProps, mapDispatchToProps)(UpcomingOrders));
