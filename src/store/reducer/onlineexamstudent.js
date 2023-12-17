import { onlineExamActionTypes } from "../actions/onlineexamstudent/actionTypes";

const INITIAL_STATE_ONLINE_EXAM = {
  detail: {},
  error: false,
  loading: false,
  message: "",
  successExamLoaded: false,
  successResultLoaded: false,
  create: {
    data: [],
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
  examresult: {
    data: {},
    loading: false,
    error: false,
    message: "",
    successResultLoaded: false,
  },
  graceRequest: {
    data: {},
    loading: false,
    error: false,
    success: false,
    loaded: false,
  },
  answer: {
    data: {},
    loading: false,
    error: false,
    success: false,
  },
  submit: {
    data: {},
    loading: false,
    error: false,
    success: false,
  },
  fileData: {
    data: {},
    loading: false,
    error: false,
    success: false,
  },
  studentFileData: {
    data: {},
    loading: false,
    error: false,
    success: false,
  },
  attemptedQuestion: {
    data: {},
    loading: false,
    error: false,
    success: false
  },
  assignTo: {
    data: {},
    loading: false,
    error: false,
    success: false
  }
};

function onlineexamstudent(
  state = INITIAL_STATE_ONLINE_EXAM,
  { type, payload }
) {
  switch (type) {
    case onlineExamActionTypes.OES_INFO_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case onlineExamActionTypes.OES_INFO_LOADED:
      return {
        ...state,
        loading: false,
        error: false,
        detail: { ...payload },
        successExamLoaded: true,
      };
    case onlineExamActionTypes.OES_UPDATE_TIMER: {
      return {
        ...state,
        loading: false,
        error: false,
        detail: payload,
        successExamLoaded: true,
      }
    }

    case onlineExamActionTypes.OES_INFO_LOADING_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: "",
        detail: {},
      };
    case onlineExamActionTypes.RESET_OES_LOADED_DETAIL:
      return {
        ...state,
        loading: false,
        error: false,
        detail: {},
        successExamLoaded: false,
      };
    case onlineExamActionTypes.OES_INFO_RESET:
      return INITIAL_STATE_ONLINE_EXAM;

    case onlineExamActionTypes.OES_RESULT_LOADING:
      return {
        ...state,
        examresult: {
          ...state.examresult,
          loading: true,
          error: false,
        },
      };

    case onlineExamActionTypes.OES_RESULT_LOADED:
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

    case onlineExamActionTypes.OES_RESULT_LOADING_ERROR:
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
        examresult: INITIAL_STATE_ONLINE_EXAM.examresult,
      };
    case onlineExamActionTypes.OES_POST_EXAM_LOADING: {
      return {
        ...state,
        create: {
          ...state.create,
          data: {},
          loading: true,
          loaded: false,
          success: false,
          error: false,
        },
      };
    }
    case onlineExamActionTypes.OES_POST_EXAM: {
      return {
        ...state,
        create: {
          ...state.create,
          data: payload,
          loading: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    }
    case onlineExamActionTypes.OES_GRACE_EXAM_LOADING: {
      return {
        ...state,
        graceRequest: {
          ...state.graceRequest,
          loading: true,
          error: false,
          success: false
        },
      };
    }
    case onlineExamActionTypes.OES_GRACE_EXAM: {
      return {
        ...state,
        graceRequest: {
          ...state.graceRequest,
          data: payload,
          loading: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    }

    case onlineExamActionTypes.OES_PATCH_ANSWER_LOADING: {
      return {
        ...state,
        answer: {
          ...state.answer,
          loading: true,
          error: false,
        },
      };
    }
    case onlineExamActionTypes.OES_PATCH_ANSWER: {
      return {
        ...state,
        answer: {
          ...state.answer,
          loading: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    }
    case onlineExamActionTypes.OES_PATCH_ANSWER_RESET: {
      return {
        ...state,
        answer: {
          ...state.answer,
          loading: false,
          loaded: false,
          success: false,
          error: false,
        },
      };
    }
    case onlineExamActionTypes.OES_EXAM_SUBMIT_LOADING: {
      return {
        ...state,
        answer: {
          ...state.answer,
          loading: true,
          error: false,
        },
      };
    }
    case onlineExamActionTypes.OES_EXAM_SUBMIT: {
      return {
        ...state,
        submit: {
          ...state.submit,
          loading: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    }
    case onlineExamActionTypes.OES_EXAM_UPLOAD_SET:
      return {
        ...state,
        fileData: {
          ...state.fileData,
          data: payload,
          loading: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    case onlineExamActionTypes.OES_EXAM_UPLOAD_RESET:
      return {
        ...state,
        fileData: {
          ...state.fileData,
          data: {},
          loading: false,
          loaded: false,
          success: false,
          error: false,
        }
      }

    case onlineExamActionTypes.OES_EXAM_STUDENT_UPLOAD_SET:
      return {
        ...state,
        studentFileData: {
          ...state.studentFileData,
          data: payload,
          loading: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    case onlineExamActionTypes.OES_EXAM_STUDENT_UPLOAD_RESET:
      return {
        ...state,
        studentFileData: {
          ...state.studentFileData,
          data: {},
          loading: false,
          loaded: false,
          success: false,
          error: false,
        }
      }

    case onlineExamActionTypes.OES_EXAM_SUBMIT_RESET: {
      return {
        ...state,
        submit: {
          ...state.submit,
          loading: false,
          loaded: false,
          success: false,
          error: false,
        },
      };
    }

    case onlineExamActionTypes.OES_ATTEMPTED_QUESTION: {
      return {
        ...state,
        attemptedQuestion: {
          ...state.attemptedQuestion,
          data: payload,
          loading: false,
          error: false,
          success: true
        }
      }
    }
    case onlineExamActionTypes.OES_ASSIGN_LOADED: {
      return {
        ...state,
        assignTo: {
          ...state.assignTo,
          data: payload,
          loading: false,
          error: false,
          success: true
        }
      }
    }

    case onlineExamActionTypes.OES_RESET_WARNING_TIMER: {
      return {
        ...state,
        ...state.detail,
        warningTimer: 0
      }
    }


    case onlineExamActionTypes.RESET_ONLINE_EXAM_STUDENT:
      return INITIAL_STATE_ONLINE_EXAM
    default:
      return state;
  }
}

export default onlineexamstudent;
