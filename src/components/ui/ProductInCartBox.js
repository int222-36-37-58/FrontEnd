import React, { useState } from 'react'
import testProduct from "../../images/testProduct.jpg"



export default function ProductInCartBox(props) {
    const [product] = useState({
        productName: "asdasdaAsdasdasdasASTUVWXsYZABCDEFGHIJLMno",
        price : "315.00",
        quantity: 1,
        imageName : 'testProduct',
        colors : [{id : 1,colorName : 'red'}],
    
})
    
    return (
        <div className="productInCart">
            <div>
            <img src={ testProduct } alt="productInCart" style={{ width : 65+'px',height : 'auto' }}/></div>

            <div className="productInCartInfo">
            <h5 className="InCartTitle">{product.productName}</h5>
            <h5>{product.price} Baht</h5>
            <h5>color : {product.colors[0].colorName} | quantity : {product.quantity}</h5>
       
            
            </div>
            <div>
            <button className="delFromCart" style={{height: 30 + '%'}}>remove</button>
            </div>

        </div>
    )
}
