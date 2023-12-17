import { EDITTEACHERLIST } from "../actions/editteacherlist/actionType";

const EDIT_TEACHER_INITIAL_STATE = {
    list: {
        data: [],
        loading: false,
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
    teacherusername: {
        inputKey: undefined,
        data: [],
        loading: false,
        success: false,
        error: false,

    },
    assignedteacherclassroom: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    teacherlistcount: {
        data: [],
        loading: false,
        success: false,
        error: false,
    }
};

const editteacherlist = (state = EDIT_TEACHER_INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case EDITTEACHERLIST.EDIT_TEACHER_LIST_READ:
            return {

                ...state,
                list: {
                    ...state.list,
                    // data:payload?payload:[],
                    data: payload ? payload : [],
                    success: true,
                }
            }
        case EDITTEACHERLIST.EDIT_TEACHER_LIST_READ_RESET:
            return {

                ...state,
                list: {
                    ...state.list,
                    // data:payload?payload:[],
                    data: [],
                    success: false,
                }
            }


        case EDITTEACHERLIST.EDIT_ASSIGNED_TEACHER_LIST_ClASSROOM_READ:
            return {

                ...state,
                assignedteacherclassroom: {
                    ...state.assignedteacherclassroom,
                    data: payload,
                    success: true,
                }
            }

        case EDITTEACHERLIST.EDIT_TEACHER_LIST_READ_COUNT:
            return {

                ...state,
                teacherlistcount: {
                    ...state.teacherlistcount,
                    data: payload,
                    success: true,
                }
            }

        case EDITTEACHERLIST.EDIT_ASSIGNED_TEACHER_LIST_ClASSROOM_READ_CLEAR:
            return {

                ...state,
                assignedteacherclassroom: {
                    ...state.assignedteacherclassroom,
                    data: [],
                    success: false,
                }
            }

        case EDITTEACHERLIST.EDIT_TEACHER_LIST_USERNAME_READ:
            return {

                ...state,
                teacherusername: {
                    ...state.teacherusername,
                    inputKey: payload.inputKey,
                    data: payload.data ? payload.data : [],
                    success: true,
                }
            }

        case EDITTEACHERLIST.EDIT_TEACHER_LIST_USERNAME_RESET:
            return {

                ...state,
                teacherusername: {
                    ...state.teacherusername,
                    inputKey: undefined,
                    data: [],
                    success: false,
                }
            }


        case EDITTEACHERLIST.EDIT_TEACHER_LIST_CREATE: {

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
        case EDITTEACHERLIST.EDIT_TEACHER_LIST_ASSIGN_CLASSROOM: {

            return {
                ...state,
                create: {
                    ...state.create,
                    data: payload,
                    success: true,
                },
                // list:{
                //     ...state.list,
                //     data:state.list.data.concat(payload),
                //     success:true,
                // }
            }
        }

        case EDITTEACHERLIST.EDIT_TEACHER_LIST_UPDATE: {
            // const updateAnnouncement =state.ANNOUNCEMENT_EDIT

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
                            ...content, title:
                                payload.title, description: payload.description
                        }
                            : content),

                    success: true,
                }
            }
        }

        case EDITTEACHERLIST.EDIT_TEACHER_LIST_DELETE: {
            return ({
                ...state,
                delete: {
                    ...state.delete,
                    data: payload,
                    success: true,
                },
                teacherlistcount: {
                    ...state.teacherlistcount,
                    data: state.teacherlistcount.data.filter((item) => item.user !== payload),
                    success: true,
                },
                list: {
                    ...state.list,
                    data: state.list.data.filter((item) => item.user !== payload),
                    success: true,
                },

            })
        }

        case EDITTEACHERLIST.EDIT_TEACHER_LIST_CLASSROOM_DELETE: {
            return ({
                ...state,
                delete: {
                    ...state.delete,
                    data: payload,
                    success: true,
                },

                assignedteacherclassroom: {
                    ...state.assignedteacherclassroom,
                    data: state.assignedteacherclassroom.data.filter((item) => item._id !== payload.id),
                    success: true,
                }
            })
        }
        case EDITTEACHERLIST.EDIT_TEACHER_LIST_UPDATE_SELECTION: {
            return ({
                ...state,
                update: {
                    ...state.update,
                    data: state.list.data.find(annItem => annItem._id === payload),
                    success: true
                }
            })
        }

        case EDITTEACHERLIST.EDIT_TEACHER_LIST_UPDATE_CLEAR: {
            return ({
                ...state,
                update: {
                    ...state.update,
                    data: payload,
                    success: false

                }
            })
        }

        default:
            return state;
    }
};

export default editteacherlist;