import React, { Component } from "react";
import ScrollNav from "../layout/ScrollNav";
import { Switch } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";
import Users from "./users/Users";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import Products from "./products/Products";
import AddProductType from "./products/AddProductType";
import ProductTypes from "./products/ProductTypes";
import ProductCategories from "./products/ProductCategories";
import AddProductCategories from "./products/AddProductCategories";
import AddProduct from "./products/AddProduct";
export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <ScrollNav parentComponent="dashboard" />
        <div className="container">
          <section className="row">
            <Switch>
              <PrivateRoute exact path="/admin/users" component={Users} />
              <PrivateRoute exact path="/admin/users/add" component={AddUser} />
              <PrivateRoute
                exact
                path="/admin/users/edit/:id"
                component={EditUser}
              />
              <PrivateRoute exact path="/admin/products" component={Products} />
              <PrivateRoute
                exact
                path="/admin/products/add"
                component={AddProduct}
              />
              <PrivateRoute
                exact
                path="/admin/productTypes"
                component={ProductTypes}
              />
              <PrivateRoute
                exact
                path="/admin/productTypes/add"
                component={AddProductType}
              />
              <PrivateRoute
                exact
                path="/admin/productCategories"
                component={ProductCategories}
              />
              <PrivateRoute
                exact
                path="/admin/productCategories/add"
                component={AddProductCategories}
              />
            </Switch>
          </section>
        </div>
      </React.Fragment>
    );
  }
}
