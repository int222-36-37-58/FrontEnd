import { Grid, Container } from "@material-ui/core";
import RegisterForm from "../forms/RegisterForm";
import React, { useState } from "react";
import axios from "axios";

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

  const update = (data) => {
    axios.put(`${process.env.REACT_APP_API_URL}/edituser`, data);
  };

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item={4}></Grid>

        <Grid item={6}>
          <RegisterForm
            userData={userData}
            editMode={true}
            submit={update}
          ></RegisterForm>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
