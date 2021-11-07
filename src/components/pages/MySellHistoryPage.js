import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const MySellHistoryPage = ({ userInfo }) => {
  const [mySell, setMySell] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/seller/order/${userInfo.userName}`)
      .then((res) => {
        setMySell(res.data);
      
      });
  }, [userInfo.userName]);

  return <div className="profileBox"></div>;
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

export default connect(mapStateToProps)(MySellHistoryPage);
