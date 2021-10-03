import { Container, Grid } from "@material-ui/core";

import React from "react";
import ColorTable from "../ui/ColorTable";
import TypeTable from "../ui/TypeTable";

const ListBaseDataPage = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: 10 + "px" }}>
      <div
        style={{
          backgroundColor: "white",
          padding: 15 + "px",
          borderRadius: 10 + "px",
          boxShadow: "0px 0px 20px #e6e8eb",
        }}
      >
        <div
          className="f24 b"
          style={{
            marginBottom: 50 + "px",
          }}
        >
          All Colors and Types
        </div>
        <Grid container>
          <Grid item xs={12} md={6} style={{ paddingBottom: 50 + "px" }}>
            <ColorTable />
          </Grid>

          <Grid item xs={12} md={6}>
            <TypeTable />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default ListBaseDataPage;
