import { Container, Grid, Hidden } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ResponseDialog from "../ui/ResponseDialog";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import OrderDetail from "../ui/OrderDetail";

const UserOrderPage = () => {
  useEffect(() => {
    getMyOrderHistory();
  }, []);

  const [myOrder, setMyOrder] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [currentViewOrder, setCurrentViewOrder] = useState({});
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
    setDialogHeader("");
    setDialogContent("");
  };

  const showOrderDetail = (order) => {
    setCurrentViewOrder(order);
  };

  const computedPrice = (order) => {
    let total = 0;
    for (let i = 0; i < order.orderDetail.length; i++) {
      total += order.orderDetail[i].totalPrice;
    }
    return total;
  };

  const formatDate = (orderDate) => {
    const buyDate = new Date(orderDate);
    let year = buyDate.getFullYear();
    let month = parseInt(buyDate.getMonth()) + 1;
    let date = buyDate.getDate();
    let hours = buyDate.getHours();
    let mins = buyDate.getMinutes();
    let dateformat = date + "/" + month + "/" + year + " " + hours + ":" + mins;
    return dateformat;
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
          padding: 25 + "px",
          paddingTop: "50px",
          marginTop: 2 + "rem",
          backgroundColor: "white",
          borderRadius: 10 + "px",
          boxShadow: "0px 0px 20px rgb(0 0 0 / 8%)",
          textAlign: "center",
        }}
      >
        {Object.keys(currentViewOrder).length <= 0 ? (
          <>
            {" "}
            <h2>ประวัติการสั่งซื้อ </h2>
            <Hidden smDown>
              <table className="orderTable">
                <thead className="orderTableHeader">
                  <tr>
                    <th>หมายเลขคำสั่งซื้อ</th>
                    <th>วัน เวลา</th>
                    <th>ยอดซื้อ</th>
                    <th>สถานะ</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {myOrder.map((order) => {
                    return (
                      <tr key={order.userOrderId}>
                        <td style={{ padding: "5px" }}>#{order.userOrderId}</td>
                        <td> {formatDate(order.date)}</td>
                        <td>฿{computedPrice(order)}</td>
                        <td>Success!</td>
                        <td>
                          {" "}
                          <MoreHorizIcon
                            className="hoverCursor"
                            onClick={() => showOrderDetail(order)}
                          />{" "}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Hidden>
            <Hidden mdUp>
              {myOrder.map((order) => {
                return (
                  <div
                    key={order.userOrderId}
                    className="roundContainer"
                    style={{
                      padding: " 50px",
                      marginBottom: "20px",
                      textAlign: "left",
                    }}
                  >
                    <Grid container spacing={3}>
                      {" "}
                      <Grid item xs={6} style={{ fontWeight: "600" }}>
                        หมายเลขคำสั่งซื้อ
                      </Grid>
                      <Grid item xs={6}>
                        #{order.userOrderId}
                      </Grid>
                      <Grid item xs={6} style={{ fontWeight: "600" }}>
                        วันและเวลา
                      </Grid>
                      <Grid item xs={6}>
                        {formatDate(order.date)}
                      </Grid>
                      <Grid item xs={6} style={{ fontWeight: "600" }}>
                        ราคาสุทธิ
                      </Grid>
                      <Grid item xs={6}>
                        ฿{computedPrice(order)}
                      </Grid>
                      <Grid item xs={6} style={{ fontWeight: "600" }}>
                        สถานะ
                      </Grid>
                      <Grid item xs={6}>
                        Success!
                      </Grid>
                      <Grid item xs={12}>
                        <button
                          className="AddButton"
                          onClick={() => showOrderDetail(order)}
                        >
                          รายละเอียด
                        </button>
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
            </Hidden>
          </>
        ) : (
          <OrderDetail
            order={currentViewOrder}
            backOrderList={() => setCurrentViewOrder({})}
          />
        )}
      </Container>
    </>
  );
};

export default UserOrderPage;
