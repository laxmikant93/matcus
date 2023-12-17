import { InvitationHistoryActionType } from "../actions/invitationhistory/actionType";

const INVITATION_HISTORY_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false
  },
  delete: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  resend: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },

}

const TEACHER_INVITATION = (state = INVITATION_HISTORY_INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case InvitationHistoryActionType.INVITATION_HISTORY_LIST_LOADING:
      return ({
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case InvitationHistoryActionType.INVITATION_HISTORY_LIST_LOADED:
      return ({
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: false,
          loaded: true,
          success: true,
          error: false,
        }
      })

    case InvitationHistoryActionType.INVITATION_HISTORY_LIST_ERROR:
      return ({
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: false,
          loaded: false,
          success: false,
          error: true,
        }
      })
    case InvitationHistoryActionType.INVITATION_HISTORY_LIST_RESET:
      return ({
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: false,
          loaded: false,
          success: false,
          error: false,
        }
      })
    case InvitationHistoryActionType.INVITATION_HISTORY_DELETE_LOADING:
      return ({
        ...state,
        delete: {
          ...state.delete,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case InvitationHistoryActionType.INVITATION_HISTORY_DELETE_SUCCESS:
      return ({
        ...state,
        list: {
          ...state.list,
          data: state.list.data.filter((item) => item._id !== payload),
        }
        , delete: {
          ...state.delete,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        }
      })

    case InvitationHistoryActionType.INVITATION_HISTORY_DELETE_ERROR:
      return ({
        ...state,
        delete: {
          ...state.delete,
          data: [],
          loading: false,
          loaded: false,
          success: false,
          error: true,
        }
      })
    case InvitationHistoryActionType.INVITATION_HISTORY_RESEND_LOADING:
      return ({
        ...state,
        resend: {
          ...state.resend,
          data: [],
          loading: true,
          loaded: false,
          success: false,
          error: false,
        }
      })
    case InvitationHistoryActionType.INVITATION_HISTORY_RESEND_SUCCESS:
      return ({
        ...state,
        resend: {
          ...state.resend,
          data: [],
          loading: false,
          error: false,
          loaded: true,
          success: true,
        }
      })

    case InvitationHistoryActionType.INVITATION_HISTORY_RESEND_ERROR:
      return ({
        ...state,
        resend: {
          ...state.resend,
          data: payload,
          loading: false,
          loaded: false,
          success: false,
          error: true,
        }
      })
    case InvitationHistoryActionType.SEARCH_INVITATION_LIST_LOADING:
      return ({
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: true,
          loaded: false,
          success: false,
          error: false,
        }
      })
    case InvitationHistoryActionType.SEARCH_INVITATION_LIST_LOADED:
      return ({
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        }
      })

    case InvitationHistoryActionType.SEARCH_INVITATION_LIST_ERROR:
      return ({
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: false,
          loaded: false,
          success: false,
          error: true,
        }
      })
    default:
      return state
  }
}

export default TEACHER_INVITATION;