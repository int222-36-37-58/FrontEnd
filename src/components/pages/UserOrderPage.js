import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ResponseDialog from "../ui/ResponseDialog";

const UserOrderPage = () => {
  useEffect(() => {
    getMyOrderHistory();
    console.log(myOrder);
  }, []);

  const [myOrder, setMyOrder] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const getMyOrderHistory = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getuserorder/1`)
      .then((res) => setMyOrder(res.data))
      .catch((err) => {
        setDialogHeader("Error");
        setDialogContent(err.message);
        setShowDialog(true);
      });
  };
  const handleCloseBox = () => {
    setShowDialog(false);
    setDialogContent("");
  };

  return (
    <>
      <ResponseDialog
        showDialog={showDialog}
        handleCloseBox={handleCloseBox}
        dialogContent={dialogContent}
        dialogHeader={dialogHeader}
      />
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
        <h2>Order History </h2>
        {myOrder.map((order) => {
          return (
            <div className="orderCard" key={order.userOrderId}>
              <div>Order : {order.userOrderId}</div>
              <div>Date : {order.date}</div>
              <Grid container alignContent="center">
                {order.orderDetails.map((odt) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      key={odt.orderDetailId}
                      style={{
                        boxShadow: "0px 0px 20px rgb(0 0 0 / 8%)",
                        margin: 10 + "px",
                        borderRadius: "8px",
                        maxWidth: 45 + "%",
                      }}
                    >
                      <Grid container style={{ padding: "5px" }}>
                        <Grid item>
                          <img
                            src={`${process.env.REACT_APP_API_URL}/getImage/${odt.product.imageName}`}
                            alt="productInCart"
                            className="imageProduct"
                          />
                        </Grid>
                        <Grid item>
                          <h4>
                            product :{" "}
                            <Link
                              to={`/product/${odt.product.productId}`}
                              className="hoverChangeToNavBarColor"
                              style={{
                                marginRight: 30 + "px",
                                textDecoration: "none",
                              }}
                            >
                              {odt.product.name}
                            </Link>
                          </h4>

                          <h4>quantity : {odt.quantity}</h4>

                          <h4> color: {odt.color.colorName}</h4>
                          <h4> total: {odt.totalPrice}</h4>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default UserOrderPage;
