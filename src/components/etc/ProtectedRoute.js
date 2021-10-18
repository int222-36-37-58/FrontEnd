import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

function ProtectedRoute({ isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.user.isAuth,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
