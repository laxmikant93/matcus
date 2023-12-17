import { StudentOnlineExamActionTypes } from "../actions/studentonlineexam/actionTypes"
const STUDENT_ONLINE_EXAM_INITIAL_STATE = {
    list: {
        data: [],
        loading: false,
        success: false,
        error: false,
        loaded: false
    },
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
    delete: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    courseId: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    assignedTeacher: {
        data: [],
        loading: false,
        success: false,
        error: false
    }
}


const studentonlineexam = (state = STUDENT_ONLINE_EXAM_INITIAL_STATE, { type, payload }) => {

    switch (type) {
        case StudentOnlineExamActionTypes.SOE_LIST_LOADING: {

            return {
                ...state,
                list: {
                    ...state.list,
                    data: [],
                    laoding: true,
                    error: false,
                    loaded: false,
                    success: false,
                }
            }
        }
        case StudentOnlineExamActionTypes.SEARCH_BY_SOE: {
            return {
                ...state,
                list: {
                    ...state.list,
                    data: payload,
                    laoding: false,
                    loaded: true,
                    success: true,
                    error: false,
                }
            }
        }
        case StudentOnlineExamActionTypes.FILTERBYCOURSES_SOE: {
            return {
                ...state,
                list: {
                    ...state.list,
                    data: payload,
                    laoding: false,
                    loaded: true,
                    success: true,
                    error: false,
                }
            }
        }
        case StudentOnlineExamActionTypes.SOE_LIST_LOADED: {
            return {
                ...state,
                list: {
                    ...state.list,
                    data: payload,
                    laoding: false,
                    loaded: true,
                    success: true,
                    error: false,
                }
            }
        }
        case StudentOnlineExamActionTypes.OES_GET_ASSIGN_LOADED: {
            return {
                ...state,
                assignedTeacher: {
                    ...state.assignedTeacher,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false,
                }
            }
        }

        case StudentOnlineExamActionTypes.SOE_LIST_ERROR: {
            return {
                ...state,
                list: {
                    ...state.list,
                    data: [],
                    laoding: false,
                    loaded: false,
                    success: false,
                    error: true,
                }
            }
        }
        case StudentOnlineExamActionTypes.SOE_COURSEID_GET: {
            return {
                ...state,
                courseId: {
                    ...state.courseId,
                    data: payload,
                    success: true,
                    error: false,
                }
            }
        }
        default:
            return state
    }
}

export default studentonlineexam;