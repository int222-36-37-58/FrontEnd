import { Link } from "react-router-dom";
import "../../index.css";
import { InputBase, Hidden, Menu } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import React, { useState } from "react";
import { connect } from "react-redux";
import { removeFromCart, clearCartItem } from "../../actions/cart";
import CloseIcon from "@material-ui/icons/Close";
import Cart from "./Cart";
import sitlogo from "../../images/sitlogo.png";
import PersonIcon from "@material-ui/icons/Person";

import ListAltIcon from "@material-ui/icons/ListAlt";

import { VpnKey } from "@material-ui/icons";

const NavBar = ({ cart, removeFromCart, clearCartItem }) => {
  const [isShowCart, setIsShowCart] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentClick, setCurrentClick] = useState("");
  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const onChange = (e) => {
    setSearchVal(e.target.value);
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
        clearCart={clearCartItem}
      />

      <>
        <div className="navBar ">
          <div className="topNav ">
            <Link to="/">
              {" "}
              <div className="hoverCursor">
                <img
                  src={sitlogo}
                  alt="โฮมเพจ"
                  style={{
                    maxWidth: "120px",
                    width: "100%",
                    marginRight: "30px",
                  }}
                />
              </div>
            </Link>{" "}
            <Hidden smDown>
              <div
                className="pr-50  "
                style={{ maxWidth: "570px", width: "100%" }}
              >
                <div className="searchBox">
                  <input
                    type="text"
                    name="searchNav"
                    placeholder="ค้นหา"
                    className="searchNav"
                    value={searchVal}
                  />
                  <div className="searchIcon hoverCursor">
                    {" "}
                    <SearchIcon />
                  </div>
                </div>
              </div>
            </Hidden>
            <Hidden mdUp>
              {!isShowSearch ? (
                <div
                  className="iconNav hoverCursor"
                  style={{ borderWidth: " 0 1px 0 1px", textAlign: "center" }}
                  onClick={handleShowSearch(true)}
                >
                  {" "}
                  <SearchIcon />
                </div>
              ) : (
                <div
                  className="iconNav hoverCursor"
                  style={{ borderWidth: " 0 0px 0 1px", textAlign: "center" }}
                  onClick={handleShowSearch(false)}
                >
                  {" "}
                  <CloseIcon />
                </div>
              )}
            </Hidden>
            <Link
              to="/profile/info"
              style={{ color: "white", textDecoration: "none" }}
            >
              <div
                className="iconNav hoverCursor"
                onMouseOver={handleOpenMenu}
                aria-controls="menu"
                style={{ borderWidth: " 0 1px 0 1px", textAlign: "center" }}
              >
                <div>
                  <PersonOutlineOutlinedIcon style={{ fontSize: "30px" }} />
                </div>
                <Hidden mdDown>
                  <div className="f13">บัญชีผู้ใช้</div>
                </Hidden>
              </div>
            </Link>
            <div
              className="iconNav hoverCursor"
              style={{ textAlign: "center" }}
              onClick={handleCart(true)}
            >
              <div>
                <ShoppingCartOutlinedIcon
                  style={{ fontSize: "30x", postion: "absolute" }}
                />
                <div>
                  {cart.cart.length > 0 && (
                    <div className="cartCount">{cart.cart.length}</div>
                  )}
                </div>
              </div>
              <Hidden mdDown>
                {" "}
                <div className="f13 ">ตะกร้า</div>
              </Hidden>
            </div>
          </div>
        </div>
        {isShowSearch && (
          <Hidden lgUp>
            <div
              className="searchResField"
              style={{ position: "relative", paddingTop: "60px" }}
            >
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
                value={searchVal}
                onChange={onChange}
              />
            </div>
          </Hidden>
        )}
      </>

      <Hidden mdDown>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{ onMouseLeave: () => setAnchorEl(false) }}
          PaperProps={{
            style: {
              width: "195px",
              display: "flex",
              textAlign: "right",
              marginTop: "35px",
            },
          }}
        >
          <Link to="/profile/info" className="link">
            <div
              onClick={() => {
                setAnchorEl(null);
                setCurrentClick("info");
              }}
              style={{
                fontSize: "14px",
                padding: "10px",
                display: "flex",
                justifyContent: "left",
                width: "195px",
                fontWeight: "600",
                maxWidth: "195px",
              }}
              className={
                currentClick === "info"
                  ? "currentClickStyle b hoverCursor"
                  : "hoverCursor currentHoverStyle"
              }
            >
              <PersonIcon className="pr-10" /> ข้อมูลของฉัน
            </div>
          </Link>
          <Link to="/profile/changepassword" className="link">
            <div
              onClick={() => {
                setAnchorEl(null);
                setCurrentClick("changepassword");
              }}
              style={{
                fontSize: "14px",
                padding: "10px",
                display: "flex",
                justifyContent: "left",
                fontWeight: "600",
                width: "100%",
              }}
              className={
                currentClick === "changepassword"
                  ? "currentClickStyle b hoverCursor"
                  : "hoverCursor currentHoverStyle"
              }
            >
              <VpnKey className="pr-10" /> เปลี่ยนรหัสผ่าน
            </div>
          </Link>

          <Link to="/profile/order" className="link">
            <div
              onClick={() => {
                setAnchorEl(null);
                setCurrentClick("order");
              }}
              style={{
                fontSize: "14px",
                padding: "10px",
                display: "flex",
                justifyContent: "left",
                fontWeight: "600",
                width: "100%",
              }}
              className={
                currentClick === "order"
                  ? "currentClickStyle b hoverCursor"
                  : "hoverCursor currentHoverStyle"
              }
            >
              <ListAltIcon className="pr-10" /> คำสั่งซื้อ
            </div>
          </Link>
          <Link to="/profile/createproduct" className="link">
            <div
              onClick={() => {
                setAnchorEl(null);
                setCurrentClick("myshop");
              }}
              style={{
                fontSize: "14px",
                padding: "10px",
                display: "flex",
                justifyContent: "left",
                fontWeight: "600",
                width: "100%",
              }}
              className={
                currentClick === "myshop"
                  ? "currentClickStyle b hoverCursor"
                  : "hoverCursor currentHoverStyle"
              }
            >
              {" "}
              <ShoppingCartOutlinedIcon className="pr-10" /> เริ่มขายสินค้า
            </div>
          </Link>
          <div
            onClick={() => {
              setAnchorEl(null);
              setCurrentClick("");
            }}
            style={{
              fontSize: "14px",
              padding: "10px",
              display: "flex",
              justifyContent: "left",
            }}
            className="hoverCursor b p-10 currentHoverStyle"
          >
            ออกจากระบบ
          </div>
        </Menu>
      </Hidden>
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
    clearCartItem: () => dispatch(clearCartItem()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
