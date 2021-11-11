import { Box, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import AddModal from "./AddModal";

function ProductCard(props, { userInfo }) {
  const history = useHistory();
  const [clickAdd, setClickAdd] = useState(false);

  const seeInfo = () => {
    if (props.closeSearchModal) {
      props.closeSearchModal();
    }
    history.push(`/product/${props.product.productId}`);
  };

  const showModal = (open) => {
    const body = document.querySelector("body");
    setClickAdd(open);
    if (open === true) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
    return;
  };

  return (
    <div
      style={{
        marginBottom: 20 + "px",
      }}
    >
      {clickAdd && (
        <AddModal product={props.product} close={() => showModal(false)} />
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

            <div className="text-center">
              {props.product.quantity < 1 ? (
                <button
                  className="disabledButton "
                  style={{ width: "90%", padding: "6px" }}
                >
                  สินค้าหมด
                </button>
              ) : (
                [
                  props.userInfo.userId &&
                  props.product.user.userId === props.userInfo.userId ? (
                    <button
                      className="disabledButton "
                      style={{ width: "90%", padding: "6px" }}
                    >
                      เพิ่ม
                    </button>
                  ) : (
                    <button
                      className="AddButton "
                      style={{ width: "90%" }}
                      onClick={() => showModal(true)}
                    >
                      เพิ่ม - ฿{props.product.price}{" "}
                    </button>
                  ),
                ]
              )}
            </div>
          </div>
        </Box>
      ) : (
        <Grid container alignItems="center">
          <Grid item xs={12} style={{ maxHeight: "280px", height: "100%" }}>
            <div
              className="flexRes"
              style={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="imageContainer hoverCursor" onClick={seeInfo}>
                <img
                  src={`${process.env.REACT_APP_API_URL}/getImage/${props.product.imageName}`}
                  alt={`${props.product.imageName}`}
                  className=" imageProduct3"
                />
              </div>
              <div>
                <h3 onClick={seeInfo} className="f18 hoverChangeToNavBarColor">
                  {props.product.name}
                </h3>{" "}
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="b baseColor f24">฿{props.product.price} </div>
                <div>
                  {props.product.quantity < 1 ? (
                    <button className="disabledButton ">สินค้าหมด</button>
                  ) : (
                    [
                      props.userInfo.userId &&
                      props.product.user.userId === props.userInfo.userId ? (
                        <button
                          className="disabledButton"
                          style={{ padding: "5px 40px" }}
                        >
                          เพิ่ม
                        </button>
                      ) : (
                        <button
                          className="AddButton"
                          style={{ padding: "5px 40px" }}
                          onClick={showModal}
                        >
                          เพิ่ม
                        </button>
                      ),
                    ]
                  )}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

export default connect(mapStateToProps)(ProductCard);
