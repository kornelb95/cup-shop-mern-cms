import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { createUser } from "../../../actions/adminActions";
import TextInput from "../../common/TextInput";
import Select from "../../common/Select";

class AddUser extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    role: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      role: this.state.role
    };

    this.props.createUser(newUser, this.props.history);
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
        <h1>Stwórz użytkownika</h1>
        <TextInput
          name="name"
          id="name"
          value={this.state.name}
          placeholder="Nazwa użytownika"
          errors={errors.name}
          onChange={this.onChange}
        />
        <TextInput
          name="email"
          id="email"
          value={this.state.email}
          placeholder="Adres email"
          errors={errors.email}
          onChange={this.onChange}
        />
        <TextInput
          type="password"
          name="password"
          id="password"
          value={this.state.password}
          placeholder="Wpisz hasło"
          errors={errors.password}
          onChange={this.onChange}
        />
        <TextInput
          type="password"
          name="password2"
          id="password2"
          value={this.state.password2}
          placeholder="Powtórz hasło"
          errors={errors.password2}
          onChange={this.onChange}
        />
        <Select
          name="role"
          onChange={this.onChange}
          options={[
            {
              value: 0,
              text: "Administrator"
            },
            {
              value: 1,
              text: "Moderator"
            },
            {
              value: 2,
              text: "Zwykły użytkownik"
            }
          ]}
        />
        <button className="btn btn-lg btn-dark btn-block" type="submit">
          Utwórz użytkownika
        </button>
      </form>
    );
  }
}

AddUser.propTypes = {
  createUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createUser }
)(withRouter(AddUser));
