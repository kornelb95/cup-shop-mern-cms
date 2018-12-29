import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import "./cart.css";
class Cart extends Component {
  render() {
    let totalPrice = 0;
    this.props.products.cart.forEach(cartItem => {
      let price = this.props.products.products.find(
        product => product._id === cartItem.id
      ).price;
      let quantity = cartItem.quantity;
      totalPrice = totalPrice + price * quantity;
    });
    let content = this.props.products.cart.map(cartitem => {
      return <CartItem key={cartitem.id} item={cartitem} />;
    });
    return (
      <div className="container">
        <div className="card shopping-cart">
          <div className="card-header bg-dark text-light d-flex ">
            <i className="fa fa-shopping-cart mr-2" aria-hidden="true" />
            Twoje zamówienie
            <Link to="/" className="btn btn-outline-info btn-sm ml-auto">
              Kontynuuj zakupy
            </Link>
            <div className="clearfix" />
          </div>
          <div className="card-body">
            {content}

            <hr />
          </div>
          <div className="card-footer d-flex">
            <div className="coupon col-md-5 col-sm-5 no-padding-left">
              <div className="row">
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Kod rabatowy"
                  />
                </div>
                <div className="col-6">
                  <button type="submit" className="btn btn-default">
                    Użyj kuponu
                  </button>
                </div>
              </div>
            </div>
            <div className="ml-auto text-right" style={{ margin: "10px" }}>
              <div className="">Cena całkowita: {totalPrice} zł</div>
              <a href="dssadas" className="btn btn-success ">
                Zatwierdź
              </a>
            </div>
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
  {}
)(Cart);
