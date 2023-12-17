import { NOTICE_BOARD_ACTION_TYPES } from "../actions/NoticeBoard/actionType"
const NOTICE_INITIAL_TYPES = {
    postNotice:{
      data: [],
      loading: false,
      success: false,
      error: false,
    },
    noticeList: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    getSingleNotice:{
      data:[],
      loading:false,
      success: false,
      error: false,
    },
    editNotice:{
      data:[],
      loading:false,
      success: false,
      error: false,
    },
    deleteNotice:{
      data:[],
      loading:false,
      success: false,
      error: false,
    }
}
const noticeboard = (state = NOTICE_INITIAL_TYPES, { type, payload }) => {

    switch (type) {
        case NOTICE_BOARD_ACTION_TYPES.CREATE_NOTICE_LOADING:{
            return ({
                ...state,
                postNotice: {
                    ...state.postNotice,
                    data: payload,
                    loading: true,
                    error: false,
                    success: false,
                }
            })
        }
        case NOTICE_BOARD_ACTION_TYPES.CREATE_NOTICE_LOADED:{
          return ({
              ...state,
              postNotice: {
                  ...state.postNotice,
                  data: payload,
                  loading: false,
                  error: false,
                  success: true,
              },
              noticeList: {
                  ...state.noticeList,
                  data: state.noticeList.data.concat(payload),
                  loading: false,
                  error: false,
                  success: true,
              }
          })
      }
      case NOTICE_BOARD_ACTION_TYPES.CREATE_NOTICE_RESET:{
        return ({
            ...state,
            postNotice: {
                ...state.postNotice,
                data: [],
                loading: false,
                error: false,
                success: false,
            }
        })
    }
    case NOTICE_BOARD_ACTION_TYPES.GET_NOTICE_LIST_LOADING:{
      return ({
          ...state,
          noticeList: {
              ...state.noticeList,
              data: [],
              loading: true,
              error: false,
              success: false,
          }
      })
  }
  case NOTICE_BOARD_ACTION_TYPES.GET_NOTICE_LIST_LOADED:{
    return ({
        ...state,
        noticeList: {
            ...state.noticeList,
            data: payload,
            loading: false,
            error: false,
            success: true,
        }
    })
}
case NOTICE_BOARD_ACTION_TYPES.GET_NOTICE_LIST_RESET:{
  return ({
      ...state,
      noticeList: {
          ...state.noticeList,
          data: [],
          loading: false,
          error: false,
          success: false,
      }
  })
}
case NOTICE_BOARD_ACTION_TYPES.EDIT_NOTICE_LOADING:{
  return ({
      ...state,
      editNotice: {
          ...state.editNotice,
          data: [],
          loading: true,
          error: false,
          success: false,
      }
  })
}
case NOTICE_BOARD_ACTION_TYPES.EDIT_NOTICE_LOADED:{
return ({
    ...state,
    editNotice: {
        ...state.editNotice,
        data: payload,
        loading: false,
        error: false,
        success: true,
    },
 noticeList:{
        ...state.noticeList,
        data:state.noticeList.data.map((item)=> item._id===payload._id ?
           {
               ...item,title:payload.title, description: payload.description,
                            isStatus: payload.isStatus, thumbnail: payload.thumbnail,
                            attachment: payload.attachment, emailNotify: payload.emailNotify,
                            academe: payload.academe
            }
               :item),
               success:true,
          }
       })
    }
case NOTICE_BOARD_ACTION_TYPES.EDIT_NOTICE_RESET:{
return ({
  ...state,
  editNotice: {
      ...state.editNotice,
      data: [],
      loading: false,
      error: false,
      success: false,
  }
})
}
case NOTICE_BOARD_ACTION_TYPES.GET_SINGLE_NOTICE_LOADING:{
  return ({
      ...state,
      getSingleNotice: {
          ...state.getSingleNotice,
          data: [],
          loading: true,
          error: false,
          success: false,
      }
  })
}
case NOTICE_BOARD_ACTION_TYPES.GET_SINGLE_NOTICE_SUCCESS:{
return ({
    ...state,
    getSingleNotice: {
        ...state.getSingleNotice,
        data: payload,
        loading: false,
        error: false,
        success: true,
    }
})
}
case NOTICE_BOARD_ACTION_TYPES.GET_SINGLE_NOTICE_RESET:{
return ({
  ...state,
  getSingleNotice: {
      ...state.getSingleNotice,
      data: [],
      loading: false,
      error: false,
      success: false,
  }
})
}

case NOTICE_BOARD_ACTION_TYPES.DELETE_NOTICE_LOADING:{
  return ({
      ...state,
      deleteNotice: {
          ...state.deleteNotice,
          data: [],
          loading: true,
          error: false,
          success: false,
      }
  })
}
case NOTICE_BOARD_ACTION_TYPES.DELETE_NOTICE_SUCCESS:
     return ({
                ...state,
                deleteNotice: {
                    ...state.deleteNotice,
                    data: payload,
                    success: true,
                    loading: false,
                    error: false
                },

                noticeList: {
                    ...state.noticeList,
                    // data: state.noticelist.data.filter((item) => item._id !== payload._id),
                    data: state.noticeList.data.filter((item) => item._id !== payload),
                    success: true,
                }
            })
       
case NOTICE_BOARD_ACTION_TYPES.DELETE_NOTICE_RESET:{
return ({
  ...state,
  deleteNotice: {
      ...state.deleteNotice,
      data: [],
      loading: false,
      error: false,
      success: false,
  }
})
}
case NOTICE_BOARD_ACTION_TYPES.SEARCH_SORT_NOTICE:{
    return ({
      ...state,
      noticeList: {
          ...state.noticeList,
          data: payload,
          loading: false,
          error: false,
          success: true,
      }
    })
    }
    // case NOTICE_BOARD_ACTION_TYPES.CLASSROOM_FILTER_NOTICE:{
    //     return ({
    //       ...state,
    //       noticeList: {
    //           ...state.noticeList,
    //           data: payload,
    //           loading: false,
    //           error: false,
    //           success: true,
    //       }
    //     })
    //     }
         default:
            return state
    }
}
export default noticeboard;