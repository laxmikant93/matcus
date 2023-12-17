import {
  login,
  userDetail,
  requestAccess,
  autoSelectedRole,
  changepasswordPopup,
  ContactVerified,
  classroomID,
  courseID,
  privateDomainOpt,
  privateDomain,
  privateDomainTLDS,
  createPrivateDomainNewInstiute,
  registrationWorkDone,
  registerDetails,
  totalPriceValue,
  PaymentComplete,
  privateDomainOfflineFlow,
  privateDomainAddNewIns,
  privateDomainBookNew,
  privateDomainProceedToCheckout,
  userDetailSubdomain,
} from "../Constant/auth";
// import {classes_constant} from "../Constant/classes";
import Cookie from "./Cookies";
import Storage from "./Storage";
import SessionStorage from "./SessionStorage";
import AppLinkUrl from "../Common/AppLink/AppLinkUrl";
// import user from "../store/reducer/user";

class Auth {
  isLogin() {
    return Cookie.alive(login);
    //return Storage.alive(login);
  }
  isSubdomainLogin() {
    if (AppLinkUrl.subdomain()) {
      return Cookie.alive(AppLinkUrl.subdomain());
    } else {

    }

  }
  stepperIndustry(type) {
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
  setUserLogin(loggedInUserData, subdomain) {
    var UserData;
    if (!loggedInUserData.institute && !loggedInUserData.business) {
      UserData = {
        user_isEducator: loggedInUserData.data.isEducator,
        user_isStudent: loggedInUserData.data.isStudent,
        user_isVerified: loggedInUserData.data.isVerified,
        user_isSubscribed: loggedInUserData.data.isSubscribed,
        user_fullname: loggedInUserData.data.fullname,
        user_contact: loggedInUserData.data.contact,
        user_email: loggedInUserData.data.email,
        user_country_code: loggedInUserData.data.country_code,
        user_fulladdress: loggedInUserData.data.fulladdress,
        user_gender: loggedInUserData.data.gender,
        user_dob: loggedInUserData.data.dob,
        user_bloodGroup: loggedInUserData.data.bloodGroup,
        user_aadharNumber: loggedInUserData.data.aadharNumber,
        user_parent_name: loggedInUserData.data.parent_name,
        user_parent_occupation: loggedInUserData.data.parent_occupation,
        user_guardianName: loggedInUserData.data.guardianName,
        user_guardianOccupation: loggedInUserData.data.guardianOccupation,
        user_guardianRelation: loggedInUserData.data.guardianRelation,
        user_addressSecondary: loggedInUserData.data.addressSecondary,
        user_usertype: loggedInUserData.data.usertype,
        user_otherUserTypeName: loggedInUserData.data.otherUserTypeName,
        user_country: loggedInUserData.data.country,
        user_state: loggedInUserData.data.state,
        user_city: loggedInUserData.data.city,
        user_pincode: loggedInUserData.data.pincode,
        user_about: loggedInUserData.data.about,
        user_parent_contact: loggedInUserData.data.parent_contact,
        user_whatsapp_contact: loggedInUserData.data.whatsapp_contact,
        user_contact_verify: loggedInUserData.data.contact_verify,
        user_email_verify: loggedInUserData.data.email_verify,
        user_institute: "",
        user_institute_institute_name: "",
        user_institute_institute_address: "",
        user_institute_institute_subdomain: "",
        user_business_type: loggedInUserData.websiteType ? loggedInUserData.websiteType.type : "null",
        user_activeRole: loggedInUserData.data.activeRole,
        user_password_change: loggedInUserData.data.password_change,
        user_profile_picture: loggedInUserData.data.profile_picture,
        token: loggedInUserData.token_data.token,
        hash: loggedInUserData.token_data.hash,
        _id: loggedInUserData.data._id,
        user_username: loggedInUserData.data.username,
        user_role_access: loggedInUserData.user_role ? loggedInUserData.user_role.roleaccess : []
      };
    } else {
      if (loggedInUserData.institute._id) {
        UserData = {
          user_isEducator: loggedInUserData.data.isEducator,
          user_isStudent: loggedInUserData.data.isStudent,
          user_isVerified: loggedInUserData.data.isVerified,
          user_isSubscribed: loggedInUserData.data.isSubscribed,
          user_fullname: loggedInUserData.data.fullname,
          user_contact: loggedInUserData.data.contact,
          user_email: loggedInUserData.data.email,
          user_country_code: loggedInUserData.data.country_code,
          user_fulladdress: loggedInUserData.data.fulladdress,
          user_gender: loggedInUserData.data.gender,
          user_dob: loggedInUserData.data.dob,
          user_bloodGroup: loggedInUserData.data.bloodGroup,
          user_aadharNumber: loggedInUserData.data.aadharNumber,
          user_parent_name: loggedInUserData.data.parent_name,
          user_parent_occupation: loggedInUserData.data.parent_occupation,
          user_guardianName: loggedInUserData.data.guardianName,
          user_guardianOccupation: loggedInUserData.data.guardianOccupation,
          user_guardianRelation: loggedInUserData.data.guardianRelation,
          user_addressSecondary: loggedInUserData.data.addressSecondary,
          user_usertype: loggedInUserData.data.usertype,
          user_otherUserTypeName: loggedInUserData.data.otherUserTypeName,
          user_country: loggedInUserData.data.country,
          user_state: loggedInUserData.data.state,
          user_city: loggedInUserData.data.city,
          user_pincode: loggedInUserData.data.pincode,
          user_whatsapp_contact: loggedInUserData.data.whatsapp_contact,
          user_contact_verify: loggedInUserData.data.contact_verify,
          user_email_verify: loggedInUserData.data.email_verify,
          user_about: loggedInUserData.data.about,
          user_parent_contact: loggedInUserData.data.parent_contact,
          user_institute: loggedInUserData.institute._id,
          user_institute_institute_name:
            loggedInUserData.institute.institute_name,
          user_institute_institute_address:
            loggedInUserData.institute.institute_address,
          user_account_number:
            loggedInUserData.institute.account_number,
          user_account_type:
            loggedInUserData.institute.account_type,
          user_account_beneficiary_name:
            loggedInUserData.institute.account_beneficiary_name,
          user_razorpay_id:
            loggedInUserData.institute.razorpay_account_id,
          user_account_ifsc_code:
            loggedInUserData.institute.account_ifsc_code,
          user_sessionExit:
            loggedInUserData.institute.session ? loggedInUserData.institute.session.sessionExist : false,
          user_sessionFrom:
            loggedInUserData.institute.session ? loggedInUserData.institute.session.sessionFrom : false,
          user_sessionTo:
            loggedInUserData.institute.session ? loggedInUserData.institute.session.sessionTo : false,
          user_institute_institute_subdomain:
            loggedInUserData.institute.institute_subdomain,
          user_activeRole: loggedInUserData.data.activeRole,
          user_password_change: loggedInUserData.data.password_change,
          user_profile_picture: loggedInUserData.data.profile_picture,
          token: loggedInUserData.token_data.token,
          hash: loggedInUserData.token_data.hash,
          _id: loggedInUserData.data._id,
          user_business: loggedInUserData.institute._id,
          user_business_business_name:
            loggedInUserData.institute.institute_name,
          user_business_business_address:
            loggedInUserData.institute.institute_address,
          user_username: loggedInUserData.data.username,
          user_business_type: loggedInUserData?.websiteType ? loggedInUserData?.websiteType?.type : "LMS",
          user_role_access: loggedInUserData.user_role ? loggedInUserData.user_role.roleaccess : [],
          user_institute_isOld: loggedInUserData.institute.isOld ? loggedInUserData.institute.isOld : false,
          user_dashboard_stepper: loggedInUserData.DashboardStepper ? loggedInUserData.DashboardStepper : this.stepperIndustry(loggedInUserData?.websiteType?.type?loggedInUserData?.websiteType?.type:"LMS"),
          user_signup_method: loggedInUserData.data.signup_method ? loggedInUserData.data.signup_method : "Contact"
        };
      } else {
        console.log("line 221")
        UserData = {
          user_isEducator: loggedInUserData.data.isEducator,
          user_isStudent: loggedInUserData.data.isStudent,
          user_isVerified: loggedInUserData.data.isVerified,
          user_isSubscribed: loggedInUserData.data.isSubscribed,
          user_fullname: loggedInUserData.data.fullname,
          user_contact: loggedInUserData.data.contact,
          user_email: loggedInUserData.data.email,
          user_country_code: loggedInUserData.data.country_code,
          user_fulladdress: loggedInUserData.data.fulladdress,
          user_gender: loggedInUserData.data.gender,
          user_dob: loggedInUserData.data.dob,
          user_bloodGroup: loggedInUserData.data.bloodGroup,
          user_aadharNumber: loggedInUserData.data.aadharNumber,
          user_parent_name: loggedInUserData.data.parent_name,
          user_parent_occupation: loggedInUserData.data.parent_occupation,
          user_guardianName: loggedInUserData.data.guardianName,
          user_guardianOccupation: loggedInUserData.data.guardianOccupation,
          user_guardianRelation: loggedInUserData.data.guardianRelation,
          user_addressSecondary: loggedInUserData.data.addressSecondary,
          user_usertype: loggedInUserData.data.usertype,
          user_otherUserTypeName: loggedInUserData.data.otherUserTypeName,
          user_country: loggedInUserData.data.country,
          user_state: loggedInUserData.data.state,
          user_city: loggedInUserData.data.city,
          user_pincode: loggedInUserData.data.pincode,
          user_whatsapp_contact: loggedInUserData.data.whatsapp_contact,
          user_contact_verify: loggedInUserData.data.contact_verify,
          user_email_verify: loggedInUserData.data.email_verify,
          user_about: loggedInUserData.data.about,
          user_parent_contact: loggedInUserData.data.parent_contact,
          user_institute: loggedInUserData.business._id,
          user_institute_institute_name:
            loggedInUserData.business.business_name,
          user_institute_institute_address:
            loggedInUserData.business.business_address,
          user_account_number:
            loggedInUserData.business.account_number,
          user_account_type:
            loggedInUserData.business.account_type,
          user_account_beneficiary_name:
            loggedInUserData.business.account_beneficiary_name,
          user_razorpay_id:
            loggedInUserData.business.razorpay_acount_id,
          user_account_ifsc_code:
            loggedInUserData.business.account_ifsc_code,
          user_sessionExit:
            loggedInUserData.institute.session ? loggedInUserData.institute.session.sessionExist : false,
          user_sessionFrom:
            loggedInUserData.institute.session ? loggedInUserData.institute.session.sessionFrom : false,
          user_sessionTo:
            loggedInUserData.institute.session ? loggedInUserData.institute.session.sessionTo : false,
          user_institute_institute_subdomain:
            loggedInUserData.business.business_subdomain,
          user_activeRole: loggedInUserData.data.activeRole,
          user_password_change: loggedInUserData.data.password_change,
          user_profile_picture: loggedInUserData.data.profile_picture,
          token: loggedInUserData.token_data.token,
          hash: loggedInUserData.token_data.hash,
          _id: loggedInUserData.data._id,
          user_business: loggedInUserData.data.business,
          user_business_business_name:
            loggedInUserData.business.business_name,
          user_business_business_address:
            loggedInUserData.business.business_address,
          user_username: loggedInUserData.data.username,
          user_business_type: loggedInUserData.websiteType ? loggedInUserData.websiteType.type : "null",
          user_role_access: loggedInUserData.user_role ? loggedInUserData.user_role.roleaccess : [],
          user_business_business_shop_category: loggedInUserData.business?.business_shop_category ? loggedInUserData.business.business_shop_category : [],
          user_institute_isOld: loggedInUserData.institute.isOld ? loggedInUserData.institute.isOld : false,
          user_dashboard_stepper: loggedInUserData.DashboardStepper ? loggedInUserData.DashboardStepper : this.stepperIndustry(loggedInUserData.websiteType.type),
          user_signup_method: loggedInUserData.data.signup_method ? loggedInUserData.data.signup_method : "Contact"
        };
      }
    }
    if (subdomain) {
      Cookie.set(AppLinkUrl.subdomain(), UserData, Cookie.cokConfig.type.json);
      this.setSubdomainLogin();
    } else {
      console.log("line 292",UserData)
      Cookie.set(userDetail, UserData, Cookie.cokConfig.type.json);
      this.setLogin();
    }

  }

  setRegister() {
    Cookie.set(requestAccess, true, Cookie.cokConfig.type.bool);
  }

  setLogin() {
    Storage.setBool(login, true);
    Cookie.set(login, true, Cookie.cokConfig.type.bool);
  }
  setSubdomainLogin() {
    Storage.setBool(`${AppLinkUrl.subdomain()}Login`, true);
    Cookie.set(`${AppLinkUrl.subdomain()}Login`, true, Cookie.cokConfig.type.bool);
  }

  user() {
    //return Storage.alive(userDetail)?Storage.getJson(userDetail):{};
    return Cookie.has(userDetail)
      ? Cookie.get(userDetail, Cookie.cokConfig.type.json)
      : {};
  }
  subdomainUser() {
    // console.log("line 246")
    // console.log("line 246", Cookie.has(AppLinkUrl.subdomain()))
    if (Cookie.has(AppLinkUrl.subdomain())) {
      // console.log(Cookie.get(AppLinkUrl.subdomain()), "line cookies get")
    }
    //return Storage.alive(userDetail)?Storage.getJson(userDetail):{};

    return Cookie.has(AppLinkUrl.subdomain())
      ? Cookie.get(AppLinkUrl.subdomain(), Cookie.cokConfig.type.json)
      : {};
  }

  logout() {
    Cookie.remove(login);
    Cookie.remove(AppLinkUrl.subdomain());
    Cookie.remove(userDetail);
    Cookie.remove(userDetailSubdomain);
    Cookie.remove(createPrivateDomainNewInstiute);
    // Cookie.remove(classes_constant.token);
    Storage.remove(login);
    Storage.remove(AppLinkUrl.subdomain());
    Storage.remove(changepasswordPopup);
    Storage.remove(ContactVerified);
    Storage.remove(classroomID);
    Storage.remove(courseID);
    Storage.remove("SwitchOnlineClasses");
    //Storage.remove(userDetail);
    SessionStorage.remove(privateDomainOpt);
    SessionStorage.remove(privateDomain);
    SessionStorage.remove(privateDomainTLDS);
    SessionStorage.remove(createPrivateDomainNewInstiute);
    SessionStorage.remove(registrationWorkDone);
    SessionStorage.remove(registerDetails);
    SessionStorage.remove(totalPriceValue);
    SessionStorage.remove(PaymentComplete);
    SessionStorage.remove(privateDomainOfflineFlow);
    SessionStorage.remove(privateDomainAddNewIns);
    SessionStorage.remove(privateDomainBookNew);
    SessionStorage.remove(privateDomainProceedToCheckout);
    SessionStorage.remove("UserRegistration");
    SessionStorage.remove("RegisterInstitiute");
    SessionStorage.remove("subdomain");
    Storage.remove("__wz_user__details_verify__");
  }

  subdomainlogout() {
    Cookie.remove(AppLinkUrl.subdomain());
    Storage.remove(AppLinkUrl.subdomain());
    SessionStorage.remove("subdomain");
    Storage.remove("__wz_user__details_verify__");
  }

  token() {
    return this.user().token ? this.user().token : "";
  }
  hash() {
    return this.user().hash ? this.user().hash : "";
  }
  subdomainToken() {
    return this.subdomainUser().token ? this.subdomainUser().token : "";
  }

  reLogin() {
    if (Cookie.has(userDetail)) {
      //Storage.setJson(userDetail,Cookie.get(userDetail, Cookie.cokConfig.type.json));
      //Storage.setBool(login, true);
    }
  }

  updateUserDetail(userProperty, userPropertyValue) {
    // let authUserDetail =  Storage.getJson(userDetail);
    let authUserDetail = Cookie.get(userDetail, Cookie.cokConfig.type.json);
    let userDetailToUpdate = {
      ...authUserDetail,
      [userProperty]: userPropertyValue,
    };
    //Storage.setJson(userDetail, userDetailToUpdate)

    Cookie.update(userDetail, userDetailToUpdate, Cookie.cokConfig.type.json);
  }


  updateSubdomainuserDetail(userProperty, userPropertyValue) {
    let authUserDetail = Cookie.get((AppLinkUrl.subdomain()), Cookie.cokConfig.type.json);
    let userDetailToUpdate = {
      ...authUserDetail,
      [userProperty]: userPropertyValue,
    };
    Cookie.update((AppLinkUrl.subdomain()), userDetailToUpdate, Cookie.cokConfig.type.json);
  }

  updateUserDetailBulk(userdata) {
    // let authUserDetail =  Storage.getJson(userDetail);
    let authUserDetail = Cookie.get(userDetail, Cookie.cokConfig.type.json);
    let userDetailToUpdate = {
      ...authUserDetail,
      ...userdata,
    };
    //Storage.setJson(userDetail, userDetailToUpdate)
    Cookie.update(userDetail, userDetailToUpdate, Cookie.cokConfig.type.json);
  }

  // With Cookies
  changeRole = (updatedRole) => {
    let authUserDetail = Cookie.get(userDetail, Cookie.cokConfig.type.json);
    let userDetailToUpdate = {
      ...authUserDetail,
      ...updatedRole,
    };
    Storage.remove("heading");
    Cookie.update(userDetail, userDetailToUpdate, Cookie.cokConfig.type.json);
    document.dispatchEvent(new Event("RoleChanged"));

  };

  // With Local Storage
  // changeRole = updatedRole => {
  //     // window.dispatchEvent( new Event('storage') );
  //     // Storage.remove(autoSelectedRole);

  //     Storage.setJson(autoSelectedRole, updatedRole)
  //     setTimeout(()=>{
  //         document.dispatchEvent(new Event('RoleChanged'))
  //     }, 300)

  // }

  rbacToken = () => {
    const userTokenDetail = Storage.alive(autoSelectedRole)
      ? Storage.getJson(autoSelectedRole)
      : this.user();
    return {
      rbac: userTokenDetail.user_defaultRole,
      rbacid: userTokenDetail.rbacid,
    };
  };
}

export default new Auth();
