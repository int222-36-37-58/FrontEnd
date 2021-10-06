import * as actionTypes from "../actiontype";

const INITIAL_STATE = {
  uiStyle: { currentMenuClicked: "" },
};

const uiStyle = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case actionTypes.CURRENT_MENU_CLICKED:
      return {
        currentMenuClicked: action.payload.currentMenuClicked,
      };

    default:
      return state;
  }
};

export default uiStyle;
