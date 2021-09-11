import { Container,Grid,Hidden } from '@material-ui/core'
import axios from 'axios'
import React, { Component } from 'react'
import '../../index.css'
import FilterBox from '../ui/FilterBox'
import ProductCard from '../ui/ProductCard'
export default class Home extends Component {



componentDidMount() {

axios.get(`${process.env.REACT_APP_API_URL}/products`).then(res => {
const prods = res.data;
this.setState({products : prods})

})



}


state = {
    products : []
}

    render() {
        return (
                          
            <div  style={{ marginLeft : 'auto', marginRight:'auto', maxWidth:70+'%', marginTop : 1 + 'rem', backgroundColor : 'white',borderRadius : 1+"%" , paddingBottom : 100 +'px'}}>
            
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
                return  <Grid item  xs={12} sm={6} md={5} lg={3} key={product.productId}>
                    <ProductCard  product={product}></ProductCard></Grid>  
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
