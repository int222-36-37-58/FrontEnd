import { Container } from "@material-ui/core";
import axios from "axios";
import React from "react";

const ColorCard = (props) => {
  const handleDelete = () => {
    
    try {
      
        axios
          .delete(`${process.env.REACT_APP_API_URL}/colordelete/${props.color.colorId}`)
          .then((res) => {
            if (res.status === 200) {
              alert(`delete ${props.color.colorName} color success!!`);
            }
          });
      
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Container>
      <div className="userCard">
        <div> {props.color.colorId}</div>
        <div> {props.color.colorName}</div>
        <button
          className="delFromCart"
          onClick={handleDelete}
        >
          DELETE
        </button>
      </div>
    </Container>
  );
};

export default ColorCard;
