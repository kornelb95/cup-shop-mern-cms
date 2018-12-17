import axios from "axios";
import {
  GET_ERRORS,
  GET_USERS,
  USERS_LOADING,
  DELETE_USER,
  GET_USER
} from "./types";

export const fetchUsers = () => dispatch => {
  dispatch(setUsersLoading());
  axios.get("/admin/users").then(res =>
    dispatch({
      type: GET_USERS,
      payload: res.data
    })
  );
};
export const fetchUser = id => dispatch => {
  dispatch(setUsersLoading());
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
export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  };
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
