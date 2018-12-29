import {
  LOADING,
  GET_USERS,
  GET_USER,
  DELETE_USER,
  GET_ADMIN_PRODUCTS,
  DELETE_PRODUCT,
  GET_ADMIN_PRODUCT_TYPES,
  DELETE_PRODUCT_TYPE,
  GET_ADMIN_PRODUCT_CATEGORIES,
  DELETE_PRODUCT_CATEGORY
} from "../actions/types";

const initialState = {
  users: {},
  loading: false,
  userById: {},
  prodCategories: {},
  products: {},
  productTypes: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
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
    case GET_ADMIN_PRODUCT_CATEGORIES:
      return {
        ...state,
        prodCategories: action.payload,
        loading: false
      };
    case DELETE_PRODUCT_CATEGORY:
      return {
        ...state,
        prodCategories: state.prodCategories.filter(
          prodCategory => prodCategory._id !== action.payload
        )
      };
    case GET_ADMIN_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product._id !== action.payload
        )
      };
    case GET_ADMIN_PRODUCT_TYPES:
      return {
        ...state,
        productTypes: action.payload,
        loading: false
      };
    case DELETE_PRODUCT_TYPE:
      return {
        ...state,
        productTypes: state.productTypes.filter(
          productType => productType._id !== action.payload
        )
      };

    default:
      return state;
  }
}
