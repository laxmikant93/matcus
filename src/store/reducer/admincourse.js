import { AdminCourseActionTypes } from "../actions/admincourse/actionTypes"

const ADMIN_COURSE_INITIAL_STATE = {
    list: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    getAssignedTeacherList: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    getAllClassroomSubjects: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    addNewClassroom: {
        data: [],
        loading: false,
        success: false,
        error: false,
        sameCourseError: false
    },
    addNewSubject: {
        data: [],
        loading: false,
        success: false,
        error: false
    },
    createCourseInfo: {
        data: [],
        loading: false,
        success: false,
        error: false
    },
    getSingleCourseInfoData: {
        data: [],
        loading: false,
        success: false,
        error: false
    },
    editCourseInfo: {
        data: [],
        loading: false,
        success: false,
        error: false
    },
    deleteCourse: {
        data: [],
        loading: false,
        success: false,
        error: false
    },

    editTaxanomy: {
        data: [],
        loading: false,
        success: false,
        error: false
    },

    getTaxanomy: {
        data: [],
        loading: false,
        success: false,
        error: false
    },
    imgaePopUp: {
        data: [],
        loading: false,
        success: false,
        error: false
    },
    courseContent: {
        data: [],
        loading: false,
        success: false,
        error: false
    },
    courseContentList: {
        data: [],
        loading: false,
        success: false,
        error: false
    },
    postAssignedData:{
        data:[],
        loading:false,
        success:false,
        error:false
    }

}

const AdminCourse = (state = ADMIN_COURSE_INITIAL_STATE, { type, payload }) => {

    switch (type) {
        case AdminCourseActionTypes.ADMIN_COURSE_LIST_LOADING:
            return ({
                ...state,
                list: {
                    ...state.list,
                    data: [],
                    loading: true,
                    error: false,
                    success: false,
                }
            })

        case AdminCourseActionTypes.ADMIN_COURSE_LIST_LOADED:
            return ({
                ...state,
                list: {
                    ...state.list,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false,
                }
            })

        case AdminCourseActionTypes.ADMIN_COURSE_LIST_ERROR:
            return ({
                ...state,
                list: {
                    ...state.list,
                    data: [],
                    loading: false,
                    success: false,
                    error: true,
                }
            })
        case AdminCourseActionTypes.ADMIN_COURSE_LIST_RESET:
            return ({
                ...state,
                list: {
                    ...state.list,
                    data: [],
                    loading: false,
                    success: false,
                    error: false,
                }
            })
        case AdminCourseActionTypes.ADMIN_COURSE_CONTENT_CREATING:
            return ({
                ...state,
                courseContent: {
                    ...state.courseContent,
                    data: [],
                    loading: true,
                    error: false,
                    success: false,
                }
            })

        case AdminCourseActionTypes.ADMIN_COURSE_CONTENT_CREATED:
            return ({
                ...state,
                courseContent: {
                    ...state.courseContent,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false,
                }
            })

        case AdminCourseActionTypes.ADMIN_COURSE_CONTENT_CREATE_ERROR:
            return ({
                ...state,
                courseContent: {
                    ...state.courseContent,
                    data: [],
                    loading: false,
                    success: false,
                    error: true,
                }
            })
        case AdminCourseActionTypes.ADMIN_COURSE_CONTENT_CREATE_RESET:
            return ({
                ...state,
                courseContent: {
                    ...state.courseContent,
                    data: [],
                    loading: false,
                    success: false,
                    error: false,
                }
            })
        case AdminCourseActionTypes.ADMIN_GET_COURSE_CONTENT_LOADING:
            return ({
                ...state,
                courseContentList: {
                    ...state.courseContentList,
                    data: [],
                    loading: true,
                    error: false,
                    success: false,
                }
            })

        case AdminCourseActionTypes.ADMIN_GET_COURSE_CONTENT_LOADED:
            return ({
                ...state,
                courseContentList: {
                    ...state.courseContentList,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false,
                }
            })

        case AdminCourseActionTypes.ADMIN_GET_COURSE_CONTENT_ERROR:
            return ({
                ...state,
                courseContentList: {
                    ...state.courseContentList,
                    data: [],
                    loading: false,
                    success: false,
                    error: true,
                }
            })
        case AdminCourseActionTypes.ADMIN_GET_COURSE_CONTENT_RESET:
            return ({
                ...state,
                courseContentList: {
                    ...state.courseContentList,
                    data: [],
                    loading: false,
                    success: false,
                    error: false,
                }
            })
        case AdminCourseActionTypes.ADMIN_GET_TEACHER_LIST_LOADING:
            return ({
                ...state,
                getAssignedTeacherList: {
                    ...state.getAssignedTeacherList,
                    data: [],
                    loading: true,
                    success: false,
                    error: false,
                }
            })
        case AdminCourseActionTypes.ADMIN_GET_TEACHER_LIST:
            return ({
                ...state,
                getAssignedTeacherList: {
                    ...state.getAssignedTeacherList,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false,
                }
            })
        case AdminCourseActionTypes.ADMIN_GET_TEACHER_LIST_RESET:
            return({
                ...state,
                getAssignedTeacherList: {
                    ...state.getAssignedTeacherList,
                    data: {},
                    loading: false,
                    success: false,
                    error: false,
                }
            })    
        case AdminCourseActionTypes.ADMIN_GET_ALL_CLASSROOMS_SUBJECTS_LOADING:
            return ({
                ...state,
                getAllClassroomSubjects: {
                    ...state.getAllClassroomSubjects,
                    data: [],
                    loading: true,
                    success: false,
                    error: false,
                }
            })
        case AdminCourseActionTypes.ADMIN_GET_ALL_CLASSROOMS_SUBJECTS:
            return ({
                ...state,
                getAllClassroomSubjects: {
                    ...state.getAllClassroomSubjects,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false,
                }
            })
        case AdminCourseActionTypes.ADMIN_ADD_NEW_CLASSROOM_LOADING:
            return ({
                ...state,
                addNewClassroom: {
                    ...state.addNewClassroom,
                    data: [],
                    loading: true,
                    success: false,
                    error: false,
                }
            })
        case AdminCourseActionTypes.ADMIN_ADD_NEW_CLASSROOM:
            return ({
                ...state,
                addNewClassroom: {
                    ...state.addNewClassroom,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false,
                    sameCourseError: false
                },
                getAllClassroomSubjects: {
                    data: [payload].concat(state.getAllClassroomSubjects.data),
                    success: true,
                    error: false,
                    loading: false,
                },
                getSingleCourseInfoData:{
                    ...state.getSingleCourseInfoData,
                    data:{
                        ...state.getSingleCourseInfoData.data,
                        classroomInfo:[payload].concat(state.getSingleCourseInfoData.data.classroomInfo)
                    },
                    // data: [payload].concat(state.getSingleCourseInfoData.data.classroomInfo),
                    success:true,
                    loading:false,
                    error:false,
                }
            })
        case AdminCourseActionTypes.ADMIN_ADD_NEW_SAME_CLASSROOM_ERROR: {
            return {
                ...state,
                addNewClassroom: {
                    ...state.addNewClassroom,
                    data: [],
                    loading: false,
                    success: false,
                    error: false,
                    sameCourseError: true
                }
            }
        }
        case AdminCourseActionTypes.ADMIN_ADD_NEW_SAME_CLASSROOM_RESET_ERROR: {
            return {
                ...state,
                addNewClassroom: {
                    ...state.addNewClassroom,
                    data: [],
                    loading: false,
                    success: false,
                    error: false,
                    sameCourseError: false
                }
            }
        }
        case AdminCourseActionTypes.ADMIN_ADD_NEW_SUBJECT_LOADING: {
            return {
                ...state,
                addNewSubject: {
                    ...state.addNewSubject,
                    data: [],
                    loading: true,
                    success: false,
                    error: false
                }
            }
        }
        case AdminCourseActionTypes.ADMIN_ADD_NEW_SUBJECT: {
         
            return {
                ...state,
                addNewSubject: {
                    ...state.addNewSubject,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false
                },

                getAllClassroomSubjects: {
                    ...state.getAllClassroomSubjects,

                    data: state.getAllClassroomSubjects.data.map((content) =>
                        content._id === payload.course ?
                            {
                                ...content, classroomData: content.classroomData.concat(payload)
                            } : content
                    ),

                    success: true,
                    error: false,
                    loading: false,
                },
                // getSingleCourseInfoData: {
                //     ...state.getSingleCourseInfoData,

                //     data:{
                //        subjectInfo: state.getSingleCourseInfoData.data.classroomInfo.map((content) =>
                //         content._id === payload.course ?
                //             {
                //                 ...content, 
                //                 subjectInfo: content.subjectInfo.concat(payload)
                //             } : content
                //     )},
                    

                //     success: true,
                //     error: false,
                //     loading: false,
                // },
            }
        }
        case AdminCourseActionTypes.ADMIN_ADD_NEW_SUBJECT_RESET: {
            return {
                ...state,
                addNewSubject: {
                    ...state.addNewSubject,
                    data: [],
                    loading: false,
                    success: false,
                    error: false
                }
            }
        }
        case AdminCourseActionTypes.ADMIN_COURSE_INFO_CREATING: {
            return {
                ...state,
                createCourseInfo: {
                    ...state.createCourseInfo,
                    data: [],
                    loading: true,
                    success: false,
                    error: false
                }
            }
        }
        case AdminCourseActionTypes.ADMIN_COURSE_INFO_CREATED: {
            return {
                ...state,
                createCourseInfo: {
                    ...state.createCourseInfo,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false
                }
            }
        }
        case AdminCourseActionTypes.ADMIN_COURSE_INFO_CREATE_RESET: {
            return {
                ...state,
                createCourseInfo: {
                    ...state.createCourseInfo,
                    data: [],
                    loading: false,
                    success: false,
                    error: false
                }
            }
        }

        case AdminCourseActionTypes.GET_ADMIN_COURSE_INFO_DATA_LOADING: {
            return {
                ...state,
                getSingleCourseInfoData: {
                    ...state.getSingleCourseInfoData,
                    data: [],
                    loading: true,
                    success: false,
                    error: false
                }
            }
        }
        case AdminCourseActionTypes.GET_ADMIN_COURSE_INFO_DATA_LOADED: {
            return {
                ...state,
                getSingleCourseInfoData: {
                    ...state.getSingleCourseInfoData,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false
                }
            }
        }
        case AdminCourseActionTypes.EDIT_COURSE_INFO_LOADING: {
            return {
                ...state,
                editCourseInfo: {
                    ...state.editCourseInfo,
                    data: [],
                    loading: true,
                    success: false,
                    error: false
                }
            }
        }
        case AdminCourseActionTypes.EDIT_COURSE_INFO: {
            return {
                ...state,
                editCourseInfo: {
                    ...state.editCourseInfo,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false
                }
            }
        }
        case AdminCourseActionTypes.EDIT_COURSE_INFO_RESET: {
            return {
                ...state,
                editCourseInfo: {
                    ...state.editCourseInfo,
                    data: [],
                    loading: false,
                    success: false,
                    error: false
                }
            }
        }
        case AdminCourseActionTypes.ADMIN_FILTER_COURSE_LIST: {
            return {
                ...state,
                list: {
                    ...state.list,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false
                }
            }
        }
        case AdminCourseActionTypes.DELETE_COURSE_LOADING: {
            return {
                ...state,
                deleteCourse: {
                    ...state.deleteCourse,
                    data: [],
                    loading: true,
                    success: false,
                    error: false
                }
            }
        }
        case AdminCourseActionTypes.DELETE_COURSE_SUCCESS: {
            return {
                ...state,
                deleteCourse: {
                    ...state.deleteCourse,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false
                },
                list: {
                    ...state.list,
                    data: state.list.data.filter((item) => item._id !== payload),
                    success: true,
                },
            }
        }
        case AdminCourseActionTypes.DELETE_COURSE_RESET: {
            return {
                ...state,
                deleteCourse: {
                    ...state.deleteCourse,
                    data: [],
                    loading: false,
                    success: false,
                    error: false
                }
            }
        }

        case AdminCourseActionTypes.EDIT_TAXANOMY_LOADING: {
            return {
                ...state,
                editTaxanomy: {
                    ...state.editTaxanomy,
                    data: [],
                    loading: true,
                    success: false,
                    error: false
                }
            }
        }

        case AdminCourseActionTypes.EDIT_TAXANOMY_SUCCESS: {
            return {
                ...state,
                editTaxanomy: {
                    ...state.editTaxanomy,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false
                },
                getTaxanomy: {
                    ...state.getTaxanomy,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false
                }
            }
        }

        case AdminCourseActionTypes.EDIT_TAXANOMY_RESET: {
            return {
                ...state,
                editTaxanomy: {
                    ...state.editTaxanomy,
                    data: [],
                    loading: false,
                    success: false,
                    error: false
                }
            }
        }

        case AdminCourseActionTypes.GET_TAXANOMY_SUCCESS: {
            return {
                ...state,
                getTaxanomy: {
                    ...state.getTaxanomy,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false
                }
            }
        }

        case AdminCourseActionTypes.GET_TAXANOMY_LOADING: {
            return {
                ...state,
                getTaxanomy: {
                    ...state.getTaxanomy,
                    data: [],
                    loading: true,
                    success: false,
                    error: false
                }
            }
        }

        case AdminCourseActionTypes.GET_TAXANOMY_RESET: {
            return {
                ...state,
                getTaxanomy: {
                    ...state.getTaxanomy,
                    data: [],
                    loading: false,
                    success: false,
                    error: false
                }
            }
        }

        case AdminCourseActionTypes.IMAGE_POPUP_SHOW: {
            return {
                ...state,
                imgaePopUp: {
                    ...state.imgaePopUp,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false
                }
            }
        }
        case AdminCourseActionTypes.IMAGE_POPUP_RESET: {
            return {
                ...state,
                imgaePopUp: {
                    ...state.imgaePopUp,
                    data: [],
                    loading: false,
                    success: false,
                    error: false
                }
            }
        }
        case AdminCourseActionTypes.POST_ASSIGNED_DATA_LOADING:{
            return{
                ...state,
                postAssignedData:{
                    ...state.postAssignedData,
                    data:[],
                    loading:true,
                    success:false,
                    error:false
                }
            }
        }
        case AdminCourseActionTypes.POST_ASSIGNED_DATA:{
            return{
                ...state,
                postAssignedData:{
                    ...state.postAssignedData,
                    data:payload,
                    loading:false,
                    success:true,
                    error:false
                }
            }
        }
        case AdminCourseActionTypes.POST_ASSIGNED_DATA_RESET:{
            return{
                ...state,
                postAssignedData:{
                    ...state.postAssignedData,
                    data:[],
                    loading:false,
                    success:false,
                    error:false
                }
            }
        }
        case AdminCourseActionTypes.FILTER_ADMIN_LIST_COURSE_CLASSROOMS:{
            return ({
                ...state,
                list: {
                    ...state.list,
                    data: payload,
                    loading: false,
                    error: false,
                    success: true,
                }
            })
        }
        case AdminCourseActionTypes.FILTER_ADMIN_LIST_ASSIGNTO:{
            return ({
                ...state,
                list: {
                    ...state.list,
                    data: payload,
                    loading: false,
                    error: false,
                    success: true,
                }
            })
        }
        case AdminCourseActionTypes.ADMIN_COURSE_RESET_MAIN:
            return (ADMIN_COURSE_INITIAL_STATE)
        default:
            return state
    }
}
export default AdminCourse;