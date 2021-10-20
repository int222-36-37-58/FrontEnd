import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { addToCart } from "../../actions/cart";
import { editProduct } from "../../actions/product";
import ProductContent from "./ProductContent";
import { addResDialog } from "../../actions/uiStyle";
const ProductPage = ({ addToCart, editProduct, addResDialog }) => {
  const history = useHistory();
  const notFound = () => {
    history.push("/notfound");
  };

  const goShop = () => {
    history.push("/");
  };

  return (
    <ProductContent
      addItem={addToCart}
      editProduct={editProduct}
      notFound={notFound}
      goShop={goShop}
      addResDialog={addResDialog}
    />
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
    editProduct: (product) => dispatch(editProduct(product)),
    addResDialog: (content) => dispatch(addResDialog(content)),
  };
};

export default connect(null, mapDispatchToProps)(ProductPage);
