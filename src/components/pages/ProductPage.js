import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { addToCart } from '../../actions/cart'
import ProductContent from './ProductContent'

const ProductPage = ({addToCart}) => {

const history= useHistory();

const notFound = () => {

    history.push('/notfound')


}



    return (
        <ProductContent addItem={addToCart} notFound={notFound}/>
    )
}
const mapDispatchToProps = dispatch =>{
    return {
        addToCart : (product) => dispatch(addToCart(product))

    }

}

export default connect(null,mapDispatchToProps)(ProductPage);