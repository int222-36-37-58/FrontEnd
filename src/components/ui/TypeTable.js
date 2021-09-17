import {
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

const TypeTable = () => {
  const [type, setType] = useState([]);
  const [addType, setAddType] = useState(false);
  const [typeToAdd, setTypeToAdd] = useState("");
  const [typePage, setTypePage] = useState(0);
  const [rowsPerTypePage, setRowsPerTypePage] = useState(5);

  useEffect(() => {
    getType();
  }, []);

  function getType() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/types`)
      .then((res) => setType(res.data));
  }

  const delType = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/deletetype/${id}`)
      .catch((err) => {
        alert(err.response.data.message);
      })
      .then((res) => alert(res.data))
      .then(() => getType());
  };

  const handleType = (e) => {
    setTypeToAdd(e.target.value);
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

  const handleChangeTypePage = (e, newPage) => {
    setTypePage(newPage);
  };

  const handleChangeRowsPerTypePage = (event) => {
    setRowsPerTypePage(parseInt(event.target.value, 10));
    setTypePage(0);
  };

  return (
    <>
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
            <TableCell style={{ color: "white" }} align="right"></TableCell>
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
    </>
  );
};

export default TypeTable;
