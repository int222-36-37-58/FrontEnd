import * as type from "../actiontype";

const INITIAL_STATE = {
  userInfo:  {},
  isAuth: false,
};

export default function user(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case type.GET_USER_INFO:
      return { userInfo: action.payload.userInfo, isAuth: true };
    case type.LOGGED_OUT:
      return { userInfo: {}, isAuth: false };
    default:
      return state;
  }
}
