import * as actionTypes from "../actiontype";

const INITIAL_STATE = {
  searchModalShow: false,
  filterType: [],
  responseDialog: [],
};

const uiStyle = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case actionTypes.SEARCH_MODAL_HANDLE:
      return { ...state, searchModalShow: action.payload.searchModalShow };
    case actionTypes.FILTER_CLICKED:
      let isAlready = false;
      if (state.filterType === action.payload.filterClicked) {
        isAlready = true;
      }
      return {
        ...state,
        filterType: isAlready ? "" : action.payload.filterClicked,
      };

    case actionTypes.CLEAR_FILTER:
      return { ...state, filterType: "" };
    case actionTypes.ADD_RES_DIALOG:
      return {
        ...state,
        responseDialog: [...state.responseDialog, action.payload.dialogContent],
      };
    case actionTypes.REMOVE_RES_DIALOG:
      return {
        ...state,
        responseDialog: state.responseDialog.filter(
          (res) => res !== state.responseDialog[action.payload.index]
        ),
      };
    default:
      return state;
  }
};

export default uiStyle;
