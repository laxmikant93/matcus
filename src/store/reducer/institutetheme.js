// Actions types for theme
import { INSTITUTE_THEME_ACTION_TYPES } from "../actions/institutetheme/actionTypes";

// Initials theme states
const INS_THEME_INITIAL_STATE = {
  activeTheme: "default",
  previewTheme: {},
  websiteThemeLoading:false,
  preview: {},
  default: {
    // bodyBg: "#306BFF",
    // textColor: "#141414",
    // headingTextColor: "#141414",
    // aTextColor: "#828282",
    // aHoverColor: "#0A0A0A",
    // btnBgColor: "#828282",
    // btnTextColor: "#0A0A0A",
    // btnBgHoverColor: "#0A0A0A",
    // btnTextHoverColor: "#FFFFFF",
    // headerBg: "#0A0A0A",
    // menuBg: "#0A0A0A",
    // menuTextColor: "#828282",
  },
  defaultThemes: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
  userThemes: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
  activedTheme: {},
  clonetheme: {},
  newCustomTheme: {},
  themeId: "",
  activeSidetheme: {},
  // default1: {
  //   bodyBg: "#C2185B",
  //   textColor: "#C2185B",
  //   headingTextColor: "#C2185B",
  //   aTextColor: "#C2185B",
  //   aHoverColor: "#C2185B",
  //   btnBgColor: "#C2185B",
  //   btnTextColor: "#C2185B",
  //   btnBgHoverColor: "#C2185B",
  //   btnTextHoverColor: "#C2185B",
  //   headerBg: "#ffffff",
  //   menuBg: "#ffffff",
  //   menuTextColor: "#146efa",
  // },
};

const institutetheme = (state = INS_THEME_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_UPDATE_THEME:
      return {
        ...state,
        clonetheme: {
          ...state.clonetheme,
          [payload.name]: payload.value,
        },
      };
    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_UPDATE_THEME_SKIN_EDIT:
      return {
        ...state,
        // clonetheme: state.clonetheme.filter((item) => {
        //   if (item._id === payload.themeId) {
        //     return item[payload.name] = payload.value;
        //   }
        // })
        clonetheme: { ...state.clonetheme, [payload.name]: payload.value },
      };

    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_UPDATE_THEME_VALUE:
      let nam = payload.name;
      return {
        ...state,
        clonetheme: {
          ...state.clonetheme,
          [[payload.name]]: {
            ...state.clonetheme[nam],
            [payload.name1]: payload.value,
          },
        },
      };

    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_CHANGE_THEME:
      return {
        ...state,
        activeTheme: payload,
      };

    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_ACTIVATE_THEME: {
      return {
        ...state,
        activedTheme: payload,
        default: payload.themevalue,
        websiteThemeLoading:false
      };
    }
    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_WEBSITE_ACTIVATE_THEME_LOADING: {
      return {
        ...state,
        websiteThemeLoading:true
      };
    }
    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_GET_PUBLIC_THEME: {
      return {
        ...state,
        activedTheme: payload,
        default: payload.themevalue,
      };
    }

    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_GET_DEFAULT_THEME: {
      return {
        ...state,
        default: payload,
        loaded: true,
        success: true,
      };
    }

    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_GET_DEFAULT_THEME_LOADING: {
      return {
        ...state,
        default: payload,
        loading: true,
      };
    }

    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_GET_USER_CUSTOME_THEME: {
      return {
        ...state,
        default: payload,
        loaded: true,
        success: true,
      };
    }

    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_GET_CUSTOM_THEME_LOADING: {
      return {
        ...state,
        default: payload,
        loading: true,
      };
    }

    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_DEFAULT_THEME: {
      return {
        ...state,
        defaultThemes: {
          ...state.defaultThemes,
          data: payload,
          loading: true,
          error: false,
          loaded: false,
          success: false,
        },
      };
    }

    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_USER_CUSTOME_THEME: {
      return {
        ...state,
        userThemes: {
          ...state.userThemes,
          data: payload,
          loading: true,
          error: false,
          loaded: false,
          success: false,
        },
      };
    }

    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_CLONE_DEFAULT_THEME: {
      return {
        ...state,
        userThemes: {
          ...state.userThemes,
          data: [payload.theme].concat(state.userThemes.data),
          loading: true,
          error: false,
          loaded: false,
          success: false,
        },
      };
    }

    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_CREATE_NEW_CUSTOM_THEME: {
      return {
        ...state,
        userThemes: {
          ...state.userThemes,
          data: [payload.theme].concat(state.userThemes.data),
          loading: true,
          error: false,
          loaded: false,
          success: false,
        },
      };
    }

    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_CLONE_THEME: {
      return {
        ...state,
        clonetheme: payload.theme,
      };
    }

    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_CREATE_NEW_CUSTOM_THEME_SAVE: {
      return {
        ...state,
        activeSidetheme: payload.theme,
        newCustomTheme: payload.theme,
      };
    }
    case INSTITUTE_THEME_ACTION_TYPES.EMPTY_CREATE_NEW_THEME: {
      return {
        ...state,
        newCustomTheme: payload,
      };
    }
    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_GET_USER_CUSTOME_THEME_EDIT: {
      return {
        ...state,
        clonetheme: payload,
      };
    }

    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_ACTIVATE_SIDE_THEME: {
      return {
        ...state,
        activeSidetheme: payload,
      };
    }

    // case INSTITUTE_THEME_ACTION_TYPES.ACTIVE_PREFERED_SIDE_PREVIEW: {
    //   return {
    //     ...state,
    //     activeSidetheme: state.defaultThemes.data.find((defaultTheme) => {
    //       return defaultTheme._id === payload && defaultTheme;
    //     }),
    //   };
    // }

    // case INSTITUTE_THEME_ACTION_TYPES.ACTIVE_CUSTOM_SIDE_PREVIEW: {
    //   return {
    //     ...state,
    //     activeSidetheme: state.userThemes.data.find((userTheme) => {
    //       return userTheme._id === payload && userTheme;
    //     }),
    //   };
    // }

    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_ACTIVATE_DEFAULT_THEME: {
      return {
        ...state,
        activedTheme: payload,
        default: payload.themevalue,
      };
    }
    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_ACTIVATE_CUSTOM_THEME: {
      return {
        ...state,
        activedTheme: payload,
        default: payload.themevalue,
      };
    }

    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_DELETE_CUSTOM_THEME: {
      return {
        ...state,
        userThemes: {
          ...state.userThemes,
          data: state.userThemes.data.filter((item) => {
            return item._id !== payload.themid;
          }),
          success: true,
        },
      };
    }

    case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_EDIT_CUSTOM_THEME: {
      return {
        ...state,
        userThemes: {
          ...state.userThemes,
          data: state.userThemes.data.filter((item) => {
            return item._id !== payload.themid;
          }),
          success: true,
        },
      };
    }

    // case INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_PREVIEW_DEFAULT_THEME: {
    //   return {
    //     ...state,
    //     previewTheme: payload,
    //     // preview: payload.themevalue,
    //   };
    // }

    case INSTITUTE_THEME_ACTION_TYPES.GET_SINGLGE_PREVIEW_THEME: {
      return {
        ...state,
        previewTheme: payload.data,
      };
    }

    case INSTITUTE_THEME_ACTION_TYPES.SET_THEME_SKIN_ID: {
      return {
        ...state,
        themeId: payload,
      };
    }

    case INSTITUTE_THEME_ACTION_TYPES.CLONE_THEME_EMPTY: {
      return {
        ...state,
        clonetheme: payload,
      };
    }

    case INSTITUTE_THEME_ACTION_TYPES.TEMPORARY_DISPLAY_PREFERED_SKIN_THEME: {
      return {
        ...state,
        activeSidetheme: state.defaultThemes.data.find((data) => {
          return data._id === payload && data;
          // if(data._id===payload)
          //  return data;
        }),
      };
    }
    case INSTITUTE_THEME_ACTION_TYPES.TEMPORARY_DISPLAY_CUSTOM_SKIN_THEME: {
      return {
        ...state,
        activeSidetheme: state.userThemes.data.find((data) => {
          return data._id === payload && data;
          // if (data._id === payload) return data;
        }),
      };
    }
    default:
      return state;
  }
};

export default institutetheme;
