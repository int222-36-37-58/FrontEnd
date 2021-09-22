import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../index.css";
import FilterBox from "../ui/FilterBox";
import ProductCard from "../ui/ProductCard";
import ResponseDialog from "../ui/ResponseDialog";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        setDialogHeader("Error");
        setDialogContent(err.message);
        setShowDialog(true);
      });
  };

  const handleCloseBox = () => {
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
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: 78 + "%",
          marginTop: 1 + "rem",

          paddingBottom: 100 + "px",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          spacing={0}
        >
          <Grid item xs={12} md={3} style={{ marginLeft: "80px" }}>
            <FilterBox></FilterBox>
          </Grid>

          <Grid item xs={12} md={8}>
            <Container className="homeContainer">
              <h4 style={{ textAlign: "right", marginTop: "-15px" }}>
                {products.length} รายการ
              </h4>
              <Grid container direction="row" spacing={2}>
                {products.map((product) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={5}
                      lg={3}
                      key={product.productId}
                    >
                      <ProductCard product={product}></ProductCard>
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Home;
