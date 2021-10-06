import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CreateProductForm from "../forms/CreateProductForm";

const EditProductPage = ({ product }) => {
  const [prd, setPrd] = useState({});

  useEffect(() => {
   let pro = Object.assign({}, product);
    pro.type = String(pro.type.typeId);
    setPrd(pro);
    console.log(pro)
  
  }, [product]);

  return <CreateProductForm product={prd} submit={() => alert("hello")} />;
};
const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

export default connect(mapStateToProps)(EditProductPage);
