import CreateProductForm from "../forms/CreateProductForm";

import React, { useState } from "react";
import axios from "axios";
import ResponseDialog from "../ui/ResponseDialog";

const CreateProductPage = () => {
  const submit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/products/add`, data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then(() => {
        if (showDialog === false) {
          setDialogHeader("Success!!");
          setDialogContent("Add Success!");
          setShowDialog(true);
        }
      })
      .catch((err) => {
        setDialogHeader("Error");
        setDialogContent(err.message);
        setShowDialog(true);
      });
  };
  const [showDialog, setShowDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const handleCloseBox = () => {
    setShowDialog(false);
    setDialogHeader("");
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

      <CreateProductForm submit={submit} />
    </>
  );
};

export default CreateProductPage;
