import {
  LOADING,
  GET_PRODUCTS,
  GET_PRODUCT_TYPES,
  GET_PRODUCT_CATEGORIES,
  ADD_PRODUCT_TO_CART,
  SUBTRACT_PRODUCT_TO_CART,
  DELETE_FROM_CART,
  FILTER_PROD_CATEGORIES,
  GET_LIKED_PRODUCTS,
  DELETE_LIKED_PRODUCT
} from "../actions/types";

const initialState = {
  loading: false,
  prodCategories: {},
  products: {},
  productTypes: {},
  cart: [],
  filterCategory: "",
  likedProducts: []
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
    case SUBTRACT_PRODUCT_TO_CART:
      let item = state.cart.find(item => item.id === action.payload);
      item.quantity = item.quantity - 1;
      return {
        ...state
      };
    case DELETE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(cartitem => cartitem.id !== action.payload)
      };
    case FILTER_PROD_CATEGORIES:
      return {
        ...state,
        filterCategory: action.payload
      };
    case GET_LIKED_PRODUCTS:
      return {
        ...state,
        likedProducts: action.payload,
        loading: false
      };
    case DELETE_LIKED_PRODUCT:
      return {
        ...state,
        likedProducts: state.likedProducts.filter(
          likedProduct => likedProduct.product._id !== action.payload
        )
      };

    default:
      return state;
  }
}
