import { EDNEED_FEED_AT } from "../actions/edneedfeed/actionTypes"

const EDNEED_FEED_INITIAL_STATE = {
    instituteListing: {
        data: [],
        success: false,
        loading: false,
        error: false,
        loaded: false
    },
    instituteLiked: {
        data: [],
        success: false,
        loading: false,
        error: false,
        loaded: false
    },
    instagramFeed: {
        data: [],
        loading: false,
        success: false,
        error: false,
        loaded: false
    },
    communityFeed: {
        data: [],
        loading: false,
        success: false,
        error: false,
        loaded: false
    },
}

const edneedfeed = (state = EDNEED_FEED_INITIAL_STATE, { type, payload }) => {

    switch (type) {
        case EDNEED_FEED_AT.EDNEED_FEED_INSTITUTE_LISTING_LOADING:
            return ({
                ...state,
                instituteListing: {
                    ...state.instituteListing,
                    data: [],
                    loading: true,
                    success: false,
                }
            })

        case EDNEED_FEED_AT.EDNEED_FEED_INSTITUTE_LISTING_LOADED:
            return ({
                ...state,
                instituteListing: {
                    ...state.instituteListing,
                    data: payload,
                    loaded: true,
                    success: true,
                    error: false,
                    loading: false
                }
            })

        case EDNEED_FEED_AT.EDNEED_FEED_INSTITUTE_LISTING_ERROR:
            return ({
                ...state,
                instituteListing: {
                    ...state.instituteListing,
                    data: [],
                    loaded: false,
                    success: false,
                    loading: false,
                    error: true,
                }
            })


        case EDNEED_FEED_AT.EDNEED_FEED_INSTITUTE_LIKE_LOADED:
            return ({
                ...state,
                instituteLiked: {
                    ...state.instituteLiked,
                    data: payload,
                    success: true,
                    error: false,
                    loading: false
                },
                instituteListing: {
                    ...state.instituteListing,
                    data: state.instituteListing.data.map(
                        (content) => content._id === payload._id ? {
                            ...content, likestatus:
                                !content.likestatus, totallike: payload.totallike
                        }
                            : content),

                }
            })
        case EDNEED_FEED_AT.EDNEED_FEED_INSTITUTE_LIKE_LOADING:
            return ({
                ...state,
                instituteLiked: {
                    ...state.instituteLiked,
                    data: payload,
                    success: false,
                    error: false,
                    loading: true
                }
            })
        case EDNEED_FEED_AT.EDNEED_FEED_INSTITUTE_LIKE_ERROR:
            return ({
                ...state,
                instituteLiked: {
                    ...state.instituteLiked,
                    data: payload,
                    success: false,
                    error: false,
                    loading: false
                }
            })



        case EDNEED_FEED_AT.EDNEED_FEED_COMMUNITY_LOADING:
            return ({
                ...state,
                communityFeed: {
                    ...state.communityFeed,
                    data: [],
                    loading: true
                }
            })

        case EDNEED_FEED_AT.EDNEED_FEED_COMMUNITY_LOADED:
            return ({
                ...state,
                communityFeed: {
                    ...state.communityFeed,
                    data: payload,
                    loaded: true,
                    success: true,
                    error: false,
                    loading: false
                }
            })

        case EDNEED_FEED_AT.EDNEED_FEED_COMMUNITY_ERROR:
            return ({
                ...state,
                communityFeed: {
                    ...state.communityFeed,
                    data: [],
                    loaded: false,
                    success: false,
                    loading: false,
                    error: true,
                }
            })

        case EDNEED_FEED_AT.EDNEED_FEED_INSTAGRAM_LOADING:
            return ({
                ...state,
                instagramFeed: {
                    ...state.instagramFeed,
                    data: [],
                    loading: true
                }
            })

        case EDNEED_FEED_AT.EDNEED_FEED_INSTAGRAM_LOADED:
            return ({
                ...state,
                instagramFeed: {
                    ...state.instagramFeed,
                    data: payload,
                    loaded: true,
                    success: true,
                    loading: false,
                    error: false,
                }
            })

        case EDNEED_FEED_AT.EDNEED_FEED_INSTAGRAM_ERROR:
            return ({
                ...state,
                instagramFeed: {
                    ...state.instagramFeed,
                    data: [],
                    loaded: false,
                    success: false,
                    loading: false,
                    error: true,
                }
            })



        default:
            return state
    }
}

export default edneedfeed;