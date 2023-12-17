import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { NOTICE_BOARD_ACTION_TYPES } from "./actionType";
import NoticeBoardRequest from "./NoticeBoardRequest";

export const createNoticeDetails = (data) => {
  return (dispatch) => {
    dispatch({
      type: NOTICE_BOARD_ACTION_TYPES.CREATE_NOTICE_LOADING,
      payload: [],
    })

    //  dispatch({
    //        type:NOTICE_BOARD_ACTION_TYPES.CREATE_NOTICE_LOADED,
    //        payload:data
    //      })
    NoticeBoardRequest.post(NoticeBoardRequest.noticeBoardList.addNotice,
      data,
      (success) => {
        dispatch({
          type: NOTICE_BOARD_ACTION_TYPES.CREATE_NOTICE_LOADED,
          payload: success.data
        })
        dispatch(showSuccessPopup("Notice Created!"))
      },
      error => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: NOTICE_BOARD_ACTION_TYPES.CREATE_NOTICE_ERROR,
          payload: [],
        })
      });
  }
}

export const resetCreateNotice = () => {
  return (dispatch) => {
    dispatch({
      type: NOTICE_BOARD_ACTION_TYPES.CREATE_NOTICE_RESET
    })
  }
}

export const resetEditNotice = () => {
  return (dispatch) => {
    dispatch({
      type: NOTICE_BOARD_ACTION_TYPES.EDIT_NOTICE_RESET
    })
  }
}

export const editNoticeDetails = (_id, data) => {
  return (dispatch) => {
    dispatch({
      type: NOTICE_BOARD_ACTION_TYPES.EDIT_NOTICE_LOADING,
      payload: [],
    })
    NoticeBoardRequest.patch(NoticeBoardRequest.noticeBoardList.editNotice.replace("__ID__", _id),
      data,
      (success) => {
        dispatch({
          type: NOTICE_BOARD_ACTION_TYPES.EDIT_NOTICE_LOADED,
          payload: success.data,
        })
        dispatch(showSuccessPopup("Notice Update Successfully.!"))
      },
      error => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: NOTICE_BOARD_ACTION_TYPES.EDIT_NOTICE_ERROR,
          payload: []
        })
      });
  }
}

export const getNoticeList = (insId, userID, industry) => {
  return (dispatch) => {
    dispatch({
      type: NOTICE_BOARD_ACTION_TYPES.GET_NOTICE_LIST_LOADING,
      loading: true,
    });
    NoticeBoardRequest.get(
      NoticeBoardRequest.noticeBoardList.getNotice.replace("__INSID__", insId).replace("__USERID__", userID).replace("__type__", industry),
      (success) => {
        dispatch({
          type: NOTICE_BOARD_ACTION_TYPES.GET_NOTICE_LIST_LOADED,
          payload: success.data,
        })
      },
      (error) => {
        setCommonError(error.message);
      }
    )
  }
}

export const searchSortByNoticeList = (insID, id, value, industry) => {
  return (dispatch) => {
    dispatch({
      type: NOTICE_BOARD_ACTION_TYPES.GET_NOTICE_LIST_LOADING,
      loading: true,
    });
    NoticeBoardRequest.get(
      NoticeBoardRequest.noticeBoardList.searchSortByNoticeList.replace("__INSID__", insID).replace("__USERID__", id).replace("__VALUE__", value).replace("__type__", industry),
      (success) => {
        dispatch({
          type: NOTICE_BOARD_ACTION_TYPES.GET_NOTICE_LIST_LOADED,
          payload: success.data,
        })
      },
      (error) => {
        setCommonError(error.message);
      }
    )
  }
}


export const getSingleNotice = (_id, industry) => {
  return (dispatch) => {
    dispatch({
      type: NOTICE_BOARD_ACTION_TYPES.GET_SINGLE_NOTICE_LOADING,
      loading: true,
    });
    NoticeBoardRequest.get(NoticeBoardRequest.noticeBoardList.getSingleNotice.replace("__ID__", _id).replace("__type__", industry),
      (success) => {
        dispatch({
          type: NOTICE_BOARD_ACTION_TYPES.GET_SINGLE_NOTICE_SUCCESS,
          payload: success.data,
        })
      },
      (error) => {
        setCommonError(error.message);
      }
    )
  }
}

export const resetGetSingleNotice = () => {
  return (dispatch) => {
    dispatch({
      type: NOTICE_BOARD_ACTION_TYPES.GET_SINGLE_NOTICE_RESET,
    })
  }
}

export const deleteNotice = (_id, industry) => {
  return (dispatch) => {
    let data = {};
    dispatch({
      type: NOTICE_BOARD_ACTION_TYPES.DELETE_NOTICE_LOADING,
      payload: []
    });
    // dispatch({
    //   type: NOTICE_BOARD_ACTION_TYPES.DELETE_NOTICE_SUCCESS,
    //   payload: _id,
    // });
    NoticeBoardRequest.post(
      NoticeBoardRequest.noticeBoardList.deleteSingleNotice.replace("__ID__", _id).replace("__type__", industry), data,
      (success) => {
        dispatch({
          type: NOTICE_BOARD_ACTION_TYPES.DELETE_NOTICE_SUCCESS,
          payload: _id,
        })
      },
      (error) => {
        setCommonError(error.message);
      }
    )
  }
}



