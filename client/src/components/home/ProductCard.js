import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import {
  addProductToCart,
  addProductToLiked,
  deleteLikedProduct,
  fetchLikedProducts
} from "../../actions/productsActions";
class ProductCard extends Component {
  handleLike = (user, product, action) => {
    const data = {
      user,
      product
    };
    action(data, this.props.history);
    this.props.fetchLikedProducts();
  };
  render() {
    const { likedProducts } = this.props.products;
    const { user, isAuthenticated } = this.props.auth;
    const liked = likedProducts.find(
      likedProduct =>
        likedProduct.product._id === this.props.product._id &&
        likedProduct.user._id === user.id
    );
    const action = liked
      ? () =>
          this.handleLike(
            user.id,
            this.props.product._id,
            this.props.deleteLikedProduct
          )
      : () =>
          this.handleLike(
            user.id,
            this.props.product._id,
            this.props.addProductToLiked
          );
    const likeHearth = isAuthenticated ? (
      <Link
        to="#"
        onClick={() => this.handleLike(user.id, this.props.product._id, action)}
      >
        <i className={`${liked ? "fas" : "far"} fa-heart fa-lg text-danger`} />
      </Link>
    ) : null;
    return (
      <div className="card my-5 offset-md-1 col-md-3 ">
        <img
          className="card-img-top my-3"
          style={{ height: "200px" }}
          src={require(`../../../../uploads/${
            this.props.product.productImage
          }`)}
          alt={this.props.product.name}
        />
        <div className="card-body">
          <h5 className="card-title">{this.props.product.name}</h5>
          <p className="card-text">{this.props.product.description}</p>
          <p className="card-text">Cena: {this.props.product.price} zł</p>
          <p className="card-text text-left">
            <small>
              Pozostało sztuk:{" "}
              <span className="text-danger">{this.props.product.limit}</span>
            </small>
          </p>
          <p className="card-text text-left">
            <small>
              Kupiono sztuk: <span className="text-danger">50</span>
            </small>
          </p>
          <div className="d-flex justify-content-between">
            {likeHearth}
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={this.props.addProductToCart.bind(
                this,
                this.props.product._id
              )}
            >
              <i className="fas fa-plus-circle" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  products: state.products
});
export default connect(
  mapStateToProps,
  {
    addProductToCart,
    addProductToLiked,
    deleteLikedProduct,
    fetchLikedProducts
  }
)(withRouter(ProductCard));
