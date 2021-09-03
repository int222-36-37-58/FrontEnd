import { Container,Grid,Hidden } from '@material-ui/core'
import React, { Component } from 'react'
import '../../index.css'
import FilterBox from '../ui/FilterBox'
import ProductCard from '../ui/ProductCard'
export default class Home extends Component {


state = {

    products : [
        {id : 1, productName: '(LN) เรื่องฝันปั่นป่วยของผมกับแม่สา.fdgfdgdfgม 6',
        price : 275.00 },
        {id : 2, productName: 'asdasda sdasdasdas STUVWXYZABCDEFGHIJLMno',
        price : 275.00 },
        {id : 3, productName: '(LN) เรื่องฝันปั่นป่วยของผมกับแม่สา...่ม 6',
        price : 275.00 },
        {id : 4, productName: 'asdasda sdasdasdas STUVWXYZABCDEFGHIJLMno',
        price : 275.00 },
        {id : 5, productName: '(LN) เรื่องฝันปั่นป่วยของผมกับแม่สา...่ม 6',
        price : 275.00 },
        {id : 6, productName: 'asdasda sdasdasdas STUVWXYZABCDEFGHIJLMno',
        price : 275.00 }



    ]


    


}

    render() {
        return (
                          
            <div  style={{ marginLeft : 'auto', marginRight:'auto', maxWidth:70+'%', marginTop : 1 + 'rem', backgroundColor : 'white',borderRadius : 1+"%"}}>
            
           <Container >
            
            <Grid container direction="row" justifyContent="space-between" spacing={1}>
           
           <Hidden smDown>
            <Grid  item sm={2} md={3}>
            <FilterBox></FilterBox>
            </Grid>
            </Hidden>

            <Grid item xs={12} md={8}>
            <Container  style={{ padding:10+'px', paddingTop : 30+'px'}}>
          <Grid container direction="row" spacing={6} >
            {this.state.products.map( (product) => {
                return  <Grid item  xs={12} sm={6} md={5} lg={3}>
                    <ProductCard productId={product.id} title={product.productName} price={product.price}></ProductCard></Grid>  
            })}
          
            </Grid>
            </Container>
            </Grid>

            </Grid>
            </Container>

            
            </div>
        )
    }
}
