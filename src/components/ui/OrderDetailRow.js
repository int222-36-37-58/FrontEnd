import { Grid, Hidden, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addResDialog } from "../../actions/uiStyle";

const OrderDetailRow = (props, { addResDialog }) => {
  const [comment, setComment] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [errs, setErrs] = useState(false);

  const sendComment = () => {
    setErrs(false);
    if (commentContent.length < 1 || commentContent.length > 90) {
      setErrs(true);
    } else {
      const json = JSON.stringify({
        content: commentContent,
        product: { productId: props.odt.product.productId },
        user: { userId: 1 },
      });

      axios
        .post(`${process.env.REACT_APP_API_URL}/user/addcomment`, json, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const data = {
            status: res.status,
            dialogContent: "ส่งความเห็นสำเร็จ",
          };
          addResDialog(data);
        })
        .then(() => {
          setCommentContent("");
          setComment(false);
        })
        .catch((err) => {
          const data = {
            status: err.status,
            dialogContent: err.response.data.message,
          };
          addResDialog(data);
        });
    }
  };

  return (
    <>
      <Hidden smDown>
        <>
          <tr key={props.odt.orderDetailId} style={{ fontWeight: 900 }}>
            <td style={{ padding: "5px" }}>
              <Link
                to={`/product/${props.odt.product.productId}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL}/getImage/${props.odt.product.imageName}`}
                  alt={props.odt.product.imageName}
                  style={{
                    maxWidth: "100px",
                    height: "auto",
                    paddingTop: "5px",
                  }}
                />
                <p style={{ textDecoration: "none", color: "black" }}>
                  {props.odt.product.name}
                </p>
              </Link>
            </td>
            <td>฿{props.odt.product.price}</td>
            <td>{props.odt.quantity}</td>
            <td>{props.odt.color.colorName}</td>
            <td>฿{props.odt.totalPrice}</td>
            <td>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <button
                  className="AddButton"
                  style={{
                    padding: "3px",
                  }}
                  onClick={() => setComment(!comment)}
                >
                  คอมเมนท์
                </button>
                {comment && (
                  <button
                    className="delFromCart"
                    style={{ padding: "3px", marginLeft: "5px" }}
                    onClick={() => setComment(false)}
                  >
                    ยกเลิก
                  </button>
                )}
              </div>
            </td>
          </tr>
          {comment && (
            <>
              <td colspan="6">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    transition: "0.3s",
                    alignItems: "center",
                    justifyContent: "right",
                  }}
                >
                  <TextField
                    multiline
                    style={{ width: "85%" }}
                    size="small"
                    error={errs}
                    onChange={(e) => setCommentContent(e.target.value)}
                    label={`ใส่ความเห็นต่อ ${props.odt.product.name.slice(
                      0,
                      11
                    )}...`}
                    value={commentContent}
                  />{" "}
                  <button
                    className="InfoButton "
                    style={{ marginTop: "5px", marginLeft: "10px" }}
                    onClick={() => sendComment()}
                  >
                    ส่งความเห็น
                  </button>
                </div>
              </td>
            </>
          )}
        </>
      </Hidden>

      <Hidden mdUp>
        <div style={{ paddingBottom: "20px" }} key={props.odt.orderDetailId}>
          <Link
            to={`/product/${props.odt.product.productId}`}
            style={{ textDecoration: "none" }}
          >
            <img
              src={`${process.env.REACT_APP_API_URL}/getImage/${props.odt.product.imageName}`}
              alt={props.odt.product.imageName}
              style={{
                maxWidth: "200px",
                width: "95%",
                maxHeight: "300px",
                height: "100%",
                padding: "5px",
              }}
            />
          </Link>
          <div
            style={{
              textAlign: "left",
              paddingLeft: "20px",
              fontWeight: 600,
            }}
          >
            ชื่อสินค้า
            <div>{props.odt.product.name}</div>
          </div>
          <Grid
            container
            style={{
              textAlign: "left",
              paddingLeft: "10px",
              fontWeight: 400,
              borderStyle: "solid",
              borderWidth: "0 0 1px 0",
              borderColor: "black",
              paddingBottom: "20px",
              width: "95%",
              marginLeft: "10px",
            }}
          >
            <Grid item xs={6} style={{ padding: "3px" }}>
              ID
            </Grid>
            <Grid item xs={6} style={{ padding: "3px" }}>
              {props.odt.product.productId}
            </Grid>
            <Grid item xs={6} style={{ padding: "3px" }}>
              ราคา
            </Grid>
            <Grid item xs={6} style={{ padding: "3px" }}>
              ฿{props.odt.product.price}
            </Grid>
            <Grid item xs={6} style={{ padding: "3px" }}>
              สี
            </Grid>
            <Grid item xs={6} style={{ padding: "3px" }}>
              {props.odt.color.colorName}
            </Grid>
            <Grid item xs={6} style={{ padding: "3px" }}>
              จำนวน
            </Grid>
            <Grid item xs={6} style={{ padding: "3px" }}>
              {props.odt.quantity}
            </Grid>
            <Grid item xs={6} style={{ padding: "3px" }}>
              รวม
            </Grid>

            <Grid item xs={6} style={{ padding: "3px" }}>
              ฿{props.odt.totalPrice}
            </Grid>
            <Grid item xs={6} style={{ padding: "3px" }}>
              <button
                className="AddButton"
                onClick={() => setComment(!comment)}
              >
                แสดงความคิดเห็น
              </button>
              {comment && (
                <button
                  className="delFromCart"
                  style={{ padding: "7px", marginLeft: "5px" }}
                  onClick={() => setComment(false)}
                >
                  ยกเลิก
                </button>
              )}
            </Grid>

            <Grid item xs={12} style={{ padding: "3px" }}>
              {comment && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    transition: "0.3s",
                  }}
                >
                  <TextField
                    multiline
                    fullWidth
                    size="small"
                    variant="outlined"
                    error={errs}
                    onChange={(e) => setCommentContent(e.target.value)}
                    label="ใส่ความเห็นของคุณ"
                    value={commentContent}
                  />{" "}
                  <button
                    className="InfoButton "
                    style={{ marginTop: "15px" }}
                    onClick={() => sendComment()}
                  >
                    ส่งความเห็น
                  </button>
                </div>
              )}
            </Grid>
          </Grid>
        </div>
      </Hidden>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addResDialog: (content) => dispatch(addResDialog(content)),
  };
};

export default connect(null, mapDispatchToProps)(OrderDetailRow);
