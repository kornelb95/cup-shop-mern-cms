import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchProductCategories,
  fetchProducts,
  fetchProductTypes
} from "../../actions/productsActions";
import ScrollNav from "../layout/ScrollNav";
import Spinner from "../common/Spinner";
import ProductCard from "./ProductCard";

class Home extends Component {
  componentDidMount() {
    this.props.fetchProductCategories();
    this.props.fetchProductTypes();
    this.props.fetchProducts();
  }
  render() {
    let { products, loading } = this.props.products;
    let content = "";
    if (loading) {
      content = <Spinner />;
    } else {
      products = Object.values(products);
      content = products.map(product => (
        <ProductCard key={product._id} product={product} />
      ));
    }
    return (
      <React.Fragment>
        <ScrollNav />
        <div className="container">
          <section className="row justify-content-between">{content}</section>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  products: state.products
});
export default connect(
  mapStateToProps,
  { fetchProductCategories, fetchProducts, fetchProductTypes }
)(Home);
