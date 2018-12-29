import React, { Component } from "react";
import { connect } from "react-redux";

import "./cart.css";
class Cart extends Component {
  render() {
    return (
      <div className="container">
        <div className="card shopping-cart">
          <div className="card-header bg-dark text-light d-flex ">
            <i className="fa fa-shopping-cart mr-2" aria-hidden="true" />
            Twoje zamówienie
            <a href="dsadas" className="btn btn-outline-info btn-sm ml-auto">
              Kontynuuj zakupy
            </a>
            <div className="clearfix" />
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-2 text-center">
                <img
                  className="img-responsive"
                  src="http://placehold.it/120x80"
                  alt="prewiew"
                  width="120"
                  height="80"
                />
              </div>
              <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                <h4 className="product-name">
                  <strong>Nazwa produktu</strong>
                </h4>
                <h4>
                  <small>Opis produktu</small>
                </h4>
              </div>
              <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                <div
                  className="col-3 col-sm-3 col-md-6 text-md-right"
                  style={{ paddingTop: "5px" }}
                >
                  <h6>
                    <strong>
                      25.00 <span className="text-muted">x</span>
                    </strong>
                  </h6>
                </div>
                <div className="col-4 col-sm-4 col-md-4">
                  <div className="quantity">
                    <button type="button" className="plus">
                      +
                    </button>
                    <input
                      type="number"
                      step="1"
                      max="99"
                      min="1"
                      title="Qty"
                      className="qty"
                      size="4"
                    />
                    <button type="button" className="minus">
                      -
                    </button>
                  </div>
                </div>
                <div className="col-2 col-sm-2 col-md-2 text-right">
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-xs"
                  >
                    <i className="fa fa-trash" />
                  </button>
                </div>
              </div>
            </div>

            <hr />
          </div>
          <div className="card-footer d-flex">
            <div className="coupon col-md-5 col-sm-5 no-padding-left">
              <div className="row">
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="cupone code"
                  />
                </div>
                <div className="col-6">
                  <button type="submit" className="btn btn-default">
                    Użyj kuponu
                  </button>
                </div>
              </div>
            </div>
            <div className="ml-auto" style={{ margin: "10px" }}>
              <a href="dssadas" className="btn btn-success pull-right">
                Zatwierdź
              </a>
              <div className="pull-right" style={{ margin: "5px" }}>
                Cena całkowita: 50.00 zł
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(
  mapStateToProps,
  {}
)(Cart);
