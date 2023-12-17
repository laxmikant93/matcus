import { CLASSROOMTYPE } from "../actions/classroom/actionType";

const CLASSROOM_INITIAL_STATE = {
    list: {
        data: [],
        loading: false,
        success: false,
        error: false
    },
    create: {
        data: "",
        loading: false,
        success: false,
        error: false,
    },
    update: {
        data: "",
        loading: false,
        success: false,
        error: false,
    },
    delete: {
        data: "",
        loading: false,
        success: false,
        error: false,
    },
    courseinfo: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },

    coursenameupdate: {
        data: [],
        loading: false,
        success: false,
        error: false

    }
};

const classroom = (state = CLASSROOM_INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case CLASSROOMTYPE.CLASSROOM_READ:
            return {

                ...state,
                list: {
                    ...state.list,
                    data: payload,
                    success: true,
                }
            }

        case CLASSROOMTYPE.CLASSROOM_GET_INVITE_FACULTY:

            if (state?.list?.data?.find(annItem => payload.some((p) => p._id === annItem._id))) {
                return {

                    ...state,
                    list: {
                        ...state.list,
                        success: true,
                    }
                }
            }
            else {
                return {

                    ...state,
                    list: {
                        ...state.list,
                        data: state.list.data.concat(payload),
                        success: true,
                    }
                }
            }

        case CLASSROOMTYPE.RESET_CLASSROOM_DATA:
            return{
                ...state,
                list:{
                    ...state.list,
                    data: [],
                    loading: false,
                    success: false,
                    error: false
                }
            }    
        case CLASSROOMTYPE.COURSE_INFO_DATA:
            return {

                ...state,
                courseinfo: {
                    ...state.courseinfo,
                    data: payload,
                    success: true,
                }
            }

        case CLASSROOMTYPE.CLASSROOM_CREATE: {

            if (payload === undefined) {
                return {
                    ...state,
                    create: {
                        ...state.create,
                        data: "Same_Classroom",
                        success: true,
                    }
                }
            } else {
                return {
                    ...state,
                    create: {
                        ...state.create,
                        data: payload,
                        success: true,
                    },
                    list: {
                        ...state.list,
                        data: state.list.data.concat(payload),
                        success: true,
                    }
                }
            }
        }

        case CLASSROOMTYPE.CLASSROOM_UPDATE: {

            return {
                ...state,
                update: {
                    ...state.update,
                    data: payload,
                    success: true,
                },
                list: {
                    ...state.list,

                    data: state.list.data.map(
                        (content) => content._id === payload._id ? {
                            ...content, classroomname:
                                payload.classroomname
                        }
                            : content),

                    //   data:{
                    //     ...state.list.data,
                    //     classroomname:payload.classroomname
                    // },                     

                    success: true,
                }
            }
        }

        case CLASSROOMTYPE.COURSE_NAME_UPDATE: {
            return {
                ...state,
                coursenameupdate: {
                    ...state.coursenameupdate,
                    data: payload,
                    success: true,
                },
                courseinfo: {
                    ...state.courseinfo,
                    data: {
                        ...state.courseinfo.data,
                        coursename: payload.coursename
                    },

                    success: true,
                }
            }
        }


        case CLASSROOMTYPE.CLASSROOM_DELETE: {


            return ({
                ...state,
                delete: {
                    ...state.delete,
                    data: payload,
                    success: true,
                },

                list: {
                    ...state.list,
                    data: state.list.data.filter((item) => item._id !== payload.id),
                    success: true,
                }
            })
        }

        case CLASSROOMTYPE.CLASSROOM_UPDATE_SELECTION:
            return ({
                ...state,
                update: {
                    ...state.update,
                    data: state.list.data.find(annItem => annItem._id === payload)
                }
            })
        default:
            return state;
    }
};

export default classroom;