import axios from "axios";
import {
  LOADING,
  GET_ERRORS,
  GET_PRODUCTS,
  GET_PRODUCT_TYPES,
  GET_PRODUCT_CATEGORIES,
  ADD_PRODUCT_TO_CART,
  SUBTRACT_PRODUCT_TO_CART,
  DELETE_FROM_CART,
  FILTER_PROD_CATEGORIES,
  GET_LIKED_PRODUCTS,
  DELETE_LIKED_PRODUCT
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
export const filterProductCategories = category_id => dispatch => {
  dispatch({
    type: FILTER_PROD_CATEGORIES,
    payload: category_id
  });
};
export const fetchLikedProducts = () => dispatch => {
  dispatch(setLoading());
  axios.get("/products/likedproduct").then(res =>
    dispatch({
      type: GET_LIKED_PRODUCTS,
      payload: res.data
    })
  );
};
export const addProductToLiked = (data, history) => dispatch => {
  axios
    .post("/products/likedproduct", data)
    .then(res => {})
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data === undefined ? {} : err.response.data
      });
    });
};
export const deleteLikedProduct = (data, history) => dispatch => {
  axios
    .delete(`/products/likedproduct/${data.product}/${data.user}`)
    .then(res => {
      dispatch({
        type: DELETE_LIKED_PRODUCT,
        payload: data.product
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
