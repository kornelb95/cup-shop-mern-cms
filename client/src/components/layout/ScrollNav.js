import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ScrollNav extends Component {
  render() {
    let links = null;
    switch (this.props.parentComponent) {
      case "dashboard":
        links = (
          <React.Fragment>
            <Link className="nav-link text-white" to="/admin/users">
              Użytkownicy
            </Link>
            <Link className="nav-link text-white" to="/admin/products">
              Produkty
            </Link>
            <Link className="nav-link text-white" to="/admin/promo">
              Promocje
            </Link>
          </React.Fragment>
        );
        break;
      default:
        links = (
          <React.Fragment>
            <Link className="nav-link text-white" to="/category">
              Kategorie
            </Link>
            <Link className="nav-link text-white" to="/promo">
              Promocje
            </Link>
            <Link className="nav-link text-white" to="/promo">
              Promocje
            </Link>
            <Link className="nav-link text-white" to="/promo">
              Promocje
            </Link>
            <Link className="nav-link text-white" to="/promo">
              Promocje
            </Link>
            <Link className="nav-link text-white" to="/promo">
              Promocje
            </Link>
          </React.Fragment>
        );
        break;
    }

    return (
      <div className="nav-scroller bg-info shadow-lg fixed-top">
        <nav className="nav nav-underline">{links}</nav>
      </div>
    );
  }
}
export default connect(
  null,
  null
)(ScrollNav);
