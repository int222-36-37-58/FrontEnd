import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

const UserListPage = () => {
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/setest`)
      .then((res) => setUser(res.data));
  };

  const delUser = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/use/delete/${id}`)
      .catch((err) => alert(err.response.data))
      .then(alert(`delete user id ${id} success!`))
      .then(() => getUser());
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: 10 + "px" }}>
      <div
        style={{
          backgroundColor: "white",
          padding: 40 + "px",
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
          All Users
        </div>
        <Table style={{ width: 95 + "%", margin: "auto" }}>
          <TableHead>
            <TableRow style={{ backgroundColor: "#3f51b5" }}>
              <TableCell style={{ color: "white" }} align="right">
                ID
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Username
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Role
              </TableCell>
              <TableCell style={{ color: "white" }} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsPerPage > 0 ? (
              user
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => {
                  return (
                    <TableRow key={user.userId}>
                      <TableCell align="right">{user.userId}</TableCell>
                      <TableCell align="right">{user.userName}</TableCell>
                      <TableCell align="right">{user.role}</TableCell>
                      {user.role.toLowerCase() !== "admin" && (
                        <TableCell align="right">
                          {" "}
                          <button className="AddButton">Edit</button>{" "}
                          <button
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
      </div>
    </Container>
  );
};

export default UserListPage;
