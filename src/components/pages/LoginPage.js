import React from "react";
import { connect } from "react-redux";
import { getUser, login } from "../../actions/user";

import LoginForm from "../forms/LoginForm";

const LoginPage = (props, { getUser, login }) => {
  const submit = (data) => {
    const goLogin = new Promise(() => {
      props.login(data);
    });
    goLogin.then(props.getUser()).then(props.closeModal());
  };

  return <LoginForm submit={submit} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => login(data),
    getUser: () => dispatch(getUser()),
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
