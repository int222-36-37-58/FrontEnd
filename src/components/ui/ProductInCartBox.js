import React from "react";
import PropTypes from "prop-types";

const ProductInCartBox = (props) => {
  return (
    <div className="productInCart">
      <div>
        <img
          src={`${process.env.REACT_APP_API_URL}/getImage/${props.orderDetail.product.imageName}`}
          alt="productInCart"
          style={{ width: 75 + "px", height: "auto", maxHeight: "100px" }}
        />
      </div>

      <div>
        <div className="InCartTitle b " style={{ marginTop: "-30px" }}>
          {props.orderDetail.product.name}
        </div>

        <div>
          สี : {props.orderDetail.color.colorName} / จำนวน :{" "}
          {props.orderDetail.quantity}
        </div>
      </div>

      <div>
        <h5 className="baseColor b" style={{ marginTop: "-3px" }}>
          ฿{props.orderDetail.totalPrice}
        </h5>
        <button
          className="delFromCart"
          style={{ height: 30 + "%" }}
          onClick={() => props.remove(props.orderDetail)}
        >
          นำออก
        </button>
      </div>
    </div>
  );
};

ProductInCartBox.propTypes = {
  remove: PropTypes.func.isRequired,
};

export default ProductInCartBox;
