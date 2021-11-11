import { Box, Container, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cart";
import CloseIcon from "@material-ui/icons/Close";

function ProductCard(props, { addToCart, userInfo }) {
  const history = useHistory();
  const [clickAdd, setClickAdd] = useState(false);
  const [colorChoose, setColorChoose] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [noColor, setNoColor] = useState(false);

  const seeInfo = () => {
    if (props.closeSearchModal) {
      props.closeSearchModal();
    }
    history.push(`/product/${props.product.productId}`);
  };

  const showColor = (open) => {
    const body = document.querySelector("body");
    setClickAdd(open);
    setQuantity(1);
    if (open === true) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
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

  const productColor = props.product.color.map((color, i) => {
    return (
      <React.Fragment key={`colorInCard${color.colorId}`}>
        <input
          type="radio"
          id={color.colorName}
          name="color"
          value={`${color.colorId}`}
          onClick={chooseColor}
        />
        <label htmlFor={color.colorName}>{color.colorName}</label>
      </React.Fragment>
    );
  });

  return (
    <Container
      style={{
        margin: 10 + "px",
        marginBottom: 40 + "px",
      }}
    >
      {clickAdd && (
        <div className="modal">
          <div className="colorModalContent">
            <div
              className="text-right w95 pt-10 baseColor2"
              style={{
                position: "relative",
                marginBottom: "-20px",
              }}
            >
              <CloseIcon
                className="hoverCursor"
                onClick={() => showColor(false)}
              />
            </div>
            <Grid
              container
              justifyItems="center"
              alignItems="center"
              className="pt-20 pl-20"
            >
              <Grid item xs={12} sm={12} md={6} className="text-center">
                <img
                  src={`${process.env.REACT_APP_API_URL}/getImage/${props.product.imageName}`}
                  alt={`${props.product.imageName}`}
                  style={{
                    borderRadius: "10px 10px 10px 10px",
                    width: "290px",
                    maxHeight: "375px",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <div className="productNameInModal  ">{props.product.name}</div>
                <div className="f13 pt-10 normalFont">
                  วันวางจำหน่าย {props.product.saleDate}
                </div>

                <div className="f13 normalFont pt-5">
                  ขายโดย {props.product.user.userName}
                </div>

                <div className="radioGroup w100 text-left pt-30 pb-30">
                  <div className="b"> เลือกสีที่ต้องการ </div>
                  {productColor}
                </div>
                <div className="b -mb-10 baseColor f24">
                  ฿{props.product.price}
                </div>
                <div className="plusMinus baseColor2">
                  <h4>จำนวนที่ต้องการ</h4>
                  <div className="plusMinusQuantity">
                    <div className="minusButton pr-5" onClick={minusQuantity}>
                      -
                    </div>
                    <div className="currentQuantity pr-5">{quantity}</div>
                    <div className="plusButton" onClick={plusQuantity}>
                      +
                    </div>
                  </div>
                  {noColor && (
                    <h5 className="mt-5 baseColor3">กรุณาเลือกสีที่ต้องการ!</h5>
                  )}
                </div>

                <div
                  className="w90"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <button className="AddButton mlr-5 w40" onClick={AddToCart}>
                    เพิ่ม - ฿{props.product.price * quantity}
                  </button>
                  <button
                    className="delFromCart mlr-5 w40"
                    onClick={() => showColor(false)}
                  >
                    ยกเลิก
                  </button>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
      {props.listStyle === 1 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          style={{ marginLeft: "-10px", marginRight: "-10px" }}
        >
          <div className="imageContainer hoverCursor" onClick={seeInfo}>
            <img
              src={`${process.env.REACT_APP_API_URL}/getImage/${props.product.imageName}`}
              alt={`${props.product.imageName}`}
              className="hoverCursor imageProduct"
            />
            <div className="hoverImage">
              <h4 className="textInHoverImage">view</h4>
            </div>
          </div>
          <div className="hoverCursor">
            <h5 className="titleWrap" onClick={seeInfo}>
              {props.product.name}
            </h5>

            {props.product.quantity < 1 ? (
              <button className="disabledButton" style={{ width: "90%" }}>
                สินค้าหมด
              </button>
            ) : (
              [
                props.userInfo.userId &&
                props.product.user.userId === props.userInfo.userId ? (
                  <button className="disabledButton" style={{ width: "90%" }}>
                    เพิ่ม
                  </button>
                ) : (
                  <button
                    className="AddButton"
                    style={{ width: "90%" }}
                    onClick={() => showColor(true)}
                  >
                    เพิ่ม - ฿{props.product.price}{" "}
                  </button>
                ),
              ]
            )}
          </div>
        </Box>
      ) : (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} lg={4}>
            <div className="imageContainer hoverCursor" onClick={seeInfo}>
              <img
                src={`${process.env.REACT_APP_API_URL}/getImage/${props.product.imageName}`}
                alt={`${props.product.imageName}`}
                className=" imageProduct"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={5} lg={4}>
            <h3 onClick={seeInfo}>{props.product.name}</h3>{" "}
          </Grid>
          <Grid item xs={12} sm={5} lg={3} style={{ textAlign: "center" }}>
            {" "}
            <div>
              {" "}
              <div className="b baseColor f24">฿{props.product.price} </div>
              <div>
                {props.product.quantity < 1 ? (
                  <button className="disabledButton " style={{ width: "90%" }}>
                    สินค้าหมด
                  </button>
                ) : (
                  [
                    props.userInfo.userId &&
                    props.product.user.userId === props.userInfo.userId ? (
                      <button
                        className="disabledButton"
                        style={{ width: "90%" }}
                      >
                        เพิ่ม
                      </button>
                    ) : (
                      <button
                        className="AddButton"
                        style={{ width: "90%" }}
                        onClick={showColor}
                      >
                        เพิ่ม
                      </button>
                    ),
                  ]
                )}
              </div>
            </div>{" "}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
