import * as type from "../actiontype";
import axios from "axios";
import SetDefaultHeader from "../components/etc/SetDefaultHeader.js";

export const getUserInfo = (data) => ({
  type: type.GET_USER_INFO,
  payload: {
    userInfo: data,
  },
});
export const userLogout = () => ({
  type: type.LOGGED_OUT,
});

export const login = (data) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}/authenticate`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      localStorage.setItem("token", `${res.data.token}`);
      SetDefaultHeader(`${res.data.token}`);
    });
};

export const getUser = () => (dispatch) => {
  axios.get(`${process.env.REACT_APP_API_URL}/user/getbyname`).then((res) => {
    dispatch(getUserInfo(res.data));
  });
};

export const logout = () => {
  localStorage.removeItem("token");
  SetDefaultHeader("");
};