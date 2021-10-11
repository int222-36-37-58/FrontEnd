import { CircularProgress, Container, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "../../index.css";
import useSearchHandler from "../etc/useSearchHandler";
import FilterBox from "../ui/FilterBox";
import ProductCard from "../ui/ProductCard";
import ResponseDialog from "../ui/ResponseDialog";
import DehazeIcon from "@material-ui/icons/Dehaze";
import AppsIcon from "@material-ui/icons/Apps";
const Home = ({ filter }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState("");
  const [dialogContent, setDialogContent] = useState("");
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
    pageSize,
    filter
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
  }, [filter, type]);

  useEffect(() => {
    const getProductLength = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/products`)
        .then((res) => {
          setProductLength(res.data.length);
        })
        .catch((err) => {
          setDialogHeader("Error");
          setDialogContent(err.message);
          setShowDialog(true);
        });
    };
    getProductLength();
    window.scrollTo(0, 0);
  }, [pageSize]);

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

  const handleCloseBox = () => {
    setDialogHeader("");
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

      <Container maxWidth="xl">
        <div className="headerHome">
          <div>
            <AppsIcon
              className="p-10 hoverCursor"
              onClick={() => setListStyle(1)}
              style={{ color: listStyle === 1 ? "#333435" : null }}
            />
            <DehazeIcon
              className="p-10 hoverCursor"
              onClick={() => setListStyle(2)}
              style={{ color: listStyle === 2 ? "#333435" : null }}
            />
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
            justifyContent="space-between"
            spacing={0}
          >
            <Grid item xs={12} md={3}>
              <FilterBox></FilterBox>
            </Grid>

            <Grid item xs={12} md={8}>
              <Container className="homeContainer">
                <h4
                  style={{
                    textAlign: "right",
                    marginTop: "-15px",
                    color: "#3595f6",
                  }}
                >
                  {productLength} รายการ
                </h4>
                <Grid container direction="row" spacing={2}>
                  <>
                    {products.map((product, i) => {
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
                              key={i}
                            >
                              <ProductCard
                                product={product}
                                listStyle={listStyle}
                              ></ProductCard>{" "}
                            </Grid>
                          );
                        } else {
                          return (
                            <Grid item xs={12} ref={lastElementRef} key={i}>
                              <ProductCard
                                product={product}
                                listStyle={listStyle}
                              ></ProductCard>{" "}
                            </Grid>
                          );
                        }
                      } else {
                        if (listStyle === 1) {
                          return (
                            <Grid item xs={12} sm={6} md={5} lg={3} key={i}>
                              <ProductCard
                                product={product}
                                listStyle={listStyle}
                              ></ProductCard>{" "}
                            </Grid>
                          );
                        } else {
                          return (
                            <Grid item xs={12} key={i}>
                              <ProductCard
                                product={product}
                                listStyle={listStyle}
                              ></ProductCard>{" "}
                            </Grid>
                          );
                        }
                      }
                    })}
                  </>
                </Grid>

                {loading && (
                  <Grid item xs={12}>
                    <div style={{ textAlign: "center", paddingTop: "20px" }}>
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
  };
};

export default connect(mapStateToProps)(Home);
