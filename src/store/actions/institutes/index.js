import Auth from "../../../Classes/Auth";
import { setCommonError } from "../commonerror";
import { userActionType } from "../user/actionTypes";
import { instituteActionTypes } from "./actionTypes";
import InstituteInfoRequest from "./InstituteRequest";

export const getInstituteDetail = (InsId) => {
    return (dispatch) => {
        dispatch({
            type: instituteActionTypes.INS_DETAIL_LOADING,
            payload: []
        })
        InstituteInfoRequest.get(
            InstituteInfoRequest.InstituteInfoRequest.InstituteInfoRequest
                .replace("__INS__", InsId),
            (success) => {
                dispatch({
                    type: instituteActionTypes.INS_DETAIL_LOADED,
                    payload: success.data ? success.data : [],
                });
            },
            (error) => {
                dispatch(setCommonError(error.message));
            }
        );
    };
};
export const getInstituteCountDetails = (InsId, ownerId, type) => {
    return (dispatch) => {
        dispatch({
            type: instituteActionTypes.INS_DETAIL_COUNT_LOADING,
            payload: []
        })
        InstituteInfoRequest.get(
            InstituteInfoRequest.InstituteInfoRequest.instituteCountRequest
                .replace("__INS__", InsId).replace("__OWNER__", ownerId).replace("__TYPE__", type),
            (success) => {
                dispatch({
                    type: instituteActionTypes.INS_DETAIL_COUNT_LOADED,
                    payload: success.data ? success.data : [],
                });
            },
            (error) => {
                dispatch(setCommonError(error.message));
            }
        );
    };
};

export const checkSubdomainAvaibility = (Subdomain) => {
    return (dispatch) => {
        dispatch({
            type: instituteActionTypes.SUBDOMAIN_CHECK_AVAIBILITY_LOADING,
            payload: []
        })
        InstituteInfoRequest.get(
            InstituteInfoRequest.InstituteInfoRequest.checksubdomainAvaibility
                .replace("_subdomain_", Subdomain),
            (success) => {
                dispatch({
                    type: instituteActionTypes.SUBDOMAIN_CHECK_AVAIBILITY_LOADED,
                    payload: success.data && success.data === "Website Domain Found" ? "Exist" : success.data && success.data === "Website Domain Not Found" && "Not Exist",
                });
            },
            (error) => {
                dispatch(setCommonError(error.message));
            }
        );
    };
};
export const UpdateSubdomainAvailable = (id, body, type) => {
    return (dispatch) => {
        dispatch({
            type: instituteActionTypes.SUBDOMAIN_UPDATE_AVAIBILITY_LOADING,
            payload: []
        })
        InstituteInfoRequest.patch(
            InstituteInfoRequest.InstituteInfoRequest.updateSubdomain
                .replace("_TYPE_", type).replace("_ID_", id), body,
            (success) => {
                dispatch({
                    type: instituteActionTypes.SUBDOMAIN_UPDATE_AVAIBILITY_LOADED,
                    payload: success.data ? success.data : [],
                });
              
                if (success.data && success.data.message === "UPDATED SUCCESSFULLY") {
                    Auth.updateUserDetail("user_institute_institute_subdomain", body.subdomain);
                    Auth.updateUserDetail("user_business_business_subdomain", body.subdomain);
                    dispatch({
                        type: userActionType.SET_INSTITUTE_INFORMATION,
                        payload: {
                            user_institute_institute_subdomain: body.subdomain,
                            user_business_business_subdomain: body.subdomain
                        },
                    });
                }
            },
            (error) => {
                dispatch(setCommonError(error.message));
            }
        );
    };
};

export const resetCheckSubdomain = () => {
    return (dispatch) => {
        dispatch({
            type: instituteActionTypes.SUBDOMAIN_CHECK_AVAIBILITY_RESET,
            payload: []
        })
    }
}
export const resetUpdateSudomain = () => {
    return (dispatch) => {
        dispatch({
            type: instituteActionTypes.SUBDOMAIN_UPDATE_AVAIBILITY_RESET,
            payload: []
        })
    }
}