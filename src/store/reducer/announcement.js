import { ANNOUNCEMENT_LIST_AT } from "../actions/announcementlist/actionType";

const ANNOUNCEMENT_LIST_INITIAL_STATE = {
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
        data: {},
        loading: false,
        success: false,
        error: false,
    },
    edit: {
        data: {},
        loading: false,
        success: false,
        error: false,
    },
    delete: {
        data: {},
        loading: false,
        success: false,
        error: false,
    },


}

const announcement = (state = ANNOUNCEMENT_LIST_INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_READ: {

            return {

                ...state,
                list: {
                    ...state.list,
                    data: payload,
                    success: true,
                }
            }
        }

        case ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_CREATE: {

            return {
                ...state,
                create: {
                    ...state.create,
                    data: payload,
                    success: true,
                    error: false,
                    loading: false,
                },
                list: {
                    ...state.list,
                    data: state.list.data.concat(payload),
                    success: true,
                }
            }

        }
        case ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_CREATE_RESET: {

            return {
                ...state,
                create: {
                    ...state.create,
                    data: [],
                    success: false,
                    error: false,
                    loading: false
                },
            }

        }
        case ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_CREATE_LOADING: {

            return {
                ...state,
                create: {
                    ...state.create,
                    data: [],
                    success: false,
                    error: false,
                    loading: true
                },
            }

        }

        case ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_EDIT: {
            return {
                ...state,
                edit: {
                    ...state.edit,
                    data: {},
                    success: true,
                    loading: false,
                    error: false,
                },
                list: {
                    ...state.list,
                    data: state.list.data.map(
                        (content) => content._id === payload._id ? 
                            payload
                            : content),

                    success: true,
                }
            }
        }

        case ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_CREATE_ERROR: {
            return {
                ...state,
                edit: {
                    ...state.edit,
                    data: {},
                    success: false,
                    loading: true,
                    error: false,
                },
            }
        }

        case ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_EDIT_LOADING: {
            return {
                ...state,
                edit: {
                    ...state.edit,
                    data: {},
                    success: false,
                    loading: true,
                    error: false,
                },
            }
        }
        case ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_EDIT_RESET: {
            return {
                ...state,
                edit: {
                    ...state.edit,
                    data: {},
                    success: false,
                    loading: false,
                    error: false,
                },
            }
        }
        case ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_DELETE: {
            return {
                ...state,
                delete: {
                    ...state.delete,
                    data: payload,
                    success: true,
                    loading: false,
                    error: false
                },

                list: {
                    ...state.list,
                    data: state.list.data.filter((item) => item._id !== payload._id),
                    success: true,
                }
            }

        }
        case ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_DELETE_RESET: {

            return ({
                ...state,
                delete: {
                    ...state.delete,
                    data: payload,
                    success: false,
                    loading: false,
                    error: false
                },
            })
        }

        case ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_DELETE_LOADING: {

            return ({
                ...state,
                delete: {
                    ...state.delete,
                    data: payload,
                    success: false,
                    loading: true,
                    error: false
                },
            })
        }

        case ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_UPDATE_SELECTION:
            return ({
                ...state,
                update: {
                    ...state.update,
                    data: state.list.data.find(annItem => annItem._id === payload),
                    success: true,
                }
            })

        case ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_UPDATE_SELECTION_CLEAR:
            return ({
                ...state,
                update: {
                    ...state.update,
                    data: payload,
                    success: false,
                }
            })


        default:
            return state
    }
}

export default announcement;