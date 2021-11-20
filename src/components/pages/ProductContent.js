import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import noImage from "../../images/asset/noImage.jpg";
import ConfirmDialog from "../ui/ConfirmDialog";
import { useHistory } from "react-router";
import { addResDialog } from "../../actions/uiStyle";
import { connect } from "react-redux";
import "../../css/productContent.css";
const ProductContent = (props, { addResDialog }) => {
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [imageProduct, setImageProduct] = useState(noImage);
  const [quantityAdd, setQuantityAdd] = useState(1);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [noColor, setNoColor] = useState(false);
  const [confirmBox, setConfirmBox] = useState({
    showConfirm: false,
    confirmContent: "",
  });
  const history = useHistory();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {};
  }, []);

  useEffect(() => {
    let id = window.location.pathname.slice(9, window.location.pathname.length);
    if (Object.keys(product).length === 0) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/products/${id}`)
        .then((res) => {
          const prods = res.data;
          setProduct(prods);
          setImageProduct(
            `${process.env.REACT_APP_API_URL}/getImage/${prods.imageName}`
          );
        })
        .catch(() => {
          props.notFound();
        });

      axios
        .get(`${process.env.REACT_APP_API_URL}/product/${id}/comment`)
        .then((res) => {
          setComments(res.data);
        })
        .catch(() => {
          return;
        });
    }
    return () => {};
  }, [props, product]);

  const chooseColor = (e) => {
    setSelectedColor(e.target.value);
  };

  const minusQuantity = () => {
    if (quantityAdd > 1) {
      let quantity = quantityAdd - 1;
      setQuantityAdd(quantity);
    }
  };

  const plusQuantity = () => {
    if (quantityAdd < product.quantity) {
      let quantity = quantityAdd + 1;
      setQuantityAdd(quantity);
    }
  };

  const clickedInfo = () => {
    let infoClick = !isShowInfo;
    setIsShowInfo(infoClick);
  };

  const clickedComments = () => {
    setIsShowComments(!isShowComments);
  };

  const addToCart = () => {
    if (selectedColor === 0) {
      setNoColor(true);
      return;
    } else {
      setNoColor(false);
      var productToCart = Object.assign({}, product);
      var intColor = parseInt(selectedColor);
      var colorObj = product.color.find((c) => c.colorId === intColor);

      var orderDetails = {
        quantity: quantityAdd,
        totalPrice: productToCart.price * quantityAdd,
        color: colorObj,
        product: productToCart,
      };

      props.addItem(orderDetails);
      setQuantityAdd(1);
    }
  };

  const editThisProduct = () => {
    props.editProduct(product);
    history.push("/profile/editproduct");
  };

  const deleteThisProduct = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/seller/products/${product.productId}`
      )
      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: "ลบสินค้าสำเร็จ",
        };

        props.addResDialog(data);
        props.goMyShop();
      })
      .catch((err) => {
        const data = {
          status: err.status,
          dialogContent: err.response.message,
        };
        props.addResDialog(data);
      })
      .then(handleCloseConfirm);
  };

  const handleCloseConfirm = () => {
    setConfirmBox({ showConfirm: false, confirmContent: "" });
  };

  const openConfirmBox = () => {
    setConfirmBox({
      showConfirm: true,
      confirmContent: `ยืนยันที่จะลบ ${product.name} ไหม?`,
    });
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        padding: 40 + "px",
        marginTop: 2 + "rem",
        backgroundColor: "white",
        borderRadius: 10 + "px",
        boxShadow: "0px 0px 20px rgb(0 0 0 / 8%)",
      }}
    >
      <ConfirmDialog
        confirmInfo={confirmBox}
        handleCloseBox={handleCloseConfirm}
        submit={deleteThisProduct}
      />

      <Grid container alignItems="center" justifyContent="center" spacing={0}>
        <Grid item xs={12} sm={8} md={6} style={{ textAlign: "center" }}>
          {product && (
            <img
              src={`${imageProduct}`}
              alt={`${product.imageName}`}
              className="w100"
              style={{
                marginTop: "10px",
                height: "auto",

                maxHeight: "375px",
                maxWidth: "300px",
              }}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={7} md={6}>
          <h3 className="f23">{product.name}</h3>
          <h5 style={{ marginTop: -5 + "px" }}>
            วันวางจำหน่าย : {product.saleDate}{" "}
          </h5>

          <h3 className="f23 baseColor">฿{product.price} </h3>

          {product.color && (
            <div className="radioGroup">
              <h4 style={{ marginBottom: 10 + "px" }}>สีทั้งหมด</h4>
              {product.color.map((col) => {
                return (
                  <span key={`colorInContent#${col.colorId}`}>
                    <input
                      type="radio"
                      id={col.colorName}
                      name="color"
                      defaultValue={col.colorId}
                      onChange={chooseColor}
                    />
                    <label htmlFor={col.colorName}>{col.colorName}</label>
                  </span>
                );
              })}
              {noColor && (
                <h5 className="redb mt-5">กรุณาเลือกสีที่ต้องการ!</h5>
              )}
            </div>
          )}

          <div className="plusMinus" style={{ color: "#545454" }}>
            <h4>จำนวน</h4>
            <div className="plusMinusQuantity">
              <div className="minusButton hoverCursor" onClick={minusQuantity}>
                -
              </div>
              <div className="currentQuantity">{quantityAdd}</div>
              <div className="plusButton hoverCursor" onClick={plusQuantity}>
                +
              </div>
            </div>
          </div>

          {product.user && product.user.userId === props.userInfo.userId ? (
            <>
              <button
                className="InfoButton"
                style={{
                  padding: 10 + "px",
                  width: 45 + "%",
                }}
                onClick={editThisProduct}
              >
                แก้ไข
              </button>
              <button
                className="delFromCart"
                style={{
                  padding: 10 + "px",
                  width: 45 + "%",
                  marginLeft: 10 + "px",
                }}
                onClick={openConfirmBox}
              >
                ลบสินค้านี้
              </button>
            </>
          ) : (
            <>
              {product.quantity > 1 ? (
                <button
                  className="AddButton"
                  style={{ padding: 10 + "px", width: 45 + "%" }}
                  onClick={addToCart}
                >
                  เพิ่ม - ฿{product.price * quantityAdd}{" "}
                </button>
              ) : (
                <button
                  className="disabledButton"
                  disabled
                  style={{ padding: 10 + "px", width: 45 + "%" }}
                >
                  สินค้าหมด
                </button>
              )}
            </>
          )}
        </Grid>
      </Grid>

      <Container className="productInformation" style={{ marginTop: "40px" }}>
        <Grid container>
          <Grid item xs={12}>
            <label htmlFor="infoProduct">
              <div className="infoBox f15">
                <h2 className="infoText">ข้อมูลสินค้า</h2>
                {!isShowInfo ? (
                  <h5 className="plusIcon">
                    <AddIcon />{" "}
                  </h5>
                ) : (
                  <h5 className="plusIcon">
                    <RemoveIcon />
                  </h5>
                )}
              </div>
            </label>
            <input
              type="checkbox"
              id="infoProduct"
              hidden
              defaultValue=""
              onChange={clickedInfo}
            />

            <div className="infoShow">
              <h3
                className="b f20"
                style={{
                  color: "black",
                }}
              >
                {product.name}
              </h3>
              {product.type && (
                <span>
                  <span
                    className="f16 b"
                    style={{
                      color: "black",
                    }}
                  >
                    ประเภท : {product.type.name}{" "}
                  </span>
                  <span
                    className="f16 b"
                    style={{
                      color: "black",
                    }}
                  >
                    | ขายโดย : {product.user.userName}{" "}
                  </span>
                </span>
              )}

              <h3>{product.description}</h3>
            </div>
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="commentsProduct">
              <div className="infoBox f15">
                <h2 className="infoText">ความคิดเห็น</h2>
                {!isShowComments ? (
                  <h5 className="plusIcon">
                    <AddIcon />{" "}
                  </h5>
                ) : (
                  <h5 className="plusIcon">
                    <RemoveIcon />
                  </h5>
                )}
              </div>
            </label>
            <input
              type="checkbox"
              id="commentsProduct"
              hidden
              defaultValue=""
              onChange={clickedComments}
            />

            <div className="commentShow">
              <div className="commentBox">
                {comments.length < 1 && (
                  <div
                    className="f20 "
                    style={{
                      borderStyle: "solid",
                      borderWidth: "0 0 1px 0 ",
                      borderColor: "#e4e4e4",
                      padding: "30px",
                    }}
                  >
                    ยังไม่มีความคิดเห็นในตอนนี้
                  </div>
                )}
                {comments.map((cm) => {
                  return (
                    <div
                      key={`commentInContent${cm.commentId}`}
                      style={{
                        borderStyle: "solid",
                        borderWidth: "0 0 1px 0 ",
                        borderColor: "#e4e4e4",
                      }}
                    >
                      <h3>ความเห็นจากคุณ : {cm.user.userName}</h3>
                      <h3 style={{ maxHeight: "100%", overflowY: "hidden" }}>
                        {" "}
                        {cm.content}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

ProductContent.propTypes = {
  addItem: PropTypes.func.isRequired,
  notFound: PropTypes.func.isRequired,
  editProduct: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addResDialog: (content) => dispatch(addResDialog(content)),
  };
};

export default connect(null, mapDispatchToProps)(ProductContent);
