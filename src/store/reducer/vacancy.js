import { VacancyActionTypes } from "../actions/vacancy/actionTypes"

const VACANCY_INITIAL_STATE = {
    list: {
        data: [],
        loading: false,
        success: false,
        error: false,
        loaded: false
    },
    create: {
        saveLoading: false,
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
    updateSelection: {
        data: [],
        loading: false,
        loaded: false,
        success: false,
        error: false,
    },
    delete: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    applicant: {
        data: [],
        loading: false,
        success: false,
        error: false,
        loaded: false
    },
    titleName: {
        data: [],
        loading: false,
        success: false,
        error: false,
        loaded: false
    }
}

const vacancy = (state = VACANCY_INITIAL_STATE, { type, payload }) => {

    switch (type) {
        case VacancyActionTypes.VACANCY_LIST_LOADING:
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

        case VacancyActionTypes.VACANCY_LIST_LOADED:
            return ({
                ...state,
                list: {
                    ...state.list,
                    data: payload,
                    loading: false,
                    loaded: true,
                    success: true,
                    error: false,
                }
            })

        case VacancyActionTypes.APPLICANT_LIST_LOADING:
            return ({
                ...state,
                applicant: {
                    ...state.applicant,
                    data: [],
                    loading: true,
                    error: false,
                    loaded: false,
                    success: false,
                }
            })

        case VacancyActionTypes.APPLICANT_LIST_LOADED:
            return ({
                ...state,
                applicant: {
                    ...state.applicant,
                    data: payload,
                    loading: false,
                    loaded: true,
                    success: true,
                    error: false,
                }
            })

        case VacancyActionTypes.VACANCY_LIST_ERROR:
            return ({
                ...state,
                list: {
                    ...state.list,
                    data: [],
                    loading: false,
                    loaded: false,
                    success: false,
                    error: true,
                }
            })

        case VacancyActionTypes.VACANCY_LIST_SELECTION_LOADING:
            return ({
                ...state,
                updateSelection: {
                    ...state.updateSelection,
                    data: payload,
                    loading: true,
                    loaded: false,
                    success: false,
                }
            })

        case VacancyActionTypes.VACANCY_LIST_SELECTION_LOADED:
            return ({
                ...state,
                updateSelection: {
                    ...state.updateSelection,
                    data: payload,
                    loading: false,
                    loaded: true,
                    success: true,
                }
            })

        // case VacancyActionTypes.VACANCY_LIST_RESET:
        //     return ({
        //         ...state,
        //         list: ONLINE_EXAM_INITIAL_STATE.list
        //     })

        case VacancyActionTypes.VACANCY_CREATING:
            return ({
                ...state,
                create: {
                    ...state.create,
                    saveLoading: false,
                    loading: true,
                    success: false,
                    error: false
                }
            })
        case VacancyActionTypes.VACANCY_CREATING_SAVE:
            return ({
                ...state,
                create: {
                    ...state.create,
                    saveLoading: true,
                    loading: false,
                    success: false,
                    error: false
                }
            })
        case VacancyActionTypes.VACANCY_CREATE_RESET:
            return ({
                ...state,
                create: {
                    ...state.create,
                    saveLoading: false,
                    loading: false,
                    success: false,
                    error: false,
                    data: []
                }
            })

        case VacancyActionTypes.VACANCY_CREATE_ERROR:
            return ({
                ...state,
                create: {
                    ...state.create,
                    loading: false,
                    success: false,
                    error: true
                }
            })

        case VacancyActionTypes.VACANCY_CREATED:
            return {
                ...state,
                create: {
                    ...state.create,
                    loading: false,
                    success: true,
                    saveLoading: false,
                    error: false,
                },
                // list: {
                //     ...state.list,
                //     data: state.list.data.concat(payload)
                // }
            }

        case VacancyActionTypes.VACANCY_DELETE:
            return ({
                ...state,
                delete: {
                    ...state.delete,
                    loading: false,
                    success: true,
                    error: false
                },
                list: {
                    ...state.list,
                    data: state.list.data.filter((item) => item._id !== payload),
                }
            })
        case VacancyActionTypes.VACANCY_DELETE_LOADING:
            return ({
                ...state,
                delete: {
                    ...state.delete,
                    loading: true,
                    success: false,
                    error: false
                },
            })
        case VacancyActionTypes.VACANCY_DELETE_RESET:
            return ({
                ...state,
                delete: {
                    ...state.delete,
                    loading: false,
                    success: false,
                    error: false
                },
            })

        case VacancyActionTypes.UPDATE_LIST_STATUS:
            return ({
                ...state,
                list: {
                    ...state.list,
                    data: state.list.data.map(
                        (content) => content._id === payload._id ? {
                            ...content, isStatus:
                                payload.isStatus
                        }
                            : content),
                }
            })

        case VacancyActionTypes.APPLICANT_UPDATE_LIST_STATUS:
            return ({
                ...state,
                applicant: {
                    ...state.applicant,
                    data: state.applicant.data.map(
                        (content) => content._id === payload._id ? {
                            ...content, isStatus:
                                payload.isStatus, emailNotify: payload.emailNotify
                        }
                            : content),
                }
            })

        case VacancyActionTypes.APPLICANT_UPDATE_EMAIL_NOTIFY:

            return ({
                ...state,
                applicant: {
                    ...state.applicant,
                    data: state.applicant.data.map(
                        (content) => content._id === payload._id ? {
                            ...content, emailNotify:
                                payload.emailNotify
                        }
                            : content),
                }
            })

        case VacancyActionTypes.VACANCY_CANCEL:
            return ({
                ...state,
                list: {
                    ...state.list,
                    data: state.list.data.map(
                        (content) => content._id === payload._id ? {
                            ...content, isNotified:
                                payload.isCancelled
                        }
                            : content),
                }
            })

        case VacancyActionTypes.VACANCY_UPDATING:
            return ({
                ...state,
                update: {
                    ...state.update,
                    loading: true,
                    error: false,
                    success: false,
                    data: payload
                }
            })
        case VacancyActionTypes.VACANCY_UPDATE_RESET:
            return ({
                ...state,
                update: {
                    ...state.update,
                    loading: false,
                    success: false,
                    error: false,
                    data: payload
                }
            })
        case VacancyActionTypes.VACANCY_UPDATE_ERROR:
            return ({
                ...state,
                update: {
                    ...state.update,
                    loading: false,
                    error: true,
                    success: false,
                    data: payload
                }
            })
        case VacancyActionTypes.VACANCY_UPDATED:
            return ({
                ...state,
                update: {
                    ...state.update,
                    loading: false,
                    success: true,
                    data: payload
                },
                list: {
                    ...state.list,
                    data: state.list.data.map(
                        (content) => content._id === payload._id ? {
                            ...content, title:
                                payload.title, description: payload.description,
                            qualification: payload.qualification, position: payload.position,
                            noOfPosition: payload.noOfPosition, lastApplyDate: payload.lastApplyDate,
                            keyRoles: payload.keyRoles, annualSalary: payload.annualSalary,
                            experience: payload.experience, fileUpload: payload.fileUpload,
                            isStatus: payload.isStatus,
                        }
                            : content),
                }
            })

        case VacancyActionTypes.VACANCY_LIST_SELECTION_RESET:
            return ({
                ...state,
                updateSelection: {
                    ...state.updateSelection,
                    data: [],
                    loading: false,
                    loaded: false,
                    success: false,
                    error: false,
                },
            })

        case VacancyActionTypes.VACANCY_TITLE_LOADED:
            return ({
                ...state,
                titleName: {
                    ...state.titleName,
                    data: payload,
                    loading: false,
                    loaded: false,
                    success: true,
                    error: false,
                },
            })

        case VacancyActionTypes.VACANCY_TITLE_LOADING_RESET:
            return ({
                ...state,
                titleName: {
                    ...state.titleName,
                    data: {},
                    loading: false,
                    loaded: false,
                    success: false,
                    error: false,
                },
            })
        case VacancyActionTypes.VACANCY_TITLE_LOADING_ERROR:
            return ({
                ...state,
                titleName: {
                    ...state.titleName,
                    data: {},
                    loading: false,
                    loaded: false,
                    success: false,
                    error: true,
                },
            })
        default:
            return state
    }
}

export default vacancy;