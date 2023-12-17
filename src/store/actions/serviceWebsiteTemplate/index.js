import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { SERVICE_TEMPLATE_TYPES } from "./actionTypes";
import ServiceTemplateRequest from "./ServiceTemplateRequest";

export const editWebsiteTemplateSetting = (data) => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_SETTINGS_LOADING,
      payload: data,
    });
    ServiceTemplateRequest.post(
      ServiceTemplateRequest.templateEndpoint.editTemplate,
      data,
      (success) => {
        dispatch({
          type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_SETTINGS_SUCCESS,
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
export const updateDynamicWebsiteSettingsTemplate = (data) => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.UPDATE_DYNAMIC_SETTINGS_SERVICE_TEMPLATE,
      payload: data
    })
  }
}
export const resetEditWebsiteTemplateSetting = () => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_SETTINGS_RESET
    })
  }
}
export const editWebsiteTemplatePages = (data) => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_PAGES_LOADING,
      payload: data,
    });
    ServiceTemplateRequest.post(
      ServiceTemplateRequest.templateEndpoint.editTemplate,
      data,
      (success) => {
        dispatch({
          type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_PAGES_SUCCESS,
          payload: data,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const getSingleTemplateForServiceEdit = (userId,busId,industry,templateId,type,domain) => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_LOADING,
      loading: true,
    });
    ServiceTemplateRequest.get(
      ServiceTemplateRequest.templateEndpoint.getTemplateForEdit.replace("__OWNERID__", userId).replace("__BUSINESSID__",busId).replace("__INDUSTRY__",industry).replace("__TEMPLATEID__",templateId).replace("__QUERY__",type).replace("__VALUE__",domain),
      (success) => {
        let data = {
          
          ...success.data.ServiceData[0],
          themeGlobal:success.data.ServiceData[0].themeunwindData.theme[0],
          // contact_support:success.data.ServiceData.d.contact_support,
          // isOld:success.data.ServiceData.d.isOld,
          // type:success.data.ServiceData.d.type,
          // policyInfo:success.data.ServiceData.d.policyInfo
        }
        dispatch({
          type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_SUCCESS,
          payload: data,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}
// export const getSingleTemplateForEdit = (type, domain) => {
//   let data = {};
//   return (dispatch) => {
//     dispatch({
//       type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_LOADING,
//       loading: true,
//     });
//     ServiceTemplateRequest.get(
//       ServiceTemplateRequest.templateEndpoint.domainTemplate.replace("__QUERY__", type).replace("__VALUE__", domain),
//       (success) => {
//         dispatch({
//           type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_SUCCESS,
//           payload: success.data.data.data,
//         })
//       },
//       (error) => {
//         dispatch(setCommonError(error.message));
//       }
//     )
//   }
// }
export const resetSingleTemplateForEdit = (type, domain) => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_RESET,

    });

  }
}


export const getServicepreviewData = (owner, business, industry, template) => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_LOADING,
      loading: true,
    });
    ServiceTemplateRequest.get(
      ServiceTemplateRequest.templateEndpoint.getPreviewTemplate.replace("__OWNERID__", owner).replace("__BUSINESSID__", business).replace("__INDUSTRY__", industry).replace("__TEMPLATEID__", template),
      (success) => {
        let data = {
          
          ...success.data.ServiceData.data[0],
          themeGlobal:success.data.ServiceData.data[0].themeData.theme[0],
          // contact_support:success.data.ServiceData.d.contact_support,
          // isOld:success.data.ServiceData.d.isOld,
          // type:success.data.ServiceData.d.type,
          // policyInfo:success.data.ServiceData.d.policyInfo
        }
        dispatch({
          type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_SUCCESS,
          payload: data,
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
      type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_DOMAIN_LOADING,
      loading: true,
    });
    ServiceTemplateRequest.get(
      ServiceTemplateRequest.templateEndpoint.domainTemplate.replace("__QUERY__", type).replace("__VALUE__", domain),
      (success) => {
        dispatch({
          type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_DOMAIN_SUCCESS,
          payload: { data: success.data.data.data, isOld: success.data.isOld, type: success.data.type, status: success.data.data.status },
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const getDomainServiceRouteCheck = (item) => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_DOMAIN_CHECK,
      payload: item,
    });
  }
}


export const getGalleryAlbumData = (galleryId) => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.GET_GALLERY_ALBUM_LOADING,
    })
    ServiceTemplateRequest.get(
      ServiceTemplateRequest.templateEndpoint.getGalleryAlbum.replace("__GALLERYID__", galleryId),
      (success) => {
        dispatch({
          type: SERVICE_TEMPLATE_TYPES.GET_GALLERY_ALBUM_SUCCESS,
          payload: success.data,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const getGalleryAlbum = (instituteId, industry) => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.GET_GALLERY_LOADING
    })
    ServiceTemplateRequest.get(
      ServiceTemplateRequest.templateEndpoint.getGallery.replace("__InstituteId__", instituteId).replace("__INDUSTRY__", industry),
      (success) => {
        dispatch({
          type: SERVICE_TEMPLATE_TYPES.GET_GALLERY_SUCCESS,
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
      type: SERVICE_TEMPLATE_TYPES.SELECT_ROUTE_PREVIEW,
      payload: { item, preview }
    })
  }
}

export const setParamId = (item) => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.SET_PARAMS_ID,
      payload: item
    })
  }
}

export const updateDynamicWebsiteThemeTemplate = (data) => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.UPDATE_DYNAMIC_SERVICE_TEMPLATE,
      payload: data
    })
  }
}

export const getSingleService = (body) => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.GET_SERVICE_DETAIL_LOADING
    })
    ServiceTemplateRequest.post(
      ServiceTemplateRequest.templateEndpoint.getServiceDetails, body,
      (success) => {
        dispatch({
          type: SERVICE_TEMPLATE_TYPES.GET_SERVICE_DETAIL_SUCCESS,
          payload: success.data.data.data,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const getSingleFaculty = (_id) => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.GET_FACULTY_DETAIL_LOADING
    })
    ServiceTemplateRequest.get(
      ServiceTemplateRequest.templateEndpoint.getFacultyDetails.replace("__FACULTYID__", _id),
      (success) => {
        dispatch({
          type: SERVICE_TEMPLATE_TYPES.GET_FACULTY_DETAIL_SUCCESS,
          payload: success.data,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const getAllServiceOfSingleCategory = (category,BusinessId) =>{
  return(dispatch) =>{
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.GET_CATEGORY_DETAIL_LOADING
    })
    ServiceTemplateRequest.get(
      ServiceTemplateRequest.templateEndpoint.getCategoryDetails.replace("_CATEGORYID_", category).replace("__BUSINESSID__",BusinessId),
      (success)=> {
        dispatch({
          type: SERVICE_TEMPLATE_TYPES.GET_CATEGORY_DETAIL_SUCCESS,
          payload:success.data.data
        })
      },
      (error)=>{
        dispatch(setCommonError(error.message))
      }
    )
  }
}


export const getAllServiceOfCategory = (businessId,OwnerId) =>{
  // console.log(businessId,OwnerId,"line280")
  return(dispatch) =>{
    // dispatch({
    //   type: SERVICE_TEMPLATE_TYPES.GET_ALLSERVICES_OF_CATEGORY_LOADING
    // })
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.GET_CATEGORY_DETAIL_LOADING
    })
    ServiceTemplateRequest.get(
      ServiceTemplateRequest.templateEndpoint.getAllServicesOfCategory.replace("_BUSINESSID_", businessId).replace("_OWNERID_",OwnerId),
      (success)=> {
        dispatch({
          type: SERVICE_TEMPLATE_TYPES.GET_CATEGORY_DETAIL_SUCCESS,
          payload:success.data.data
        })
        // dispatch({
        //   type: SERVICE_TEMPLATE_TYPES.GET_ALLSERVICES_OF_CATEGORY_SUCCESS,
        //   payload:success.data.data
        // })
        // console.log(success.data.data,"line280")
      },
      (error)=>{
        dispatch(setCommonError(error.message))
      }
    )
  }
}


export const SingleCategorieData = (category,BusinessId) =>{
  // console.log(businessId,OwnerId,"line280")
  return(dispatch) =>{
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.GET_SINGLE_CATEGORY_LOADING
    })
    ServiceTemplateRequest.get(
      ServiceTemplateRequest.templateEndpoint.getSingleOfCategory.replace("_CATEGORYID_", category).replace("__BUSINESSID__",BusinessId),
      (success)=> {
        dispatch({
          type: SERVICE_TEMPLATE_TYPES.GET_SINGLE_CATEGORY_SUCCESS,
          payload:success.data.data[0]
        })
      },
      (error)=>{
        dispatch(setCommonError(error.message))
      }
    )
  }
}


export const createWebsiteTemplateUserTheme = (data) => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_CREATE_USER_THEME_LOADING,
      loading: true,
    });
    ServiceTemplateRequest.post(
      ServiceTemplateRequest.templateEndpoint.createTemplateUser,
      data,
      (success) => {
        dispatch({
          type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_CREATE_USER_THEME_SUCCESS,
          payload: {...success.data.ServiceData.data,themeGlobal:data.theme},
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
      type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_CREATE_USER_THEME_RESET,
    });
  }
}

export const getSelectedTemplateData = (industryId, industry, theme, owner, template, type) => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_SELECTED_THEME_LOADING
    })
    ServiceTemplateRequest.get(
      ServiceTemplateRequest.templateEndpoint.getSelectedTemplate.replace("__BUSINESSID__", industryId).replace("__INDUSTRY__", industry).replace("__THEMEID__", theme).replace("__OWNERID__", owner).replace("__TEMPLATEID__", template).replace("__TYPE__", type),
      (success) => {
        dispatch({
          type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_SELECTED_THEME_SUCCESS,
          payload: {...success.data.ServiceData.data,themeGlobal:success.data.ServiceData.data.themeData.theme[0]},
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
      type: SERVICE_TEMPLATE_TYPES.DELETE_USER_TEMPLATE_LOADING,
      payload: []
    })
    ServiceTemplateRequest.post(
      ServiceTemplateRequest.templateEndpoint.deleteUserTemplate, data,
      (success) => {
        dispatch({
          type: SERVICE_TEMPLATE_TYPES.DELETE_USER_TEMPLATE_SUCCESS,
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
      type: SERVICE_TEMPLATE_TYPES.ACTIVATE_SERVICE_TEMPLATE_LOADING,
    })
    ServiceTemplateRequest.post(
      ServiceTemplateRequest.templateEndpoint.activateTemplateUser, data,
      (success) => {
        dispatch({
          type: SERVICE_TEMPLATE_TYPES.ACTIVATE_SERVICE_TEMPLATE_SUCCESS,
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
      type: SERVICE_TEMPLATE_TYPES.ACTIVATE_SERVICE_TEMPLATE_RESET,
    })

  }
}
export const resetCreateWebsiteTemplate = () => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_CREATE_RESET
    })
  }
}
export const editWebsiteTemplateTheme = (data) => {
  return (dispatch) => {
    dispatch({
      type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_THEME_LOADING,
      loading: true,
    });
    ServiceTemplateRequest.post(
      ServiceTemplateRequest.templateEndpoint.editTemplate,
      data,
      (success) => {
        dispatch({
          type: SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_THEME_SUCCESS,
          payload:  {...success.data.data,themeGlobal:success.data.data.themeData.theme[0]},
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}