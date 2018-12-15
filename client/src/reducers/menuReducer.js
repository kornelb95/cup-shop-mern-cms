import { TOGGLE_MENU } from "../actions/types";
const initialState = {
  collapse: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        collapse: !state.collapse
      };
    default:
      return state;
  }
}
