import { Container, Grid, Hidden, Tooltip } from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import OrderDetail from "../ui/OrderDetail";
import { addResDialog } from "../../actions/uiStyle";
import { connect } from "react-redux";

const UserOrderPage = ({ addResDialog, userInfo }) => {
  const [myOrder, setMyOrder] = useState([]);
  const [currentViewOrder, setCurrentViewOrder] = useState({});
  const getMyOrderHistory = useCallback(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/user/getuserorder/${userInfo.userId}`
      )
      .then((res) => setMyOrder(res.data))
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.message,
        };
        console.log(err.response.status);
        addResDialog(data);
      });
  }, [addResDialog, userInfo.userId]);

  useEffect(() => {
    getMyOrderHistory();
  }, [getMyOrderHistory]);

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
                          <Tooltip title="ข้อมูลเพิ่มเติม" arrow>
                            <MoreHorizIcon
                              className="hoverCursor"
                              onClick={() => showOrderDetail(order)}
                            />
                          </Tooltip>
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
const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addResDialog: (content) => dispatch(addResDialog(content)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOrderPage);
