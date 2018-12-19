import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { fetchUser, updateUser } from "../../../actions/adminActions";
import TextInputDefault from "../../common/TextInputDefault";
import TextInput from "../../common/TextInput";
import Select from "../../common/Select";

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
          <TextInputDefault
            name="email"
            id="email"
            defaultValue={this.state.email}
            placeholder="Adres Email"
            errors={errors.email}
            onChange={this.onChange}
            disabled={true}
          />
          <TextInputDefault
            name="name"
            id="name"
            defaultValue={this.state.name}
            placeholder="Nazwa użytkownika"
            errors={errors.name}
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
            value={this.state.role}
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
