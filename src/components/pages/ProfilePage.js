import { Grid, Container, Hidden } from "@material-ui/core";
import RegisterForm from "../forms/RegisterForm";
import React, { useState } from "react";
import axios from "axios";
import ChangePasswordForm from "../forms/ChangePasswordForm";

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

  const update = (data) => {
    axios.put(`${process.env.REACT_APP_API_URL}/edituser`, data);
  };

  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="center" style={{ marginTop: 3 + "rem" }}>
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
              <div
                style={{
                  borderStyle: "solid",
                  borderWidth: " 0 0 1px 0 ",

                  paddingBottom: "60px",
                }}
              >
                <h2 style={{ float: "left" }}> Menu</h2>
                <h2
                  style={{
                    float: "right",
                    marginRight: 25 + "px",
                    fontSize: 21 + "px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                  className="hoverChangeToNavBarColor"
                  onClick={() => {
                    setIsShowMenu(!isShowMenu);
                  }}
                >
                  +
                </h2>{" "}
              </div>
              {isShowMenu && (
                <>
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
                </>
              )}
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
  );
};

export default ProfilePage;
