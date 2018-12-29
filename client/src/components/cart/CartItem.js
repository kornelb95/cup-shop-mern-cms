import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addProductToCart,
  subtractProductFromCart,
  deleteProductFromCart
} from "../../actions/productsActions";
class CartItem extends Component {
  handleAddQuantity = product => {
    if (this.props.item.quantity === product.limit) {
      return null;
    }
    this.props.addProductToCart(product._id);
  };
  handleSubtractQuantity = product => {
    if (this.props.item.quantity === 0) {
      return null;
    }
    this.props.subtractProductFromCart(product._id);
  };
  render() {
    const product = this.props.products.products.find(
      el => el._id === this.props.item.id
    );

    return (
      <div className="row my-3">
        <div className="col-12 col-sm-12 col-md-2 text-center">
          <img
            className="img-responsive"
            src={require(`../../../../uploads/${product.productImage}`)}
            alt=""
            width="120"
            height="80"
          />
        </div>
        <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
          <h4 className="product-name">
            <strong>{product.name}</strong>
          </h4>
          <h4>
            <small>{product.description}</small>
          </h4>
        </div>
        <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
          <div
            className="col-3 col-sm-3 col-md-6 text-md-right"
            style={{ paddingTop: "5px" }}
          >
            <h6>
              <strong>
                {product.price} zł<span className="text-muted">x</span>
              </strong>
            </h6>
          </div>
          <div className="col-4 col-sm-4 col-md-4">
            <div className="quantity">
              <button
                type="button"
                className="plus"
                onClick={this.handleAddQuantity.bind(this, product)}
              >
                +
              </button>
              <input
                type="number"
                step="1"
                max={product.limit}
                min="1"
                value={this.props.item.quantity}
                title="Qty"
                className="qty"
                size="4"
                readOnly
              />
              <button
                type="button"
                className="minus"
                onClick={this.handleSubtractQuantity.bind(this, product)}
              >
                -
              </button>
            </div>
          </div>
          <div className="col-2 col-sm-2 col-md-2 text-right">
            <button
              type="button"
              className="btn btn-outline-danger btn-xs"
              onClick={this.props.deleteProductFromCart.bind(this, product._id)}
            >
              <i className="fa fa-trash" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  products: state.products
});
export default connect(
  mapStateToProps,
  { addProductToCart, subtractProductFromCart, deleteProductFromCart }
)(CartItem);
