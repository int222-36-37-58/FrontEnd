import { Grid, Container, Hidden } from "@material-ui/core";
import React from "react";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import ProfileInfoPage from "./ProfileInfoPage";
import UserOrderPage from "./UserOrderPage";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import CreateProductPage from "./CreateProductPage";
import { addResDialog, changeCurrentMenu } from "../../actions/uiStyle";
import { connect } from "react-redux";
import EditProductPage from "./EditProductPage";
import UserListPage from "./UserListPage";
import ListBaseDataPage from "./ListBaseDataPage";
import { logout, userLogout, getUser } from "../../actions/user";
import MyShopPage from "./MyShopPage";
import StartSellPage from "./StartSellPage";
import MySellHistoryPage from "./MySellHistoryPage";

const ProfilePage = ({
  userInfo,
  changeCurrentMenu,
  uiStyle,
  logout,
  userLogout,
  addResDialog,
}) => {
  const handleLogOut = () => {
    logout();
    userLogout();
    let data = { status: 200, dialogContent: "คุณออกจากระบบแล้ว" };
    addResDialog(data);
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
            {" "}
            <Hidden smDown>
              <div className="menuProfile">
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
                {userInfo.role === "ROLE_USER" && (
                  <Link
                    to="/profile/startseller"
                    onClick={() => changeCurrentMenu("startseller")}
                    className={
                      uiStyle.currentMenuClicked === "startseller"
                        ? "clickChangeBackground p-10 "
                        : "hoverChangeBackground p-10"
                    }
                  >
                    <div>เริ่มขายสินค้า</div>
                  </Link>
                )}

                {userInfo.role === "ROLE_SELLER" && (
                  <>
                    <Link
                      to="/profile/createproduct"
                      onClick={() => changeCurrentMenu("createproduct")}
                      className={
                        uiStyle.currentMenuClicked === "createproduct"
                          ? "clickChangeBackground p-10 "
                          : "hoverChangeBackground p-10"
                      }
                    >
                      <div>ลงขายสินค้า</div>
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
                      to="/profile/mysellhistory"
                      onClick={() => changeCurrentMenu("mysellhistory")}
                      className={
                        uiStyle.currentMenuClicked === "mysellhistory"
                          ? "clickChangeBackground p-10 "
                          : "hoverChangeBackground p-10"
                      }
                    >
                      <div>ประวัติการขาย</div>
                    </Link>
                  </>
                )}
                {userInfo.role === "ROLE_ADMIN" && (
                  <>
                    <Link
                      to="/profile/createproduct"
                      onClick={() => changeCurrentMenu("createproduct")}
                      className={
                        uiStyle.currentMenuClicked === "createproduct"
                          ? "clickChangeBackground p-10 "
                          : "hoverChangeBackground p-10"
                      }
                    >
                      <div>ลงขายสินค้า</div>
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
                      to="/profile/mysellhistory"
                      onClick={() => changeCurrentMenu("mysellhistory")}
                      className={
                        uiStyle.currentMenuClicked === "mysellhistory"
                          ? "clickChangeBackground p-10 "
                          : "hoverChangeBackground p-10"
                      }
                    >
                      <div>ประวัติการขาย</div>
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
                  </>
                )}
                <div
                  className="hoverChangeBackground p-10"
                  onClick={() => handleLogOut()}
                >
                  ออกจากระบบ
                </div>
              </div>{" "}
            </Hidden>
          </Grid>

          <Grid item xs={12} md={8}>
            <Switch>
              <Route path={"/profile/info"}>
                <ProfileInfoPage />
              </Route>
              <Route path={"/profile/changepassword"}>
                {" "}
                <ChangePasswordForm />
              </Route>
              <Route path={"/profile/order"}>
                {" "}
                <UserOrderPage />
              </Route>

              {userInfo.role === "ROLE_USER" && (
                <Route path={"/profile/startseller"}>
                  {" "}
                  <StartSellPage />
                </Route>
              )}

              {userInfo.role === "ROLE_SELLER" && (
                <Switch>
                  <Route path={"/profile/createproduct"}>
                    {" "}
                    <CreateProductPage />
                  </Route>
                  <Route path={"/profile/myshop"}>
                    {" "}
                    <MyShopPage />
                  </Route>
                  <Route path={"/profile/mysellhistory"}>
                    {" "}
                    <MySellHistoryPage />
                  </Route>
                  <Route path={"/profile/editproduct"}>
                    {" "}
                    <EditProductPage />
                  </Route>
                </Switch>
              )}
              {userInfo.role === "ROLE_ADMIN" && (
                <Switch>
                  <Route path={"/profile/createproduct"}>
                    {" "}
                    <CreateProductPage />
                  </Route>
                  <Route path={"/profile/myshop"}>
                    {" "}
                    <MyShopPage />
                  </Route>
                  <Route path={"/profile/mysellhistory"}>
                    {" "}
                    <MySellHistoryPage />
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
                  </Route>{" "}
                </Switch>
              )}
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
    getUser: () => dispatch(getUser()),
    logout: () => logout(),
    userLogout: () => dispatch(userLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
