import { GOOGLE_FONTS_STATE_ACTION_TYPES } from "../actions/googleFonts/actionTypes";
import googlefonts  from "../actions/googleFonts/googleFonts.json";

const FONTS_INIT_STATE = {
  list: googlefonts.googlefonts,
  states: [],
};

const googleFonts = (state = FONTS_INIT_STATE, { type, payload }) => {
  switch (type) {
    case GOOGLE_FONTS_STATE_ACTION_TYPES.GET_GOOGLE_fONTS:
      const fontItem = state.list.find(
        (fontsname) => fontsname.fontname === payload
      );
      const stateList =
        fontItem && fontItem.states.length > 0 ? fontItem.states : [];
      return {
        ...state,
        states: stateList,
      };

    default:
      return state;
  }
};
export default googleFonts;
