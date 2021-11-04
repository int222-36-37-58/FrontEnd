import { Grid, Container, Hidden } from "@material-ui/core";

import React, { useState } from "react";
import axios from "axios";
import ChangePasswordForm from "../forms/ChangePasswordForm";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ProfileInfoPage from "./ProfileInfoPage";
import UserOrderPage from "./UserOrderPage";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import CreateProductPage from "./CreateProductPage";
import MyStorePage from "./MyStorePage";
import { addResDialog, changeCurrentMenu } from "../../actions/uiStyle";
import { connect } from "react-redux";
import EditProductPage from "./EditProductPage";
import UserListPage from "./UserListPage";
import ListBaseDataPage from "./ListBaseDataPage";
import { logout, userLogout } from "../../actions/user";

const ProfilePage = ({
  userInfo,
  changeCurrentMenu,
  uiStyle,
  addResDialog,
  logout,
  userLogout,
}) => {
  const [userData] = useState(userInfo);

  const [isShowMenu, setIsShowMenu] = useState(false);

  const update = (data) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/edituser`, data)
      .then(() => {
        const data = {
          status: "Success!!",
          dialogContent: "Update Success",
        };
        addResDialog(data);
      })
      .catch((err) => {
        const data = {
          status: "Error",
          dialogContent: err.response.data.message,
        };
        addResDialog(data);
      });
  };

  const handleLogOut = () => {
    logout();
    userLogout();
  };

  return (
    <>
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
                  onClick={() => changeCurrentMenu("info")}
                  className={
                    uiStyle.currentMenuClicked === "info"
                      ? "clickChangeBackground p-10 "
                      : "hoverChangeBackground p-10"
                  }
                >
                  <div>ข้อมูลของฉัน</div>
                </Link>
                <Link
                  to="/profile/changepassword"
                  onClick={() => changeCurrentMenu("changepassword")}
                  className={
                    uiStyle.currentMenuClicked === "changepassword"
                      ? "clickChangeBackground p-10 "
                      : "hoverChangeBackground p-10"
                  }
                >
                  <div>เปลี่ยนรหัสผ่าน</div>
                </Link>
                <Link
                  to="/profile/order"
                  onClick={() => changeCurrentMenu("order")}
                  className={
                    uiStyle.currentMenuClicked === "order"
                      ? "clickChangeBackground p-10 "
                      : "hoverChangeBackground p-10"
                  }
                >
                  <div>คำสั่งซื้อ</div>
                </Link>
                <Link
                  to="/profile/createproduct"
                  onClick={() => changeCurrentMenu("createproduct")}
                  className={
                    uiStyle.currentMenuClicked === "createproduct"
                      ? "clickChangeBackground p-10 "
                      : "hoverChangeBackground p-10"
                  }
                >
                  <div>เริ่มขายสินค้า</div>
                </Link>

                <Link
                  to="/profile/myshop"
                  onClick={() => changeCurrentMenu("myshop")}
                  className={
                    uiStyle.currentMenuClicked === "myshop"
                      ? "clickChangeBackground p-10 "
                      : "hoverChangeBackground p-10"
                  }
                >
                  <div>ร้านค้าของฉัน</div>
                </Link>

                <Link
                  to="/profile/admin/basedata"
                  onClick={() => changeCurrentMenu("basedata")}
                  className={
                    uiStyle.currentMenuClicked === "basedata"
                      ? "clickChangeBackground p-10 "
                      : "hoverChangeBackground p-10"
                  }
                >
                  <div>จัดการข้อมูลพื้นฐาน</div>
                </Link>

                <Link
                  to="/profile/admin/users"
                  onClick={() => changeCurrentMenu("users")}
                  className={
                    uiStyle.currentMenuClicked === "users"
                      ? "clickChangeBackground p-10 "
                      : "hoverChangeBackground p-10"
                  }
                >
                  <div>จัดการข้อมูลผู้ใช้</div>
                </Link>

                <div
                  className="hoverChangeBackground p-10"
                  onClick={() => handleLogOut()}
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
                    <div
                      className="f16 b"
                      style={{ marginLeft: "20px" }}
                      onClick={() => {
                        setIsShowMenu(!isShowMenu);
                      }}
                    >
                      {" "}
                      Menu
                    </div>
                    <div>
                      {!isShowMenu ? (
                        <div className="hoverChangeToNavBarColor IconInMenu pr-0">
                          <AddIcon />
                        </div>
                      ) : (
                        <div className="hoverChangeToNavBarColor IconInMenu pr-0">
                          <RemoveIcon />
                        </div>
                      )}
                    </div>
                  </div>
                </label>
                <input type="checkbox" id="showProfileMenu" hidden />

                <p className="menuShow">
                  <Link to="/profile/info" className="hoverChangeBackground">
                    ข้อมูลของฉัน
                  </Link>
                  <Link
                    to="/profile/changepassword"
                    className="hoverChangeBackground"
                  >
                    เปลี่ยนรหัสผ่าน
                  </Link>
                  <Link to="/profile/order" className="hoverChangeBackground">
                    คำสั่งซื้อ
                  </Link>
                  <Link
                    to="/profile/createproduct"
                    className="hoverChangeBackground"
                  >
                    เริ่มขายสินค้า
                  </Link>
                  <Link
                    to="/profile/createproduct"
                    className="hoverChangeBackground"
                  >
                    ร้านค้าของฉัน
                  </Link>
                  <b onClick={() => handleLogOut()}>ออกจากระบบ</b>
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
                <CreateProductPage />
              </Route>
              <Route path={"/profile/myshop"}>
                {" "}
                <MyStorePage />
              </Route>
              <Route path={"/profile/editproduct"}>
                {" "}
                <EditProductPage />
              </Route>
              <Route path={"/profile/admin/"}>
                <Route path={"/profile/admin/basedata"}>
                  <ListBaseDataPage />
                </Route>
                <Route path={"/profile/admin/users"}>
                  <UserListPage />
                </Route>
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    uiStyle: state.uiStyle,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentMenu: (change) => dispatch(changeCurrentMenu(change)),
    addResDialog: (content) => dispatch(addResDialog(content)),
    logout: () => logout(),
    userLogout: () => dispatch(userLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
