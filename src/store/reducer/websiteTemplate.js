import { WEBSITE_TEMPLATE_TYPES } from "../actions/WebsiteTemplate/actionTypes";

const WEBSITE_TEMPLATE_INITIAL_STATE = {
  create: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  list: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  userTemplatesList: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  getTemplate: {
    data: [],
    loading: false,
    success: false,
    error: false,
    status: "",
    firstTimeSuccess: false,
    policy_info: "",
    contact_support: "",
    domainChecked: false
  },
  galleryAlbum: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  activateTemplate: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  edit: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  gallery: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  deleteUserTemplate: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  pushDropDown: {
    data: null,
    section: null,
    secitonTile: null
  },
  route: "/",
  preview: false,
};

const websiteTemplate = (state = WEBSITE_TEMPLATE_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_CREATE_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_CREATE_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_CREATE_ERROR:
      return {
        ...state,
        create: {
          ...state.create,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_CREATE_RESET:
      return {
        ...state,
        create: {
          ...state.create,
          data: [],
          loading: false,
          success: false,
          error: false
        },
      };


    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_LIST_LOADING:
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_LIST_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_LIST_ERROR:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: false,
          success: false,
          error: true
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_LIST_RESET:
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: false,
          success: false,
          error: false
        },
      };
    case WEBSITE_TEMPLATE_TYPES.DELETE_USER_TEMPLATE_LOADING: {
      return {
        ...state,
        deleteUserTemplate: {
          ...state.deleteUserTemplate,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      }
    }
    case WEBSITE_TEMPLATE_TYPES.DELETE_USER_TEMPLATE_SUCCESS: {
      return {
        ...state,
        deleteUserTemplate: {
          ...state.deleteUserTemplate,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        userTemplatesList: {
          ...state.userTemplatesList,
          data: state.userTemplatesList.data.filter((item) => item._id !== payload.templateID),
          loading: false,
          success: true,
          error: false
        }
      }
    }
    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_LOADING:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_SUCCESS:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_ERROR:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_RESET:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: [],
          loading: false,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_SETTINGS_LOADING:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_SETTINGS_SUCCESS:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getTemplate: {
          ...state.getTemplate,
          data: {
            ...state.getTemplate.data,
            instituteData: {
              ...state.getTemplate.data.instituteData,
              institute_logo: payload.sitesettings.institute_logo,
              buisness_logo: payload.sitesettings.buisness_logo,
              business_name: payload.sitesettings.business_name,
              institute_name: payload.sitesettings.institute_name,
              favIcon: payload.sitesettings.favIcon,
              showBusinessName: payload.sitesettings.showBusinessName
            },
          },
          loading: false,
          success: true,
          error: false
        }
      };
    case WEBSITE_TEMPLATE_TYPES.UPDATE_DYNAMIC_SETTINGS_WEBSITE_TEMPLATE:
      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: {
            ...state.getTemplate.data,
            instituteData: {
              ...state.getTemplate.data.instituteData,
              institute_logo: payload.sitesettings.institute_logo,
              institute_name: payload.sitesettings.institute_name,
              favIcon: payload.sitesettings.favIcon,
              showBusinessName: payload.sitesettings.showBusinessName
            },
          },
          loading: false,
          success: true,
          error: false
        }
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_SETTINGS_ERROR:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_SETTINGS_RESET:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: [],
          loading: false,
          success: false,
          error: false
        },

      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_PAGES_LOADING:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_PAGES_SUCCESS:
      if (payload.sectionHide && payload.sectionHide.homeSectionHideData) {
        return {
          ...state,
          edit: {
            ...state.edit,
            data: payload,
            loading: false,
            success: true,
            error: false
          },
          getTemplate: {
            ...state.getTemplate,
            data: {
              ...state.getTemplate.data,
              homecomponenthideData: [
                ...state.getTemplate.data.homecomponenthideData.map((item) => {
                  return {
                    ...item,
                    homeSectionHideData: payload.sectionHide.homeSectionHideData
                  }
                })
              ]
            },
            loading: false,
            success: true,
            error: false
          }
        };
      } else if (payload.sectionHide && payload.sectionHide.aboutSectionHideData) {
        return {
          ...state,
          edit: {
            ...state.edit,
            data: payload,
            loading: false,
            success: true,
            error: false
          },
          getTemplate: {
            ...state.getTemplate,
            data: {
              ...state.getTemplate.data,
              homecomponenthideData: state.getTemplate.data.homecomponenthideData.map((item) => {
                return {
                  ...item,
                  aboutSectionHide: payload.sectionHide.aboutSectionHide,
                  aboutSectionHideData: payload.sectionHide.aboutSectionHideData
                }
              }),
              dynamicHeaderData: {
                ...state.getTemplate.data.dynamicHeaderData,
                dynamic_header: payload.dynamic_header.dynamic_header,
              },


            },
            loading: false,
            success: true,
            error: false
          }
        };
      } else {
        return {
          ...state,
          edit: {
            ...state.edit,
            data: payload,
            loading: false,
            success: true,
            error: false
          },
          getTemplate: {
            ...state.getTemplate,
            data: {
              ...state.getTemplate.data,
              dynamicHeaderData: {
                ...state.getTemplate.data.dynamicHeaderData,
                dynamic_header: payload.dynamic_header.dynamic_header,
              },
            },
            loading: false,
            success: true,
            error: false
          }
        };
      }


    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_PAGES_ERROR:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_PAGES_RESET:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: [],
          loading: false,
          success: false,
          error: false
        },

      };


    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_THEME_LOADING:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_THEME_SUCCESS:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getTemplate: {
          ...state.getTemplate,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      }


    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_THEME_ERROR:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_EDIT_THEME_RESET:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: [],
          loading: false,
          success: false,
          error: false
        },

      };


    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_CREATE_USER_THEME_LOADING:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_CREATE_USER_THEME_SUCCESS:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getTemplate: {
          ...state.getTemplate,
          data: {
            ...state.getTemplate.data,
            ...payload
          },
          loading: false,
          success: true,
          error: false
        }
      }
    case WEBSITE_TEMPLATE_TYPES.UPDATE_DYNAMIC_WEBSITE_TEMPLATE:
      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: {
            ...state.getTemplate.data,
            ...payload
          },
          loading: false,
          success: true,
          error: false
        }
      }

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_CREATE_USER_THEME_ERROR:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_CREATE_USER_THEME_RESET:
      return {
        ...state,
        edit: {
          ...state.edit,
          data: [],
          loading: false,
          success: false,
          error: false
        },

      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_LOADING:
      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_SUCCESS: {

      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: payload,
          loading: false,
          success: true,
          firstTimeSuccess: true,
          error: false
        },
      };
    }
    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_ERROR:
      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: payload,
          loading: false,
          success: false,
          error: true
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_RESET:
      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: [],
          loading: false,
          success: false,
          error: false,
          firstTimeSuccess: false,
        },
      };


    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_SELECTED_THEME_LOADING:
      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: { ...state.getTemplate.data },
          loading: true,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_SELECTED_THEME_SUCCESS:
      return {
        ...state,
        getTemplate: {
          data: payload,
          loading: false,
          success: true,
          error: false,
          firstTimeSuccess: true
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_SELECTED_THEME_ERROR:
      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: payload,
          loading: false,
          success: false,
          error: true
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_SELECTED_THEME_RESET:
      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: [],
          loading: false,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_GET_USER_TEMPLATES_LOADING:
      return {
        ...state,
        userTemplatesList: {
          ...state.userTemplatesList,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_GET_USER_TEMPLATES_SUCCESS:
      return {
        ...state,
        userTemplatesList: {
          ...state.userTemplatesList,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_GET_USER_TEMPLATES_ERROR:
      return {
        ...state,
        userTemplatesList: {
          ...state.userTemplatesList,
          data: payload,
          loading: false,
          success: false,
          error: true
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_GET_USER_TEMPLATES_RESET:
      return {
        ...state,
        userTemplatesList: {
          ...state.userTemplatesList,
          data: [],
          loading: false,
          success: false,
          error: false
        },
      };


    case WEBSITE_TEMPLATE_TYPES.ACTIVATE_WEBSITE_TEMPLATE_LOADING:
      return {
        ...state,
        activateTemplate: {
          ...state.activateTemplate,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.ACTIVATE_WEBSITE_TEMPLATE_SUCCESS:
      return {
        ...state,
        activateTemplate: {
          ...state.activateTemplate,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.ACTIVATE_WEBSITE_TEMPLATE_ERROR:
      return {
        ...state,
        activateTemplate: {
          ...state.activateTemplate,
          data: payload,
          loading: false,
          success: false,
          error: true
        },
      };

    case WEBSITE_TEMPLATE_TYPES.ACTIVATE_WEBSITE_TEMPLATE_RESET:
      return {
        ...state,
        activateTemplate: {
          ...state.activateTemplate,
          data: [],
          loading: false,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.SELECT_ROUTE_PREVIEW:
      return {
        ...state,
        route: payload.item,
        preview: payload.preview
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_DOMAIN_LOADING:
      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_DOMAIN_SUCCESS:

      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: payload.data,
          isOld: payload.isOld,
          websiteType: payload.type,
          contact_support: payload.contact_support,
          loading: false,
          success: true,
          error: false
        },
      };


    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_DOMAIN_CHECK:
      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: payload.data.data,
          isOld: payload.isOld,
          websiteType: payload.type,
          loading: false,
          success: true,
          status: payload.data?.status ? payload.data?.status : 200,
          contact_support: payload.contact_support,
          policy_info: payload.policyInfo ? payload.policyInfo : "",
          error: false,
          domainChecked: true,
        },
      };
    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_DOMAIN_ERROR:
      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: payload,
          loading: false,
          success: false,
          error: true
        },
      };

    case WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_DOMAIN_RESET:
      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: [],
          loading: false,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.STORE_CUSTOM_THEME_DATA:
      return {
        ...state,
        storeCustomTheme: {
          ...state.storeCustomTheme,
          data: payload,
          loading: false,
          success: false,
          error: false
        }
      }
    case WEBSITE_TEMPLATE_TYPES.GET_GALLERY_ALBUM_LOADING:
      return {
        ...state,
        galleryAlbum: {
          ...state.galleryAlbum,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.GET_GALLERY_ALBUM_SUCCESS:
      return {
        ...state,
        galleryAlbum: {
          ...state.galleryAlbum,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.GET_GALLERY_LOADING:
      return {
        ...state,
        gallery: {
          ...state.gallery,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case WEBSITE_TEMPLATE_TYPES.GET_GALLERY_SUCCESS:
      return {
        ...state,
        gallery: {
          ...state.gallery,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };
    case WEBSITE_TEMPLATE_TYPES.GET_VALUE_PUSH:
      return {
        ...state,
        pushDropDown: {
          ...state.pushDropDown,
          data: payload.data,
          section: payload.section,
          secitonTile: payload.secitonTile
        },
      };

    default:
      return state;
  }
};
export default websiteTemplate;
