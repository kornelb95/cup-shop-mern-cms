import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ScrollNav extends Component {
  render() {
    return (
      <div className="nav-scroller bg-info shadow-lg">
        <nav className="nav nav-underline">
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
        </nav>
      </div>
    );
  }
}
export default connect(
  null,
  null
)(ScrollNav);
