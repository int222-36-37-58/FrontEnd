import * as type from "../actiontype";

const INITIAL_STATE = {
  userInfo: null,
  isAuth: true,
};

export default function user(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case type.GET_USER_INFO:
      return { userInfo: action.payload.userInfo, isAuth: true };
    case type.LOGGED_OUT:
      return { userInfo: null, isAuth: false };
    default:
      return state;
  }
}
