import { CircularProgress, Container, Grid, Hidden } from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "../../index.css";
import useSearchHandler from "../etc/useSearchHandler";
import FilterBox from "../ui/FilterBox";
import ProductCard from "../ui/ProductCard";
import DehazeIcon from "@material-ui/icons/Dehaze";
import AppsIcon from "@material-ui/icons/Apps";
import { addResDialog } from "../../actions/uiStyle";
const Home = ({ filter, addResDialog, userInfo }) => {
  const [page, setPage] = useState(0);
  const [pageSize] = useState(8);
  const [productLength, setProductLength] = useState(0);
  const [searchVal] = useState("");
  const [type, setType] = useState("");
  const [listStyle, setListStyle] = useState(1);
  const { products, hasMore, loading } = useSearchHandler(
    searchVal,
    type,
    page,
    pageSize
  );

  useEffect(() => {
    if (filter.length === 0) {
      setType("");
      setPage(0);
    }
    if (filter.length > 0) {
      setType(filter);
      setPage(0);
    }
  }, [filter]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getProductLength = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/products`)
        .then((res) => {
          setProductLength(res.data.length);
        })
        .catch((err) => {
          const data = {
            status: 500,
            dialogContent: err.message,
          };
          addResDialog(data);
        });
    };
    getProductLength();
  }, [addResDialog]);

  const observer = useRef();
  const lastElementRef = useCallback(
    (el) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((e) => {
        if (e[0].isIntersecting && hasMore) {
          setPage((p) => p + 1);
        }
      });
      if (el) observer.current.observe(el);
    },
    [loading, hasMore]
  );

  const productList = products.map((product, i) => {
    if (products.length === i + 1) {
      if (listStyle === 1) {
        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={5}
            lg={3}
            ref={lastElementRef}
            key={`productCardNo${product.productId}`}
          >
            <ProductCard product={product} listStyle={listStyle} />
          </Grid>
        );
      } else {
        return (
          <Grid
            item
            xs={12}
            ref={lastElementRef}
            key={`productCardNo${product.productId}`}
          >
            <ProductCard product={product} listStyle={listStyle} />
          </Grid>
        );
      }
    } else {
      if (listStyle === 1) {
        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={5}
            lg={3}
            key={`productCardNo${product.productId}`}
          >
            <ProductCard product={product} listStyle={listStyle} />
          </Grid>
        );
      } else {
        return (
          <Grid item xs={12} key={`productCardNo${product.productId}`}>
            <ProductCard product={product} listStyle={listStyle} />
          </Grid>
        );
      }
    }
  });

  return (
    <>
      <Container maxWidth="xl">
        <div className="headerHome">
          <div>
            <AppsIcon
              className="p-10 hoverCursor"
              onClick={() => setListStyle(1)}
              style={{ color: listStyle === 1 ? "#333435" : null }}
            />
            <Hidden smDown>
              <DehazeIcon
                className="p-10 hoverCursor"
                onClick={() => setListStyle(2)}
                style={{ color: listStyle === 2 ? "#333435" : null }}
              />
            </Hidden>
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: 78 + "%",
            marginTop: 1 + "rem",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            spacing={0}
            style={{ maxWidth: "90%" }}
          >
            <Grid item xs={12} md={3}>
              <FilterBox></FilterBox>
            </Grid>

            <Grid item xs={12} md={8}>
              <Container className="homeContainer">
                <h4
                  className="text-right baseColor"
                  style={{
                    marginTop: "-15px",
                  }}
                >
                  {productLength} รายการ
                </h4>
                <Grid container direction="row" spacing={2}>
                  {productList}
                </Grid>

                {loading && (
                  <Grid item xs={12}>
                    <div className="text-center pt-20">
                      <CircularProgress
                        style={{ color: "#1895f5" }}
                        disableShrink
                      />
                    </div>
                  </Grid>
                )}
              </Container>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.uiStyle.filterType,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addResDialog: (content) => dispatch(addResDialog(content)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
