import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import CreateProductForm from "../forms/CreateProductForm";
import { clearProduct } from "../../actions/product";
import axios from "axios";
import ResponseDialog from "../ui/ResponseDialog";
import ConfirmDialog from "../ui/ConfirmDialog";

const EditProductPage = ({ product, clearProduct }) => {
  const [prd, setPrd] = useState({});
  const history = useHistory();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [editProduct, setEditProduct] = useState({});
  const [confirmBox, setConfirmBox] = useState({
    showConfirm: false,
    confirmContent: "",
  });

  useEffect(() => {
    if (product.type) {
      let pro = Object.assign({}, product);
      pro.type = String(pro.type.typeId);
      let col = [];
      for (let i = 0; i < product.color.length; i++) {
        col.push(String(product.color[i].colorId));
      }
      pro.color = col;
      setPrd(pro);
    } else {
      history.push("/profile/info");
    }
  }, [history, product]);

  const submitEditProduct = () => {

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/products/put/${product.productId}`,
        editProduct,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        setDialogHeader("Success!!");
        setDialogContent("แก้ไขข้อมูลสำเร็จ");
        setShowDialog(true);
      })
      .catch((err) => {
        setDialogHeader("Error");
        setDialogContent(err.message);
        setShowDialog(true);
      });
     handleCloseConfirm();
  };

  const handleCloseBox = () => {
    setShowDialog(false);
    setDialogHeader("");
    setDialogContent("");
    clearProduct();
    history.push(`/product/${product.productId}`);
  };

  const handleCloseConfirm = () => {
    setConfirmBox({ showConfirm: false, confirmContent: "" });
  };

  const receiveProduct = (data) => {
    setEditProduct(data);
    setConfirmBox({
      showConfirm: true,
      confirmContent: `ยืนยันที่จะแก้ไขข้อมูลไหม`,
    });
  };

  return (
    <>
      {" "}
      <ResponseDialog
        showDialog={showDialog}
        handleCloseBox={handleCloseBox}
        dialogContent={dialogContent}
        dialogHeader={dialogHeader}
      />{" "}
      <ConfirmDialog
        confirmInfo={confirmBox}
        handleCloseBox={handleCloseConfirm}
        submit={submitEditProduct}
      />
      <CreateProductForm data={prd} submit={receiveProduct} />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearProduct: () => dispatch(clearProduct()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductPage);
