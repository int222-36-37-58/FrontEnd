import axios from "axios";
import * as actionTypes from "../actiontype";

const INITIAL_STATE = {
  cart: [],
};

let proCount = [];

const cart = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/products/${action.payload.orderDetails.product.productId}`
        )
        .then((res) => {
          if (
            proCount.length === 0 ||
            proCount.find(
              (pro) =>
                pro.productId !== action.payload.orderDetails.product.productId
            )
          ) {
            proCount.push(res.data);
          }
        });
      const isAlready = state.cart.find(
        (it) =>
          it.product.productId ===
            action.payload.orderDetails.product.productId &&
          it.color.colorId === action.payload.orderDetails.color.colorId
      )
        ? true
        : false;

      return {
        ...state,
        cart: isAlready
          ? state.cart.map((item) =>
              item.product.productId ===
                action.payload.orderDetails.product.productId &&
              item.color.colorId === action.payload.orderDetails.color.colorId
                ? {
                    ...item,
                    quantity:
                      item.quantity + action.payload.orderDetails.quantity,
                  }
                : item
            )
          : [...state.cart, action.payload.orderDetails],
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            JSON.stringify(item) !== JSON.stringify(action.payload.orderDetails)
        ),
      };
    case actionTypes.CHECK_OUT:
      return axios.post(`${process.env.REACT_APP_API_URL}/order`, state.cart);
    default:
      return state;
  }
};

export default cart;
