import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { register } from "../../actions/authActions";
import TextInput from "../common/TextInput";

import "./register.css";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: ""
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.register(newUser, this.props.history);
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
          <h1>Załóż konto</h1>

          <TextInput
            name="name"
            value={this.state.name}
            id="name"
            placeholder="Nazwa użytkownika"
            errors={errors.name}
            onChange={this.onChange}
          />
          <TextInput
            name="email"
            value={this.state.email}
            id="email"
            placeholder="Adres email"
            errors={errors.email}
            onChange={this.onChange}
          />
          <TextInput
            type="password"
            name="password"
            value={this.state.password}
            id="password"
            placeholder="Wpisz hasło"
            errors={errors.password}
            onChange={this.onChange}
          />
          <TextInput
            type="password"
            name="password2"
            value={this.state.password2}
            id="password2"
            placeholder="Wpisz potwierdzenie hasła"
            errors={errors.password2}
            onChange={this.onChange}
          />
          <button className="btn btn-lg btn-dark btn-block" type="submit">
            Załóż konto
          </button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { register }
)(withRouter(Register));
