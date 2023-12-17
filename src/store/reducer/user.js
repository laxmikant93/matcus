import Auth from "../../Classes/Auth";
import { userActionType } from "../actions/user/actionTypes";

const user = (state = Auth.user(), { type, payload }) => {
  switch (type) {
    case userActionType.CHANGE_USER_PHOTO_HEADER:
      Auth.updateUserDetail("user_profile_picture", payload);
      return {
        ...state,
        user_profile_picture: payload,
      };

    case userActionType.UPDATE_USER_INFO:
      Auth.updateUserDetailBulk(payload);
      return {
        ...state,
        ...payload,
      };

    // case userActionType.UPDATE_USER_INFO_FULADDRESS:
    //   Auth.updateUserDetailBulk(payload);

    //   return {
    //     ...state,
    //     ...payload, user_fulladress: payload
    //   };

    //   return {
    //     ...state,
    //     edit: {
    //         ...state.edit,
    //         data: {},
    //         success: true,
    //         loading: false,
    //         error: false,
    //     },
    //     list: {
    //         ...state.list,
    //         data: state.list.data.map(
    //             (content) => content._id === payload.editInfo ? {
    //                 ...content, title:
    //                     payload.editInfo_title, description: payload.editInfo_description,
    //                 isStatus: payload.editInfo_isStatus, thumbnail: payload.editInfo_thumbnail,
    //                 attachment: payload.editInfo_attachment, emailNotify: payload.emailNotify
    //             }
    //                 : content),

    //         success: true,
    //     }
    // }

    case userActionType.USER__LIST:
      Auth.updateUserDetailBulk(payload);
      return {
        ...state,
        ...payload,
      };

    case userActionType.DELETE_ACCOUNT_ERROR:
      return {
        ...state,
        error: true,
      }

    case userActionType.DELETE_ACCOUNT_RESET:
      return {
        ...state,
        error: false,
      }

    case userActionType.CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        error: true,
      }

    case userActionType.CHANGE_PASSWORD_LOADED:
      return {
        ...state,
        success: true,
        error: false
      }

    case userActionType.CHANGE_PASSWORD_RESET:
      return {
        ...state,
        error: false,
      }

    case userActionType.SET_USER_LOGIN:
      return {
        ...state,
        ...payload,
      };
    // case userActionType.SET_SUBDOMAIN_USER_LOGIN:
    //   return {
    //     ...state,
    //     ...payload,
    //   };

    case userActionType.SET_USER_ACTIVE_ROLE:
      return {
        ...state,
        ...payload,
      };

    case userActionType.SET_INSTITUTE_INFORMATION:
      return {
        ...state,
        ...payload,
      };

    case userActionType.SET_USER_BUSINESS_TYPE:
      return {
        ...state,
        ...payload,
      }

    default:
      return state;
  }
};

export default user;
