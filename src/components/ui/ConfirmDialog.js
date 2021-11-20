import { Dialog } from "@material-ui/core";
import React from "react";
import "../../css/confirmDialog.css";
import squidgirl from "../../images/asset/squidgirl.png";
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
      <div className="p-30 pt-35">
        <div className="confirmHead pb-20">
          {props.confirmInfo.confirmContent}
        </div>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <img
            src={squidgirl}
            alt="squidgirl"
            style={{
              maxWidth: "250px",
              width: "100%",
            }}
          />
        </div>
        <div className="dialogButtonZone w100">
          <button className="delFromCart mr-10 w50 " onClick={confirmCondition}>
            <div className="f16"> ยืนยัน</div>
          </button>

          <button
            className="AddButton mr-10 w50"
            onClick={props.handleCloseBox}
          >
            {" "}
            <div className="f16"> ยกเลิก</div>{" "}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
