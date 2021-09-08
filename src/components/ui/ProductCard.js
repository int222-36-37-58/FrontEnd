import { Box, Container } from "@material-ui/core";
import React, { useState } from "react";
import testProduct from "../../images/testProduct.jpg";
import { Link, useHistory } from "react-router-dom";

function ProductCard(props) {
  const history = useHistory();
  const [clickAdd, setClickAdd] = useState(false);
  const [colorChoose , setColorChoose] = useState(0);
  const [quantity , setQuantity ] = useState(1);
  const [noColor , setNoColor] = useState(false);

  const seeInfo = () => {
    history.push(`/product/${props.productId}`);
  };

  const showColor = () => {
    setClickAdd(!clickAdd);

    return;
  };

  const minusQuantity = () => {
    if(quantity > 1){
    let currentQuantity = quantity-1;
    setQuantity(currentQuantity)
    }
}

 const plusQuantity = () => {
    if(quantity < props.quantity){
    let currentQuantity = quantity +1;
    setQuantity(currentQuantity)
    }
}




  const chooseColor = (e) => {
      setColorChoose(0)
      let color = e.target.value;
      setColorChoose(color)
      console.log(colorChoose)
  }


  const AddToCart = () => {
    if(colorChoose === 0){
      setNoColor(true);
    }
    else{
      setNoColor(false);
      setColorChoose(0);
      setQuantity(1);
      setClickAdd(false);
    }



  }

 
  return (
    <Container style={{ height: 325 + "px", margin: 10 + "px" }}>
      {clickAdd && (
        <div className="colorModal" >
            <div className="colorModalContent">
      
                <div style={{ marginTop: 5+'px' , marginLeft : 10+'px'}} className="radioGroup"> 
               <span style={{fontWeight : 900}}> Color : </span>
          {props.colors.map((color) => {
            return (
              <span>
                <input
                  type="radio"
                  id={color.colorName}
                  name="color"
                  value={`${color.colorId}`}
                  onChange={chooseColor}
                />
                <label for={color.colorName}>{color.colorName}</label>
              </span>
            );
          })}
          </div>
          <div class="plusMinus" style={{ color : 'white', width : 90+'%'}}>
                <h4>quantity</h4>
                <div className="plusMinusQuantity">
                <div className="minusButton" style={{ paddingRight : 5+'px'}} onClick={minusQuantity}>-</div>
                <div className="currentQuantity"style={{ paddingRight : 5+'px'}}>{quantity}</div>
                <div className="plusButton" onClick={plusQuantity}>+</div>
                </div>
                { noColor &&<h5 style={{color : '#D83C2D' , marginTop : 5+'px' }}>please select color!</h5>}
                </div>
          <button
            className="AddButton"
            style={{ width: 90 + "%", marginTop: -10 +'px' }}
            onClick={AddToCart}
          >
            Add
          </button>
          <button
            className="delFromCart"
            style={{ width: 90 + "%" ,padding : 5+'px' }}
            onClick={showColor}
          >
            Cancel
          </button>
        </div>
        </div>
      )}
      <Box display="flex" flexDirection="column" alignItems="center">
        <div>
          <img
            src={testProduct}
            alt="imgProduct"
            style={{ maxWidth: 188 + "px", height: "188px" }}
          />
        </div>
        <div>
          <Link
            to={`/product/${props.productId}`}
            style={{ textDecoration: "none" }}
          >
            <h5 className="titleWrap">{props.title}</h5>{" "}
          </Link>
          <button
            className="AddButton"
            style={{ width: 90 + "%" }}
            onClick={showColor}
          >
            Add - ฿{props.price}{" "}
          </button>
          <button
            className="InfoButton"
            style={{ width: 90 + "%" }}
            onClick={seeInfo}
          >
            Information
          </button>
        </div>
      </Box>
    </Container>
  );
}

export default ProductCard;
