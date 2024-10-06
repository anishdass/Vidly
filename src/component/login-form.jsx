import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { Link, Redirect } from "react-router-dom";
import Input from "./common/input";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to='/' />;
    const { data, errors } = this.state;

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className='form'>
          {this.renderInput("username", "Username", "autoFocus")}
          {this.renderInput("password", "Password")}
          {this.renderButton("Login")}

          <Link
            to='/register'
            className='btn btn-primary button-spacing no-underline'>
            Register
          </Link>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
