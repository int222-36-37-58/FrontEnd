import { Container } from '@material-ui/core'
import React, { Component } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';

import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import FormControlLabel from '@material-ui/core/FormControlLabel';




export default class FilterBox extends Component {

  state= {

    filters : [
      {id : 1,type : 'Electronic'},
      {id : 2,type : 'Kitchen'},
      {id : 3,type : 'Gaming'},
      {id : 4,type : 'Musicz'}


    ],
    checkData : []

  }


  onChange = e => {
    let newCheck = [...this.state.checkData , e.target.value]
    if(this.state.checkData.includes(e.target.value)){
     newCheck = newCheck.filter(f => f !== e.target.value)
    }
    this.setState({ checkData : newCheck});

  }



     

  



  render() {
    return (
      <Container className="filterBox">
          <div className="header">Filter</div>
  
          <div className="type">
            <div>type</div>
            <div className="checkBoxContent">
              { this.state.filters.map((filter,index)=> {
                return  <FormControlLabel control={ <Checkbox color="primary" icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} onChange={this.onChange} value={filter.type}/>} label={filter.type}></FormControlLabel>
              }) }
            </div>
          </div>
        </Container>
    )
  }
}
