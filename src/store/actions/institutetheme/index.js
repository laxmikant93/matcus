import { INSTITUTE_THEME_ACTION_TYPES } from "./actionTypes";
import instituteThemeRequest from "./instituteThemeRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const changeTheme = (themeName) => {
  return (dispatch) => {
    dispatch({
      type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_CHANGE_THEME,
      payload: themeName,
    });
  };
};

export const changeThemeProperty = (property, value, theme_id) => {
  return (dispatch) => {
    if (theme_id) {
      dispatch({
        type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_UPDATE_THEME_SKIN_EDIT,
        payload: { name: property, value, themeId: theme_id },
      });
    } else {
      dispatch({
        type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_UPDATE_THEME,
        payload: { name: property, value },
      });
    }
  };
};

export const changeThemePropertySize = (property1, property2, value) => {
  return (dispatch) => {

    dispatch({
      type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_UPDATE_THEME_VALUE,
      payload: { name: property1, name1: property2, value },
    });
  };
};

export const getAllDefaultsTheme = () => {
  return (dispatch) => {
    instituteThemeRequest.get(
      instituteThemeRequest.instituteThemeEndPoint.getDefaultsThemes,
      (success) => {
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_DEFAULT_THEME,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getDefaultTheme = (themid) => {
  return (dispatch) => {
    dispatch({
      type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_GET_DEFAULT_THEME_LOADING,
      payload: [],
    });
    instituteThemeRequest.get(
      instituteThemeRequest.instituteThemeEndPoint.getDefaultTheme.replace(
        "_id_",
        themid
      ),
      (success) => {
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_GET_DEFAULT_THEME,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getPublicTheme = (themid) => {
  return (dispatch) => {
    instituteThemeRequest.get(
      instituteThemeRequest.instituteThemeEndPoint.getPublicTheme.replace(
        "_id_",
        themid
      ),
      (success) => {
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_GET_PUBLIC_THEME,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getCustomTheme = (themid) => {
  return (dispatch) => {
    dispatch({
      type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_GET_CUSTOM_THEME_LOADING,
      payload: [],
    });
    instituteThemeRequest.get(
      instituteThemeRequest.instituteThemeEndPoint.getUserCustomeTheme.replace(
        "__ID__",
        themid
      ),
      (success) => {
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_GET_USER_CUSTOME_THEME,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getCustomThemeEdit = (themid, inst) => {
  return (dispatch) => {
    dispatch({
      type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_GET_CUSTOM_THEME_LOADING,
      payload: [],
    });
    instituteThemeRequest.get(
      instituteThemeRequest.instituteThemeEndPoint.getUserCustomeTheme.replace(
        "__ID__",
        inst
      ),
      (success) => {
        let data =
          success.data && success.data.filter((item) => item._id === themid);
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_GET_USER_CUSTOME_THEME_EDIT,
          payload: data.length > 0 ? data[0] : [],
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getAllUserCustomeTheme = (id) => {
  return (dispatch) => {
    instituteThemeRequest.get(
      instituteThemeRequest.instituteThemeEndPoint.getUserCustomeTheme.replace(
        "__ID__",
        id
      ),
      (success) => {
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_USER_CUSTOME_THEME,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getActivateTheme = (userId) => {
  return (dispatch) => {
    // dispatch({
    //   type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_PREVIEW_DEFAULT_THEME,
    //   payload: {},
    // });

    instituteThemeRequest.get(
      instituteThemeRequest.instituteThemeEndPoint.getActivateThemes.replace(
        "_id_",
        userId
      ),
      (success) => {
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_ACTIVATE_THEME,
          payload: success.data,
        });
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_ACTIVATE_SIDE_THEME,
          payload: success.data.themevalue,
        });
      },

      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getActivateWebsiteTheme = (domain,type) => {
  return (dispatch) => {
    dispatch({
      type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_WEBSITE_ACTIVATE_THEME_LOADING,
      payload: {},
    });
    if(type==="privateDomain"){
      instituteThemeRequest.get(
        instituteThemeRequest.instituteThemeEndPoint.getActivePrivateDomainTheme.replace(
          "_id_",
          domain
        ),
        (success) => {
          dispatch({
            type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_ACTIVATE_THEME,
            payload: success.data,
          });
          dispatch({
            type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_ACTIVATE_SIDE_THEME,
            payload: success.data.themevalue,
          });
        },
  
        (error) => {
          dispatch(setCommonError(error.message));
        }
      );
    }else{
      instituteThemeRequest.get(
        instituteThemeRequest.instituteThemeEndPoint.getActiveSubDomainTheme.replace(
          "_id_",
          domain
        ),
        (success) => {
          dispatch({
            type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_ACTIVATE_THEME,
            payload: success.data,
          });
          dispatch({
            type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_ACTIVATE_SIDE_THEME,
            payload: success.data.themevalue,
          });
        },
  
        (error) => {
          dispatch(setCommonError(error.message));
        }
      );
    }
    
  };
};
export const activateDefaultTheme = (userId, themeid) => {
  let data = { themeid: themeid };
  return (dispatch) => {
    instituteThemeRequest.patch(
      instituteThemeRequest.instituteThemeEndPoint.activateDefaultTheme.replace(
        "_id_",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_ACTIVATE_DEFAULT_THEME,
          payload: success.data,
        });
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_ACTIVATE_SIDE_THEME,
          payload: success.data.themevalue,
        });
        dispatch(showSuccessPopup("skin theme activated successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// export const activePreferredSideTheme = (themeId) => {
//   return (dispatch ) => {
//     dispatch({
//       type: INSTITUTE_THEME_ACTION_TYPES.ACTIVE_PREFERED_SIDE_PREVIEW,
//       payload: themeId
//     })
//   }
// }

// export const activeCustomSideTheme = (themeId) => {
//   return (dispatch ) => {
//     dispatch({
//       type: INSTITUTE_THEME_ACTION_TYPES.ACTIVE_CUSTOM_SIDE_PREVIEW,
//       payload: themeId
//     })
//   }
// }

export const activateCustomTheme = (userId, themeid) => {
  let data = { themeid: themeid };
  return (dispatch) => {
    instituteThemeRequest.patch(
      instituteThemeRequest.instituteThemeEndPoint.activateCustomTheme.replace(
        "_id_",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_ACTIVATE_CUSTOM_THEME,
          payload: success.data,
        });
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_ACTIVATE_SIDE_THEME,
          payload: success.data.themevalue,
        });
        dispatch(showSuccessPopup("skin theme activated successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteCustomTheme = (userId, themeid) => {
  let data = { themid: themeid };
  return (dispatch) => {
    instituteThemeRequest.patch(
      instituteThemeRequest.instituteThemeEndPoint.deleteCustomTheme.replace(
        "_id_",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_DELETE_CUSTOM_THEME,
          payload: data,
        });
        dispatch(showSuccessPopup("skin theme deleted successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const editCustomTheme = (id, data) => {
  return (dispatch) => {
    instituteThemeRequest.patch(
      instituteThemeRequest.instituteThemeEndPoint.editCustomTheme.replace(
        "_id_",
        id
      ),
      data,
      (success) => {
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_EDIT_CUSTOM_THEME,
          payload: data,
        });
        dispatch(showSuccessPopup("skin theme edit successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const cloneDefaultTheme = (userId, themeid) => {
  let data = { defaultskinid: themeid };
  return (dispatch) => {
    instituteThemeRequest.post(
      instituteThemeRequest.instituteThemeEndPoint.cloneDefaultTheme.replace(
        "_id_",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_CLONE_DEFAULT_THEME,
          payload: success.data,
        });
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_CLONE_THEME,
          payload: success.data,
        });
        dispatch(showSuccessPopup("skin theme activated successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const createNewCustomTheme = (userId, data) => {
  return (dispatch) => {
    instituteThemeRequest.post(
      instituteThemeRequest.instituteThemeEndPoint.createCustomTheme.replace(
        "_id_",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_CREATE_NEW_CUSTOM_THEME,
          payload: success.data,
        });
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_CREATE_NEW_CUSTOM_THEME_SAVE,
          payload: success.data,
        });

        dispatch(showSuccessPopup(" Successfully created new custom theme"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const previewDefaultTheme = (themeid) => {
  return (dispatch) => {
    instituteThemeRequest.get(
      instituteThemeRequest.instituteThemeEndPoint.previewDefaultThemes.replace(
        "_themeid_",
        themeid
      ),
      (success) => {
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_PREVIEW_DEFAULT_THEME,
          payload: success.data,
        });
        // dispatch({
        //   type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_CHANGE_THEME,
        //   payload: "default",
        // });
        // dispatch(showSuccessPopup("skin theme activated successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getSingleThemeOnPreview = (themeid, skinType) => {
  return (dispatch) => {
    instituteThemeRequest.get(
      instituteThemeRequest.instituteThemeEndPoint.getSingleThemeOnPreview
        .replace("_THEMEID_", themeid)
        .replace("__TYPE__", skinType),
      (success) => {
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.GET_SINGLGE_PREVIEW_THEME,
          payload: success,
        });
        // dispatch(showSuccessPopup("skin theme activated successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const previewCustomeTheme = (insId, customThemeId) => {
  return (dispatch) => {
    instituteThemeRequest.get(
      instituteThemeRequest.instituteThemeEndPoint.previewCustomeTheme.replace(
        "_INSID_",
        insId
      ),
      (success) => {
        const filteredTheme = success.data.find((item) => {
          return item._id === customThemeId && item;
        });
        dispatch({
          type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_PREVIEW_DEFAULT_THEME,
          payload: filteredTheme,
        });
        // dispatch({
        //   type: INSTITUTE_THEME_ACTION_TYPES.INSTITUTE_CHANGE_THEME,
        //   payload: "custom",
        // });
        // dispatch(showSuccessPopup("skin theme activated successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const setThemeId = (themeid) => {
  return (dispatch) => {
    dispatch({
      type: INSTITUTE_THEME_ACTION_TYPES.SET_THEME_SKIN_ID,
      payload: themeid,
    });
  };
};

export const cloneThemeEmpty = () => {
  return (dispatch) => {
    dispatch({
      type: INSTITUTE_THEME_ACTION_TYPES.CLONE_THEME_EMPTY,
      payload: {},
    });
  };
};
export const emptyNewCustomTheme=()=>{
  return (dispatch)=>{
    dispatch({
      type:INSTITUTE_THEME_ACTION_TYPES.EMPTY_CREATE_NEW_THEME,
      payload:[]
    });
  }
}

export const TemporaryDisplayPreffredTHeme=(id)=>{
  return (dispatch)=>{
    dispatch({
      type:INSTITUTE_THEME_ACTION_TYPES.TEMPORARY_DISPLAY_PREFERED_SKIN_THEME,
      payload:id
    });
  }
}
export const TemporaryDisplayCustomTHeme=(id)=>{
  return (dispatch)=>{
    dispatch({
      type:INSTITUTE_THEME_ACTION_TYPES.TEMPORARY_DISPLAY_CUSTOM_SKIN_THEME,
      payload:id
    });
  }
}