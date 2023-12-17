import { CHECKDOMAIN_LIST_AT } from "../actions/checkdomain/actionType";

const CHECKDOMAIN_LIST_INITIAL_STATE = {
    list: {
        data: [],
        loading: false,
        error: false,
        success: false,
    },
    create: {
        data: "",
        loading: false,
        success: false,
        error: false,
    },
    domainread: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    patch: {
        data: [],
        loading: false,
        success: false,
        error: false,
    }
}

const checkDomain = (state = CHECKDOMAIN_LIST_INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case CHECKDOMAIN_LIST_AT.CHECKDOMAIN_READ: {
            return {

                ...state,
                list: {
                    ...state.list,
                    data: payload,
                    success: true,
                }
            }
        }
        case CHECKDOMAIN_LIST_AT.CHECKDOMAIN_LOADING: {
            return {

                ...state,
                list: {
                    ...state.list,
                    data: [],
                    success: false,
                    loading: true,
                }
            }
        }

        case CHECKDOMAIN_LIST_AT.CHECKDOMAIN_CREATE: {

            return {
                ...state,
                create: {
                    ...state.create,
                    data: payload,
                    success: true,
                }
            }

        }
        case CHECKDOMAIN_LIST_AT.DOMAIN_READ: {

            return {

                ...state,
                domainread: {
                    ...state.domainread,
                    data: payload,
                    success: true,
                    loading: false,
                }
            }
        }

        case CHECKDOMAIN_LIST_AT.DOMAIN_READ_LOADING: {

            return {

                ...state,
                domainread: {
                    ...state.domainread,
                    loading: true,
                    success: false,
                    data: []
                }
            }
        }
        case CHECKDOMAIN_LIST_AT.CHECKDOMAIN_PATCH_REST: {
            return {
                ...state,
                patch: {
                    ...state.patch,
                    loading: true,
                    success: false,
                    data: []
                }
            }
        }
        case CHECKDOMAIN_LIST_AT.CHECKDOMAIN_PATCH: {
            return {
                ...state,
                patch: {
                    ...state.patch,
                    loading: false,
                    success: true,
                    data: payload
                }
            }
        }
        case CHECKDOMAIN_LIST_AT.CHECKDOMAIN_PATCH_RESET: {
            return {
                ...state,
                patch: {
                    ...state.patch,
                    loading: false,
                    success: false,
                    data: []
                },
                list: {
                    ...state.list,
                    data: [],
                    success: false,
                    loading: false,
                }
            }
        }

        default:
            return state
    }
}

export default checkDomain;