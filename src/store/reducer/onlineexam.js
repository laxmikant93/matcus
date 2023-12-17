import { onlineExamActionTypes } from "../actions/onlineexam/actionTypes";

const ONLINE_EXAM_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
  checkTest: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
  create: {
    loading: false,
    success: false,
    error: false,
  },
  update: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  delete: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  studentList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getSingleExam: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  graceRequest: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  },
  acceptRequest: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  },
  checkStudentExam: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
  rejectRequest: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  },
  onlineCreated: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  examresult: {
    data: {},
    loading: false,
    error: false,
    message: "",
    successResultLoaded: false,
  },
};

const onlineexam = (state = ONLINE_EXAM_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case onlineExamActionTypes.OE_LIST_LOADING:
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          laoding: true,
          error: false,
          loaded: false,
          success: false,
        },
      };

    case onlineExamActionTypes.OE_LIST_LOADED:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          laoding: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    case onlineExamActionTypes.OE_COURSE_CLASSROOM_FILTER:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          laoding: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    case onlineExamActionTypes.OE_SEARCH_TEACHER_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          laoding: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    case onlineExamActionTypes.OE_LIST_ERROR:
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          laoding: false,
          loaded: false,
          success: false,
          error: true,
        },
      };

    case onlineExamActionTypes.OE_LIST_RESET:
      return {
        ...state,
        list: ONLINE_EXAM_INITIAL_STATE.list,
      };

    case onlineExamActionTypes.OE_CREATING:
      return {
        ...state,
        create: {
          ...state.create,
          loading: true,
          success: false,
          error: false,
        },
      };

    case onlineExamActionTypes.OE_CREATED:
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          success: true,
          error: false,
        },
      };

    case onlineExamActionTypes.OE_UPDATING:
      return ({
        ...state,
        update: {
          ...state.update,
          loading: true,
          success: false,
          error: false
        }
      })

    case onlineExamActionTypes.OE_UPDATED:
      return ({
        ...state,
        update: {
          ...state.update,
          loading: false,
          success: true,
          error: false
        }
      })

    case onlineExamActionTypes.OE_UPDATE_RESET:
      return ({
        ...state,
        update: ONLINE_EXAM_INITIAL_STATE.update
      })

    case onlineExamActionTypes.OE_DELETE:
      return ({
        ...state,
        delete: {
          ...state.delete,
          loading: false,
          success: true,
          error: false
        },
        list: {
          ...state.list,
          data: state.list.data.filter((item) => item._id !== payload),
        }
      })

    case onlineExamActionTypes.OE_NOTIFY:
      return {
        ...state,
        list: {
          ...state.list,
          data: state.list.data.map((content) =>
            content._id === payload._id
              ? {
                ...content,
                isNotified: payload.isNotified,
              }
              : content
          ),
        },
      };

    case onlineExamActionTypes.OE_CANCEL:
      return {
        ...state,
        list: {
          ...state.list,
          data: state.list.data.map((content) =>
            content._id === payload._id
              ? {
                ...content,
                isCancelled: payload.isCancelled,
                isNotified: payload.isNotified,
              }
              : content
          ),
        },
      };

    case onlineExamActionTypes.OE_CHECK_STUDENT_LOADING:
      return {
        ...state,
        checkTest: {
          ...state.checkTest,
          data: {},
          loading: true,
          success: false,
          error: false,
          loaded: false,
        },
      };
    case onlineExamActionTypes.OE_CHECK_STUDENT:
      return {
        ...state,
        checkTest: {
          ...state.checkTest,
          data: payload,
          loading: false,
          success: true,
          error: false,
          loaded: true,
        },
      };
    case onlineExamActionTypes.OE_CHECK_STUDENT_EXAM_LOADING:
      return {
        ...state,
        checkStudentExam: {
          ...state.checkStudentExam,
          data: {},
          loading: true,
          success: false,
          error: false,
          loaded: false,
        }
      }
    case onlineExamActionTypes.RESET_CHECK_STUDENT_EXAM:
      return {
        ...state,
        checkStudentExam: {
          ...state.checkStudentExam,
          data: {},
          loading: false,
          success: false,
          error: false,
          loaded: false,
        }
      }

    case onlineExamActionTypes.OE_CHECK_STUDENT_EXAM:
      return {
        ...state,
        checkStudentExam: {
          ...state.checkStudentExam,
          data: payload,
          loading: false,
          success: true,
          error: false,
          loaded: true,
        }
      }
    case onlineExamActionTypes.OE_CREATE_ERROR:
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          success: false,
          error: true,
        },
      };
    case onlineExamActionTypes.STUDENT_LIST_SUBMITTED_EXAM:
      return {
        ...state,
        studentList: {
          ...state.studentList,
          loading: false,
          data: payload,
          success: true,
        },
      };
    case onlineExamActionTypes.STUDENT_LIST_SUBMITTED_EXAM_LOADING:
      return {
        ...state,
        studentList: {
          ...state.studentList,
          loading: true,
          success: false,
        },
      };
    case onlineExamActionTypes.GET_SINGLE_OE:
      return {
        ...state,
        getSingleExam: {
          ...state.getSingleExam,
          loading: false,
          data: payload,
          success: true,
        },
      };
    case onlineExamActionTypes.GET_SINGLE_OE_LOADING:
      return {
        ...state,
        getSingleExam: {
          ...state.getSingleExam,
          loading: true,
          success: false,
        },
      };
    case onlineExamActionTypes.OE_CREATE_RESET:
      return {
        ...state,
        create: ONLINE_EXAM_INITIAL_STATE.create,
      };
    case onlineExamActionTypes.OE_VIEW_REQUEST_LOADING:
      return {
        ...state,
        graceRequest: {
          ...state.graceRequest,
          loading: true,
          success: false,
          error: false,
          loaded: false,
        },
      };
    case onlineExamActionTypes.OE_VIEW_REQUEST:
      return {
        ...state,
        graceRequest: {
          ...state.graceRequest,
          loading: false,
          success: true,
          data: payload,
          error: false,
          loaded: true,
        },
      };

    case onlineExamActionTypes.OE_SORT_SEARCH_SUBMISSION_LIST:
      return ({
        ...state,
        studentList: {
          ...state.studentList,
          loading: false,
          data: payload,
          success: true,
        }
      })
    case onlineExamActionTypes.RESET_ONLINE_EXAM:
      return ONLINE_EXAM_INITIAL_STATE;
    default:
      return state

    case onlineExamActionTypes.OE_ACCEPT_GRACE_LOADING:
      return ({
        ...state,
        acceptRequest: {
          ...state.acceptRequest,
          loading: true,
          data: {},
          success: false,
          loaded: false
        }
      })
    case onlineExamActionTypes.OE_REJECT_GRACE_LOADING:
      return ({
        ...state,
        rejectRequest: {
          ...state.rejectRequest,
          loading: true,
          data: {},
          success: false,
          loaded: false
        }
      })
    case onlineExamActionTypes.OE_ACCEPT_GRACE:
      return ({
        ...state,
        acceptRequest: {
          ...state.acceptRequest,
          loading: false,
          data: payload,
          success: true,
          loaded: true
        }
      })
    case onlineExamActionTypes.OE_REJECT_GRACE:
      return ({
        ...state,
        rejectRequest: {
          ...state.rejectRequest,
          loading: false,
          data: payload,
          success: true,
          loaded: true
        }
      })
    case onlineExamActionTypes.OE_ACCEPT_GRACE_RESET:
      return {
        ...state,
        acceptRequest: {
          ...state.acceptRequest,
          loading: false,
          data: {},
          success: false,
          loaded: false
        }
      };
    case onlineExamActionTypes.OE_REJECT_GRACE_RESET:
      return {
        ...state,
        rejectRequest: {
          ...state.rejectRequest,
          loading: false,
          data: {},
          success: false,
          loaded: false
        }
      };
    case onlineExamActionTypes.GET_CREATED_BY_OE_LOADING:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: true,
          error: false,
          success: false,
        },
      };
    case onlineExamActionTypes.GET_CREATED_BY_OE:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
        delete: {
          success: false,
        },
      };
    case onlineExamActionTypes.OE_READ_LOADING:
      return {
        ...state,
        onlineCreated: {
          ...state.onlineCreated,
          data: payload,
          loading: true,
          error: false,
          success: false,
        },
      };

    case onlineExamActionTypes.OE_READ_CREATED: {
      return {
        ...state,
        onlineCreated: {
          ...state.onlineCreated,
          data: payload,
          success: true
        },
        delete: {
          success: false,
        },
      };
    }
    case onlineExamActionTypes.OE_RESULT_LOADING:
      return {
        ...state,
        examresult: {
          ...state.examresult,
          loading: true,
          error: false,
        },
      };

    case onlineExamActionTypes.OE_RESULT_LOADED:
      return {
        ...state,
        examresult: {
          ...state.examresult,
          loading: false,
          error: false,
          data: payload,
          successResultLoaded: true,
        },
      };

    case onlineExamActionTypes.OE_RESULT_LOADING_ERROR:
      return {
        ...state,
        examresult: {
          ...state.examresult,
          loading: false,
          error: true,
          data: {},
        },
      };

    case onlineExamActionTypes.OES_RESULT_RESET:
      return {
        ...state,
        examresult: ONLINE_EXAM_INITIAL_STATE.examresult,
      };
  }
}
export default onlineexam;
