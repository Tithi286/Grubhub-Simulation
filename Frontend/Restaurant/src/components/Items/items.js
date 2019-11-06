import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import '../../App.css';
import axios from 'axios';
import { Field, reduxForm } from "redux-form";

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            res_email: "",
            cuisine: sessionStorage.getItem('res_cuisine'),
            res_name: sessionStorage.getItem('res_name'),
            itemname: "",
            itemdesc: "",
            menusection: "",
            price: "",
            authFlag: false,
            delFlag: false,
            msg: "",
            err: "",
            error: "",
            secflag: ""
        }
        this.ridchange = this.ridchange.bind(this);
        this.itemnamechange = this.itemnamechange.bind(this);
        this.itemdescchange = this.itemdescchange.bind(this);
        this.menusectionchange = this.menusectionchange.bind(this);
        this.itempricechange = this.itempricechange.bind(this);
        this.handleupdate = this.handleupdate.bind(this);
        this.handledelete = this.handledelete.bind(this)
        this.handledeletesection = this.handledeletesection.bind(this)
    }

    ridchange = (e) => {
        this.setState({ res_email: e.target.value })
    }
    itemnamechange = (e) => {
        this.setState({ itemname: e.target.value })
    }
    itemdescchange = (e) => {
        this.setState({ itemdesc: e.target.value })
    }
    menusectionchange = (e) => {
        this.setState({ menusection: e.target.value })
    }
    itempricechange = (e) => {
        this.setState({ itemprice: e.target.value })
    }
    handleupdate = (e) => {
        e.preventDefault();
        var data = {
            res_name: this.state.res_name,
            res_email: this.state.res_email,
            itemname: this.state.itemname,
            itemdesc: this.state.itemdesc,
            menusection: this.state.menusection,
            itemprice: this.state.itemprice,
            cuisine: this.state.cuisine
        }
        console.log(this.state.res_name)
        console.log(data);
        this.props.onhandleupdate(e, data)
    }
    handledelete = (e) => {
        e.preventDefault();
        var data = {
            res_email: this.state.res_email,
            itemname: this.state.itemname,
        }

        console.log(data);
        this.props.onhandledelete(data);
    }

    handledeletesection = (e) => {
        e.preventDefault();
        var data = {
            res_email: this.state.res_email,
            menusection: this.state.menusection,
        }

        console.log(data);
        this.props.onhandledeletesection(data)
    }

    render() {
        let redirectVar = null;
        if (localStorage.getItem('decoded_email') == null) {
            console.log("in cookie if")
            redirectVar = <Redirect to="/login" />
        }

        let redirectVarM = null;
        let redirectVarD = null;
        let redirectVarS = null;
        if (this.props.authFlag == true) {
            redirectVarM = <Redirect to="/menu" />
        }

        if (this.props.authFlag == true) {
            redirectVarD = <Redirect to="/menu" />
        }

        if (this.props.authFlag == true) {
            redirectVarS = <Redirect to="/menu" />
        }
        return (
            <div>
                {redirectVar}
                {redirectVarD}
                {redirectVarM}
                {redirectVarS}
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
                        <form role="form" onSubmit={this.handleupdate} >

                            <div class="u-list ">
                                <div class="u-list-heading h5">
                                    <div>Add Item</div>
                                    <div>{this.props.message}</div>
                                </div>
                                <div class="u-clickable u-list">
                                    <div class="s-row">
                                        <div class="s1-block">
                                            <label class="label1">Restaurant Email</label><br />
                                            <input class="input1" type="text" onChange={this.ridchange} name="res_email" required></input>
                                        </div></div>
                                    <div class="s-row">
                                        <div class="s1-block">
                                            <label class="label1">Item Name</label><br />
                                            <input class="input1" type="text" name="itemname" onChange={this.itemnamechange} required></input>
                                        </div></div>
                                    <div class="s-row">
                                        <div class="s1-block">
                                            <label class="label1">Item Description</label><br />
                                            <input class="input1" type="text" name="itemdesc" onChange={this.itemdescchange} required></input>
                                        </div></div>
                                    <div class="s-row">
                                        <div class="s1-block">
                                            <label class="label1">Menu Section (Item to be displayed in.)</label><br />
                                            <input class="input1" type="text" name="menusection" onChange={this.menusectionchange} required></input>
                                        </div></div>
                                    <div class="s-row">
                                        <div class="s1-block">
                                            <label class="label1">Item Price</label><br />
                                            <input class="input1" type="number" min="0.00" step="any" onChange={this.itempricechange} name="price" required></input>
                                        </div></div>
                                    <div class="s-row">
                                        <div class="s1-block">
                                            <button type="submit" class="s1-btn">Add</button>
                                            <button type="submit" class="s1-btn">Cancel</button>
                                        </div></div>
                                </div>
                            </div>
                        </form>
                        <form role="form" onSubmit={this.handledelete}>

                            <div class="u-list ">
                                <div class="u-list-heading h5">
                                    <div>Delete Item</div>
                                    <div>{this.props.msg}</div>
                                </div>
                                <div class="u-clickable u-list">
                                    <div class="s-row">
                                        <div class="s1-block">
                                            <label class="label1">Restaurant Email</label><br />
                                            <input class="input1" type="text" onChange={this.ridchange} name="res_email" required></input>
                                        </div></div>
                                    <div class="s-row">
                                        <div class="s1-block">
                                            <label class="label1">Item Name</label><br />
                                            <input class="input1" type="text" name="itemname" onChange={this.itemnamechange} required></input>
                                        </div></div>
                                    <div class="s-row">
                                        <div class="s1-block">
                                            <button type="submit" class="s1-btn">Delete Item</button>
                                            <button type="submit" class="s1-btn">Cancel</button>
                                        </div></div>

                                </div>
                            </div>
                        </form>
                        <form role="form" onSubmit={this.handledeletesection}>
                            <div class="u-list ">
                                <div class="u-list-heading h5">
                                    <div>Delete Section</div>
                                    <div>{this.props.error}</div>
                                </div>
                                <div class="u-clickable u-list">
                                    <div class="s-row">
                                        <div class="s1-block">
                                            <label class="label1">Restaurant Email</label><br />
                                            <input class="input1" type="text" onChange={this.ridchange} name="res_email" required></input>
                                        </div></div>
                                    <div class="s-row">
                                        <div class="s1-block">
                                            <label class="label1">Section Name</label><br />
                                            <input class="input1" type="text" name="menusection" onChange={this.menusectionchange} required></input>
                                        </div></div>
                                    <div class="s-row">
                                        <div class="s1-block">
                                            <button type="submit" class="s1-btn">Delete Section</button>
                                            <button type="submit" class="s1-btn">Cancel</button>
                                        </div></div>

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
        authFlag: state.items.authFlag,
        message: state.items.message,
        msg: state.items.msg,
        error: state.items.error
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onhandleupdate: (e, data) => {
            try {
                var value = {
                    res_name: data.res_name,
                    res_email: data.res_email,
                    itemname: data.itemname,
                    itemdesc: data.itemdesc,
                    menusection: data.menusection,
                    itemprice: data.itemprice,
                    cuisine: data.cuisine
                }
                console.log(value)
                axios.defaults.withCredentials = true;
                axios.post('http://localhost:3001/additem', value, { headers: { Authorization: localStorage.getItem('token') } })
                    .then((response) => {
                        console.log(response)
                        if (response.data.status == 200) {
                            dispatch({ type: 'ADDITEM', payload: response.data, statusCode: 200 })
                        }
                        else {
                            dispatch({ type: 'ADDITEM', payload: response.data, statusCode: 201 })
                        }

                    })
            }
            catch (error) { }
        },

        onhandledelete: (data) => {
            try {
                var value = {
                    res_email: data.res_email,
                    itemname: data.itemname,
                }
                console.log(value)
                axios.defaults.withCredentials = true;
                axios.post('http://localhost:3001/deleteitem', value, { headers: { Authorization: localStorage.getItem('token') } })
                    .then((response) => {
                        console.log(response)
                        if (response.data.status == 200) {
                            dispatch({ type: 'DELETEITEM', payload: response.data, statusCode: 200 })
                        }
                        else {
                            dispatch({ type: 'DELETEITEM', payload: response.data, statusCode: 201 })
                        }

                    })
            }
            catch (error) { }
        },

        onhandledeletesection: (data) => {
            try {
                var value = {
                    res_email: data.res_email,
                    menusection: data.menusection,
                }
                console.log(value)
                axios.defaults.withCredentials = true;
                axios.post('http://localhost:3001/deletesection', value, { headers: { Authorization: localStorage.getItem('token') } })
                    .then((response) => {
                        console.log(response)
                        if (response.data.status == 200) {
                            dispatch({ type: 'DELETEITEM', payload: response.data, statusCode: 200 })
                        }
                        else {
                            dispatch({ type: 'DELETEITEM', payload: response.data, statusCode: 201 })
                        }

                    })
            }
            catch (error) { }
        },


    }
}
export default reduxForm({
    form: "items"
})(connect(mapStateToProps, mapDispatchToProps)(Items));