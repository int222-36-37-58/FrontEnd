import CreateProductForm from "../forms/CreateProductForm";

import React from "react";

export default function CreateProductPage() {
  const submit = (e) => {
    console.log(e);
  };

  return <CreateProductForm submit={submit} />;
}
