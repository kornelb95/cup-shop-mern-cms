import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import {
  fetchProductCategories,
  deleteProductCategory
} from "../../../actions/adminActions";
import Spinner from "../../common/Spinner";

class ProductCategories extends Component {
  componentDidMount() {
    this.props.fetchProductCategories();
  }
  render() {
    let { prodCategories, loading } = this.props.admin;
    let content;
    if (loading) {
      content = <Spinner />;
    } else {
      prodCategories = Object.values(prodCategories);
      let rows = prodCategories.map(prodCategory => (
        <tr key={prodCategory._id}>
          <td>{prodCategory.name}</td>
          <td>{prodCategory.hidden ? "Tak" : "Nie"}</td>
          <td className="text-right">
            <Link
              to={`/admin/product/edit/${prodCategory._id}`}
              className="btn btn-primary"
            >
              <i className="fas fa-edit" />
            </Link>
          </td>
          <td className="text-right">
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.props.deleteProductCategory.bind(
                this,
                prodCategory._id
              )}
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
                <th scope="col">Nazwa</th>
                <th scope="col">Schowany</th>
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
        <h1 className="text-center w-100 mt-2">Kategorie produktów</h1>
        <div className="w-100">
          <Link
            to="/admin/productCategories/add"
            className="btn btn-outline-success m-3"
          >
            Utwórz kategorię
          </Link>
        </div>
        {content}
      </React.Fragment>
    );
  }
}

ProductCategories.propTypes = {
  admin: PropTypes.object.isRequired,
  fetchProductCategories: PropTypes.func.isRequired,
  deleteProductCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});
export default connect(
  mapStateToProps,
  { fetchProductCategories, deleteProductCategory }
)(ProductCategories);
