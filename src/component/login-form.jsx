import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { Link } from "react-router-dom";

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
        <form onSubmit={this.handleSubmit} className='login-form'>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password")}
          {this.renderButton("Login")}
          <button type='register' className='btn btn-primary button-spacing'>
            <Link to='/register' className='no-underline'>
              Register
            </Link>
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
