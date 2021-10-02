import { Drawer, Hidden, List, ListItem } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

import ProductInCartBox from "./ProductInCartBox";
import ResponseDialog from "./ResponseDialog";

const Cart = (props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    if (props.listProduct) {
      for (let i = 0; i < props.listProduct.length; i++) {
        total += props.listProduct[i].totalPrice;
      }
    }
    setTotalPrice(total);
  },[props.listProduct]);

  const handleCloseBox = () => {
    setShowDialog(false);
    setDialogContent("");
  };

  const handleCheckOut = () => {
    var currentDate = new Date();
    let order = {
      date: currentDate.toISOString(),
      orderDetail: props.listProduct,
      user: {
        userId: 1,
        userName: "testuser",
        password: "Testpassword1",
        address: "home bangkok 10150",
        tel: 1234567891,
        fullName: "testfullname",
        role: "ROLE_USER",
      },
    };
    console.log(order);

    const json = JSON.stringify(order);

    axios
      .post(`${process.env.REACT_APP_API_URL}/addorder`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setDialogHeader("Success!!");
        setDialogContent("Check out success!!");
      })
      .then(() => props.checkout())
      .catch((err) => {
        setDialogHeader("Error");
        setDialogContent(err.response.data.message);
      })
      .then(setShowDialog(true));
  };

  return (
    <>
      <ResponseDialog
        showDialog={showDialog}
        handleCloseBox={handleCloseBox}
        dialogContent={dialogContent}
        dialogHeader={dialogHeader}
      />
      <Hidden mdUp>
        <Drawer
          open={props.isShowCart}
          anchor={"right"}
          onClose={props.onHandleCart(false)}
         
        >
          <List style={{ width: "90%",paddingLeft:'25px' }}>
            {props.listProduct.length === 0 ? (
              <ListItem style={{ fontWeight: 800 }}>
                ไม่มีสินค้าในตะกร้า
              </ListItem>
            ) : (
              <ListItem style={{ fontWeight: 600 }}>ตะกร้าสินค้า : </ListItem>
            )}
            {props.listProduct.map((item, index) => {
              return (
                <ListItem key={index}>
                  <ProductInCartBox orderDetail={item} remove={props.remove} />
                </ListItem>
              );
            })}
            <h4 style={{ textAlign: "right", marginRight: 25 + "px" }}>
              ราคารวมทั้งหมด : ฿ {totalPrice}
            </h4>
            <ListItem>
              {props.listProduct.length > 0 && (
                <span>
                  <button
                    className="AddButton"
                    style={{ paddingLeft: 30 + "px", paddingRight: "30px" }}
                    onClick={handleCheckOut}
                  >
                    สั่งซื้อ
                  </button>
                </span>
              )}
              <span>
                <button
                  className="delFromCart"
                  style={{
                    marginLeft: 10 + "px",
                    paddingTop: 5 + "px",
                    paddingBottom: 5 + "px",
                    marginBottom: 5 + "px",
                    paddingLeft: 30 + "px",
                    paddingRight: "30px",
                  }}
                  onClick={props.onHandleCart(false)}
                >
                  Close
                </button>{" "}
              </span>
            </ListItem>
          </List>
        </Drawer>
      </Hidden>

      <Hidden smDown>
        <Drawer
          open={props.isShowCart}
          anchor={"right"}
          onClose={props.onHandleCart(false)}
        >
          <List style={{ width: "550px", maxWidth: "550px" }}>
            {props.listProduct.length === 0 ? (
              <ListItem
                style={{
                  fontWeight: 800,
                  borderStyle: "solid",
                  borderWidth: "0 0 1px 0",
                  maxWidth: "90%",
                  marginLeft: "20px",
                }}
              >
                ไม่มีสินค้าในตะกร้า
              </ListItem>
            ) : (
              <ListItem
                style={{
                  fontWeight: 600,
                  borderStyle: "solid",
                  borderWidth: "0 0 1px 0",
                  borderColor:"#e4e4e4",
                  maxWidth: "90%",
                  marginLeft: "20px",
                }}
              >
                ตะกร้าสินค้า :{" "}
              </ListItem>
            )}
            {props.listProduct.map((item, index) => {
              return (
                <ListItem key={index}>
                  <ProductInCartBox orderDetail={item} remove={props.remove} />
                </ListItem>
              );
            })}
            <h4 style={{ textAlign: "right", marginRight: 25 + "px" }}>
              ราคาสุทธิ ฿ {totalPrice}
            </h4>
            <div style={{ float: "right", marginRight: 25 + "px" }}>
              {props.listProduct.length > 0 && (
                <span>
                  <button
                    className="AddButton"
                    style={{ paddingLeft: 30 + "px", paddingRight: "30px" }}
                    onClick={handleCheckOut}
                  >
                    สั่งซื้อ
                  </button>
                </span>
              )}
              <span>
                <button
                  className="delFromCart"
                  style={{
                    marginLeft: 10 + "px",
                    paddingTop: 5 + "px",
                    paddingBottom: 5 + "px",
                    marginBottom: 5 + "px",
                    paddingLeft: 30 + "px",
                    paddingRight: "30px",
                  }}
                  onClick={props.onHandleCart(false)}
                >
                  ปิด
                </button>{" "}
              </span>
            </div>
          </List>
        </Drawer>
      </Hidden>
    </>
  );
};

export default Cart;
