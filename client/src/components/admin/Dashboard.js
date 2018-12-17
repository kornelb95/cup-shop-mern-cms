import React, { Component } from "react";
import ScrollNav from "../layout/ScrollNav";
import Users from "../admin/users/Users";
export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <ScrollNav parentComponent="dashboard" />
        <div className="container">
          <section className="row">
            <Users />
          </section>
        </div>
      </React.Fragment>
    );
  }
}
