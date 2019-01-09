import React, { Component } from "react";
import ScrollNav from "../layout/ScrollNav";
import { Switch } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";
import ProfileProducts from "./ProfileProducts";

export default class Profile extends Component {
  render() {
    return (
      <React.Fragment>
        <ScrollNav parentComponent="profile" />
        <div className="container">
          <section className="row">
            <Switch>
              <PrivateRoute
                exact
                path="/profile/liked"
                component={ProfileProducts}
              />
            </Switch>
          </section>
        </div>
      </React.Fragment>
    );
  }
}
