import { CircularProgress, Container, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../index.css";
import useSearchHandler from "../etc/useSearchHandler";
import FilterBox from "../ui/FilterBox";
import ProductCard from "../ui/ProductCard";
import ResponseDialog from "../ui/ResponseDialog";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [productLength, setProductLength] = useState(0);
  const [observedEl, setObserverEl] = useState(null);

  
  const observer = new IntersectionObserver(
    (t) => {
      if (t[0].isIntersecting) {
        if (productLength > products.length) {
          getMoreProducts();
        }
      }
    },
    { threshold: 1 }
  );

  useEffect(() => {
    const getFirstProducts = () => {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/products/page?pageNo=1&&pageSize=${pageSize}`
        )
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          setDialogHeader("Error");
          setDialogContent(err.message);
          setShowDialog(true);
        });
    };
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
    getFirstProducts();
    window.scrollTo(0, 0);
  }, [pageSize]);

  useEffect(() => {
    if (observedEl) {
      observer.observe(observedEl);
    }
    return () => {
      if (observedEl) {
        observer.unobserve(observedEl);
      }
    };
  }, [observedEl, observer]);

  const handleCloseBox = () => {
    setDialogHeader("");
    setShowDialog(false);
    setDialogContent("");
  };

  const getMoreProducts = () => {
    setTimeout(() => {
      if (products.length < productLength) {
        let pg = page + 1;
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/products/page?pageNo=${page}&&pageSize=${pageSize}`
          )
          .then((res) => {
            setProducts([...products, ...res.data]);

            setPage(pg);
          })
          .catch((err) => {
            setDialogHeader("Error");
            setDialogContent(err.message);
            setShowDialog(true);
          });
      }
    }, 450);
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
                    return (
                      <Grid item xs={12} sm={6} md={5} lg={3} key={i}>
                        <ProductCard product={product}></ProductCard>
                      </Grid>
                    );
                  })}
                </Grid>
                {productLength > products.length && (
                  <div
                    ref={setObserverEl}
                    style={{ textAlign: "center", paddingTop: "20px" }}
                  >
                    <CircularProgress
                      style={{ color: "#1895f5" }}
                      disableShrink
                    />
                  </div>
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
