import { ContactUsActionType } from "../actions/contactus/actionTypes";

const INITIAL_STATE = {
    success: false,
    statusCode: '',

    getContactList: {
        data: [],
        totalLength: "",
        loading: false,
        success: false,
        error: false,
    },

    downloadExcelSheetData: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
};

const contactus = (state = INITIAL_STATE, { type, payload }) => {

    switch (type) {
        case ContactUsActionType.CONTACT_US:
            return ({
                ...state,
                response: payload,
                statusCode: payload.data.statusCode,
                success: true
            })

        case ContactUsActionType.CONTACT_US_RESET:
            return ({
                ...state,
                response: [],
                statusCode: '',
                success: false
            })

        case ContactUsActionType.GET_CONTACTS_LIST_LOADING:
            return ({
                ...state,
                getContactList: {
                    ...state.getContactList,
                    data: [],
                    totalLength: "",
                    loading: true,
                    success: false,
                    error: false
                }
            })

        case ContactUsActionType.GET_CONTACTS_LIST_LOADED:
            return ({
                ...state,
                getContactList: {
                    ...state.getContactList,
                    data: payload.data,
                    totalLength: payload.totalLength,
                    loading: false,
                    success: true,
                    error: false
                }
            })

        case ContactUsActionType.GET_CONTACTS_LIST_RESET:
            return ({
                ...state,
                getContactList: {
                    ...state.getContactList,
                    data: [],
                    totalLength: "",
                    loading: false,
                    success: false,
                    error: false
                }
            })

        case ContactUsActionType.GET_CONTACTS_LIST_ERROR:
            return ({
                ...state,
                getContactList: {
                    ...state.getContactList,
                    data: [],
                    totalLength: "",
                    loading: false,
                    success: false,
                    error: true
                }
            })

        case ContactUsActionType.SORT_CONTACTS_LIST:
            return ({
                ...state,
                getContactList: {
                    ...state.getContactList,
                    data: payload.data,
                    totalLength: payload.totalLength,
                    loading: false,
                    success: true,
                    error: false
                }
            })


        case ContactUsActionType.SEARCH_CONTACTS_LIST:
            return ({
                ...state,
                getContactList: {
                    ...state.getContactList,
                    data: payload.data,
                    totalLength: payload.totalLength,
                    loading: false,
                    success: true,
                    error: false
                }
            })

        case ContactUsActionType.DOWNLOAD_EXCEL_SHEET:
            return ({
                ...state,
                downloadExcelSheetData: {
                    ...state.downloadExcelSheetData,
                    data: payload,
                    loading: false,
                    success: true,
                    error: false
                }
            })

        case ContactUsActionType.DOWNLOAD_EXCEL_SHEET_RESET:
            return ({
                ...state,
                downloadExcelSheetData: {
                    ...state.downloadExcelSheetData,
                    data: [],
                    loading: false,
                    success: false,
                    error: false
                }
            })

        default:
            return state;
    }
}

export default contactus