import {
  GET_USERS,
  USERS_LOADING,
  DELETE_USER,
  GET_USER
} from "../actions/types";

const initialState = {
  users: {},
  loading: false,
  userById: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        userById: action.payload,
        loading: false
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };
    default:
      return state;
  }
}
