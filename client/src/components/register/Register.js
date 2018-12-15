import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import PropTypes from "prop-types";
import classnames from "classnames";
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
      <form className="form-signin mt-5 p-5" onSubmit={this.onSubmit}>
        <h1>Załóż konto</h1>
        <div className="form-label-group">
          <input
            type="text"
            name="name"
            className={classnames("form-control", {
              "is-invalid": errors.name
            })}
            placeholder="Nazwa użytownika"
            onChange={this.onChange}
            value={this.state.name}
            id="inputname"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          <label htmlFor="inputname">Nazwa użytownika</label>
        </div>
        <div className="form-label-group">
          <input
            type="text"
            name="email"
            className={classnames("form-control", {
              "is-invalid": errors.email
            })}
            placeholder="Nazwa użytownika"
            onChange={this.onChange}
            value={this.state.email}
            id="inputemail"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
          <label htmlFor="inputemail">Adres email</label>
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
        <div className="form-label-group">
          <input
            type="password"
            name="password2"
            className={classnames("form-control", {
              "is-invalid": errors.password2
            })}
            placeholder="Potwierdź hasło"
            onChange={this.onChange}
            value={this.state.password2}
            id="inputPassword2"
          />
          {errors.password2 && (
            <div className="invalid-feedback">{errors.password2}</div>
          )}
          <label htmlFor="inputPassword2">Potwierdź hasło</label>
        </div>
        <button className="btn btn-lg btn-dark btn-block" type="submit">
          Załóż konto
        </button>
      </form>
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
