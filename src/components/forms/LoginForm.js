import Container from "@material-ui/core/Container";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

const LoginForm = (props) => {
  const [data, setData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = () => {
    const invalid = validate(data);
    if (invalid !== "err") {
      props.submit(data);
    }
  };

  const validate = (e) => {
    const errors = [];
    if (!e.username) {
      errors.username = true;
    }
    if (!e.password) {
      errors.password = true;
    }
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return "err";
    }
  };

  return (
    <div style={{ maxHeight: 400 + "px" }}>
      <Container
        style={{
          width: "100%",
          maxWidth: "680px",
          backgroundColor: "white",
          borderRadius: "0 0 10px 10px",
        }}
      >
        <form>
          <Grid
            container
            style={{ padding: 25 + "px" }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <div className="b" style={{ color: "#d83c2d" }}>
              {props.loginErr}
            </div>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={errors.username}
                type="text"
                inputProps={{ minLength: 3, maxLength: 20 }}
                id="username"
                name="username"
                label="Username"
                onChange={onChange}
                helperText="3 - 20 Character "
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={errors.password}
                type="password"
                inputProps={{ minLength: 3, maxLength: 20 }}
                id="password"
                name="password"
                label="Password"
                onChange={onChange}
                helperText="contain A-Z a-z 0-9"
              />
            </Grid>

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
                Log in
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default LoginForm;
