import CreateProductForm from "../forms/CreateProductForm";

import React, { useState } from "react";
import axios from "axios";
import ResponseDialog from "../ui/ResponseDialog";
import { useHistory } from "react-router";

export default function CreateProductPage() {
  const history = useHistory();
  const submit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/products/add`, data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then(() => {
        if (showDialog === false) {
          history.push("/");
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
}
