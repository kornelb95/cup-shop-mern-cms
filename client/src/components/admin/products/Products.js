import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { fetchProducts, deleteProduct } from "../../../actions/adminActions";
import Spinner from "../../common/Spinner";

class Products extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    let { products, loading } = this.props.admin;
    let content;
    if (loading) {
      content = <Spinner />;
    } else {
      products = Object.values(products);
      let rows = products.map(product => (
        <tr key={product._id}>
          <td>{product.name}</td>
          <td>{product.productCategory.name}</td>
          <td>{product.productType.name}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td>{product.limit}</td>
          <td>
            <img
              src={require(`../../../../../uploads/${product.productImage}`)}
              alt=""
              style={{ width: "50px", height: "50px" }}
            />
          </td>
          <td className="text-right">
            <Link
              to={`/admin/product/edit/${product._id}`}
              className="btn btn-primary"
            >
              <i className="fas fa-edit" />
            </Link>
          </td>
          <td className="text-right">
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.props.deleteProduct.bind(this, product._id)}
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
                <th scope="col">Kategoria</th>
                <th scope="col">Typ</th>
                <th scope="col">Opis</th>
                <th scope="col">Cena</th>
                <th scope="col">Magazyn</th>
                <th>Zdjęcie</th>
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
        <h1 className="text-center w-100 mt-2">Produkty</h1>
        <div className="w-100">
          <Link
            to="/admin/products/add"
            className="btn btn-outline-success m-3"
          >
            Utwórz produkt
          </Link>
        </div>
        {content}
      </React.Fragment>
    );
  }
}

Products.propTypes = {
  admin: PropTypes.object.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});
export default connect(
  mapStateToProps,
  { fetchProducts, deleteProduct }
)(Products);
