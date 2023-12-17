import { HOLIDAYTYPES } from "../actions/holidayCalender/actionType"

const HOLIDAY_INITIAL_TYPES = {
    postHoliday: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    holidayList: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    getSingleHoliday: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    editHoliday: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    deleteHoliday: {
        data: [],
        loading: false,
        success: false,
        error: false,
    }

}

const holidayCalendar = (state = HOLIDAY_INITIAL_TYPES, { type, payload }) => {

    switch (type) {
        case HOLIDAYTYPES.CREATE_HOLIDAY_LOADING: {
            return ({
                ...state,
                postHoliday: {
                    ...state.postHoliday,
                    data: payload,
                    loading: true,
                    error: false,
                    success: false,
                }
            })
        }
        case HOLIDAYTYPES.CREATE_HOLIDAY_LOADED: {
            return ({
                ...state,
                postHoliday: {
                    ...state.postHoliday,
                    data: payload,
                    loading: false,
                    error: false,
                    success: true,
                }
            })
        }
        case HOLIDAYTYPES.CREATE_HOLIDAY_RESET: {
            return ({
                ...state,
                postHoliday: {
                    ...state.postHoliday,
                    data: [],
                    loading: false,
                    error: false,
                    success: false,
                }
            })
        }
        case HOLIDAYTYPES.GET_HOLIDAY_LIST_LOADING: {
            return ({
                ...state,
                holidayList: {
                    ...state.holidayList,
                    data: [],
                    loading: true,
                    error: false,
                    success: false,
                }
            })
        }
        case HOLIDAYTYPES.GET_HOLIDAY_LIST_LOADED: {
            return ({
                ...state,
                holidayList: {
                    ...state.holidayList,
                    data: payload,
                    loading: false,
                    error: false,
                    success: true,
                }
            })
        }
        case HOLIDAYTYPES.GET_HOLIDAY_LIST_RESET: {
            return ({
                ...state,
                holidayList: {
                    ...state.holidayList,
                    data: [],
                    loading: false,
                    error: false,
                    success: false,
                }
            })
        }
        case HOLIDAYTYPES.EDIT_HOLIDAY_LOADING: {
            return ({
                ...state,
                editHoliday: {
                    ...state.editHoliday,
                    data: [],
                    loading: true,
                    error: false,
                    success: false,
                }
            })
        }
        case HOLIDAYTYPES.EDIT_HOLIDAY_LOADED: {
            return ({
                ...state,
                editHoliday: {
                    ...state.editHoliday,
                    data: payload,
                    loading: false,
                    error: false,
                    success: true,
                },
                //  holidayList: {
                //     ...state.holidayList,
                //     data: state.holidayList.data.map((content) =>
                //         content.month === payload.month     
                //           ? 
                //             content.holidayData.map((updatedDetails)=>
                //                 updatedDetails._id===payload._id 
                //                 ?
                //  {
                //              ...content,

                //  }              
                //                 : updatedDetails
                //             )
                //           :content
                //       ),
                //     loading: false,
                //     error: false,
                //     success: true,
                // }
                holidayList: {
                    ...state.holidayList,
                    data: state.holidayList.data.map((item) => {
                        return item.month === payload.month ?
                            {
                                ...item,
                                holidayData: item.holidayData.map((data) => {
                                    return data._id === payload._id ? payload.successData : data
                                })
                            } : item
                    })
                }
            })
        }
        case HOLIDAYTYPES.EDIT_HOLIDAY_RESET: {
            return ({
                ...state,
                editHoliday: {
                    ...state.editHoliday,
                    data: [],
                    loading: false,
                    error: false,
                    success: false,
                }
            })
        }
        case HOLIDAYTYPES.GET_SINGLE_HOLIDAY_LOADING: {
            return ({
                ...state,
                getSingleHoliday: {
                    ...state.getSingleHoliday,
                    data: [],
                    loading: true,
                    error: false,
                    success: false,
                }
            })
        }
        case HOLIDAYTYPES.GET_SINGLE_HOLIDAY_SUCCESS: {
            return ({
                ...state,
                getSingleHoliday: {
                    ...state.getSingleHoliday,
                    data: payload,
                    loading: false,
                    error: false,
                    success: true,
                }
            })
        }
        case HOLIDAYTYPES.GET_SINGLE_HOLIDAY_RESET: {
            return ({
                ...state,
                getSingleHoliday: {
                    ...state.getSingleHoliday,
                    data: [],
                    loading: false,
                    error: false,
                    success: false,
                }
            })
        }

        case HOLIDAYTYPES.DELETE_HOLIDAY_LOADING: {
            return ({
                ...state,
                deleteHoliday: {
                    ...state.deleteHoliday,
                    data: [],
                    loading: true,
                    error: false,
                    success: false,
                }
            })
        }
        case HOLIDAYTYPES.DELETE_HOLIDAY_SUCCESS: {
            return ({
                ...state,
                deleteHoliday: {
                    ...state.deleteHoliday,
                    data: payload,
                    loading: false,
                    error: false,
                    success: true,
                }, holidayList: {
                    ...state.holidayList,
                    data: state.holidayList.data.map((content) => {
                        return {
                            month: content.month,
                            holidayData: content.holidayData.filter((i) => i._id !== payload._id)
                        }
                    }),
                    loading: false,
                    error: false,
                    success: true,
                }
            })
        }
        case HOLIDAYTYPES.DELETE_HOLIDAY_RESET: {
            return ({
                ...state,
                deleteHoliday: {
                    ...state.deleteHoliday,
                    data: [],
                    loading: false,
                    error: false,
                    success: false,
                }
            })
        }
        case HOLIDAYTYPES.SEARCH_SORT_HOLIDAY: {
            return ({
                ...state,
                holidayList: {
                    ...state.holidayList,
                    data: payload,
                    loading: false,
                    error: false,
                    success: true,
                }
            })
        }
        case HOLIDAYTYPES.CLASSROOM_FILTER_HOLIDAY: {
            return ({
                ...state,
                holidayList: {
                    ...state.holidayList,
                    data: payload,
                    loading: false,
                    error: false,
                    success: true,
                }
            })
        }
        // case AdminCourseActionTypes.ADMIN_COURSE_RESET_MAIN:
        //     return (ADMIN_COURSE_INITIAL_STATE)
        default:
            return state
    }
}
export default holidayCalendar;