import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleMenu } from "../../actions/menuActions";
import classnames from "classnames";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  handleLogout = () => {
    this.props.toggleMenu();
    this.props.logoutUser();
  };
  render() {
    const guestNavLinks = (
      <React.Fragment>
        <li className="nav-item">
          <Link
            style={{ position: "relative" }}
            className="nav-link"
            to="/cart"
            onClick={this.props.toggleMenu}
          >
            <i className="fas fa-shopping-cart fa-lg" />
            <span
              style={{
                color: "orange",
                fontWeight: "bold",
                position: "absolute",
                right: "2px",
                bottom: "0px"
              }}
            >
              {this.props.products.cart.length}
            </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/login"
            onClick={this.props.toggleMenu}
          >
            Zaloguj się
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/register"
            onClick={this.props.toggleMenu}
          >
            Załóż konto
          </Link>
        </li>
      </React.Fragment>
    );
    const loggedNavLinks = (
      <React.Fragment>
        <li className="nav-item">
          <Link
            style={{ position: "relative" }}
            className="nav-link"
            to="/cart"
            onClick={this.props.toggleMenu}
          >
            <i className="fas fa-shopping-cart fa-lg" />
            <span
              style={{
                color: "orange",
                fontWeight: "bold",
                position: "absolute",
                right: "2px",
                bottom: "0px"
              }}
            >
              {this.props.products.cart.length}
            </span>
          </Link>
        </li>
        {this.props.auth.user.role === 0 || this.props.auth.user.role === 1 ? (
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/admin/users"
              onClick={this.props.toggleMenu}
            >
              Panel Administracyjny
            </Link>
          </li>
        ) : null}

        <li className="nav-item">
          <Link
            className="nav-link"
            to="/profile/liked"
            onClick={this.props.toggleMenu}
          >
            <i className="fas fa-user mr-1" />
            {this.props.auth.user.email}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={this.handleLogout}>
            Wyloguj
          </Link>
        </li>
      </React.Fragment>
    );
    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <Link className="navbar-brand mr-auto mr-lg-0" to="/">
          Sklepik
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
            {this.props.auth.isAuthenticated ? loggedNavLinks : guestNavLinks}
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  collapse: state.menu.collapse,
  auth: state.auth,
  products: state.products
});

export default connect(
  mapStateToProps,
  { toggleMenu, logoutUser }
)(Navbar);
