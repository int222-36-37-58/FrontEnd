import { Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";

const ChangePasswordForm = () => {
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
            Confirm password
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChangePasswordForm;
