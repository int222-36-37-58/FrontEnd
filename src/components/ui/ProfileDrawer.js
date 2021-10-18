import { Drawer, Hidden, List } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

function ProfileDrawer(props) {
  return (
    <Hidden lgUp>
      <Drawer anchor={"left"} open={props.open} onClose={props.close}>
        <List style={{ width: "250px", padding: "20px" }}>
          {" "}
          <h3 style={{ borderStyle: "solid", borderWidth: "0 0 1px 0" }}>
            เมนู
          </h3>
          <div
            style={{ display: "flex", width: "230px", flexDirection: "column" }}
          >
            {props.isAuth ? (
              <>
                <div className="w-100">
                  <Link
                    to="/profile/info"
                    onClick={props.close}
                    className=" link"
                  >
                    <div className=" p-10  hoverChangeBackground ">
                      {" "}
                      ข้อมูลของฉัน
                    </div>
                  </Link>
                </div>
                <div className="  w-100">
                  {" "}
                  <Link
                    to="/profile/changepassword"
                    onClick={props.close}
                    className="link"
                  >
                    <div className=" p-10  hoverChangeBackground ">
                      เปลี่ยนรหัสผ่าน
                    </div>
                  </Link>
                </div>
                <div className="  w-100">
                  {" "}
                  <Link
                    to="/profile/order"
                    onClick={props.close}
                    className="link  "
                  >
                    <div className=" p-10  hoverChangeBackground ">
                      {" "}
                      คำสั่งซื้อ
                    </div>
                  </Link>
                </div>
                <div className=" w-100">
                  {" "}
                  <Link
                    to="/profile/createproduct"
                    onClick={props.close}
                    className="link "
                  >
                    <div className=" p-10 hoverChangeBackground">
                      เริ่มขายสินค้า
                    </div>
                  </Link>
                </div>
                <div className=" p-10 hoverChangeBackground w-100">
                  ออกจากระบบ
                </div>
              </>
            ) : (
              <div
                className=" p-10 hoverChangeBackground w-100"
                onClick={props.showLoginForm}
              >
                ลงชื่อเข้าใช้
              </div>
            )}
          </div>
        </List>
      </Drawer>
    </Hidden>
  );
}

export default ProfileDrawer;
