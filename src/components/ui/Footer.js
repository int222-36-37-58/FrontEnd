
import { Grid } from '@material-ui/core'
import React from 'react'

export default function Footer() {
    return (
        <div className="footer">
            <div className="footerContent">  

        <Grid container>
        <Grid item xs={12} sm={6} >

        <h3 className="footerHeader">KMUTT</h3>
        <h3 className="footerHeader">School of information Technology</h3>
            
        </Grid>

        <Grid item xs={12} sm={6} style={{ textAlign : 'right'}}> 
        
       
        <h5>62130500036 Thanasit Eksoragul [ Back-end ]</h5>
        <h5>62130500037 Thanapat Suwannaard [ Front-end ]</h5>
        <h5>62130500058 Punthanat Ularnwiriyanont [ DevOps ]</h5></Grid>


        </Grid>
            
            </div>
    


        </div>
    )
}
