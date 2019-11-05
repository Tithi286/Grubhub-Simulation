import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../../App.css';
import axios from 'axios';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";



//create the Navbar Component
class Updateitem extends Component {
    constructor() {
        super();
        this.state = {
            res_email: sessionStorage.getItem('user_email'),
            itemname: "",
            itemname2: "",
            itemdesc: "",
            menusection: "",
            price: "",
            authFlag: false,
            msg: "",
            edit: ""
        }
        //this.ridchange = this.ridchange.bind(this);
        this.itemnamechange = this.itemnamechange.bind(this);
        this.itemdescchange = this.itemdescchange.bind(this);
        this.menusectionchange = this.menusectionchange.bind(this);
        this.itempricechange = this.itempricechange.bind(this);
        this.handleupdatename = this.handleupdatename.bind(this);
        this.updatename = this.updatename.bind(this);
        this.updatename2 = this.updatename2.bind(this);
        this.updatedesc = this.updatedesc.bind(this);
        this.updatemenusec = this.updatemenusec.bind(this);
        this.updateprice = this.updateprice.bind(this);
        this.handleupdatedesc = this.handleupdatedesc.bind(this);
        this.handleupdatemenusec =  this.handleupdatemenusec.bind(this);
        this.handleupdateprice = this.handleupdateprice.bind(this);
        //this.handledelete = this.handledelete.bind(this)
    }

    // ridchange=(e)=>{
    //     this.setState({rid:e.target.value})
    // }
    itemnamechange = (e) => {
        this.setState({ edit: "name" })
    }
    itemdescchange = (e) => {
        this.setState({ edit: "description" })
        console.log("desc")
    }
    menusectionchange = (e) => {
        this.setState({ edit: "menusection" })
    }
    itempricechange = (e) => {
        this.setState({ edit: "price" })
        console.log(this.state.edit)
    }
    updatename(e) {
        this.setState({ itemname: e.target.value })
    }
    updatedesc(e) {
        this.setState({ itemdesc: e.target.value })
    }
    updatemenusec(e) {
        this.setState({ menusection: e.target.value })
    }
    updateprice(e) {
        this.setState({ price: e.target.value })
        console.log(this.state.price)
    }
    updatename2(e) {
        this.setState({ itemname2: e.target.value })
    }
    handleupdatename = (e) => {
        //e.preventDefault();
        var data = {
            res_email: this.state.res_email,
            itemname: this.state.itemname,
            itemname2: this.state.itemname2
        }

        console.log(data);
        this.props.Onhandleupdateitemname(data);
        // //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post('http://localhost:3001/updateitemname', data, { headers: { Authorization: localStorage.getItem('token') }})
        //     .then(response => {
        //         console.log("Status Code : ", response);
        //         if (response.data.status == 200) {
        //             this.setState({
        //                 authFlag: true,
        //                 msg: ""
        //             })
        //         }
        //         else {
        //             this.setState({
        //                 authFlag: false,
        //                 msg: "Something went wrong. Try again."
        //             })
        //         }
        //     }
        //     );
    }

    handleupdatedesc = (e) => {
        console.log("handle desc")
        //e.preventDefault();
        const data = {
            res_email: this.state.res_email,
            itemname: this.state.itemname,
            itemdesc: this.state.itemdesc
        }

        console.log(data);
        this.props.Onhandleupdatedesc(data);
        // //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post('http://localhost:3001/updateitemdesc', data, { headers: { Authorization: localStorage.getItem('token') }})
        //     .then(response => {
        //         console.log("Status Code : ", response);
        //         if (response.data.status == 200) {
        //             this.setState({
        //                 authFlag: true,
        //                 msg: ""
        //             })
        //         }
        //         else {
        //             this.setState({
        //                 authFlag: false,
        //                 msg: "Something went wrong. Try again."
        //             })
        //         }
        //     }
        //     );
    }

    handleupdatemenusec = (e) => {
        e.preventDefault();
        const data = {
            res_email: this.state.res_email,
            itemname: this.state.itemname,
            menusection: this.state.menusection
        }

        console.log(data.menusection);
        this.props.Onhandleupdatemenusec(data);
        // //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post('http://localhost:3001/updatemenusection', data, { headers: { Authorization: localStorage.getItem('token') }})
        //     .then(response => {
        //         console.log("Status Code : ", response);
        //         if (response.data.status == 200) {
        //             this.setState({
        //                 authFlag: true,
        //                 msg: ""
        //             })
        //         }
        //         else {
        //             this.setState({
        //                 authFlag: false,
        //                 msg: "Something went wrong. Try again."
        //             })
        //         }
        //     }
        //     );
    }

    handleupdateprice = (e) => {
        //e.preventDefault();
        const data = {
            res_email: this.state.res_email,
            itemname: this.state.itemname,
            price: this.state.price
        }
        console.log(this.state.price)
        console.log(data.price);
        this.props.Onhandleupdateprice(data);
        // //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post('http://localhost:3001/updateitemprice', data, { headers: { Authorization: localStorage.getItem('token') }})
        //     .then(response => {
        //         console.log("Status Code : ", response);
        //         if (response.data.status == 200) {
        //             this.setState({
        //                 authFlag: true,
        //                 msg: ""
        //             })
        //         }
        //         else {
        //             this.setState({
        //                 authFlag: false,
        //                 msg: "Something went wrong. Try again."
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

        let redirectVarM = null;

        if (this.state.authFlag == true) {
            redirectVarM = <Redirect to="/menu" />
        }

        var edit = this.state.edit;
        let button;

        if (edit == "name") {
            console.log("name")
            button = (
                <div>
                    <form onSubmit={this.handleupdatename}>
                        <div class="u-clickable u-list">
                            <div class="s-row">
                                <div class="s1-block">
                                    <label class="label1">Current Item Name</label><br />
                                    <input class="input" type="text" onChange={this.updatename} name="itemname1" required></input><br />
                                    <label class="label1">New Item Name</label><br />
                                    <input class="input" type="text" onChange={this.updatename2} name="itemname2" required></input>
                                </div></div>
                        </div>
                        <button type="submit">Update</button>
                        <button>Cancel</button>
                    </form>
                </div>
            )
        }
        else if (edit == "description") {
            console.log("description")
            button = (
                <div>
                   
                    <form onSubmit={this.handleupdatedesc}>
                        <div class="u-clickable u-list">
                            <div class="s-row">
                                <div class="s1-block">
                                    <label class="label1">Item Name</label><br />
                                    <input class="input" type="text" onChange={this.updatename} name="itemname" required></input><br />
                                    <label class="label1">New Item Description</label><br />
                                    <input class="input" type="text" onChange={this.updatedesc} name="itemdesc" required></input>
                                </div></div>
                        </div>
                        <button type="submit">Update</button>
                        <button>Cancel</button>
                    </form>
                </div>
            )
        }
        else if (edit == "menusection") {
        button = (
            <div>
                <form onSubmit={this.handleupdatemenusec}>
                    <div class="u-clickable u-list">
                        <div class="s-row">
                            <div class="s1-block">
                                <label class="label1">Item Name</label><br />
                                <input class="input" type="text" onChange={this.updatename} name="itemname" required></input><br />
                                <label class="label1">New Item Menu Section</label><br />
                                <input class="input" type="text" onChange={this.updatemenusec} name="menusection" required></input>
                            </div></div>
                    </div>
                    <button type="submit">Update</button>
                    <button>Cancel</button>
                </form>
            </div>
        )
    }
    else if (edit == "price") {
    button = (
        <div>
            <form onSubmit={this.handleupdateprice}>
                <div class="u-clickable u-list">
                    <div class="s-row">
                        <div class="s1-block">
                            <label class="label1">Item Name</label><br />
                            <input class="input" type="text" onChange={this.updatename} name="itemname" required></input><br />
                            <label class="label1">New Item Price</label><br />
                            <input class="input" type="text" onChange={this.updateprice} name="price" required></input>
                        </div></div>
                </div>
                <button type="submit">Update</button>
                <button>Cancel</button>
            </form>
        </div>
    )
}
return (
    <div>
        {redirectVar}
        {redirectVarM}
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
                <form>

                    <div class="u-list ">
                        <div class="u-list-heading h5">
                            <div>Update Item</div>
                            <div>{this.props.msg}</div>
                        </div>
                        <div class="u-clickable u-list">
                            {/* <div class="s-row">
                                <div class="s1-block">
                                    <label class="label1">Restaurant Id</label>
                                    <div class="edit" tabIndex="0" onClick={this.handlephoneedit} role="button">Edit</div>
                                </div></div> */}
                            <div class="s-row">
                                <div>
                                    <label class="label1">Item Name</label><br />
                                    <div class="edit" tabIndex="0" onClick={this.itemnamechange} role="button">Edit</div>
                                </div></div>
                            <div class="s-row">
                                <div>
                                    <label class="label1">Item Description</label><br />
                                    <div class="edit" tabIndex="0" onClick={this.itemdescchange} role="button">Edit</div>
                                </div></div>
                            <div class="s-row">
                                <div>
                                    <label class="label1">Menu Section (Item to be displayed in.)</label><br />
                                    <div class="edit" tabIndex="0" onClick={this.menusectionchange} role="button">Edit</div>
                                </div></div>
                            <div class="s-row">
                                <div>
                                    <label class="label1">Item Price</label><br />
                                    <div class="edit" tabIndex="0" onClick={this.itempricechange} role="button">Edit</div>
                                </div></div>
                        </div>
                    </div>
                    </form>
                    <div class="s-col1 s-col3 u-dimension-2  s-box1">
                         {button}
                    </div> 
            </div>
           
        </div>
    </div>
)
    }
}
const mapStateToProps = state => {
    return {
        authFlag: state.updateitem.authFlag,
        msg: state.updateitem.message,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        
        Onhandleupdateitemname: (data) => {
            var info = {
                res_email: data.res_email,
                itemname: data.itemname,
                itemname2: data.itemname2
            }
            console.log(info);
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/updateitemname', info, { headers: { Authorization: localStorage.getItem('token') }})
                .then(response => {
                    console.log("Status Code : ", response);
                    if (response.data.status == 200) {
                        dispatch({ type: 'UPDATEITEMNAME', payload: response.data, statusCode: 200})
                    }
                    else if (response.data.status == 201) {
                        dispatch({ type: 'UPDATEITEMNAME', payload: response.data, statusCode: 201})
                    }
                });
           
        },

        Onhandleupdatedesc: (data) => {
            var info = {
            res_email: data.res_email,
            itemname: data.itemname,
            itemdesc: data.itemdesc
            }
            console.log(info);
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/updateitemdesc', info, { headers: { Authorization: localStorage.getItem('token') }})
                .then(response => {
                    console.log("Status Code : ", response);
                    if (response.data.status == 200) {
                        dispatch({ type: 'UPDATEDESC', payload: response.data, statusCode: 200})
                    }
                    else if (response.data.status == 201) {
                        dispatch({ type: 'UPDATEDESC', payload: response.data, statusCode: 201})
                    }
                });
           
        },

        Onhandleupdatemenusec : (data) => {
            var info = {
                res_email: data.res_email,
                itemname: data.itemname,
                menusection: data.menusection
            }
            console.log(info);
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/updatemenusection', info, { headers: { Authorization: localStorage.getItem('token') }})
                .then(response => {
                    console.log("Status Code : ", response);
                    if (response.data.status == 200) {
                        dispatch({ type: 'UPDATEMENUSEC', payload: response.data, statusCode: 200})
                    }
                    else if (response.data.status == 201) {
                        dispatch({ type: 'UPDATEMENUSEC', payload: response.data, statusCode: 201})
                    }
                });
           
        },

        Onhandleupdateprice : (data) => {
            var info = {
                res_email: data.res_email,
                itemname: data.itemname,
                price: data.price
            }
            console.log(info);
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/updateitemprice', info, { headers: { Authorization: localStorage.getItem('token') }})
                .then(response => {
                    console.log("Status Code : ", response);
                    if (response.data.status == 200) {
                        dispatch({ type: 'UPDATEPRICE', payload: response.data, statusCode: 200})
                    }
                    else if (response.data.status == 201) {
                        dispatch({ type: 'UPDATEPRICE', payload: response.data, statusCode: 201})
                    }
                });
           
        },


    }
}
export default reduxForm({
    form: "updateitem"
})(connect(mapStateToProps, mapDispatchToProps)(Updateitem));