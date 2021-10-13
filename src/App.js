import React from "react";
import { Route, Switch } from "react-router";
import Home from "./components/pages/Home";
import NavBar from "./components/ui/NavBar";
import CreateProductPage from "./components/pages/CreateProductPage";
import ProductPage from "./components/pages/ProductPage";
import ProfilePage from "./components/pages/ProfilePage";
import Footer from "./components/ui/Footer";
import UserListPage from "./components/pages/UserListPage";
import ListBaseDataPage from "./components/pages/ListBaseDataPage";
import NotFoundPage from "./components/pages/NotFoundPage";

const App = () => (
  <div className="pageContainer">
    <NavBar />
    <div className="pageContent ">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/createproduct" component={CreateProductPage} />
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/listusers" component={UserListPage} />
        <Route path="/listbasedata" component={ListBaseDataPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
    <Footer />
  </div>
);

export default App;
