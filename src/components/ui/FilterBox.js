import { Container, Grid, Hidden } from '@material-ui/core'
import React, { Component } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';

import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';




export default class FilterBox extends Component {
  
  state= {
    filters : [],
    checkData : [],
    showType : false,
  }

  componentDidMount() {

    axios.get(`${process.env.REACT_APP_API_URL}/brands`).then(res => {
      const type = res.data;
      this.setState({filters : type})
    })

  }

  onChange = e => {
    let newCheck = [...this.state.checkData , e.target.value]
    if(this.state.checkData.includes(e.target.value)){
     newCheck = newCheck.filter(f => f !== e.target.value)
    }
    this.setState({ checkData : newCheck});
  }

  handleShowType = () => {

    this.setState({ showType : !this.state.showType })

  }

  render() {
    return (
    
    <>
      <Hidden smDown>
      <Container id="filterBox" className="filterBox">
          <div className="header">Filter</div>

          <div className="type">
            <div>type</div>
            <Grid>
              { this.state.filters.map((filter)=> {
                return  <FormControlLabel key={filter.typeId} control={ <Checkbox color="primary" icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} onChange={this.onChange} value={filter.name}/>} label={filter.name}></FormControlLabel>
              }) }
            </Grid>
          </div>
        </Container>
</Hidden>

        <Hidden mdUp>
        <Container id="filterBox" className="filterBox">
          <div className="headerRes header hoverCursor infoBox" onClick={this.handleShowType}>
           <div>Filter</div>
           <div style={{ fontSize : 20+'px', fontWeight : 500}}>+</div>
            
            </div>

              { this.state.showType &&  
           <div className="type">
            <div>type</div>
            <Grid>
              { this.state.filters.map((filter)=> {
                return  <FormControlLabel key={filter.typeId} control={ <Checkbox color="primary" icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} onChange={this.onChange} value={filter.name}/>} label={filter.name}></FormControlLabel>
              }) }
            </Grid>
          </div>}
         
        </Container>
      </Hidden>

    </>


    )
  }
}
