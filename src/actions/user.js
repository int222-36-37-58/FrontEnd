import * as type from "../actiontype";

export const getUserInfo = (data) => ({
  type: type.GET_USER_INFO,
  payload: {
    userInfo: data,
  },
});

export const logout = () => ({
  type: type.LOGGED_OUT,
});
