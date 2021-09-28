import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ResponseDialog from "../ui/ResponseDialog";

const UserOrderPage = () => {
  useEffect(() => {
    getMyOrderHistory();
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

  const handleComment = () => {
    alert("didnot handle this function");
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
        <h2>ประวัติการสั่งซื้อ </h2>
        {myOrder.map((order) => {
          return (
            <div
              className="orderCard"
              key={order.userOrderId}
              style={{
                paddingLeft: 35 + "px",
                paddingRight: 35 + "px",
                paddingBottom: 35 + "px",
                paddingTop: 10 + "px",
                color: "#181818",
                marginBottom: 30 + "px",
                backgroundColor: "white",
                borderRadius: 10 + "px",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "#d1eafd",
                boxShadow: " 7px 4px #d1eafd",
              }}
            >
              <h3
                style={{
                  borderStyle: "solid",
                  borderWidth: "0 0 1px 0",
                  marginRight: "20px",
                  borderColor: "#181818",
                }}
              >
                หมายเลขคำสั่งซื้อ #{order.userOrderId}
              </h3>
              <h4>วันที่สั่งซื้อ {order.date}</h4>
              <Grid container>
                {order.orderDetails.map((odt) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={5}
                      key={odt.orderDetailId}
                      style={{
                        margin: 10 + "px",
                        borderRadius: "8px",
                        borderStyle: "solid",
                        borderWidth: "0.5px",
                        borderColor: "#d1eafd",
                        boxShadow: " 5px 5px #d1eafd",
                      }}
                    >
                      <Grid container justifyContent="center">
                        <Grid item xs={8} sm={7} md={5}>
                          <img
                            src={`${process.env.REACT_APP_API_URL}/getImage/${odt.product.imageName}`}
                            alt="productInOrder"
                            className="imageProduct2"
                            style={{ paddingTop: "35px", paddingLeft: "3px" }}
                          />
                        </Grid>
                        <Grid item xs={10} md={8} lg={6}>
                          <h3
                            style={{
                              borderStyle: "solid",
                              borderWidth: "0 0 1px 0",
                              marginRight: "20px",
                              borderColor: "#181818",
                            }}
                          >
                            <Link
                              to={`/product/${odt.product.productId}`}
                              className="hoverChangeToNavBarColor"
                              style={{
                                marginRight: 30 + "px",
                                textDecoration: "none",
                                fontWeight: 600,
                              }}
                            >
                              {odt.product.name}
                            </Link>
                          </h3>

                          <span>จำนวน : {odt.quantity} ชิ้น /</span>
                          <span> สี : {odt.color.colorName}</span>
                          <h4> รวม : {odt.totalPrice} บาท</h4>
                          <button
                            className="AddButton"
                            style={{
                              marginTop: -5 + "px",
                              marginBottom: 20 + "px",
                              paddingBottom: "5px",
                            }}
                            onClick={handleComment}
                          >
                            แสดงความคิดเห็น
                          </button>
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
