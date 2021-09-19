import { Button, Grid, TextField, Typography } from "@material-ui/core";
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
      style={{
        backgroundColor: "white",
        marginTop: "20px",
        maxWidth: 680 + "px",
        width: 100 + "%",
      }}
    >
      <div className="headerRegister">
        <Typography variant="h5" style={{ marginBottom: 15 + "px" }}>
          Change Your Password
        </Typography>
      </div>

      <Grid
        container
        style={{ padding: 20 + "px", paddingBottom: 50 + "px" }}
        spacing={2}
      >
        <Grid
          item
          xs={12}
          style={{ paddingTop: 30 + "px" }}
        >
          <TextField
            variant="outlined"
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

        <Grid item xs={12} sm={6} style={{ paddingTop: 20 + "px" }}>
          <TextField
            variant="outlined"
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

        <Grid item xs={12} sm={6} style={{ paddingTop: 20 + "px" }}>
          <TextField
            variant="outlined"
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

        <Grid item xs={12} style={{ paddingTop: 20 + "px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={submit}
            style={{
              marginTop: 60 + "px",
              paddingRight: 35 + "px",
              paddingLeft: 35 + "px",
            }}
          >
            Confirm password
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChangePasswordForm;
