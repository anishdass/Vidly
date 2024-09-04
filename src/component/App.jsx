import React from "react";
import { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./movies";
import Customers from "./customer";
import Rentals from "./rentals";
import NotFound from "./not-found";
import NavBar from "./nav-bar";
import MovieForm from "./movie-form";
import LoginForm from "./login-form";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className='container'>
          <Switch>
            <Route path='/login' component={LoginForm}></Route>
            <Route path='/movies/:id' component={MovieForm} />
            <Route path='/movies' component={Movies}></Route>
            <Route path='/customers' component={Customers}></Route>
            <Route path='/rentals' component={Rentals}></Route>
            <Route path='/not-found' component={NotFound}></Route>
            <Redirect from='/' exact to='/movies' />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
export default App;
