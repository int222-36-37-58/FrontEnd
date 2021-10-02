import React, { useState } from "react";
import InfoIcon from "@material-ui/icons/Info";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CheckIcon from "@material-ui/icons/Check";
import member36 from "../../images/member36.jpg";
import member37 from "../../images/member37.jpg";
import member58 from "../../images/member58.jpg";
import sitlogo from "../../images/sitlogo.png";
import { Dialog, DialogContent, Grid } from "@material-ui/core";
const ContactFooter = () => {
  const [showMember, setShowMember] = useState(false);
  const [members] = useState([
    {
      id: "62130500036",
      name: "Thanasit Eksoragul",
      role: "Back-end database",
      image: member36,
    },
    {
      id: "62130500037",
      name: "Thanapat Suwannaard",
      role: "Front-end database",
      image: member37,
    },
    {
      id: "62130500058",
      name: "Punthanat Ularnwiriyanont",
      role: "DevOps database",
      image: member58,
    },
  ]);

  const handleCloseBox = () => {
    setShowMember(false);
  };

  return (
    <>
      <Dialog
        open={showMember}
        onClose={handleCloseBox}
        fullWidth
        maxWidth="lg"
      >
        <h4 className="dialogHeader">Members</h4>
        <DialogContent>
          <Grid container spacing={2}>
            {members.map((mem) => {
              return (
                <Grid item xs={12} sm={4} key={mem.id}>
                  <div className="MemberCard">
                    <img
                      src={`${mem.image}`}
                      alt={`member${mem.id}`}
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "100px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                      }}
                    />
                    <div style={{ fontWeight: "900", fontSize: "17px" }}>
                      {mem.id}{" "}
                    </div>
                    <div style={{ fontWeight: "900", fontSize: "24px" }}>
                      {" "}
                      {mem.name}
                    </div>
                    <div style={{ fontWeight: "900", fontSize: "18px" }}>
                      {" "}
                      {mem.role}
                    </div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
          <button
            className="AddButton"
            style={{ width: "100%" }}
            onClick={handleCloseBox}
          >
            close
          </button>
        </DialogContent>
      </Dialog>
      <div className="contactFooterContainer">
        <div style={{ display: "flex", alignItems: "center" }}>
          <button className="roleButton" onClick={() => setShowMember(true)}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <InfoIcon />

              <div style={{ marginLeft: "5px", marginRight: "2px" }}>
                {" "}
                ข้อมูลผู้จัดทำ
              </div>

              <NavigateNextIcon />
            </div>
          </button>
        </div>
        <div style={{ fontWeight: 600, fontSize: "17px" }}>
          <h4>
            <CheckIcon /> 3rd Year student from SIT KMUTT
          </h4>
          <h4>
            <CheckIcon /> Our 2nd Project
          </h4>
          <h4>
            <CheckIcon /> Thanks for visited
          </h4>
        </div>
      </div>
      <div className="sitFooter">
        <img
          src={sitlogo}
          alt="sitlogo"
          style={{ maxWidth: 130 + "px", paddingTop: "85px" }}
        />

        <div style={{ fontWeight: 900, fontSize: "25px", paddingTop: "50px" }}>
          School of Information Technology{" "}
        </div>
        <div style={{ fontSize: "20px", color: "#666666" }}>
          126 Pracha Uthit Rd, Khwaeng Bang Mot, Khet Thung Khru, Krung Thep
          Maha Nakhon 10140
        </div>
      </div>
    </>
  );
};

export default ContactFooter;
