import axios from "axios";
import React, { useEffect, useState } from "react";

const MySellHistoryPage = () => {
  const [mySell, setMySell] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/seller/order`).then((res) => {
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
              <tr>
                <td>{sell.product.name}</td>
                <td>{sell.color.colorName}</td>
                <td>{sell.quantity}</td>
                <td>฿{sell.totalPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MySellHistoryPage;
