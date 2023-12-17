import { UserRoleType } from "./actionTypes";
import UserRequest from "./userRequest";
import Auth from "../../../Classes/Auth";
import { setUserActiveRole } from "../user";

import { setCommonError } from "../commonerror";

// get userrole
export const getUserRolePrivateDomain = (userId, institutueId) => {
  return (dispatch) => {
    UserRequest.get(
      UserRequest.request.userRolePrivateDomain
        .replace("__ID__", userId)
        .replace("__IID__", institutueId),
      (success) => {
        dispatch({
          type: UserRoleType.GET_USER_ROLE,
          payload: success.data,
        });
      },
      (error) => {
        setCommonError(error.message);
      }
    );
  };
};
export const getUserRole = (userId, websiteType) => {
  return (dispatch) => {
    UserRequest.get(
      UserRequest.request.userRole.replace("__ID__", userId).replace("__INDUSTRY__", websiteType),
      (success) => {
        dispatch({
          type: UserRoleType.GET_USER_ROLE,
          payload: success.data,
        });
      },
      (error) => {
        setCommonError(error.message);
      }
    );
  };
};
//

// user role
export const setDefaultUserRole = (roleData) => {
  const userroleUpdate = {
    isDefault: true,
  };

  const roleId = roleData._id;
  return (dispatch) => {
    UserRequest.patch(
      UserRequest.request.updateUserRole.replace("__USERROLEID__", roleId),
      userroleUpdate,
      (success) => {
        dispatch({
          type: UserRoleType.GET_USER,
          payload: success.data,
        });
      },
      (error) => {
        setCommonError(error.message);
      }
    );
  };
};
//

// userrole with id
export const updateUserActiveRole = (roleData) => {
  const userRoleData = {
    activeRole: roleData.role,
    institute: roleData.institute,
  };

  const userId = roleData.user;
  return (dispatch) => {
    UserRequest.patch(
      UserRequest.request.user.replace("__USERID__", userId),
      userRoleData,
      (success) => {
        dispatch({
          type: UserRoleType.GET_USER_WITH_ID,
          payload: success.data,
        });
      },
      (error) => {
        setCommonError(error.message);
      }
    );
  };
};
//

export const applyNewRole = (roleData) => {


  let updatedRole = {
    user_activeRole: roleData.role,
    user_institute: roleData.institute,
    user_institute_institute_name: roleData.institute_name,
    user_institute_institute_address: roleData.institute_address,
    user_account_number: roleData.account_number ? roleData.account_number : false,
    user_account_type: roleData.account_type ? roleData.account_type : false,
    user_account_beneficiary_name: roleData.account_beneficiary_name ? roleData.account_beneficiary_name : false,
    user_account_ifsc_code: roleData.account_ifsc_code ? roleData.account_ifsc_code : false,
    user_sessionExit: roleData.session && roleData.session.sessionExist ? roleData.session.sessionExist : false,
    user_sessionFrom: roleData.session && roleData.session.sessionFrom ? roleData.session.sessionFrom : false,
    user_sessionTo: roleData.session && roleData.session.sessionTo ? roleData.session.sessionTo : false,
    user_sessionFromDate: roleData.institute_session_sessionFromDate ? roleData.institute_session_sessionFromDate : false,
    user_sessionToDate: roleData.institute_session_sessionToDate ? roleData.institute_session_sessionToDate : false,
    user_institute_institute_subdomain: roleData.institute_subdomain ? roleData.institute_subdomain : false,
    user_role_access: roleData.roleaccess ? roleData.roleaccess : []
  };
  Auth.changeRole(updatedRole);
  return (dispatch) => {
    dispatch(setUserActiveRole(updatedRole));
  };
}

//
export const signupRole = (role) => {
  return (dispatch) => {
    dispatch({
      type: UserRoleType.GET_SIGNUP_ROLE,
      payload: role,
    });
  };
};
