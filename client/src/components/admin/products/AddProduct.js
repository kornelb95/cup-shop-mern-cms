import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  createProduct,
  fetchProductCategories,
  fetchProductTypes
} from "../../../actions/adminActions";
import TextInput from "../../common/TextInput";
import Select from "../../common/Select";
import TextArea from "../../common/TextArea";

class AddProduct extends Component {
  state = {
    name: "",
    productType: "",
    productCategory: "",
    description: "",
    price: "",
    limit: 0,
    productImage: ""
  };

  componentDidMount() {
    this.props.fetchProductCategories();
    this.props.fetchProductTypes();
  }

  onSubmit = e => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("name", this.state.name);
    formData.append("productType", this.state.productType);
    formData.append("productCategory", this.state.productCategory);
    formData.append("description", this.state.description);
    formData.append("price", this.state.price);
    formData.append("productImage", this.state.productImage);
    formData.append("limit", this.state.limit);

    this.props.createProduct(formData, this.props.history);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleFileOnChange = e => {
    this.setState({
      [e.target.name]: e.target.files[0]
    });
  };
  render() {
    const { errors } = this.props;

    return (
      <form className="form-signin mt-5 p-5" onSubmit={this.onSubmit}>
        <h1>Stwórz produkt</h1>
        <TextInput
          name="name"
          id="name"
          value={this.state.name}
          placeholder="Nazwa produktu"
          errors={errors.name}
          onChange={this.onChange}
        />
        <div className="form-group">
          <label htmlFor="productImage">Zdjęcie produktu</label>
          <input
            type="file"
            name="productImage"
            className="form-control-file"
            id="productImage"
            onChange={this.handleFileOnChange}
          />
        </div>
        <Select
          name="productType"
          id="productType"
          value={this.state.productType}
          onChange={this.onChange}
          options={Object.values(this.props.admin.productTypes).map(option => {
            return {
              value: option._id,
              text: option.name
            };
          })}
          label="Typ produktu"
        />
        <Select
          label="Kategoria produktu"
          name="productCategory"
          value={this.state.productCategory}
          id="productCategory"
          onChange={this.onChange}
          options={Object.values(this.props.admin.prodCategories).map(
            option => {
              return {
                value: option._id,
                text: option.name
              };
            }
          )}
        />
        <TextArea
          name="description"
          placeholder="Wpisz opis produktu"
          errors={errors.description}
          onChange={this.onChange}
          value={this.state.description}
        />

        <div className="form-group  my-3">
          <label htmlFor="price">Cena produktu</label>
          <input
            className="form-control"
            min="0.00"
            step="0.01"
            type="number"
            name="price"
            placeholder="0.00"
            id="price"
            value={this.state.price}
            errors={errors.price}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group  my-3">
          <label htmlFor="limit">Stan magazynowy</label>
          <input
            className="form-control"
            min="0"
            type="number"
            name="limit"
            placeholder="0"
            id="limit"
            value={this.state.limit}
            errors={errors.limit}
            onChange={this.onChange}
          />
        </div>
        <button className="btn btn-lg btn-dark btn-block" type="submit">
          Utwórz produkt
        </button>
      </form>
    );
  }
}

AddProduct.propTypes = {
  createProduct: PropTypes.func.isRequired,
  fetchProductCategories: PropTypes.func.isRequired,
  fetchProductTypes: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  admin: state.admin,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProduct, fetchProductCategories, fetchProductTypes }
)(withRouter(AddProduct));
