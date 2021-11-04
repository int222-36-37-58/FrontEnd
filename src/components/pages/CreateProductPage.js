import CreateProductForm from "../forms/CreateProductForm";
import { addResDialog } from "../../actions/uiStyle";
import React from "react";
import axios from "axios";
import { connect } from "react-redux";

const CreateProductPage = ({ addResDialog, userInfo }) => {
  const submit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/products/add`, data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: "Add Success!",
        };
        addResDialog(data);
      })
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.message,
        };
        addResDialog(data);
      });
  };

  return (
    <>
      <CreateProductForm submit={submit} user={userInfo} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addResDialog: (content) => dispatch(addResDialog(content)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductPage);
