
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { VISITORTYPES } from "./actionTypes";
import visitorRequest from "./visitorRequest";

// post visitor detail
export const postVisitorDetail = (data, type) => {
  return (dispatch) => {
    if (type === "save") {
      dispatch({
        type: VISITORTYPES.POST_VISITOR_LOADING,
        payload: []
      })
    }
    else {
      dispatch({
        type: VISITORTYPES.POST_VISITOR_CANCEL_LOADING,
        payload: []
      })
    }

    visitorRequest.post(visitorRequest.visitorEndpoint.postVisitor,
      data,
      (success) => {
        dispatch({
          type: VISITORTYPES.POST_VISITOR_LOADED,
          payload: success.data
        })
        if (type === "save") {
          dispatch(showSuccessPopup("Visitor details added successfully!"));
        }
      },
      error => {
        dispatch({
          type: VISITORTYPES.POST_VISITOR_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

export const resetPostVisitorDetail = () => {
  return (dispatch) => {
    dispatch({
      type: VISITORTYPES.POST_VISITOR_RESET,
      payload: []
    })
  }
}

//get visitor details
export const getVisitorList = (id, date) => {
  return (dispatch) => {
    dispatch({
      type: VISITORTYPES.GET_VISITOR_LIST_LOADING,
      loading: true,
    })
    visitorRequest.get(visitorRequest.visitorEndpoint.getVisitorList.replace("_Id_", id)
      .replace("_date_", date),
      (success) => {
        dispatch({
          type: VISITORTYPES.GET_VISITOR_LIST_LOADED,
          payload: success.data
        })
      },
      error => {
        dispatch({
          type: VISITORTYPES.GET_VISITOR_LIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

export const resetVisitorList = () => {
  return (dispatch) => {
    dispatch({
      type: VISITORTYPES.GET_VISITOR_LIST_RESET,
      payload: []
    })
  }
}

// get single visitor detail
export const getSingleVisitor = (id) => {
  return (dispatch) => {
    dispatch({
      type: VISITORTYPES.GET_SINGLE_VISITOR_LOADING,
      loading: true
    })
    visitorRequest.get(visitorRequest.visitorEndpoint.getSingleVisitor.replace("_Id_", id),
      (success) => {
        dispatch({
          type: VISITORTYPES.GET_SINGLE_VISITOR_LOADED,
          payload: success.data
        })
      },
      (error) => {
        setCommonError(error.message)
      })
  }
}
export const resetSingleVisitor = () => {
  return (dispatch) => {
    dispatch({
      type: VISITORTYPES.GET_SINGLE_VISITOR_RESET,
      payload: []
    })
  }
}

//edit visitor detail
export const editVisitorDetail = (id, data) => {
  return (dispatch) => {
    dispatch({
      type: VISITORTYPES.EDIT_VISITOR_LOADING,
      loading: true,
    })
    visitorRequest.patch(visitorRequest.visitorEndpoint.editVisitor.replace("_Id_", id),
      data,
      (success) => {
        dispatch({
          type: VISITORTYPES.EDIT_VISITOR_LOADED,
          payload: success.data
        })
        dispatch(showSuccessPopup("Visitor Detail Updated Successfully !"))
      },
      error => {
        dispatch({
          type: VISITORTYPES.EDIT_VISITOR_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}
export const resetEditVisitorDetail = () => {
  return (dispatch) => {
    dispatch({
      type: VISITORTYPES.EDIT_VISITOR_RESET,
      payload: []
    })
  }
}

//search visitor
export const searchVisitor = (id, value, date) => {
  return (dispatch) => {
    dispatch({
      type: VISITORTYPES.GET_VISITOR_LIST_LOADING,
      loading: true
    })
    visitorRequest.get(visitorRequest.visitorEndpoint.searchVisitor.replace("_Id_", id)
      .replace("_date_", date)
      .replace("_value_", value),
      (success) => {
        dispatch({
          type: VISITORTYPES.SEARCH_VISITOR,
          payload: success.data
        })
      }, (error) => {
        setCommonError(error.message)
      })
  }
}

//sort-by filter
export const sortVisitor = (id, data, date) => {
  return (dispatch) => {
    dispatch({
      type: VISITORTYPES.GET_VISITOR_LIST_LOADING,
      loading: true
    })
    visitorRequest.get(visitorRequest.visitorEndpoint.sortVisitor.replace("_Id_", id)
      .replace("_date_", date)
      .replace("_status_", data),
      (success) => {
        dispatch({
          type: VISITORTYPES.SORT_VISITOR,
          payload: success.data
        })
      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}

//teacher-------------------
export const getTeacherVisitorList = (instID, userID, date) => {
  return (dispatch) => {
    dispatch({
      type: VISITORTYPES.GET_TEACHER_VISITOR_LIST_LOADING,
      loading: true
    })
    if (userID === "") {
      visitorRequest.get(visitorRequest.visitorEndpoint.getAdminVisitorList.replace("_ID_", instID).replace("_DATE_", date),
        (success) => {
          dispatch({
            type: VISITORTYPES.GET_TEACHER_VISITOR_LIST_LOADED,
            payload: success.data
          })
        }, (error) => {
          dispatch(setCommonError(error.message))
        }
      )
    } else {
      visitorRequest.get(visitorRequest.visitorEndpoint.getTeacherVisitorList.replace("_ID_", instID).replace("_USERID_", userID).replace("_DATE_", date),
        (success) => {
          dispatch({
            type: VISITORTYPES.GET_TEACHER_VISITOR_LIST_LOADED,
            payload: success.data
          })
        }, (error) => {
          dispatch(setCommonError(error.message))
        }
      )
    }

  }
}

export const canceledStatus = (_id, data) => {
  return dispatch => {
    dispatch({
      type: VISITORTYPES.EDIT_VISITOR_LOADING,
      loading: true,
    })
    visitorRequest.patch(visitorRequest.visitorEndpoint.editVisitor.replace("_Id_", _id), data,
      (success) => {

        dispatch({
          type: VISITORTYPES.STATUS_CANCELED,
          payload: success.data
        })
        dispatch(showSuccessPopup("Cancelled Successfully!"));
      },
      error => {
        dispatch({
          type: VISITORTYPES.EDIT_VISITOR_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

export const checkOut = (_id, data) => {
  return dispatch => {
    dispatch({
      type: VISITORTYPES.EDIT_VISITOR_LOADING,
      loading: true,
    })
    visitorRequest.patch(visitorRequest.visitorEndpoint.editVisitor.replace("_Id_", _id), data,
      (success) => {

        dispatch({
          type: VISITORTYPES.STATUS_CANCELED,
          payload: success.data
        })
        dispatch(showSuccessPopup("Checked Out Successfully!"));
      },
      error => {
        dispatch({
          type: VISITORTYPES.EDIT_VISITOR_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

//Adminteacher status change

export const getTeacherSortList = (instID, userID, date, value) => {
  return (dispatch) => {
    dispatch({
      type: VISITORTYPES.GET_TEACHER_VISITOR_LIST_LOADING,
      loading: true
    })
    if (userID) {
      visitorRequest.get(visitorRequest.visitorEndpoint.getTeacherSortList.replace("_ID_", instID).replace("_USERID_", userID).replace("_DATE_", date).replace("_VALUE_", value),
        (success) => {
          dispatch({
            type: VISITORTYPES.GET_TEACHER_VISITOR_LIST_LOADED,
            payload: success.data
          })
        }, (error) => {
          dispatch(setCommonError(error.message))
        }
      )
    } else {
      visitorRequest.get(visitorRequest.visitorEndpoint.sortVisitor.replace("_Id_", instID)
        .replace("_date_", date)
        .replace("_status_", value),
        (success) => {
          dispatch({
            type: VISITORTYPES.GET_TEACHER_VISITOR_LIST_LOADED,
            payload: success.data
          })
        }, (error) => {
          dispatch(setCommonError(error.message))
        }
      )
    }

  }
}

export const searchTeacherVisitor = (instID, userID, date, value) => {
  return (dispatch) => {
    dispatch({
      type: VISITORTYPES.GET_TEACHER_VISITOR_LIST_LOADING,
      loading: true
    })
    if (userID) {
      visitorRequest.get(visitorRequest.visitorEndpoint.searchTeacherVisitor.replace("_ID_", instID)
        .replace("_USERID_", userID).replace("_DATE_", date).replace("_VALUE_", value),
        (success) => {
          dispatch({
            type: VISITORTYPES.GET_TEACHER_VISITOR_LIST_LOADED,
            payload: success.data
          })
        }, (error) => {
          dispatch(setCommonError(error.message))
        }
      )
    } else {
      visitorRequest.get(visitorRequest.visitorEndpoint.searchVisitor.replace("_Id_", instID)
        .replace("_date_", date)
        .replace("_value_", value),
        (success) => {
          dispatch({
            type: VISITORTYPES.GET_TEACHER_VISITOR_LIST_LOADED,
            payload: success.data
          })
        }, (error) => {
          setCommonError(error.message)
        })
    }

  }
}
//teacher status
//Adminteacher status change
export const VisitorStatus = (_id, data) => {
  return dispatch => {
    visitorRequest.patch(visitorRequest.visitorEndpoint.editVisitor.replace("_Id_", _id), data,
      (success) => {
        dispatch({
          type: VISITORTYPES.VISITOR_STATUS,
          payload: success.data
        })
        // dispatch(showSuccessPopup("Visitor Status updated."));
      },
      error => {
        dispatch({
          type: VISITORTYPES.EDIT_VISITOR_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}
