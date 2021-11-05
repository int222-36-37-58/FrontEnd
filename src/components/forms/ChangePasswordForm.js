import { Grid, TextField } from "@material-ui/core";
import axios from "axios";

import React, { useState } from "react";
import { connect } from "react-redux";
import { addResDialog } from "../../actions/uiStyle";
import { getUser } from "../../actions/user";

const ChangePasswordForm = ({ addResDialog, getUser, userInfo }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const validate = () => {
    const errs = {};

    if (!currentPassword) {
      errs.currentPassword = true;
    }

    if (
      !newPassword ||
      newPassword.length <= 4 ||
      (!newPassword.match(/^[A-Z]/) &&
        !newPassword.match(/^[a-z]/) &&
        !newPassword.match(/^[0-9]/))
    ) {
      errs.newPassword = true;
    }

    if (!confirmNewPassword || newPassword !== confirmNewPassword) {
      errs.confirmNewPassword = true;
    }
    setErrors(errs);
    if (Object.keys(errors).length > 0) {
      return "err";
    }
  };

  const submit = () => {
    const invalid = validate();
    if (invalid !== "err") {
      let putData = userInfo;
      putData.password = newPassword;

      axios
        .put(`${process.env.REACT_APP_API_URL}/user/edituser`, putData)
        .then((res) => {
          const data = {
            status: res.status,
            dialogContent: "Update Success",
          };
          addResDialog(data);
          getUser();
        })
        .catch((err) => {
          const data = {
            status: "Error",
            dialogContent: err.response.data.message,
          };
          addResDialog(data);
        });
    }
  };

  return (
    <div
      className="w100"
      style={{
        backgroundColor: "white",
        marginTop: "20px",
        maxWidth: 680 + "px",

        borderRadius: 20 + "px",
        boxShadow: "0px 0px 20px rgb(0 0 0 / 8%)",
      }}
    >
      <div className="headerRegister">
        <h3 style={{ marginBottom: 15 + "px" }}>เปลี่ยนรหัสผ่าน</h3>
      </div>

      <Grid
        container
        style={{ padding: 20 + "px", paddingBottom: 50 + "px" }}
        spacing={2}
      >
        <Grid item xs={12} style={{ paddingTop: 30 + "px" }}>
          <TextField
            size="small"
            fullWidth
            required
            type="password"
            error={errors.currentPassword}
            inputProps={{ minLength: 3, maxLength: 20 }}
            id="currentPassword"
            name="currentPassword"
            label="currentPassword"
            helperText="your current password"
            onChange={handleCurrentPassword}
          />
        </Grid>

        <Grid item xs={12} sm={6} className="pt-20">
          <TextField
            size="small"
            required
            fullWidth
            type="password"
            error={errors.newPassword}
            inputProps={{ minLength: 3, maxLength: 20 }}
            id="newPassword"
            name="newPassword"
            label="new Password"
            helperText="your new password"
            onChange={handleNewPassword}
          />
        </Grid>

        <Grid item xs={12} sm={6} className="pt-20">
          <TextField
            size="small"
            required
            fullWidth
            type="password"
            error={errors.confirmNewPassword}
            inputProps={{ minLength: 3, maxLength: 20 }}
            id="confirmNewPassword"
            name="confirmNewPassword"
            label="confirmNewPassword"
            helperText="Confirm new password"
            onChange={handleConfirmNewPassword}
          />
        </Grid>

        <Grid item xs={12} className="pt-20" style={{ textAlign: "center" }}>
          <button
            className="AddButton"
            onClick={submit}
            style={{
              marginTop: 60 + "px",
              paddingRight: 35 + "px",
              paddingLeft: 35 + "px",
            }}
          >
            Confirm Change Password
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addResDialog: (content) => dispatch(addResDialog(content)),
    getUser: () => dispatch(getUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);
