import React from "react";
import RegisterForm from "../forms/RegisterForm";
import axios from "axios";
import { useHistory } from "react-router";
import { addResDialog } from "../../actions/uiStyle";
import { connect } from "react-redux";

const RegisterPage = ({ addResDialog }) => {
  const history = useHistory();

  const submit = (data) => {
    const json = JSON.stringify(data);
    axios
      .post(`${process.env.REACT_APP_API_URL}/register`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(history.push("/login"))
      .catch((err) => {
        const data = {
          status: err.response.status,
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
  };
};

export default connect(null, mapDispatchToProps)(RegisterPage);
