import { combineReducers } from "redux";
import user from "./reducers/user";
import cart from "./reducers/cart";
import product from "./reducers/product";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig ={
    key : 'root',
    storage,
    whitelist : ['cart']


};

const rootReducer = combineReducers({
    user: user,
    cart: cart,
    product: product
});

export default persistReducer(persistConfig,rootReducer);