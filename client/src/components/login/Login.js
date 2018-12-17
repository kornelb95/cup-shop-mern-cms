import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { withRouter } from "react-router-dom";
import "./login.css";
import { connect } from "react-redux";
import { login, loginFb } from "../../actions/authActions";
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
  responseFacebook = response => {
    const userData = {
      name: response.name,
      email: response.email,
      password: response.id,
      password2: response.id
    };
    this.props.loginFb(userData);
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { errors } = this.props;

    return (
      <div className="container">
        <form className="form-signin mt-5 p-5" onSubmit={this.onSubmit}>
          <h1 className="text-center">Logowanie</h1>
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
          <div className="mt-3 text-center">
            <FacebookLogin
              appId="622298041444585"
              autoload={true}
              fields="name,email,picture"
              callback={this.responseFacebook}
              icon="fa-facebook"
            />
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loginFb: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { login, loginFb }
)(withRouter(Login));
