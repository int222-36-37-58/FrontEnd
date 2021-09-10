import { combineReducers } from "redux";
import user from "./reducers/user";
import cart from "./reducers/cart";
import product from "./reducers/product";
const rootReducer = combineReducers({
    user: user,
    cart: cart,
    product: product
});

export default rootReducer;