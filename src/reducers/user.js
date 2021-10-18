const INITIAL_STATE = {
  userInfo: null,
  isAuth: false,
};

export default function user(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case "LOGGED_IN":
      return { userInfo: action.payload.user, isAuth: true };
    case "LOGGED_OUT":
      return { userInfo: null, isAuth: false };
    default:
      return state;
  }
}
