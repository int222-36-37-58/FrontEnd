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
import CreateProductPage from "./CreateProductPage";
import MyStorePage from "./MyStorePage";
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
                <Link to="/profile/info" className="hoverChangeBackground p-10">
                  <div>ข้อมูลของฉัน</div>
                </Link>
                <Link
                  to="/profile/changepassword"
                  className="hoverChangeBackground p-10"
                >
                  <div>เปลี่ยนรหัสผ่าน</div>
                </Link>
                <Link
                  to="/profile/order"
                  className="hoverChangeBackground p-10"
                >
                  <div>คำสั่งซื้อ</div>
                </Link>
                <Link to="/profile/createproduct" className="hoverChangeBackground p-10">
                    <div>เริ่มขายสินค้า</div>
                  </Link>
                  
                <Link to="/profile/myshop" className="hoverChangeBackground p-10">
                    <div>ร้านค้าของฉัน</div>
                  </Link>

                <div
                  className="hoverChangeBackground p-10"
                  onClick={() => handleLogout()}
                >
                  ออกจากระบบ
                </div>
              </Hidden>

              <Hidden mdUp>
                <label htmlFor="showProfileMenu">
                  <div
                    style={{
                      borderStyle: "solid",
                      borderWidth: " 0 0 1px 0 ",
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="f16 b" style={{ marginLeft: "20px" }}>
                      {" "}
                      Menu
                    </div>
                    <div>
                      {!isShowMenu ? (
                        <div
                          className="hoverChangeToNavBarColor IconInMenu pr-0"
                          onClick={() => {
                            setIsShowMenu(true);
                          }}
                        >
                          <AddIcon />
                        </div>
                      ) : (
                        <div
                          className="hoverChangeToNavBarColor IconInMenu pr-0"
                          onClick={() => {
                            setIsShowMenu(false);
                          }}
                        >
                          <RemoveIcon />
                        </div>
                      )}
                    </div>
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
                  <Link to="/profile/createproduct" className="hoverChangeBackground">
                    <h4>เริ่มขายสินค้า</h4>
                  </Link>
                  <Link to="/profile/createproduct" className="hoverChangeBackground">
                    <h4>ร้านค้าของฉัน</h4>
                  </Link>
                  <h4>ออกจากระบบ</h4>
                </p>
              </Hidden>
            </div>
          </Grid>

          <Grid item xs={12} md={8}>
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
              <Route path={"/profile/createproduct"}>
                {" "}
                <CreateProductPage/>
              </Route>
              <Route path={"/profile/myshop"}>
                {" "}
                <MyStorePage/>
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProfilePage;
