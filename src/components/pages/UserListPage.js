import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Grid,
  Hidden,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminEditUserForm from "../forms/AdminEditUserForm";
import RegisterForm from "../forms/RegisterForm";
import ResponseDialog from "../ui/ResponseDialog";

const UserListPage = () => {
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then((res) => setUser(res.data))
      .catch((err) => {
        setDialogHeader("Error");
        setDialogContent(err.message);
        setShowDialog(true);
      });
  };

  const delUser = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/use/delete/${id}`)

      .then((res) => {
        setDialogHeader("Success!!");
        setDialogContent(res.data);
      })
      .then(() => getUser())
      .catch((err) => {
        setDialogHeader("Error");
        setDialogContent(err.response.data.message);
      })
      .then(setShowDialog(true));
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editUser = (user) => {
    setUserEdit({});
    setIsEdit(true);
    setUserEdit(user);
  };

  const updateUser = (data) => {
    console.log(data);

    const json = JSON.stringify(data);

    axios
      .put(`${process.env.REACT_APP_API_URL}/edituser`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      .then(() => {
        setDialogHeader("Success!!");
        setDialogContent(`Update User at userid : ${data.userId} success!!`);
      })
      .then(() => {
        getUser();
      })
      .then(setIsEdit(false))
      .catch((err) => {
        setDialogHeader("Error");
        setDialogContent(err.response.data.message);
      })
      .then(setShowDialog(true));
  };

  const addUser = (data) => {
    data.role = "ROLE_ADMIN";
    const json = JSON.stringify(data);
    axios
      .post(`${process.env.REACT_APP_API_URL}/register`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      .then(() => {
        setDialogHeader("Success!!");
        setDialogContent(`Add new Admin success!!`);
      })
      .then(() => {
        getUser();
      })
      .then(setIsAdd(false))
      .catch((err) => {
        setDialogHeader("Error");
        setDialogContent(err.response.data.message);
      })
      .then(setShowDialog(true));
  };
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

      <Container maxWidth="lg" style={{ marginTop: 10 + "px" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: 20 + "px",
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
            All Users
          </div>
          <Grid container>
            <Grid item xs={11} style={{ margin: "auto" }}>
              {isEdit ? (
                <>
                  <AdminEditUserForm
                    userData={userEdit}
                    onIsEdit={() => {
                      setIsEdit(false);
                    }}
                    submit={updateUser}
                  />
                  <button
                    className="disabledButton"
                    style={{
                      marginLeft: "90%",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    New admin
                  </button>
                </>
              ) : (
                [
                  isAdd ? (
                    <button
                      className="delFromCart p-10"
                      style={{
                        marginLeft: "90%",
                      }}
                      onClick={() => {
                        setIsAdd(false);
                      }}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      className="InfoButton p-10"
                      style={{
                        marginLeft: "90%",
                      }}
                      onClick={() => {
                        setIsAdd(!isAdd);
                      }}
                    >
                      New admin
                    </button>
                  ),
                ]
              )}

              {isAdd && <RegisterForm submit={addUser} />}

              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#1895f5" }}>
                    <TableCell style={{ color: "white" }} align="right">
                      ID
                    </TableCell>
                    <TableCell style={{ color: "white" }} align="right">
                      Username
                    </TableCell>
                    <Hidden smDown>
                      <TableCell style={{ color: "white" }} align="right">
                        Role
                      </TableCell>
                    </Hidden>
                    <TableCell
                      style={{ color: "white" }}
                      align="right"
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsPerPage > 0 ? (
                    user
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((user) => {
                        return (
                          <TableRow key={user.userId}>
                            <TableCell align="right">{user.userId}</TableCell>
                            <TableCell align="right">{user.userName}</TableCell>
                            <Hidden smDown>
                              {" "}
                              <TableCell align="right">{user.role}</TableCell>
                            </Hidden>
                            {user.role !== "ROLE_ADMIN" && (
                              <TableCell align="right">
                                {isEdit || isAdd ? (
                                  <button
                                    className="disabledButton hoverCursor"
                                    onClick={() => {
                                      alert(
                                        "Please Click Submit or Cancel before edit other user"
                                      );
                                    }}
                                  >
                                    Edit
                                  </button>
                                ) : (
                                  <button
                                    className="AddButton"
                                    onClick={() => editUser(user)}
                                  >
                                    Edit
                                  </button>
                                )}

                                <button
                                  style={{
                                    padding: 5 + "px",
                                    marginLeft: 5 + "px",
                                  }}
                                  className="delFromCart"
                                  onClick={() => delUser(user.userId)}
                                >
                                  DELETE
                                </button>
                              </TableCell>
                            )}
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
                      colSpan={4}
                      rowsPerPageOptions={[5, 10]}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      onPageChange={handleChangePage}
                      count={user.length}
                      page={page}
                      rowsPerPage={rowsPerPage}
                    ></TablePagination>
                  </TableRow>
                </TableFooter>
              </Table>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default UserListPage;
