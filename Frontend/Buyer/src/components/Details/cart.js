import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../../App.css';
import axios from 'axios';
import { array } from 'prop-types';
import Modal from 'react-awesome-modal';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            total: 0,
            authFlag: false,
            add: "",
            quantity: "",
        }
        this.placeorder = this.placeorder.bind(this);
        this.addchange = this.addchange.bind(this);
    }

    componentDidMount() {
        try {
            this.setState({
                orders: this.props.location.state.itemdetail
            })
            this.setState({
                total: this.props.location.state.total
            })
            console.log(this.state.total)
        } catch (e) { }
    }
    addchange = (e) => {
        this.setState({
            add: e.target.value
        })
    }

    placeorder = (e) => {
        try {

            const data = {
                orders: this.state.orders,
                r_id: this.props.location.state.r_id,
                res_name: this.props.location.state.res_name,
                buyer_email: sessionStorage.getItem('login_email'),
                buyer_add: this.state.add,
                total: this.state.total

            }
            console.log(data);
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/placeorder', data, { headers: { Authorization: localStorage.getItem('token') } })
                .then((response) => {
                    console.log("Status Code : ", response);
                    if (response.status == 200) {
                        this.setState({
                            authFlag: true
                        })
                    }
                    else if (response.status == 201) {
                        this.setState({
                            authFlag: false,
                        })
                    }
                }
                );
        } catch (e) { }
    }

    render() {
        let redirectVarP = null;
        let redirectVar = null;
        if (localStorage.getItem('decoded_email') == null) {
            console.log("in cookie if")
            redirectVar = <Redirect to="/login" />
        }
        console.log(this.state.add)
        if (this.props.authFlag == true) {
            redirectVar = <Redirect to="/upcomingorders" />
        }

        console.log(this.state.orders);


        let details = this.state.orders.map(order => {
            return (
                <div class="u-list-heading ">
                    <div class="u-flex u-flex-justify u-flex-align">
                        <div>{order}</div>
                    </div></div>
            )
        })


        return (
            <div>
                {redirectVarP}
                {redirectVar}
                <div class="s-row">
                    {redirectVar}
                    <div class=" u-block s-col2 s-box1 s-col-md-8 u-dimension-2">

                        <div class="u-list ">
                            <div class="u-list-heading color1 h5">
                                <div>Your Cart</div>
                                <div class="edit"><Link to="/home">Back to Home</Link> </div>
                            </div></div>
                        <div class="u-list">
                            {details}
                        </div>
                        <div class="u-list ">
                            <div class="u-list-heading h5 ">
                                <div class="u-flex u-flex-justify u-flex-align">
                                    <div>Items Subtotal: </div>
                                    <div class="edit">{this.state.total}</div>
                                </div></div></div>
                        <form >`
                                <div class="u-list ">
                                <div class="u-list-heading h5 ">
                                    <div class="u-flex u-flex-justify u-flex-align">
                                        <div>
                                            <label class="label1">Order to be delivered at:</label><br />
                                            <input class="input1" type="text" onChange={this.addchange} required></input>
                                        </div>
                                    </div></div>
                            </div>
                            <div>
                            </div>
                            <div class="u-list ">
                                <div class="u-list-heading">
                                    <div class="u-flex u-flex-justify u-flex-align">
                                        <div class="edit">Empty Bag </div>
                                        <button class="s3-btn" onClick={this.placeorder}>Place Your Order</button>
                                    </div></div></div>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}

export default Cart;
