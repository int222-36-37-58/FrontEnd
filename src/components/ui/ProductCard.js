import { Box } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import AddProductModal from "./AddProductModal";
import "../../css/productCard.css";

const ProductCard = (props, { userInfo }) => {
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
        <AddProductModal
          product={props.product}
          close={() => showModal(false)}
        />
      )}
      {props.listStyle === 1 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <div className="imageContainer hoverCursor" onClick={seeInfo}>
            <img
              src={`${process.env.REACT_APP_API_URL}/getImage/${props.product.imageName}`}
              alt={`${props.product.imageName}`}
              className="hoverCursor imageProductStyle1"
            />
            <div className="hoverImage">
              <h4 className="textInHoverImage">view</h4>
            </div>
          </div>
          <div className="hoverCursor">
            <h5 className="titleWrap" onClick={seeInfo}>
              {props.product.name.length >= 50 ? (
                <>
                  {props.product.name.slice(0, props.product.name.length - 12)}
                  ...
                </>
              ) : (
                <>{props.product.name}</>
              )}
            </h5>

            <div className="text-center">
              {props.product.quantity < 1 ? (
                <button className="disabledButton buttonRes  ">
                  สินค้าหมด
                </button>
              ) : (
                <>
                  {props.product.user.userId === props.userInfo.userId ? (
                    <button className="disabledButton buttonRes">
                      เหลือ {props.product.quantity} ชิ้น
                    </button>
                  ) : (
                    <button
                      className="AddButton buttonRes  "
                      onClick={() => showModal(true)}
                    >
                      เพิ่ม - ฿{props.product.price}{" "}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </Box>
      ) : (
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
              className=" imageProductStyle2"
            />
          </div>
          <div className="titleStyle2">
            <h3 onClick={seeInfo} className=" hoverChangeToNavBarColor">
              {props.product.name}
            </h3>
          </div>
          <div className="text-center">
            <div className="b baseColor f20">฿{props.product.price} </div>
            <div>
              {props.product.quantity < 1 ? (
                <button className="disabledButton ">สินค้าหมด</button>
              ) : (
                [
                  props.product.user.userId === props.userInfo.userId ? (
                    <button
                      className="disabledButton"
                      style={{ padding: "5px 40px" }}
                    >
                      เหลือ {props.product.quantity} ชิ้น
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
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

export default connect(mapStateToProps)(ProductCard);
