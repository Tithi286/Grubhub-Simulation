import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { login } from "../../actions";
import cookie from 'react-cookies';


//create the Navbar Component
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            s_food: "",
            cuisine:"",
            authFlag: "",
            currentPage : 1,
            itemsPerPage : 3
        }
        this.handleClick = this.handleClick.bind(this); 
        this.cuisinechange = this.cuisinechange.bind(this); 
        this.updatecuisine = this.updatecuisine.bind(this); 

    }
    componentWillReceiveProps({items}) {
        console.log('Inside menu will receive props');
        this.setState({
            items : items
        });
    }

    componentDidMount(){
        var data = {
            food: sessionStorage.getItem('food')
        }
        console.log(data)
        this.props.Oncomponentdidmount(data)  

        // axios.defaults.withCredentials = true;
        // axios.post('http://localhost:3001/home',data, { headers: { Authorization: localStorage.getItem('token') }})
        //         .then((response) => {
        //             console.log(response.data.data)
        //         //update the state with the response data
        //         this.setState({
        //             items : this.state.items.concat(response.data.data) 
        //         });
        //     });
    }

    handleClick(event) {
        console.log(event.target.id);
        this.setState({
          currentPage: Number(event.target.id)
        });
      }
    
    cuisinechange = (e) => {
        console.log(e.target.value)
        this.state.cuisine = e.target.value
        console.log(this.state.s_food)
    }

    updatecuisine = (e) => {
        e.preventDefault();
        var data = {};
        console.log(this.state.s_food)
            data = {
                food: sessionStorage.getItem('food'),
                cuisine: this.state.cuisine
            }
            this.props.Onupdatecuisine(data);
    }

    // activehandler=(e)=>{
    //     var data = {
    //         s_order : "active",
    //         s_food: this.state.s_food
    //     }
    //     e.preventDefault();
    //     axios.defaults.withCredentials = true;
    //     axios.post('http://localhost:3001/orders',data)
    //             .then((response) => {
    //             //update the state with the response data
    //             this.setState({
    //                 orders : this.state.orders.concat(response.data) 
    //             });
    //         });
    // }


    render() {
        let redirectVarP = null;
        console.log(this.props.items);
        
        if (localStorage.getItem('decoded_email') == null) {
            redirectVarP = <Redirect to="/login" />
        }

        const {items,currentPage, itemsPerPage} = this.state;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

        let details =currentItems.map(item => {
            return(
                <div class="u-flex u-flex-justify u-flex-align">
                                        <div class="u-mar1">
                                        <div class="s-list-item-primary u-mar1">Restaurant Name: {item.res_name}</div>
                                            <div class="s-list-item-primary u-mar1">Item Name: {item.item_name}</div>
                                            <div class="s-list-item-primary u-mar1">Item Price: {item.item_price}</div>
                                        </div>
                                        <div class="edit" tabIndex="0" role="button" onClick={() => {
                                    this.props.history.push({
                                        pathname: "/details",
                                        state: {res_name: item.res_name,
                                                r_id:item.r_id        
                                        }
                                    })
                                }
                                }>Details</div>
                            </div>  
            )
        })

        const pageNumber = [];
        for(let i = 1; i <= Math.ceil(items.length / itemsPerPage);i++) {
            pageNumber.push(i);
        }

        const renderNumber = pageNumber.map(number => {
            return (
                <button className = "btn btn-outline-primary" key = {number} id = {number} onClick = {this.handleClick}> 
                    {number}
                </button>
            );
        });


        return (
            <div>
                {redirectVarP}
                <div class="s-row">
                    <div class="account-content u-block s-col2 s-box1 s-col-md-9">
                        <form role="form">
                            <div class="u-list ">
                                <div class="u-list-heading h5">
                                    <div class>Search Item Results</div><br/>
                                    <div class>Filter</div>
                                    <select name="CuisineFilter" onChange={this.cuisinechange}>
                                        <option value={this.state.cuisine}>{this.state.cuisine}</option>
                                        <option value="Indian">Indian</option>
                                        <option value="Chinese">Chinese</option>
                                        <option value="Italian">Italian</option>
                                    </select>
                                    <button class="s5-btn" name="update" onClick={(e) => {
                            this.updatecuisine(e)
                        }}>Update</button>
                                </div>
                                <div class="u-clickable u-list">
                                    {details}
                                </div>
                            </div>
                        </form>
                        <div class="u-clickable u-list">
                        {renderNumber}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
         items : state.search.items
        
    }
}

const mapDispatchToProps = dispatch => {
    return {

        Oncomponentdidmount: (data) => {
     
            try{
                console.log("in componentdidmount")
                var datafood = {
                    food: data.food
                }
                console.log(datafood.food)
                axios.defaults.withCredentials = true;
                axios.post('http://localhost:3001/home',datafood, { headers: { Authorization: localStorage.getItem('token') }})
                        .then((response) => {
                            console.log(response.data.data);
                            console.log(response.data);
                        //update the state with the response data
                        
                        if (response.status == 200) {
                            console.log("in if")
                            dispatch({ type: 'SEARCH', payload: response.data, statusCode: 200})                        }
                        else if (response.status == 400) {
                            dispatch({ type: 'SEARCH', payload: response.data, statusCode: 400})
                        }
                        
                    });}catch(e){}
                },

                Onupdatecuisine: (data) => {
     
                    try{
                        console.log("in update cuisine")
                        var datafood = {
                            food: data.food,
                            cuisine: data.cuisine
                        }
                        console.log(datafood.food)
                        console.log(datafood.cuisine)
                        axios.defaults.withCredentials = true;
                        axios.post('http://localhost:3001/filter',datafood, { headers: { Authorization: localStorage.getItem('token') }})
                                .then((response) => {
                                    console.log(response.data.data);
                                    console.log(response.data);
                                //update the state with the response data
                                
                                if (response.status == 200) {
                                    console.log("in if")
                                    dispatch({ type: 'FILTER', payload: response.data, statusCode: 200})                        }
                                else if (response.status == 400) {
                                    dispatch({ type: 'FILTER', payload: response.data, statusCode: 400})
                                }
                                
                            });}catch(e){}
                        },
        
    }
}

export default reduxForm({
    form: "search"
})(connect(mapStateToProps, mapDispatchToProps)(Search));