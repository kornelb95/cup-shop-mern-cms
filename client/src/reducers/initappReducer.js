import { INIT_APP } from "../actions/types";

const initialState = {
  initapp: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INIT_APP:
      return {
        ...state,
        initapp: true
      };
    default:
      return state;
  }
}
