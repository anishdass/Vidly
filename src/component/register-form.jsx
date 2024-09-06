import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { Link } from "react-router-dom";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className='login-form'>
          {this.renderInput("name", "Name")}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password")}
          <button type='register' className='btn btn-primary button-spacing'>
            <Link to='/login' className='no-underline'>
              Back
            </Link>
          </button>
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
