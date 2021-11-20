import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../../css/order.css";
import squidgirlnotfound from "../../../images/asset/squidgirlnotfound.png";

const MySellHistoryPage = () => {
  const [mySell, setMySell] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/seller/order?pageNo=0&pageSize=1`)
      .then((res) => {
        setMySell(res.data);
      });
  }, []);

  return (
    <div className="profileBox">
      <div className="f24 b text-center pt-30">ประวัติการขายสินค้าของคุณ</div>

      <table
        className="orderTable "
        style={{
          paddingBottom: "10px",
          position: "relative",
          textAlign: "center",
          margin: "auto",
          width: "100%",
          marginBottom: "40px",
          marginTop: "20px",
        }}
      >
        <thead className="orderTableHeader">
          <tr>
            <th>สินค้า</th>
            <th>สี</th>
            <th>จำนวน</th>
            <th>ราคารวม</th>
          </tr>
        </thead>
        <tbody>
          {mySell.map((sell) => {
            return (
              <tr key={`sellerproduct${sell.orderDetailId}`}>
                <td>{sell.product.name}</td>
                <td>{sell.color.colorName}</td>
                <td>{sell.quantity}</td>
                <td>฿{sell.totalPrice}</td>
              </tr>
            );
          })}

          {mySell.length === 0 && (
            <tr>
              <td colSpan="4">
                <img
                  src={squidgirlnotfound}
                  className="squidgirlnotfound"
                  alt="squidgirl"
                />
                <div className="text-center b f18">
                  คุณยังไม่มีประวัติการขาย
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MySellHistoryPage;
