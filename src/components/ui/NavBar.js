import { Link } from "react-router-dom";
import "../../index.css";
import { Hidden, Menu } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import React, { useState } from "react";
import { connect } from "react-redux";
import { removeFromCart, clearCartItem } from "../../actions/cart";
import Cart from "./Cart";
import sitlogo from "../../images/sitlogo.png";
import PersonIcon from "@material-ui/icons/Person";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { VpnKey } from "@material-ui/icons";
import {
  addResDialog,
  changeCurrentMenu,
  openSearchModal,
} from "../../actions/uiStyle";
import ProfileDrawer from "./ProfileDrawer";
import SearchModal from "./SearchModal";
import GuestUserPage from "../pages/GuestUserPage";
import { logout, userLogout } from "../../actions/user";
const NavBar = ({
  isAuth,
  userInfo,
  cart,
  uiStyle,
  logout,
  userLogout,
  removeFromCart,
  clearCartItem,
  changeCurrentMenu,
  openSearchModal,
  addResDialog,
}) => {
  const [isShowCart, setIsShowCart] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isShowProfileDrawer, setIsShowProfileDrawer] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const onChange = (e) => {
    setSearchVal(e.target.value);
    if (uiStyle.searchModalShow) {
      return;
    }
    if (searchVal.length > 0) {
      openSearchModal(true);
    } else {
    }
  };

  const handleCart = (open) => (event) => {
    setIsShowCart(open);
  };

  const handleProfileDrawer = (val) => {
    setIsShowProfileDrawer(val);
  };

  const handleSearchModal = (open) => (event) => {
    openSearchModal(open);
    if (open === false) {
      setSearchVal("");
    }
  };

  const handleShowGuestModal = (open) => (event) => {
    setShowGuestModal(open);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    logout();
    userLogout();
  };

  return (
    <>
      <Cart
        listProduct={cart}
        onHandleCart={handleCart}
        isShowCart={isShowCart}
        remove={removeFromCart}
        clearCart={clearCartItem}
        isAuth={isAuth}
        userInfo={userInfo}
        showLoginForm={handleShowGuestModal(true)}
        addResDialog={addResDialog}
      />

      <ProfileDrawer
        open={isShowProfileDrawer}
        isAuth={isAuth}
        showLoginForm={handleShowGuestModal(true)}
        close={() => handleProfileDrawer(false)}
        handleLogout={() => handleLogout()}
      />

      <SearchModal
        open={uiStyle.searchModalShow}
        close={handleSearchModal(false)}
        query={searchVal}
      />

      <GuestUserPage
        open={showGuestModal}
        close={handleShowGuestModal(false)}
      />

      <>
        <div className="navBar ">
          <div className="topNav ">
            <Link to="/">
              <div
                className="hoverCursor"
                onClick={() => {
                  changeCurrentMenu("");
                  openSearchModal(false);
                  setSearchVal("");
                }}
              >
                <img
                  src={sitlogo}
                  alt="โฮมเพจ"
                  style={{
                    maxWidth: "110px",
                    width: "100%",
                    marginRight: "30px",
                  }}
                />
              </div>
            </Link>

            <Hidden smDown>
              <div
                className="pr-50  "
                style={{
                  maxWidth: "570px",
                  width: "100%",
                  borderWidth: "0px",
                  zIndex: "2147483647",
                  position: "static",
                }}
              >
                <div className="searchBox">
                  <input
                    type="text"
                    name="searchNav"
                    placeholder="ค้นหา"
                    className="searchNav"
                    value={searchVal}
                    onChange={onChange}
                  />
                  <div
                    className="searchIcon hoverCursor"
                    onClick={() => openSearchModal(true)}
                  >
                    {" "}
                    <SearchIcon />
                  </div>
                </div>
              </div>
            </Hidden>

            <Hidden mdUp>
              <SearchIcon
                className="hoverCursor"
                onClick={handleSearchModal(true)}
              />
            </Hidden>

            <div
              className="iconNav hoverCursor"
              onMouseOver={handleOpenMenu}
              onClick={() => {
                if (isAuth) {
                  handleProfileDrawer(true);
                } else {
                  setShowGuestModal(true);
                }
              }}
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
                  {cart.length > 0 && (
                    <div className="cartCount">{cart.length}</div>
                  )}
                </div>
              </div>
              <Hidden mdDown>
                {" "}
                <div className="f13 ">ตะกร้า</div>
              </Hidden>
            </div>
          </div>
          <div style={{ position: "absolute", paddingTop: "75px" }}></div>
        </div>
      </>
      {isAuth && (
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
                  changeCurrentMenu("info");
                  openSearchModal(false);
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
                  uiStyle.currentMenuClicked === "info"
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
                  changeCurrentMenu("changepassword");
                  openSearchModal(false);
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
                  uiStyle.currentMenuClicked === "changepassword"
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
                  changeCurrentMenu("order");
                  openSearchModal(false);
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
                  uiStyle.currentMenuClicked === "order"
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
                  changeCurrentMenu("createproduct");
                  openSearchModal(false);
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
                  uiStyle.currentMenuClicked === "createproduct"
                    ? "currentClickStyle b hoverCursor"
                    : "hoverCursor currentHoverStyle"
                }
              >
                {" "}
                <ShoppingCartOutlinedIcon className="pr-10" /> เริ่มขายสินค้า
              </div>
            </Link>
            <div
              onClick={() => handleLogout()}
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
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    cart: state.cart.cart,
    uiStyle: state.uiStyle,
    isAuth: state.user.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (product) => dispatch(removeFromCart(product)),
    clearCartItem: () => dispatch(clearCartItem()),
    changeCurrentMenu: (change) => dispatch(changeCurrentMenu(change)),
    openSearchModal: (open) => dispatch(openSearchModal(open)),
    logout: () => logout(),
    userLogout: () => dispatch(userLogout()),
    addResDialog: (content) => dispatch(addResDialog(content)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
