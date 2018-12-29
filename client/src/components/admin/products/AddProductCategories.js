import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createProductCategory } from "../../../actions/adminActions";
import TextInput from "../../common/TextInput";
import Checkbox from "../../common/Checkbox";

class AddProductCategory extends Component {
  state = {
    name: "",
    hidden: false
  };

  onSubmit = e => {
    e.preventDefault();

    const newProductCategory = {
      name: this.state.name,
      hidden: this.state.hidden
    };

    this.props.createProductCategory(newProductCategory, this.props.history);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleCheckboxOnChange = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  render() {
    const { errors } = this.props;

    return (
      <form className="form-signin mt-5 p-5" onSubmit={this.onSubmit}>
        <h1>Stwórz nową kategorię produktu</h1>
        <TextInput
          name="name"
          id="name"
          value={this.state.name}
          placeholder="Typ produktu"
          errors={errors.name}
          onChange={this.onChange}
        />
        <Checkbox
          name="hidden"
          id="hidden"
          value={this.state.hidden}
          placeholder="Ukryty"
          errors={errors.hidden}
          onChange={this.handleCheckboxOnChange}
        />
        <button className="btn btn-lg btn-dark btn-block" type="submit">
          Utwórz
        </button>
      </form>
    );
  }
}

AddProductCategory.propTypes = {
  createProductCategory: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProductCategory }
)(withRouter(AddProductCategory));
