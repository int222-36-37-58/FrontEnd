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
import ConfirmDialog from "../ui/ConfirmDialog";

const UserListPage = ({ addResDialog }) => {
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isEdit, setIsEdit] = useState(false);
  const [isHandleRole, setIsHandleRole] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  const [confirmBox, setConfirmBox] = useState({
    showConfirm: false,
    confirmContent: "",
  });

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
      .put(`${process.env.REACT_APP_API_URL}/admin/edituser`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: `แก้ไขข้อมูลผู้ใช้ของ ${res.data.userName} สำเร็จ!!`,
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

  const addUser = () => {
    const json = JSON.stringify(userEdit);
    axios
      .post(`${process.env.REACT_APP_API_URL}/register`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: `เพิ่มบัญชีใหม่สำเร็จ!!`,
        };
        addResDialog(data);
      })
      .then(() => {
        getUser();
        setUserEdit({});
        setIsAdd(false);
      })
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.response.data.message,
        };
        addResDialog(data);
      })
      .then(handleCloseConfirm());
  };

  const handleCloseConfirm = () => {
    setConfirmBox({ showConfirm: false, confirmContent: "" });
  };

  const openConfirmAdd = (data) => {
    setUserEdit(data);
    setConfirmBox({
      showConfirm: true,
      confirmContent: `ยืนยันที่เพิ่ม ${data.userName} เป็น ${data.role.replace(
        "ROLE_",
        ""
      )} ไหม`,
    });
  };

  return (
    <>
      <ConfirmDialog
        confirmInfo={confirmBox}
        handleCloseBox={handleCloseConfirm}
        submit={addUser}
      />

      <Container maxWidth="lg" style={{ marginTop: 10 + "px" }}>
        <div
          className="p-20"
          style={{
            backgroundColor: "white",
            borderRadius: 10 + "px",
            boxShadow: "0px 0px 20px #e6e8eb",
          }}
        >
          <div
            className="f24 b text-center pt-20"
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
                      className="delFromCart p-5-10"
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
                      className="InfoButton p-5-10"
                      style={{
                        marginLeft: "85%",
                      }}
                      onClick={() => {
                        setIsAdd(!isAdd);
                      }}
                    >
                      เพิ่มผู้ใช้งาน
                    </button>
                  ),
                ]
              )}
              {isHandleRole && (
                <HandlePermission
                  user={userEdit}
                  close={() => {
                    setIsHandleRole(false);
                  }}
                  refreshUser={getUser}
                />
              )}
              {isAdd && (
                <RegisterForm submit={openConfirmAdd} adminMode={true} />
              )}

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
                  {user
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => {
                      return (
                        <TableRow key={`userNameIs${user.userName}`}>
                          <TableCell align="right">{user.userId}</TableCell>
                          <TableCell align="right">{user.userName}</TableCell>
                          <Hidden smDown>
                            <TableCell align="right">
                              {user.role.replace("ROLE_", "").toLowerCase()}
                            </TableCell>
                          </Hidden>
                          {user.role !== "ROLE_ADMIN" ? (
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
                                  className="AddButton p-5-10"
                                  onClick={() => editUser(user)}
                                >
                                  แก้ไข
                                </button>
                              )}

                              <button
                                className="delFromCart p-5-10 ml-5"
                                onClick={() => openHandleRole(user)}
                              >
                                จัดการบัญชี
                              </button>
                            </TableCell>
                          ) : (
                            <TableCell />
                          )}
                        </TableRow>
                      );
                    })}
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
