import { InstituteListingActionTypes } from "../actions/institutelisting/actionTypes"

const INSTITUTE_LISTING_INITIAL_STATE = {
    list: {
        data: [],
        loading: false,
        loaded: false,
        success: false,
        error: false,
    },
    listReverse: {
        data: [],
        loading: false,
        loaded: false,
        success: false,
        error: false,
    },
    likeData: {
        data: [],
        success: false,
        error: false,
    },
    create: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    likeInfo: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    singleInstituteData: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    scrollData: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    likedInstitute: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    featuredListing: {
        data: [],
        loading: false,
        success: false,
        error: false,
    }
}

const institutelisting = (state = INSTITUTE_LISTING_INITIAL_STATE, { type, payload }) => {

    switch (type) {
        case InstituteListingActionTypes.IL_LIST_LOADING: {
            return {
                ...state,
                list: {
                    ...state.list,
                    data: [],
                    loading: true,
                    error: false,
                    loaded: false,
                    success: false,
                }
            }
        }
        case InstituteListingActionTypes.IL_LIST_LOADED: {
            return {
                ...state,
                list: {
                    ...state.list,
                    data: payload,
                    loaded: true,
                    success: true,
                    error: false,
                    loading: false,
                }
            }
        }
        case InstituteListingActionTypes.IL_LIST_ERROR: {
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    loaded: false,
                    success: false,
                    error: true,
                }
            }
        }
        case InstituteListingActionTypes.IL_FEATURED_LIST_LOADING: {
            return {
                ...state,
                featuredListing: {
                    ...state.featuredListing,
                    data: [],
                    loading: true,
                    error: false,
                    loaded: false,
                    success: false,
                }
            }
        }
        case InstituteListingActionTypes.IL_FEATURED_LIST_LOADED: {
            return {
                ...state,
                featuredListing: {
                    ...state.featuredListing,
                    data: payload,
                    loaded: true,
                    success: true,
                    error: false,
                    loading: false,
                }
            }
        }
        case InstituteListingActionTypes.IL_FEATURED_LIST_ERROR: {
            return {
                ...state,
                featuredListing: {
                    ...state.featuredListing,
                    loading: false,
                    loaded: false,
                    success: false,
                    error: true,
                }
            }
        }
        case InstituteListingActionTypes.IL_LIST_SEARCH_LOADING: {
            return {
                ...state,
                list: {
                    ...state.list,
                    data: [],
                    loading: true,
                    error: false,
                    loaded: false,
                    success: false,
                }
            }
        }
        case InstituteListingActionTypes.IL_LIST_SEARCH_LOADED: {
            return {
                ...state,
                list: {
                    ...state.list,
                    data: payload,
                    loaded: true,
                    success: true,
                    error: false,
                    loading: false,
                }
            }
        }
        case InstituteListingActionTypes.IL_LIST_SEARCH_ERROR: {
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    loaded: false,
                    success: false,
                    error: true,
                }
            }
        }

        case InstituteListingActionTypes.IL_LIST_REVERSE_LOADING: {
            return {
                ...state,
                listReverse: {
                    ...state.listReverse,
                    data: [],
                    loading: true,
                    error: false,
                    loaded: false,
                    success: false,
                }
            }
        }
        case InstituteListingActionTypes.IL_LIST_REVERSE_LOADED: {
            return {
                ...state,
                listReverse: {
                    ...state.listReverse,
                    data: payload,
                    loaded: true,
                    success: true,
                    error: false,
                    loading: false,
                }
            }
        }
        case InstituteListingActionTypes.IL_LIST_REVERSE_ERROR: {
            return {
                ...state,
                listReverse: {
                    ...state.listReverse,
                    loading: false,
                    loaded: false,
                    success: false,
                    error: true,
                }
            }
        }
        case InstituteListingActionTypes.IL_LIKED_LOADING: {
            return {
                ...state,
                list: {
                    ...state.listReverse,
                    data: [],
                    loading: true,
                    error: false,
                    loaded: false,
                    success: false,
                }
            }
        }
        case InstituteListingActionTypes.IL_LIKED_LOADED: {
            return {
                ...state,
                list: {
                    ...state.listReverse,
                    data: payload,
                    loaded: true,
                    success: true,
                    error: false,
                    loading: false,
                }
            }
        }
        case InstituteListingActionTypes.IL_LIKED_ERROR: {
            return {
                ...state,
                list: {
                    ...state.listReverse,
                    loading: false,
                    loaded: false,
                    success: false,
                    error: true,
                }
            }
        }
        case InstituteListingActionTypes.IL_MY_INS_LOADING: {
            return {
                ...state,
                list: {
                    ...state.listReverse,
                    data: [],
                    loading: true,
                    error: false,
                    loaded: false,
                    success: false,
                }
            }
        }
        case InstituteListingActionTypes.IL_MY_INS_LOADED: {
            return {
                ...state,
                list: {
                    ...state.listReverse,
                    data: payload,
                    loaded: true,
                    success: true,
                    error: false,
                    loading: false,
                }
            }
        }
        case InstituteListingActionTypes.IL_MY_INS_ERROR: {
            return {
                ...state,
                list: {
                    ...state.listReverse,
                    loading: false,
                    loaded: false,
                    success: false,
                    error: true,
                }
            }
        }
        case InstituteListingActionTypes.IL_LIKE_INFO_LOADING: {
            return {
                ...state,
                likeInfo: {
                    ...state.likeInfo,
                    loading: true,
                    loaded: false,
                    success: false,
                    error: false,
                }
            }
        }
        case InstituteListingActionTypes.IL_LIKE_INFO_LOADED: {
            return {
                ...state,
                likeInfo: {
                    ...state.likeInfo,
                    loading: false,
                    data: payload,
                    loaded: true,
                    success: false,
                    error: false,
                }
            }
        }
        case InstituteListingActionTypes.IL_LIKE_INFO_ERROR: {
            return {
                ...state,
                likeInfo: {
                    ...state.likeInfo,
                    loading: false,
                    loaded: false,
                    success: false,
                    error: true,
                }
            }
        }
        case InstituteListingActionTypes.IL_SINGLE_LIST_ERROR: {
            return {
                ...state,
                singleInstituteData: {
                    ...state.singleInstituteData,
                    loading: false,
                    loaded: false,
                    success: false,
                    error: true,
                }
            }
        }
        case InstituteListingActionTypes.IL_SINGLE_LIST_LOADED: {
            return {
                ...state,
                singleInstituteData: {
                    ...state.singleInstituteData,
                    loading: false,
                    data: payload,
                    loaded: true,
                    success: false,
                    error: false,
                },
                list: {
                    ...state.list,
                    data: {
                        ...state.list.data,
                        data: state.list.data.data.map((content) => content._id === payload._id ? {
                            ...content, totallike:
                                payload.totallike
                        }
                            : content),
                    },
                    loaded: true,
                    success: true,
                    error: false,
                    loading: false,
                }

            }
        }


        case InstituteListingActionTypes.IL_LIST_SCROLL_LOADING: {
            return {
                ...state,
                scrollData: {
                    ...state.scrollData,
                    loading: true,
                    loaded: false,
                    success: false,
                    error: false,
                }
            }
        }
        case InstituteListingActionTypes.IL_LIST_SCROLL_LOADED: {

            return {
                ...state,
                scrollData: {
                    ...state.scrollData,
                    loading: false,
                    data: payload,
                    success: true,
                    error: false,
                },
                list: {
                    ...state.list,
                    loading: false,
                    data: {
                        ...state.list.data,
                        data: state.list.data.data.concat(payload.data),
                    },
                    success: true,
                    error: false,
                }
            }
        }
        case InstituteListingActionTypes.IL_LIST_SCROLL_ERROR: {
            return {
                ...state,
                scrollData: {
                    ...state.scrollData,
                    loading: false,
                    loaded: false,
                    success: false,
                    error: true,
                }
            }
        }

        case InstituteListingActionTypes.IL_LIKE_ID: {
            return {
                ...state,
                likeData: {
                    ...state.likeData,
                    data: payload,
                    error: false,
                    success: true,
                },
                list: {
                    ...state.list,
                    data: {
                        ...state.list.data,
                        data: state.list.data.data.map(
                            (content) => content._id === payload.liked ? {
                                ...content, likestatus:
                                    !content.likestatus, totallike: payload.totallike
                            }
                                : content),
                    }
                }
            }
        }

        case InstituteListingActionTypes.IL_LIKE_ID_RESET: {
            return {
                ...state,
                likeData: {
                    ...state.likeData,
                    error: false,
                    success: false,
                },
            }
        }
        default:
            return state
    }
}

export default institutelisting;