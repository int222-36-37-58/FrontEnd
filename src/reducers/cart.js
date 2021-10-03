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
          `${process.env.REACT_APP_API_URL}/products/${action.payload.orderDetail.product.productId}`
        )
        .then((res) => {
          if (
            proCount.length === 0 ||
            proCount.find(
              (pro) =>
                pro.productId !== action.payload.orderDetail.product.productId
            )
          ) {
            proCount.push(res.data);
          }
        });
      const isAlready = state.cart.find(
        (it) =>
          it.product.productId ===
            action.payload.orderDetail.product.productId &&
          it.color.colorId === action.payload.orderDetail.color.colorId
      )
        ? true
        : false;

      return {
        ...state,
        cart: isAlready
          ? state.cart.map((item) =>
              item.product.productId ===
                action.payload.orderDetail.product.productId &&
              item.color.colorId === action.payload.orderDetail.color.colorId
                ? {
                    ...item,
                    quantity:
                      item.quantity + action.payload.orderDetail.quantity,
                  }
                : item
            )
          : [...state.cart, action.payload.orderDetail],
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            JSON.stringify(item) !== JSON.stringify(action.payload.orderDetail)
        ),
      };
    case actionTypes.CLEAR_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export default cart;
