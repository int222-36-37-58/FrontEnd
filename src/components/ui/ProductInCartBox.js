import React from 'react'
import PropTypes from 'prop-types'
import testProduct from "../../images/testProduct.jpg"


const ProductInCartBox = (props) => {
 const product = Object.assign({} , props.product)



    return (
        <div className="productInCart">
            <div>
            <img src={ testProduct } alt="productInCart" style={{ width : 65+'px',height : 'auto' }}/></div>

            <div className="productInCartInfo">
            <h5 className="InCartTitle">{product.name}</h5>
            <h5>{product.price} Baht</h5>
            <h5>color : {product.color.colorName} | quantity : {product.quantity}</h5>
       
            
            </div>
            <div>
            <button className="delFromCart" style={{height: 30 + '%',position :'absolute' ,right : 30}} onClick={() => props.remove(product)}>remove</button>
            </div>

        </div>
    )
}


ProductInCartBox.propTypes = {
    remove : PropTypes.func.isRequired,
    
    };


export default ProductInCartBox;