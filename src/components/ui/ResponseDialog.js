import React, { useEffect } from "react";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlined from "@material-ui/icons/CancelOutlined";

const ResponseDialog = (props) => {
  useEffect(() => {
    if (props.len > 0) {
      setTimeout(() => props.handleCloseBox(props.index), 10000);
    }
  }, [props]);

  const switchRender = () => {
    let stat = "";
    if (props.dialog) {
      if (props.dialog.status === 200) {
        stat = "Success";
      } else {
        stat = "Error";
      }
    } else {
      stat = null;
    }
    switch (stat) {
      case "Success":
        return (
          <CheckCircleOutlineOutlinedIcon
            style={{
              color: "#7bcb34",
            }}
          />
        );
      case "Error":
        return (
          <CancelOutlined
            className="w100"
            style={{
              color: "#d83c2d",
            }}
          />
        );
      default:
        return <CancelOutlined className="w100" style={{}} />;
    }
  };

  return (
    <div>
      <div className="responseDialog rightResDialog">
        <div style={{ textAlign: "center" }}>{switchRender()}</div>
        <div>
          {props.dialog && (
            <h3 style={{ fontWeight: 500 }}>{props.dialog.dialogContent}</h3>
          )}
        </div>
        <div onClick={() => props.handleCloseBox(props.index)}>
          <CancelOutlined className="hoverBlack" />
        </div>
      </div>
    </div>
  );
};

export default ResponseDialog;
