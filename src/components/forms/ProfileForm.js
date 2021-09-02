import { Container, Grid, TextField } from '@material-ui/core'
import React, { Component } from 'react'




export default class ProfileForm extends Component {

    state = {
        id : '1',
        userName : 'userTest',
        password : 'Aa123456',
        name : 'nametest',
        address : 'Home Bangkok Thailand',
        tel : '0123456789',
        errors : {},
    }







    render() {
        return (
            <Container maxWidth='lg' style={{padding: 40+'px', marginTop : 2 + 'rem', backgroundColor : 'white' ,borderRadius : 10 + "px"}}>
                
                <form >
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField variant="outlined" defaultValue={this.state.userName} required disabled type="text"  id="username" name="username" label="Username" />
               </Grid>
               <Grid  item xs={12} sm={6}>
                <TextField variant="outlined" defaultValue={this.state.name} required error={this.state.errors.name} type="text" inputProps={{  minLength: 2,maxLength: 30}} id="name"  name="name" label="Name" helperText="Enter your name" onChange={this.onChange}/>
                </Grid>
                <Grid  item xs={12}>
                <TextField variant="outlined" multiline defaultValue={this.state.address} error={this.state.errors.address} type="textarea" inputProps={{  minLength: 5,maxLength: 90}} id="address"  name="address" label="Address"onChange={this.onChange} />
             </Grid>
             <Grid  item xs={12}>
                <TextField variant="outlined" defaultValue={this.state.tel} error={this.state.errors.tel} type="text" inputProps={{ minLength: 10,maxLength: 10}} id="tel" name="tel"  label="Telephone" helperText="contain 10 number"onChange={this.onChange}/>
              </Grid>
              <Grid  item xs={12} sm={6}>
                <TextField variant="outlined" defaultValue={this.state.password} error={this.state.errors.password} type="password" inputProps={{ minLength: 3, maxLength: 20}} id="password" name="password"  label="Password" helperText="contain A-Z a-z 0-9"onChange={this.onChange}/>
            </Grid>
            <Grid  item xs={12} sm={6}>
                <TextField variant="outlined"  error={this.state.errors.confirmPassword} type="password" inputProps={{ minLength: 3,maxLength: 20}} id="confirmPassword" name="confirmPassword"  label="Confirm Password" helperText="Confirm your password"onChange={this.onChange}/>
            </Grid>
           
                
                
                </Grid>
                </form>



            </Container>
        )
    }
}
