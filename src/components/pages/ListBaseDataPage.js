import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  TablePagination,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ListBaseDataPage = () => {
  const [color, setColor] = useState([]);
  const [type, setType] = useState([]);
  const [addColor, setAddColor] = useState(false);
  const [addType, setAddType] = useState(false);
  const [colorToAdd, setColorToAdd] = useState("");
  const [typeToAdd, setTypeToAdd] = useState("");
  const [colorPage, setColorPage] = useState(0);
  const [typePage, setTypePage] = useState(0);
  const [rowsPerColorPage, setRowsPerColorPage] = useState(5);
  const [rowsPerTypePage, setRowsPerTypePage] = useState(5);

  useEffect(() => {
    getColor();
    getType();
  }, []);

  function getColor() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/colors`)
      .then((res) => setColor(res.data));
  }
  function getType() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/types`)
      .then((res) => setType(res.data));
  }

  const delColor = (id) => {
    getColor();
    axios
      .delete(`${process.env.REACT_APP_API_URL}/colordelete/${id}`)
      .catch((err) => {
        alert(err.response.data.message);
      })
      .then((res) => alert(res.data))
      .then(() => getColor());
  };

  const delType = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/deletetype/${id}`)
      .catch((err) => {
        alert(err.response.data.message);
      })
      .then((res) => alert(res.data))
      .then(() => getType());
  };

  const handleColor = (e) => {
    setColorToAdd(e.target.value);
  };

  const handleType = (e) => {
    setTypeToAdd(e.target.value);
  };

  const submitColor = () => {
    const json = JSON.stringify({ colorName: colorToAdd });
    axios
      .post(`${process.env.REACT_APP_API_URL}/addcolor`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((err) => {
        alert(err.data.message);
      })
      .then(() => getColor())
      .then(setColorToAdd(""))
      .then(alert("add color success. Please wait a sec to see new Change"));
  };

  const submitType = () => {
    const json = JSON.stringify({ name: typeToAdd });

    axios
      .post(`${process.env.REACT_APP_API_URL}/addtype`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((err) => {
        alert(err.data.message);
      })
      .then(() => getType())
      .then(setTypeToAdd(""))
      .then(alert("add Type success. Please wait a sec to see new Change"));
  };

  const handleChangeColorPage = (e, newPage) => {
    setColorPage(newPage);
  };

  const handleChangeTypePage = (e, newPage) => {
    setTypePage(newPage);
  };

  const handleChangeRowsPerColorPage = (event) => {
    setRowsPerColorPage(parseInt(event.target.value, 10));
    setColorPage(0);
  };

  const handleChangeRowsPerTypePage = (event) => {
    setRowsPerTypePage(parseInt(event.target.value, 10));
    setTypePage(0);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: 10 + "px" }}>
      <div
        style={{
          backgroundColor: "white",
          padding: 15 + "px",
          borderRadius: 10 + "px",
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: 24 + "px",
            marginBottom: 50 + "px",
          }}
        >
          All Colors and Types
        </div>
        <Grid container>
          <Grid item xs={12} md={6} style={{ paddingBottom: 50 + "px" }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: 20 + "px",
                paddingLeft: 35 + "px",
              }}
            >
              {" "}
              Colors{" "}
              <button
                className="AddButton"
                style={{ float: "right", marginRight: 30 + "px" }}
                onClick={() => setAddColor(!addColor)}
              >
                ADD COLOR! +
              </button>{" "}
            </div>
            {addColor && (
              <div
                style={{
                  borderRadius: 5 + "px",
                  borderStyle: "solid",
                  borderWidth: 1 + "px",
                  padding: 10 + "px",
                  borderColor: "#545454",
                  width: 90 + "%",
                  marginTop: 10 + "px",
                  marginBottom: 10 + "px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <TextField
                  size="small"
                  variant="outlined"
                  onChange={handleColor}
                  label="colorName"
                  value={colorToAdd}
                />{" "}
                <button
                  className="InfoButton"
                  style={{ float: "right" }}
                  onClick={submitColor}
                >
                  Submit Color
                </button>
              </div>
            )}

            <Table style={{ width: 90 + "%", margin: "auto" }}>
              <TableHead style={{ backgroundColor: "#3f51b5" }}>
                <TableRow>
                  <TableCell style={{ color: "white" }} align="right">
                    ID
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="right">
                    color name
                  </TableCell>
                  <TableCell
                    style={{ color: "white" }}
                    align="right"
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsPerColorPage > 0 ? (
                  color
                    .slice(
                      colorPage * rowsPerColorPage,
                      colorPage * rowsPerColorPage + rowsPerColorPage
                    )
                    .map((col) => {
                      return (
                        <TableRow key={col.colorId}>
                          <TableCell align="right">{col.colorId}</TableCell>
                          <TableCell align="right">{col.colorName}</TableCell>
                          <TableCell align="right">
                            <button
                              className="delFromCart"
                              onClick={() => delColor(col.colorId)}
                            >
                              DELETE
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    {" "}
                    <TableCell />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    onRowsPerPageChange={handleChangeRowsPerColorPage}
                    onPageChange={handleChangeColorPage}
                    count={color.length}
                    page={colorPage}
                    rowsPerPage={rowsPerColorPage}
                  ></TablePagination>
                </TableRow>
              </TableFooter>
            </Table>
          </Grid>

          <Grid item xs={12} md={6}>
            <div
              style={{
                fontWeight: 600,
                fontSize: 20 + "px",
                paddingLeft: 35 + "px",
              }}
            >
              {" "}
              Types{" "}
              <button
                className="AddButton"
                style={{ float: "right", marginRight: 30 + "px" }}
                onClick={() => setAddType(!addType)}
              >
                ADD TYPE! +
              </button>
            </div>
            {addType && (
              <div
                style={{
                  borderRadius: 5 + "px",
                  borderStyle: "solid",
                  borderWidth: 1 + "px",
                  padding: 10 + "px",
                  borderColor: "#545454",
                  width: 90 + "%",
                  marginTop: 10 + "px",
                  marginBottom: 10 + "px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <TextField
                  size="small"
                  variant="outlined"
                  onChange={handleType}
                  label="TypeName"
                  value={typeToAdd}
                />{" "}
                <button
                  className="InfoButton"
                  style={{ float: "right" }}
                  onClick={submitType}
                >
                  Submit Type
                </button>
              </div>
            )}

            <Table style={{ width: 90 + "%", margin: "auto" }}>
              <TableHead style={{ backgroundColor: "#3f51b5" }}>
                <TableRow>
                  <TableCell style={{ color: "white" }} align="right">
                    ID
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="right">
                    Type name
                  </TableCell>
                  <TableCell
                    style={{ color: "white" }}
                    align="right"
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsPerTypePage > 0 ? (
                  type
                    .slice(
                      typePage * rowsPerTypePage,
                      typePage * rowsPerTypePage + rowsPerTypePage
                    )
                    .map((type) => {
                      return (
                        <TableRow key={type.typeId}>
                          <TableCell align="right">{type.typeId}</TableCell>
                          <TableCell align="right">{type.name}</TableCell>
                          <TableCell align="right">
                            <button
                              className="delFromCart"
                              onClick={() => delType(type.typeId)}
                            >
                              DELETE
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    {" "}
                    <TableCell />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    onRowsPerPageChange={handleChangeRowsPerTypePage}
                    onPageChange={handleChangeTypePage}
                    count={type.length}
                    page={typePage}
                    rowsPerPage={rowsPerTypePage}
                  ></TablePagination>
                </TableRow>
              </TableFooter>
            </Table>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default ListBaseDataPage;
