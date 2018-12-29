import {
  LOADING,
  GET_PRODUCTS,
  GET_PRODUCT_TYPES,
  GET_PRODUCT_CATEGORIES,
  ADD_PRODUCT_TO_CART
} from "../actions/types";

const initialState = {
  loading: false,
  prodCategories: {},
  products: {},
  productTypes: {},
  cart: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_PRODUCT_CATEGORIES:
      return {
        ...state,
        prodCategories: action.payload,
        loading: false
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };

    case GET_PRODUCT_TYPES:
      return {
        ...state,
        productTypes: action.payload,
        loading: false
      };
    case ADD_PRODUCT_TO_CART:
      if (state.cart.find(el => el.id === action.payload)) {
        let i = state.cart.findIndex(el => el.id === action.payload);
        state.cart[i].quantity = state.cart[i].quantity + 1;
        return {
          ...state
        };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              id: action.payload,
              quantity: 1
            }
          ]
        };
      }

    default:
      return state;
  }
}
