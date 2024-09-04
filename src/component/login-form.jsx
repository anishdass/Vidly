import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

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
          {this.renderFormCheck("checkbox", "Remember Me")}
          {this.renderButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
