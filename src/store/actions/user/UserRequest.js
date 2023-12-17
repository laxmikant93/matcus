import Request from "../../../Classes/Request";
import AppLinkUrl from "../../../Common/AppLink/AppLinkUrl";

class UserRequest extends Request {
  constructor() {
    super();
    this.userrequest = {
      checkDomain: super.url("/institute?institute_subdomain=__domain__"),
      endpoint: super.url("/authorization-middleware/login?type=login", "middleware"),
      EcomEndpoint: super.url(`/e-authorization/Privatelogin?subdomain=${AppLinkUrl.subdomain()}&type=private_domain_login`, "ecommerce"),
      servicesEndpoint: super.url(`/s-authorization/Privatelogin?subdomain=${AppLinkUrl.subdomain()}&type=private_domain_login`),
      usernamelogin: super.url("/authorization-middleware/login?type=username_login", "middleware"),
      EcomUsernamelogin: super.url(`/e-authorization/Privatelogin?subdomain=${AppLinkUrl.subdomain()}&type=username_login`, "ecommerce"),
      serviceUsernamelogin: super.url(`/s-authorization/Privatelogin?subdomain=${AppLinkUrl.subdomain()}&type=username_login`),

      privatedomainLogin: super.url("/authorization-middleware/login?type=private_domain_login", "middleware"),
      EcomPrivateDomainLogin: super.url(`/e-authorization/Privatelogin?domain=${AppLinkUrl.getHost()}&type=private_domain_login`, "ecommerce"),
      servicePrivateDomainLogin: super.url(`/s-authorization/Privatelogin?domain=${AppLinkUrl.getHost()}&type=private_domain_login`),

      emailVerificationCheck: super.url("/authManagement", "middleware"),
      googleLoginendpoint: super.url("/authorization-middleware/googleLogin?type=_type_", "middleware"),
      users: super.url("/user"),
      updateUser: super.url("/authorization-middleware/user/__UserId__?industry=_type_", "middleware"),
      updateDashboardStepper: super.url("/authService/DashboardStepperUpdate"),
      resendEmail: super.url("/authManagement"),
      userCheck: super.url("/authManagement"),
      otpregistration: super.url("authService/otpsignup"),
      UserInfoList: super.url("authorization-middleware/user?_id=__id__?industry=_type_", "middleware"),
      patchInstitute: super.url("/offlineregistration/__INS__"),
      getUser: super.url("/authorization-middleware/user/_ID_?industry=LMS", "middleware"),
      deleteUserAccount: super.url("/authorization-middleware/deleteaccount/__UserId__/_type_", "middleware"),
      deactivateUserAccount: super.url(""),
      changePassword: super.url("authorization-middleware/changepassword/__UserId__/_type_/_NEWPASSWORD_", "middleware"),
      tokenMiddlewareGet: super.url("authorization-middleware/tokenMiddlewareGet?id=__ID__", "middleware"),
    };
  }

  login(email, password, type, industry, onSuccess, onError) {
    const loginData =
      type === "email"
        ? {
          email: email,
          password: password,
        }
        : type === "username" ? {
          username: email,
          password: password,
        } : {
          strategy: "mobilepassword",
          mobile: email,
          password: password,
        };

    type === "email" ?
      <>
        {industry === "Ecommerce" ?
          this.post(this.userrequest.EcomEndpoint, loginData, onSuccess, onError)
          :
          industry === "Services" ?
            this.post(this.userrequest.servicesEndpoint, loginData, onSuccess, onError) :
            this.post(this.userrequest.endpoint, loginData, onSuccess, onError)
        }
      </>
      :
      <>
        {industry === "Ecommerce" ?
          this.post(this.userrequest.EcomUsernamelogin, loginData, onSuccess, onError)
          : industry === "Services" ?
            this.post(this.userrequest.serviceUsernamelogin, loginData, onSuccess, onError)
            :
            this.post(this.userrequest.usernamelogin, loginData, onSuccess, onError)
        }
      </>
  }
  PrivateDomainlogin(email, institute_domain, password, type, industry, onSuccess, onError) {
    const loginData =
      type === "email"
        ? {
          email,
          institute_domain: institute_domain,
          password: password,
        }
        : {
          strategy: "mobilepassword",
          mobile: email,
          institute_domain: institute_domain,
          password: password,
        };
    if (industry === "Ecommerce") {
      this.post(this.userrequest.EcomPrivateDomainLogin, loginData, onSuccess, onError);
    } else if (industry === "Services") {
      this.post(this.userrequest.servicePrivateDomainLogin, loginData, onSuccess, onError);
    } else {
      this.post(this.userrequest.privatedomainLogin, loginData, onSuccess, onError);
    }
  }
  EmailVerification(email, onSuccess, onError) {
    let loginData = {
      email: email,
      action: "checkEmailExist"
    }
    this.post(this.userrequest.emailVerificationCheck, loginData, onSuccess, onError);
  }

  Googlelogin(googleID, email, name, role, onSuccess, onError) {
    const loginData = {
      strategy: "google",
      googleID,
      email: email,
      name: name,
      usertype: role,
    };

    this.post(
      this.userrequest.googleLoginendpoint,
      loginData,
      onSuccess,
      onError
    );
  }

  InstituteGooglelogin(googleID, email, name, role, institute_domain, onSuccess, onError) {
    const loginData = {
      strategy: "google",
      googleID,
      email: email,
      name: name,
      usertype: role,
      institute_domain: institute_domain
    };

    this.post(
      this.userrequest.googleLoginendpoint.replace("_type_", "private_domain_googlelogin"),
      loginData,
      onSuccess,
      onError
    );
  }

  // login(username, password, type = "email", onSuccess, onError) {
  //   const loginData =
  //     type === "email"
  //       ? {
  //           username,
  //           password: password,
  //         }
  //       : {
  //           strategy: "mobilepassword",
  //           mobile: username,
  //           password: password,
  //         };
  //   this.post(this.userrequest.endpoint, loginData, onSuccess, onError);
  // }

  register(fullName, email, password, role, onSuccess, onError) {
    const createAccountData = {
      fullname: fullName,
      email: email,
      password: password,
      usertype: role,
    };
    this.post(this.userrequest.users, createAccountData, onSuccess, onError);
  }

  resendVerification(data, onSuccess, onError) {
    this.post(this.userrequest.resendEmail, data, onSuccess, onError);
  }
  userCheckData(contact, country_code, email, onSuccess, onError) {
    const checkEmailData = {
      country_code: country_code,
      contact: contact,
      email: email,
      action: "checkemail",
    };
    this.post(this.userrequest.userCheck, checkEmailData, onSuccess, onError);
  }
  signupInfoCheck(contact, country_code, email, onSuccess, onError) {
    const checkEmailData = {
      country_code: country_code,
      contact: contact,
      email: email,
      action: "subdomainSignup",
    };
    this.post(this.userrequest.userCheck, checkEmailData, onSuccess, onError);
  }
  checkDomain(domain, onSuccess, onError) {
    // const checkDomainData = {
    //   domain:domain,
    // }
    this.get(
      this.userrequest.checkDomain.replace("__domain__", domain),
      onSuccess,
      onError
    );
  }
  institutePatch(insId, data, onSuccess, onError) {
    this.patch(
      this.userrequest.patchInstitute.replace("__INS__", insId), data,
      onSuccess,
      onError
    );
  }

  registrationByOtp = (data, onSuccess, onError) => {
    this.post(this.userrequest.otpregistration, data, onSuccess, onError);
  };

  getUserDetail = (id, industry, onSuccess, onError) => {
    this.get(this.userrequest.getUser.replace("_ID_", id).replace("_type_", industry),
      onSuccess,
      onError
    )
  }
  patchUserDetail = (id, data, onSuccess, onError) => {
    this.patch(this.userrequest.updateUser.replace("__UserId__", id),
      data,
      onSuccess,
      onError
    )
  }
  tokenMiddlewareGet = (id,onSuccess, onError) => {
    this.get(this.userrequest.tokenMiddlewareGet.replace("__ID__", id),
    onSuccess,
    onError
    )
  }
}

export default new UserRequest();
