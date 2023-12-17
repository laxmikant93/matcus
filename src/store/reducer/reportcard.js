import { REPORTCARD_ACTION_TYPES } from "../actions/reportcard/actions";

const INITIAL_STATE = {
  gradeList: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  reportList: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  termList: {
    list: [],
    individualAddedTerm: [],
    loading: true,
    success: false,
  },
  studentReport: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
};

const reportCard = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case REPORTCARD_ACTION_TYPES.GET_GRADES_LOADING:
      return {
        ...state,
        gradeList: {
          data: [],
          success: false,
          loading: true,
          error: false,
        },
      };
    case REPORTCARD_ACTION_TYPES.GET_GRADES_SUCCESS:
      return {
        ...state,
        gradeList: {
          data: payload,
          success: true,
          loading: false,
          error: false,
        },
      };
    case REPORTCARD_ACTION_TYPES.GET_GRADES_ERROR:
      return {
        ...state,
        gradeList: {
          data: [],
          success: false,
          loading: false,
          error: true,
        },
      };
    case REPORTCARD_ACTION_TYPES.GET_REPORT_LOADING:
      return {
        ...state,
        reportList: {
          data: [],
          success: false,
          loading: true,
          error: false,
        },
      };
    case REPORTCARD_ACTION_TYPES.GET_REPORT_SUCCESS:
      
      return {
        ...state,
        reportList: {
          data: payload ? payload : [],
          success: true,
          loading: false,
          error: false,
        },
      };
    case REPORTCARD_ACTION_TYPES.GET_REPORT_ERROR:
      return {
        ...state,
        reportList: {
          data: [],
          success: false,
          loading: false,
          error: true,
        },
      };
    case REPORTCARD_ACTION_TYPES.ADD_REPORTCARD_TERM:
      return {
        ...state,
        termList: {
          ...state.termList,
          individualAddedTerm: payload.data,
          loading: false,
          success: payload.status === 200 ? true : false,
        },
      };
    case REPORTCARD_ACTION_TYPES.GET_TERM_LIST:
      return {
        ...state,
        termList: {
          ...state.termList,
          list: payload,
          loading: false,
          success: false,
        },
      };
    case REPORTCARD_ACTION_TYPES.CLEAR_TERM_LIST:
      return {
        ...state,
        termList: {
          ...state.termList,
          list: payload,
          loading: false,
          success: false,
        },
      };
    case REPORTCARD_ACTION_TYPES.GET_STUDENT_REPORT:
      return {
        ...state,
        studentReport: {
          ...state.studentReport,
          data: payload,
          loading: false,
          success: false,
          error: false,
        },
      };
    case REPORTCARD_ACTION_TYPES.UPDATE_STUDENT_REPORT:
      return {
        ...state,
        studentReport: {
          ...state.studentReport,
          data: payload,
          loading: false,
          success: false,
          error: false,
        },
      };
    default:
      return state;
  }
};

export default reportCard;
