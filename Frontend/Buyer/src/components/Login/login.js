import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { login } from "../../actions";
import cookie from 'react-cookies';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            authFlag: false,
            msg: ""
        }
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);


    }
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    submitLogin(values) {
        this.props.onSubmitHandle(values)
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
        let redirectVar = null;
        const { handleSubmit } = this.props;
        // if (cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/profile" />

        if (this.props.authFlag == 200) {
            redirectVar = <Redirect to="/profile" />
        }

        return (
            <div>
                {redirectVar}
                <div>
                    <div class="u-margin-bottom block">
                        <h3>Sign in with your Account</h3>
                        <p>{this.props.message}</p>
                    </div>
                    <div class="form-block">
                        <form onSubmit={handleSubmit(this.submitLogin.bind(this))}>
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
                                    <button class="s-btn-primary s-btn" type="submit">Log In</button>
                                </div></div>
                        </form>
                        <div class="mr block">
                            <p>or</p>
                            <p>Create new account. <a href="/signup">Sign Up</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function validate(values) {

    const errors = {};

    if (!values.email) {
        errors.email = "Enter an email";
    }
    if (!values.password) {
        errors.password = "Enter Password";
    }
    return errors;
}
const mapStateToProps = state => {
    return {
        authFlag: state.login.authFlag,
        message: state.login.message,

    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSubmitHandle: (data) => {
            const value = {
                email: data.email,
                password: data.password,
                msg: data.msg
            }
            console.log(data)
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/login', value)
                .then((response) => {
                    console.log(response)
                    console.log(response.data.message)

                    localStorage.setItem('token', response.data.token);
                    const decoded = jwt_decode(response.data.token);
                    console.log(decoded);
                    localStorage.setItem('decoded_email', decoded.email);
                    sessionStorage.setItem('login_email', response.data.data.email);
                    sessionStorage.setItem('res_cuisine', response.data.data.cuisine);
                    console.log(response.data.data.email)
                    dispatch({ type: 'LOGIN', payload: response.data, statusCode: 200 })
                })
                .catch((error) => { });
        }
    }
}


export default reduxForm({
    validate,
    form: "login"
})(connect(mapStateToProps, mapDispatchToProps)(Login));
