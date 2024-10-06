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
import Logout from "./logout";
import RegisterForm from "./register-form";
import auth from "../services/authService";
import ProtectedRoute from "./common/protectedroute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className='container'>
          <Switch>
            <Route path='/register' component={RegisterForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/logout' component={Logout} />
            <ProtectedRoute path='/movies/new' component={MovieForm} />
            <ProtectedRoute path='/movies/:id' component={MovieForm} />
            <Route
              path='/movies'
              render={(props) => <Movies {...props} user={this.state.user} />}
            />
            <Route path='/customers' component={Customers} />
            <Route path='/rentals' component={Rentals} />
            <Route path='/not-found' component={NotFound} />
            <Redirect from='/' exact to='/movies' />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
export default App;
