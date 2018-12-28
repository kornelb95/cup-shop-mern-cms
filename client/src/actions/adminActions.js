import axios from "axios";
import {
  GET_ERRORS,
  LOADING,
  GET_USERS,
  GET_USER,
  DELETE_USER,
  GET_PRODUCTS,
  DELETE_PRODUCT,
  GET_PRODUCT_TYPES,
  DELETE_PRODUCT_TYPE,
  GET_PRODUCT_CATEGORIES,
  DELETE_PRODUCT_CATEGORY
} from "./types";

export const setLoading = () => {
  return {
    type: LOADING
  };
};

export const fetchUsers = () => dispatch => {
  dispatch(setLoading());
  axios.get("/admin/users").then(res =>
    dispatch({
      type: GET_USERS,
      payload: res.data
    })
  );
};
export const fetchUser = id => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/admin/users/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const createUser = (userData, history) => dispatch => {
  axios
    .post("/admin/users/", userData)
    .then(res => {
      history.push("/admin/users");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data === undefined ? {} : err.response.data
      });
    });
};
export const updateUser = (userData, history) => dispatch => {
  axios
    .put("/admin/users/", userData)
    .then(res => {
      history.push("/admin/users");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data === undefined ? {} : err.response.data
      });
    });
};
export const deleteUser = id => dispatch => {
  axios
    .delete(`/admin/users/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_USER,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const fetchProductCategories = () => dispatch => {
  dispatch(setLoading());
  axios.get("/admin/productCategories").then(res =>
    dispatch({
      type: GET_PRODUCT_CATEGORIES,
      payload: res.data
    })
  );
};
export const deleteProductCategory = id => dispatch => {
  axios
    .delete(`/admin/productCategories/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PRODUCT_CATEGORY,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const createProductCategory = (data, history) => dispatch => {
  axios
    .post("/admin/productCategories", data)
    .then(res => {
      history.push("/admin/productCategories");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data === undefined ? {} : err.response.data
      });
    });
};

export const fetchProducts = () => dispatch => {
  dispatch(setLoading());
  axios.get("/admin/products").then(res =>
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    })
  );
};
export const createProduct = (data, history) => dispatch => {
  axios
    .post("/admin/products", data)
    .then(res => {
      history.push("/admin/products");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data === undefined ? {} : err.response.data
      });
    });
};
export const deleteProduct = id => dispatch => {
  axios
    .delete(`/admin/products/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PRODUCT,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const createProductType = (data, history) => dispatch => {
  axios
    .post("/admin/productTypes", data)
    .then(res => {
      history.push("/admin/productTypes");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data === undefined ? {} : err.response.data
      });
    });
};
export const deleteProductType = id => dispatch => {
  axios
    .delete(`/admin/productTypes/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PRODUCT_TYPE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const fetchProductTypes = () => dispatch => {
  dispatch(setLoading());
  axios.get("/admin/productTypes").then(res =>
    dispatch({
      type: GET_PRODUCT_TYPES,
      payload: res.data
    })
  );
};
