import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { Link } from "react-router-dom";
import Input from "./common/input";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    console.log("Submitted");
  };

  render() {
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
