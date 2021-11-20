import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProductCard from "../ui/ProductCard";
import squidgirlnotfound from "../../images/squidgirlnotfound.png";
const MyShopPage = ({ userInfo }) => {
  const [myProduct, setMyProduct] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/seller/products/sellerproduct/${userInfo.userName}`
      )
      .then((res) => {
        setMyProduct(res.data);
      });
  }, [userInfo.userName]);

  const myProd = myProduct.map((mProd) => {
    return (
      <Grid item xs={6} md={4} lg={3} key={`myProductNo${mProd.productId}`}>
        <ProductCard product={mProd} listStyle={1}></ProductCard>
      </Grid>
    );
  });

  return (
    <div className="profileBox">
      <div className="headerWithUnderline">สินค้าทั้งหมดของคุณ</div>

      <Grid container>
        {myProd}

        {myProduct.length === 0 && (
          <>
            <Grid item xs={12}>
              <div className="text-center pt-20">
                <img
                  src={squidgirlnotfound}
                  alt="noresult"
                  className="squidgirlnotfound"
                />
                <div className="b text-center pt-10 f18">
                  ไม่มีสินค้าที่คุณวางขาย
                </div>
              </div>
            </Grid>
          </>
        )}
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
