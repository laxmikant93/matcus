// import { USER_BASIC_DETAIL_POPUP } from "../actions/UserDetailPopup/actionType";

// const USER_BASIC_DETAIL_POPUP_INITIAL_STATE = {
//   PostUserBasicDetail: {
//     data: [],
//     loading: false,
//     success: false,
//     error: false
//   },
//   GetUserBasicDetail: {
//     data: [],
//     loading: false,
//     success: false,
//     error: false,
//   },
// }
// const userDetail = (state = USER_BASIC_DETAIL_POPUP_INITIAL_STATE, { type, payload }) => {

//   switch (type) {
//     case USER_BASIC_DETAIL_POPUP.GET_USER_BASIC_LOADING: {
//       return {
//         ...state,
//         GetUserBasicDetail: {
//           ...state.GetUserBasicDetail,
//           data: [],
//           loading: true,
//           success: false,
//           error: false
//         }
//       }
//     }

//     case USER_BASIC_DETAIL_POPUP.GET_USER_BASIC_LOADED: {
//       return {
//         ...state,
//         GetUserBasicDetail: {
//           ...state.GetUserBasicDetail,
//           data: payload,
//           loading: false,
//           success: true,
//           error: false
//         }
//       }
//     }

//     case USER_BASIC_DETAIL_POPUP.GET_USER_BASIC_ERROR: {
//       return {
//         ...state,
//         GetUserBasicDetail: {
//           ...state.GetUserBasicDetail,
//           data: [],
//           loading: false,
//           success: false,
//           error: true
//         }
//       }
//     }

//     case USER_BASIC_DETAIL_POPUP.POST_USER_BASIC_LOADING: {
//       return {
//         ...state,
//         PostUserBasicDetail: {
//           ...state.PostUserBasicDetail,
//           data: [],
//           loading: true,
//           success: false,
//           error: false
//         }
//       }
//     }

//     case USER_BASIC_DETAIL_POPUP.POST_USER_BASIC_LOADED: {
//       return {
//         ...state,
//         PostUserBasicDetail: {
//           ...state.PostUserBasicDetail,
//           data: payload,
//           loading: false,
//           success: true,
//           error: false
//         }
//       }
//     }

//     case USER_BASIC_DETAIL_POPUP.POST_USER_BASIC_ERROR: {
//       return {
//         ...state,
//         PostUserBasicDetail: {
//           ...state.PostUserBasicDetail,
//           data: [],
//           loading: false,
//           success: false,
//           error: true
//         }
//       }
//     }
//     default:
//       return state
//   }
// }
// export default userDetail