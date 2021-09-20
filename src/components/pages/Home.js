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
        setDialogContent(err.response.data.message);
        setShowDialog(true);
      });
  };

  const handleCloseBox = () => {
    setShowDialog(false);
    setDialogContent("");
    setDialogHeader("");
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
          maxWidth: 70 + "%",
          marginTop: 1 + "rem",
          backgroundColor: "white",
          borderRadius: 15 + "px",
          paddingBottom: 100 + "px",
        }}
      >
        <Container>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            spacing={1}
          >
            <Grid item xs={12} md={3}>
              <FilterBox></FilterBox>
            </Grid>

            <Grid item xs={12} md={8}>
              <Container style={{ padding: 10 + "px", paddingTop: 30 + "px" }}>
                <Grid container direction="row" spacing={6}>
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
        </Container>
      </div>
    </>
  );
};

export default Home;
