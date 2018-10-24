import { INIT_APP } from "./types";

export const initApp = () => dispatch => {
  dispatch({
    type: INIT_APP,
    payload: null
  });
};
