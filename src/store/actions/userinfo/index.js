import { USERINFOTYPES } from "./actionType";
import { setCommonError } from "../commonerror";
import UserInfoRequest from "./UserInfoRequest";
import { USER_INFO_LIST_AT } from "./actionType";
// import {Userid} from '../../../Common/UserElement/index';

export const getUserInfo = (id) => {
  return (dispatch) => {
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.UserInfoList.replace("__id__", id),
      // UserInfoRequest.get(UserInfoRequest.UserInfoList.replace('__id__',id),

      (success) => {
        dispatch({
          type: USER_INFO_LIST_AT.USER_INFO_LIST,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const editUserInfo = (id, data) => {
  return (dispatch) => {
    UserInfoRequest.patch(
      UserInfoRequest.userinforequest.UserInfoListEdit.replace("__id__", id),
      data,
      (success) => {
        dispatch({
          type: USER_INFO_LIST_AT.USER_INFO_EDIT,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getUserInfoData = () => {
  return (dispatch) => {
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.userInfo,
      (success) => {
        dispatch({
          type: USERINFOTYPES.GET_USER_INFO,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// export const getUserInfo = () => {
//   return dispatch => {
//       // dispatch({
//       //         type: USER_INFO_LIST_AT.USER_INFO_LIST,
//       //         payload:{}
//       // })

//       UserInfoRequest.get(UserInfoRequest.userinforequest.UserInfoList, (success)=>{

//           dispatch({
//               type: USER_INFO_LIST_AT.USER_INFO_LIST,
//               payload:success.data.data
//           })
//       },
//       error => {
//           dispatch(setCommonError(error.message))
//       }
//       );
//   }
// }

export const postUserInfoData = (data) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.POST_USER_INFO,
      payload: {},
    });

    UserInfoRequest.post(
      UserInfoRequest.userinforequest.userInfo,
      data,
      (success) => {

        dispatch({
          type: USERINFOTYPES.POST_USER_INFO,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteUserInfoData = (id) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.DELETE_USER_INFO,
      payload: {},
    });

    UserInfoRequest.delete(
      UserInfoRequest.userinforequest.deleteUserInfo.replace("__UserId__", id),
      (success) => {

        dispatch({
          type: USERINFOTYPES.DELETE_USER_INFO,
          payload: success.data.data.id,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getinstituteUsersInfo = (id, role) => {
  return (dispatch) => {
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.instituteUsersInfo
        .replace("__INS_ID__", id)
        .replace("__Role__", role),
      (success) => {
        dispatch({
          type: USERINFOTYPES.GET_USER_INFO,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const editUserInfoData = (id, data) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.UPDATE_USER_INFO,
      payload: {},
    });

    UserInfoRequest.patch(
      UserInfoRequest.userinforequest.updateUserInfo.replace("__UserId__", id),
      data,
      (success) => {

        dispatch({
          type: USERINFOTYPES.UPDATE_USER_INFO,
          payload: success.data.data.id,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const selectUserInfoToUpdate = (galleryId) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.USER_INFO_SELECTION,
      payload: galleryId,
    });
  };
};
