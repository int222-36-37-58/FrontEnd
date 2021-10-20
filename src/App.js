import React from "react";
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
import { connect } from "react-redux";

const App = ({ dialog, removeDialog }) => (
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
    <Footer />
  </div>
);

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
