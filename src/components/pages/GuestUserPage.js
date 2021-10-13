import { Container, Grid, Modal } from "@material-ui/core";
import React, { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import CloseIcon from "@material-ui/icons/Close";
const GuestUserPage = (props) => {
  const [formShow, setFormShow] = useState("login");

  return (
    <Modal
      open={props.open}
      onClose={props.close}
      style={{ overflow: "scroll" }}
    >
      <Container className="guestModal">
        <Grid container justifyContent="center" justifyItems="center">
          <Grid item xs={12}>
            {" "}
            <div className="guestContainer">
              {" "}
              <div style={{ textAlign: "right" }}>
                <CloseIcon className="guestCloseButton" onClick={props.close} />
              </div>
              <div className="guestModalHeader">
                <div
                  onClick={() => setFormShow("login")}
                  className={
                    formShow === "login"
                      ? "guestModalClick"
                      : "guestModalNotClick"
                  }
                  style={{
                    marginRight: "0",
                  }}
                >
                  เข้าสู่ระบบ
                </div>
                <div
                  onClick={() => setFormShow("register")}
                  className={
                    formShow === "register"
                      ? "guestModalClick"
                      : "guestModalNotClick"
                  }
                  style={{
                    marginLeft: "0",
                  }}
                >
                  สมัครสมาชิก
                </div>
              </div>{" "}
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              {formShow === "login" && <LoginPage />}
              {formShow === "register" && <RegisterPage />}
            </div>
          </Grid>
        </Grid>
      </Container>
    </Modal>
  );
};

export default GuestUserPage;
