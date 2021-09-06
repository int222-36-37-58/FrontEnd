import { Container, Grid } from '@material-ui/core'
import React, { Component } from 'react'
import testProduct from "../../images/testProduct.jpg"

export default class ProductPage extends Component {

    state = {
        product : {
            productName: "(LN) เรื่องฝันปั่นป่วยของผมกับแม่สาวน้อยช่างฝัน เล่ม 6",
            description : "“เธอสองคนอยู่ก่อนแต่งกันมาตั้งแต่เมื่อไหร่”ซาคุตะตกอยู่ในสถานการณ์ที่ยากลำบากที่สุดในชีวิต เพราะเรื่องที่เขาและโชโกะ (คนที่เป็นเด็กสาววัยนักศึกษา) อาศัยอยู่ด้วยกันถูกมาอิจับได้ ขณะเดียวกัน โชโกะอีกคน (คนที่เป็นเด็กหญิงวัยมัธยมต้น) กำลังรักษาตัวในโรงพยาบาลเนื่องจากอาการป่วยที่ทรุดหนักความลับของโชโกะทั้งสองคนที่ต่างวัยกันถึงเวลาที่จะได้คลี่คลายปมปริศนานั้นเสียที",
            price : "315.00",
            saleDate : '12-12-2021',
            quantity: 20,
            imageName : 'testProduct',
            colors : [{id : 1,colorName : 'red'}
            ,{id:2,colorName: 'blue'}
            ,{id:3,colorName: 'green'}
            ,{id:4,colorName: 'black'}
            ,{id:5,colorName: 'yellow'}
            ,{id:6,colorName: 'orange'}
            ,{id:7,colorName: 'purple'}
            ,{id:8,colorName: 'white'}
            ,{id:9,colorName: 'pink'}
            ,{id:10,colorName: 'nocolor'}],
            comment : [{userName: 'testUser'
            ,content :'(LN) เรื่องฝันปั่นป่วยของผมกับแม่สาวน้อยช่างฝัน เล่ม 6(LN) เรื่องฝันปั่นป่วยของผมกับแม่สาวน้อยช่างฝัน เล่ม 6'} ]  
        },
        quantityAdd : 1,
        isShowInfo : false,
        isShowComments : false,
        selectedColor : 0,
        noColor : false
    }


    chooseColor = e => {
        this.setState({selectedColor : e.target.value})
    }



    minusQuantity = () => {
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
        return (
            <Container maxWidth='lg' style={{padding: 40+'px', marginTop : 2 + 'rem', backgroundColor : 'white' ,borderRadius : 10 + "px"}}>
            <Grid container justifyContent="center">
            <Grid item xs={12} sm={7} md={6}>
            <img src={ testProduct } alt="imgProduct" style={{paddingLeft : 15+'%', width : 'auto',height : 'auto', maxHeight: '400px'}}/>
            </Grid>

            <Grid item xs={12} sm={7} md={6}>
                <h3 style={{fontSize : 23+'px'}}>{ this.state.product.productName}</h3>
                <h5 style={{ marginTop : -5+'px' }}>sale date : { this.state.product.saleDate} </h5>

                <h3 style={{fontSize : 23+'px'}}>฿{ this.state.product.price} </h3>

                <div className="radioGroup">
                    <h4 style={{marginBottom: 10+'px'}}>colors</h4>
                    { this.state.product.colors.map((color) => { 
                    return  <span><input type="radio" id={color.colorName}  name="color" value={`${color.id}`} onChange={this.chooseColor}/>
                    <label for={color.colorName} >{color.colorName}</label></span>
                    
                    })}
                    { this.state.noColor &&<h5 style={{color : 'red' , marginTop : 5+'px' }}>please select color!</h5>}
                </div>



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
            <h3 style={{ color :'black', fontWeight: 'bold'}}>{this.state.product.productName}</h3>  
            <h3 style={{ color :'black', fontWeight: 'bold'}}>Quantity : {this.state.product.quantity}</h3>     
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
            <h3>{this.state.product.comment[0].userName}</h3>
            <h3>{this.state.product.comment[0].content}</h3>
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
