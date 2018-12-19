import axios from "axios";
import setToken from "../functions/setToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_USER } from "./types";

export const login = userData => dispatch => {
  axios
    .post("/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setToken(token);
      const decodedToken = jwt_decode(token);
      dispatch(setUser(decodedToken));
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const loginFb = userData => dispatch => {
  axios
    .post("/users/registerFb", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setToken(token);
      const decodedToken = jwt_decode(token);
      dispatch(setUser(decodedToken));
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const register = (userData, history) => dispatch => {
  axios
    .post("/users/register", userData)
    .then(res => {
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data === undefined ? {} : err.response.data
      });
    });
};
export const setUser = decodedToken => {
  return {
    type: SET_USER,
    payload: decodedToken
  };
};
export const logoutUser = () => dispath => {
  localStorage.removeItem("jwtToken");
  setToken(false);
  dispath(setUser({}));
};
