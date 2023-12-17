import { EDNEED_FEED_AT } from "./actionTypes";
import edneedFeedRequest from "./edneedFeedRequest";
import { setCommonError } from "../commonerror";

export const getCommunityFeedData = (skip, limit) => {
    return dispatch => {
        dispatch({
            type: EDNEED_FEED_AT.EDNEED_FEED_COMMUNITY_LOADING,
            payload: []
        })

        edneedFeedRequest.get(edneedFeedRequest.edneedFeedEndPoint.communityfeed.replace("__INC__", skip).replace("__LIMIT__", limit), (success) => {
            dispatch({
                type: EDNEED_FEED_AT.EDNEED_FEED_COMMUNITY_LOADED,
                payload: success.data.data
            })
        },
            error => {
                dispatch(setCommonError(error.message))

                dispatch({
                    type: EDNEED_FEED_AT.EDNEED_FEED_COMMUNITY_ERROR,
                    payload: []
                })
            }
        );
    }
}
export const getInstituteListingData = (skip, limit) => {
    return dispatch => {
        dispatch({
            type: EDNEED_FEED_AT.EDNEED_FEED_INSTITUTE_LISTING_LOADING,
            payload: []
        })

        edneedFeedRequest.get(edneedFeedRequest.edneedFeedEndPoint.institutelisting.replace("__INC__", skip).replace("__LIMIT__", limit), (success) => {

            dispatch({
                type: EDNEED_FEED_AT.EDNEED_FEED_INSTITUTE_LISTING_LOADED,
                payload: success.data.data
            })
        },
            error => {
                dispatch(setCommonError(error.message))

                dispatch({
                    type: EDNEED_FEED_AT.EDNEED_FEED_INSTITUTE_LISTING_ERROR,
                    payload: []
                })
            }
        );
    }
}
export const postEdneedFeedLike = (data) => {
    return dispatch => {
        dispatch({
            type: EDNEED_FEED_AT.EDNEED_FEED_INSTITUTE_LIKE_LOADING,
            payload: []
        })

        edneedFeedRequest.post(edneedFeedRequest.edneedFeedEndPoint.institute_like_post, data, (success) => {

            dispatch({
                type: EDNEED_FEED_AT.EDNEED_FEED_INSTITUTE_LIKE_LOADED,
                payload: data
            })
        },
            error => {
                dispatch(setCommonError(error.message))

                dispatch({
                    type: EDNEED_FEED_AT.EDNEED_FEED_INSTITUTE_LIKE_ERROR,
                    payload: []
                })
            }
        );
    }
}
export const getInstagramFeedData = () => {
    return dispatch => {
        dispatch({
            type: EDNEED_FEED_AT.EDNEED_FEED_INSTAGRAM_LOADING,
            payload: []
        })

        edneedFeedRequest.get(edneedFeedRequest.edneedFeedEndPoint.instagramfeed, (success) => {

            dispatch({
                type: EDNEED_FEED_AT.EDNEED_FEED_INSTAGRAM_LOADED,
                payload: success.data
            })
        },
            error => {
                dispatch(setCommonError(error.message))

                dispatch({
                    type: EDNEED_FEED_AT.EDNEED_FEED_INSTAGRAM_ERROR,
                    payload: []
                })
            }
        );
    }
}