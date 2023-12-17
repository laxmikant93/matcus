import { FEE_MANAGEMENT_TYPE } from "../actions/feeManagement/actionType";
const INITIAL_STATE = {
  InstituteCourseList: {
    data: [],
    loading: false,
    success: false
  },
  studentCourseData: {
    data: [],
    loading: false,
    success: false
  },
  feeList: {
    data: [],
    loading: false,
    success: false
  },
  editStudentFee: {
    data: [],
    loading: false,
    success: false,
  },
  getStudentCollectFees: {
    data: [],
    loading: false,
    success: false,
  },
  postStudentCollectFees: {
    data: [],
    loading: false,
    success: false,
  },
  feeStructureExist: {
    exist: false,
    loading: false,
    success: false
  },
  postExcelSheetColumn: {
    data: [],
    loading: false,
    success: false,
    error: false
  },

};

const feeManagement = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    // kunak code
    case FEE_MANAGEMENT_TYPE.INSTITUTE_COURSE_LIST_LOADING: {
      return {
        ...state,
        InstituteCourseList: {
          data: [],
          loading: true,
          success: false
        }
      }
    }
    case FEE_MANAGEMENT_TYPE.INSTITUTE_COURSE_LIST_LOADED: {
      return {
        ...state,
        InstituteCourseList: {
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    case FEE_MANAGEMENT_TYPE.INSTITUTE_COURSE_SEARCHING_LOADED: {
      return {
        ...state,
        InstituteCourseList: {
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    case FEE_MANAGEMENT_TYPE.INSTITUTE_COURSE_SCROLLING_LOADED: {
      return {
        ...state,
        InstituteCourseList: {
          data: state.InstituteCourseList.data.concat(payload),
          loading: false,
          success: true
        }
      }
    }
    //kunal
    case FEE_MANAGEMENT_TYPE.INSTITUTE_FEE_STRCTURE_LIST_LOADING: {
      return {
        ...state,
        feeList: {
          data: [],
          loading: true,
          success: false
        }
      }
    }
    case FEE_MANAGEMENT_TYPE.INSTITUTE_FEE_STRCTURE_LIST_LOADED: {
      return {
        ...state,
        feeList: {
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    case FEE_MANAGEMENT_TYPE.INSTITUTE_COURSE_LIST_SCROLLING: {

      return {
        ...state,
        feeList: {
          data: {
            ...state.feeList.data,
            structure: state.feeList.data.structure.concat(payload.structure)
          },
          loading: false,
          success: true
        }
      }
    }
    case FEE_MANAGEMENT_TYPE.STUDENT_FEE_EDIT_LOADING: {
      return {
        ...state,
        editStudentFee: {
          data: [],
          loading: true,
          success: false
        }
      }
    }
    case FEE_MANAGEMENT_TYPE.STUDENT_FEE_EDIT_LOADED: {
     
      return {
        ...state,
        editStudentFee: {
          data: payload,
          loading: false,
          success: true
        }, feeList: {
          ...state.feeList,
          data: {
            ...state.feeList.data,
            structure: !payload.SaveRepeat ? state.feeList.data.structure.map((item) => {
              return item._id === payload._id ? { ...item, ...payload } : item
            })
              : state.feeList.data.structure.map((item) => {
                return item._id === payload._id ? { ...item, ...payload } :
                  {
                    ...item, SaveRepeat: payload.SaveRepeat, feeStudentDiscount: payload.feeStudentDiscount,
                    feeStudentScholorship: payload.feeStudentScholorship
                  }
              })
          }
        }
      }
    }
    case FEE_MANAGEMENT_TYPE.STUDENT_FEE_EDIT_RESET: {
      return {
        ...state,
        editStudentFee: {
          data: [],
          loading: false,
          success: false
        }
      }
    }

    case FEE_MANAGEMENT_TYPE.STUDENT_COLLECT_FEE_GET_LOADING: {
      return {
        ...state,
        getStudentCollectFees: {
          data: [],
          loading: true,
          success: false
        }
      }
    }

    case FEE_MANAGEMENT_TYPE.STUDENT_COLLECT_FEE_GET_LOADED: {
      return {
        ...state,
        getStudentCollectFees: {
          data: payload,
          loading: false,
          success: true
        }
      }
    }

    case FEE_MANAGEMENT_TYPE.STUDENT_COLLECT_FEE_POST_LOADING: {
      return {
        ...state,
        postStudentCollectFees: {
          data: [],
          loading: true,
          success: false
        }
      }
    }

    case FEE_MANAGEMENT_TYPE.STUDENT_COLLECT_FEE_POST_LOADED: {
      return {
        ...state,
        postStudentCollectFees: {
          data: payload,
          loading: false,
          success: true
        }



      }
    }
    case FEE_MANAGEMENT_TYPE.STUDENT_COLLECT_FEE_POST_RESET: {
      return {
        ...state,
        postStudentCollectFees: {
          data: [],
          loading: false,
          success: false
        }
      }
    }
    case FEE_MANAGEMENT_TYPE.FEE_STRUCTURE_IS_EXIST_LOADING: {
      return {
        ...state,
        feeStructureExist: {
          exist: false,
          loading: true,
          success: false
        }
      }
    }
    case FEE_MANAGEMENT_TYPE.FEE_STRUCTURE_IS_EXIST_LOADED: {
      return {
        ...state,
        feeStructureExist: {
          exist: payload.exist,
          loading: false,
          success: true
        }
      }
    }
    case FEE_MANAGEMENT_TYPE.FEE_MANAGEMENT_LMS_UPDATE_FEE: {
      
      return {
        ...state,
        InstituteCourseList: {
          ...state.InstituteCourseList,
          data: state.InstituteCourseList.data.map((item) => item.feeStructureId === payload.feeStructureId ? { ...item, Publish: "Active" } : item)
          ,
          loading: false,
          success: true
        }
      }
    }

    case FEE_MANAGEMENT_TYPE.FEE_MANAGEMENT_POST_EXCEL_SHEET_COLUMNS_LOADING:
      return {
        ...state,
        postExcelSheetColumn: {
          ...state.postExcelSheetColumn,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      }
    case FEE_MANAGEMENT_TYPE.FEE_MANAGEMENT_POST_EXCEL_SHEET_COLUMNS_SUCCESS:
      return {
        ...state,
        postExcelSheetColumn: {
          ...state.postExcelSheetColumn,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      }
    case FEE_MANAGEMENT_TYPE.FEE_MANAGEMENT_POST_EXCEL_SHEET_COLUMNS_RESET:
      return {
        ...state,
        postExcelSheetColumn: {
          ...state.postExcelSheetColumn,
          data: [],
          loading: false,
          success: false,
          error: false
        },
      }

    default: return state
  }
};

export default feeManagement;
