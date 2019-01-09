import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchUsers, deleteUser } from "../../../actions/adminActions";
import Spinner from "../../common/Spinner";
import { Link } from "react-router-dom";
class Users extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    let { users, loading } = this.props.admin;
    const role = this.props.auth.user.role;
    let content;
    if (loading) {
      content = <Spinner />;
    } else {
      users = Object.values(users);
      let rows = users.map(user => (
        <tr key={user._id}>
          <td>{user.email}</td>
          <td>{user.name}</td>
          <td>{user.role}</td>
          <td className="text-right">
            <Link
              to={`/admin/users/edit/${user._id}`}
              className="btn btn-primary"
              style={role ? { cursor: "not-allowed" } : {}}
              onClick={role ? e => e.preventDefault() : null}
            >
              <i className="fas fa-edit" />
            </Link>
          </td>
          <td className="text-right">
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.props.deleteUser.bind(this, user._id)}
              disabled={role ? true : false}
            >
              <i className="fas fa-trash-alt" />
            </button>
          </td>
        </tr>
      ));
      content = (
        <div className="table-responsive">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Nazwa</th>
                <th scope="col">Rola</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      );
    }
    return (
      <React.Fragment>
        <h1 className="text-center w-100 mt-2">Użytkownicy</h1>
        {role ? (
          <h2 className="text-danger text-center">
            Nie jesteś uprawniony do zarządzania użytkownikami
          </h2>
        ) : null}
        <div className="w-100">
          <Link
            to="/admin/users/add"
            className="btn btn-outline-success my-3"
            style={role ? { cursor: "not-allowed" } : {}}
            onClick={role ? e => e.preventDefault() : null}
          >
            Utwórz użytkownika
          </Link>
        </div>
        {content}
      </React.Fragment>
    );
  }
}

Users.propTypes = {
  admin: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { fetchUsers, deleteUser }
)(Users);
