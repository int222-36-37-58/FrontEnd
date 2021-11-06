import React, { useState } from "react";
import ConfirmDialog from "../ui/ConfirmDialog";

const StartSellPage = (props) => {
  const [confirmBox, setConfirmBox] = useState({
    showConfirm: false,
    confirmContent: "",
  });
  const startSell = () => {
    handleCloseConfirm();
  };
  const handleCloseConfirm = () => {
    setConfirmBox({ showConfirm: false, confirmContent: "" });
  };

  const openConfirmBox = (data) => {
    setConfirmBox({
      showConfirm: true,
      confirmContent: `ยืนยันการสมัครเป็นผู้ขาย?`,
    });
  };

  return (
    <>
      <ConfirmDialog
        confirmInfo={confirmBox}
        handleCloseBox={handleCloseConfirm}
        submit={startSell}
      />
      <div className="profileBox">
        <div className="f20 b">
          ปลดล็อคสิทธิ์การเป็นผู้ขาย เพื่อขายสินค้ากับเรา
        </div>
        <div
          className="AddButton mt-20"
          style={{ textAlign: "center", width: "25%" }}
          onClick={openConfirmBox}
        >
          เริ่มเป็นผู้ขาย
        </div>
      </div>
    </>
  );
};

export default StartSellPage;
