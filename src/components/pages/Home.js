import { CircularProgress, Container, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "../../index.css";
import useSearchHandler from "../etc/useSearchHandler";
import FilterBox from "../ui/FilterBox";
import ProductCard from "../ui/ProductCard";
import ResponseDialog from "../ui/ResponseDialog";

const Home = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [productLength, setProductLength] = useState(0);
  const [searchVal] = useState("");
  const [type] = useState("*");
  const { products, hasMore, loading } = useSearchHandler(
    searchVal,
    type,
    page,
    pageSize
  );

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
  console.log(products);
  return (
    <>
      <ResponseDialog
        showDialog={showDialog}
        handleCloseBox={handleCloseBox}
        dialogContent={dialogContent}
        dialogHeader={dialogHeader}
      />
      <Container maxWidth="xl">
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
                <h4 style={{ textAlign: "right", marginTop: "-15px" }}>
                  {productLength} รายการ
                </h4>
                <Grid container direction="row" spacing={2}>
                  {products.map((product, i) => {
                    if (products.length === i + 1) {
                      return <Grid
                        item
                        xs={12}
                        sm={3}
                        md={5}
                        lg={3}
                        ref={lastElementRef}
                        key={i}
                      >
                        <ProductCard product={product}></ProductCard>{" "}
                      </Grid>;
                    } else {
                      return (
                        <Grid item xs={12} sm={6} md={5} lg={3} key={i}>
                          <ProductCard product={product}></ProductCard>
                        </Grid>
                      );
                    }
                  })}
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

export default Home;
