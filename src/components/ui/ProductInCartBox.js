import React from "react";
import PropTypes from "prop-types";

const ProductInCartBox = (props) => {
  return (
    <div className="productInCart">
      <div>
        <img
          src={`${process.env.REACT_APP_API_URL}/getImage/${props.orderDetails.product.imageName}`}
          alt="productInCart"
          style={{ width: 65 + "px", height: "auto" }}
        />
      </div>

      <div className="productInCartInfo">
        <h5 className="InCartTitle">{props.orderDetails.product.name}</h5>
        <h5>{props.orderDetails.product.price} Baht</h5>
        <h5>
          color : {props.orderDetails.color.colorName} | quantity :{" "}
          {props.orderDetails.quantity}
        </h5>
      </div>
      <div>
        <button
          className="delFromCart"
          style={{ height: 30 + "%", position: "absolute", right: 30 }}
          onClick={() => props.remove(props.orderDetails)}
        >
          remove
        </button>
      </div>
    </div>
  );
};

ProductInCartBox.propTypes = {
  remove: PropTypes.func.isRequired,
};

export default ProductInCartBox;
