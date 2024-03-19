import {
  SET_LAYOUT_SEARCH_OPEN,
  SET_LAYOUT_CART_OPEN,
  SET_LAYOUT_RESET,
  SET_LAYOUT_MENU_OPEN,
} from "./../constants/LayoutConstants";

export const setLayoutReducer = (state = { result: "" }, action) => {
  switch (action.type) {
    case SET_LAYOUT_SEARCH_OPEN:
      return { result: "search" };
    case SET_LAYOUT_CART_OPEN:
      return { result: "cart" };
    case SET_LAYOUT_MENU_OPEN:
      return { result: "menu" };
    case SET_LAYOUT_RESET:
      return { result: "" };
    default:
      return state;
  }
};
