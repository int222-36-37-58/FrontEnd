import React, { useState } from "react";
import RegisterForm from "../forms/RegisterForm";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
const ProfileInfoPage = (props) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div>
      {isEdit ? (
        <RegisterForm
          userData={props.userData}
          editMode={true}
          submit={props.update}
          onIsEdit={() => setIsEdit(false)}
        ></RegisterForm>
      ) : (
        <div className="profileBox">
          <div className="headerProfileBox">
            <div>ข้อมูลส่วนตัว</div>
            <div style={{ fontWeight: 500 }}>
              ข้อมูลพื้นฐาน เช่น ชื่อ เบอร์โทร
            </div>
          </div>
          <div className="profileContent">
            <div>
              <label>
                ชื่อบัญชี : <span>{props.userData.userName}</span>
              </label>
            </div>
            <div>
              <label>
                ชื่อ : <span>{props.userData.fullName}</span>
              </label>
            </div>
            <div>
              <label>
                ที่อยู่ : <span>{props.userData.address}</span>
              </label>
            </div>
            <div>
              <label>
                เบอร์โทร : <span>{props.userData.tel}</span>
              </label>
            </div>
          </div>
          <div className="editBox" onClick={() => setIsEdit(true)}>
            <label>
              <span>
                <EditOutlinedIcon />
              </span>{" "}
              <span>แก้ไขข้อมูลส่วนตัว</span>
            </label>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfoPage;
