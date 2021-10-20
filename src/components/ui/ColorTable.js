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
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { addResDialog } from "../../actions/uiStyle";
import ConfirmDialog from "./ConfirmDialog";

const ColorTable = ({ addResDialog }) => {
  const [color, setColor] = useState([]);
  const [addColor, setAddColor] = useState(false);
  const [colorToAdd, setColorToAdd] = useState("");
  const [colorPage, setColorPage] = useState(0);
  const [rowsPerColorPage, setRowsPerColorPage] = useState(5);
  const [isEdit, setIsEdit] = useState(false);
  const [colorEdit, setColorEdit] = useState({});
  const [colorWillDelete, setColorWillDelete] = useState({});
  const [confirmBox, setConfirmBox] = useState({
    showConfirm: false,
    confirmContent: "",
  });

  const getColor = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/colors`)
      .then((res) => setColor(res.data))
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.message,
        };
        addResDialog(data);
      });
  }, [addResDialog]);

  useEffect(() => {
    getColor();
  }, [getColor]);

  const editColor = (color) => {
    setIsEdit(true);
    setColorEdit(color);
  };

  const delColor = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/colordelete/${colorWillDelete.colorId}`
      )

      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: res.data,
        };
        addResDialog(data);
      })
      .then(() => getColor())
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.response.data.message,
        };
        addResDialog(data);
      })
      .then(handleCloseConfirm)
      .then(setColorWillDelete({}));
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
        const data = {
          status: res.status,
          dialogContent: `Add color ${res.data.colorName} success!!`,
        };
        addResDialog(data);
      })
      .then(() => getColor())
      .then(setColorToAdd(""))
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.response.data.message,
        };
        addResDialog(data);
      });
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

      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: `Update color success!!`,
        };
        addResDialog(data);
      })
      .then(() => getColor())
      .then(setIsEdit(false))
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.response.data.message,
        };
        addResDialog(data);
      });
  };

  const handleChangeColorPage = (e, newPage) => {
    setColorPage(newPage);
  };

  const handleChangeRowsPerColorPage = (event) => {
    setRowsPerColorPage(parseInt(event.target.value, 10));
    setColorPage(0);
  };

  const handleCloseConfirm = () => {
    setConfirmBox({ showConfirm: false, confirmContent: "" });
  };

  const deletingColor = (col) => {
    setColorWillDelete(col);
    setConfirmBox({
      showConfirm: true,
      confirmContent: `ยืนยันที่จะลบสี ${col.colorName} ไหม`,
    });
  };

  return (
    <>
      <ConfirmDialog
        confirmInfo={confirmBox}
        handleCloseBox={handleCloseConfirm}
        submit={delColor}
      />

      <div
        className="f20 b"
        style={{
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
        <TableHead style={{ backgroundColor: "#1895f5" }}>
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
                        onClick={() => deletingColor(col)}
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

const mapDispatchToProps = (dispatch) => {
  return {
    addResDialog: (content) => dispatch(addResDialog(content)),
  };
};

export default connect(null, mapDispatchToProps)(ColorTable);
