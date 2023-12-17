import { FEE_MANAGEMENT_STUDENT_TYPE } from "../actions/feeManagementStudent/actionType";
const INITIAL_STATE = {

  studentCourseData: {
    data: [],
    loading: false,
    success: false,
  },
  studentFeeData: {
    data: [],
    loading: false,
    success: false
  },
  createOrder: {
    data: [],
    loading: false,
    success: false,
  },
  orderDetails: {
    data: [],
    loading: false,
    success: false,
  },
  getStudentFeeViewDetails: {
    data: [],
    loading: false,
    success: false,
  },
  getStudentFeeSingle: {
    data: [],
    loading: false,
    success: false,
  },
  getInvoiceData:{
    data:[],
    loading:false,
    success:false
  }
};

const feeManagementStudent = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_COURSE_DATA_LOADING: {
      return {
        ...state,
        studentCourseData: {
          data: [],
          loading: true,
          success: false
        }
      }
    }
    case FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_COURSE_DATA_LOADED: {
      
      return {
        ...state,
        studentCourseData: {
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    case FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_FEE_LOADING: {
      return {
        ...state,
        studentFeeData: {
          data: [],
          loading: true,
          success: false
        }
      }
    }
    case FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_FEE_LOADED: {
      
      return {
        ...state,
        studentFeeData: {
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    case FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_FEE_RESET: {
      return {
        ...state,
        studentFeeData: {
          data: [],
          loading: false,
          success: false
        }
      }
    }
    case FEE_MANAGEMENT_STUDENT_TYPE.CREATE_RAZORPAY_ORDER_LOADING: {
      return {
        ...state,
        createOrder: {
          data: [],
          loading: true,
          success: false
        }
      }
    }
    case FEE_MANAGEMENT_STUDENT_TYPE.CREATE_RAZORPAY_ORDER_LOADED: {
      return {
        ...state,
        createOrder: {
          data: payload,
          loading: false,
          success: true
        }
      }
    }

    case FEE_MANAGEMENT_STUDENT_TYPE.CREATE_RAZORPAY_ORDER_RESET: {
      return {
        ...state,
        createOrder: {
          data: [],
          loading: false,
          success: false
        }
      }
    }
    case FEE_MANAGEMENT_STUDENT_TYPE.GET_ORDER_DETAILS_LOADING: {
      return {
        ...state,
        orderDetails: {
          data: [],
          loading: true,
          success: false
        }
      }
    }
    case FEE_MANAGEMENT_STUDENT_TYPE.GET_ORDER_DETAILS_LOADED: {
      return {
        ...state,
        orderDetails: {
          data: payload,
          loading: false,
          success: true
        }
      }
    }

    case FEE_MANAGEMENT_STUDENT_TYPE.GET_ORDER_DETAILS_RESET: {
      return {
        ...state,
        orderDetails: {
          data: [],
          loading: false,
          success: false
        }
      }
    }


    case FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_FEE_VIEW_DETAILS_LOADING: {
      return {
        ...state,
        getStudentFeeViewDetails: {
          data: [],
          loading: true,
          success: false
        }
      }
    }

    case FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_FEE_VIEW_DETAILS_LOADED: {
      return {
        ...state,
        getStudentFeeViewDetails: {
          data: payload,
          loading: false,
          success: true
        }
      }
    }


    case FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_FEE_VIEW_DETAILS_RESET: {
      return {
        ...state,
        getStudentFeeViewDetails: {
          data: [],
          loading: false,
          success: false
        }
      }

    }
    case FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_FEE_SINGLE_LOADING: {
      return {
        ...state,
        getStudentFeeSingle: {
          data: [],
          loading: true,
          success: false
        }
      }
    }

    case FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_FEE_SINGLE_LOADED: {
      return {
        ...state,
        getStudentFeeSingle: {
          data: payload,
          loading: false,
          success: true
        }
      }
    }


    case FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_COURSE_DATA_RESET: {
      return {
        ...state,
        getStudentFeeSingle: {
          data: [],
          loading: false,
          success: false
        }
      }

    }


    case FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_INVOICE_DETAILS_LOADING: {
      return {
        ...state,
        getInvoiceData: {
          data: [],
          loading: true,
          success: false
        }
      }
    }

    case FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_INVOICE_DETAILS_LOADED: {
      return {
        ...state,
        getInvoiceData: {
          data: payload,
          loading: false,
          success: true
        }
      }
    }


    

    default: return state
  }
};




export default feeManagementStudent;
