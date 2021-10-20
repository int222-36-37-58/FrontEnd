import * as type from "../actiontype";

export const changeCurrentMenu = (current) => ({
  type: type.CURRENT_MENU_CLICKED,
  payload: {
    currentMenuClicked: current,
  },
});

export const clickedFilter = (val) => ({
  type: type.FILTER_CLICKED,
  payload: {
    filterClicked: val,
  },
});

export const clearFilter = () => ({
  type: type.CLEAR_FILTER,
});

export const openSearchModal = (open) => ({
  type: type.SEARCH_MODAL_HANDLE,
  payload: {
    searchModalShow: open,
  },
});

export const addResDialog = (content) => ({
  type: type.ADD_RES_DIALOG,
  payload: {
    dialogContent: {
      status: content.status,
      dialogContent: content.dialogContent,
    },
  },
});

export const removeResDialog = (ind) => ({
  type: type.REMOVE_RES_DIALOG,
  payload: {
    index: ind,
  },
});
