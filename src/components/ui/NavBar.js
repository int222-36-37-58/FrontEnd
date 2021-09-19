import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";
import "../../index.css";
import { InputBase, Hidden, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React, { useState } from "react";
import { connect } from "react-redux";
import { removeFromCart, checkoutItem } from "../../actions/cart";

import CloseIcon from "@material-ui/icons/Close";
import Cart from "./Cart";

const NavBar = ({ cart, removeFromCart, checkoutItem }) => {
  const [isShowCart, setIsShowCart] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);

  const onChange = (e) => {
    console.log(e.target.value);
  };

  const handleCart = (open) => (event) => {
    setIsShowCart(open);
  };

  const handleShowSearch = (open) => (event) => {
    setIsShowSearch(open);
  };

  return (
    <>
      <Cart
        listProduct={cart.cart}
        onHandleCart={handleCart}
        isShowCart={isShowCart}
        remove={removeFromCart}
        checkout={checkoutItem}
      />

      <AppBar position="static" style={{ top: 0, width: 100 + "%" }}>
        <Toolbar>
          <div className="navbarContent">
            <div className="navLeftItem">
              <Link
                to="/"
                className="navbarIcon"
                style={{ marginRight: 30 + "px" }}
              >
                <HomeIcon style={{ fontSize: 30 + "px" }} />
              </Link>
              <Hidden mdDown>
                <div className="searchWrap">
                  <div className="searchBox">
                    <InputBase
                      className="searchInput"
                      placeholder="Search…"
                      variant="outlined"
                      type="text"
                      id="searchText"
                      name="searchText"
                      onChange={onChange}
                    />
                    <div className="searchIcon">
                      <SearchIcon />
                    </div>
                  </div>
                </div>
              </Hidden>

              <Box
                display={{ xs: "block", sm: "block", md: "block", lg: "none" }}
              >
                {isShowSearch ? (
                  <span
                    className="hoverCursor searchIconRes"
                    onClick={handleShowSearch(false)}
                  >
                    <CloseIcon style={{ fontSize: 30 + "px" }} />
                  </span>
                ) : (
                  <span
                    className="hoverCursor searchIconRes"
                    onClick={handleShowSearch(true)}
                  >
                    <SearchIcon style={{ fontSize: 30 + "px" }} />
                  </span>
                )}
              </Box>
            </div>

            <div className="navRightItem">
              <div>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  {" "}
                  <PersonIcon
                    className="personIcon"
                    style={{ fontSize: 30 + "px" }}
                  />
                </Link>
              </div>

              <div className="hoverCursor" onClick={handleCart(true)}>
                <ShoppingCartIcon
                  className="navbarIcon"
                  style={{ fontSize: 30 + "px" }}
                />
                {cart.cart.length > 0 && (
                  <span className="cartCount">{cart.cart.length}</span>
                )}
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {isShowSearch && (
        <Hidden lgUp>
          <div className="searchResField">
            <SearchIcon
              style={{ color: "black", marginLeft: 15 + "px" }}
            ></SearchIcon>
            <InputBase
              style={{
                marginLeft: 20 + "px",
                paddingRight: 20 + "px",
                width: 90 + "%",
                borderColor: "black",
              }}
              placeholder="Search…"
              variant="outlined"
              type="text"
              id="searchText"
              name="searchText"
              onChange={onChange}
            />
          </div>
        </Hidden>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (product) => dispatch(removeFromCart(product)),
    checkoutItem: () => dispatch(checkoutItem()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
