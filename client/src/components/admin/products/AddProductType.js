import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createProductType } from "../../../actions/adminActions";
import TextInput from "../../common/TextInput";

class AddProductType extends Component {
  state = {
    name: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const newProductType = {
      name: this.state.name
    };

    this.props.createProductType(newProductType, this.props.history);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { errors } = this.props;

    return (
      <form className="form-signin mt-5 p-5" onSubmit={this.onSubmit}>
        <h1>Stwórz nowy typ produktu</h1>
        <TextInput
          name="name"
          id="name"
          value={this.state.name}
          placeholder="Typ produktu"
          errors={errors.name}
          onChange={this.onChange}
        />

        <button className="btn btn-lg btn-dark btn-block" type="submit">
          Utwórz
        </button>
      </form>
    );
  }
}

AddProductType.propTypes = {
  createProductType: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProductType }
)(withRouter(AddProductType));
