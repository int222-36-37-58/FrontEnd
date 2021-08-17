import  Container  from '@material-ui/core/Container'
import React, { Component } from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";

export default class RegisterForm extends Component {

    state = {
        data : {
        username : "",
        name : "",
        address : "",
        telephone : "",
        password : "",
        confirmpassword : "",
        },
        errors : {}
        }
        onChange = e =>
            this.setState({
              data: { ...this.state.data, [e.target.name]: e.target.value }
            });
        onSubmit = () =>  {
            const invalid =this.validate(this.state.data);
            if(invalid !== "err"){
           
            this.props.submit(this.state.data);
            }
        }    
        validate = e => {
            const errors = {}
            if(!e.username || e.username.length <= 1){
                errors.username = true;
            }
            if(!e.password || e.password.length <= 4 || !e.password.match(/^[A-Z]+$/) || !e.password.match(/^[a-z]+$/) ||!e.password.match(/^[0-9]+$/)){
               errors.password = true;
            }
            if(!e.name || e.name.length <= 3){
                errors.name = true;
            }
            if(!e.address || e.address.length < 10){
                errors.address = true;
            }
            if(!e.telephone || e.telephone.length !== 10){
                errors.telephone = true;
            }
            if(!e.confirmpassword || e.confirmpassword !== e.password){
                errors.confirmpassword = true;
            }
            this.setState({errors});
            if(Object.keys(errors).length > 0){
            return "err";
            }
        }
        

    render() {
        return (
           
                <Container maxWidth="md" style={{ marginTop : 5 + 'rem', padding : 50+ 'px', backgroundColor : 'white' ,borderRadius : 1 + '%'}} >
                <Typography variant="h5" style={{ marginBottom : 20 + 'px' }}><u>Register Information</u></Typography>
                <form >
                
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={6}>
                <TextField required error={this.state.errors.username} type="text" inputProps={{ minLength: 3,maxLength: 20}} id="username" name="username" label="Username" helperText="contain 3-20 character"/>
               </Grid>
               <Grid  item xs={6}>
                <TextField required error={this.state.errors.name} type="text" inputProps={{  minLength: 2,maxLength: 30}} id="name"  name="name" label="Name" helperText="Enter your name" />
                </Grid>
                <Grid  item xs={12}>
                <TextField fullWidth required error={this.state.errors.address} type="textarea" inputProps={{  minLength: 5,maxLength: 90}} id="address"  name="address" label="Address" />
             </Grid>
             <Grid  item xs={12}>
                <TextField required error={this.state.errors.telephone} type="text" inputProps={{ minLength: 10,maxLength: 10}} id="telephone" name="telephone"  label="Telephone" helperText="contain 10 number"/>
              </Grid>
              <Grid  item xs={6}>
                <TextField required error={this.state.errors.password} type="password" inputProps={{ minLength: 3, maxLength: 20}} id="password" name="password"  label="Password" helperText="contain A-Z a-z 0-9"/>
            </Grid>
            <Grid  item xs={6}>
                <TextField required error={this.state.errors.confirmpassword} type="password" inputProps={{ minLength: 3,maxLength: 20}} id="confirmpassword" name="confirmpassword"  label="Confirm Password" helperText="Comfirm your password"/>
            </Grid>
            <Grid  item xs={12} align="center">
                <Button variant="contained" color="primary" style={{marginTop : 60 +  "px" , paddingRight : 35 + "px", paddingLeft : 35 + "px"}} onClick={this.onSubmit}>Submit</Button> 
                </Grid>
                
                
                </Grid>
                </form>


                </Container>
       
        )
    }
}

RegisterForm.propTypes = {
    submit : PropTypes.func.isRequired
    
    };