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
          dialogContent: res.data,
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
          dialogContent: res.data,
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
      confirmContent: `ยืนยันที่จะลบบัญชีของ ${props.user.userName} ไหม?`,
    });
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="f20 b pb-20">
            กำหนดสิทธิ์ของ {props.user.userName} เป็น
          </span>
        </div>

        <div
          className="w100"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            className="InfoButton w50 m-5 flex-1  text-center"
            onClick={() => {
              openConfirmChangeRole("seller");
            }}
          >
            ให้สิทธิ์เป็น seller
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
        <div
          className="w100 delFromCart text-center mt-20"
          onClick={openConfirmDeleteAccount}
        >
          ลบบัญชีนี้
        </div>
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
