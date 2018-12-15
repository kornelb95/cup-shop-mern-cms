import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./login.css";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import PropTypes from "prop-types";
import classnames from "classnames";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.login(userData);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { errors } = this.props;

    return (
      <form className="form-signin mt-5 p-5" onSubmit={this.onSubmit}>
        <div className="form-label-group">
          <input
            type="text"
            name="email"
            className={classnames("form-control", {
              "is-invalid": errors.email
            })}
            placeholder="Adres email"
            onChange={this.onChange}
            value={this.state.email}
            id="inputEmail"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
          <label htmlFor="inputEmail">Adres email</label>
        </div>

        <div className="form-label-group">
          <input
            type="password"
            name="password"
            className={classnames("form-control", {
              "is-invalid": errors.password
            })}
            placeholder="Hasło"
            onChange={this.onChange}
            value={this.state.password}
            id="inputPassword"
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
          <label htmlFor="inputPassword">Hasło</label>
        </div>
        <button className="btn btn-lg btn-dark btn-block" type="submit">
          Zaloguj
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { login }
)(withRouter(Login));
