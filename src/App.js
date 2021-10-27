import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import Home from "./components/pages/Home";
import NavBar from "./components/ui/NavBar";
import ProductPage from "./components/pages/ProductPage";
import ProfilePage from "./components/pages/ProfilePage";
import Footer from "./components/ui/Footer";
import NotFoundPage from "./components/pages/NotFoundPage";
import ProtectedRoute from "./components/etc/ProtectedRoute";
import ResponseDialog from "./components/ui/ResponseDialog";
import { removeResDialog } from "./actions/uiStyle";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { connect } from "react-redux";

const App = ({ dialog, removeDialog }) => {
  const [current, setCurrent] = useState(0);
  const handlePosition = useCallback(() => {
    setCurrent(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handlePosition);
  }, [handlePosition]);

  return (
    <div className="pageContainer">
      <NavBar />

      <div className="dialogContainer">
        {dialog.map((di, i) => {
          return (
            <div key={i}>
              <ResponseDialog
                showDialog={true}
                dialog={di}
                index={i}
                handleCloseBox={removeDialog}
              />
            </div>
          );
        })}
      </div>
      <div className="pageContent ">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product/:id" component={ProductPage} />
          <ProtectedRoute path="/profile" component={ProfilePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>

      {current > 0 && (
        <KeyboardArrowUpIcon
          className="arrowIcon hoverCursor"
          style={{ fontSize: "40px" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      )}

      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dialog: state.uiStyle.responseDialog,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeDialog: (index) => dispatch(removeResDialog(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
