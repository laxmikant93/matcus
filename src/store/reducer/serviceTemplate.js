import { SERVICE_TEMPLATE_TYPES } from "../actions/serviceWebsiteTemplate/actionTypes";

const SERVICE_TEMPLATE_INITIAL_STATE = {
  getTemplate: {
    data: [],
    loading: false,
    success: false,
    error: false,
    status: "",
    firstTimeSuccess: false,
    domainSuccess: true,
    editorSuccess: false,
    domainChecked: false
  },
  galleryAlbum: {
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
  serviceDetail: {
    data: {},
    loading: false,
    success: false,
    error: false
  },
  facultyDetails: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  SingleCategoryDetails: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  AllServicesOfCategory: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  SingleOfCategory: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  activateTemplate: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  route: "/",
  preview: false,
  paramsId: ""
};

const serviceTemplate = (state = SERVICE_TEMPLATE_INITIAL_STATE, { type, payload }) => {
  switch (type) {


    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_LOADING:
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

    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_SUCCESS:
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

    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_ERROR:
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

    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_RESET:
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

    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_SETTINGS_LOADING:
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

    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_SETTINGS_SUCCESS:
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
    case SERVICE_TEMPLATE_TYPES.UPDATE_DYNAMIC_SETTINGS_SERVICE_TEMPLATE:
      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: {
            ...state.getTemplate.data,
            instituteData: {
              ...state.getTemplate.data.instituteData,
              business_logo: payload.sitesettings.business_logo,
              business_name: payload.sitesettings.business_name,
              favIcon: payload.sitesettings.favIcon,
              showBusinessName: payload.sitesettings.showBusinessName
            },
          },
          loading: false,
          success: true,
          error: false
        }
      };

    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_SETTINGS_ERROR:
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

    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_SETTINGS_RESET:
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

    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_PAGES_LOADING:
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

    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_PAGES_SUCCESS:

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
                    // homeSectionHide: payload.sectionHide.homeSectionHide,
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


    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_PAGES_ERROR:
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

    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_PAGES_RESET:
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



    case SERVICE_TEMPLATE_TYPES.UPDATE_DYNAMIC_SERVICE_TEMPLATE:
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


    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_LOADING:
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

    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_SUCCESS: {

      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: payload,
          loading: false,
          success: true,
          firstTimeSuccess: true,
          editorSuccess: true,
          error: false
        },
      };
    }
    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_ERROR:
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

    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_RESET:
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



    case SERVICE_TEMPLATE_TYPES.SELECT_ROUTE_PREVIEW:
      return {
        ...state,
        route: payload.item,
        preview: payload.preview
      };
    case SERVICE_TEMPLATE_TYPES.SET_PARAMS_ID:
      return {
        ...state,
        paramsId: payload
      };
    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_DOMAIN_LOADING:
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

    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_DOMAIN_SUCCESS:

      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: payload.data,
          isOld: payload.isOld,
          websiteType: payload.type,
          status: payload.status,
          loading: false,
          domainSuccess: true,
          success: true,
          error: false
        },
      };


    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_DOMAIN_CHECK:
      return {
        ...state,
        getTemplate: {
          ...state.getTemplate,
          data: {...payload.themeData[0],themeGlobal:payload.themeData[0]?.themeunwindData?.theme[0]},
          isOld: payload.isOld,
          websiteType: payload.type,
          loading: false,
          success: true,
          status: payload.data.status,
          error: false,
          domainChecked: true,
        },
      };
    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_DOMAIN_ERROR:
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

    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_DOMAIN_RESET:
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

    case SERVICE_TEMPLATE_TYPES.STORE_CUSTOM_THEME_DATA:
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
    case SERVICE_TEMPLATE_TYPES.GET_GALLERY_ALBUM_LOADING:
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

    case SERVICE_TEMPLATE_TYPES.GET_GALLERY_ALBUM_SUCCESS:
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

    case SERVICE_TEMPLATE_TYPES.GET_GALLERY_LOADING:
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

    case SERVICE_TEMPLATE_TYPES.GET_GALLERY_SUCCESS:
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
    
    case SERVICE_TEMPLATE_TYPES.GET_SERVICE_DETAIL_LOADING:
      return {
        ...state,
        serviceDetail: {
          ...state.serviceDetail,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case SERVICE_TEMPLATE_TYPES.GET_SERVICE_DETAIL_SUCCESS:
      return {
        ...state,
        serviceDetail: {
          ...state.serviceDetail,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };

    case SERVICE_TEMPLATE_TYPES.GET_FACULTY_DETAIL_LOADING:
      return {
        ...state,
        facultyDetails: {
          ...state.facultyDetails,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case SERVICE_TEMPLATE_TYPES.GET_FACULTY_DETAIL_SUCCESS:
      return {
        ...state,
        facultyDetails: {
          ...state.facultyDetails,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };

    case SERVICE_TEMPLATE_TYPES.GET_CATEGORY_DETAIL_LOADING:
      return {
        ...state,
        SingleCategoryDetails: {
          ...state.SingleCategoryDetails,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case SERVICE_TEMPLATE_TYPES.GET_CATEGORY_DETAIL_SUCCESS:
      return {
        ...state,
        SingleCategoryDetails: {
          ...state.SingleCategoryDetails,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };

    case SERVICE_TEMPLATE_TYPES.GET_CATEGORY_DETAIL_ERROR:
      return {
        ...state,
        SingleCategoryDetails: {
          ...state.SingleCategoryDetails,
          data: [],
          loading: false,
          success: false,
          error: true
        },
      };

    case SERVICE_TEMPLATE_TYPES.GET_ALLSERVICES_OF_CATEGORY_LOADING:
      return {
        ...state,
        AllServicesOfCategory: {
          ...state.AllServicesOfCategory,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case SERVICE_TEMPLATE_TYPES.GET_ALLSERVICES_OF_CATEGORY_SUCCESS:
      return {
        ...state,
        AllServicesOfCategory: {
          ...state.AllServicesOfCategory,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };

    case SERVICE_TEMPLATE_TYPES.GET_ALLSERVICES_OF_CATEGORY_ERROR:
      return {
        ...state,
        AllServicesOfCategory: {
          ...state.AllServicesOfCategory,
          data: [],
          loading: false,
          success: false,
          error: true
        },
      };

    case SERVICE_TEMPLATE_TYPES.GET_SINGLE_CATEGORY_LOADING:
      return {
        ...state,
        SingleOfCategory: {
          ...state.SingleOfCategory,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };

    case SERVICE_TEMPLATE_TYPES.GET_SINGLE_CATEGORY_SUCCESS:
      return {
        ...state,
        SingleOfCategory: {
          ...state.SingleOfCategory,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };

    case SERVICE_TEMPLATE_TYPES.GET_SINGLE_CATEGORY_ERROR:
      return {
        ...state,
        SingleOfCategory: {
          ...state.SingleOfCategory,
          data: [],
          loading: false,
          success: false,
          error: true
        },
      };

      case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_CREATE_USER_THEME_LOADING:
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

    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_CREATE_USER_THEME_SUCCESS:
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
    // case SERVICE_TEMPLATE_TYPES.UPDATE_DYNAMIC_SERVICE_TEMPLATE:
    //   return {
    //     ...state,
    //     getTemplate: {
    //       ...state.getTemplate,
    //       data: {
    //         ...state.getTemplate.data,
    //         ...payload
    //       },
    //       loading: false,
    //       success: true,
    //       error: false
    //     }
    //   }

    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_CREATE_USER_THEME_ERROR:
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

    case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_CREATE_USER_THEME_RESET:
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

      case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_SELECTED_THEME_LOADING:
        return {
          ...state,
          getTemplate: {
            ...state.getTemplate,
            data: { ...state.getTemplate.data },
            loading: true,
            success: false,
            error: false,
            
          },
        };
  
      case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_SELECTED_THEME_SUCCESS:
        return {
          ...state,
          getTemplate: {
            data: payload,
            loading: false,
            success: true,
            error: false,
            firstTimeSuccess: true,
            editorSuccess: true,
          },
        };
  
      case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_SELECTED_THEME_ERROR:
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
  
      case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_SELECTED_THEME_RESET:
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

        case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_THEME_LOADING:
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
    
        case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_THEME_SUCCESS:
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
    
    
        case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_THEME_ERROR:
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
    
        case SERVICE_TEMPLATE_TYPES.SERVICE_TEMPLATE_EDIT_THEME_RESET:
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
    
          case SERVICE_TEMPLATE_TYPES.ACTIVATE_SERVICE_TEMPLATE_LOADING:
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
      
          case SERVICE_TEMPLATE_TYPES.ACTIVATE_SERVICE_TEMPLATE_SUCCESS:
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
      
          case SERVICE_TEMPLATE_TYPES.ACTIVATE_SERVICE_TEMPLATE_ERROR:
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
      
       
    default:
      return state;
  }
};
export default serviceTemplate;
