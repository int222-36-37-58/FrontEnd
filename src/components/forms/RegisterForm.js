import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";

const RegisterForm = (props) => {
  const [data, setData] = useState({
    userName: "",
    fullName: "",
    address: "",
    tel: "",
    password: "",
    role: "ROLE_USER",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.userData) {
      setData(props.userData);
    }
  }, [props]);

  const onChange = (e) =>
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  const onConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = () => {
    const invalid = validate(data);
    if (invalid !== "err") {
      if (props.editMode) {
        props.submit(data);
      } else {
        props.submit(data);
      }
    }
  };

  const validate = (e) => {
    const errors = {};
    if (
      !e.userName ||
      e.userName.length <= 5 ||
      !e.userName.match(/^[a-z0-9]/)
    ) {
      errors.userName = true;
    }
    if (
      !e.password ||
      e.password.length <= 4 ||
      (!e.password.match(/^[A-Z]/) &&
        !e.password.match(/^[a-z]/) &&
        !e.password.match(/^[0-9]/))
    ) {
      errors.password = true;
    }
    if (!e.fullName || e.fullName.length <= 3) {
      errors.fullName = true;
    }
    if (!e.address || e.address.length < 10) {
      errors.address = true;
    }

    if (!e.tel || e.tel.length !== 10 || /\D/.test(e.tel)) {
      errors.tel = true;
    }
    if (!confirmPassword || confirmPassword !== e.password) {
      errors.confirmPassword = true;
    }
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return "err";
    }
  };

  return (
    <div
      className={!props.editMode ? "center" : null}
      style={{
        maxWidth: 680 + "px",
        width: "100%",
        height: "auto",
        backgroundColor: "white",
        borderRadius: "0 0 10px 10px",
        marginBottom: 350 + "px",
      }}
    >
      {props.editMode && (
        <div className="headerRegister">
          <h3>แก้ไขข้อมูลส่วนตัว</h3>
        </div>
      )}

      <Grid container>
        <Grid item xs={12} style={{ padding: 40 + "px" }}>
          <p className="redb">{props.regisErr}</p>
          <form>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12} sm={6}>
                {props.editMode ? (
                  <TextField
                    fullWidth
                    disabled
                    required
                    type="text"
                    inputProps={{ minLength: 3, maxLength: 20 }}
                    id="userName"
                    name="userName"
                    label="Username"
                    value={data.userName}
                    helperText="cant change userName"
                  />
                ) : (
                  <TextField
                    fullWidth
                    required
                    error={errors.userName}
                    type="text"
                    inputProps={{ minLength: 3, maxLength: 20 }}
                    id="userName"
                    name="userName"
                    label="Username"
                    helperText="contain 3-20 character"
                    onChange={onChange}
                    value={data.userName}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  error={errors.fullName}
                  type="text"
                  inputProps={{ minLength: 2, maxLength: 30 }}
                  id="fullName"
                  name="fullName"
                  label="fullName"
                  helperText="Enter your name"
                  onChange={onChange}
                  value={data.fullName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  required
                  error={errors.address}
                  type="textarea"
                  inputProps={{ minLength: 5, maxLength: 90 }}
                  id="address"
                  name="address"
                  label="Address"
                  onChange={onChange}
                  value={data.address}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  type="text"
                  error={errors.tel}
                  inputProps={{ minLength: 10, maxLength: 10 }}
                  id="tel"
                  name="tel"
                  label="Telephone"
                  helperText="contain 10 number"
                  onChange={onChange}
                  value={data.tel}
                />
              </Grid>

              {!props.editMode && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    error={errors.password}
                    type="password"
                    inputProps={{ minLength: 3, maxLength: 20 }}
                    id="password"
                    name="password"
                    label="Password"
                    helperText="contain A-Z a-z 0-9"
                    onChange={onChange}
                    value={data.password}
                  />
                </Grid>
              )}
              {!props.editMode && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    error={errors.confirmPassword}
                    type="password"
                    inputProps={{ minLength: 3, maxLength: 20 }}
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    helperText="Confirm your password"
                    onChange={onConfirmPassword}
                    value={confirmPassword}
                  />
                </Grid>
              )}

              {props.editMode && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    error={errors.confirmPassword}
                    type="text"
                    inputProps={{ minLength: 3, maxLength: 20 }}
                    id="password"
                    name="password"
                    label="Password"
                    helperText="confirm with your password"
                    onChange={onConfirmPassword}
                  />
                </Grid>
              )}

              <Grid item xs={12} align="center">
                <Button
                  fullWidth
                  style={{
                    marginTop: 15 + "px",
                    alignItems: "center",
                    backgroundColor: "#1895f5",
                    color: "white",
                  }}
                  onClick={onSubmit}
                >
                  Submit
                </Button>

                {props.editMode && (
                  <Button
                    fullWidth
                    style={{
                      marginTop: 15 + "px",
                      alignItems: "center",
                      backgroundColor: "#d83c2d",
                      color: "white",
                    }}
                    onClick={() => {
                      props.onIsEdit();
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

RegisterForm.propTypes = {
  submit: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    id: PropTypes.number,
    userName: PropTypes.string.isRequired,
    password: PropTypes.string,
    fullName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    tel: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default RegisterForm;
