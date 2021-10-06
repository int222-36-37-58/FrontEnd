import * as type from "../actiontype";

export const changeCurrentMenu = (current) => ({
  type: type.CURRENT_MENU_CLICKED,
  payload: {
    currentMenuClicked: current,
  },
});
