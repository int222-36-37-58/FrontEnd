import { Box, Container } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cart";

function ProductCard(props, { addToCart }) {
  const history = useHistory();
  const [clickAdd, setClickAdd] = useState(false);
  const [colorChoose, setColorChoose] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [noColor, setNoColor] = useState(false);

  const seeInfo = () => {
    history.push(`/product/${props.product.productId}`);
  };

  const showColor = () => {
    setClickAdd(!clickAdd);
    setQuantity(1);
    return;
  };

  const minusQuantity = () => {
    if (quantity > 1) {
      let currentQuantity = quantity - 1;
      setQuantity(currentQuantity);
    }
  };

  const plusQuantity = () => {
    if (quantity < props.product.quantity) {
      let currentQuantity = quantity + 1;
      setQuantity(currentQuantity);
    }
  };

  const chooseColor = (e) => {
    setColorChoose(0);
    let color = e.target.value;
    setColorChoose(color);
  };

  const AddToCart = () => {
    if (colorChoose === 0) {
      setNoColor(true);
    } else {
      var productToCart = Object.assign({}, props.product);
      var intColor = parseInt(colorChoose);
      var colorObj = props.product.color.find((c) => c.colorId === intColor);
      var orderDetails = {
        quantity: quantity,
        totalPrice: productToCart.price * quantity,
        color: colorObj,
        product: productToCart,
      };
      props.addToCart(orderDetails);
      setNoColor(false);
      setColorChoose(0);
      setQuantity(1);
      setClickAdd(false);
    }
  };

  return (
    <Container
      style={{ height: 325 + "px", margin: 10 + "px", marginBottom: 40 + "px" }}
    >
      {clickAdd && (
        <div className="colorModal">
          <div className="colorModalContent">
            <img
              src={`${process.env.REACT_APP_API_URL}/getImage/${props.product.imageName}`}
              alt="imgProduct"
              className="hoverCursor imageProduct"
              style={{ borderRadius: "20px", marginTop: "20px" }}
            />
            <div
              style={{ marginTop: 5 + "px", marginLeft: 10 + "px" }}
              className="radioGroup"
            >
              <span style={{ fontWeight: 900 }}> Color : </span>
              {props.product.color.map((color) => {
                return (
                  <span key={color.colorId}>
                    <input
                      type="radio"
                      id={color.colorName}
                      name="color"
                      value={`${color.colorId}`}
                      onChange={chooseColor}
                    />
                    <label htmlFor={color.colorName}>{color.colorName}</label>
                  </span>
                );
              })}
            </div>
            <div
              className="plusMinus"
              style={{ color: "white", width: 90 + "%" }}
            >
              <h4>quantity</h4>
              <div className="plusMinusQuantity">
                <div
                  className="minusButton"
                  style={{ paddingRight: 5 + "px" }}
                  onClick={minusQuantity}
                >
                  -
                </div>
                <div
                  className="currentQuantity"
                  style={{ paddingRight: 5 + "px" }}
                >
                  {quantity}
                </div>
                <div className="plusButton" onClick={plusQuantity}>
                  +
                </div>
              </div>
              {noColor && (
                <h5 style={{ color: "#D83C2D", marginTop: 5 + "px" }}>
                  please select color!
                </h5>
              )}
            </div>
            <button
              className="AddButton"
              style={{ width: 90 + "%", marginTop: -10 + "px" }}
              onClick={AddToCart}
            >
              Add - ฿{props.product.price * quantity}
            </button>
            <button
              className="delFromCart"
              style={{ width: 90 + "%", padding: 5 + "px" }}
              onClick={showColor}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        style={{ marginLeft: "-10px", marginRight: "-10px" }}
      >
        <div className="imageContainer">
          <Link
            to={`/product/${props.product.productId}`}
            style={{ textDecoration: "none" }}
          >
            <img
              src={`${process.env.REACT_APP_API_URL}/getImage/${props.product.imageName}`}
              alt="imgProduct"
              className="hoverCursor imageProduct"
            />
            <div className="hoverImage">
              <h4 className="textInHoverImage">view</h4>
            </div>
          </Link>
        </div>
        <div>
          <Link
            to={`/product/${props.product.productId}`}
            style={{ textDecoration: "none" }}
          >
            <h5 className="titleWrap">{props.product.name}</h5>
          </Link>
          {props.product.quantity < 1 ? (
            <button
              className="disabledButton "
              disabled
              style={{ width: 90 + "%" }}
             
            >
              Sold out
            </button>
          ) : (
            <button
              className="AddButton"
              style={{ width: 90 + "%" }}
              onClick={showColor}
            >
              Add - ฿{props.product.price}{" "}
            </button>
          )}

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

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
  };
};

export default connect(null, mapDispatchToProps)(ProductCard);
