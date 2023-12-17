import { ContactUsActionType } from "./actionTypes";
import contactRequest from './contactRequest';
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const submitContactInfo = (data) => {
    return dispatch => {

        contactRequest.post(contactRequest.contactusEndpoint.contactusUrl, data,
            (success) => {
                dispatch({
                    type: ContactUsActionType.CONTACT_US,
                    payload: success
                })

                // dispatch(showSuccessPopup('Thank You, We will get back to you soon !'));
            },
            error => {
                dispatch(setCommonError(error.message))
            }
        );
    }
}

export const postContactReset = () => {
    return (dispatch) => {
        dispatch({
            type: ContactUsActionType.CONTACT_US_RESET,
            payload: []
        })
    }
}

//get Contact list
export const getContactList = (id, value, limit, skip, industry, sortOrder,tileStatus) => {
    // console.log("DD",id, value, limit, skip, industry, sortOrder)
    return (dispatch) => {
        dispatch({
            type: ContactUsActionType.GET_CONTACTS_LIST_LOADING,
            loading: true,
        })
        contactRequest.get(contactRequest.contactusEndpoint.getContacts.replace("_Id_", id)
            .replace("_searchValue_", value).replace("_sortValue_", sortOrder).replace("_tileValue_", tileStatus)
            .replace("__LIMIT__", limit).replace("__SKIP__", skip).replace("__TYPE__", industry),
            (success) => {
                dispatch({
                    type: ContactUsActionType.GET_CONTACTS_LIST_LOADED,
                    payload: success.data
                })
            },
            error => {
                dispatch({
                    type: ContactUsActionType.GET_CONTACTS_LIST_ERROR,
                    payload: []
                })
                dispatch(setCommonError(error.message))
            }
        );
    }
}

export const getContactListReset = () => {
    return (dispatch) => {
        dispatch({
            type: ContactUsActionType.GET_CONTACTS_LIST_RESET,
            payload: []
        })
    }
}

//sort-by filter
// export const sortContactList = (id, value, limit, skip, industry) => {
//     return (dispatch) => {
//         dispatch({
//             type: ContactUsActionType.GET_CONTACTS_LIST_LOADING,
//             loading: true
//         })
//         contactRequest.get(contactRequest.contactusEndpoint.sortContactList.replace("_Id_", id)
//             .replace("_sortValue_", value)
//             .replace("__LIMIT__", limit).replace("__SKIP__", skip).replace("__TYPE__", industry),
//             (success) => {
//                 dispatch({
//                     type: ContactUsActionType.SORT_CONTACTS_LIST,
//                     payload: success.data
//                 })
//             }, (error) => {
//                 dispatch(setCommonError(error.message))
//             }
//         )
//     }
// }

//search
export const searchContactList = (id, value, limit, skip, industry) => {
    return (dispatch) => {
        dispatch({
            type: ContactUsActionType.GET_CONTACTS_LIST_LOADING,
            loading: true
        })
        contactRequest.get(contactRequest.contactusEndpoint.searchContactList.replace("_Id_", id)
            .replace("_searchValue_", value)
            .replace("__LIMIT__", limit).replace("__SKIP__", skip).replace("__TYPE__", industry),
            (success) => {
                dispatch({
                    type: ContactUsActionType.SEARCH_CONTACTS_LIST,
                    payload: success.data
                })
            }, (error) => {
                dispatch(setCommonError(error.message))
            }
        )
    }
}

//download excel
export const downloadExcelSheet = (data) => {
    return (dispatch) => {
        contactRequest.post(contactRequest.contactusEndpoint.downloadExcelSheet, data,
            (success) => {
                dispatch({
                    type: ContactUsActionType.DOWNLOAD_EXCEL_SHEET,
                    payload: success.data
                })
            }, (error) => {
                dispatch(setCommonError(error.message))
            }
        )
    }
}

export const downloadExcelSheetReset = () => {
    return (dispatch) => {
        dispatch({
            type: ContactUsActionType.DOWNLOAD_EXCEL_SHEET_RESET,
            payload: []
        })
    }
}