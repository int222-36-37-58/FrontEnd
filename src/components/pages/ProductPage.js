import { Container, Grid } from '@material-ui/core'
import axios from 'axios'
import React, { Component } from 'react'
import testProduct from "../../images/testProduct.jpg"

export default class ProductPage extends Component {

    state = {
        product : {},
        quantityAdd : 1,
        isShowInfo : false,
        isShowComments : false,
        selectedColor : 0,
        noColor : false
    }

    componentDidMount() {
        
           let id = window.location.pathname.slice(9,window.location.pathname.length)

        axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`).then(res => {
            const prods = res.data;
            this.setState({product : prods})
            console.log(this.state.product.color)
    })
  
    }

    chooseColor = e => {
        this.setState({selectedColor : e.target.value})
    }



    minusQuantity = () => {
        console.log(this.state.product.color)
        if(this.state.quantityAdd > 1){
            
            
        let quantity = this.state.quantityAdd -1;
        this.setState({quantityAdd : quantity})
        }
       
    }

    plusQuantity = () => {
        if(this.state.quantityAdd < this.state.product.quantity){
        let quantity = this.state.quantityAdd +1;
        this.setState({quantityAdd : quantity})
        }
       
    }


    clickedInfo = () => {
        let infoClick = !this.state.isShowInfo;
        this.setState({isShowInfo : infoClick})
    }

    clickedComments = () => {
        let commentClick = !this.state.isShowComments
        this.setState({isShowComments : commentClick})
    }

    addToCart = () => {
        if(this.state.selectedColor === 0) {
            this.setState({noColor : true})
            return ;
        } else {
            this.setState({noColor : false})


        }



    }
   
    render() {
        const colors = this.state.product.color;

        return (
            <Container maxWidth='lg' style={{padding: 40+'px', marginTop : 2 + 'rem', backgroundColor : 'white' ,borderRadius : 10 + "px"}}>
            <Grid container justifyContent="center">
            <Grid item xs={12} sm={7} md={6}>
            <img src={ testProduct } alt="imgProduct" style={{paddingLeft : 15+'%', width : 'auto',height : 'auto', maxHeight: '400px'}}/>
            </Grid>

            <Grid item xs={12} sm={7} md={6}>
                <h3 style={{fontSize : 23+'px'}}>{ this.state.product.name}</h3>
                <h5 style={{ marginTop : -5+'px' }}>sale date : { this.state.product.saleDate} </h5>

                <h3 style={{fontSize : 23+'px'}}>฿{ this.state.product.price} </h3>

                { this.state.product.color &&
                 <div className="radioGroup">
                    <h4 style={{marginBottom: 10+'px'}}>colors</h4>
                    { colors.map((col) => { 
                    return  <span key={col.colorId}><input type="radio" id={col.colorName}  name="color" value={`${col.colorId}`} onChange={this.chooseColor}/>
                    <label for={col.colorName} >{col.colorName}</label></span>
                    
                    })}
                    { this.state.noColor &&<h5 style={{color : 'red' , marginTop : 5+'px' }}>please select color!</h5>}
                </div>  
                }
               
                <div class="plusMinus" style={{color : '#545454'}}>
                <h4>quantity</h4>
                <div className="plusMinusQuantity">
                <div className="minusButton" onClick={this.minusQuantity}>-</div>
                <div className="currentQuantity">{this.state.quantityAdd}</div>
                <div className="plusButton"onClick={this.plusQuantity}>+</div>
                </div>
                </div>


                <button className="AddButton" style={{padding : 10+'px' ,width : 45+'%'}} onClick={this.addToCart}>Add - ฿{this.state.product.price*this.state.quantityAdd} </button>
                </Grid>

            </Grid>

            <Container className="productInformation">

            <Grid container>

            <Grid item xs={12}>
            <div className="infoBox" onClick={this.clickedInfo}>
            <h2 className="infoText">Information</h2>
            <h2 className="plusIcon">+</h2> 
            </div>

            {this.state.isShowInfo &&
            <div className="infoShow">
           <h3 style={{ color :'black', fontWeight: 'bold',fontSize:20+'px'}}>{this.state.product.name}</h3> 
           <span style={{ color :'black', fontWeight: 'bold',fontSize:16+'px'}}>Type : {this.state.product.type.name} </span>
            <span style={{ color :'black', fontWeight: 'bold',fontSize:16+'px'}}>quantity : {this.state.product.quantity}  </span>   
            <h3>{this.state.product.description}</h3>   
            </div> 
            } 
            
            </Grid>
            <Grid item xs={12}> 
            <div className="infoBox" onClick={this.clickedComments}>
            <h2  className="infoText">comments</h2>
            <h2 className="plusIcon">+</h2>
            </div>
            {
            this.state.isShowComments && 
            <div className="commentShow">
            <div className="commentBox">
            {/* <h3>{this.state.product.comment[0].userName}</h3>
            <h3>{this.state.product.comment[0].content}</h3> */}
            </div>
            </div> 
            } 
            </Grid>


            </Grid>
           

            </Container>


            </Container>
        )
    }
}
