import { Grid, Container, Hidden } from "@material-ui/core";

import React, { useState } from "react";
import axios from "axios";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import ResponseDialog from "../ui/ResponseDialog";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ProfileInfoPage from "./ProfileInfoPage";
import UserOrderPage from "./UserOrderPage";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
const ProfilePage = () => {
  const [userData] = useState({
    id: "1",
    userName: "userTest",
    password: "Aa123456",
    fullName: "nametest",
    address: "Home Bangkok Thailand",
    tel: "0123456789",
    role: "ROLE_USER",
  });

  const [isShowMenu, setIsShowMenu] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const update = (data) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/edituser`, data)
      .then(() => {
        setDialogHeader("Success!!");
        setDialogContent("Update Success");
      })
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

  const handleLogout = () => {
    alert("did not handle log out function ");
  };

  return (
    <>
      <ResponseDialog
        showDialog={showDialog}
        handleCloseBox={handleCloseBox}
        dialogContent={dialogContent}
        dialogHeader={dialogHeader}
      />

      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="center"
          style={{ marginTop: 3 + "rem" }}
        >
          <Grid item xs={12} md={4}>
            <div className="menuProfile">
              <Hidden smDown>
                <h2
                  style={{
                    borderStyle: "solid",
                    borderWidth: " 0 0 1px 0 ",
                    paddingBottom: "7px",
                  }}
                >
                  Menu
                </h2>
                <Link
                  to="/profile/info"
                  className="hoverChangeBackground"
                  style={{ padding: "10px" }}
                >
                  <div>ข้อมูลของฉัน</div>
                </Link>
                <Link
                  to="/profile/changepassword"
                  className="hoverChangeBackground"
                  style={{ padding: "10px" }}
                >
                  <div>เปลี่ยนรหัสผ่าน</div>
                </Link>
                <Link
                  to="/profile/order"
                  className="hoverChangeBackground"
                  style={{ padding: "10px" }}
                >
                  <div>คำสั่งซื้อ</div>
                </Link>
                <div
                  className="hoverChangeBackground"
                  style={{ padding: "10px" }}
                  onClick={() => handleLogout()}
                >
                  log out
                </div>
              </Hidden>

              <Hidden mdUp>
                <label htmlFor="showProfileMenu">
                  <div
                    style={{
                      borderStyle: "solid",
                      borderWidth: " 0 0 1px 0 ",
                      paddingBottom: "60px",
                    }}
                  >
                    <h2 style={{ float: "left", marginLeft: "20px" }}> Menu</h2>
                    {!isShowMenu ? (
                      <h2
                        className="hoverChangeToNavBarColor IconInMenu"
                        onClick={() => {
                          setIsShowMenu(true);
                        }}
                      >
                        <AddIcon />
                      </h2>
                    ) : (
                      <h2
                        className="hoverChangeToNavBarColor IconInMenu"
                        onClick={() => {
                          setIsShowMenu(false);
                        }}
                      >
                        <RemoveIcon />
                      </h2>
                    )}
                  </div>
                </label>
                <input type="checkbox" id="showProfileMenu" hidden />

                <p className="menuShow">
                  <Link to="/profile/info" className="hoverChangeBackground">
                    <h4>ข้อมูลของฉัน</h4>
                  </Link>
                  <Link
                    to="/profile/changepassword"
                    className="hoverChangeBackground"
                  >
                    <h4>เปลี่ยนรหัสผ่าน</h4>
                  </Link>
                  <Link to="/profile/order" className="hoverChangeBackground">
                    <h4>คำสั่งซื้อ</h4>
                  </Link>
                  <h4>log out</h4>
                </p>
              </Hidden>
            </div>
          </Grid>

          <Grid item xs={12} md={8}>
            {/* {switchRender()} */}
            <Switch>
              <Route path={"/profile/info"}>
                <ProfileInfoPage userData={userData} submit={update} />
              </Route>
              <Route path={"/profile/changepassword"}>
                {" "}
                <ChangePasswordForm />
              </Route>
              <Route path={"/profile/order"}>
                {" "}
                <UserOrderPage />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProfilePage;
