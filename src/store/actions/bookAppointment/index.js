import { setCommonError } from "../commonerror";
import { APPOINTMENTTYPES } from "./actionTypes";
import AppointmentRequest from "./request";
import { showSuccessPopup } from "../successmessagepopup";
import Auth from "../../../Classes/Auth";
import { updateDashboardStepper } from "../user";

//Appointment
export const postAppointmentDetail = (industry, data) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.POST_APPOINTMENT_LOADING,
      loading: true,
    })

    AppointmentRequest.post(AppointmentRequest.AppointmentEndpoint.postAppointment.replace("__type__", industry),
      data,
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.POST_APPOINTMENT_SUCCESS,
          payload: success.data.data
        })
        dispatch(showSuccessPopup("Appointment details added successfully!"));
      },
      error => {
        dispatch({
          type: APPOINTMENTTYPES.POST_APPOINTMENT_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

// export const getAppointmentList = (id) => {
//   return (dispatch) => {
//     dispatch({
//       type: APPOINTMENTTYPES.GET_APPOINTMENT_LIST_LOADING,
//       loading: true,
//     })
//     let data = {}
//     AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getAppointmentList, data,
//       (success) => {
//         dispatch({
//           type: APPOINTMENTTYPES.GET_APPOINTMENT_LIST_SUCCESS,
//           payload: success.data.data
//         })
//       },
//       error => {
//         dispatch({
//           type: APPOINTMENTTYPES.GET_APPOINTMENT_LIST_ERROR,
//           payload: []
//         })
//         dispatch(setCommonError(error.message))
//       }
//     );
//   }
// }

// export const getSingleAppointment = (id, industry) => {
//   return (dispatch) => {
//     dispatch({
//       type: APPOINTMENTTYPES.GET_SINGLE_APPOINTMENT_LOADING,
//       loading: true,
//     })
//     AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getSingleAppointment.replace("_Id_", id).replace("__type__", industry),
//       (success) => {
//         dispatch({
//           type: APPOINTMENTTYPES.GET_SINGLE_APPOINTMENT_SUCCESS,
//           payload: success.data
//         })
//       },
//       error => {
//         dispatch({
//           type: APPOINTMENTTYPES.GET_SINGLE_APPOINTMENT_ERROR,
//           payload: []
//         })
//         dispatch(setCommonError(error.message))
//       }
//     );
//   }
// }


// export const editAppointmentDetail = (id, industry, data) => {
//   return (dispatch) => {
//     dispatch({
//       type: APPOINTMENTTYPES.EDIT_APPOINTMENT_LOADING,
//       loading: true,
//     });
//     AppointmentRequest.patch(
//       AppointmentRequest.AppointmentEndpoint.editAppointmentDetail.replace("appointmentId", id).replace("__type__", industry),
//       data,
//       (success) => {
//         dispatch({
//           type: APPOINTMENTTYPES.EDIT_APPOINTMENT_SUCCESS,
//           payload: success.data.data,
//         })
//         dispatch(showSuccessPopup("Booking Detail Updated Successfully !"))
//       },
//       (error) => {
//         dispatch(setCommonError(error.message, "gvvyfvyftg"))
//       }
//     )
//   }
// }

export const getAppointmentListReset = () => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_APPOINTMENT_LIST_RESET,
      payload: []
    })
  }
}

export const resetPostAppointmentDetail = () => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.POST_APPOINTMENT_RESET,
      payload: []
    })
  }
}

export const resetEditAppointmentDetail = () => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.EDIT_APPOINTMENT_RESET,
      payload: []
    })
  }
}

// *************************************************************************
//USER SIDE BOOKING TABLE  
export const getBookingList = (insID, ownerID, industry) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_BOOKING_LIST_LOADING,
      payload: [],
    })
    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getBookingList.replace("_insID_", insID).replace("_ownerID_", ownerID).replace("__type__", industry),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_BOOKING_LIST_LOADED,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: APPOINTMENTTYPES.GET_BOOKING_LIST_ERROR,
          payload: []
        })
      }
    );
  }
}
export const resetGetBookingList = () => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_BOOKING_LIST_RESET,
      payload: []
    })
  }
}

// Appointment list by Search Name
export const getBookingListSearch = (insID, ownerID, value, industry) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_BOOKING_LIST_LOADING,
      payload: [],
    })
    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getBookingListSearch.replace("_insID_", insID).replace("_ownerID_", ownerID).replace("_VALUE_", value).replace("__type__", industry),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_BOOKING_LIST_LOADED,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: APPOINTMENTTYPES.GET_BOOKING_LIST_ERROR,
          payload: []
        })
      }
    );
  }
}
export const resetGetBookingListSearch = () => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_BOOKING_LIST_RESET,
      payload: []
    })
  }
}

export const getBookingListSort = (insID, ownerID, value, industry) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_BOOKING_LIST_LOADING,
      payload: [],
    })
    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getBookingListSort.replace("_insID_", insID).replace("_ownerID_", ownerID).replace("_VALUE_", value).replace("__type__", industry),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_BOOKING_LIST_LOADED,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: APPOINTMENTTYPES.GET_BOOKING_LIST_ERROR,
          payload: []
        })
      }
    );
  }
}
export const resetGetBookingListSort = () => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_BOOKING_LIST_RESET,
      payload: []
    })
  }
}


export const getBookingListByDate = (insID, ownerID, value, industry) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_BOOKING_LIST_LOADING,
      payload: [],
    })
    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getBookingListByDate.replace("_insID_", insID).replace("_ownerID_", ownerID).replace("_VALUE_", value).replace("__type__", industry),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_BOOKING_LIST_LOADED,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: APPOINTMENTTYPES.GET_BOOKING_LIST_ERROR,
          payload: []
        })
      }
    );
  }
}
export const resetGetBookingListByDate = () => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_BOOKING_LIST_RESET,
      payload: []
    })
  }
}

export const getBookingListByCustomeDate = (insID, ownerID, Avalue, Bvalue, industry) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_BOOKING_LIST_LOADING,
      payload: [],
    })
    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getBookingListByCustomeDate.replace("_insID_", insID).replace("_ownerID_", ownerID).replace("_VALUE_", Avalue).replace("_VALUE_", Bvalue).replace("__type__", industry),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_BOOKING_LIST_LOADED,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: APPOINTMENTTYPES.GET_BOOKING_LIST_ERROR,
          payload: []
        })
      }
    );
  }
}
export const resetGetBookingListByCustomeDate = () => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_BOOKING_LIST_RESET,
      payload: []
    })
  }
}

export const getAllSlot = (serviceid, insID, date, industry) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_ALL_SLOTS_LOADING,
      payload: [],
    })

    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getAllSlot.replace("serviceId", serviceid).replace("insID", insID).replace("_DATE_", date).replace("__type__", industry),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_ALL_SLOTS_LOADED,
          payload: success.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: APPOINTMENTTYPES.GET_ALL_SLOTS_ERROR,
          payload: []
        })
      }
    );
  }
}

export const resetGetAllSlot = () => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_ALL_SLOTS_RESET,
      payload: []
    })
  }
}


export const geteditAppointment = (id, industry, data) => {
  return dispatch => {
    dispatch({
      type: APPOINTMENTTYPES.EDIT_USER_APPOINTMENT_LOADING,
      payload: [],
    })
    AppointmentRequest.patch(AppointmentRequest.AppointmentEndpoint.geteditAppointment.replace("appointmentId", id).replace("__type__", industry), data,
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.EDIT_USER_APPOINTMENT_SUCCESS,
          payload: success.data.data
        })
        dispatch(showSuccessPopup("Updated Successfully..!!"))
      }
      ,
      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: APPOINTMENTTYPES.EDIT_USER_APPOINTMENT_ERROR,
          payload: []
        })
      })
  }
}

export const geteditAppListStatus = (id, industry, data) => {
  return dispatch => {
    AppointmentRequest.patch(AppointmentRequest.AppointmentEndpoint.geteditAppointment.replace("appointmentId", id).replace("__type__", industry), data,

      (success) => {

        dispatch({
          type: APPOINTMENTTYPES.EDIT_STATUS,
          payload: success.data.data
        })
        dispatch(showSuccessPopup("Updated Successfully..!!"))
      }
      ,
      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: APPOINTMENTTYPES.EDIT_USER_APPOINTMENT_ERROR,
          payload: []
        })
      })
  }
}
//Services

export const postServiceDetail = (industry, data, userStepper, instituteId) => (dispatch) => {
  dispatch({
    type: APPOINTMENTTYPES.POST_SERVICE_LOADING,
    loading: true,
  })
  // console.log(data, "169")
  AppointmentRequest.post(AppointmentRequest.AppointmentEndpoint.postServiceDetail.replace("__type__", industry),
    data,
    (success) => {
      dispatch({
        type: APPOINTMENTTYPES.POST_SERVICE_SUCCESS,
        payload: success.data.data
      })
      dispatch(showSuccessPopup("Service added successfully!"));
      let industryId = industry
      const stepperData = {
        addService: true,
        condition: "BookAppointment",
        industry: industryId,
        institute: instituteId,
        business: instituteId,
        owner: data.service.owner
      }
      AppointmentRequest.post(
        AppointmentRequest.AppointmentEndpoint.dashboardsteppercourse,
        stepperData, (success) => {
          let steup = {
            ...userStepper, addService: true,
          }
          Auth.updateUserDetail("user_dashboard_stepper", steup);
          dispatch(updateDashboardStepper(steup))


        }, (error) => {

        })
    },
    (error) => {
      dispatch({
        type: APPOINTMENTTYPES.POST_SERVICE_ERROR,
        payload: []
      })
      dispatch(setCommonError(error.message))
    }
  );
}

export const postResetServiceDetail = (industry) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.POST_SERVICE_RESET
    })
  }
}

export const getSingleServiceDetail = (industry, body) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_SINGLE_SERVICE_LOADING,
      loading: true,
    });
    AppointmentRequest.post(AppointmentRequest.AppointmentEndpoint.getSingleServiceDetail.replace("__type__", industry), body,
      (success) => {
        // console.log("line 228", success.data, success.data.data)
        dispatch({
          type: APPOINTMENTTYPES.GET_SINGLE_SERVICE_SUCCESS,
          payload: success.data.data,
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_SINGLE_SERVICE_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

// export const getAllServiceList = (industry) => {
//   return (dispatch) => {
//     dispatch({
//       type: APPOINTMENTTYPES.GET_SERVICE_LIST_LOADING,
//       loading: true,
//     });
//     AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getAllServiceList.replace("__type__", industry),
//       (success) => {
//         dispatch({
//           type: APPOINTMENTTYPES.GET_SERVICE_LIST_SUCCESS,
//           payload: success.data.data,
//         })
//       },
//       (error) => {
//         dispatch({
//           type: APPOINTMENTTYPES.GET_SERVICE_LIST_ERROR,
//           payload: []
//         })
//         dispatch(setCommonError(error.message))
//       }
//     )
//   }
// }

export const editServiceDetails = (id, industry, data) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.EDIT_SERVICE_LOADING,
      loading: true,
    });
    // console.log(data, "data391")
    AppointmentRequest.patch(
      AppointmentRequest.AppointmentEndpoint.editServiceDetails.replace("serviceId", id).replace("__type__", industry), data,
      (success) => {
        // console.log(success.data.data, "253")
        dispatch(
          {
            type: APPOINTMENTTYPES.EDIT_SERVICE_SUCCESS,
            payload: success.data.data,
          })
        dispatch(showSuccessPopup("Service updated successfully!"));
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.EDIT_SERVICE_ERROR
        })
        dispatch(setCommonError("error.message"))
      }
    )
  }
}
export const bookAppointmentAdminDashboardCount = (business, owner, industry) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.ADMIN_COUNT_APPOINTMENT_LOADING,
      loading: true,
    });
    AppointmentRequest.get(
      AppointmentRequest.AppointmentEndpoint.adminCountDashboard.replace("__OWNER__", owner).replace("__type__", industry).replace("__INS__", business),
      (success) => {
        dispatch(
          {
            type: APPOINTMENTTYPES.ADMIN_COUNT_APPOINTMENT_SUCCESS,
            payload: success.data,
          })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.ADMIN_COUNT_APPOINTMENT_ERROR
        })
        dispatch(setCommonError("error.message"))
      }
    )
  }
}

export const resetGetSingleService = () => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_SINGLE_SERVICE_RESET
    })
  }
}

export const resetEditService = () => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.EDIT_SERVICE_RESET
    })
  }
}

export const deleteService = (id, industry) => {
  return (dispatch) => {
    let data = {};
    dispatch({
      type: APPOINTMENTTYPES.DELETE_SERVICE_LOADING,
      payload: []
    })
    AppointmentRequest.delete(AppointmentRequest.AppointmentEndpoint.deleteService.replace("serviceId", id).replace("__type__", industry), data,
      (success) => {
        // console.log(success.data, "285")
        dispatch({
          type: APPOINTMENTTYPES.DELETE_SERVICE_SUCCESS,
          payload: id,
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.DELETE_SERVICE_ERROR,
        })
        dispatch(setCommonError(error.message))
      },
    )
  }
}

//Cattegory
export const postMainCategoryDetail = (industry, data) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.POST_MAIN_CATEGORY_LOADING,
      payload: []
    })
    AppointmentRequest.post(AppointmentRequest.AppointmentEndpoint.postMainCategoryDetail.replace("__type__", industry),
      data,
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.POST_MAIN_CATEGORY_SUCCESS,
          payload: success.data.data
        })
        dispatch(showSuccessPopup("Main Category created successfully!"));
      },
      error => {
        dispatch({
          type: APPOINTMENTTYPES.POST_MAIN_CATEGORY_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

export const postResetMAinCategoryDetail = () => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.POST_MAIN_CATEGORY_RESET
    })
  }
}

// export const getSingleMainCategoryDetail = (id, industry) => {
//   return (dispatch) => {
//     dispatch({
//       type: APPOINTMENTTYPES.GET_SINGLE_MAIN_CATEGORY_LOADING,
//       loading: true,
//     });
//     AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getSingleMainCategoryDetail.replace("__ID__", id).replace("__type__", industry),
//       (success) => {
//         dispatch({
//           type: APPOINTMENTTYPES.GET_SINGLE_MAIN_CATEGORY_SUCCESS,
//           payload: success.data,
//         })
//       },
//       (error) => {
//         dispatch({
//           type: APPOINTMENTTYPES.GET_SINGLE_MAIN_CATEGORY_ERROR,
//           payload: []
//         })
//         dispatch(setCommonError(error.message))
//       }
//     );
//   }
// }

export const getAllMainCategoryList = (bid, owner, type) => {
  return (dispatch) => {
    // console.log(bid, owner, type)
    dispatch({
      type: APPOINTMENTTYPES.GET_MAIN_CATEGORY_LIST_LOADING,
      loading: true,
    });
    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getAllMainCategoryList.replace("__bid__", bid).replace("__ownerid__", owner).replace("__type__", type),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_MAIN_CATEGORY_LIST_SUCCESS,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_MAIN_CATEGORY_LIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const getAllUnCategoryList = (bid, owner, type) => {
  return (dispatch) => {
    // console.log(bid, owner, type)
    dispatch({
      type: APPOINTMENTTYPES.GET_UNCATEGORY_LIST_LOADING,
      loading: true,
    });
    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getAllUnCategoryList.replace("__bid__", bid).replace("__ownerid__", owner).replace("__type__", type),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_UNCATEGORY_LIST_SUCCESS,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_UNCATEGORY_LIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const getAllMainServiceList = (value, industry) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_ALL_SERVICES_LIST_LOADING,
      loading: true,
    });
    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getAllMainServiceList.replace("inst", value).replace("__type__", industry),
      (success) => {
        // console.log(success.data, "369");
        dispatch({
          type: APPOINTMENTTYPES.GET_ALL_SERVICES_LIST_LOADED,
          payload: success.data

        })
        // console.log(success.data, "369");
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_ALL_SERVICES_LIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const editMainCategoryDetails = (id, industry, data) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.EDIT_MAIN_CATEGORY_LIST_LOADING,
      loading: true,
    });
    AppointmentRequest.patch(AppointmentRequest.AppointmentEndpoint.editMainCategoryDetails.replace("categoryId", id).replace("__type__", industry), data,
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.EDIT_MAIN_CATEGORY_LIST_SUCCESS,
          payload: success.data,
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.EDIT_MAIN_CATEGORY_LIST_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const editMainCategoryData = (id, industry, data) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.EDIT_MAIN_CATEGORY_DATA_LOADING,
      loading: true,
    });

    AppointmentRequest.patch(AppointmentRequest.AppointmentEndpoint.editMainCategoryData.replace("_id", id).replace("__type__", industry), data,
      (success) => {
        let data = {
          ...success.data,
          _id: id
        }
        dispatch({
          type: APPOINTMENTTYPES.EDIT_MAIN_CATEGORY_DATA_SUCCESS,
          payload: data
        })
        dispatch(showSuccessPopup("Main Category updated successfully!"));
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.EDIT_MAIN_CATEGORY_DATA_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const resetGetMainSingleCategory = () => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_SINGLE_MAIN_CATEGORY_RESET
    })
  }
}

export const deleteMainCategory = (id, industry) => {
  return (dispatch) => {
    let data = {};
    dispatch({
      type: APPOINTMENTTYPES.DELETE_MAIN_CATEGORY_LIST_LOADING,
      payload: []
    })
    AppointmentRequest.delete(AppointmentRequest.AppointmentEndpoint.deleteMainCategory.replace("categoryId", id).replace("__type__", industry), data,
      (success) => {
        // console.log(id, "426")
        dispatch({
          type: APPOINTMENTTYPES.DELETE_MAIN_CATEGORY_LIST_SUCCESS,
          payload: id,
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.DELETE_MAIN_CATEGORY_LIST_ERROR,
        })
        dispatch(setCommonError(error.message))
      },
    )
  }
}
// GET BOOKING SETTING
// export const getBookingSetting = () => {
//   return (dispatch) => {
//     dispatch({
//       type: APPOINTMENTTYPES.GET_BOOK_SETTING_LOADING,
//       loading: true
//     });
//     AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getBookingSetting,
//       (success) => {
//         // console.log(success.data)
//         dispatch({
//           type: APPOINTMENTTYPES.GET_BOOK_SETTING_SUCCESS,
//           payload: success.data
//         })
//       },
//       (error) => {
//         dispatch({
//           type: APPOINTMENTTYPES.GET_BOOK_SETTING_ERROR,
//           payload: []
//         })
//         dispatch(setCommonError(error.message))
//       }
//     )
//   }
// }
// Services List
export const postPolicyData = (industry, data) => {
  // console.log(data, "line500")
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.CREATE_BOOK_SERVICELIST_LOADING,
      loading: true
    });
    AppointmentRequest.post(AppointmentRequest.AppointmentEndpoint.postpolicy.replace("__type__", industry), data,
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.CREATE_BOOK_SERVICELIST_SUCCESS,
          payload: success.data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.CREATE_BOOK_SERVICELIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const getServicePolicyData = (owner, institute, industry) => {
  // console.log(institute, owner, "line525")
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_BOOK_SERVICELIST_LOADING,
      loading: true
    });

    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getpolicy.replace("OWNID", owner).replace("INSID", institute).replace("__type__", industry),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_BOOK_SERVICELIST_SUCCESS,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_BOOK_SERVICELIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const editPolicyData = (id, industry, data) => {
  // console.log(id, data, "kfdgrdrdrt")
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.UPDATE_BOOK_SERVICELIST_LOADING,
      loading: true,
    });
    AppointmentRequest.patch(AppointmentRequest.AppointmentEndpoint.editpolicy.replace("_ID", id).replace("__type__", industry), data,
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.UPDATE_BOOK_SERVICELIST_SUCCESS,
          payload: success.data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.UPDATE_BOOK_SERVICELIST_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
//get service by multi categ

export const getServicesBycategories = (businessId, ownerId, value, industry, data, firstTime) => {
  // console.log(id, data, "kfdgrdrdrt")
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_SERVICE_LIST_BY_CATEGOERY_LOADING,
      loading: true,
    });
    AppointmentRequest.post(AppointmentRequest.AppointmentEndpoint.getServicesBycategories.replace("_insID_", businessId).replace("_ownerID_", ownerId).replace("_VALUE_", value).replace("__type__", industry),
      data,
      (success) => {
        if (firstTime) {
          dispatch({
            type: APPOINTMENTTYPES.SEARCH_SERVICE,
            payload: success.data.data
          })
        } else {
          dispatch({
            type: APPOINTMENTTYPES.GET_SERVICE_LIST_BY_CATEGOERY_SUCCESS,
            payload: success.data.data
          })
        }

      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_SERVICE_LIST_BY_CATEGOERY_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const servicesSearch = (businessId, ownerId, value, industry) => {
  // console.log(id, data, "kfdgrdrdrt")
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_SERVICE_LIST_BY_CATEGOERY_LOADING,
      loading: true,
    });
    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getServicesSearch.replace("_insID_", businessId).replace("_ownerID_", ownerId).replace("_VALUE_", value).replace("__type__", industry),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.SEARCH_SERVICE,
          payload: success.data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_SERVICE_LIST_BY_CATEGOERY_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const getMainBusinessCategory = (businessId, ownerId, industry) => {
  // console.log(id, data, "kfdgrdrdrt")
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_MAIN_BUSINESS_CATEGORY_LOADING,
      loading: true,
    });
    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getMainBusiCategory.replace("_insID_", businessId).replace("_ownerID_", ownerId).replace("__type__", industry),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_MAIN_BUSINESS_CATEGORY_SUCCESS,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_MAIN_BUSINESS_CATEGORY_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const editMainBusinessCategory = (businessId, ownerId, industry, data) => {
  // console.log(id, data, "kfdgrdrdrt")
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.EDIT_MAIN_BUSINESS_CATEGORY_LOADING,
      loading: true,
    });
    AppointmentRequest.patch(AppointmentRequest.AppointmentEndpoint.editMainBusiCategory.replace("_insID_", businessId).replace("_ownerID_", ownerId).replace("__type__", industry), data,
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.EDIT_MAIN_BUSINESS_CATEGORY_SUCCESS,
          payload: success.data.data
        })
        AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getMainBusiCategory.replace("_insID_", businessId).replace("_ownerID_", ownerId).replace("__type__", industry),
          (success) => {
            dispatch({
              type: APPOINTMENTTYPES.GET_MAIN_BUSINESS_CATEGORY_SUCCESS,
              payload: success.data.data
            })
          },
          (error) => {
            dispatch({
              type: APPOINTMENTTYPES.GET_MAIN_BUSINESS_CATEGORY_ERROR
            })
            dispatch(setCommonError(error.message))
          }
        )
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.EDIT_MAIN_BUSINESS_CATEGORY_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const MultiDeleteOrUncat = (catId, industry, data) => {
  // console.log(id, data, "kfdgrdrdrt")
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.MULTI_DELETE_UNCAT_LOADING,
      loading: true,
    });
    AppointmentRequest.patch(AppointmentRequest.AppointmentEndpoint.multiDeleteUnCategory.replace("_catID_", catId).replace("__type__", industry), data,
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.MULTI_DELETE_UNCAT_SUCCESS,
          payload: data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.MULTI_DELETE_UNCAT_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const resetMultiDeleteOrUncat = () => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.MULTI_DELETE_UNCAT_RESET,
      payload: []
    })
  }
}
export const deleteCategory = (catId, industry, data) => {
  // console.log(id, data, "kfdgrdrdrt")
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.DELETE_CATEGORY_LOADING,
      loading: true,
    });
    AppointmentRequest.patch(AppointmentRequest.AppointmentEndpoint.deleteCategory.replace("_catID_", catId).replace("__type__", industry), data,
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.DELETE_CATEGORY_SUCCESS,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.DELETE_CATEGORY_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const postcollection = (data, industry) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.POST_COLLECTION_LOADING,
      loading: true,
    })

    AppointmentRequest.post(AppointmentRequest.AppointmentEndpoint.postCollection.replace("__type__", industry), data,
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.POST_COLLECTION_SUCCESS,
          payload: success.data
        })
        dispatch(showSuccessPopup("Collection created successfully!"));
      },
      error => {
        dispatch({
          type: APPOINTMENTTYPES.POST_COLLECTION_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const postcollectionReset = () => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.POST_COLLECTION_RESET,
      payload: []
    })
  }
}
export const getAllCollection = (industry, businessId, ownerId, Svalue) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_COLLECTION_LOADING,
      loading: true,
    })
    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getAllCollection.replace("_Type_", industry).replace("_buesinessid_", businessId).replace("_ownerID_", ownerId).replace("_value_", Svalue),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_COLLECTION_SUCCESS,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_COLLECTION_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const getAllCollectionReset =()=> {
  return(dispatch)=> {
    dispatch({
      type:APPOINTMENTTYPES.GET_COLLECTION_RESET,
      payload:[]
    })
  }
}

export const getSingleCollection = (industry, businessId, CollectionID) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_SINGLE_COLLECTION_LOADING,
      loading: true,
    })
    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getSigleCollection.replace("_Type_", industry).replace("_buesinessid_", businessId).replace("_CollectionID_", CollectionID),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_SINGLE_COLLECTION_SUCCESS,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_SINGLE_COLLECTION_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}


export const getSingleCollectionReset =()=> {
  return(dispatch)=> {
    dispatch({
      type:APPOINTMENTTYPES.GET_SINGLE_COLLECTION_RESET,
      payload:[]
    })
  }
}

export const getSingleCollectionEndUser = (industry, businessId, urlSlug) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_SINGLE_COLLECTION_ENDUSER_LOADING,
      loading: true,
    })
    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getSigleCollectionEndUser.replace("_Type_", industry).replace("_buesinessid_", businessId).replace("_urlSlug_", urlSlug),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_SINGLE_COLLECTION_ENDUSER_SUCCESS,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_SINGLE_COLLECTION_ENDUSER_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
//getShowOnHeaderCollections
export const getShowOnHeaderCollections = (businessId ,owner, industry) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_SHOW_ON_HEADER_COLLECTION_LOADING,
      loading: true,
    })
    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getShowOnHeaderCollections.replace("_buesinessid_", businessId).replace("_OWNER_", owner).replace("_Type_", industry),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_SHOW_ON_HEADER_COLLECTION_SUCCESS,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_SHOW_ON_HEADER_COLLECTION_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const getMainBusiCollectionName = (industry, businessId, ownerId) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_MAIN_BUSINESS_COLLECTION_LOADING,
      loading: true,
    })
    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getMainBusiCollection.replace("_Type_", industry).replace("_buesinessid_", businessId).replace("_ownerID_", ownerId),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_MAIN_BUSINESS_COLLECTION_SUCCESS,
          payload: success.data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_MAIN_BUSINESS_COLLECTION_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const editMainBusiCollectionName = (industry, businessId, ownerId, data) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.EDIT_MAIN_BUSINESS_COLLECTION_LOADING,
      loading: true,
    })
    AppointmentRequest.patch(AppointmentRequest.AppointmentEndpoint.editMainBusiCollection.replace("_Type_", industry).replace("_buesinessid_", businessId).replace("_ownerID_", ownerId),
      data,
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.EDIT_MAIN_BUSINESS_COLLECTION_SUCCESS,
          payload: success.data
        })
        AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getMainBusiCollection.replace("_Type_", industry).replace("_buesinessid_", businessId).replace("_ownerID_", ownerId),
          (success) => {
            dispatch({
              type: APPOINTMENTTYPES.GET_MAIN_BUSINESS_COLLECTION_SUCCESS,
              payload: success.data
            })
          },
          (error) => {
            dispatch({
              type: APPOINTMENTTYPES.GET_MAIN_BUSINESS_COLLECTION_ERROR
            })
            dispatch(setCommonError(error.message))
          }
        )

      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.EDIT_MAIN_BUSINESS_COLLECTION_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )

  }
}
export const deleteCollection = (industry, CollectionID) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.DELETE_COLLECTION_LOADING,
      loading: true,
    })
    AppointmentRequest.delete(AppointmentRequest.AppointmentEndpoint.deleteCollection.replace("_Type_", industry).replace("CollectionID", CollectionID),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.DELETE_COLLECTION_SUCCESS,
          payload: success.data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.DELETE_COLLECTION_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const editCollection = (industry, CollectionID, data) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.EDIT_COLLECTION_LOADING,
      loading: true,
    })
    AppointmentRequest.patch(AppointmentRequest.AppointmentEndpoint.editCollection.replace("_Type_", industry).replace("CollectionID", CollectionID), data,
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.EDIT_COLLECTION_SUCCESS,
          payload: success.data
        })
        // console.log(success.data, "Sdata")
        // AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getSigleCollection.replace("_Type_", industry).replace("_buesinessid_", data?.business).replace("_CollectionID_", CollectionID),
        //   (success) => {
        //     dispatch({
        //       type: APPOINTMENTTYPES.GET_SINGLE_COLLECTION_SUCCESS,
        //       payload: success.data.data
        //     })
        //   },
        //   (error) => {
        //     dispatch({
        //       type: APPOINTMENTTYPES.GET_SINGLE_COLLECTION_ERROR
        //     })
        //     dispatch(setCommonError(error.message))
        //   }
        // )
        AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getAllCollection.replace("_Type_", industry).replace("_buesinessid_", data.business).replace("_ownerID_", data.owner).replace("_value_", ""),
          (success) => {
            dispatch({
              type: APPOINTMENTTYPES.GET_COLLECTION_SUCCESS,
              payload: success.data.data
            })
          },
          (error) => {
            dispatch({
              type: APPOINTMENTTYPES.GET_COLLECTION_ERROR
            })
            dispatch(setCommonError(error.message))
          }
        )

      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.EDIT_COLLECTION_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const editcollectionReset = () => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.EDIT_COLLECTION_RESET,
      payload: []
    })
  }
}


//BOOKING FORM ON BOOKING BUTTON 

export const PostBookingFormData = (industry, data) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.BOOKING_FORM_ON_BOOKING_BUTTON_LOADING,
      loading: true
    });
    AppointmentRequest.post(AppointmentRequest.AppointmentEndpoint.postBookingFormData.replace("__type__", industry), data,
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.BOOKING_FORM_ON_BOOKING_BUTTON_LOADED,
          payload: success.data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.BOOKING_FORM_ON_BOOKING_BUTTON_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}

// GET FOR DISABLE BUTTON
export const getDisableButtonData = (busniess, industry) => {
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.GET_DISABLE_BUTTON_DATA_LOADING,
      loading: true
    });

    AppointmentRequest.get(AppointmentRequest.AppointmentEndpoint.getDisableButtonData.replace("busniess", busniess).replace("__type__", industry),
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_DISABLE_BUTTON_DATA_LOADED,
          payload: success.data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.GET_DISABLE_BUTTON_DATA_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
// PATCH DISABLEBUTTON DATA
export const patchDisableDataButton = (id, industry, data) => {
  // console.log(id, data, "kfdgrdrdrt")
  return (dispatch) => {
    dispatch({
      type: APPOINTMENTTYPES.PATCH_DISABLE_BUTTON_DATA_LOADING,
      loading: true,
    });
    AppointmentRequest.patch(AppointmentRequest.AppointmentEndpoint.patchDisableButtonData.replace("id", id).replace("__type__", industry), data,
      (success) => {
        dispatch({
          type: APPOINTMENTTYPES.PATCH_DISABLE_BUTTON_DATA_LOADED,
          payload: success.data
        })
      },
      (error) => {
        dispatch({
          type: APPOINTMENTTYPES.PATCH_DISABLE_BUTTON_DATA_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
