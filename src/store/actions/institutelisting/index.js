import { InstituteListingActionTypes } from "./actionTypes";
import instituteListingRequest from "./instituteListingRequest";
import { setCommonError } from "../commonerror";

export const getInstituteListingList = (INC, LIMIT) => {
    return dispatch => {

        dispatch({
            type: InstituteListingActionTypes.IL_LIST_LOADING,
            payload: [],
            loading: true
        })

        instituteListingRequest.get(instituteListingRequest.InsituteListEndpoint.instituteList.replace("__INC__", INC).replace("__LIMIT__", LIMIT), (success) => {

            dispatch({
                type: InstituteListingActionTypes.IL_LIST_LOADED,
                payload: success.data,
                laoded: true,
            })
        },
            error => {
                dispatch(setCommonError(error.message))

                dispatch({
                    type: InstituteListingActionTypes.IL_LIST_ERROR,
                    error: true
                })
            });

    }
}

export const getInstituteListingListReverseTotal = () => {
    return dispatch => {

        dispatch({
            type: InstituteListingActionTypes.IL_LIST_REVERSE_LOADING,
            payload: [],
            loading: true
        })

        instituteListingRequest.get(instituteListingRequest.InsituteListEndpoint.instituteList, (success) => {

            dispatch({
                type: InstituteListingActionTypes.IL_LIST_REVERSE_LOADED,
                payload: success.data,
                laoded: true,
            })
        },
            error => {
                dispatch(setCommonError(error.message))

                dispatch({
                    type: InstituteListingActionTypes.IL_LIST_REVERSE_ERROR,
                    error: true
                })
            });

    }
}

export const getFeaturedInstituteList = () => {
    return dispatch => {

        dispatch({
            type: InstituteListingActionTypes.IL_FEATURED_LIST_LOADING,
            payload: [],
            loading: true
        })

        instituteListingRequest.get(instituteListingRequest.InsituteListEndpoint.featuredInstitute, (success) => {

            dispatch({
                type: InstituteListingActionTypes.IL_FEATURED_LIST_LOADED,
                payload: success.data,
                laoded: true,
            })
        },
            error => {
                dispatch(setCommonError(error.message))

                dispatch({
                    type: InstituteListingActionTypes.IL_FEATURED_LIST_ERROR,
                    error: true
                })
            });

    }
}


export const singleGetInstituteListingList = (INSID) => {
    return dispatch => {

        dispatch({
            type: InstituteListingActionTypes.IL_SINGLE_LIST_LOADING,
            payload: [],
            loading: true
        })

        instituteListingRequest.get(instituteListingRequest.InsituteListEndpoint.singleInstituteInfo.replace("__INSID__", INSID), (success) => {

            dispatch({
                type: InstituteListingActionTypes.IL_SINGLE_LIST_LOADED,
                payload: success.data,
                laoded: true,
            })
        },
            error => {
                dispatch(setCommonError(error.message))

                dispatch({
                    type: InstituteListingActionTypes.IL_SINGLE_LIST_ERROR,
                    error: true
                })
            });

    }
}



export const wesbiteLikeIL = (data) => {
    return dispatch => {

        instituteListingRequest.post(instituteListingRequest.InsituteListEndpoint.institute_like_post, data,
            (success) => {
                dispatch({
                    type: InstituteListingActionTypes.IL_LIKE_ID,
                    payload: data,
                })
            },
            (error) => {
                dispatch(setCommonError(error.message));
            }
        );
    }
}


export const wesbiteLikeILReset = (data) => {
    return dispatch => {

        dispatch({
            type: InstituteListingActionTypes.IL_LIKE_ID_RESET,
        })
    }
}

export const scrollInstituteDataList = (INC, LIMIT) => {
    return dispatch => {

        dispatch({
            type: InstituteListingActionTypes.IL_LIST_SCROLL_LOADING,
            payload: [],
            loading: true
        })

        instituteListingRequest.get(instituteListingRequest.InsituteListEndpoint.scrollInstituteData.replace("__INC__", INC).replace("__LIMIT__", LIMIT), (success) => {

            dispatch({
                type: InstituteListingActionTypes.IL_LIST_SCROLL_LOADED,
                payload: success.data,
                laoded: true,
            })
        },
            error => {
                dispatch(setCommonError(error.message))

                dispatch({
                    type: InstituteListingActionTypes.IL_LIST_SCROLL_ERROR,
                    error: true
                })
            });

    }
}
export const scrollSearchInstituteDataList = (VAl, INC, LIMIT) => {
    return dispatch => {

        dispatch({
            type: InstituteListingActionTypes.IL_LIST_SCROLL_LOADING,
            payload: [],
            loading: true
        })

        instituteListingRequest.get(instituteListingRequest.InsituteListEndpoint.searchScrollInstituteData.replace("__VALUE__", VAl).replace("__INC__", INC).replace("__LIMIT__", LIMIT).replace("__VALUE2__", VAl).replace("__VALUE3__", VAl).replace("__VALUE4__", VAl), (success) => {

            dispatch({
                type: InstituteListingActionTypes.IL_LIST_SCROLL_LOADED,
                payload: success.data,
                laoded: true,
            })
        },
            error => {
                dispatch(setCommonError(error.message))

                dispatch({
                    type: InstituteListingActionTypes.IL_LIST_SCROLL_ERROR,
                    error: true
                })
            });

    }
}

export const scrollFilterInstituteDataList = (UID, INC, LIMIT) => {
    return dispatch => {

        dispatch({
            type: InstituteListingActionTypes.IL_LIST_SCROLL_LOADING,
            loading: true
        })

        instituteListingRequest.get(instituteListingRequest.InsituteListEndpoint.scroolLikedInstitute.replace("__UID__", UID).replace("__INC__", INC).replace("__LIMIT__", LIMIT), (success) => {

            dispatch({
                type: InstituteListingActionTypes.IL_LIST_SCROLL_LOADED,
                payload: success.data,
                laoded: true,
            })
        },
            error => {
                dispatch(setCommonError(error.message))

                dispatch({
                    type: InstituteListingActionTypes.IL_LIST_SCROLL_ERROR,
                    error: true
                })
            });

    }
}

export const searchInstituteDataList = (SearchValue) => {
    return dispatch => {

        dispatch({
            type: InstituteListingActionTypes.IL_LIST_SEARCH_LOADING,
            payload: [],
            loading: true
        })
        dispatch({
            type: InstituteListingActionTypes.IL_LIST_SCROLL_LOADING,
            loading: true
        })
        instituteListingRequest.get(instituteListingRequest.InsituteListEndpoint.searchInstituteData.replace("__VALUE__", SearchValue).replace("__VALUE2__", SearchValue).replace("__VALUE3__", SearchValue).replace("__VALUE4__", SearchValue), (success) => {

            dispatch({
                type: InstituteListingActionTypes.IL_LIST_SEARCH_LOADED,
                payload: success.data,
                laoded: true,
            })
        },
            error => {
                dispatch(setCommonError(error.message))

                dispatch({
                    type: InstituteListingActionTypes.IL_LIST_SEARCH_ERROR,
                    error: true
                })
            });

    }
}


export const getUserLikeInfo = (uID) => {
    return dispatch => {

        dispatch({
            type: InstituteListingActionTypes.IL_LIKE_INFO_LOADING,
            payload: [],
            loading: true
        })

        instituteListingRequest.get(instituteListingRequest.InsituteListEndpoint.userLikeInfo.replace("__UID__", uID), (success) => {

            dispatch({
                type: InstituteListingActionTypes.IL_LIKE_INFO_LOADED,
                payload: success.data,
                laoded: true,
            })
        },
            error => {
                dispatch(setCommonError(error.message))

                dispatch({
                    type: InstituteListingActionTypes.IL_LIKE_INFO_ERROR,
                    error: true
                })
            });

    }
}


export const getLikedInstitute = (uID) => {
    return dispatch => {

        dispatch({
            type: InstituteListingActionTypes.IL_LIKED_LOADING,
            loading: true
        })

        instituteListingRequest.get(instituteListingRequest.InsituteListEndpoint.likedInstitute.replace("__UID__", uID), (success) => {

            dispatch({
                type: InstituteListingActionTypes.IL_LIKED_LOADED,
                payload: success.data,
                laoded: true,
            })
        },
            error => {
                dispatch(setCommonError(error.message))

                dispatch({
                    type: InstituteListingActionTypes.IL_LIKED_ERROR,
                    error: true
                })
            });

    }
}

export const getMyInstituteList = (uID) => {
    return dispatch => {

        dispatch({
            type: InstituteListingActionTypes.IL_MY_INS_LOADING,
            loading: true
        })

        instituteListingRequest.get(instituteListingRequest.InsituteListEndpoint.myInstituteList.replace("__UID__", uID), (success) => {

            dispatch({
                type: InstituteListingActionTypes.IL_MY_INS_LOADED,
                payload: success.data,
                laoded: true,
            })
        },
            error => {
                dispatch(setCommonError(error.message))

                dispatch({
                    type: InstituteListingActionTypes.IL_MY_INS_ERROR,
                    error: true
                })
            });

    }
}