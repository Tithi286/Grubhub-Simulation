import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

//create the Navbar Component
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            phone:"",
            pwd: "",
            msg: ""

        }
        this.fNameChangeHandler = this.fNameChangeHandler.bind(this);
        this.lNameChangeHandler = this.lNameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    }

    fNameChangeHandler = (e) => {
        this.setState({
            fName: e.target.value
        })
    }

    lNameChangeHandler = (e) => {
        this.setState({
            lName: e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    phoneChangeHandler = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            pwd: e.target.value
        })
    }
    
    submitSignUp(values) {
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
        let redirectVar=null
        if(this.props.authFlag == 200){
            redirectVar = <Redirect to="/login" />
        }

        return (
            <div>
                {redirectVar}
                <div>
                    <div class="u-margin-bottom block">
                        <h3>Create Your Account</h3>
                        <p>{this.props.message}</p>
                    </div>
                    <div class="form-block">
                        <form onSubmit={handleSubmit(this.submitSignUp.bind(this))}>
                            <div class="s-row">
                                <div class="s-block">
                                    <Field
                                        label="First Name"
                                        name="fname"
                                        component={this.renderField}
                                        onChange={this.fNameChangeHandler}
                                    />
                                </div>
                                <div class="s-block">
                                    <Field
                                        label="Last Name"
                                        name="lname"
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
    if (!values.fname) {
        errors.fname = "Enter your First Name";
    }
    if (!values.lname) {
        errors.lname = "Enter your Last Name";
    }
    if (!values.email) {
        errors.email = "Enter an email";
    }
    if (!values.phone) {
        errors.phone = "Enter an phone";
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
                fname: data.fname,
                lname: data.lname,
                email: data.email,
                password: data.password,
                phone: data.phone,
                msg: data.msg
                
            }
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/signup', value)
                .then((response) => {
                    console.log(response)
                    console.log(response.data.message)
                    dispatch({ type: 'SIGNUP', payload: response, statusCode: 200})
                })
                .catch((error) => {});
        }
    }
}


export default reduxForm({
    validate,
    form: "signup"
})(connect(mapStateToProps, mapDispatchToProps)(Signup));

