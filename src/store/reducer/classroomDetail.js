import { ClassroomDetailActionType } from "../actions/classroomdetail/actionType"

const CLASSROOM_DETAIL_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false
  },
  Assignmentlist: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false
  },
  OnlineCLasslist: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false
  },
  OnlineTestlist: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false
  },
  Teacherlist: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false
  },
  Studentlist: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false
  },
  CourseList: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false
  },
  create: {
    loading: false,
    Saveloading: false,
    success: false,
    error: false,
  },
  OnlineClassCreate: {
    loading: false,
    Saveloading: false,
    success: false,
    error: false,
  },
  delete: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  classrooomData: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  addTeacherClassroom: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  addAssignmentClassroom: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  AssignmentUpdateSelection: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  AssignmentUpdate: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  TeacherDataList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  updateAssignTo: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
}

const admission = (state = CLASSROOM_DETAIL_INITIAL_STATE, { type, payload }) => {
  switch (type) {

    case ClassroomDetailActionType.CLASSROOM_DETAIL_LIST_LOADING:
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

    case ClassroomDetailActionType.CLASSROOM_DETAIL_LIST_LOADED:
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

    case ClassroomDetailActionType.SORT_BY_TOGGLE:
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

    case ClassroomDetailActionType.CLASSROOM_DETAIL_LIST_ERROR:
      return ({
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_LIST_RESET:
      return ({
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_TEST_LIST_LOADING:
      return ({
        ...state,
        OnlineTestlist: {
          ...state.OnlineTestlist,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_TEST_LIST_LOADED:
      return ({
        ...state,
        OnlineTestlist: {
          ...state.OnlineTestlist,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_TEST_LIST_ERROR:
      return ({
        ...state,
        OnlineTestlist: {
          ...state.OnlineTestlist,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_TEST_LIST_RESET:
      return ({
        ...state,
        OnlineTestlist: {
          ...state.OnlineTestlist,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_LOADING:
      return ({
        ...state,
        OnlineCLasslist: {
          ...state.OnlineCLasslist,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_LOADED:
      return ({
        ...state,
        OnlineCLasslist: {
          ...state.OnlineCLasslist,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_ERROR:
      return ({
        ...state,
        OnlineCLasslist: {
          ...state.OnlineCLasslist,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_RESET:
      return ({
        ...state,
        OnlineCLasslist: {
          ...state.OnlineCLasslist,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_LIST_LOADING:
      return ({
        ...state,
        Assignmentlist: {
          ...state.Assignmentlist,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_LIST_LOADED:
      return ({
        ...state,
        Assignmentlist: {
          ...state.Assignmentlist,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_LIST_ERROR:
      return ({
        ...state,
        Assignmentlist: {
          ...state.Assignmentlist,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_LIST_RESET:
      return ({
        ...state,
        Assignmentlist: {
          ...state.Assignmentlist,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_TEACHER_LIST_LOADING:
      return ({
        ...state,
        Teacherlist: {
          ...state.Teacherlist,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_TEACHER_LIST_LOADED:
      return ({
        ...state,
        Teacherlist: {
          ...state.Teacherlist,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_TEACHER_LIST_ERROR:
      return ({
        ...state,
        Teacherlist: {
          ...state.Teacherlist,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_TEACHER_LIST_RESET:
      return ({
        ...state,
        Teacherlist: {
          ...state.Teacherlist,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_STUDENT_LIST_LOADING:
      return ({
        ...state,
        Studentlist: {
          ...state.Studentlist,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_STUDENT_LIST_LOADED:
      return ({
        ...state,
        Studentlist: {
          ...state.Studentlist,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_STUDENT_LIST_ERROR:
      return ({
        ...state,
        Studentlist: {
          ...state.Studentlist,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_SORT_TEACHER_RESET:
      return ({
        ...state,
        Studentlist: {
          ...state.Studentlist,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_COURSE_LIST_LOADING:
      return ({
        ...state,
        CourseList: {
          ...state.CourseList,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_COURSE_LIST_LOADED:
      return ({
        ...state,
        CourseList: {
          ...state.CourseList,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_COURSE_LIST_ERROR:
      return ({
        ...state,
        CourseList: {
          ...state.CourseList,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_COURSE_LIST_RESET:
      return ({
        ...state,
        CourseList: {
          ...state.CourseList,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGN_TO_UPDATE_LOADING:
      return ({
        ...state,
        updateAssignTo: {
          ...state.updateAssignTo,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGN_TO_UPDATE_LOADED:
      return ({
        ...state,
        updateAssignTo: {
          ...state.updateAssignTo,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        },
        Assignmentlist: {
          ...state.Assignmentlist,
          data: state.Assignmentlist.data.map((content) =>
            content._id === payload.assignmentInfo._id
              ? {
                ...content,
                assignTo: payload.assignmentInfo.assignTo,
              }
              : content
          ),
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGN_TO_UPDATE_ERROR:
      return ({
        ...state,
        updateAssignTo: {
          ...state.updateAssignTo,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGN_TO_UPDATE_RESET:
      return ({
        ...state,
        updateAssignTo: {
          ...state.updateAssignTo,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LOADING:
      return ({
        ...state,
        OnlineClassCreate: {
          ...state.OnlineClassCreate,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LOADED:
      return ({
        ...state,
        OnlineClassCreate: {
          ...state.OnlineClassCreate,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        },
        OnlineCLasslist: {
          ...state.OnlineCLasslist,
          data: state.OnlineCLasslist.data.concat(payload)
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_ERROR:
      return ({
        ...state,
        OnlineClassCreate: {
          ...state.OnlineClassCreate,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_RESET:
      return ({
        ...state,
        OnlineClassCreate: {
          ...state.OnlineClassCreate,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.ONLINE_CLASSROOM_ASSIGN_TO_UPDATE_LOADING:
      return ({
        ...state,
        updateAssignTo: {
          ...state.updateAssignTo,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.ONLINE_CLASSROOM_ASSIGN_TO_UPDATE_LOADED:
      return ({
        ...state,
        updateAssignTo: {
          ...state.updateAssignTo,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        },
        OnlineCLasslist: {
          ...state.OnlineCLasslist,
          data: state.OnlineCLasslist.data.map((content) =>
            content._id === payload.data
              ? {
                ...content,
                assignTo: payload.data_assignTo,
              }
              : content
          ),
        }
      })
    case ClassroomDetailActionType.ONLINE_CLASSROOM_ASSIGN_TO_UPDATE_ERROR:
      return ({
        ...state,
        updateAssignTo: {
          ...state.updateAssignTo,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.ONLINE_CLASSROOM_ASSIGN_TO_UPDATE_RESET:
      return ({
        ...state,
        updateAssignTo: {
          ...state.updateAssignTo,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_TEACHER_LIST_LOADING:
      return ({
        ...state,
        TeacherDataList: {
          ...state.TeacherDataList,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_TEACHER_LIST_LOADED:
      return ({
        ...state,
        TeacherDataList: {
          ...state.TeacherDataList,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_TEACHER_LIST_ERROR:
      return ({
        ...state,
        TeacherDataList: {
          ...state.TeacherDataList,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_TEACHER_LIST_RESET:
      return ({
        ...state,
        TeacherDataList: {
          ...state.TeacherDataList,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_SORT_TEACHER_LOADING:
      return ({
        ...state,
        Teacherlist: {
          ...state.Teacherlist,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_SORT_TEACHER_LOADED:
      return ({
        ...state,
        Teacherlist: {
          ...state.Teacherlist,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_SORT_TEACHER_ERROR:
      return ({
        ...state,
        Teacherlist: {
          ...state.Teacherlist,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_TEACHER_LOADING:
      return ({
        ...state,
        addTeacherClassroom: {
          ...state.addTeacherClassroom,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_TEACHER_LOADED:
      return ({
        ...state,
        addTeacherClassroom: {
          ...state.addTeacherClassroom,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        },
        // Teacherlist: {
        //   ...state.Teacherlist,
        //   data: state.Teacherlist.data.concat(payload),

        // }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_TEACHER_ERROR:
      return ({
        ...state,
        addTeacherClassroom: {
          ...state.addTeacherClassroom,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_TEACHER_RESET:
      return ({
        ...state,
        addTeacherClassroom: {
          ...state.addTeacherClassroom,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_CLASSROOM_ID_LOADING:
      return ({
        ...state,
        classrooomData: {
          ...state.classrooomData,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_CLASSROOM_ID_LOADED:
      return ({
        ...state,
        classrooomData: {
          ...state.classrooomData,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_CLASSROOM_ID_ERROR:
      return ({
        ...state,
        classrooomData: {
          ...state.classrooomData,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_CLASSROOM_ID_RESET:
      return ({
        ...state,
        classrooomData: {
          ...state.classrooomData,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_SEARCH_LOADING:
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

    case ClassroomDetailActionType.CLASSROOM_DETAIL_SEARCH_LOADED:
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
    case ClassroomDetailActionType.CLASSROOM_DETAIL_SEARCH_ERROR:
      return ({
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_SEARCH_RESET:
      return ({
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_DELETE_LOADING:
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

    case ClassroomDetailActionType.CLASSROOM_DETAIL_DELETE_LOADED:
      let SwitchValue = payload.Switch
      let ID = payload.ID

      switch (SwitchValue) {
        case "Online Classes":
          return ({
            ...state,
            delete: {
              ...state.delete,
              data: payload,
              loading: false,
              error: false,
              loaded: true,
              success: true,
            },
            OnlineCLasslist: {
              ...state.OnlineCLasslist,
              data: state.OnlineCLasslist.data.filter((item) => item._id !== ID),
              loading: false,
              error: false,
              loaded: true,
              success: true,
            }
          })

        case "Assignments":
          return ({
            ...state,
            delete: {
              ...state.delete,
              data: payload,
              loading: false,
              error: false,
              loaded: true,
              success: true,
            },
            Assignmentlist: {
              ...state.Assignmentlist,
              data: state.Assignmentlist.data.filter((item) => item._id !== ID),
              loading: false,
              error: false,
              loaded: true,
              success: true,
            }
          })

        case "Teachers":
          return ({
            ...state,
            delete: {
              ...state.delete,
              data: payload,
              loading: false,
              error: false,
              loaded: true,
              success: true,
            },
            Teacherlist: {
              ...state.Teacherlist,
              data: state.Teacherlist.data.filter((item) => item._id !== ID),
              loading: false,
              error: false,
              loaded: true,
              success: true,
            }
          })

        case "Students":
          return ({
            ...state,
            delete: {
              ...state.delete,
              data: payload,
              loading: false,
              error: false,
              loaded: true,
              success: true,
            },
            Studentlist: {
              ...state.Studentlist,
              data: state.Studentlist.data.filter((item) => item._id !== ID),
              loading: false,
              error: false,
              loaded: true,
              success: true,
            }
          })

        case "Courses":
          return ({
            ...state,
            delete: {
              ...state.delete,
              data: payload,
              loading: false,
              error: false,
              loaded: true,
              success: true,
            },
            CourseList: {
              ...state.CourseList,
              data: state.CourseList.data.filter((item) => item._id !== ID),
              loading: false,
              error: false,
              loaded: true,
              success: true,
            }
          })
        case "teacherCourses":
          return ({
            ...state,
            delete: {
              ...state.delete,
              data: payload,
              loading: false,
              error: false,
              loaded: true,
              success: true,
            },
            list: {
              ...state.list,
              data: state.list.data.filter((item) => item._id !== ID),
              loading: false,
              error: false,
              loaded: true,
              success: true,
            }
          })
        default:
          return true
      }

    case ClassroomDetailActionType.CLASSROOM_DETAIL_DELETE_ERROR:
      return ({
        ...state,
        delete: {
          ...state.delete,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_DELETE_RESET:
      return ({
        ...state,
        delete: {
          ...state.delete,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_ASSIGNMENT_LOADING:
      return ({
        ...state,
        addAssignmentClassroom: {
          ...state.addAssignmentClassroom,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })

    case ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_ASSIGNMENT_LOADED:

      return ({
        ...state,
        addAssignmentClassroom: {
          ...state.addAssignmentClassroom,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        },
        Assignmentlist: {
          ...state.Assignmentlist,
          data: [payload].concat(state.Assignmentlist.data),
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_ASSIGNMENT_ERROR:
      return ({
        ...state,
        deaddAssignmentClassroomlete: {
          ...state.addAssignmentClassroom,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_ASSIGNMENT_RESET:
      return ({
        ...state,
        addAssignmentClassroom: {
          ...state.addAssignmentClassroom,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_SELECTION_LOADING:
      return ({
        ...state,
        AssignmentUpdateSelection: {
          ...state.AssignmentUpdateSelection,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_SELECTION_LOADED:
      return ({
        ...state,
        AssignmentUpdateSelection: {
          ...state.AssignmentUpdateSelection,
          data: state.Assignmentlist.data.find(annItem => annItem._id === payload),
          loading: false,
          error: false,
          loaded: true,
          success: true,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_SELECTION_RESET:
      return ({
        ...state,
        AssignmentUpdateSelection: {
          ...state.AssignmentUpdateSelection,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })


    case ClassroomDetailActionType.CLASSROOM_DETAIL_UPDATE_ASSIGNMENT_LOADING:
      return ({
        ...state,
        AssignmentUpdate: {
          ...state.AssignmentUpdate,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_UPDATE_ASSIGNMENT_LOADED:
      return ({
        ...state,
        AssignmentUpdate: {
          ...state.AssignmentUpdate,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        },
        Assignmentlist: {
          ...state.Assignmentlist,
          data: state.Assignmentlist.data.map((content) =>
            content._id === payload.assignmentInfo._id
              ? {
                ...content,
                title: payload.assignmentInfo.title,
                courseInfo_coursename: payload.assignmentInfo.courseDetail.coursename,
                classroomInfo_classroomname: payload.assignmentInfo.classroomDetail.classroomname,
                createdAt: payload.assignmentInfo.createdAt,
                updatedAt: payload.assignmentInfo.updatedAt,
                duedate: payload.assignmentInfo.duedate,
                course: payload.assignmentInfo.course,
                classroom: payload.assignmentInfo.classroom,
                description: payload.assignmentInfo.description,
                fileupload: payload.assignmentInfo.fileupload,
              }
              : content
          ),
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_UPDATE_ASSIGNMENT_RESET:
      return ({
        ...state,
        AssignmentUpdate: {
          ...state.AssignmentUpdate,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAIL_UPDATE_ASSIGNMENT_ERROR:
      return ({
        ...state,
        AssignmentUpdate: {
          ...state.AssignmentUpdate,
          data: [],
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case ClassroomDetailActionType.CLASSROOM_DETAILS_RESET:
      return CLASSROOM_DETAIL_INITIAL_STATE;
    case ClassroomDetailActionType.ONLINE_TEST_NOTIFY:
      return {
        ...state,
        OnlineTestlist: {
          ...state.OnlineTestlist,
          data: state.OnlineTestlist.data.map((content) =>
            content._id === payload._id
              ? {
                ...content,
                isNotified: payload.isNotified,
              }
              : content
          ),
        },
      };
    case ClassroomDetailActionType.ONLINE_TEST_ASSIGN_TO_UPDATE_LOADED:
      return {
        ...state,
        OnlineTestlist: {
          ...state.OnlineTestlist,
          data: state.OnlineTestlist.data.map((content) =>
            content._id === payload._id
              ? {
                ...content,
                assignTo: payload.assignTo,
              }
              : content
          ),
        },
      };
    case ClassroomDetailActionType.ONLINE_TEST_DELETE:
      return ({
        ...state,
        delete: {
          ...state.delete,
          loading: false,
          success: true,
          error: false
        },
        OnlineTestlist: {
          ...state.OnlineTestlist,
          data: state.OnlineTestlist.data.filter((item) => item._id !== payload),
        }
      })

    case ClassroomDetailActionType.ONLINE_TEST_CANCEL:
      return {
        ...state,
        OnlineTestlist: {
          ...state.OnlineTestlist,
          data: state.OnlineTestlist.data.map((content) =>
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

    default:
      return state
  }

}
export default admission;