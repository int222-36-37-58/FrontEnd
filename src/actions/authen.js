import axios from "axios";
import { getUserProducts } from "./product";

export const loggedOut = () => ({
  type: "LOGGED_OUT",
});

export const register = (data) =>
  axios.post(`${process.env.REACT_APP_API_URL}/register`, data).then((res) => {
    login(res);
  });

export const getUserData = () => {
  axios.post(`${process.env.REACT_APP_API_URL}/getUser`, {
    headers: { "x-access-token":  "" },
  }).then((res) => {
      console.log(res.data)
  })
};

export const logout = () => (dispatch) =>
  axios
    .post(`${process.env.REACT_APP_API_URL}/logout`)
    .then(dispatch(loggedOut()));
