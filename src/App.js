import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import ShopPage from "./components/pages/shop/ShopPage";
import NavBar from "./components/ui/NavBar";
import ProductPage from "./components/pages/shop/ProductPage";
import ProfilePage from "./components/pages/profile/ProfilePage";
import WelcomePage from "./components/pages/WelcomePage";
import NotFoundPage from "./components/pages/NotFoundPage";
import ProtectedRoute from "./components/etc/ProtectedRoute";
import ResponseDialog from "./components/ui/ResponseDialog";
import { removeResDialog } from "./actions/uiStyle";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { connect } from "react-redux";
import "./App.css";
import "./css/button.css";
import Footer from "./components/ui/Footer";

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
                len={dialog.length}
                index={i}
                handleCloseBox={removeDialog}
              />
            </div>
          );
        })}
      </div>
      <div className="pageContent">
        <Switch>
          <Route path="/" exact component={WelcomePage} />
          <Route path="/shop" exact component={ShopPage} />
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
