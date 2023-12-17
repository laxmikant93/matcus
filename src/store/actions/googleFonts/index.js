import { GOOGLE_FONTS_STATE_ACTION_TYPES } from "./actionTypes";

export const findFont = (fontName) => {
  return (dispatch) => {
    dispatch({
      type: GOOGLE_FONTS_STATE_ACTION_TYPES.GET_GOOGLE_fONTS,
      payload: fontName,
    });
  };
};
