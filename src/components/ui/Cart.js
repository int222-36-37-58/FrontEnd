import { Drawer, List, ListItem } from "@material-ui/core";
import React from "react";

import ProductInCartBox from "./ProductInCartBox";

const Cart = (props) => {
  const handleCheckOut = () => {
    var currentDate = new Date();
    let order = {
      date: currentDate,
      orderDetails: props.listProduct,
      user: {
        userId: 1,
        userName: "test",
      },
    };

    console.log(order);
  };

  return (
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
  );
};

export default Cart;
