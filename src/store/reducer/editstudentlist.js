import { EDITSTUDENTLIST } from "../actions/editstudentlist/actionType";

const STUDENT_INITIAL_STATE = {
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
    updateselection: {
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

    studentusername: {

        data: [],
        loading: false,
        success: false,
        error: false,

    },

    courselist: {

        data: [],
        loading: false,
        success: false,
        error: false,

    },
    studentlistcount: {

        data: [],
        loading: false,
        success: false,
        error: false,

    },

};

const editstudentlist = (state = STUDENT_INITIAL_STATE, { type, payload }) => {
    switch (type) {

        case EDITSTUDENTLIST.EDIT_STUDENT_LIST_READ:
            return {

                ...state,
                list: {
                    ...state.list,
                    data: payload,
                    success: true,
                }
            }
        case EDITSTUDENTLIST.EDIT_STUDENT_LIST_READ_RESET:
            return {

                ...state,
                list: {
                    ...state.list,
                    success: false,
                    data: {}
                }
            }

        case EDITSTUDENTLIST.EDIT_COURSE_LIST_READ:
            return {

                ...state,
                courselist: {
                    ...state.courselist,
                    data: payload,
                    success: true,
                }
            }
        case EDITSTUDENTLIST.EDIT_STUDENT_LIST_COUNT:
            return {

                ...state,
                studentlistcount: {
                    ...state.studentlistcount,
                    data: payload,
                    success: true,
                }
            }


        case EDITSTUDENTLIST.EDIT_STUDENT_LIST_USERNAME_READ:
            return {

                ...state,
                studentusername: {
                    ...state.studentusername,
                    data: payload,
                    success: true,
                }
            }

        case EDITSTUDENTLIST.EDIT_STUDENT_LIST_CREATE: {

            return {
                ...state,
                create: {
                    ...state.create,
                    data: payload,
                    success: true,
                },
                // list: {
                //     ...state.list,
                //     data: state.list.data.concat(payload),
                //     success: true,
                // }
            }
        }
        case EDITSTUDENTLIST.EDIT_STUDENT_LIST_UPDATE: {
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
                    data: state.list.data.filter((item) => item.user !== payload),
                    success: true,
                }
            }
        }
        case EDITSTUDENTLIST.EDIT_STUDENT_LIST_DELETE: {

            return ({
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
                studentlistcount: {
                    ...state.studentlistcount,
                    data: state.studentlistcount.data.filter((item) => item._id !== payload),
                    success: true,
                }
            })
        }

        case EDITSTUDENTLIST.EDIT_STUDENT_LIST_UPDATE_SELECTION:
            return ({
                ...state,
                updateselection: {
                    ...state.updateselection,
                    data: state.list.data.find(annItem => annItem._id === payload)
                }
            })
        default:
            return state;
    }
};

export default editstudentlist;