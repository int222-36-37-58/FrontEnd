import { Container,Grid,TextField, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import '../../index.css'
export default class Home extends Component {


state = {

data : {
    searchText : "",
    type : "",
    selectedType : "",
}


}

onChange = e =>{

const searchVal = e.target.value

console.log(searchVal)
}

onClickType = e => {
    this.setState({data :{ ...this.state.data ,selectedType : e.target.value}})
    console.log(e.target.innerHTML);
}



    render() {
        return (
            <div>                
            <Container maxWidth='lg' style={{ marginTop : 1 + 'rem', backgroundColor : 'white' ,borderRadius : 10 + "px" ,paddingTop : 20 +'px', paddingBottom : 50 + 'px'}}>
            
            <Container maxWidth='lg'>
            <TextField id="searchBox" fullWidth variant="outlined" label="Search field" type="search" onChange={this.onChange} />
            <Grid container style={{ paddingTop : 60 + 'px'}}>

            <Grid item xs={1}><Typography><b>Type</b></Typography></Grid>
            <Grid item xs={9} >
                <div >
            <Typography display="inline" style={{paddingRight: 8 + 'px'}}><span className="underlineHover" onClick={this.onClickType}>Electronic</span></Typography>
            <Typography display="inline" style={{paddingRight : 8 + 'px'}}><span className="underlineHover" onClick={this.onClickType}>Kitchen</span></Typography>
            </div>
            </Grid>
            </Grid>
            





            </Container>
            



                
            </Container>
            </div>
        )
    }
}
