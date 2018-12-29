import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addProductToCart } from "../../actions/productsActions";
class ProductCard extends Component {
  state = {
    liked: false
  };
  handleLike = () => {
    this.setState({
      liked: !this.state.liked
    });
  };
  render() {
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
            <Link to="#" onClick={this.handleLike}>
              <i
                className={`${
                  this.state.liked ? "fas" : "far"
                } fa-heart fa-lg text-danger`}
              />
            </Link>
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
const mapStateToProps = state => ({});
export default connect(
  mapStateToProps,
  { addProductToCart }
)(ProductCard);
