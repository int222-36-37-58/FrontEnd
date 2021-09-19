import { Drawer, List, ListItem } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";

import ProductInCartBox from "./ProductInCartBox";
import ResponseDialog from "./ResponseDialog";

const Cart = (props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  const handleCloseBox = () => {
    setShowDialog(false);
    setDialogContent("");
  };

  const handleCheckOut = () => {
    var currentDate = new Date();
    let order = {
      date: currentDate.toISOString(),
      orderDetails: props.listProduct,
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
      .then(setDialogContent("Check out success!!"))
      .then(() => props.checkout())
      .catch((err) => {
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
      />
      <Drawer
        open={props.isShowCart}
        anchor={"right"}
        onClose={props.onHandleCart(false)}
      >
        <List style={{ width: 333 + "px" }}>
          {props.listProduct.length === 0 ? (
            <ListItem style={{ fontWeight: 600 }}>No product in cart</ListItem>
          ) : (
            <ListItem style={{ fontWeight: 600 }}>Cart : </ListItem>
          )}
          {props.listProduct.map((item, index) => {
            return (
              <ListItem key={index}>
                <ProductInCartBox orderDetails={item} remove={props.remove} />
              </ListItem>
            );
          })}

          <ListItem>
            {props.listProduct.length > 0 && (
              <span>
                <button className="AddButton" onClick={handleCheckOut}>
                  CheckOut
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
                }}
                onClick={props.onHandleCart(false)}
              >
                Close
              </button>{" "}
            </span>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Cart;
