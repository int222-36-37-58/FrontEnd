import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ResponseDialog from "./ResponseDialog";

const ColorTable = () => {
  const [color, setColor] = useState([]);
  const [addColor, setAddColor] = useState(false);
  const [colorToAdd, setColorToAdd] = useState("");
  const [colorPage, setColorPage] = useState(0);
  const [rowsPerColorPage, setRowsPerColorPage] = useState(5);
  const [isEdit, setIsEdit] = useState(false);
  const [colorEdit, setColorEdit] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  useEffect(() => {
    getColor();
  }, []);

  function getColor() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/colors`)
      .then((res) => setColor(res.data))
      .catch((err) => {
        setDialogHeader("Error");
        setDialogContent(err.message);
        setShowDialog(true);
      });
  }

  const editColor = (color) => {
    setIsEdit(true);
    setColorEdit(color);
  };

  const delColor = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/colordelete/${id}`)

      .then((res) => {
        setDialogHeader("Success!!");
        setDialogContent(res.data);
      })
      .then(() => getColor())
      .catch((err) => {
        setDialogHeader("Error");
        setDialogContent(`${err.response.data.message}`);
      })
      .then(setShowDialog(true));
  };

  const handleColor = (e) => {
    setColorToAdd(e.target.value);
  };

  const handleColorEdit = (e) => {
    setColorEdit({ ...colorEdit, colorName: e.target.value });
  };

  const submitColor = () => {
    const json = JSON.stringify({ colorName: colorToAdd });
    axios
      .post(`${process.env.REACT_APP_API_URL}/addcolor`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        setDialogHeader("Success!!");
        setDialogContent(`Add color ${res.data.colorName} success!!`);
      })
      .then(() => getColor())
      .then(setColorToAdd(""))
      .catch((err) => {
        setDialogHeader("Error");
        setDialogContent(err.response.data.message);
      })
      .then(setShowDialog(true));
  };

  const submitEdit = () => {
    const json = JSON.stringify({
      colorId: colorEdit.colorId,
      colorName: colorEdit.colorName,
    });
    axios
      .put(`${process.env.REACT_APP_API_URL}/editcolor`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      .then(() => {
        setDialogHeader("Success!!");
        setDialogContent(`Update color success!!`);
      })
      .then(() => getColor())
      .then(setIsEdit(false))
      .catch((err) => {
        setDialogHeader("Error");
        setDialogContent(err.response.data.message);
      })
      .then(setShowDialog(true));
  };

  const handleChangeColorPage = (e, newPage) => {
    setColorPage(newPage);
  };

  const handleChangeRowsPerColorPage = (event) => {
    setRowsPerColorPage(parseInt(event.target.value, 10));
    setColorPage(0);
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

      {isEdit && (
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
            onChange={handleColorEdit}
            label="colorName"
            value={colorEdit.colorName}
          />{" "}
          <button
            className="delFromCart"
            style={{ float: "right", padding: 5 + "px", marginLeft: 5 + "px" }}
            onClick={() => {
              setIsEdit(false);
            }}
          >
            Cancel
          </button>
          <button
            className="InfoButton"
            style={{ float: "right" }}
            onClick={submitEdit}
          >
            Update Color
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
            <TableCell style={{ color: "white" }} align="right"></TableCell>
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
                        className="InfoButton"
                        onClick={() => editColor(col)}
                      >
                        EDIT
                      </button>
                      <button
                        style={{ padding: 5 + "px", marginLeft: 5 + "px" }}
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
    </>
  );
};

export default ColorTable;
