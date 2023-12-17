import Auth from "../../../Classes/Auth"
import { setCommonError } from "../commonerror"
import { USER_DETAIL_POPUP } from "./actionType"
import UserDetailPopupRequest from "./UserDetailPopupListRequest"
import { showSuccessPopup } from "../successmessagepopup"

export const GetUserDetailPopup = (id, industry) => {
  return dispatch => {
    dispatch({
      type: USER_DETAIL_POPUP.GET_USER_LOADING,
      payload: [],
    })
    UserDetailPopupRequest.get(UserDetailPopupRequest.UserDetailPopupEndpoint.userDetails.replace("__ID__", id).replace("_INSDUSTRY_", industry),
      (success) => {
        dispatch({
          type: USER_DETAIL_POPUP.GET_USER_LOADED,
          payload: success.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: USER_DETAIL_POPUP.GET_USER_ERROR,
          payload: []
        })
      })
  }
}

export const PostUserDetailPopup = (id, data, industry) => {
  

  return dispatch => {
    dispatch({
      type: USER_DETAIL_POPUP.POST_USER_LOADING,
      payload: [],
    })
    UserDetailPopupRequest.patch(UserDetailPopupRequest.UserDetailPopupEndpoint.userDetails.replace("__ID__", id).replace("_INSDUSTRY_", industry), data,
      (success) => {
       
        dispatch({
          type: USER_DETAIL_POPUP.POST_USER_LOADED,
          payload: success.data
        })

        Auth.updateUserDetail("user_profile_picture", success.data.profile_picture)
        Auth.updateUserDetail("user_dob", success.data.dob)
        Auth.updateUserDetail("user_gender", success.data.gender)
        Auth.updateUserDetail("user_blood_group", success.data.blood_group)
        Auth.updateUserDetail("user_aadhar_number", success.data.aadhar_number)
        Auth.updateUserDetail("user_father_name", success.data.father_name)
        Auth.updateUserDetail("user_father_occupation", success.data.father_occupation)
        Auth.updateUserDetail("user_mother_name", success.data.mother_name)
        Auth.updateUserDetail("user_mother_occupation", success.data.mother_occupation)
        Auth.updateUserDetail("user_permanent_address", success.data.permanent_address)
        Auth.updateUserDetail("user_temporary_address", success.data.temporary_address)
        Auth.updateUserDetail("user_user_country", success.data.user_country)
        Auth.updateUserDetail("user_user_state", success.data.user_state)
        Auth.updateUserDetail("user_user_city", success.data.user_city)
        Auth.updateUserDetail("user_user_zipcode", success.data.user_zipcode)
        Auth.updateUserDetail("user_guardian_name", success.data.guardian_name)
        Auth.updateUserDetail("user_guardian_occupation", success.data.guardian_occupation)
        Auth.updateUserDetail("user_releation_with_guardian", success.data.releation_with_guardian)

      },


      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: USER_DETAIL_POPUP.POST_USER_ERROR,
          payload: []
        })

      })
  }
}
export const resetPostUserDetail = () => {
  return (dispatch) => {
    dispatch({
      type: USER_DETAIL_POPUP.POST_USER_RESET
    })
  }
}

export const GetUserBasicDetailPopup = (id, industry) => {
  return dispatch => {
    dispatch({
      type: USER_DETAIL_POPUP.GET_USER_BASIC_LOADING,
      payload: [],
    })
    UserDetailPopupRequest.get(UserDetailPopupRequest.UserDetailPopupEndpoint.userDetails.replace("__ID__", id).replace("_INSDUSTRY_", industry),
      (success) => {
        dispatch({
          type: USER_DETAIL_POPUP.GET_USER_BASIC_LOADED,
          payload: success.data
        })
      },
      // capf

      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: USER_DETAIL_POPUP.GET_USER_BASIC_ERROR,
          payload: []
        })
      })
  }
}

export const UpdateUserBasicDetailPopup = (id, data, industry) => {
  return dispatch => {
    dispatch({
      type: USER_DETAIL_POPUP.POST_USER_BASIC_LOADING,
      payload: [],
    })
    UserDetailPopupRequest.patch(UserDetailPopupRequest.UserDetailPopupEndpoint.userDetails.replace("__ID__", id).replace("_INSDUSTRY_", industry), data,
      (success) => {
        dispatch({
          type: USER_DETAIL_POPUP.POST_USER_BASIC_LOADED,
          payload: success.data
        })
        dispatch(showSuccessPopup("Updated Successfully..!!"))
      },
      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: USER_DETAIL_POPUP.POST_USER_BASIC_ERROR,
          payload: []
        })
      })
  }
}
