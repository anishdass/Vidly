import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { Link } from "react-router-dom";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string()
      .required()
      .valid("Comedy", "Action", "Thriller")
      .label("Genre"),
    numberInStock: Joi.number().max(10).required().label("Stock"),
    dailyRentalRate: Joi.number().max(10).required().label("Rate"),
  };

  doSubmit = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className='form'>
          {this.renderInput("title", "Title")}
          {this.renderInput("genre", "Genre")}
          {this.renderInput("stock", "Stock")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
