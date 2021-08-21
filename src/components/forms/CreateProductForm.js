import { Container, MenuItem,InputLabel, FormControl, Typography  } from '@material-ui/core'
import { Grid,TextField,Button,Select } from '@material-ui/core'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import noImage from '../../images/noImage.jpg';
export default class CreateProductForm extends Component {

state = {
data :{
imageName : "",
productName : "",
description : "",
price : "",
type : "",
imageFile : null
},
imagePreview : noImage,
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
    if(!e.imageFile){
        errors.imageName = true;
    }
    if(!e.productName  || e.productName.length < 2 ){
    errors.productName = true; 
    }
    if(!e.description || e.description.length < 10){
        errors.description = true;
    } 
    if(!e.price){
        errors.price = true;
    }
    if(!e.type){
        errors.type = true;
    }
    this.setState({errors});
    if(Object.keys(errors).length > 0){
        return "err";
    }

}

onImageChange = e =>{
const imgFile = e.target.files[0];
const imgPreview = URL.createObjectURL(e.target.files[0]);
const imgName = e.target.files[0].name ;



this.setState({data : { ...this.state.data ,imageName : imgName , imageFile : imgFile},imagePreview : imgPreview})

}







    render() {
        return (
            <div>
            <Container maxWidth='md' style={{ marginTop : 2 + 'rem', backgroundColor : 'white' ,borderRadius : 10 + "px"}}>
            <Typography  variant="h4" style={{ marginBottom : 10 + 'px'  ,paddingTop : 25 + 'px' ,marginLeft : 20+'px' }}> Product Info</Typography>
<form>
            <Grid container style={{padding : 25 +'px'}}  direction="row" justifyContent="center" alignItems="center" spacing={2} >




            <img src={this.state.imagePreview} alt="imagePreview" style={{ maxWidth : 400 + 'px',maxHeight : 400 + 'px' , borderRadius : 5 + 'px'}}/>


            <Grid item xs={12}> 
            <Button variant="contained" component="label">Upload File<input type="file" id="imageFile" name="imageFile" onChange={this.onImageChange} hidden/></Button>
            </Grid>

                <Grid item xs={12}> 
                <TextField required fullWidth  error={this.state.errors.productName} type="text" inputProps={{ minLength: 3,maxLength: 40}} id="productName" name="productName" 
                label="Product Name" onChange={this.onChange} helperText="3 - 40 Character "/> 
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
                    <InputLabel  htmlFor="type" >type</InputLabel>
                    <Select required error={this.state.errors.type}  id="type" name="type" onChange={this.onChange}>
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

