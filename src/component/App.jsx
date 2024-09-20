import React from "react";
import { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./movies";
import Customers from "./customer";
import Rentals from "./rentals";
import NotFound from "./not-found";
import NavBar from "./nav-bar";
import MovieForm from "./movie-form";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className='container'>
          <Switch>
            <Route path='/register' component={RegisterForm}></Route>
            <Route path='/login' component={LoginForm}></Route>
            <Route path='/movies/new' component={MovieForm} />
            <Route path='/movies/:id' component={MovieForm}></Route>
            <Route path='/movies' component={Movies}></Route>
            <Route path='/customers' component={Customers}></Route>
            <Route path='/rentals' component={Rentals}></Route>
            <Route path='/not-found' component={NotFound}></Route>
            <Redirect from='/' exact to='/movies' />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
export default App;
