import * as actionTypes from "../actiontype";

const INITIAL_STATE = {
  uiStyle: { currentMenuClicked: "", searchModalShow: false, filterType: [] },
};

const uiStyle = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case actionTypes.CURRENT_MENU_CLICKED:
      return {
        currentMenuClicked: action.payload.currentMenuClicked,
      };
    case actionTypes.SEARCH_MODAL_HANDLE:
      return {
        searchModalShow: action.payload.searchModalShow,
      };
    case actionTypes.FILTER_CLICKED:
      return {
        filterType: action.payload.filterClicked,
      };
    case actionTypes.CLEAR_FILTER:
      return {
        filterType: [],
      };

    default:
      return state;
  }
};

export default uiStyle;
