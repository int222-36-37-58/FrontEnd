import { Box, Container } from '@material-ui/core'
import React from 'react'
import testProduct from "../../images/testProduct.jpg"


function ProductCard(props) {
    return (
        
        <Container  style={{height: 350+'px',margin: 10+'px'}}>
         <Box display="flex" flexDirection="column" alignItems="center">
      <div><img src={ testProduct } alt="imgProduct" style={{ maxWidth:188+'px' ,height:'188px' }}/></div> 
       <div><h5 className="titleWrap">{ props.title }</h5> 
       <button className="AddButton">Add - ${props.price} </button>
       <button className="InfoButton">Information</button>
       </div>
            </Box>
            </Container>
        
    )
}

export default ProductCard
