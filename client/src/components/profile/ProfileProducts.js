import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { fetchLikedProducts } from "../../actions/productsActions";
class ProfileProducts extends Component {
  componentDidMount() {
    this.props.fetchLikedProducts();
  }
  render() {
    let { likedProducts, loading } = this.props.products;
    let content;
    if (loading) {
      content = <Spinner />;
    } else {
      likedProducts = Object.values(likedProducts);
      let rows = likedProducts.map(likedProduct => (
        <tr key={likedProduct._id}>
          <td>{likedProduct.product.name}</td>
          <td>{likedProduct.product.price}</td>
        </tr>
      ));
      content = (
        <div className="table-responsive">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Przedmiot</th>
                <th scope="col">Cena</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      );
    }
    return (
      <React.Fragment>
        <h1 className="text-center w-100 mt-2">Produkty użytkownika</h1>

        {content}
      </React.Fragment>
    );
  }
}

ProfileProducts.propTypes = {
  products: PropTypes.object.isRequired,
  fetchLikedProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.products
});
export default connect(
  mapStateToProps,
  { fetchLikedProducts }
)(ProfileProducts);
