import * as type from "../actiontype"




export const addToCart = productToCart => ({
    type: type.ADD_TO_CART,
    payload:{
        orderDetail : productToCart
    }
    
})


export const removeFromCart = productToCart => ({
    type: type.REMOVE_FROM_CART,
    payload:{
        orderDetail : productToCart
    }
})

export const clearCart = () => ({
    type: 'test'


})


export const checkoutItem = () => ({
    type: type.CHECK_OUT
})