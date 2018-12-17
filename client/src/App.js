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
import Home from "./components/layout/Home";
import Dashboard from "./components/admin/Dashboard";
import AddUser from "./components/admin/users/AddUser";
import Footer from "./components/layout/Footer";
import EditUser from "./components/admin/users/EditUser";

if (localStorage.jwtToken) {
  // Set auth token header auth
  setToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setUser(decoded));
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
            <Switch>
              <PrivateRoute exact path="/admin/users" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/admin/users/add" component={AddUser} />
              <PrivateRoute
                exact
                path="/admin/users/edit/:id"
                component={EditUser}
              />
            </Switch>
            <Footer />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
