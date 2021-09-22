import React, { useState } from "react";
import RegisterForm from "../forms/RegisterForm";
import axios from "axios";
import { useHistory } from "react-router";
import ResponseDialog from "../ui/ResponseDialog";

const RegisterPage = () => {
  const history = useHistory();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState("");
  const [dialogContent, setDialogContent] = useState("");

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
        setDialogHeader("Error");
        setDialogContent(err.response.data.message);
        setShowDialog(true);
      });
  };

  const handleCloseBox = () => {
    setShowDialog(false);

    setDialogContent("");
  };

  return (
    <>
      <ResponseDialog
        showDialog={showDialog}
        handleCloseBox={handleCloseBox}
        dialogContent={dialogContent}
        dialogHeader={dialogHeader}
      />
      <RegisterForm submit={submit} />
    </>
  );
};
export default RegisterPage;
