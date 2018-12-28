import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import {
  fetchProductTypes,
  deleteProductType
} from "../../../actions/adminActions";
import Spinner from "../../common/Spinner";

class ProductTypes extends Component {
  componentDidMount() {
    this.props.fetchProductTypes();
  }
  render() {
    let { productTypes, loading } = this.props.admin;
    let content;
    if (loading) {
      content = <Spinner />;
    } else {
      productTypes = Object.values(productTypes);
      let rows = productTypes.map(productType => (
        <tr key={productType._id}>
          <td>{productType.name}</td>
          <td className="text-right">
            <Link
              to={`/admin/product/edit/${productType._id}`}
              className="btn btn-primary"
            >
              <i className="fas fa-edit" />
            </Link>
          </td>
          <td className="text-right">
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.props.deleteProductType.bind(this, productType._id)}
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
        <h1 className="text-center w-100 mt-2">Typy produktów</h1>
        <div className="w-100">
          <Link
            to="/admin/productTypes/add"
            className="btn btn-outline-success m-3"
          >
            Utwórz typ
          </Link>
        </div>
        {content}
      </React.Fragment>
    );
  }
}

ProductTypes.propTypes = {
  admin: PropTypes.object.isRequired,
  fetchProductTypes: PropTypes.func.isRequired,
  deleteProductType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});
export default connect(
  mapStateToProps,
  { fetchProductTypes, deleteProductType }
)(ProductTypes);
