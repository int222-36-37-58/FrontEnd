import React from "react";
import PropTypes from "prop-types";

const ProductInCartBox = (props) => {
  return (
    <div className="productInCart">
      <div style={{ maxWidth: "100px" }}>
        <img
          src={`${process.env.REACT_APP_API_URL}/getImage/${props.orderDetail.product.imageName}`}
          alt="productInCart"
          className="imgInCart"
        />
      </div>

      <div>
        <div className="InCartTitle b text-left">
          {props.orderDetail.product.name}
        </div>

        <div className="colorQuantity">
          สี {props.orderDetail.color.colorName} / จำนวน{" "}
          {props.orderDetail.quantity} ชิ้น
        </div>
      </div>

      <div>
        <h5 className="baseColor b" style={{ marginTop: "-3px" }}>
          ฿{props.orderDetail.totalPrice}
        </h5>
        <button
          className="delFromCart"
          onClick={() => props.remove(props.orderDetail)}
        >
          ลบ
        </button>
      </div>
    </div>
  );
};

ProductInCartBox.propTypes = {
  remove: PropTypes.func.isRequired,
};

export default ProductInCartBox;
