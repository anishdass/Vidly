import "./App.css";
import { Component } from "react";
import Movies from "./movies";
import { Route, Redirect, Switch } from "react-router-dom";
import Customers from "./customer";
import Rentals from "./rentals";
import NotFound from "./not-found";
import NavBar from "./nav-bar";
import React from "react";
import MovieForm from "./movie-form";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className='container'>
          <Switch>
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
