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
    <div className="pageContent ">
      {dialog.length > 0 && dialog.map((di, i) => {
       return <ResponseDialog key={i}
          showDialog={true}
          dialog={di}
          handleCloseBox={removeDialog}
        />;
      })}
      )
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
    removeDialog: () => dispatch(removeResDialog()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
