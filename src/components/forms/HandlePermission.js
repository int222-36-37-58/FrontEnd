import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { addResDialog } from "../../actions/uiStyle";
import ConfirmDialog from "../ui/ConfirmDialog";
const HandlePermission = (props, { addResdialog }) => {
  const [confirmBox, setConfirmBox] = useState({
    showConfirm: false,
    confirmContent: "",
  });
  const [confirmDeleteBox, setConfirmDeleteBox] = useState({
    showConfirm: false,
    confirmContent: "",
  });

  const [role, setRole] = useState("");

  const promoteTo = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/admin/promoteuser/${props.user.userId}?role=${role}`
      )
      .then((res) => {
        const content = {
          status: res.status,
          dialogContent: `ให้สิทธิ์ ${props.user.userName} เป็น ${role} สำเร็จ`,
        };
        props.addResDialog(content);
      })
      .then(() => {
        props.refreshUser();
        props.close();
      })

      .catch((err) => {
        const content = {
          status: "Error",
          dialogContent: err.message,
        };

        props.addResDialog(content);
      });
  };

  const deleteAccount = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/admin/delete/${props.user.userId}`
      )

      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: "ปิดการใช้งานบัญชีสำเร็จ",
        };
        props.addResDialog(data);
      })
      .then(() => {
        props.refreshUser();
        props.close();
      })
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.response.data.message,
        };
        props.addResDialog(data);
      });
  };

  const handleCloseConfirm = () => {
    setConfirmBox({ showConfirm: false, confirmContent: "" });
    setConfirmDeleteBox({ showConfirm: false, confirmContent: "" });
  };

  const openConfirmChangeRole = (role) => {
    setRole(role);
    setConfirmBox({
      showConfirm: true,
      confirmContent: `ยืนยันที่จะให้สิทธิ์ ${props.user.userName} เป็น ${role} ไหม?`,
    });
  };

  const openConfirmDeleteAccount = () => {
    setConfirmDeleteBox({
      showConfirm: true,
      confirmContent: `ยืนยันที่จะปิดการใช้งานบัญชีของ ${props.user.userName} ไหม? 
      (หากเป็นผู้ใช้ที่ไม่เคยซื้อ หรือขายของในระบบ บัญชีจะถูกลบ)`,
    });
  };
  const restoreAccount = () => {
    props.restore();
    props.close();
  };

  return (
    <>
      <ConfirmDialog
        confirmInfo={confirmBox}
        handleCloseBox={handleCloseConfirm}
        submit={promoteTo}
      />

      <ConfirmDialog
        confirmInfo={confirmDeleteBox}
        handleCloseBox={handleCloseConfirm}
        submit={deleteAccount}
      />

      <div className="roundBorder">
        <div
          className="f20 b pb-20 text-center"
          style={{
            borderStyle: "solid",
            borderWidth: "0 0 2px 0",
            borderColor: "#ebebeb",
          }}
        >
          กำลังจัดการสิทธิ์ของบัญชี {props.user.userName}
        </div>

        <div
          className="pt-20 pb-20"
          style={{
            borderStyle: "solid",
            borderWidth: "0 0 2px 0",
            borderColor: "#ebebeb",
          }}
        >
          <div className="f16 b ">ให้ผู้ใช้เป็น Seller</div>
          <div>
            {" "}
            ทำให้ผู้ใช้ที่สามารถลงขายสินค้า และตรวจสอบประวัติการขาย
            รวมถึงสินค้าทั้งหมดที่เขาได้ลงขาย
          </div>
          <div
            className="InfoButton w50 m-5 flex-1  text-center"
            onClick={() => {
              openConfirmChangeRole("seller");
            }}
          >
            ให้สิทธิ์เป็น seller
          </div>
        </div>
        <div
          className="pt-20 pb-20"
          style={{
            borderStyle: "solid",
            borderWidth: "0 0 2px 0",
            borderColor: "#ebebeb",
          }}
        >
          <div className="f16 b ">ให้ผู้ใช้เป็น Admin</div>
          <div>
            {" "}
            เพิ่มความสามารถให้ผู้ใช้นี้ สามารถจัดการข้อมูลในระบบ
            และสามารถจัดการข้อมูลผู้ใช้ได้
          </div>
          <div
            className="AddButton w50 m-5 flex-1  alignCenter text-center"
            onClick={() => {
              openConfirmChangeRole("admin");
            }}
          >
            ให้สิทธิ์เป็น admin
          </div>
        </div>
        {props.user.status === "active" ? (
          <>
            <div className="f16 b pt-20">ปิดการใช้งานบัญชีผู้ใช้</div>
            <div>
              ทำให้ผู้ใช้นั้นไม่สามารถเข้าระบบด้วยบัญชีนั้น ๆ ได้
              แต่หากผู้ใช้นี้ไม่เคยมีการซื้อ หรือขายในระบบ บัญชีนี้จะถูกลบ
            </div>
            <div
              className=" w50 delFromCart text-center mt-20"
              onClick={openConfirmDeleteAccount}
            >
              ปิดการใช้งานบัญชี
            </div>
          </>
        ) : (
          <>
            <div className="f16 b pt-20">กู้คืนบัญชี</div>
            <div>ทำให้ผู้ใช้นั้นสามารถกลับมาใช้งานบัญชีนั้นๆ ได้อีกครั้ง</div>
            <div
              className="w50  delFromCart text-center mt-20"
              onClick={restoreAccount}
            >
              กู้คืนบัญชี
            </div>
          </>
        )}
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addResDialog: (content) => dispatch(addResDialog(content)),
  };
};

export default connect(null, mapDispatchToProps)(HandlePermission);
