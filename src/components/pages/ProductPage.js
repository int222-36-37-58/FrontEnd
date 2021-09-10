import React from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../../actions/cart'
import ProductContent from './ProductContent'

const ProductPage = ({addToCart}) => {

    return (
        <ProductContent addItem={addToCart}/>
    )
}
const mapDispatchToProps = dispatch =>{
    return {
        addToCart : (product) => dispatch(addToCart(product))

    }

}

export default connect(null,mapDispatchToProps)(ProductPage);