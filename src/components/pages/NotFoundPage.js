import { Container } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";

const NotFoundPage = () => {
  const history = useHistory();

  const GoHome = () => {
    history.push("/");
  };

  return (
    <Container className="notFoundPage">
      <h1 style={{ fontSize: 72 + "px" }}>404</h1>

      <h3>Sorry, Page Not Found</h3>
      <h4>The page you requested could not be found</h4>
      <button className="goHomeButton" onClick={GoHome}>
        {" "}
        GO BACK HOME{" "}
      </button>
    </Container>
  );
};

export default NotFoundPage;
