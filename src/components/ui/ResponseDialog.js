import { CircularProgress, Dialog, DialogContent } from "@material-ui/core";
import React from "react";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlined from "@material-ui/icons/CancelOutlined";

const ResponseDialog = (props) => {
  const switchRender = () => {
    if (props.dialog) {
      switch (props.dialog.status) {
        case props.dialog.status === 200:
          return (
            <CheckCircleOutlineOutlinedIcon
              style={{
                fontSize: 96,
                color: "#7bcb34",
              }}
            />
          );
        case props.dialog.status === undefined || props.dialog.status !== 200:
          return (
            <CancelOutlined
              className="w100"
              style={{
                fontSize: 96,
                color: "#d83c2d",
              }}
            />
          );
        default:
          return (
            <CircularProgress
              style={{
                color: "#1895f5",
                padding: "40px",
              }}
            />
          );
      }
    }
  };
  console.log(props.dialog.status === undefined && props.dialog.status !== 200);
  return (
    <Dialog
      open={props.showDialog}
      onClose={props.handleCloseBox}
      fullWidth
      maxWidth="xs"
    >
      <div>
        {props.dialog ? (
          <h3 className="dialogHeader">
            {props.dialog.status === 200 ? <p>Success</p> : <p>Error</p>}
          </h3>
        ) : (
          <h3 className="dialogHeader">Loading...</h3>
        )}

        <DialogContent>
          <div style={{ textAlign: "center" }}>{switchRender()}</div>
          {props.dialog && (
            <h3 style={{ fontWeight: 500 }}>{props.dialog.dialogContent}</h3>
          )}
          <button
            className="AddButton"
            style={{ width: "100%" }}
            onClick={props.handleCloseBox}
          >
            close
          </button>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default ResponseDialog;
