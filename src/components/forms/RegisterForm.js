import  Container  from '@material-ui/core/Container'
import React, { Component } from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default class RegisterForm extends Component {
    state = {
        data : {
        username : "",
        name : "",
        address : "",
        tel : "",
        password : "",
        }, 
        editMode : false,
        confirmPassword : "",
        isPasswordChange : false,
        newPasswordData : {},
        errors : {},
        showComplete : false,

        }

    componentDidMount() { 
    
        this.setState( {data :  this.props.userData });
        this.setState( {editMode :  this.props.editMode });
    }

    handleCloseBox =  ()=> {

        this.setState({showComplete : false})

    }

    

        onChange = e =>
            this.setState({
              data: { ...this.state.data, [e.target.name]: e.target.value }
            });
        onConfirmPassword = e=> {

            this.setState({
                confirmPassword : e.target.value
            })

        }
        newPassword = e => {
            this.setState( {newPasswordData :{newPassword : e.target.value  } })
        }
        confirmNewPassword = e => {
            this.setState( {newPasswordData :{ ...this.state.newPasswordData , confirmNewPassword : e.target.value  } })
        }

        onSubmit = () =>  {
            const invalid =this.validate(this.state.data);
            if(invalid !== "err"){    

            if(this.state.editMode){
            this.setState({data : {...this.state.data, password : this.state.newPasswordData.newPassword}})     
            this.props.submit(this.state.data);
            this.setState({showComplete : true})
            }

            else{
                this.props.submit(this.state.data);
            }
            }
        }    


        validate = e => {
            const errors = {}
            if(!e.username || e.username.length <= 5 || ( !e.username.match(/^[a-z]/) )){
                errors.username = true;
            }
            if(!e.password || e.password.length <= 4 || (!e.password.match(/^[A-Z]/) && !e.password.match(/^[a-z]/) &&!e.password.match(/^[0-9]/)) ){
               errors.password = true;
            }
            if(!e.name || e.name.length <= 3){
                errors.name = true;
            }
            if(!e.address || e.address.length < 10){
                errors.address = true;
            }
            if(!e.tel || e.tel.length !== 10 || /\D/.test(e.tel) ){
                errors.tel = true;
            }
            if(!this.state.confirmPassword || this.state.confirmPassword !== e.password){
                errors.confirmPassword = true;
            }
            if(this.state.editMode){
                if(this.state.newPasswordData.newPassword){
                    if(this.state.newPasswordData.newPassword.length <= 4  || (!this.state.newPasswordData.newPassword.match(/^[A-Z]/) && !this.state.newPasswordData.newPassword.match(/^[a-z]/)
                    &&!this.state.newPasswordData.newPassword.match(/^[0-9]/)  )      ){
                 errors.newpassword = true;
                }
                if(this.state.newPasswordData.newPassword !== this.state.newPasswordData.confirmNewPassword){
                    errors.confirmnewpassword = true;
                }
                }
               
                
            
            }
            this.setState({errors});
            if(Object.keys(errors).length > 0){
            return "err";
            }
        }
        

    render() {
        const { editMode } = this.props;
    
        const title = editMode ? 'Your Profile' : 'Register Information';
        return (
           
                <Container maxWidth="md" style={{ marginTop : 3 + 'rem', backgroundColor : 'white' ,borderRadius : 1 + '%'}} >

                <Dialog open={this.state.showComplete} onClose={this.handleCloseBox}
                fullWidth={true} 
                >
                    <DialogTitle id="alert-dialog-title">Congratulation</DialogTitle>
                <DialogContent>
                 <DialogContentText><Typography style={{ fontWeight : 500}}>Update Success !</Typography></DialogContentText>
                 </DialogContent>
                </Dialog>


               <Grid container>
               <Grid item xs={12}><div className="headerRegister">
                   <Typography variant="h5" style={{ marginBottom : 20 + 'px' }}>{title}</Typography></div>
                </Grid>
                
                <Grid item xs={12} style={{ padding : 20+'px' }}>
                <form >
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={12} sm={6}>
                    { editMode ? <TextField variant="outlined" disabled  fullWidth required  type="text" inputProps={{ minLength: 3,maxLength: 20}} id="username" name="username" label="Username"
                 value={this.state.data.username} helperText="cant change username"/> : <TextField variant="outlined"  fullWidth required error={this.state.errors.username} type="text" inputProps={{ minLength: 3,maxLength: 20}} id="username" name="username" label="Username"
                 helperText="contain 3-20 character"  onChange={this.onChange} value={this.state.data.username}/>    

                    }
                
               </Grid>
               <Grid  item xs={12} sm={6}>
                <TextField variant="outlined"  fullWidth required error={this.state.errors.name} type="text" inputProps={{  minLength: 2,maxLength: 30}}
                 id="name"  name="name" label="Name" helperText="Enter your name" onChange={this.onChange} value={this.state.data.name}/>
                </Grid>
                <Grid  item xs={12}>
                <TextField variant="outlined" fullWidth multiline required error={this.state.errors.address} type="textarea" inputProps={{  minLength: 5,maxLength: 90}} id="address"  name="address" label="Address"onChange={this.onChange} value={this.state.data.address}/>
             </Grid>
             <Grid  item xs={12}>
                <TextField variant="outlined"  type="text" inputProps={{ minLength: 10,maxLength: 10}} id="tel" name="tel"  label="Telephone" helperText="contain 10 number"onChange={this.onChange} value={this.state.data.tel}/>
              </Grid>
                    
          {!editMode &&  <Grid  item xs={12} sm={6}>
                <TextField variant="outlined"  fullWidth required error={this.state.errors.password} type="password" inputProps={{ minLength: 3, maxLength: 20}} id="password" name="password"  label="Password"
                 helperText="contain A-Z a-z 0-9"onChange={this.onChange} value={this.state.data.password}/>
            </Grid>
            }
           {!editMode &&
            <Grid  item xs={12} sm={6}>
                <TextField variant="outlined"  fullWidth required error={this.state.errors.confirmPassword} type="password" inputProps={{ minLength: 3,maxLength: 20}} id="confirmPassword" name="confirmPassword" 
                 label="Confirm Password" helperText="Confirm your password" onChange={this.onConfirmPassword } value={this.state.confirmPassword}/>
            </Grid> }




            {editMode &&  <Grid  item xs={12}>
                <TextField variant="outlined"  fullWidth required error={this.state.errors.confirmPassword} type="text" inputProps={{ minLength: 3, maxLength: 20}} id="password" name="password"  label="Password"
                 helperText="confirm with your password" onChange={this.onConfirmPassword} />
            </Grid>
            }


            {editMode && 
            <Grid  item xs={12}>
                <h4 style={{ marginBottom : -10 +'px' , color : '#545454'}}>If you want you can change Password here</h4>
            </Grid>

            }

            {editMode &&  <Grid  item xs={12} sm={6}>
                <TextField variant="outlined"  fullWidth  type="text" error={this.state.errors.newpassword} inputProps={{ minLength: 3, maxLength: 20}} id="newpassword" name="password"  label="New Password"
                 helperText="new password" onChange={this.newPassword} />
            </Grid>
            }
            
            {editMode &&  <Grid  item xs={12} sm={6}>
                <TextField variant="outlined"  fullWidth  error={this.state.errors.confirmnewpassword} type="text" inputProps={{ minLength: 3, maxLength: 20}} id="confirmnewpassword" name="password"  label="Confirm New Password"
                 helperText="comfirm new password" onChange={this.confirmNewPassword} />
            </Grid>
            }



              
            <Grid  item xs={12} align="center">
                <Button variant="contained" color="primary" style={{marginTop : 60 +  "px" , paddingRight : 35 + "px", paddingLeft : 35 + "px"}} onClick={this.onSubmit}>Submit</Button> 
                </Grid>
                
                
                </Grid>
                </form>
                </Grid>

                </Grid>
                </Container>
       
        )
    }
}

RegisterForm.propTypes = {
    submit : PropTypes.func.isRequired,
    editMode : PropTypes.bool.isRequired,
    userData : PropTypes.shape({
        id : PropTypes.string.isRequired,
        username : PropTypes.string.isRequired,
        password : PropTypes.string.isRequired,
        name : PropTypes.string.isRequired,
        address : PropTypes.string.isRequired,
        tel :PropTypes.string.isRequired,
    }).isRequired
    };

RegisterForm.defaultProps = {
    editMode: false,
    userData : {
        id : "",
        username : "",
        password : "",
        name : "",
        address : "",
        tel :""        
    }

}
