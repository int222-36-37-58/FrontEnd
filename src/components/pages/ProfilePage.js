import { Grid, Container, Hidden } from "@material-ui/core";
import RegisterForm from "../forms/RegisterForm";
import React, { useState } from "react";
import axios from "axios";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import ResponseDialog from "../ui/ResponseDialog";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
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

  const [isShowProfile, setIsShowProfile] = useState(true);
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
          <Grid item xs={12} md={2}>
            <div
              className="headerRegister"
              style={{
                marginRight: 30 + "px",
                fontSize: 13 + "px",
                height: 92 + "%",
                maxHeight: "630px",
              }}
            >
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
                <h4
                  className="hoverChangeToNavBarColor"
                  onClick={() => {
                    setIsShowProfile(true);
                  }}
                >
                  profile
                </h4>
                <h4
                  className="hoverChangeToNavBarColor"
                  onClick={() => {
                    setIsShowProfile(false);
                  }}
                >
                  change password
                </h4>
                <h4 className="hoverChangeToNavBarColor">log out</h4>
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
                          setIsShowMenu(!isShowMenu);
                        }}
                      >
                        <AddIcon />
                      </h2>
                    ) : (
                      <h2
                        className="hoverChangeToNavBarColor IconInMenu"
                        onClick={() => {
                          setIsShowMenu(!isShowMenu);
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
                    onClick={() => {
                      setIsShowProfile(true);
                    }}
                  >
                    profile
                  </h4>
                  <h4
                    className="hoverChangeToNavBarColor"
                    onClick={() => {
                      setIsShowProfile(false);
                    }}
                  >
                    change password
                  </h4>
                  <h4 className="hoverChangeToNavBarColor">log out</h4>
                </p>
              </Hidden>
            </div>
          </Grid>

          <Grid item xs={12} md={7}>
            {isShowProfile ? (
              <div>
                <RegisterForm
                  userData={userData}
                  editMode={true}
                  submit={update}
                ></RegisterForm>
              </div>
            ) : (
              <ChangePasswordForm />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProfilePage;
