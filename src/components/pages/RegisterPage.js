import React from "react";
import RegisterForm from "../forms/RegisterForm";
import axios from "axios";
import { addResDialog } from "../../actions/uiStyle";
import { connect } from "react-redux";
import { login, getUser } from "../../actions/user";

const RegisterPage = ({ addResDialog, login, getUser }) => {
  const submit = (data) => {
    const json = JSON.stringify(data);
    axios
      .post(`${process.env.REACT_APP_API_URL}/register`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        let credential = {
          username: data.userName,
          password: data.password,
        };
        login(credential);
      })
      .catch((err) => {
        const data = {
          status: err.status,
          dialogContent: err.response.data.message,
        };
        addResDialog(data);
      });
  };

  return (
    <>
      <RegisterForm submit={submit} />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addResDialog: (content) => dispatch(addResDialog(content)),
    login: (content) => dispatch(login(content)),
    getUser: () => dispatch(getUser()),
  };
};

export default connect(null, mapDispatchToProps)(RegisterPage);
