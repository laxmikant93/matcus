import { ONLINE_CLASS_TYPE } from "../actions/onlineClasses/actionType";
import { scheduleClassActionTypes } from "../actions/zoomApi/actionTypes";

const ONLINE_CLASS_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  courseAndClassroom: [],
  setSelectedCourse: [],
  setSelectedClassRoom: [],
  setFilteredTeachers: [],
  assignedClassroom: [],
  create: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  edit: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  delete: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  studentList: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  attendeesList: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  selectedStudent: [],
  singleClass: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  zoomVerification: {
    data: [],
    loading: false,
    error: false,
    success: false,
  }
};

// export default (state = ONLINE_CLASS_INITIAL_STATE, { type, payload }) => {
const onlineClasses = (
  state = ONLINE_CLASS_INITIAL_STATE,
  { type, payload }
) => {

  switch (type) {
    case ONLINE_CLASS_TYPE.ONLINE_CLASS_READ_LOADING: {
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: true,
          success: false,
          error: false
        },
        create: {
          ...state.create,
          data: [],
          loading: false,
          success: false,
          error: false
        },
        // delete: {
        //   success: false,
        // },
      };
    }

    case ONLINE_CLASS_TYPE.ONLINE_CLASS_READ_LOADED: {
   
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      };
    }
    case ONLINE_CLASS_TYPE.CLASS_FILTER_LOADING: {
    
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: true,
          error: false,
          success: false,
        }
      };
    }
    case ONLINE_CLASS_TYPE.ONLINE_CLASS_READ_ERROR: {
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      };
    }
    case ONLINE_CLASS_TYPE.ONLINE_CLASS_READ_RESET: {
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          success: false,
          error: false,
          loading: false
        },
      };
    }
    // admin list

    case ONLINE_CLASS_TYPE.ONLINE_CLASS_READ_ADMIN_LOADING: {
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: true,
          success: false,
          error: false
        },
        create: {
          ...state.create,
          data: [],
          loading: false,
          success: false,
          error: false
        },
        // delete: {
        //   success: false,
        // },
      };
    }

    case ONLINE_CLASS_TYPE.ONLINE_CLASS_READ_ADMIN_LOADED: {
     
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      };
    }
    case ONLINE_CLASS_TYPE.ONLINE_CLASS_READ_ADMIN_ERROR: {
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      };
    }
    case ONLINE_CLASS_TYPE.ONLINE_CLASS_READ_ADMIN_RESET: {
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          success: false,
          error: false,
          loading: false
        },
      };
    }



    case ONLINE_CLASS_TYPE.STUDENT_ONLINE_CLASS_READ_LOADING: {
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: true,
          success: false,
          error: false
        },
      };
    }

    case ONLINE_CLASS_TYPE.STUDENT_ONLINE_CLASS_READ_LOADED: {
   
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      };
    }
    case ONLINE_CLASS_TYPE.STUDENT_ONLINE_CLASS_READ_ERROR: {
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      };
    }
    case ONLINE_CLASS_TYPE.STUDENT_ONLINE_CLASS_READ_RESET: {
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          success: false,
          error: false,
          loading: false
        },
      };
    }





    case ONLINE_CLASS_TYPE.ONLINE_CLASS_READSINGLE_LOADING: {
      return {
        ...state,
        singleClass: {
          ...state.singleClass,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      };
    }
    case ONLINE_CLASS_TYPE.ONLINE_CLASS_READSINGLE_LOADED: {
     
      return {
        ...state,
        singleClass: {
          ...state.singleClass,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      };
    }
    case ONLINE_CLASS_TYPE.ONLINE_CLASS_READSINGLE_ERROR: {
      return {
        ...state,
        list: {
          ...state.singleClass,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      };
    }

    // case ONLINE_CLASS_TYPE.CLASS_FILTER_LOADING: {
    //   return {
    //     ...state,
    //     filteredClass: {
    //       ...state.filteredClass,
    //       data: [],
    //       loading: true,
    //       error: false,
    //       success: false,
    //     }
    //   };
    // }
    case ONLINE_CLASS_TYPE.CLASS_FILTER_LOADED: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      };
    }

    // case ONLINE_CLASS_TYPE.CLASS_FILTER_ERROR: {
    //   return {
    //     ...state,
    //     filteredClass: {
    //       ...state.filteredClass,
    //       data: [],
    //       loading: false,
    //       error: true,
    //       success: false,
    //     }
    //   };
    // }


    case ONLINE_CLASS_TYPE.GET_LIST_OF_CREATED_BY: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
      };
    }

    case ONLINE_CLASS_TYPE.ONLINE_CLASS_STUDENT_LIST: {
      return {
        ...state,
        studentList: {
          ...state.studentList,
          data: payload.data,
          // success: true,
        },
      };
    }

    case ONLINE_CLASS_TYPE.COURSE_AND_CLASSROOM: {
      return {
        ...state,
        courseAndClassroom: payload,
      };
    }

    case ONLINE_CLASS_TYPE.SEARCH_CLASS: {
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
    }

    // case ONLINE_CLASS_TYPE.ONLINE_CLASS_CREATE: {
    //   let objData = [].concat(payload.data);
    //   return {
    //     ...state,
    //     create: {
    //       ...state.create,
    //       data: payload.data,
    //       success:
    //         payload.status === 201 || payload.statusText === "Created"
    //           ? true
    //           : false,
    //     },
    //     list: {
    //       ...state.list,
    //       data: objData.concat(state.list.data),
    //       success: true,
    //     },
    //     edit: {
    //       ...state.edit,
    //       success: false,
    //     },
    //     selectedStudent: [],
    //   };
    // }


    case ONLINE_CLASS_TYPE.ONLINE_CLASS_CREATE_LOADING: {
      return {
        ...state,
        create: {
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      }
    }
    case ONLINE_CLASS_TYPE.ONLINE_CLASS_CREATE_LOADED: {
     
      return {
        ...state,
        create: {
          data: payload.data.returnResp,
          loading: false,
          success: true,
          error: false
        }
      }
    }
    case ONLINE_CLASS_TYPE.ZOOM_VERIFICATION_RESET: {
    
      return {
        ...state,
        zoomVerification: {
          data: [],
          loading: false,
          success: false,
          error: false
        }
      }
    }
    case ONLINE_CLASS_TYPE.ZOOM_VERIFICATION_LOADED: {
   
      return {
        ...state,
        zoomVerification: {
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      }
    }
    case ONLINE_CLASS_TYPE.ONLINE_CLASS_CREATE_RESET: {
      return {
        ...state,
        create: {
          data: [],
          loading: false,
          success: false,
          error: false,
        },
      }
    }

    // class remove
    case ONLINE_CLASS_TYPE.ONLINE_CLASS_REMOVE_LOADING: {
      return {
        ...state,
        list: {
          data: [],
          loading: false,
          success: false,
          error: false,
        },
        create: {
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      }
    }
    case ONLINE_CLASS_TYPE.ONLINE_CLASS_REMOVE_LOADED: {
      return {
        ...state,
        list: {
          ...state.list,
          data: state.list.data.filter((item) => {
            return item._id !== payload
          })
        }
      }
    }
    case ONLINE_CLASS_TYPE.ONLINE_CLASS_EDIT_LOADING: {
      return {
        ...state,
        list: {
          data: [],
          loading: false,
          success: false,
          error: false,
        },
        edit: {
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      }
    }
    case ONLINE_CLASS_TYPE.ONLINE_CLASS_EDIT_LOADED: {
      
      return {
        ...state,
        list: {
          data: [],
          loading: false,
          success: false,
          error: false
        },
        edit: {
          data: payload.data.returnResp,
          loading: false,
          success: true,
          error: false,
        },

      }
    }
    case ONLINE_CLASS_TYPE.ONLINE_CLASS_EDIT_RESET: {
      return {
        ...state,
        edit: {
          data: [],
          loading: false,
          success: false,
          error: false,
        },
      }
    }

    case ONLINE_CLASS_TYPE.ATTENDEES_LIST_LOADING: {
      return {
        ...state,

        attendeesList: {
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      }
    }
    case ONLINE_CLASS_TYPE.ATTENDEES_LIST_LOADED: {
     
      return {
        ...state,
        attendeesList: {
          data: payload.data.returnResp.participants,
          loading: false,
          success: true,
          error: false,
        },
      }
    }
    case ONLINE_CLASS_TYPE.ATTENDEES_LIST_RESET: {
      return {
        ...state,
        attendeesList: {
          data: [],
          loading: false,
          success: false,
          error: false,
        },
      }
    }
    case ONLINE_CLASS_TYPE.ONLINE_CLASS_READSINGLE_RESET: {
      return {
        ...state,
        singleClass: {
          data: [],
          loading: false,
          success: false,
          error: false,
        },
      }
    }
    // case ONLINE_CLASS_TYPE.ONLINE_CLASS_CREATE_ERROR: {
    //   return {
    //     ...state,
    //     list: {
    //       data: [],
    //       loading: false,
    //       success: false,
    //       error: true,
    //     }
    //   }
    // }
    // case ONLINE_CLASS_TYPE.ONLINE_CLASS_CREATE_ERROR: {
    //   return {
    //     ...state,
    //     list: {
    //       data: [],
    //       loading: false,
    //       success: false,
    //       error: true,
    //     }
    //   }
    // }
    case ONLINE_CLASS_TYPE.ONLINE_CLASS_EDIT: {
      let payloadData = payload.data;
    
      return {
        ...state,
        edit: {
          ...state.create,
          data: payload.data,
          success:
            payload.status === 200 || payload.statusText === "OK"
              ? true
              : false,
        },
        list: {
          ...state.list,
          data: state.list.data.map((item) => {
            return item._id === payloadData._id
              ? {
                ...item,
                ...payloadData,
              }
              : item;
          }),
          success: true,
        },
      };
    }
    case ONLINE_CLASS_TYPE.STUDENT_LIST_LOADING: {
      return {
        ...state,
        studentList: {
          data: [],
          loading: true,
          success: false,
          error: false,
        },
      }
    }
    case ONLINE_CLASS_TYPE.STUDENT_LIST_LOADED: {
      return {
        ...state,
        studentList: {
          data: payload.studentList,
          loading: false,
          success: true,
          error: false,
        },

      }
    }
    case ONLINE_CLASS_TYPE.STUDENT_LIST_RESET: {
      return {
        ...state,
        studentList: {
          data: [],
          loading: false,
          success: false,
          error: false,
        },
      }
    }




    case ONLINE_CLASS_TYPE.GOOGLE_MEET_RESPONSE_DATA: {
      let convertObj2Array = [].concat(payload);
      return {
        ...state,
        list: {
          ...state.list,
          data: convertObj2Array.concat(state.list.data),
          success: true,
        },
      };
    }

    case ONLINE_CLASS_TYPE.GOOGLE_MEET_RESPONSE_DATA_EDIT: {
     
      let convertObj2Array = [].concat(payload);
      return {
        ...state,
        list: {
          ...state.list,
          // data: convertObj2Array.concat(state.list.data),
          data: state.list.data.map((item) => {
            return item._id === convertObj2Array._id
              ? {
                ...item,
                ...convertObj2Array,
              }
              : item;
          }),
          success: true,
        },
      };
    }

    case ONLINE_CLASS_TYPE.SORT_BY_RTO: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
      };
    }

    case ONLINE_CLASS_TYPE.SORT_BY_TOGGLE: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
      };
    }

    case ONLINE_CLASS_TYPE.SORT_BY_OTR: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
      };
    }

    case ONLINE_CLASS_TYPE.ONLINE_CLASS_SORT_BY_DHTL: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
      };
    }

    case ONLINE_CLASS_TYPE.ONLINE_CLASS_SORT_BY_DLTH: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
      };
    }

    case ONLINE_CLASS_TYPE.SORT_BY_ZOOM: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
      };
    }

    case ONLINE_CLASS_TYPE.SORT_BY_MEET: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
      };
    }

    case ONLINE_CLASS_TYPE.SORT_BY_HTLA: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
      };
    }

    case ONLINE_CLASS_TYPE.SORT_BY_LTHA: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
      };
    }

    case ONLINE_CLASS_TYPE.COURSE_AND_CLASSROOM_FILTER: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
      };
    }
    case ONLINE_CLASS_TYPE.CLASSROOM_ASSIGNED: {
      return {
        ...state,
        assignedClassroom: {
          ...state.assignedClassroom,
          data: payload,
          success: true,
        },
      };
    }

    case ONLINE_CLASS_TYPE.SET_ONLINE_COURSE: {
     
      return {
        ...state,
        setSelectedCourse: payload,
      };
    }

    case ONLINE_CLASS_TYPE.SET_FILTERED_TEACHERS: {
     
      return {
        ...state,
        setFilteredTeachers: payload,
      };
    }

    case ONLINE_CLASS_TYPE.SET_ONLINE_CLASSROOM: {
      return {
        ...state,
        setSelectedClassRoom: payload,
      };
    }

    case ONLINE_CLASS_TYPE.ONLINE_CLASS_DELETE: {
   
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
          success: true,
        },
      };
    }

    case scheduleClassActionTypes.SC_CREATE_LOADING:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };

    case scheduleClassActionTypes.SC_CREATE_LOADED:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          data: state.list.data,
        },
      };

    case ONLINE_CLASS_TYPE.SET_SELECTED_STUDENT_DATA: {
      return {
        ...state,
        ...state.list,
        selectedStudent: payload,
      };
    }
    case ONLINE_CLASS_TYPE.RESET_ONLINE_CLASSES:
      return (ONLINE_CLASS_INITIAL_STATE)
    default:
      return state;
  }
};

export default onlineClasses;
