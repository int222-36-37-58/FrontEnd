import { Dialog, DialogContent, DialogContentText } from "@material-ui/core";
import React from "react";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlined from "@material-ui/icons/CancelOutlined";

const ResponseDialog = (props) => {
  return (
    <Dialog open={props.showDialog} onClose={props.handleCloseBox} fullWidth maxWidth="xs">
      <h3 className="dialogHeader">{props.dialogHeader}</h3>
      <DialogContent>
        <DialogContentText>
          {props.dialogHeader!== 'Error'  ? (
            <CheckCircleOutlineOutlinedIcon
              style={{
                fontSize: 96,
                color: "#7bcb34",
                width: "100%",
                marginTop: "-10px",
              }}
            />
          ) : (
            <CancelOutlined
              style={{
                fontSize: 96,
                color: "#d83c2d",
                marginLeft: "auto",
                width: "100%",
              }}
            />
          )}

          <h3 style={{ fontWeight: 500 }}>{props.dialogContent}</h3>

          <button className="AddButton" style={{ width: "100%" }} onClick={props.handleCloseBox}>
            close
          </button>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ResponseDialog;
