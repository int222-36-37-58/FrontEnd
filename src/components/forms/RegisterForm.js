import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";

export default class RegisterForm extends Component {
  state = {
    data: {
      userName: "",
      fullName: "",
      address: "",
      tel: "",
      password: "",
      role: "ROLE_USER",
    },
    editMode: false,

    confirmPassword: "",
    errors: {},
  };

  componentDidMount() {
    this.setState({ data: this.props.userData });
    this.setState({ editMode: this.props.editMode });
  }

  onChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  onConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value,
    });
  };

  onSubmit = () => {
    const invalid = this.validate(this.state.data);
    if (invalid !== "err") {
      if (this.state.editMode) {
        this.props.submit(this.state.data);
      } else {
        this.props.submit(this.state.data);
      }
    }
  };

  validate = (e) => {
    const errors = {};
    if (!e.userName || e.userName.length <= 5 || !e.userName.match(/^[a-z]/)) {
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
    if (
      !this.state.confirmPassword ||
      this.state.confirmPassword !== e.password
    ) {
      errors.confirmPassword = true;
    }
    this.setState({ errors });
    if (Object.keys(errors).length > 0) {
      return "err";
    }
  };

  render() {
    const { editMode } = this.props;
    return (
      <div
        className={!editMode ? "center" : null}
        style={{
          maxWidth: 680 + "px",
          width: "100%",
          height: "auto",
          backgroundColor: "white",
          borderRadius: "0 0 10px 10px",
          marginBottom: 350 + "px",
        }}
      >
        <Grid container>
          <Grid item xs={12} style={{ padding: 40 + "px" }}>
            <form>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12} sm={6}>
                  {editMode ? (
                    <TextField
                      fullWidth
                      disabled
                      required
                      type="text"
                      inputProps={{ minLength: 3, maxLength: 20 }}
                      id="userName"
                      name="userName"
                      label="Username"
                      value={this.state.data.userName}
                      helperText="cant change userName"
                    />
                  ) : (
                    <TextField
                      fullWidth
                      required
                      error={this.state.errors.userName}
                      type="text"
                      inputProps={{ minLength: 3, maxLength: 20 }}
                      id="userName"
                      name="userName"
                      label="Username"
                      helperText="contain 3-20 character"
                      onChange={this.onChange}
                      value={this.state.data.userName}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    error={this.state.errors.fullName}
                    type="text"
                    inputProps={{ minLength: 2, maxLength: 30 }}
                    id="fullName"
                    name="fullName"
                    label="fullName"
                    helperText="Enter your name"
                    onChange={this.onChange}
                    value={this.state.data.fullName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    required
                    error={this.state.errors.address}
                    type="textarea"
                    inputProps={{ minLength: 5, maxLength: 90 }}
                    id="address"
                    name="address"
                    label="Address"
                    onChange={this.onChange}
                    value={this.state.data.address}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    type="text"
                    error={this.state.errors.tel}
                    inputProps={{ minLength: 10, maxLength: 10 }}
                    id="tel"
                    name="tel"
                    label="Telephone"
                    helperText="contain 10 number"
                    onChange={this.onChange}
                    value={this.state.data.tel}
                  />
                </Grid>

                {!editMode && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      error={this.state.errors.password}
                      type="password"
                      inputProps={{ minLength: 3, maxLength: 20 }}
                      id="password"
                      name="password"
                      label="Password"
                      helperText="contain A-Z a-z 0-9"
                      onChange={this.onChange}
                      value={this.state.data.password}
                    />
                  </Grid>
                )}
                {!editMode && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      error={this.state.errors.confirmPassword}
                      type="password"
                      inputProps={{ minLength: 3, maxLength: 20 }}
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      helperText="Confirm your password"
                      onChange={this.onConfirmPassword}
                      value={this.state.confirmPassword}
                    />
                  </Grid>
                )}

                {editMode && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      error={this.state.errors.confirmPassword}
                      type="text"
                      inputProps={{ minLength: 3, maxLength: 20 }}
                      id="password"
                      name="password"
                      label="Password"
                      helperText="confirm with your password"
                      onChange={this.onConfirmPassword}
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
                    onClick={this.onSubmit}
                  >
                    Submit
                  </Button>

                  {editMode && (
                    <Button
                      fullWidth
                      style={{
                        marginTop: 15 + "px",
                        alignItems: "center",
                        backgroundColor: "#d83c2d",
                        color: "white",
                      }}
                      onClick={() => {
                        this.props.onIsEdit();
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
  }
}

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

RegisterForm.defaultProps = {
  editMode: false,
  userData: {
    userName: "",
    password: "",
    fullName: "",
    address: "",
    tel: "",
    role: "ROLE_USER",
  },
};
