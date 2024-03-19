import {
  SET_LAYOUT_SEARCH_OPEN,
  SET_LAYOUT_CART_OPEN,
  SET_LAYOUT_RESET,
  SET_LAYOUT_MENU_OPEN,
} from "./../constants/LayoutConstants";

export const setLayoutSearchActions = () => (dispatch) => {
  dispatch({
    type: SET_LAYOUT_SEARCH_OPEN,
  });
};

export const setLayoutCartActions = () => (dispatch) => {
  dispatch({
    type: SET_LAYOUT_CART_OPEN,
  });
};

export const setLayoutMenuActions = () => (dispatch) => {
  dispatch({
    type: SET_LAYOUT_MENU_OPEN,
  });
};

export const setLayoutResetActions = () => (dispatch) => {
  dispatch({
    type: SET_LAYOUT_RESET,
  });
};
