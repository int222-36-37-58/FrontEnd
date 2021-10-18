import React from "react";
import { Route, Switch } from "react-router";
import Home from "./components/pages/Home";
import NavBar from "./components/ui/NavBar";
import ProductPage from "./components/pages/ProductPage";
import ProfilePage from "./components/pages/ProfilePage";
import Footer from "./components/ui/Footer";
import NotFoundPage from "./components/pages/NotFoundPage";
import ProtectedRoute from "./components/etc/ProtectedRoute";

const App = () => (
  <div className="pageContainer">
    <NavBar />
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

export default App;
