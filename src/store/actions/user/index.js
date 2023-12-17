import Auth from "../../../Classes/Auth";
import { userActionType } from "./actionTypes";
import UserRequest from "./UserRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const changeHeaderProfilePhoto = (photoId) => {
  return (dispatch) => {
    dispatch({
      type: userActionType.CHANGE_USER_PHOTO_HEADER,
      payload: photoId,
    });
  };
};

export const changeUserInfo = (id, userdata, industry, settings) => {
  return (dispatch) => {
    UserRequest.patch(
      UserRequest.userrequest.updateUser.replace("__UserId__", id).replace("_type_", industry),
      userdata,
      (success) => {
        var obj = {};
        for (var keyValue in userdata) {
          obj["user_" + keyValue] = success.data[keyValue];
        }
        // console.log(obj, "line no 25");
        dispatch({
          type: userActionType.UPDATE_USER_INFO,
          payload: obj,
        });
        if (settings === true) {
          dispatch(showSuccessPopup("Account Details Upadted!"));
        }
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const DeleteUserInfo = (data, id, type, history) => {
  return (dispatch) => {
    UserRequest.post(
      UserRequest.userrequest.deleteUserAccount.replace("__UserId__", id).replace("_type_", type),
      data,
      (success) => {
        // console.log(success, "line no 48");
        setTimeout(() => {
          if (success.status === 200) {
            history('/auth/logout');
          }
        }, 200);
        dispatch(showSuccessPopup("Account deleted!"));
      },
      (error) => {
        // console.log(error, "line no 53");
        dispatch({
          type: userActionType.DELETE_ACCOUNT_ERROR,
          error: true,
        });
      }
    );
  }
}

export const DeleteUserInfoReset = () => {
  return (dispatch) => {
    dispatch({
      type: userActionType.DELETE_ACCOUNT_RESET,
      error: false,
    });
  }
}

export const ChangeUserPassword = (data, id, type, newpass) => {
  return (dispatch) => {
    UserRequest.post(
      UserRequest.userrequest.changePassword.replace("__UserId__", id)
        .replace("_type_", type).replace("_NEWPASSWORD_", newpass),
      data,
      (success) => {
        dispatch({
          type: userActionType.CHANGE_PASSWORD_LOADED,
          error: false,
          success: true
        });
        dispatch(showSuccessPopup("Password changed!"));
      },
      (error) => {
        dispatch({
          type: userActionType.CHANGE_PASSWORD_ERROR,
          error: true,
        });
      }
    );
  }
}

export const ChangeUserPasswordReset = () => {
  return (dispatch) => {
    dispatch({
      type: userActionType.CHANGE_PASSWORD_RESET,
      error: false,
    });
  }
}

export const DeactivateUserInfo = (data, id, type) => {
  return (dispatch) => {
    UserRequest.post(
      UserRequest.userrequest.deactivateUserAccount.replace("__UserId__", id).replace("_type_", type),
      data,
      (success) => {
        Auth.logout();
        dispatch(showSuccessPopup("Account deactivated successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  }
}

export const DashboardStepperAddTemplate = (data) => {
  return (dispatch) => {
    UserRequest.post(
      UserRequest.userrequest.updateDashboardStepper,
      data,
      (success) => {

      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getUserInfo = (id) => {
  return (dispatch) => {
    UserRequest.get(
      UserRequest.userrequest.UserInfoList.replace("__id__", id),
      // UserInfoRequest.get(UserInfoRequest.UserInfoList.replace('__id__',id),

      (success) => {
        dispatch({
          type: userActionType.USER__LIST,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const setLoginToStore = (loginData) => {
  return (dispatch) => {
    dispatch({
      type: userActionType.SET_USER_LOGIN,
      payload: loginData,
    });
  };
};
// export const setSubdomainLoginToStore = (loginData) => {
//   return (dispatch) => {
//     dispatch({
//       type: userActionType.SET_SUBDOMAIN_USER_LOGIN,
//       payload: loginData,
//     });
//   };
// };

export const setUserActiveRole = (roleInfo) => {
  return (dispatch) =>
    dispatch({
      type: userActionType.SET_USER_ACTIVE_ROLE,
      payload: roleInfo,
    });
};

export const updateCreateInstituteInfo = (institueid, institutename) => {
  Auth.updateUserDetail("user_institute", institueid);
  Auth.updateUserDetail("user_institute_institute_name", institutename);
  
  Auth.updateUserDetail("user_business", institueid);
  Auth.updateUserDetail("user_business_business_name", institutename);
  Auth.updateUserDetail("user_sessionExit", false);
  Auth.updateUserDetail("user_sessionFrom", false);
  Auth.updateUserDetail("user_sessionTo", false);
  Auth.updateUserDetail("user_account_number", false);
  Auth.updateUserDetail("user_account_type", false);
  Auth.updateUserDetail("user_account_beneficiary_name", false);
  Auth.updateUserDetail("user_account_ifsc_code", false);
  return (dispatch) => {
    dispatch({
      type: userActionType.SET_INSTITUTE_INFORMATION,
      payload: {
        user_institute: institueid,
        user_institute_institute_name: institutename,
      },
    });
  };
};

export const updateUpdatedInstituteInfo = (institute_data) => {
  Auth.updateUserDetail(
    "user_institute_institute_name",
    institute_data.institute_name
  );
  Auth.updateUserDetail(
    "user_institute_institute_address",
    institute_data.institute_address
  );
  Auth.updateUserDetail(
    "user_business_business_name",
    institute_data.institute_name
  );
  Auth.updateUserDetail(
    "user_business_business_address",
    institute_data.institute_address
  );
  return (dispatch) => {
    dispatch({
      type: userActionType.SET_INSTITUTE_INFORMATION,
      payload: {
        user_institute_institute_name: institute_data.institute_name,
        user_institute_institute_address: institute_data.institute_address,
        user_business_business_name: institute_data.business_name,
        user_business_business_address: institute_data.business_address,
      },
    });
  };
};

export const updateUserInstituteInfo = (institutsubdomain,type) => {
  Auth.updateUserDetail(
    "user_institute_isOld ",
    type?type:false
  );
  Auth.updateUserDetail(
    "user_institute_institute_subdomain",
    institutsubdomain
  );
  Auth.updateUserDetail(
    "user_business_business_subdomain",
    institutsubdomain
  );
  return (dispatch) => {
    dispatch({
      type: userActionType.SET_INSTITUTE_INFORMATION,
      payload: {
        user_institute_institute_subdomain: institutsubdomain,
        user_business_business_subdomain: institutsubdomain,
        user_institute_isOld: false,
      },
    });
  };
};

/////// After Role Switch Releases

export const setUserActiveRoleUpdate = (roleInfo) => {
  Auth.changeRole({ "user_activeRole": roleInfo })
  return (dispatch) =>
    dispatch({
      type: userActionType.SET_USER_ACTIVE_ROLE,
      payload: {
        user_activeRole: roleInfo,
      },
    });
};
let roleaccess = ["manage_website", "manage_study_material", "manage_student", "manage_teacher", "manage_classroom", "manage_visitor_management", "manage_attendance", "manage_fee_management", "manage_online_test", "manage_assignment", "manage_online_class", "manage_report_card", "manage_access_control", "manage_guard_management"]
export const updateCreateInstituteInfoNew = (
  institueid,
  institute_name,
  institute_address
) => {
  Auth.updateUserDetail("user_institute", institueid);
  Auth.updateUserDetail("user_institute_institute_name", institute_name);
  Auth.updateUserDetail("user_institute_institute_address", institute_address);
  Auth.updateUserDetail("user_role_access", roleaccess);
  Auth.updateUserDetail("user_business", institueid);
  Auth.updateUserDetail("user_business_business_name", institute_name);
  Auth.updateUserDetail("user_business_business_address", institute_address);
  Auth.updateUserDetail("user_role_access", roleaccess);
  return (dispatch) => {
    dispatch({
      type: userActionType.SET_INSTITUTE_INFORMATION,
      payload: {
        user_institute: institueid,
        user_institute_institute_name: institute_name,
        user_institute_institute_address: institute_address,
        user_role_access: roleaccess,
        user_business: institueid,
        user_business_business_name: institute_name,
        user_business_business_address: institute_address,
      },
    });
  };
};

export const updateBusinessType = (data, token, hash, user, email, contact) => {
  Auth.updateUserDetail("user_business_type", data);
  Auth.updateUserDetail("token", token);
  Auth.updateUserDetail("_id", user);
  Auth.updateUserDetail("hash", hash);
  return (dispatch) => {
    dispatch({
      type: userActionType.SET_USER_BUSINESS_TYPE,
      payload: {
        _id: user,
        user_business_type: data,
        token: token,
        hash: hash,
        user_email: email,
        user_email_verify: true,
        user_contact: contact,
        user_contact_verify: true,
        user_isVerified: true
      }
    })
  }
}
const stepperIndustry=(type)=> {
  switch (type) {
    case "LMS":
      return ({
        addBuisnessDetails: false,
        addEmail: false,
        addContact: false,
        addTemplate: false,
        addClassroom: false,
        addDomain: false
      })
    case "Ecommerce":

      return ({
        addBuisnessDetails: false,
        addEmail: false,
        addContact: false,
        addTemplate: false,
        addProduct: false,
        addDomain: false
      })
    case "Services":

      return ({
        addBuisnessDetails: false,
        addEmail: false,
        addContact: false,
        addTemplate: false,
        addService: false,
        addDomain: false
      })

    default:
      return ({
        addBuisnessDetails: false,
        addEmail: false,
        addContact: false,
        addTemplate: false,
        addClassroom: false,
        addDomain: false
      })
  }
}
export const updateDashboardStepper = (data,type) => {
  Auth.updateUserDetail("user_dashboard_stepper", data);
  return (dispatch) => {
    dispatch({
      type: userActionType.SET_USER_BUSINESS_TYPE,
      payload: {
        user_dashboard_stepper: data?data:stepperIndustry(type)
      }
    })
  }
}
export const updateEmailContactVerify = (data, stepper) => {
  if (data.contact) {
    Auth.updateUserDetail("user_contact", data.contact);
    Auth.updateUserDetail("user_country_code", data.country_code);
    Auth.updateUserDetail("user_contact_verify", data.contact_verify);
    Auth.updateUserDetail("user_email_verify", data.email_verify);
    let steup = {
      ...stepper, addEmail: true, addContact: true
    }
    Auth.updateUserDetail("user_dashboard_stepper", steup);
    return (dispatch) => {
      dispatch({
        type: userActionType.SET_USER_BUSINESS_TYPE,
        payload: {
          user_contact: data.contact,
          user_contact_verify: data.contact_verify,
          user_email_verify: data.email_verify,
          user_dashboard_stepper: steup
        }
      })
    }
  } else {
    Auth.updateUserDetail("user_email", data.email);
    Auth.updateUserDetail("user_contact_verify", data.contact_verify);
    Auth.updateUserDetail("user_email_verify", data.email_verify);
    let steup = {
      ...stepper, addEmail: true, addContact: true
    }
    Auth.updateUserDetail("user_dashboard_stepper", steup);
    return (dispatch) => {
      dispatch({
        type: userActionType.SET_USER_BUSINESS_TYPE,
        payload: {
          user_email: data.email,
          user_contact_verify: data.contact_verify,
          user_email_verify: data.email_verify,
          user_dashboard_stepper: steup
        }
      })
    }
  }
}