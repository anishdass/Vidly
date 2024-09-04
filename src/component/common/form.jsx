import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;
    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault(); //To avoid loading of the page on pressing submit
    const errors = this.validate();

    this.setState({ errors: errors || {} });

    if (errors) return;
    console.log("Submitted");

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderButton(label) {
    return (
      <button
        type='submit'
        className='btn btn-primary'
        disabled={this.validate()}>
        {label}
      </button>
    );
  }

  renderInput(name, label) {
    const { data, errors, show } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        placeholder={label}
        onChange={this.handleChange}
        className='form-control'
        error={errors[name]}
      />
    );
  }

  renderFormCheck(type, label) {
    return (
      <div className='mb-3 form-check'>
        <input type={type} className='form-check-input' id={label} />
        <label className='form-check-label' for='exampleCheck1'>
          {label}
        </label>
      </div>
    );
  }
}

export default Form;
