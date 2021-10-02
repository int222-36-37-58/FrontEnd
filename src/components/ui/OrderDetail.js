import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Grid, Hidden } from "@material-ui/core";
import { Link } from "react-router-dom";
const OrderDetail = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    if (props.order) {
      for (let i = 0; i < props.order.orderDetail.length; i++) {
        total += props.order.orderDetail[i].totalPrice;
      }
    }
    setTotalPrice(total);
  }, [props.order]);

  return (
    <div className="orderDetailContainer">
      <div
        style={{
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          fontWeight: "900",
          fontSize: "20px",
          borderStyle: "solid",
          borderColor: "#e4e4e4",
          backgroundColor: "#fafafa",
          borderWidth: "0 0 1px 0",
          padding: "20px",
          margin: 0,
        }}
      >
        <ArrowBackIcon
          className="hoverCursor"
          style={{ paddingRight: "20px" }}
          onClick={props.backOrderList}
        />{" "}
        หมายเลขคำสั่งซื้อ # {props.order.userOrderId}
      </div>

      <Hidden smDown>
        <div
          style={{
            padding: "20px",
            paddingBottom: "5px",
            fontSize: "18px",
            textAlign: "left",
          }}
        >
          {props.order.date}
        </div>
        <div
          style={{
            padding: "20px",
            paddingTop: "10px",
            fontSize: "18px",
            fontWeight: 600,
            textAlign: "left",
          }}
        >
          สินค้าที่สั่งซื้อ
        </div>
        <table
          className="orderTable"
          style={{
            paddingBottom: "10px",
            position: "relative",
            marginLeft: 20 + "px",
            marginRight: 20 + "px",
            width: "95%",
          }}
        >
          <thead className="orderTableHeader">
            <tr>
              <th>หมายเลขคำสั่งซื้อ</th>
              <th>ราคา</th>
              <th>จำนวน</th>
              <th>สี</th>
              <th>รวม</th>
            </tr>
          </thead>
          <tbody>
            {props.order.orderDetail.map((odt) => {
              return (
                <tr key={odt.orderDetailId} style={{ fontWeight: 900 }}>
                  <td style={{ padding: "5px" }}>
                    <Link
                      to={`/product/${odt.product.productId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={`${process.env.REACT_APP_API_URL}/getImage/${odt.product.imageName}`}
                        alt={odt.product.imageName}
                        style={{ maxWidth: "110px", height: "auto" }}
                      />
                    </Link>
                  </td>
                  <td>฿{odt.product.price}</td>
                  <td>{odt.quantity}</td>
                  <td>{odt.color.colorName}</td>
                  <td>{odt.totalPrice}</td>
                </tr>
              );
            })}
            <tr>
              <td
                colSpan="10"
                style={{
                  textAlign: "right",
                  border: "none",
                  fontWeight: "900",
                }}
              >
                ราคาสุทธิ ฿{totalPrice}
              </td>
            </tr>
          </tbody>
        </table>
      </Hidden>

      <Hidden mdUp>
        <div>
          {" "}
          <div
            style={{
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
              fontWeight: "900",
              fontSize: "20px",
              borderStyle: "solid",
              borderColor: "#e4e4e4",
              backgroundColor: "#fafafa",
              borderWidth: "1px",
              borderRadius: "20px 20px 0 0",
              padding: "20px",
              margin: "5px",
              marginBottom: 0,
            }}
          >
            สินค้าที่สั่งซื้อ
          </div>
          <div
            style={{
              margin: "5px",
              marginTop: " 0",
              borderWidth: "1px",
              borderRadius: "0 0 20px 20px  ",
              borderStyle: "solid",
              borderColor: "#e4e4e4",
            }}
          >
            <div
              style={{
                padding: "20px",
                paddingBottom: "20px",
                fontSize: "13px",
                textAlign: "left",
              }}
            >
              {props.order.date}
            </div>

            {props.order.orderDetail.map((odt) => {
              return (
                <div style={{ paddingBottom: "20px" }}  key={odt.orderDetailId}>
                  <Link
                    to={`/product/${odt.product.productId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}/getImage/${odt.product.imageName}`}
                      alt={odt.product.imageName}
                      style={{
                        maxWidth: "300px",
                        width: "auto",
                        height: "auto",
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
                    <div>{odt.product.name}</div>
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
                      {odt.product.productId}
                    </Grid>
                    <Grid item xs={6} style={{ padding: "3px" }}>
                      ราคา
                    </Grid>
                    <Grid item xs={6} style={{ padding: "3px" }}>
                      ฿{odt.product.price}
                    </Grid>
                    <Grid item xs={6} style={{ padding: "3px" }}>
                      สี
                    </Grid>
                    <Grid item xs={6} style={{ padding: "3px" }}>
                      {odt.color.colorName}
                    </Grid>
                    <Grid item xs={6} style={{ padding: "3px" }}>
                      จำนวน
                    </Grid>
                    <Grid item xs={6} style={{ padding: "3px" }}>
                      {odt.quantity}
                    </Grid>
                    <Grid item xs={6} style={{ padding: "3px" }}>
                      รวม
                    </Grid>
                    <Grid item xs={6} style={{ padding: "3px" }}>
                      ฿{odt.totalPrice}
                    </Grid>
                  </Grid>
                </div>
              );
            })}

            <div
              style={{
                textAlign: "right",
                paddingTop: "1px",
                paddingBottom: "20px",
                fontWeight: "900",
                paddingRight: "10px",
              }}
            >
              {" "}
              ราคาสุทธิ ฿{totalPrice}
            </div>
          </div>
        </div>
      </Hidden>
    </div>
  );
};

export default OrderDetail;
