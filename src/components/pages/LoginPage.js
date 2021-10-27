import React from "react";
import { connect } from "react-redux";
import { login } from "../../actions/user";
import LoginForm from "../forms/LoginForm";

const LoginPage = ({ login }) => {
  const submit = (data) => {
    login(data);
  };

  return <LoginForm submit={submit} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
  };
};

export default connect(mapDispatchToProps)(LoginPage);
