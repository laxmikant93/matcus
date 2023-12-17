
import { VISITORTYPES } from "../actions/visitorManagement/actionTypes";

const VISITOR_INITIAL_TYPES = {
  postVisitor: {
    data: [],
    loading: false,
    cancelLoading: false,
    success: false,
    error: false
  },
  getVisitorList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getSingleVisitor: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  editVisitor: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  searchVisitorData: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  getTeacherVisitorList: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  getAdminVisitorList: {
    data: [],
    loading: false,
    success: false,
    error: false
  }


}
const visitorManagement = (state = VISITOR_INITIAL_TYPES, { type, payload }) => {

  switch (type) {
    case VISITORTYPES.POST_VISITOR_LOADING:
      return ({
        ...state,
        postVisitor: {
          ...state.postVisitor,
          data: [],
          loading: true,
          cancelLoading: false,
          success: false,
          error: false

        }
      })

    case VISITORTYPES.POST_VISITOR_CANCEL_LOADING:
      return ({
        ...state,
        postVisitor: {
          ...state.postVisitor,
          data: [],
          loading: false,
          cancelLoading: true,
          success: false,
          error: false

        }
      })

    case VISITORTYPES.POST_VISITOR_LOADED:
      return ({
        ...state,
        postVisitor: {
          ...state.postVisitor,
          loading: false,
          cancelLoading: false,
          success: true,
          error: false,
          data: payload
        }
      })

    case VISITORTYPES.POST_VISITOR_RESET:
      return ({
        ...state,
        postVisitor: {
          ...state.postVisitor,
          data: [],
          loading: false,
          cancelLoading: false,
          success: false,
          error: false
        }
      })

    case VISITORTYPES.POST_VISITOR_ERROR:
      return ({
        ...state,
        postVisitor: {
          ...state.postVisitor,
          data: [],
          loading: false,
          cancelLoading: false,
          success: false,
          error: true
        }
      })

    case VISITORTYPES.GET_VISITOR_LIST_LOADING:
      return ({
        ...state,
        getVisitorList: {
          ...state.getVisitorList,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case VISITORTYPES.GET_VISITOR_LIST_LOADED:
      return ({
        ...state,
        getVisitorList: {
          ...state.getVisitorList,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    case VISITORTYPES.GET_VISITOR_LIST_RESET:
      return ({
        ...state,
        getVisitorList: {
          ...state.getVisitorList,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case VISITORTYPES.GET_VISITOR_LIST_ERROR:
      return ({
        ...state,
        getVisitorList: {
          ...state.getVisitorList,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case VISITORTYPES.GET_SINGLE_VISITOR_LOADING:
      return ({
        ...state,
        getSingleVisitor: {
          ...state.getSingleVisitor,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case VISITORTYPES.GET_SINGLE_VISITOR_LOADED:
      return ({
        ...state,
        getSingleVisitor: {
          ...state.getSingleVisitor,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    case VISITORTYPES.GET_SINGLE_VISITOR_RESET:
      return ({
        ...state,
        getSingleVisitor: {
          ...state.getSingleVisitor,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })


    case VISITORTYPES.GET_SINGLE_VISITOR_ERROR:
      return ({
        ...state,
        postVisitor: {
          ...state.postVisitor,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })
    //----
    case VISITORTYPES.EDIT_VISITOR_LOADING:
      return ({
        ...state,
        editVisitor: {
          ...state.editVisitor,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case VISITORTYPES.EDIT_VISITOR_LOADED:
      return ({
        ...state,
        editVisitor: {
          ...state.editVisitor,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getVisitorList: {
          ...state.getVisitorList,
          data: payload,
          success: true
        }
      })

    case VISITORTYPES.EDIT_VISITOR_RESET:
      return ({
        ...state,
        editVisitor: {
          ...state.editVisitor,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })
    case VISITORTYPES.GET_TEACHER_VISITOR_LIST_LOADING:
      return ({
        ...state,
        getTeacherVisitorList: {
          ...state.getTeacherVisitorList,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })
    case VISITORTYPES.GET_TEACHER_VISITOR_LIST_LOADED:
      return ({
        ...state,
        getTeacherVisitorList: {
          ...state.getTeacherVisitorList,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })


    case VISITORTYPES.SEARCH_VISITOR:
      return ({
        ...state,
        getVisitorList: {
          ...state.getVisitorList,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    case VISITORTYPES.SEARCH_VISITOR_DATA:
      return ({
        ...state,
        searchVisitorData: {
          ...state.searchVisitorData,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    case VISITORTYPES.SORT_VISITOR:
      return ({
        ...state,
        getVisitorList: {
          ...state.getVisitorList,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    case VISITORTYPES.STATUS_CANCELED:
      return ({
        ...state,
        editVisitor: {
          ...state.editVisitor,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getVisitorList: {
          ...state.getVisitorList,
          data: state.getVisitorList.data.map(
            (content) => content._id === payload._id ? {
              ...content, status: payload.status, check_out: payload.check_out, cancel_reason: payload.cancel_reason
            }
              : content),
        }
      })

    //teacher status

    case VISITORTYPES.VISITOR_STATUS:
      return ({
        ...state,
        editVisitor: {
          ...state.editVisitor,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getTeacherVisitorList: {
          ...state.getTeacherVisitorList,
          data: state.getTeacherVisitorList.data.map(
            (content) => content._id === payload._id ? {
              ...content, status: payload.status, reject_reason: payload.reject_reason, check_in: payload.check_in
            }
              : content),
        }
      })
    case VISITORTYPES.VISITOR_STATUS:
      return ({
        ...state,
        editVisitor: {
          ...state.editVisitor,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getAdminVisitorList: {
          ...state.getAdminVisitorList,
          data: state.getAdminVisitorList.data.map(
            (content) => content._id === payload._id ? {
              ...content, status: payload.status,
            }
              : content),
        }
      })

    case VISITORTYPES.SORT_VISITOR:
      return ({
        ...state,
        getVisitorList: {
          ...state.getVisitorList,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    default:
      return state
  }
}

export default visitorManagement;