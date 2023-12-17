import InstituteWebsiteRequest from "./InstituteWebsiteRequest";
import { INS_ACTION_TYPES } from "./actionTypes";
import { setCommonError } from "../commonerror";

export const findSubdomain = subdomain => {
   
    return dispatch => {
        dispatch({
            type: INS_ACTION_TYPES.INS_SUBDOMAIN_LOADING,
            payload: {}
        })
        InstituteWebsiteRequest.get(
            InstituteWebsiteRequest.ins_website_endpoint.institute_subdomain.replace('__SUBDOMAIN__', subdomain),
            (success) => {
                if (success.data.total === 1) {
                    dispatch({
                        type: INS_ACTION_TYPES.INS_SUBDOMAIN_LOADED,
                        payload: success.data
                    })
                }
                else {
                    dispatch({
                        type: INS_ACTION_TYPES.INS_SUBDOMAIN_NOT_FOUND,
                        payload: {}
                    })
                }
            },
            error => {
                dispatch(setCommonError(error.message))
                dispatch({
                    type: INS_ACTION_TYPES.INS_SUBDOMAIN_LOADING_ERROR,
                    payload: {}
                })
            }
        )
    }
}

export const findPrivateDomain = domain => {
    return dispatch => {
        dispatch({
            type: INS_ACTION_TYPES.INS_SUBDOMAIN_LOADING,
            payload: {}
        })
        InstituteWebsiteRequest.get(
            InstituteWebsiteRequest.ins_website_endpoint.institute_privatedomain.replace('__DOMAIN__', domain),
            (success) => {
                if (success.data.total === 1) {
                    dispatch({
                        type: INS_ACTION_TYPES.INS_SUBDOMAIN_LOADED,
                        payload: success.data
                    })
                }
                else {
                    dispatch({
                        type: INS_ACTION_TYPES.INS_SUBDOMAIN_NOT_FOUND,
                        payload: {}
                    })
                }
            },
            error => {
                dispatch(setCommonError(error.message))
                dispatch({
                    type: INS_ACTION_TYPES.INS_SUBDOMAIN_LOADING_ERROR,
                    payload: {}
                })
            }, '', ""
        )
    }
}

export const wesbiteLike = (data) => {
    return dispatch => {

        InstituteWebsiteRequest.post(InstituteWebsiteRequest.ins_website_endpoint.institute_like_post, data,
            (success) => {
                dispatch({
                    type: INS_ACTION_TYPES.INS_SUBDOMIAN_LIKE,
                    payload: success.data,
                })
            },
            (error) => {
                dispatch(setCommonError(error.message));
            }
        );
    }
}

export const getWesbiteLike = (insID, userID) => {
    return dispatch => {

        InstituteWebsiteRequest.get(InstituteWebsiteRequest.ins_website_endpoint.institute_like_get.replace("__INSID__", insID).replace("__UID__", userID),
            (success) => {

                dispatch({
                    type: INS_ACTION_TYPES.INS_SUBDOMAIN_LIKE_INFO,
                    payload: success.data.data,

                })
            },
            (error) => {
                dispatch(setCommonError(error.message));
            }
        );
    }
}

export const findPwaDomain = (domain) => {
    return dispatch => {
        dispatch({
            type: INS_ACTION_TYPES.INS_DOMAIN_PWA_LOADING,
            payload: {}
        })
        InstituteWebsiteRequest.get(
            InstituteWebsiteRequest.ins_website_endpoint.institute_pwa_domain.replace('__DOMAIN__', domain),
            (success) => {
                if (success.data.total === 1) {
                    dispatch({
                        type: INS_ACTION_TYPES.INS_DOMAIN_PWA_LOADED,
                        payload: success.data
                    })
                }
                else {
                    dispatch({
                        type: INS_ACTION_TYPES.INS_DOMAIN_PWA_NOT_FOUND,
                        payload: {}
                    })
                }
            },
            error => {
                dispatch(setCommonError(error.message))
                dispatch({
                    type: INS_ACTION_TYPES.INS_DOMAIN_PWA_LOADING_ERROR,
                    payload: {}
                })
            }
        )
    }
}

export const websiteMenuHeader = (domain, type) => {
    return dispatch => {
        dispatch({
            type: INS_ACTION_TYPES.INS_WEBSITE_HEADER_LOADING,
            payload: {}
        })
        if (type === "privateDomain") {
            InstituteWebsiteRequest.get(
                InstituteWebsiteRequest.ins_website_endpoint.getPrivateDomainHeader.replace(
                    "__DOMAIN__",
                    domain
                ),
                (success) => {
                    dispatch({
                        type: INS_ACTION_TYPES.INS_WEBSITE_HEADER,
                        payload: success.data.length ? success.data[0] : [],
                    });
                },

                (error) => {
                    dispatch(setCommonError(error.message));
                }
            );
        } else {
            InstituteWebsiteRequest.get(
                InstituteWebsiteRequest.ins_website_endpoint.getSubdomainHeader.replace(
                    "__SUBDOMAIN__",
                    domain
                ),
                (success) => {
                    dispatch({
                        type: INS_ACTION_TYPES.INS_WEBSITE_HEADER,
                        payload: success.data[0],
                    });
                },

                (error) => {
                    dispatch(setCommonError(error.message));
                }
            );
        }
    }
}