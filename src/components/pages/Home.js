import { Container,Grid,Hidden } from '@material-ui/core'
import React, { Component } from 'react'
import '../../index.css'
import FilterBox from '../ui/FilterBox'
import ProductCard from '../ui/ProductCard'
export default class Home extends Component {


state = {

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
          <Grid item xs={12} sm={6} md={5} lg={3}><ProductCard title="(LN) เรื่องฝันปั่นป่วยของผมกับแม่สา...่ม 6" price="275.00"></ProductCard></Grid>  
          <Grid item xs={12} sm={6}  md={5} lg={3}><ProductCard title="ABCDEFGHIJLMNOPQURSTUVWXYZABCDEFGHIJLM" price="275.00"></ProductCard></Grid>  
          <Grid item xs={12} sm={6} md={5} lg={3}><ProductCard title="(LN) เรื่องฝันปั่นป่วยข" price="275.00"></ProductCard></Grid>  
          <Grid item xs={12} sm={6} md={5} lg={3}><ProductCard></ProductCard></Grid>  
          <Grid item xs={12} sm={6} md={5} lg={3}><ProductCard></ProductCard></Grid>  
          <Grid item xs={12} sm={6} md={5} lg={3}><ProductCard></ProductCard></Grid>  
           
            </Grid>
            </Container>
            </Grid>

            </Grid>
            </Container>





        
            



                
            
            </div>
        )
    }
}
