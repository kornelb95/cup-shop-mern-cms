import axios from "axios";
import {
  LOADING,
  GET_PRODUCTS,
  GET_PRODUCT_TYPES,
  GET_PRODUCT_CATEGORIES,
  ADD_PRODUCT_TO_CART,
  SUBTRACT_PRODUCT_TO_CART,
  DELETE_FROM_CART
} from "./types";

export const setLoading = () => {
  return {
    type: LOADING
  };
};
export const fetchProductCategories = () => dispatch => {
  dispatch(setLoading());
  axios.get("/products/productCategories").then(res =>
    dispatch({
      type: GET_PRODUCT_CATEGORIES,
      payload: res.data
    })
  );
};
export const fetchProducts = () => dispatch => {
  dispatch(setLoading());
  axios.get("/products/products").then(res =>
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    })
  );
};
export const fetchProductTypes = () => dispatch => {
  dispatch(setLoading());
  axios.get("/products/productTypes").then(res =>
    dispatch({
      type: GET_PRODUCT_TYPES,
      payload: res.data
    })
  );
};
export const addProductToCart = data => dispatch => {
  dispatch({
    type: ADD_PRODUCT_TO_CART,
    payload: data
  });
};
export const subtractProductFromCart = data => dispatch => {
  dispatch({
    type: SUBTRACT_PRODUCT_TO_CART,
    payload: data
  });
};
export const deleteProductFromCart = data => dispatch => {
  dispatch({
    type: DELETE_FROM_CART,
    payload: data
  });
};
