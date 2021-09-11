import axios from "axios";
import * as actionTypes from "../actiontype";

const INITIAL_STATE = {

cart:[],


}

let proCount = [];

const cart = (state = INITIAL_STATE,action = {}) =>{
   
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
  
    axios.get(`${process.env.REACT_APP_API_URL}/products/${action.payload.orderDetails.productId}`).then(res => {

    if(proCount.length === 0 || proCount.find(pro => pro.productId !== action.payload.orderDetails.productId)){
    proCount.push(res.data); }

    })
    console.log( proCount );

            const isAlready = state.cart.find( it => it.productId === action.payload.orderDetails.productId && it.color.colorId === action.payload.orderDetails.color.colorId) ? true : false;      
         return {
                ...state,
                cart : isAlready ?  state.cart.map( item => item.productId === action.payload.orderDetails.productId && item.color.colorId === action.payload.orderDetails.color.colorId ? 
                    {...item , quantity : item.quantity +  action.payload.orderDetails.quantity} : item) : [...state.cart, action.payload.orderDetails ]
                }

        case actionTypes.REMOVE_FROM_CART:    
        return {
            ...state,
            cart : state.cart.filter( item => JSON.stringify(item) !== JSON.stringify(action.payload.orderDetails))
          };
        case actionTypes.LOAD_CART_ITEM:
          return action.products;
        default:
          return state;
      }


}

export default cart;