import React from "react";
import LoginForm from "../forms/LoginForm";

const LoginPage = () => {
  const submit = (e) => {
    console.log(e);
  };

  return (
    <div style={{paddingBottom: 200+'px'}}>
      <LoginForm submit={submit} />
    </div>
  );
};

export default LoginPage;
