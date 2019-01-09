import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
// import PrivateRoute from "./components/common/PrivateRoute";
import store from "./store";
import "./App.css";
import setToken from "./functions/setToken";
import { setUser, logoutUser } from "./actions/authActions";
import jwt_decode from "jwt-decode";

import Navbar from "./components//layout/Navbar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Dashboard from "./components/admin/Dashboard";
import Footer from "./components/layout/Footer";
import Cart from "./components/cart/Cart";
import Profile from "./components/profile/Profile";

if (localStorage.jwtToken) {
  // Set auth token header auth
  setToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/admin" component={Dashboard} />
            <Route path="/cart" component={Cart} />
            <Route path="/profile" component={Profile} />
            <Footer />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
