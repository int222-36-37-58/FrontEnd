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
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { addResDialog } from "../../actions/uiStyle";
import AdminEditUserForm from "../forms/AdminEditUserForm";
import HandlePermission from "../forms/HandlePermission";
import RegisterForm from "../forms/RegisterForm";

const UserListPage = ({ addResDialog }) => {
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isEdit, setIsEdit] = useState(false);
  const [isHandleRole, setIsHandleRole] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [userEdit, setUserEdit] = useState({});

  const getUser = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/users`)
      .then((res) => setUser(res.data))
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.message,
        };
        addResDialog(data);
      });
  }, [addResDialog]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const delUser = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/delete/${id}`)

      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: res.data,
        };
        addResDialog(data);
      })
      .then(() => getUser())
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.response.data.message,
        };
        addResDialog(data);
      });
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editUser = (user) => {
    setIsEdit(true);
    setUserEdit(user);
  };

  const openHandleRole = (user) => {
    setIsHandleRole(true);
    setUserEdit(user);
  };

  const updateUser = (data) => {
    const json = JSON.stringify(data);

    axios
      .put(`${process.env.REACT_APP_API_URL}/user/edituser`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: `Update User at userid : ${res.data.userId} success!!`,
        };
        addResDialog(data);
      })
      .then(() => {
        getUser();
      })
      .then(setIsEdit(false))
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.response.data.message,
        };
        addResDialog(data);
      });
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

      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: `Add new Admin success!!`,
        };
        addResDialog(data);
      })
      .then(() => {
        getUser();
      })
      .then(setIsAdd(false))
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.response.data.message,
        };
        addResDialog(data);
      });
  };


  return (
    <>
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
            ผู้ใช้งานทั้งหมดในระบบ
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
                    onDelete={() => delUser(user.userId)}
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
                    เพิ่ม admin
                  </button>
                </>
              ) : (
                [
                  isAdd || isHandleRole ? (
                    <button
                      className="delFromCart p-10"
                      style={{
                        marginLeft: "90%",
                      }}
                      onClick={() => {
                        setIsAdd(false);
                        setIsHandleRole(false);
                      }}
                    >
                      ยกเลิก
                    </button>
                  ) : (
                    <button
                      className="InfoButton p-10"
                      style={{
                        marginLeft: "85%",
                      }}
                      onClick={() => {
                        setIsAdd(!isAdd);
                      }}
                    >
                      เพิ่ม admin
                    </button>
                  ),
                ]
              )}
              {isHandleRole && (
                <HandlePermission user={userEdit} close={() => {setIsHandleRole(false)}} refreshUser={getUser}/>
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
                              <TableCell align="right">
                                {user.role.replace("ROLE_", "").toLowerCase()}
                              </TableCell>
                            </Hidden>
                            {user.role !== "ROLE_ADMIN" && (
                              <TableCell align="right">
                                {isEdit || isAdd || isHandleRole ? (
                                  <button
                                    className="disabledButton hoverCursor"
                                    onClick={() => {
                                      alert(
                                        "Please Click Submit or Cancel before edit other user"
                                      );
                                    }}
                                  >
                                    แก้ไข
                                  </button>
                                ) : (
                                  <button
                                    className="AddButton"
                                    onClick={() => editUser(user)}
                                  >
                                    แก้ไข
                                  </button>
                                )}

                                <button
                                  style={{
                                    padding: 5 + "px",
                                    marginLeft: 5 + "px",
                                  }}
                                  className="delFromCart"
                                  onClick={() => openHandleRole(user)}
                                >
                                  จัดการบัญชี
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
const mapDispatchToProps = (dispatch) => {
  return {
    addResDialog: (content) => dispatch(addResDialog(content)),
  };
};

export default connect(null, mapDispatchToProps)(UserListPage);
