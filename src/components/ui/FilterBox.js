import { Container } from '@material-ui/core'
import React, { Component } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';

import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import FormControlLabel from '@material-ui/core/FormControlLabel';




export default class FilterBox extends Component {

  state= {
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
            <FormControlLabel control={ <Checkbox color="primary" icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} onChange={this.onChange} value="1"/>} label="Electronic"></FormControlLabel>
            <FormControlLabel control={ <Checkbox color="primary" icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} onChange={this.onChange} value="2"/>} label="Kitchen"></FormControlLabel>
            <FormControlLabel control={ <Checkbox color="primary" icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} onChange={this.onChange} value="3"/>} label="Gaming"></FormControlLabel>
            <FormControlLabel control={ <Checkbox color="primary" icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} onChange={this.onChange} value="4"/>} label="Music"></FormControlLabel>
            </div>
          </div>
        </Container>
    )
  }
}
