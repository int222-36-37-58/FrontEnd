import * as actionTypes from "../actiontype";

const INITIAL_STATE = {
  currentMenuClicked: "",
  searchModalShow: false,
  filterType: [],
};

const uiStyle = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case actionTypes.CURRENT_MENU_CLICKED:
      return {
        ...state,
        currentMenuClicked: action.payload.currentMenuClicked,
      };
    case actionTypes.SEARCH_MODAL_HANDLE:
      return { ...state, searchModalShow: action.payload.searchModalShow };
    case actionTypes.FILTER_CLICKED:
      return {
        ...state,
        filterType: action.payload.filterClicked,
      };

    case actionTypes.CLEAR_FILTER:
      return { ...state, filterType: "" };

    default:
      return state;
  }
};

export default uiStyle;
