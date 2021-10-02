import { Grid, Container, Hidden } from "@material-ui/core";

import React, { useState } from "react";
import axios from "axios";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import ResponseDialog from "../ui/ResponseDialog";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ProfileInfoPage from "./ProfileInfoPage";
import UserOrderPage from "./UserOrderPage";
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

  const [selectedMenu, setSelectedMenu] = useState(1);
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
    setShowDialog(false);
    setDialogContent("");
  };

  const handleLogout = () => {
    alert("did not handle log out function ");
  };

  const switchRender = () => {
    switch (selectedMenu) {
      case 1:
        return (
          <div
            className={{
              padding: "20px",
              fontSize: 13 + "px",
              marginRight: "50px",
              marginTop: "20px",
              backgroundColor: "white",
              boxShadow: "0px 0px 30px rgb(0 0 0 / 8%)",
              borderRadius: "20px",
            }}
          >
            <ProfileInfoPage userData={userData} submit={update} />
          </div>
        );
      case 2:
        return <ChangePasswordForm />;
      case 3:
        return <UserOrderPage />;
      default:
        return (
          <div
            className={{
              padding: "20px",
              fontSize: 13 + "px",
              marginRight: "50px",
              marginTop: "20px",
              backgroundColor: "white",
              boxShadow: "0px 0px 30px rgb(0 0 0 / 8%)",
              borderRadius: "20px",
            }}
          >
            <ProfileInfoPage userData={userData} submit={update} />
          </div>
        );
    }
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
                <div
                  className="hoverChangeBackground"
                  onClick={() => setSelectedMenu(1)}
                >
                  ข้อมูลของฉัน
                </div>
                <div
                  className="hoverChangeBackground"
                  onClick={() => setSelectedMenu(2)}
                >
                  เปลี่ยนรหัสผ่าน
                </div>
                <div
                  className="hoverChangeBackground"
                  onClick={() => setSelectedMenu(3)}
                >
                  คำสั่งซื้อ
                </div>
                <div
                  className="hoverChangeBackground"
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
                  <h4
                    className="hoverChangeToNavBarColor"
                    onClick={() => setSelectedMenu(1)}
                  >
                    ข้อมูลของฉัน
                  </h4>
                  <h4
                    className="hoverChangeToNavBarColor"
                    onClick={() => setSelectedMenu(2)}
                  >
                    เปลี่ยนรหัสผ่าน
                  </h4>
                  <h4
                    className="hoverChangeToNavBarColor"
                    onClick={() => setSelectedMenu(3)}
                  >
                    คำสั่งซื้อ
                  </h4>

                  <h4
                    className="hoverChangeToNavBarColor"
                    onClick={() => handleLogout()}
                  >
                    log out
                  </h4>
                </p>
              </Hidden>
            </div>
          </Grid>

          <Grid item xs={12} md={8}>
            {switchRender()}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProfilePage;
