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
