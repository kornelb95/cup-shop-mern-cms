import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { initApp } from "../actions/initActions";
class Button extends Component {
  onClick = () => {
    this.props.initApp();
  };
  render() {
    return (
      <button type="button" onClick={this.onClick} className="btn btn-primary">
        Init App
      </button>
    );
  }
}
Button.propTypes = {
  initApp: PropTypes.func.isRequired
};
export default connect(
  null,
  { initApp }
)(Button);
