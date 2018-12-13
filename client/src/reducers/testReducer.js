import { TEST } from "../actions/types";
const initialState = {
  test: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        test: !state.test
      };
    default:
      return state;
  }
}
