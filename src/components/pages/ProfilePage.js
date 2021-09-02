import { Grid,Container } from '@material-ui/core'
import React, { Component } from 'react'
import RegisterForm from '../forms/RegisterForm'
export default class ProfilePage extends Component {

   


    render() {
        return (
            <Container >
            <Grid container justifyContent="center">
            <Grid item={4}>
       
            </Grid>    

            <Grid item={6}>    
            <RegisterForm></RegisterForm>
            </Grid>

            </Grid>
            </Container>
        )
    }
}
