import { setCommonError } from "../commonerror";
import { WEBSITE_TEMPLATE_TYPES } from "./actionTypes";
import WebsiteTemplateRequest from "./WebsiteTemplateRequest";

import { showSuccessPopup } from "../successmessagepopup";
export const getTemplateList = (industry) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_LIST_LOADING,
      loading: true,
    });
    WebsiteTemplateRequest.get(
      WebsiteTemplateRequest.templateEndpoint.templateList.replace("__INDUSTRY__", industry),
      (success) => {
        
        dispatch({
          type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_LIST_SUCCESS,
          payload: industry==="LMS"? success.data.data:success.data.ServiceData.data,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const createWebsiteTemplate = (data,industry) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_CREATE_LOADING,
      loading: true,
    });
    WebsiteTemplateRequest.post(
      WebsiteTemplateRequest.templateEndpoint.createTemplate,
      data,
      (success) => {
        dispatch({
          type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_CREATE_SUCCESS,
          payload: industry==="LMS"?success.data.data:success.data.ServiceData.data,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}
export const resetCreateWebsiteTemplate = () => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_CREATE_RESET
    })
  }
}


export const editWebsiteTemplateSetting = (data) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_SETTINGS_LOADING,
      payload: data,
    });
    WebsiteTemplateRequest.post(
      WebsiteTemplateRequest.templateEndpoint.editTemplate,
      data,
      (success) => {
        dispatch({
          type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_SETTINGS_SUCCESS,
          payload: data,
        })
        dispatch(showSuccessPopup("Settings Updated."))
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}
export const resetEditWebsiteTemplateSetting = () => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_SETTINGS_RESET
    })
  }
}

export const editWebsiteTemplateTheme = (data) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_THEME_LOADING,
      loading: true,
    });
    WebsiteTemplateRequest.post(
      WebsiteTemplateRequest.templateEndpoint.editTemplate,
      data,
      (success) => {
        dispatch({
          type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_THEME_SUCCESS,
          payload: success.data.data,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const updateDynamicWebsiteThemeTemplate = (data) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.UPDATE_DYNAMIC_WEBSITE_TEMPLATE,
      payload: data
    })
  }
}

export const updateDynamicWebsiteSettingsTemplate = (data) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.UPDATE_DYNAMIC_SETTINGS_WEBSITE_TEMPLATE,
      payload: data
    })
  }
}

export const createWebsiteTemplateUserTheme = (data) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_CREATE_USER_THEME_LOADING,
      loading: true,
    });
    WebsiteTemplateRequest.post(
      WebsiteTemplateRequest.templateEndpoint.createTemplateUser,
      data,
      (success) => {
        dispatch({
          type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_CREATE_USER_THEME_SUCCESS,
          payload: success.data.data,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const resetCreateWebsiteTemplateUserTheme = (data) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_CREATE_USER_THEME_RESET,
    });
  }
}
export const editWebsiteTemplatePages = (data) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_PAGES_LOADING,
      payload: data,
    });
    WebsiteTemplateRequest.post(
      WebsiteTemplateRequest.templateEndpoint.editTemplate,
      data,
      (success) => {
        dispatch({
          type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_PAGES_SUCCESS,
          payload: data,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}
export const getSingleTemplateForEdit = (owner, business, industry, template) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_LOADING,
      loading: true,
    });
    WebsiteTemplateRequest.get(
      WebsiteTemplateRequest.templateEndpoint.getTemplateForEdit.replace("__OWNERID__", owner).replace("__BUSINESSID__", business).replace("__INDUSTRY__", industry).replace("__TEMPLATEID__", template),
      (success) => {
        dispatch({
          type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_SUCCESS,
          payload: success.data.data,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const resetSingleTemplateForEdit = () => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_RESET
    })
  }
}
export const getpreviewData = (owner, business, industry, template) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_LOADING,
      loading: true,
    });
    WebsiteTemplateRequest.get(
      WebsiteTemplateRequest.templateEndpoint.getPreviewTemplate.replace("__OWNERID__", owner).replace("__BUSINESSID__", business).replace("__INDUSTRY__", industry).replace("__TEMPLATEID__", template),
      (success) => {
        dispatch({
          type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_SUCCESS,
          payload: success.data.data,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const getWebsiteDomainTemplate = (type, domain) => {
  let data = {};
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_DOMAIN_LOADING,
      loading: true,
    });
    WebsiteTemplateRequest.post(
      WebsiteTemplateRequest.templateEndpoint.domainTemplate.replace("__QUERY__", type).replace("__VALUE__", domain), data,
      (success) => {
        dispatch({
          type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_DOMAIN_SUCCESS,
          payload: { data: success.data.data.data, isOld: success.data.isOld, type: success.data.type, contact_support: success.data.contact_support },
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const getDomainRouteCheck = (item) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_DOMAIN_CHECK,
      payload: item,
    });
  }
}
export const getSelectedTemplateData = (industryId, industry, theme, owner, template, type) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_SELECTED_THEME_LOADING
    })
    WebsiteTemplateRequest.get(
      WebsiteTemplateRequest.templateEndpoint.getSelectedTemplate.replace("__BUSINESSID__", industryId).replace("__INDUSTRY__", industry).replace("__THEMEID__", theme).replace("__OWNERID__", owner).replace("__TEMPLATEID__", template).replace("__TYPE__", type),
      (success) => {
        dispatch({
          type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_SELECTED_THEME_SUCCESS,
          payload: success.data.data,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const getUserTemplates = (owner, business, industry) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_GET_USER_TEMPLATES_LOADING,
    })
    WebsiteTemplateRequest.get(
      WebsiteTemplateRequest.templateEndpoint.getUserTemplates.replace("__OWNERID__", owner).replace("__TYPE__","institute").replace("__BUSINESSID__", business).replace("__INDUSTRY__", industry),
      (success) => {
        dispatch({
          type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_GET_USER_TEMPLATES_SUCCESS,
          payload: industry==="LMS"? success.data.data:success.data.ServiceData.data,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}
export const deleteUserTemplate = (data) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.DELETE_USER_TEMPLATE_LOADING,
      payload: []
    })
    WebsiteTemplateRequest.post(
      WebsiteTemplateRequest.templateEndpoint.deleteUserTemplate, data,
      (success) => {
        dispatch({
          type: WEBSITE_TEMPLATE_TYPES.DELETE_USER_TEMPLATE_SUCCESS,
          payload: data,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const activateWebsiteTemplate = (data) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.ACTIVATE_WEBSITE_TEMPLATE_LOADING,
    })
    WebsiteTemplateRequest.post(
      WebsiteTemplateRequest.templateEndpoint.activateTemplateUser, data,
      (success) => {
        dispatch({
          type: WEBSITE_TEMPLATE_TYPES.ACTIVATE_WEBSITE_TEMPLATE_SUCCESS,
          payload: success.data.data,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}
export const resetActivateWebsiteTemplate = (data) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.ACTIVATE_WEBSITE_TEMPLATE_RESET,
    })

  }
}

export const getGalleryAlbumData = (galleryId) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.GET_GALLERY_ALBUM_LOADING,
    })
    WebsiteTemplateRequest.get(
      WebsiteTemplateRequest.templateEndpoint.getGalleryAlbum.replace("__GALLERYID__", galleryId),
      (success) => {
        dispatch({
          type: WEBSITE_TEMPLATE_TYPES.GET_GALLERY_ALBUM_SUCCESS,
          payload: success.data,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const getGalleryAlbum = (instituteId) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.GET_GALLERY_LOADING
    })
    WebsiteTemplateRequest.get(
      WebsiteTemplateRequest.templateEndpoint.getGallery.replace("__InstituteId__", instituteId),
      (success) => {
        dispatch({
          type: WEBSITE_TEMPLATE_TYPES.GET_GALLERY_SUCCESS,
          payload: success.data.gallery,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const selectRouteForPreview = (item, preview) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.SELECT_ROUTE_PREVIEW,
      payload: { item, preview }
    })
  }
}
export const pushDropDown = (item,section,secitonTile) => {
  return (dispatch) => {
    dispatch({
      type: WEBSITE_TEMPLATE_TYPES.GET_VALUE_PUSH,
      payload: {data:item,section:section,secitonTile:secitonTile}
    })
  }
}