import React from "react";
import { Route, Switch } from "react-router";
import Home from "./components/pages/Home";
import NavBar from "./components/ui/NavBar";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import CreateProductPage from "./components/pages/CreateProductPage";
import ProductPage from "./components/pages/ProductPage";
import ProfilePage from "./components/pages/ProfilePage";
import Footer from "./components/ui/Footer";
import UserListPage from "./components/pages/UserListPage";
import ListBaseDataPage from "./components/pages/ListBaseDataPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import UserOrderPage from "./components/pages/UserOrderPage";

const App = () => (
  <div className="pageContainer">
    <NavBar />
    <div className="pageContent ">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/createproduct" exact component={CreateProductPage} />
        <Route path="/product/:id" exact component={ProductPage} />
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/listusers" exact component={UserListPage} />
        <Route path="/listbasedata" exact component={ListBaseDataPage} />
        <Route path="/myorder" exact component={UserOrderPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
    <Footer />
  </div>
);

export default App;
