import axios from "axios";
import React from "react";
import LoginForm from "../forms/LoginForm";

const LoginPage = () => {
  const submit = (data) => {
    console.log(data)
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // localStorage.setItem("jwtToken", res.data.token)
        console.log(res.data);
      });
  };

  return <LoginForm submit={submit} />;
};

export default LoginPage;
