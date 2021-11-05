import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ConfirmDialog from "../ui/ConfirmDialog";

function AdminEditUserForm(props) {
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});
  const [confirmBox, setConfirmBox] = useState({
    showConfirm: false,
    confirmContent: "",
  });

  const handleCloseConfirm = () => {
    setConfirmBox({ showConfirm: false, confirmContent: "" });
  };

  const openConfirmEdit = () => {
    setConfirmBox({
      showConfirm: true,
      confirmContent: `ยืนยันที่จะแก้ไขข้อมูลของ ${userData.userName} ไหม`,
    });
  };

  useEffect(() => {
    if (props) {
      setUserData(props.userData);
    }
  }, [props]);

  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const validate = (e) => {
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
      errors.name = true;
    }
    if (!e.address || e.address.length < 10) {
      errors.address = true;
    }

    if (!e.tel || e.tel.length !== 10 || /\D/.test(e.tel)) {
      errors.tel = true;
    }

    setErrors({ errors });
    if (Object.keys(errors).length > 0) {
      return "err";
    }
  };

  const submitEdit = () => {
    const invalid = validate(userData);
    if (invalid !== "err") {
      props.submit(userData);
    }
  };

  return (
    <div
      style={{
        borderStyle: "solid",
        borderRadius: "10px",
        padding: "30px",

        borderColor: "#e6e8eb",
        width: "80%",
        margin: "30px auto",
      }}
    >
      <ConfirmDialog
        confirmInfo={confirmBox}
        handleCloseBox={handleCloseConfirm}
        submit={submitEdit}
      />
      <h3>
        Edit user at username :{" "}
        <span style={{ color: "#d83c2d" }}>{userData.userName}</span>
      </h3>
      <Grid container>
        {" "}
        <Grid item xs={12} sm={6} className="p-10">
          <TextField
            disabled
            fullWidth
            value={userData.userName}
            name="userName"
            label="userName"
          />
        </Grid>
        <Grid item xs={12} sm={6} className="p-10">
          <TextField
            type="text"
            fullWidth
            value={userData.fullName}
            error={errors.fullName}
            onChange={onChange}
            name="fullName"
            label="fullName"
          />
        </Grid>
        <Grid item xs={12} className="p-10">
          <TextField
            type="text"
            fullWidth
            value={userData.address}
            error={errors.address}
            onChange={onChange}
            name="address"
            label="address"
          />
        </Grid>
        <Grid item xs={12} sm={6} className="p-10">
          <TextField
            type="password"
            fullWidth
            value={userData.password}
            error={errors.password}
            onChange={onChange}
            name="password"
            label="password"
          />
        </Grid>
        <Grid item xs={12} sm={6} className="p-10">
          <TextField
            type="text"
            fullWidth
            onChange={onChange}
            value={userData.tel}
            name="tel"
            label="tel"
          />
        </Grid>
        <Grid item xs={12} sm={6} className="p-10">
          <FormControl>
            <InputLabel id="roleUser">Role</InputLabel>
            <Select
              labelId="role"
              defaultValue="ROLE_USER"
              value={userData.role}
              onChange={onChange}
              name="role"
            >
              <MenuItem value="ROLE_USER">USER</MenuItem>
              <MenuItem value="ROLE_ADMIN">ADMIN</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          className="p-10 mw-100 w-100"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <button
            className="InfoButton m-5 "
            style={{ padding: "8px 30px 8px 30px" }}
            onClick={openConfirmEdit}
          >
            Submit
          </button>
          <button
            className="delFromCart m-5"
            style={{ padding: "8px 30px 8px 30px" }}
            onClick={props.onIsEdit}
          >
            Cancel
          </button>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminEditUserForm;
