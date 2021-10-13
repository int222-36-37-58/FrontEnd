import React from "react";
import LoginForm from "../forms/LoginForm";

const LoginPage = () => {
  const submit = (e) => {
    console.log(e);
  };

  return <LoginForm submit={submit} />;
};

export default LoginPage;
