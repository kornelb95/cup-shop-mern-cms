import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchUser, updateUser } from "../../../actions/adminActions";
import PropTypes from "prop-types";
import classnames from "classnames";

class AddUser extends Component {
  state = {
    name: "",
    password: "",
    password2: "",
    email: "",
    role: "",
    errors: {}
  };
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.admin.userById) {
      const { name, email, role } = nextProps.admin.userById;
      this.setState({
        name,
        email,
        role
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { name, password, password2, email, role } = this.state;
    const userData = {
      name,
      password,
      password2,
      email,
      role
    };
    this.props.updateUser(userData, this.props.history);
  };
  render() {
    const { errors } = this.props;
    return (
      <div className="container">
        <form className="form-signin mt-5 p-5" onSubmit={this.onSubmit}>
          <h1>Edytuj dane</h1>
          <div className="form-label-group">
            <input
              type="text"
              name="email"
              disabled
              className={classnames("form-control", {
                "is-invalid": errors.email
              })}
              placeholder="Nazwa użytownika"
              onChange={this.onChange}
              defaultValue={this.state.email}
              id="inputemail"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
            <label htmlFor="inputemail">Adres email</label>
          </div>
          <div className="form-label-group">
            <input
              type="text"
              name="name"
              className={classnames("form-control", {
                "is-invalid": errors.name
              })}
              placeholder="Nazwa użytownika"
              onChange={this.onChange}
              defaultValue={this.state.name}
              id="inputname"
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
            <label htmlFor="inputname">Nazwa użytownika</label>
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
            <label htmlFor="inputPassword">Nowe Hasło</label>
          </div>
          <div className="form-label-group">
            <input
              type="password"
              name="password2"
              className={classnames("form-control", {
                "is-invalid": errors.password2
              })}
              placeholder="Potwierdź nowe hasło"
              onChange={this.onChange}
              value={this.state.password2}
              id="inputPassword2"
            />
            {errors.password2 && (
              <div className="invalid-feedback">{errors.password2}</div>
            )}
            <label htmlFor="inputPassword2">Potwierdź nowe hasło</label>
          </div>
          <div className="form-label-group">
            <select
              name="role"
              className="form-control"
              value={this.state.role}
              onChange={this.onChange}
            >
              <option value="0">Administrator</option>
              <option value="1">Moderator</option>
              <option value="2">Zwykły użytkownik</option>
            </select>
          </div>
          <button className="btn btn-lg btn-dark btn-block" type="submit">
            Zmień dane
          </button>
        </form>
      </div>
    );
  }
}

AddUser.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  admin: state.admin
});
export default connect(
  mapStateToProps,
  { fetchUser, updateUser }
)(withRouter(AddUser));
