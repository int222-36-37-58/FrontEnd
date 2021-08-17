import { Container, MenuItem,InputLabel, FormControl  } from '@material-ui/core'
import { Grid,TextField,Button,Select } from '@material-ui/core'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CreateProductForm extends Component {

state = {
data :{
productName : "",
description : "",
price : "",
producttype : "",
},
errors : {}
}
onChange = e =>
this.setState({
  data: { ...this.state.data, [e.target.name]: e.target.value }
});

onSubmit = () => {
    const invalid =this.validate(this.state.data);
    if(invalid !== "err"){
   
    this.props.submit(this.state.data);
    }
}

validate = (e) => {
const errors = {}
    if(!e.productName  || e.productName.length < 2 ){
    errors.productName = true; 
    }
    if(!e.description || e.description.length < 10){
        errors.description = true;
    } 
    if(!e.price){
        errors.price = true;
    }
    if(!e.producttype){
        errors.producttype = true;
    }
    this.setState({errors});
    if(Object.keys(errors).length > 0){
        return "err";
    }

}









    render() {
        return (
            <div>
            <Container maxWidth='md' style={{ marginTop : 5 + 'rem', backgroundColor : 'white'}}>
<form>
            <Grid container style={{padding : 25 +'px'}}  direction="row" justifyContent="center" alignItems="center" spacing={2} >
                <Grid item xs={12}> 
                <TextField required fullWidth  error={this.state.errors.productName} type="text" inputProps={{ minLength: 3,maxLength: 20}} id="productName" name="productName" 
                label="Product Name" onChange={this.onChange} helperText="3 - 30 Character "/> 
                 </Grid>  
                <Grid item xs={12}>
                <TextField required fullWidth  error={this.state.errors.description} type="textarea" inputProps={{minLength: 5,maxLength: 200}} id="description" name="description" label="Description" onChange={this.onChange} 
                helperText="describe your Product"/>
                </Grid> 
                <Grid item xs={12}>
                <TextField required fullWidth  error={this.state.errors.price} type="number" inputProps={{minLength: 5,maxLength: 200}} id="price" name="price" label="Price" onChange={this.onChange} 
                helperText="enter Product Price"/>
                </Grid> 

                <Grid item xs={12} >
                    <FormControl style={{minWidth: 100}}>
                    <InputLabel  htmlFor="producttype" >type</InputLabel>
                    <Select required error={this.state.errors.producttype}  id="producttype" name="producttype" onChange={this.onChange}>
                        <MenuItem value="Electronic">Electronic</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                

                <Grid item xs={12} align="center">
                 <Button variant="contained" color="primary" style={{marginTop : 30 +  "px" }} onClick={this.onSubmit}>Submit</Button>
                 </Grid>
                 
                 </Grid>
                </form>



            </Container>
        </div>
        )
    }
}

CreateProductForm.propTypes = {
    submit : PropTypes.func.isRequired
    };

