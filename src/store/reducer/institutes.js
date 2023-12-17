import { instituteActionTypes } from "../actions/institutes/actionTypes";

const INS_DETAIL_INITITAL_STATE = {
    list: {
        data: [],
        loading: false,
        success: false,
        error: false,
        errordata: ""
    },
    detail: {
        data: {},
        loading: false,
        success: false,
        error: false,
        errordata: ""
    },
    instituteDetailCount: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    checkSubdomain: {
        exist: "",
        loading: false,
        success: false,
        error: false,
    },
    updateSubdomain: {
        data: [],
        loading: false,
        success: false,
        error: false,
    }

}

const institutes = (state = INS_DETAIL_INITITAL_STATE, { type, payload }) => {
    switch (type) {
        case instituteActionTypes.INS_DETAIL_LOADING:

            return ({
                ...state,
                detail: {
                    ...state.detail,
                    loading: true,
                    success: false
                }
            })

        case instituteActionTypes.INS_DETAIL_LOADED:
            return ({
                ...state,
                detail: {
                    data: payload,
                    loading: false,
                    success: true
                }
            })
        case instituteActionTypes.INS_DETAIL_COUNT_LOADING:
            return ({
                ...state,
                instituteDetailCount: {
                    data: [],
                    loading: true,
                    success: false
                }
            })
        case instituteActionTypes.INS_DETAIL_COUNT_LOADED:
            return ({
                ...state,
                instituteDetailCount: {
                    data: payload,
                    loading: false,
                    success: true
                }
            });

        case instituteActionTypes.SUBDOMAIN_CHECK_AVAIBILITY_LOADING:
            return ({
                ...state,
                checkSubdomain: {
                    exist: "",
                    loading: true,
                    success: false,
                    error: false,
                }
            });

        case instituteActionTypes.SUBDOMAIN_CHECK_AVAIBILITY_LOADED:
            return ({
                ...state,
                checkSubdomain: {
                    exist: payload,
                    loading: false,
                    success: true,
                    error: false,
                }
            });
        case instituteActionTypes.SUBDOMAIN_CHECK_AVAIBILITY_RESET:
            return ({
                ...state,
                checkSubdomain: {
                    exist: "",
                    loading: false,
                    success: false,
                    error: false,
                }
            })
        case instituteActionTypes.SUBDOMAIN_UPDATE_AVAIBILITY_LOADING:
            return ({
                ...state,
                updateSubdomain: {
                    data: [],
                    loading: true,
                    success: false,
                    error: false,
                }
            });
        case instituteActionTypes.SUBDOMAIN_UPDATE_AVAIBILITY_LOADED:
            return ({
                ...state,
                updateSubdomain: {
                    data: payload,
                    loading: false,
                    success: true,
                    error: false,
                }
            });
        case instituteActionTypes.SUBDOMAIN_UPDATE_AVAIBILITY_RESET:
            return ({
                ...state,
                updateSubdomain: {
                    data: [],
                    loading: false,
                    success: false,
                    error: false,
                }
            })

        default:
            return state;
    }
}
export default institutes;