import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { filterProductCategories } from "../../actions/productsActions";
class ScrollNav extends Component {
  render() {
    let links = null;
    switch (this.props.parentComponent) {
      case "dashboard":
        links = (
          <React.Fragment>
            <Link className="nav-link text-white" to="/admin/users">
              Użytkownicy
            </Link>
            <Link className="nav-link text-white" to="/admin/products">
              Produkty
            </Link>
            <Link className="nav-link text-white" to="/admin/productTypes">
              Typy produktów
            </Link>
            <Link className="nav-link text-white" to="/admin/productCategories">
              Kategorie produktów
            </Link>
          </React.Fragment>
        );
        break;
      default:
        links = Object.values(this.props.productCategories).map(category => (
          <Link
            key={category._id}
            className="nav-link text-white"
            to="#"
            onClick={() => this.props.filterProductCategories(category._id)}
          >
            {category.name}
          </Link>
        ));
        break;
    }

    return (
      <div className="nav-scroller bg-info shadow-lg fixed-top">
        <nav className="nav nav-underline">
          <Link
            className="nav-link text-white"
            to="#"
            onClick={() => this.props.filterProductCategories("")}
          >
            Wszystkie
          </Link>
          {links}
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  productCategories: state.products.prodCategories
});
export default connect(
  mapStateToProps,
  { filterProductCategories }
)(ScrollNav);
