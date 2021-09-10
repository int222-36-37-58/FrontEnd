import * as type from "../actiontype"




export const addToCart = productToCart => ({
    type: type.ADD_TO_CART,
    payload:{
        orderDetails : productToCart
    }
    
})


export const removeFromCart = productToCart => ({
    type: type.REMOVE_FROM_CART,
    payload:{
        orderDetails : productToCart
    }
})


export const loadCurrentItem = productInCart => ({
    type: type.LOAD_CART_ITEM,
    payload:productInCart
})