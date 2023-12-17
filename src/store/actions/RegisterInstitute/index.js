import REGISTER_INSTITUTE_TYPE from "./ActionType";
import RegisterInstituteRequest from "./RegisterInstituteRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { updateUserInstituteInfo, updateCreateInstituteInfoNew, setUserActiveRoleUpdate } from "../user";
import { updateUserActiveRole } from "../userRole";
import Auth from "../../../Classes/Auth";


export const postInstituteDataOffline = (data) => {
  return (dispatch) => {
    RegisterInstituteRequest.post(
      RegisterInstituteRequest.request.postInstituteOffline,
      data,
      (success) => {
        dispatch({ type: REGISTER_INSTITUTE_TYPE.POST_INSTITUTE_OFFLINE, payload: success.data })
        dispatch(showSuccessPopup("Registered Successfully!"))
      },
      (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  };
};

let ActiveRole = process.env.REACT_APP_PAGE_OWNER
export const postInstituteDataOnline = (data) => {
  return dispatch => {
    RegisterInstituteRequest.post(
      RegisterInstituteRequest.request.postInstituteOnline,
      data,
      (success) => {
        let updatedRole = {
          user_activeRole: ActiveRole,
          user_institute: success.data._id,
          user_institute_institute_name: success.data.institute_name,
          user_institute_institute_address: success.data.institute_address,
          user_institute_institute_subdomain: success.data.institute_subdomain ? success.data.institute_subdomain : false

        };
        dispatch({ type: REGISTER_INSTITUTE_TYPE.POST_INSTITUTE_ONLINE, payload: success })
        dispatch(updateUserInstituteInfo(success.data.institute_subdomain))
        dispatch(updateCreateInstituteInfoNew(success.data._id, success.data.institute_name, success.data.institute_address))
        // dispatch(updateUserActiveRole({ activeRole: ActiveRole, institute: success.data._id, user: success.data.owner }));
        dispatch(setUserActiveRoleUpdate(ActiveRole))
        Auth.changeRole(updatedRole);
        dispatch(showSuccessPopup("Registered Successfully!"))

        // window.location.reload()
      },
      (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  };
};

