import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleMenu } from "../../actions/menuActions";
import classnames from "classnames";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  render() {
    const guestNavLinks = (
      <React.Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Zaloguj się
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Załóż konto
          </Link>
        </li>
      </React.Fragment>
    );
    const loggedNavLinks = (
      <React.Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={this.props.logoutUser}>
            Wyloguj
          </Link>
        </li>
      </React.Fragment>
    );
    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <Link className="navbar-brand mr-auto mr-lg-0" to="/">
          Cup Shop
        </Link>
        <button
          className="navbar-toggler p-0 border-0"
          type="button"
          data-toggle="offcanvas"
          onClick={this.props.toggleMenu}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className={classnames(
            "navbar-collapse offcanvas-collapse d-md-flex flex-md-row-reverse",
            {
              open: this.props.collapse
            }
          )}
        >
          <ul className="navbar-nav">
            {this.props.isAuthenticated ? loggedNavLinks : guestNavLinks}
          </ul>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  collapse: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  collapse: state.menu.collapse,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { toggleMenu, logoutUser }
)(Navbar);
