import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../../App.css';
import axios from 'axios';
import { array } from 'prop-types';
import Modal from 'react-awesome-modal';


//create the Navbar Component
class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            res_name: "",
            r_id: "",
            menusection: [],
            section: {},
            phone: "",
            add: "",
            visible: false,
            itemdetail: [],
            total: 0,
            msg:"",
            orderSize:""

        }
        this.handleclick = this.handleclick.bind(this);
        this.quantitychange = this.quantitychange.bind(this);

    }
    handleclick = (e, item) => {
        this.state.itemdetail.push(item);
        this.setState({
            msg:"Item is successfully added"})
        console.log(this.state.itemdetail)
    }
    quantitychange = (e) => {
        this.setState({ quantity: e.target.value })
    }
    componentDidMount() {
        try {
            console.log("in componentdidmount")
            var data = {
                res_name: this.props.location.state.res_name,
            }
            console.log(data.res_name)
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/detail', data, { headers: { Authorization: localStorage.getItem('token') }})
                .then((response) => {
                    console.log("response")
                    console.log(response.data.data)
                    var result = response.data.data
                    var section = {}
                    var array = []
                    var i = 0;
                    result.forEach(function (item) {
                        if (Object.keys(section).includes(response.data.data[i].menu_sec)) {
                            array = [response.data.data[i].item_name, response.data.data[i].item_desc, response.data.data[i].item_price]
                            section[response.data.data[i].menu_sec].push(array)

                        }
                        else {
                            section[response.data.data[i].menu_sec] = [[response.data.data[i].item_name, response.data.data[i].item_desc, response.data.data[i].item_price],]
                        }

                        i++;
                    });
                    console.log(section)
                    this.setState({
                        menusection: Object.keys(section),
                        section: section,
                        res_name: this.props.location.state.res_name,
                        phone: response.data.data[0].phone,
                        add: response.data.data[0].res_zipcode

                    })

                });
        }
        catch (e) { }

    }


    render() {
        console.log(this.state.itemdetail)
        
        let redirectVar = null;
        if (localStorage.getItem('decoded_email') == null) {
            console.log("in cookie if")
            redirectVar = <Redirect to="/login" />
        }
        console.log(this.state.menusection)
        let details = Object.keys(this.state.section).map(menuType => {
            return (
                <div class="u-clickable u-list">
                    <div class="u-list-heading h5">
                        <div>{menuType}</div>
                    </div>
                    {
                        this.state.section[menuType].map(item => {
                            console.log("item", item)
                            return (
                                <form>
                                    <div class="u-clickable u-list">
                                        <div class="u-flex u-flex-justify u-flex-align">
                                            <div class="u-mar1">
                                                <div class="s-list-item-primary u-mar1">{item[0]}</div>
                                                <div class="s-list-item-secondary u-mar1">
                                                    <span class="span">{item[1]}</span></div>
                                            </div>
                                            <div class="edit" tabIndex="0">${item[2]}</div>
                                            {/* <input class="edit" tabIndex="0" type="number" onChange={this.quantitychange} placeholder="Quantity"></input> */}
                                            <div class="edit" role="button" onClick={(e) => {
                                                this.state.total = this.state.total + parseInt(item[2])
                                                this.handleclick(e, item[0])
                                            }}>Add to cart</div>
                                        </div>
                                    </div></form>

                            )
                        })
                    }
                </div>

            )
        })



        return (
            <div>
                {redirectVar}
                <div class="s-row">
                    <div class="account-content u-block s-col2 s-box1 s-col-md-9">
                        <form role="form">
                            <div class="u-list ">
                                <div class="u-list-heading h5">
                                    <div>Restaurant : {this.state.res_name}</div>
                                </div>
                                <div class="u-list-heading">
                                    <div>Address: {this.state.add}</div>
                                </div>
                                <div class="u-list-heading">
                                    <div>Contact Us: {this.state.phone}</div>
                                    <div class="edit">{this.state.msg}</div>
                                </div>
                                
                                <div class="u-list ">
                                    <div class="u-list-heading h5">
                                        <div class="u-flex u-flex-justify u-flex-align">
                                            <div>Menu</div>
                                            <button class="s4-btn" onClick={() => {
                                                try {
                                                    this.props.history.push({
                                                        pathname: "/cart",
                                                        state: {
                                                            orderSize: this.state.itemdetail,
                                                            itemdetail: this.state.itemdetail,
                                                            res_name: this.props.location.state.res_name,
                                                            r_id: this.props.location.state.r_id,
                                                            total: this.state.total
                                                        }
                                                    })
                                                } catch (e) { }
                                            }}><Link to='/cart'>Go To Cart</Link></button>
                                        </div></div></div>
                                {details}
                            </div>
                        </form>
                    </div>
                    {/* <div class="account-content u-block s-col2 s-box1 s-col-md-8 u-dimension-2">
                    <div class="u-list ">
                                <div class="u-list-heading color1 h5">
                                    <div>Add To Cart</div>
                                </div></div>
                                <div class="u-list ">
                                <div class="u-list-heading s-list-item-secondary">
                                    <div>Added Items</div>
                                </div></div>
                                <div class="u-list ">
                                <div class="u-list-heading h5 ">
                                    <div>Items Subtotal: </div>
                                    <div class="edit">Empty Bag </div>
                                </div></div>
                                <div class="u-list ">
                                <div class="u-list-heading">
                                    <button class="s3-btn "><Link to="">checkout</Link></button>  
                                </div></div>
                    
                    </div> */}
                </div>
            </div>
        )
    }
}

export default Details;