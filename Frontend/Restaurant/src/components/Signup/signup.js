import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            resname: "",
            zipcode: "",
            phone: "",
            email: "",
            pwd: "",
            cuisine: "",
            msg: ""

        }
        this.NameChangeHandler = this.NameChangeHandler.bind(this);
        this.resnameChangeHandler = this.resnameChangeHandler.bind(this);
        this.cuisineChangeHandler = this.cuisineChangeHandler.bind(this);
        this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    }


    NameChangeHandler = (e) => {
        this.setState({
            lName: e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    resnameChangeHandler = (e) => {
        this.setState({
            resname: e.target.value
        })
    }
    cuisineChangeHandler = (e) => {
        this.setState({
            cuisine: e.target.value
        })
    }
    phoneChangeHandler = (e) => {
        this.setState({
            phone: e.target.value
        })
    }
    zipcodeChangeHandler = (e) => {
        this.setState({
            zipcode: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            pwd: e.target.value
        })
    }

    onSubmit(values) {
        console.log(values)
        this.props.onSubmitHandle(values)
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `s1-block ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label className="label1">{field.label}</label>
                <input className="input1" type="text" {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>

        )
    }
    renderEmail(field) {
        const { meta: { touched, error } } = field;
        const className = `s1-block ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label className="label1">{field.label}</label>
                <input className="input1" type="text" {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>

        )
    }

    renderPass(field) {
        const { meta: { touched, error } } = field;
        const className = `s1-block ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label className="label1">{field.label}</label>
                <input className="input1" type="password" {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>

        )
    }

    render() {
        const { handleSubmit } = this.props;
        let redirectVar = null;

        if (this.props.authFlag == 200) {
            redirectVar = <Redirect to="/login" />
        }

        return (
            <div>
                {redirectVar}
                <div class="home">
                    <div class="form-block">
                        <div class="u-margin-bottom block">
                            <h3>Create Your Account</h3>
                            <p>{this.props.message}</p>
                        </div>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <div class="s-row">
                                <div class="s1-block">
                                    <Field
                                        label="Name"
                                        name="name"
                                        component={this.renderField}
                                        onChange={this.lNameChangeHandler}
                                    />
                                </div>
                            </div>
                            <div class="s-row">
                                <div class="s1-block">
                                    <Field
                                        label="Email Id"
                                        name="email"
                                        component={this.renderEmail}
                                        onChange={this.emailChangeHandler}
                                    />
                                </div></div>
                            <div class="s-row">
                                <div class="s1-block">
                                    <Field
                                        label="Restaurant Name"
                                        name="resname"
                                        component={this.renderEmail}
                                        onChange={this.resnameChangeHandler}
                                    />
                                </div></div>
                            <div class="s-row">
                                <div class="s1-block">
                                    <Field
                                        label="Cuisine"
                                        name="cuisine"
                                        component={this.renderEmail}
                                        onChange={this.cuisineChangeHandler}
                                    />
                                </div></div>
                            <div class="s-row">
                                <div class="s1-block">
                                    <Field
                                        label="Restaurant Zipcode"
                                        name="zipcode"
                                        component={this.renderEmail}
                                        onChange={this.zipcodeChangeHandler}
                                    />
                                </div></div>
                            <div class="s-row">
                                <div class="s1-block">
                                    <Field
                                        label="Phone"
                                        name="phone"
                                        component={this.renderEmail}
                                        onChange={this.phoneChangeHandler}
                                    />
                                </div></div>
                            <div class="s-row">
                                <div class="s1-block">
                                    <Field
                                        label="Password"
                                        name="password"
                                        component={this.renderPass}
                                        onChange={this.passwordChangeHandler}
                                    />
                                </div></div>
                            <div class="s-row">
                                <div class="s1-block">
                                    <input class="m" type="checkbox"></input>
                                    <label class="m label1">Keep me signed in</label>
                                </div></div>
                            <div class="s-row">
                                <div class="s1-block">
                                    <button class="s-btn-primary s-btn" type="submit">Create your account</button>
                                </div></div>
                        </form>
                        <div class="mr block">
                            <p>or</p>
                            <p>Have account already?<a href="/login">Log In</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function validate(values) {

    const errors = {};

    // Validate the inputs from 'values'
    if (!values.name) {
        errors.name = "Enter your Last Name";
    }
    if (!values.email) {
        errors.email = "Enter an email";
    }
    if (!values.resname) {
        errors.resname = "Enter an restaurant name";
    }
    if (!values.cuisine) {
        errors.cuisine = "Enter a cuisine name";
    }
    if (!values.zipcode) {
        errors.zipcode = "Enter an zipcode";
    }
    if (!values.password) {
        errors.password = "Enter Password";
    }

    return errors;
}

const mapStateToProps = state => {
    return {
        authFlag: state.signup.authFlag,
        message: state.signup.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitHandle: (data) => {
            const value = {
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
                resname: data.resname,
                cuisine: data.cuisine,
                zipcode: data.zipcode,
                msg: data.msg
            }
            console.log(value)
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/signup', value)
                .then((response) => {
                    console.log(response)
                    console.log(response.data.message)
                    dispatch({ type: 'SIGNUP', payload: response.data, statusCode: 200 })
                })
                .catch((error) => { });
        }
    }
}
export default reduxForm({
    validate,
    form: "signup"
})(connect(mapStateToProps, mapDispatchToProps)(Signup));