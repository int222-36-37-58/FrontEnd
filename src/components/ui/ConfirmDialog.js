import { Dialog } from "@material-ui/core";
import React from "react";

const ConfirmDialog = (props) => {
  const confirmCondition = () => {
    props.submit();
  };

  return (
    <Dialog
      open={props.confirmInfo.showConfirm}
      onClose={props.handleCloseBox}
      fullWidth
      maxWidth="sm"
    >
      <div style={{ padding: "30px", paddingTop: "35px" }}>
        <div className="b f23" style={{ paddingBottom: "20px" }}>
          {props.confirmInfo.confirmContent}
        </div>

        <div className="dialogButtonZone w100">
          <div>
            <button
              className="delFromCart  "
              style={{ marginRight: "10px",padding: '8px' }}
              onClick={confirmCondition}
            >
              <div className="f16"> ยืนยัน</div>
            </button>
          </div>
          <div>
            <button className="AddButton " style={{padding: '8px'}} onClick={props.handleCloseBox}>
              {" "}
              <div className="f16"> ยกเลิก</div>{" "}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
