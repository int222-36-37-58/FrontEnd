import React from "react";
import { connect } from "react-redux";
import { login } from "../../actions/user";

import LoginForm from "../forms/LoginForm";

const LoginPage = (props, { login }) => {
  props.login(data);
  // const submit = (data) => {
  //   let gg = new Promise(() => {
  //     props.login(data);
  //   });
  //   async function ggReturn() {
  //     return gg;
  //   }

  //   console.log(ggReturn());
    // if (props.login(data) === "success") {
    //   props.login(data);
    //   props.closeModal();
    // } else {
    //   setErrors("login failed");
    // }
  };

  return <LoginForm submit={submit} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
