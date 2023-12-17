import { getAppointmentList } from "../actions/bookAppointment"
import { APPOINTMENTTYPES } from "../actions/bookAppointment/actionTypes"

const APPOINTMENT_INITIAL_TYPES = {
  postAppointment: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  // getAppointmentList: {
  //   data: [],
  //   loading: false,
  //   success: false,
  //   error: false,
  // },
  getSingleAppointment: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  editAppointment: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  deleteAppointment: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  postService: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getServiceList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getSingleService: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  editService: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  deleteService: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  postMainCategory: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getMainCategoryList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getSingleMainCategory: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  editMainCategory: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  editSingleMainCategory: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  deleteMainCategory: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getBookingSetting: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  createBookingSetting: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getBookingList: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  // editBookingList: {
  //   data: [],
  //   loading: false,
  //   success: false,
  //   error: false
  // },
  getSlotByDate: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getBookServiceList: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  createBookServiceList: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  updateBookServiceList: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  getallServiceList: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  getAllSlot: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  editUserAppointment: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  adminCountDashboard: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  serviceListByCategories: {
    data: [],
    loading: false,
    success: false,
    error: false,
    searchTerm: false,
    firstTimeSuccess: false
  },
  getMainBusinessCat: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  editMainBusinessCat: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  multiDeleteOrUncat: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  postCollection: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getAllCollection: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getSingleCollecton: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getSingleCollectonEndUser: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getMainBusiCollection: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  editMainBusiCollection: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  deleteCollection: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  editCollection: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getUncatList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  postBookingFormData: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  getDisableData: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  patchDisableData: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  getShowOnHeaderCollection: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
}

const bookAppointment = (state = APPOINTMENT_INITIAL_TYPES, { type, payload }) => {

  switch (type) {
    case APPOINTMENTTYPES.POST_APPOINTMENT_LOADING:
      return ({
        ...state,
        postAppointment: {
          ...state.postAppointment,
          data: payload,
          loading: true,
          success: false,
          error: false

        }
      })

    case APPOINTMENTTYPES.POST_APPOINTMENT_SUCCESS:
      // console.log(payload, "wdwqdddPOST_APPOINTMENT_SUCCESS")
      return ({
        ...state,
        postAppointment: {
          ...state.postAppointment,
          loading: false,
          success: true,
          error: false,
          data: payload
        },
        getBookingList: {
          ...state.getBookingList,
          data: state.getBookingList.data.concat(payload),
          loading: false,
          error: false,
          success: true
        }
      })

    case APPOINTMENTTYPES.POST_APPOINTMENT_RESET:
      return ({
        ...state,
        postAppointment: {
          ...state.postAppointment,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.POST_APPOINTMENT_ERROR:
      return ({
        ...state,
        postAppointment: {
          ...state.postAppointment,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    // case APPOINTMENTTYPES.GET_APPOINTMENT_LIST_LOADING:
    //   return ({
    //     ...state,
    //     getAppointmentList: {
    //       ...state.getAppointmentList,
    //       data: [],
    //       loading: true,
    //       success: false,
    //       error: false
    //     }
    //   })

    // case APPOINTMENTTYPES.GET_APPOINTMENT_LIST_SUCCESS:
    //   return ({
    //     ...state,
    //     getAppointmentList: {
    //       ...state.getAppointmentList,
    //       data: payload,
    //       loading: false,
    //       success: true,
    //       error: false
    //     }
    //   })

    // case APPOINTMENTTYPES.GET_APPOINTMENT_LIST_ERROR:
    //   return ({
    //     ...state,
    //     getAppointmentList: {
    //       ...state.getAppointmentList,
    //       data: [],
    //       loading: false,
    //       success: false,
    //       error: true
    //     }
    //   })

    // case APPOINTMENTTYPES.GET_APPOINTMENT_LIST_RESET:
    //   return ({
    //     ...state,
    //     getAppointmentList: {
    //       ...state.getAppointmentList,
    //       data: [],
    //       loading: false,
    //       success: false,
    //       error: false
    //     }
    //   })

    // case APPOINTMENTTYPES.GET_SINGLE_APPOINTMENT_LOADING:
    //   return ({
    //     ...state,
    //     getSingleAppointment: {
    //       ...state.getSingleAppointment,
    //       data: [],
    //       loading: true,
    //       success: false,
    //       error: false
    //     }
    //   })

    // case APPOINTMENTTYPES.GET_SINGLE_APPOINTMENT_SUCCESS:
    //   return ({
    //     ...state,
    //     getSingleAppointment: {
    //       ...state.getSingleAppointment,
    //       data: payload,
    //       loading: false,
    //       success: true,
    //       error: false
    //     }
    //   })

    // case APPOINTMENTTYPES.GET_SINGLE_APPOINTMENT_ERROR:
    //   return ({
    //     ...state,
    //     getSingleAppointment: {
    //       ...state.getSingleAppointment,
    //       data: payload,
    //       loading: false,
    //       success: false,
    //       error: true
    //     }
    //   })

    // case APPOINTMENTTYPES.GET_SINGLE_APPOINTMENT_RESET:
    //   return ({
    //     ...state,
    //     getSingleAppointment: {
    //       ...state.getSingleAppointment,
    //       data: [],
    //       loading: false,
    //       success: false,
    //       error: false
    //     }
    //   })

    // case APPOINTMENTTYPES.EDIT_APPOINTMENT_LOADING:
    //   return ({
    //     ...state,
    //     editAppointment: {
    //       ...state.editAppointment,
    //       data: [],
    //       loading: true,
    //       success: false,
    //       error: false
    //     }
    //   })

    // case APPOINTMENTTYPES.EDIT_APPOINTMENT_SUCCESS:
    //   // console.log(payload)
    //   return ({
    //     ...state,
    //     editAppointment: {
    //       ...state.editAppointment,
    //       data: payload,
    //       loading: false,
    //       success: true,
    //       error: false
    //     },
    //     getBookingList: {
    //       ...state.getBookingList,
    //       data: state.getBookingList.data.map((content) =>
    //         content._id === payload._id
    //           ? {
    //             ...content,
    //             ...payload,
    //           }
    //           : content
    //       ),
    //       success: true,
    //     }
    //   })

    // case APPOINTMENTTYPES.EDIT_APPOINTMENT_ERROR:
    //   return ({
    //     ...state,
    //     editAppointment: {
    //       ...state.editAppointment,
    //       data: payload,
    //       loading: false,
    //       success: false,
    //       error: true
    //     }
    //   })

    case APPOINTMENTTYPES.EDIT_APPOINTMENT_RESET:
      return ({
        ...state,
        editAppointment: {
          ...state.editAppointment,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.DELETE_APPOINTMENT_LIST_LOADING: {
      return ({
        ...state,
        deleteAppointment: {
          ...state.deleteAppointment,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    }
    // case APPOINTMENTTYPES.DELETE_APPOINTMENT_LIST_SUCCESS:
    //   return ({
    //     ...state,
    //     deleteAppointment: {
    //       ...state.deleteAppointment,
    //       data: payload,
    //       success: true,
    //       loading: false,
    //       error: false
    //     },

    //     getAppointmentList: {
    //       ...state.getAppointmentList,
    //       // data: state.noticelist.data.filter((item) => item._id !== payload._id),
    //       data: state.getAppointmentList.data.filter((item) => item._id !== payload),
    //       success: true,
    //     }
    //   })

    case APPOINTMENTTYPES.DELETE_APPOINTMENT_LIST_RESET: {
      return ({
        ...state,
        deleteAppointment: {
          ...state.deleteAppointment,
          data: [],
          loading: false,
          error: false,
          success: false,
        }
      })
    }

    case APPOINTMENTTYPES.DELETE_APPOINTMENT_LIST_ERROR:
      {
        return ({
          ...state,
          deleteAppointment:
          {
            ...state.deleteAppointment,
            data: [],
            loading: false,
            success: false,
            error: true
          }
        })
      }

    // case APPOINTMENTTYPES.SORT_APPOINTMENT_LIST:
    //   return ({
    //     ...state,
    //     getAppointmentList: {
    //       ...state.getAppointmentList,
    //       data: payload,
    //       loading: false,
    //       success: true,
    //       error: false
    //     }
    //   })


    // case APPOINTMENTTYPES.SEARCH_APPOINTMENT_LIST:
    //   return ({
    //     ...state,
    //     getAppointmentList: {
    //       ...state.getAppointmentList,
    //       data: payload,
    //       loading: false,
    //       success: true,
    //       error: false
    //     }
    //   })


    // case APPOINTMENTTYPES.APPOINTMENT_STATUS:
    //   return ({
    //     ...state,
    //     editAppointment: {
    //       ...state.editAppointment,
    //       data: payload,
    //       loading: false,
    //       success: true,
    //       error: false
    //     },
    //     // getAppointmentList: {
    //     //   ...state.getAppointmentList,
    //     //   data: state.getAppointmentList.data.map(
    //     //     (content) => content._id === payload._id ? {
    //     //       ...content, isStatus: payload.isStatus, emailNotify: payload.emailNotify
    //     //     }
    //     //       : content),
    //     // }

    //   })

    case APPOINTMENTTYPES.POST_SERVICE_LOADING:
      return ({
        ...state,
        postService: {
          ...state.postService,
          data: payload,
          loading: true,
          success: false,
          error: false

        }
      })

    case APPOINTMENTTYPES.POST_SERVICE_SUCCESS:
      // console.log(payload, "424")
      return ({
        ...state,
        postService: {
          ...state.postService,
          loading: false,
          success: true,
          error: false,
          data: payload
        },
        getServiceList: {
          ...state.getServiceList,
          data: state.getServiceList.data.concat(payload),
          loading: false,
          error: false,
          success: true
        }
      }
      )

    case APPOINTMENTTYPES.POST_SERVICE_RESET:
      return ({
        ...state,
        postService: {
          ...state.postService,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.POST_SERVICE_ERROR:
      return ({
        ...state,
        postService: {
          ...state.postService,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case APPOINTMENTTYPES.GET_SERVICE_LIST_LOADING:
      return ({
        ...state,
        getServiceList: {
          ...state.getServiceList,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.GET_SERVICE_LIST_SUCCESS:
      return ({
        ...state,
        getServiceList: {
          ...state.getServiceList,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    case APPOINTMENTTYPES.GET_SERVICE_LIST_ERROR:
      return ({
        ...state,
        getServiceList: {
          ...state.getServiceList,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case APPOINTMENTTYPES.GET_SERVICE_LIST_RESET:
      return ({
        ...state,
        getServiceList: {
          ...state.getServiceList,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.GET_SINGLE_SERVICE_LOADING:
      return ({
        ...state,
        getSingleService: {
          ...state.getSingleService,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.GET_SINGLE_SERVICE_SUCCESS:
      // console.log(payload)
      return ({

        ...state,
        getSingleService: {
          ...state.getSingleService,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    case APPOINTMENTTYPES.GET_SINGLE_SERVICE_ERROR:
      return ({
        ...state,
        getSingleService: {
          ...state.getSingleService,
          data: payload,
          loading: false,
          success: false,
          error: true
        }
      })

    case APPOINTMENTTYPES.GET_SINGLE_SERVICE_RESET:
      return ({
        ...state,
        getSingleService: {
          ...state.getSingleService,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.EDIT_SERVICE_LOADING:
      return ({
        ...state,
        editService: {
          ...state.editService,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.EDIT_SERVICE_SUCCESS:
      return ({
        ...state,
        editService: {
          ...state.editService,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getMainCategoryList: {
          ...state.getMainCategoryList,
          data: state.getMainCategoryList.data.map((item) => {
            return {
              ...item,
              service: item.service.map((services) => {
                return services._id === payload._id
                  ? {
                    ...services,
                    visibleOneSite: payload.visibleOneSite,
                  }
                  : services
              })
            }
          })
        },
        serviceListByCategories: {
          ...state.serviceListByCategories,
          data: state.serviceListByCategories.data.map((item) =>
            item._id === payload._id ? {
              ...item,
              visibleOneSite: payload.visibleOneSite,
              markAsFeatured: payload.markAsFeatured
            } : item
          )
        }
      })

    case APPOINTMENTTYPES.EDIT_SERVICE_ERROR:
      return ({
        ...state,
        editService: {
          ...state.editService,
          data: payload,
          loading: false,
          success: false,
          error: true
        }
      })

    case APPOINTMENTTYPES.EDIT_SERVICE_RESET:
      return ({
        ...state,
        editService: {
          ...state.editService,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.DELETE_SERVICE_LOADING: {
      return ({
        ...state,
        deleteService: {
          ...state.deleteService,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    }
    case APPOINTMENTTYPES.DELETE_SERVICE_SUCCESS:
      // console.log(payload, "paylod")
      // console.log(state.serviceListByCategories.data, " state.serviceListByCategories.data")
      return ({
        ...state,
        deleteService: {
          ...state.deleteService,
          data: payload,
          success: true,
          loading: false,
          error: false
        },

        getMainCategoryList: {
          ...state.getMainCategoryList,
          // data: state.noticelist.data.filter((item) => item._id !== payload._id),
          data: state.getMainCategoryList.data.map((content) => {
            return {
              ...content,
              service: content.service.filter((i) => i._id !== payload)
            }
          }
          ),
          success: true,
        },
        serviceListByCategories: {
          ...state.serviceListByCategories,
          data: state.serviceListByCategories.data.filter((item, i) => item._id !== payload),
          success: true,
        }
      })

    case APPOINTMENTTYPES.DELETE_SERVICE_RESET: {
      return ({
        ...state,
        deleteService: {
          ...state.deleteService,
          data: [],
          loading: false,
          error: false,
          success: false,
        }
      })
    }

    case APPOINTMENTTYPES.DELETE_SERVICE_ERROR:
      {
        return ({
          ...state,
          deleteService:
          {
            ...state.deleteService,
            data: [],
            loading: false,
            success: false,
            error: true
          }
        })
      }


    case APPOINTMENTTYPES.POST_MAIN_CATEGORY_LOADING:
      return ({
        ...state,
        postMainCategory: {
          ...state.postMainCategory,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.POST_MAIN_CATEGORY_SUCCESS:
      return ({
        ...state,
        postMainCategory: {
          ...state.postMainCategory,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getMainCategoryList: {
          ...state.getMainCategoryList,
          success: true,
          data: [payload].concat(state.getMainCategoryList.data),
          loading: false,
          error: false
        }

      })

    case APPOINTMENTTYPES.POST_MAIN_CATEGORY_ERROR:
      return ({
        ...state,
        postMainCategory: {
          ...state.postMainCategory,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })
    case APPOINTMENTTYPES.POST_MAIN_CATEGORY_RESET:
      return ({
        ...state,
        postMainCategory: {
          ...state.postMainCategory,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.GET_MAIN_CATEGORY_LIST_LOADING:
      return ({
        ...state,
        getMainCategoryList: {
          ...state.getMainCategoryList,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.GET_MAIN_CATEGORY_LIST_SUCCESS:
      // console.log(payload, 756);
      return ({
        ...state,
        getMainCategoryList: {
          ...state.getMainCategoryList,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    case APPOINTMENTTYPES.GET_MAIN_CATEGORY_LIST_ERROR:
      return ({
        ...state,
        getMainCategoryList: {
          ...state.getMainCategoryList,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case APPOINTMENTTYPES.GET_MAIN_CATEGORY_LIST_RESET:
      return ({
        ...state,
        getMainCategoryList: {
          ...state.getMainCategoryList,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })
    //UncatList
    case APPOINTMENTTYPES.GET_UNCATEGORY_LIST_LOADING:
      return ({
        ...state,
        getUncatList: {
          ...state.getUncatList,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.GET_UNCATEGORY_LIST_SUCCESS:
      // console.log(payload, 756);
      return ({
        ...state,
        getUncatList: {
          ...state.getUncatList,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    case APPOINTMENTTYPES.GET_UNCATEGORY_LIST_ERROR:
      return ({
        ...state,
        getUncatList: {
          ...state.getUncatList,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case APPOINTMENTTYPES.GET_UNCATEGORY_LIST_RESET:
      return ({
        ...state,
        getUncatList: {
          ...state.getUncatList,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.EDIT_MAIN_CATEGORY_LIST_LOADING:
      return ({
        ...state,
        editMainCategory: {
          ...state.editMainCategory,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.EDIT_MAIN_CATEGORY_LIST_SUCCESS: {
      return ({
        ...state,
        editMainCategory: {
          ...state.editMainCategory,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        ...state.getMainCategoryList,
        // getMainCategoryList: {
        data: state.getMainCategoryList.data.map((item) => item._id === payload._id ? {
          ...item, isHide: payload.isHide
          // return (
          //   {
          //     ...item,
          //     data: item.data._id === payload._id ? payload : item.data
          //   }
          // )
        } : item),
        loading: false,
        success: true,
        error: false,
        // return{
        //   ...item,
        //   mainCategory:item.mainCategory.filt((category) => {
        //    return category._id === payload._id
        //     ? {
        //     ...category,
        //    isHide:payload.isHide,
        //   }
        //   : category
        // })
        // }


        // }
      })
    }

    case APPOINTMENTTYPES.EDIT_MAIN_CATEGORY_LIST_ERROR:
      return ({
        ...state,
        editMainCategory: {
          ...state.editMainCategory,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case APPOINTMENTTYPES.EDIT_MAIN_CATEGORY__LIST_RESET:
      return ({
        ...state,
        editMainCategory: {
          ...state.editMainCategory,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.EDIT_MAIN_CATEGORY_DATA_LOADING:
      return ({
        ...state,
        editSingleMainCategory: {
          ...state.editSingleMainCategory,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.EDIT_MAIN_CATEGORY_DATA_SUCCESS: {
      return ({
        ...state,
        editSingleMainCategory: {
          ...state.editSingleMainCategory,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getMainCategoryList: {
          // data: state.getMainCategoryList.data.map((item) => {
          //   return (
          //     {
          //       ...item,
          //       mainCategory: item.mainCategory._id === payload._id ? payload : item.mainCategory
          //     }
          //   )
          // }),
          ...state.getMainCategoryList,
          data: state.getMainCategoryList.data.map(
            (content) => content._id === payload._id ? {
              ...content, main_category_name:
                payload.main_category_name, markAsFeatured: payload.markAsFeatured,
              uploadefile: payload.uploadefile, isHide: payload.isHide,
            }
              : content),
          loading: false,
          success: true,
          error: false,
          // return{
          //   ...item,
          //   mainCategory:item.mainCategory.filt((category) => {
          //    return category._id === payload._id
          //     ? {
          //     ...category,
          //    isHide:payload.isHide,
          //   }
          //   : category
          // })
          // }


        }
      })
    }

    case APPOINTMENTTYPES.EDIT_MAIN_CATEGORY_DATA_ERROR:
      return ({
        ...state,
        editSingleMainCategory: {
          ...state.editSingleMainCategory,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case APPOINTMENTTYPES.EDIT_MAIN_CATEGORY__DATA_RESET:
      return ({
        ...state,
        editSingleMainCategory: {
          ...state.editSingleMainCategory,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.DELETE_MAIN_CATEGORY_LIST_LOADING:
      return ({
        ...state,
        deleteMainCategory: {
          ...state.deleteMainCategory,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case APPOINTMENTTYPES.DELETE_MAIN_CATEGORY_LIST_SUCCESS:
      return ({
        ...state,
        deleteMainCategory: {
          ...state.deleteMainCategory,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getMainCategoryList: {
          ...state.getMainCategoryList,
          // data: state.noticelist.data.filter((item) => item._id !== payload._id),
          data: state.getMainCategoryList.data.filter((item) => item._id !== payload),
          success: true,
        }
      })

    case APPOINTMENTTYPES.DELETE_MAIN_CATEGORY_LIST_ERROR:
      return ({
        ...state,
        deleteMainCategory: {
          ...state.deleteMainCategory,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case APPOINTMENTTYPES.DELETE_MAIN_CATEGORY_LIST_RESET:
      return ({
        ...state,
        deleteMainCategory: {
          ...state.deleteMainCategory,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })
    // booking setting case start
    case APPOINTMENTTYPES.GET_BOOK_SETTING_LOADING:
      return ({
        ...state,
        getBookingSetting: {
          ...state.getBookingSetting,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      })
    case APPOINTMENTTYPES.GET_BOOK_SETTING_SUCCESS:
      return ({
        ...state,
        getBookingSetting: {
          ...state.getBookingSetting,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })
    case APPOINTMENTTYPES.GET_BOOK_SETTING_ERROR:
      return ({
        ...state,
        getBookingSetting: {
          ...state.getBookingSetting,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })
    case APPOINTMENTTYPES.GET_BOOK_SETTING_RESET:
      return ({
        ...state,
        getBookingSetting: {
          ...state.getBookingSetting,
          data: [],
          success: false,
          loading: false,
          error: false
        }
      })
    case APPOINTMENTTYPES.CREATE_BOOK_SETTING_LOADING:
      return ({
        ...state,
        createBookingSetting: {
          ...state.createBookingSetting,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      })
    case APPOINTMENTTYPES.CREATE_BOOK_SETTING_SUCCESS:
      return ({
        ...state,
        createBookingSetting: {
          ...state.createBookingSetting,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })
    case APPOINTMENTTYPES.CREATE_BOOK_SETTING_ERROR:
      return ({
        ...state,
        createBookingSetting: {
          ...state.createBookingSetting,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })
    case APPOINTMENTTYPES.CREATE_BOOK_SETTING_RESET:
      return ({
        ...state,
        createBookingSetting: {
          ...state.createBookingSetting,
          data: [],
          success: false,
          loading: false,
          error: false
        }
      })

    // ADMIN SIDE GETING LIST 
    case APPOINTMENTTYPES.GET_BOOKING_LIST_LOADING: {
      return {
        ...state,
        getBookingList: {
          ...state.getBookingList,
          data: [],
          loading: true,
          success: false,
          error: false

        }
      }
    }
    case APPOINTMENTTYPES.GET_BOOKING_LIST_LOADED: {
      return {
        ...state,
        getBookingList: {
          ...state.getBookingList,
          data: payload,
          loading: false,
          success: true,
          error: false,

        },
      };
    }
    case APPOINTMENTTYPES.GET_BOOKING_LIST_ERROR: {
      return {
        ...state,
        getBookingList: {
          ...state.getBookingList,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      }
    }
    // ADMINT SIDE EDIT
    // case APPOINTMENTTYPES.EDIT_BOOKING_LIST_LOADING: {
    //   return {
    //     ...state,
    //     editBookingList: {
    //       ...state.editBookingList,
    //       data: [],
    //       loading: true,
    //       success: false,
    //       error: false

    //     }
    //   }
    // }
    // case APPOINTMENTTYPES.EDIT_USER_APPOINTMENT_SUCCESS: {
    //   return {
    //     ...state,
    //     editUserAppointment: {
    //       ...state.editUserAppointment,
    //       data: payload,
    //       loading: false,
    //       success: true,
    //       error: false,
    //     },
    //     getBookingList: {
    //       ...state.getBookingList,
    //       data: state.getBookingList.data.map(
    //         (content) => content._id === payload._id ? {
    //           ...content, isStatus: payload.isStatus
    //         } : content
    //       )
    //     }
    //   }
    // }
    case APPOINTMENTTYPES.EDIT_STATUS:
      return ({
        ...state,
        editUserAppointment: {
          ...state.editUserAppointment,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getBookingList: {
          ...state.getBookingList,
          data: state.getBookingList.data.map(
            (content) => content._id === payload._id ? {
              ...content, isStatus: payload.isStatus
            }
              : content),
        }
      })
    // case APPOINTMENTTYPES.EDIT_BOOKING_LIST_ERROR: {
    //   return {
    //     ...state,
    //     editBookingList: {
    //       ...state.editBookingList,
    //       data: [],
    //       loading: false,
    //       success: false,
    //       error: true
    //     }
    //   }
    // }
    // case APPOINTMENTTYPES.EDIT_BOOKING_LIST_RESET: {
    //   return {
    //     ...state,
    //     editBookingList: {
    //       ...state.editBookingList,
    //       data: [],
    //       loading: false,
    //       success: false,
    //       error: false
    //     }
    //   }
    // }
    case APPOINTMENTTYPES.GET_SLOT_BY_DATE_LOADING: {
      return {
        ...state,
        getSlotByDate: {
          ...state.getSlotByDate,
          data: [],
          loading: true,
          success: false,
          error: false

        }
      }
    }
    case APPOINTMENTTYPES.GET_SLOT_BY_DATE_LOADED: {
      return {
        ...state,
        getSlotByDate: {
          ...state.getSlotByDate,
          data: payload,
          loading: false,
          success: true,
          error: false,
        },
        // getBookingList: {
        //   ...state.getBookingList,
        //   data: state.getBookingList.data.map(
        //     (content) => content._id === payload._id ? {
        //       ...content, isStatus: payload.isStatus
        //     } : content
        //   )
        // }
      }
    }
    case APPOINTMENTTYPES.GET_SLOT_BY_DATE_ERROR: {
      return {
        ...state,
        getSlotByDate: {
          ...state.getSlotByDate,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      }
    }
    // case APPOINTMENTTYPES.GET_SLOT_BY_DATE_RESET: {
    //   return {
    //     ...state,
    //     getSlotByDate: {
    //       ...state.getSlotByDate,
    //       data: [],
    //       loading: false,
    //       success: false,
    //       error: false
    //     }
    //   }
    // }
    // booking setting case end

    //BOOK SERVICE LIST START
    case APPOINTMENTTYPES.CREATE_BOOK_SERVICELIST_LOADING:
      return ({
        ...state,
        createBookServiceList: {
          ...state.createBookServiceList,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      })

    case APPOINTMENTTYPES.CREATE_BOOK_SERVICELIST_SUCCESS:
      return ({
        ...state,
        createBookServiceList: {
          ...state.createBookServiceList,
          data: [],
          loading: false,
          success: true,
          error: false,
        }
      })
    case APPOINTMENTTYPES.CREATE_BOOK_SERVICELIST_ERROR:
      return ({
        ...state,
        createBookServiceList: {
          ...state.createBookServiceList,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
    case APPOINTMENTTYPES.GET_BOOK_SERVICELIST_LOADING:
      return ({
        ...state,
        getBookServiceList: {
          ...state.getBookServiceList,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      })
    case APPOINTMENTTYPES.GET_BOOK_SERVICELIST_SUCCESS:
      return ({
        ...state,
        getBookServiceList: {
          ...state.getBookServiceList,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })
    case APPOINTMENTTYPES.GET_BOOK_SERVICELIST_ERROR:
      return ({
        ...state,
        getBookServiceList: {
          ...state.getBookServiceList,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
    case APPOINTMENTTYPES.UPDATE_BOOK_SERVICELIST_LOADING:
      return ({
        ...state,
        updateBookServiceList: {
          ...state.updateBookServiceList,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })
    case APPOINTMENTTYPES.UPDATE_BOOK_SERVICELIST_SUCCESS:
      return ({
        ...state,
        updateBookServiceList: {
          ...state.updateBookServiceList,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })
    case APPOINTMENTTYPES.UPDATE_BOOK_SERVICELIST_ERROR:
      return ({
        ...state,
        updateBookServiceList: {
          ...state.updateBookServiceList,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })
    case APPOINTMENTTYPES.GET_ALL_SERVICES_LIST_LOADING:
      return ({
        ...state,
        getallServiceList: {
          ...state.getallServiceList,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })
    case APPOINTMENTTYPES.GET_ALL_SERVICES_LIST_LOADED:
      return ({
        ...state,
        getallServiceList: {
          ...state.getallServiceList,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })
    case APPOINTMENTTYPES.GET_ALL_SERVICES_LIST_ERROR:
      return ({
        ...state,
        getallServiceList: {
          ...state.getallServiceList,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })
    case APPOINTMENTTYPES.GET_ALL_SLOTS_LOADING:
      return ({
        ...state,
        getAllSlot: {
          ...state.getAllSlot,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })
    case APPOINTMENTTYPES.GET_ALL_SLOTS_LOADED:
      // console.log(payload)
      return ({
        ...state,
        getAllSlot: {
          ...state.getAllSlot,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })
    case APPOINTMENTTYPES.GET_ALL_SLOTS_ERROR:
      return ({
        ...state,
        getAllSlot: {
          ...state.getAllSlot,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })
    case APPOINTMENTTYPES.GET_ALL_SLOTS_RESET:
      return ({
        ...state,
        getAllSlot: {
          ...state.getAllSlot,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })
    case APPOINTMENTTYPES.EDIT_USER_APPOINTMENT_LOADING:
      return ({
        ...state,
        adminCountDashboard: {
          ...state.adminCountDashboard,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })
    case APPOINTMENTTYPES.ADMIN_COUNT_APPOINTMENT_LOADING:
      return ({
        ...state,
        adminCountDashboard: {
          ...state.adminCountDashboard,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })
    case APPOINTMENTTYPES.ADMIN_COUNT_APPOINTMENT_SUCCESS:
      return ({
        ...state,
        adminCountDashboard: {
          ...state.adminCountDashboard,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })
    case APPOINTMENTTYPES.ADMIN_COUNT_APPOINTMENT_ERROR:
      return ({
        ...state,
        adminCountDashboard: {
          ...state.adminCountDashboard,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })
    case APPOINTMENTTYPES.EDIT_USER_APPOINTMENT_SUCCESS:
      // console.log(payload)
      return ({
        ...state,
        editUserAppointment: {
          ...state.editUserAppointment,
          data: payload,
          loading: false,
          success: true,

          error: false
        }, getBookingList: {
          ...state.getBookingList,
          data: state.getBookingList.data.map(
            (content) => content._id === payload._id ? {
              ...content, isStatus: payload.isStatus,
              full_name: payload.full_name,
              bookingSlotId: payload.bookingSlotId,
              booking_date: payload.booking_date,
              booking_time: payload.booking_time,

              contact: payload.contact,
              countryCode: payload.countryCode,
              email: payload.email,
              emailNotify: payload.emailNotify,
              institute: payload.institute,
              _id: payload._id,
              service: payload.service,
            } : content
          )
        }
      })
    // case APPOINTMENTTYPES.EDIT_USER_APPOINTMENT_ERROR:
    //   return ({
    //     ...state,
    //     editUserAppointment: {
    //       ...state.editUserAppointment,
    //       data: [],
    //       loading: false,
    //       success: false,
    //       error: true
    //     }
    //   })
    //SERVICE BY CATEGORY
    case APPOINTMENTTYPES.GET_SERVICE_LIST_BY_CATEGOERY_LOADING:
      return ({
        ...state,
        serviceListByCategories: {
          ...state.serviceListByCategories,
          loading: true,
          success: false,
          error: false,
          searchTerm: false
        }
      })
    case APPOINTMENTTYPES.GET_SERVICE_LIST_BY_CATEGOERY_SUCCESS:
      return ({
        ...state,
        serviceListByCategories: {
          ...state.serviceListByCategories,
          data: payload,
          loading: false,
          success: true,
          error: false,
          searchTerm: false,

        }
      })
    case APPOINTMENTTYPES.SEARCH_SERVICE:
      return ({
        ...state,
        serviceListByCategories: {
          ...state.serviceListByCategories,
          data: payload,
          loading: false,
          success: true,
          error: false,
          firstTimeSuccess: true
        }
      })
    case APPOINTMENTTYPES.GET_SERVICE_LIST_BY_CATEGOERY_ERROR:
      return ({
        ...state,
        serviceListByCategories: {
          ...state.serviceListByCategories,
          data: [],
          loading: false,
          success: false,
          error: true,
          searchTerm: false
        }
      })
    case APPOINTMENTTYPES.GET_SERVICE_LIST_BY_CATEGOERY_RESET:
      return ({
        ...state,
        serviceListByCategories: {
          ...state.serviceListByCategories,
          data: [],
          loading: false,
          success: false,
          error: false,
          searchTerm: false
        }
      })
    // get single Category servicess
    //get business main categroy 
    case APPOINTMENTTYPES.GET_MAIN_BUSINESS_CATEGORY_LOADING:
      return ({
        ...state,
        getMainBusinessCat: {
          ...state.getMainBusinessCat,
          data: [],
          loading: true,
          success: false,
          error: false,
          searchTerm: false
        }
      })
    case APPOINTMENTTYPES.GET_MAIN_BUSINESS_CATEGORY_SUCCESS:
      return ({
        ...state,
        getMainBusinessCat: {
          ...state.getMainBusinessCat,
          data: payload,
          loading: false,
          success: true,
          error: false,
          searchTerm: false
        }
      })
    case APPOINTMENTTYPES.GET_MAIN_BUSINESS_CATEGORY_ERROR:
      return ({
        ...state,
        getMainBusinessCat: {
          ...state.getMainBusinessCat,
          data: [],
          loading: false,
          success: false,
          error: true,
          searchTerm: false
        }
      })
    //editBusinsess cat
    case APPOINTMENTTYPES.EDIT_MAIN_BUSINESS_CATEGORY_LOADING:
      return ({
        ...state,
        editMainBusinessCat: {
          ...state.editMainBusinessCat,
          data: [],
          loading: true,
          success: false,
          error: false,
          searchTerm: false
        }
      })
    case APPOINTMENTTYPES.EDIT_MAIN_BUSINESS_CATEGORY_SUCCESS:
      return ({
        ...state,
        editMainBusinessCat: {
          ...state.editMainBusinessCat,
          data: payload,
          loading: false,
          success: true,
          error: false,
          searchTerm: false
        }
      })
    case APPOINTMENTTYPES.EDIT_MAIN_BUSINESS_CATEGORY_ERROR:
      return ({
        ...state,
        editMainBusinessCat: {
          ...state.editMainBusinessCat,
          data: [],
          loading: false,
          success: false,
          error: true,
          searchTerm: false
        }
      })

    case APPOINTMENTTYPES.MULTI_DELETE_UNCAT_LOADING:
      return ({
        ...state,
        multiDeleteOrUncat: {
          ...state.multiDeleteOrUncat,
          data: [],
          loading: true,
          success: false,
          error: false,

        }
      })
    case APPOINTMENTTYPES.MULTI_DELETE_UNCAT_SUCCESS:
      // console.log(payload, "palod")
      return ({
        ...state,
        multiDeleteOrUncat: {
          ...state.multiDeleteOrUncat,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }, serviceListByCategories: {
          ...state.serviceListByCategories,
          data: state.serviceListByCategories.data.filter((item, i) => !payload?.services.includes(item._id)),
          loading: false,
          success: true,
          error: false,
        },
      })
    case APPOINTMENTTYPES.MULTI_DELETE_UNCAT_ERROR:
      return ({
        ...state,
        multiDeleteOrUncat: {
          ...state.multiDeleteOrUncat,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
    case APPOINTMENTTYPES.MULTI_DELETE_UNCAT_RESET:
      return ({
        ...state,
        multiDeleteOrUncat: {
          ...state.multiDeleteOrUncat,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      })
    case APPOINTMENTTYPES.DELETE_CATEGORY_SUCCESS:
      // console.log(payload, "palod")
      // console.log(state.getMainCategoryList.data, " state.getMainCategoryList.data")
      return ({
        ...state,
        deleteCategory: {
          ...state.deleteCategory,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }, getMainCategoryList: {
          ...state.getMainCategoryList,
          data: state.getMainCategoryList.data.filter((item, i) => item._id !== payload._id),
          loading: false,
          success: true,
          error: false,
        }
      })
    case APPOINTMENTTYPES.POST_COLLECTION_LOADING:
      return ({
        ...state,
        postCollection: {
          ...state.postCollection,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      })
    case APPOINTMENTTYPES.POST_COLLECTION_SUCCESS:
      return ({
        ...state,
        postCollection: {
          ...state.postCollection,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })
    case APPOINTMENTTYPES.POST_COLLECTION_ERROR:
      return ({
        ...state,
        postCollection: {
          ...state.postCollection,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
    case APPOINTMENTTYPES.POST_COLLECTION_RESET:
      return ({
        ...state,
        postCollection: {
          ...state.postCollection,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      })
    case APPOINTMENTTYPES.GET_COLLECTION_LOADING:
      return ({
        ...state,
        getAllCollection: {
          ...state.getAllCollection,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      })
    case APPOINTMENTTYPES.GET_COLLECTION_SUCCESS:
      return ({
        ...state,
        getAllCollection: {
          ...state.getAllCollection,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })
    case APPOINTMENTTYPES.GET_COLLECTION_ERROR:
      return ({
        ...state,
        getAllCollection: {
          ...state.getAllCollection,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
    case APPOINTMENTTYPES.GET_SINGLE_COLLECTION_LOADING:
      return ({
        ...state,
        getSingleCollecton: {
          ...state.getSingleCollecton,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      })
    case APPOINTMENTTYPES.GET_SINGLE_COLLECTION_SUCCESS:
      return ({
        ...state,
        getSingleCollecton: {
          ...state.getSingleCollecton,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })
    case APPOINTMENTTYPES.GET_SINGLE_COLLECTION_ERROR:
      return ({
        ...state,
        getSingleCollecton: {
          ...state.getSingleCollecton,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
      case APPOINTMENTTYPES.GET_SINGLE_COLLECTION_RESET:
      return ({
        ...state,
        getSingleCollecton: {
          ...state.getSingleCollecton,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      })
    case APPOINTMENTTYPES.GET_SINGLE_COLLECTION_ENDUSER_LOADING:
      return ({
        ...state,
        getSingleCollectonEndUser: {
          ...state.getSingleCollectonEndUser,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      })
    case APPOINTMENTTYPES.GET_SINGLE_COLLECTION_ENDUSER_SUCCESS:
      return ({
        ...state,
        getSingleCollectonEndUser: {
          ...state.getSingleCollectonEndUser,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })
    case APPOINTMENTTYPES.GET_SINGLE_COLLECTION_ENDUSER_ERROR:
      return ({
        ...state,
        getSingleCollectonEndUser: {
          ...state.getSingleCollectonEndUser,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
    case APPOINTMENTTYPES.GET_SHOW_ON_HEADER_COLLECTION_LOADING:
      return ({
        ...state,
        getShowOnHeaderCollection: {
          ...state.getShowOnHeaderCollection,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      })
    case APPOINTMENTTYPES.GET_SHOW_ON_HEADER_COLLECTION_SUCCESS:
      return ({
        ...state,
        getShowOnHeaderCollection: {
          ...state.getShowOnHeaderCollection,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })
    case APPOINTMENTTYPES.GET_SHOW_ON_HEADER_COLLECTION_ERROR:
      return ({
        ...state,
        getShowOnHeaderCollection: {
          ...state.getShowOnHeaderCollection,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
    case APPOINTMENTTYPES.GET_MAIN_BUSINESS_COLLECTION_LOADING:
      return ({
        ...state,
        getMainBusiCollection: {
          ...state.getMainBusiCollection,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      })
    case APPOINTMENTTYPES.GET_MAIN_BUSINESS_COLLECTION_SUCCESS:
      return ({
        ...state,
        getMainBusiCollection: {
          ...state.getMainBusiCollection,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })
    case APPOINTMENTTYPES.GET_MAIN_BUSINESS_COLLECTION_ERROR:
      return ({
        ...state,
        getMainBusiCollection: {
          ...state.getMainBusiCollection,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
    case APPOINTMENTTYPES.EDIT_MAIN_BUSINESS_COLLECTION_LOADING:
      return ({
        ...state,
        editMainBusiCollection: {
          ...state.editMainBusiCollection,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      })
    case APPOINTMENTTYPES.EDIT_MAIN_BUSINESS_COLLECTION_SUCCESS:
      return ({
        ...state,
        editMainBusiCollection: {
          ...state.editMainBusiCollection,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })
    case APPOINTMENTTYPES.EDIT_MAIN_BUSINESS_COLLECTION_ERROR:
      return ({
        ...state,
        editMainBusiCollection: {
          ...state.editMainBusiCollection,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
    case APPOINTMENTTYPES.DELETE_COLLECTION_LOADING:
      return ({
        ...state,
        deleteCollection: {
          ...state.deleteCollection,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      })
    case APPOINTMENTTYPES.DELETE_COLLECTION_SUCCESS:

      return ({
        ...state,
        deleteCollection: {
          ...state.deleteCollection,
          data: payload,
          loading: false,
          success: true,
          error: false,
        },
        getAllCollection: {
          ...state.getAllCollection,
          data: state.getAllCollection.data.filter((item, i) => item._id !== payload._id),
          loading: false,
          success: true,
          error: false,
        }
      })
    case APPOINTMENTTYPES.EDIT_COLLECTION_LOADING:
      return ({
        ...state,
        editCollection: {
          ...state.editCollection,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      })
    case APPOINTMENTTYPES.EDIT_COLLECTION_SUCCESS:
      return ({
        ...state,
        editCollection: {
          ...state.editCollection,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })
    case APPOINTMENTTYPES.EDIT_COLLECTION_ERROR:
      return ({
        ...state,
        editCollection: {
          ...state.editCollection,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
    case APPOINTMENTTYPES.EDIT_COLLECTION_RESET:
      return ({
        ...state,
        editCollection: {
          ...state.editCollection,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      })
      
    // BOOKING FORM ON BOOKING BUTTON 
    case APPOINTMENTTYPES.BOOKING_FORM_ON_BOOKING_BUTTON_LOADING:
      return ({
        ...state,
        postBookingFormData: {
          ...state.postBookingFormData,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })
    case APPOINTMENTTYPES.BOOKING_FORM_ON_BOOKING_BUTTON_LOADED:
      return ({
        ...state,
        postBookingFormData: {
          ...state.postBookingFormData,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })
    case APPOINTMENTTYPES.BOOKING_FORM_ON_BOOKING_BUTTON_ERROR:
      return ({
        ...state,
        postBookingFormData: {
          ...state.postBookingFormData,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })
    // GET DISABLE BUTTON DATA
    case APPOINTMENTTYPES.GET_DISABLE_BUTTON_DATA_LOADING:
      return ({
        ...state,
        getDisableData: {
          ...state.getDisableData,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })
    case APPOINTMENTTYPES.GET_DISABLE_BUTTON_DATA_LOADED:
      return ({
        ...state,
        getDisableData: {
          ...state.getDisableData,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })
    case APPOINTMENTTYPES.GET_DISABLE_BUTTON_DATA_ERROR:
      return ({
        ...state,
        getDisableData: {
          ...state.getDisableData,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    // PATCH DISABLE BUTTON DATA
    case APPOINTMENTTYPES.PATCH_DISABLE_BUTTON_DATA_LOADING:
      return ({
        ...state,
        patchDisableData: {
          ...state.patchDisableData,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })
    case APPOINTMENTTYPES.PATCH_DISABLE_BUTTON_DATA_LOADED:
      return ({
        ...state,
        patchDisableData: {
          ...state.patchDisableData,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })
    case APPOINTMENTTYPES.PATCH_DISABLE_BUTTON_DATA_ERROR:
      return ({
        ...state,
        patchDisableData: {
          ...state.patchDisableData,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    default:
      return state
  }
}

export default bookAppointment;