import { Box, Container } from '@material-ui/core'
import React from 'react'
import testProduct from "../../images/testProduct.jpg"
import { Link } from 'react-router-dom';

function ProductCard(props) {
    return (
        
        <Container  style={{height: 325+'px',margin: 10+'px'}}>
         <Box display="flex" flexDirection="column" alignItems="center">
      <div><img src={ testProduct } alt="imgProduct" style={{ maxWidth:188+'px' ,height:'188px' }}/></div> 
       <div><Link to={`/product/${props.productId}`} style={{ textDecoration: 'none' }}><h5 className="titleWrap">{ props.title }</h5> </Link>
       <button className="AddButton" style={{width: 90+'%' }}>Add - ฿{props.price} </button>
       <button className="InfoButton" style={{width: 90+'%' }} >Information</button>
       </div>
            </Box>
            </Container>
        
    )
}

export default ProductCard
