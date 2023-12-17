import { InvitationHistoryActionType } from "./actionType";
import InvitationHistoryRequest from "./invitationHistoryRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getInvitationsHistoryList = (insID, roleID, UILIST) => {
  return dispatch => {

    dispatch({
      type: InvitationHistoryActionType.INVITATION_HISTORY_LIST_LOADING,
      payload: [],
    })

    InvitationHistoryRequest.get(InvitationHistoryRequest.InvitationHistoryEndpoint.getInvitationHistoryList.replace("__INSID__", insID).replace("__ROLE__", roleID).replace("__UILIST__", UILIST), (success) => {
      if (UILIST === "teacherList") {
        dispatch({
          type: InvitationHistoryActionType.INVITATION_HISTORY_LIST_LOADED,
          payload: success.data.teacherList
        })
      } else {
        dispatch({
          type: InvitationHistoryActionType.INVITATION_HISTORY_LIST_LOADED,
          payload: success.data.studentList
        })
      }


    },
      error => {
        dispatch({
          type: InvitationHistoryActionType.INVITATION_HISTORY_LIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      });

  }
}

export const searchInvitationHistory = (insID, roleID, UILIST, val) => {
  return dispatch => {

    dispatch({
      type: InvitationHistoryActionType.SEARCH_INVITATION_LIST_LOADING,
      payload: [],
    })

    InvitationHistoryRequest.get(InvitationHistoryRequest.InvitationHistoryEndpoint.searchInvitationHistoryList.replace("__INSID__", insID).replace("__ROLE__", roleID).replace("__UILIST__", UILIST).replace("__VAL__", val), (success) => {
      if (UILIST === "teacherList") {
        dispatch({
          type: InvitationHistoryActionType.SEARCH_INVITATION_LIST_LOADED,
          payload: success.data.teacherList
        })
      } else {
        dispatch({
          type: InvitationHistoryActionType.SEARCH_INVITATION_LIST_LOADED,
          payload: success.data.studentList
        })
      }
    },
      error => {
        dispatch({
          type: InvitationHistoryActionType.SEARCH_INVITATION_LIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      });

  }
}
export const MutlitdropDownInvitationHistory = (insID, role, courseId, classroomID) => {
  return dispatch => {

    dispatch({
      type: InvitationHistoryActionType.INVITATION_HISTORY_LIST_LOADING,
      payload: [],
    })

    InvitationHistoryRequest.get(InvitationHistoryRequest.InvitationHistoryEndpoint.MultiSelectInvitationHistoryList.replace("__INSID__", insID).replace("__ROLE__", role).replace("__COURSE__", courseId).replace("__CLASSROOM__", classroomID), (success) => {

      dispatch({
        type: InvitationHistoryActionType.INVITATION_HISTORY_LIST_LOADED,
        payload: success.data.teacherList
      })
    },
      error => {
        dispatch({
          type: InvitationHistoryActionType.INVITATION_HISTORY_LIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      });

  }
}
export const MultiSelectStudentInvitationFilter = (insID, role, courseId) => {
  return dispatch => {

    dispatch({
      type: InvitationHistoryActionType.INVITATION_HISTORY_LIST_LOADING,
      payload: [],
    })

    InvitationHistoryRequest.get(InvitationHistoryRequest.InvitationHistoryEndpoint.MultiSelectStudentInvitationHistoryList.replace("__INSID__", insID).replace("__ROLE__", role).replace("__COURSE__", courseId), (success) => {

      dispatch({
        type: InvitationHistoryActionType.INVITATION_HISTORY_LIST_LOADED,
        payload: success.data.teacherList
      })
    },
      error => {
        dispatch({
          type: InvitationHistoryActionType.INVITATION_HISTORY_LIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      });

  }
}

export const SortByInvitationHistory = (insID, roleID, UILIST, sortBy, val) => {
  return dispatch => {

    dispatch({
      type: InvitationHistoryActionType.SEARCH_INVITATION_LIST_LOADING,
      payload: [],
    })

    InvitationHistoryRequest.get(InvitationHistoryRequest.InvitationHistoryEndpoint.sortByInvitationHistoryList.replace("__INSID__", insID).replace("__ROLE__", roleID).replace("__UILIST__", UILIST).replace("__SortBY__", sortBy).replace("__VAL__", val), (success) => {
      if (UILIST === "teacherList") {
        dispatch({
          type: InvitationHistoryActionType.SEARCH_INVITATION_LIST_LOADED,
          payload: success.data.teacherList
        })
      } else {
        dispatch({
          type: InvitationHistoryActionType.SEARCH_INVITATION_LIST_LOADED,
          payload: success.data.studentList
        })
      }
    },
      error => {
        dispatch({
          type: InvitationHistoryActionType.SEARCH_INVITATION_LIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      });

  }
}


export const deleteInvitationHistory = (ID) => {
  return dispatch => {

    dispatch({
      type: InvitationHistoryActionType.INVITATION_HISTORY_DELETE_LOADING,
      payload: [],
    })

    InvitationHistoryRequest.delete(InvitationHistoryRequest.InvitationHistoryEndpoint.deleteInvitationHistoryList.replace("__ID__", ID), (success) => {
      dispatch(showSuccessPopup("Invitation deleted successfully."))
      dispatch({
        type: InvitationHistoryActionType.INVITATION_HISTORY_DELETE_SUCCESS,
        payload: ID
      })

    },
      error => {
        dispatch({
          type: InvitationHistoryActionType.INVITATION_HISTORY_DELETE_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      });

  }
}
export const ResendInvitationHistory = (ID, Data) => {
  return dispatch => {

    dispatch({
      type: InvitationHistoryActionType.INVITATION_HISTORY_RESEND_LOADING,
      payload: [],
    })

    InvitationHistoryRequest.patch(
      InvitationHistoryRequest.InvitationHistoryEndpoint.resendInvitationHistoryList.replace("__ID__", ID),
      Data,
      (success) => {
        dispatch(showSuccessPopup("Invitation resend successfully."))
        dispatch({
          type: InvitationHistoryActionType.INVITATION_HISTORY_RESEND_SUCCESS,
          payload: ID
        })

      },
      error => {
        dispatch({
          type: InvitationHistoryActionType.INVITATION_HISTORY_RESEND_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      });

  }
}

export const ResetInvitationHistory = () => {
  return dispatch => {

    dispatch({
      type: InvitationHistoryActionType.INVITATION_HISTORY_LIST_RESET,
      payload: [],
    })
  }
}
