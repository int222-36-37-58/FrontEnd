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
                      className="pt-21 pb-20"
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "100px",
                      }}
                    />
                    <div className="b f17">{mem.id} </div>
                    <div className="b f24"> {mem.name}</div>
                    <div className="b f18"> {mem.role}</div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
          <button className="AddButton w100" onClick={handleCloseBox}>
            close
          </button>
        </DialogContent>
      </Dialog>
      <div className="contactFooterContainer">
        <Grid container justifyContent="center" alignItems="center" spacing={0}>
          <Grid
            item
            xs={12}
            sm={6}
            style={{ textAlign: "right", paddingRight: "10px" }}
          >
            <button className="roleButton" onClick={() => setShowMember(true)}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyItems: "end",
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
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className="b f17"
            style={{ paddingLeft: "40px" }}
          >
            <div>
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
          </Grid>
        </Grid>
      </div>
      <div className="sitFooter">
        <img
          src={sitlogo}
          alt="sitlogo"
          style={{ maxWidth: 130 + "px", paddingTop: "85px" }}
        />

        <div className="b" style={{ fontSize: "25px", paddingTop: "50px" }}>
          School of Information Technology{" "}
        </div>
        <div className="f20" style={{ color: "#666666" }}>
          126 Pracha Uthit Rd, Khwaeng Bang Mot, Khet Thung Khru, Krung Thep
          Maha Nakhon 10140
        </div>
      </div>
    </>
  );
};

export default ContactFooter;
