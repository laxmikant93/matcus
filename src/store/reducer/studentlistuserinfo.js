import { USERINFOTYPES } from "../actions/studentlistuserinfo/actionType";

const STUDENTUSERINFO_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  studentFilterCourses: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  studentdatainfo: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  studentlist: {
    data: [],
    loading: false,
    error: false,
  },
  create: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  update: {
    data: "",
    loading: false,
    success: false,
    error: false,
    studentContactError: false
  },
  delete: {
    data: "",
    loading: false,
    success: false,
    error: false,
  },
  dataid: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  updatelist: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  studentListScroll: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  teacherListScroll: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  postExcelSheetColumn:{
    data:[],
    loading:false,
    success:false,
    error:false
  },
  loading: false,
  totalLength: ""
};

const studentlistuserinfo = (
  state = STUDENTUSERINFO_INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case USERINFOTYPES.GET_USER_INFO: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
          loading: false,
        },
      };
    }
    case USERINFOTYPES.SEARCH_FACULTY_USER_INFO_DATA: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
          loading: false,
        },
      };
    }
    case USERINFOTYPES.GET_DATA_BY_COURSESCLASSROOM_TEACHER: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
          loading: false,
        }
      }
    }
    case USERINFOTYPES.USER_SORT_TEACHERLIST: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
          loading: false,
        },
      };
    }
    case USERINFOTYPES.GET_NOT_LOGGED_LIST: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
          loading: false,
        },
      };
    }
    case USERINFOTYPES.USER_SORT_STUDENTLIST: {
      return {
        ...state,
        studentdatainfo: {
          ...state.studentdatainfo,
          data: payload,
          success: true,
          loading: false,
        },
      };
    }
    case USERINFOTYPES.GET_STUDENT_COURSE_FILTER_LIST: {
      return {
        ...state,
        studentdatainfo: {
          ...state.studentdatainfo,
          data: payload,
          success: true,
          loading: false,
        }
      }
    }
    case USERINFOTYPES.GET_NOT_LOGGED_STUDENT_LIST: {
      return {
        ...state,
        studentdatainfo: {
          ...state.studentdatainfo,
          data: payload,
          success: true,
          loading: false,
        },
      };
    }
    case USERINFOTYPES.GET_USER_LOADING: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: false,
          loading: true,
        },
      };
    }
    case USERINFOTYPES.RESET_TEACHERLIST: {
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          success: false,
          loading: false,
        },
      };
    }

    case USERINFOTYPES.USER_LOADING_STUDENT: {
      return {
        ...state,
        studentdatainfo: {
          ...state.studentdatainfo,
          success: false,
          loading: true,
        },
      };
    }
    case USERINFOTYPES.GET_ALL_COURSES_AND_CLASSROOM: {
      return {
        ...state,
        studentFilterCourses: {
          ...state.studentFilterCourses,
          data: payload,
          loading: false,
          success: true,
        }
      }
    }
    case USERINFOTYPES.GET_USER_INFO_STUDENT: {
      return {
        ...state,
        studentdatainfo: {
          ...state.studentdatainfo,
          data: payload,
          success: true,
          loading: false,
        },
      };
    }
    case USERINFOTYPES.SEARCH_STUDENT_USER_INFO_DATA: {
      return {
        ...state,
        studentdatainfo: {
          ...state.studentdatainfo,
          data: payload,
          success: true,
          loading: false,
        },
      };
    }
    case USERINFOTYPES.RESET_STUDENTLIST: {
      return {
        ...state,
        studentdatainfo: {
          ...state.studentdatainfo,
          data: [],
          success: false,
          loading: false,
        },
      };
    }
    case USERINFOTYPES.GET_STUDENT_INFO: {
      return {
        ...state,
        studentlist: {
          ...state.studentlist,
          data: payload,
          success: true,
          loading: false,
        },
      };
    }

    case USERINFOTYPES.POST_USER_INFO: {
      return {
        ...state,
        create: {
          ...state.create,
          data: payload,
          success: true,
        },
      };
    }
    case USERINFOTYPES.UPDATE_USER_INFO: {
      return {
        ...state,
        update: {
          ...state.update,
          data: payload,
          success: true,
          loading: false
        },
        studentdatainfo: {
          ...state.studentdatainfo,
          data: payload,
          success: false,
        },
      };
    }
    case USERINFOTYPES.STUDENT_EDIT_INFO_LOADING: {
      return {
        ...state,
        update: {
          ...state.update,
          data: {},
          success: false,
          loading: true
        },
      };
    }
    case USERINFOTYPES.ASSIGNED_COURSE: {
      return {
        ...state,
        updatelist: {
          ...state.updatelist,
          data: payload,
          success: true,
        },
      };
    }
    case USERINFOTYPES.GET_USER_INFO_ID: {
      return {
        ...state,
        dataid: {
          ...state.dataid,
          data: payload,
          success: true,
          loading: false,
        },
      };
    }
    case USERINFOTYPES.DELETE_USER_INFO: {
      return {
        ...state,
        delete: {
          ...state.delete,
          data: payload,
          success: true,
        },
        studentdatainfo: {
          ...state.studentdatainfo,
          data: state.studentdatainfo.data.filter(
            (item) => item._id !== payload
          ),
          // data: state.list.data.filter((item) => item._id !== payload._id),
          success: true,
        },
      };
    }
    case USERINFOTYPES.DELETE_USER_INFO_TEACHER: {
      return {
        ...state,
        delete: {
          ...state.delete,
          data: payload,
          success: true,
        },
        list: {
          ...state.list,
          data: state.list.data.filter((item) => item._id !== payload),
          // data: state.list.data.filter((item) => item._id !== payload._id),
          success: true,
        },
      };
    }
    case USERINFOTYPES.USER_LOADING: {
      return {
        ...state,
        dataid: {
          ...state.dataid,
          loading: true,
          success: false,
          data: {},
        },
      };
    }

    case USERINFOTYPES.USER_INFO_SELECTION:
      return {
        ...state,
        update: {
          ...state.update,
          data: state.list.data.find((annItem) => annItem._id === payload),
        },
      };

    case USERINFOTYPES.STUDENT_CONTACT_ERROR: {
      return {
        ...state,
        update: {
          ...state.update,
          data: "",
          loading: false,
          success: false,
          error: false,
          studentContactError: true
        }
      }
    }
    case USERINFOTYPES.STUDENT_CONTACT_RESET_ERROR:
      return {
        ...state,
        update: {
          ...state.update,
          data: "",
          loading: false,
          success: false,
          error: false,
          studentContactError: false
        }
      }
    case USERINFOTYPES.STUDENT_LIST_INFINITY_SCROLL_LOADING:
      return {
        ...state,
        studentdatainfo: {
          ...state.studentdatainfo,
          data: [],
          loading: true,
          success: false,
          error: false,

        }
      }
    case USERINFOTYPES.STUDENT_LIST_INFINITY_SCROLL_LOADED:
      return {
        ...state,
        studentdatainfo: {
          ...state.studentdatainfo,
          data: payload,
          loading: false,
          success: true,
          error: false,
        },
        // studentdatainfo: {
        //   ...state.studentdatainfo,
        //   data: state.studentdatainfo.data.concat(payload),
        //   loading: false,
        //   success: true,
        //   error: false,
        // }
      }
    case USERINFOTYPES.STUDENT_LIST_INFINITY_SCROLL_RESET:
      return {
        ...state,
        studentListScroll: {
          ...state.studentListScroll,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      }
    case USERINFOTYPES.TEACHER_LIST_INFINITY_SCROLL_LOADING:
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: true,
          success: false,
          error: false,

        }
      }
    case USERINFOTYPES.TEACHER_LIST_INFINITY_SCROLL_LOADED:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: false,
          success: true,
          error: false,
        },
        // list: {
        //   ...state.list,
        //   data: state.list.data.concat(payload),
        //   loading: false,
        //   success: true,
        //   error: false,
        // }
      }
    case USERINFOTYPES.TEACHER_LIST_INFINITY_SCROLL_RESET:
      return {
        ...state,
        teacherListScroll: {
          ...state.teacherListScroll,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      }
      case USERINFOTYPES.POST_EXCEL_SHEET_COLUMNS_LOADING:
      return {
        ...state,
        postExcelSheetColumn:{
          ...state.postExcelSheetColumn,
          data:[],
          loading:true,
          success:false,
          error:false
        },
      }
      case USERINFOTYPES.POST_EXCEL_SHEET_COLUMNS_SUCCESS:
      return {
        ...state,
        postExcelSheetColumn:{
          ...state.postExcelSheetColumn,
          data:payload,
          loading:false,
          success:true,
          error:false
        },
      }
      case USERINFOTYPES.POST_EXCEL_SHEET_COLUMNS_RESET:
        return {
          ...state,
          postExcelSheetColumn:{
            ...state.postExcelSheetColumn,
            data:[],
            loading:false,
            success:false,
            error:false
          },
        }
    case USERINFOTYPES.STUDENT_LIST_TOTAL_UPDATE:
      return {
        ...state,
        totalLength: payload
      }


    case USERINFOTYPES.RESET_EDIT_STUDENT_INFO:
      return (STUDENTUSERINFO_INITIAL_STATE)

    default:
      return state;
  }
};

export default studentlistuserinfo;
