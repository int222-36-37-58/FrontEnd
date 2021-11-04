import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProductCard from "../ui/ProductCard";

const MyShopPage = ({ userInfo }) => {
  const [myProduct, setMyProduct] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/products/sellerproduct/${userInfo.userName}`
      )
      .then((res) => {
        setMyProduct(res.data);
      });
  }, [userInfo.userName]);

  return (
    <div className="profileBox">
      <Grid container>
        {myProduct.map((mp) => {
          return (
            <Grid item xs={12} sm={6} md={5} lg={3} key={mp.productId}>
              <ProductCard product={mp} listStyle={1}></ProductCard>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

export default connect(mapStateToProps)(MyShopPage);
