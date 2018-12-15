import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PrivateRoute from "./components/common/PrivateRoute";
import store from "./store";
import "./App.css";
import setToken from "./functions/setToken";
import { setUser } from "./actions/authActions";
import jwt_decode from "jwt-decode";

import Navbar from "./components//layout/Navbar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ScrollNav from "./components/layout/ScrollNav";
import Home from "./components/layout/Home";

if (localStorage.jwtToken) {
  // Set auth token header auth
  setToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setUser(decoded));

  // // Check for expired token
  // const currentTime = Date.now() / 1000;
  // if (decoded.exp < currentTime) {
  //   // Logout user
  //   store.dispatch(logoutUser());
  //   // Clear current Profile
  //   store.dispatch(clearCurrentProfile());
  //   // Redirect to login
  //   window.location.href = '/login';
  // }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Navbar />
            <ScrollNav />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Switch>
              <PrivateRoute exact path="/admin" />
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
