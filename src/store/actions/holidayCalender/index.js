import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { HOLIDAYTYPES } from "./actionType";
import HolidayCalendarRequest from "./HolidayCalendarRequest";

export const createHolidayDetails = (data)=>{
  return (dispatch)=>{
    dispatch({
      type: HOLIDAYTYPES.CREATE_HOLIDAY_LOADING,
      payload: [],
  })
  HolidayCalendarRequest.post(HolidayCalendarRequest.holidayCalendarEndpoint.addHoliday,
      data,
      (success) => {
          dispatch({
              type: HOLIDAYTYPES.CREATE_HOLIDAY_LOADED,
              payload: success.data.data
          })
          dispatch(showSuccessPopup("Holiday Created!"))
      },
      error => {
          dispatch(setCommonError(error.message))
          dispatch({
              type: HOLIDAYTYPES.CREATE_HOLIDAY_ERROR,
              payload: []
          })
      });
  }
}
export const resetCreateHoliday = ()=>{
  return (dispatch)=>{
    dispatch({
      type:HOLIDAYTYPES.CREATE_HOLIDAY_RESET
    })
  }
}
export const resetEditHoliday = ()=>{
  return (dispatch)=>{
    dispatch({
      type:HOLIDAYTYPES.EDIT_HOLIDAY_RESET
    })
  }
}

export const editHolidayDetails = (_id,data,month)=>{

  return (dispatch)=>{
    dispatch({
      type: HOLIDAYTYPES.EDIT_HOLIDAY_LOADING,
      payload: [],
  })
  HolidayCalendarRequest.patch(HolidayCalendarRequest.holidayCalendarEndpoint.editHoliday.replace("__ID__",_id),
      data,
      (success) => {
          dispatch({
              type: HOLIDAYTYPES.EDIT_HOLIDAY_LOADED,
              payload: {_id:_id,month:month,successData:success.data.data},
          })
          dispatch(showSuccessPopup("Holiday Updated Successfully.!"))
      },
      error => {
          dispatch(setCommonError(error.message))
          dispatch({
              type: HOLIDAYTYPES.EDIT_HOLIDAY_ERROR,
              payload: []
          })
      });
  }
}

export const holidayCalendarList = (insId,date)=>{
  return (dispatch)=>{
    dispatch({
      type: HOLIDAYTYPES.GET_HOLIDAY_LIST_LOADING,
      loading: true,
    });
    HolidayCalendarRequest.get(
    HolidayCalendarRequest.holidayCalendarEndpoint.getAdminHolidayList.replace("__INSID__",insId).replace("__DATE__",date),
    (success)=>{
      dispatch({
        type: HOLIDAYTYPES.GET_HOLIDAY_LIST_LOADED,
        payload: success.data.data,
      })
    },
    (error)=>{
      setCommonError(error.message);
    }
    )
  }
}

export const searchSortByHolidayList =(insId,date,query,value)=>{
  return (dispatch)=>{
    dispatch({
      type: HOLIDAYTYPES.GET_HOLIDAY_LIST_LOADING,
      loading: true,
    });
    HolidayCalendarRequest.get(
    HolidayCalendarRequest.holidayCalendarEndpoint.searchSortAdminHolidayList.replace("__INSID__",insId).replace("__DATE__",date).replace("__QUERY__",query).replace("__VALUE__",value),
    (success)=>{
      dispatch({
        type: HOLIDAYTYPES.SEARCH_SORT_HOLIDAY,
        payload: success.data.data,
      })
    },
    (error)=>{
      setCommonError(error.message);
    }
    )
  }
}

export const filterByClassrooms =(insId,date,values)=>{
  return (dispatch)=>{
    dispatch({
      type: HOLIDAYTYPES.GET_HOLIDAY_LIST_LOADING,
      loading: true,
    });
    HolidayCalendarRequest.get(
    HolidayCalendarRequest.holidayCalendarEndpoint.classroomFilterAdminHolidayList.replace("__INSID__",insId).replace("__DATE__",date).replace("__VALUES__",values),
    (success)=>{
      dispatch({
        type: HOLIDAYTYPES.CLASSROOM_FILTER_HOLIDAY,
        payload: success.data.data,
      })
    },
    (error)=>{
      setCommonError(error.message);
    }
    )
  }
}

export const getSingleHoliday =(_id)=>{
  return (dispatch)=>{
    dispatch({
      type: HOLIDAYTYPES.GET_SINGLE_HOLIDAY_LOADING,
      loading: true,
    });
    HolidayCalendarRequest.get(
    HolidayCalendarRequest.holidayCalendarEndpoint.getSingleHoliday.replace("__ID__",_id),
    (success)=>{
      dispatch({
        type: HOLIDAYTYPES.GET_SINGLE_HOLIDAY_SUCCESS,
        payload: success.data.data,
      })
    },
    (error)=>{
      setCommonError(error.message);
    }
    )
  }
}

export const resetGetSingleHoliday = ()=>{
  return (dispatch)=>{
    dispatch({
      type:HOLIDAYTYPES.GET_SINGLE_HOLIDAY_RESET,
    })
  }
}

export const deleteHoliday = (_id,month)=>{
  return (dispatch)=>{
    dispatch({
      type: HOLIDAYTYPES.DELETE_HOLIDAY_LOADING,
      loading: true,
    });
    HolidayCalendarRequest.delete(
    HolidayCalendarRequest.holidayCalendarEndpoint.deleteSingleHoliday.replace("__ID__",_id),
    (success)=>{
      dispatch({
        type: HOLIDAYTYPES.DELETE_HOLIDAY_SUCCESS,
        payload: {_id:_id,month:month,successData:success.data.data},
      })
    },
    (error)=>{
      setCommonError(error.message);
    }
    )
  }
}