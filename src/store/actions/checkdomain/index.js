import { CHECKDOMAIN_LIST_AT } from "./actionType";
import Request from "./checkDomainRequest";
import { setCommonError } from "../commonerror"
import { updateUserInstituteInfo } from "../user";
import { showSuccessPopup } from "../successmessagepopup";


export const getInstituteData = (_id) => {
    return dispatch => {
        dispatch({
            type: CHECKDOMAIN_LIST_AT.CHECKDOMAIN_LOADING,
            payload: []
        })
        Request.get(Request.checkDomainRequest.endpoint.replace("__ID__", _id), (success) => {

            dispatch({
                type: CHECKDOMAIN_LIST_AT.CHECKDOMAIN_READ,
                payload: success.data
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            }
        );
    }
}

export const getCheckDomain = (domain) => {
    return dispatch => {
        dispatch({

            type: CHECKDOMAIN_LIST_AT.DOMAIN_READ_LOADING,
            loading: true,
        })

        Request.get(Request.checkDomainRequest.infocheckdomain.replace('__domain__', domain), (success) => {

            dispatch({
                type: CHECKDOMAIN_LIST_AT.DOMAIN_READ,
                payload: success.data.data,

            })

        },
            error => {
                dispatch(setCommonError(error.message))
            }
        );
    }
}



export const postInstituteData = (data) => {
    return dispatch => {

        Request.post(Request.checkDomainRequest.endpoint, data, (success) => {
            dispatch({
                type: CHECKDOMAIN_LIST_AT.CHECKDOMAIN_CREATE,
                payload: success.data.data
            })
        },
            error => {
                dispatch(setCommonError(error.message))
            }
        );
    }
}


export const patchInstituteData = (id, data, businessType) => {

    return dispatch => {
        dispatch({
            type: CHECKDOMAIN_LIST_AT.CHECKDOMAIN_PATCH_REST,
            loading: true,
        })
        if (businessType) {
            Request.patch(Request.checkDomainRequest.patchInstituteMiddlewareInfo.replace("__BUSINESS_ID__", id).replace("__TYPE__", businessType),
                data,
                (success) => {
                    dispatch(updateUserInstituteInfo(success.data.resp.institute_subdomain))
                    dispatch(showSuccessPopup("Website Updated."));
                    dispatch({
                        type: CHECKDOMAIN_LIST_AT.CHECKDOMAIN_PATCH,
                        payload: success.data.resp
                    })
                },
                error => {
                    dispatch(setCommonError(error.message))
                }
            );
        } else {
            Request.patch(Request.checkDomainRequest.patchInstituteInfo.replace("__INS_ID__", id), data, (success) => {
                dispatch(updateUserInstituteInfo(success.data.institute_subdomain))
                dispatch(showSuccessPopup("Website Updated."));
                dispatch({
                    type: CHECKDOMAIN_LIST_AT.CHECKDOMAIN_PATCH,
                    payload: success.data
                })
            },
                error => {
                    dispatch(setCommonError(error.message))
                }
            );
        }
    }
}

export const patchInstituteDataREST = () => {

    return dispatch => {

        dispatch({
            type: CHECKDOMAIN_LIST_AT.CHECKDOMAIN_PATCH_REST,
        })
    }
}

export const patchInstituteDataReset = () => {

    return dispatch => {

        dispatch({
            type: CHECKDOMAIN_LIST_AT.CHECKDOMAIN_PATCH_RESET,
        })
    }
}

