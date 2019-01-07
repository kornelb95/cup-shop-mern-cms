import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchProductCategories,
  fetchProducts,
  fetchProductTypes,
  fetchLikedProducts
} from "../../actions/productsActions";
import ScrollNav from "../layout/ScrollNav";
import Spinner from "../common/Spinner";
import ProductCard from "./ProductCard";

class Home extends Component {
  componentDidMount() {
    this.props.fetchProductCategories();
    this.props.fetchProductTypes();
    this.props.fetchProducts();
    this.props.fetchLikedProducts();
  }
  render() {
    let { products, loading, filterCategory } = this.props.products;
    let content = "";
    if (loading) {
      content = <Spinner />;
    } else {
      products = Object.values(products);
      if (filterCategory !== "") {
        products = products.filter(
          product => product.productCategory._id === filterCategory
        );
      }
      content = products.map(product => (
        <ProductCard key={product._id} product={product} />
      ));
    }
    return (
      <React.Fragment>
        <ScrollNav />
        <div className="container">
          <section className="row">{content}</section>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  products: state.products,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {
    fetchProductCategories,
    fetchProducts,
    fetchProductTypes,
    fetchLikedProducts
  }
)(Home);
