import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";
import { facebookid } from "../../config/config";
import { login, loginFb } from "../../actions/authActions";
import TextInput from "../common/TextInput";

import "./login.css";

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
  responseFacebook = ({ name, email, id }) => {
    const userData = {
      name,
      email,
      password: id,
      password2: id
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
          <TextInput
            name="email"
            id="email"
            value={this.state.email}
            errors={errors.email}
            placeholder="Adres Email"
            onChange={this.onChange}
          />
          <TextInput
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            errors={errors.password}
            placeholder="Wpisz hasło"
            onChange={this.onChange}
          />

          <button className="btn btn-lg btn-dark btn-block" type="submit">
            Zaloguj
          </button>
          <div className="mt-3 text-center">
            <FacebookLogin
              appId={facebookid}
              autoload={true}
              fields="name,email,picture"
              callback={this.responseFacebook}
              icon="fa-facebook"
              textButton="Logowanie przez Facebook"
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
