import Request from "../../../Classes/Request";

class ForgotPassword extends Request {
  constructor() {
    super();
    this.forgotpassword = {
      endpoint: super.url("/authorization-middleware/email_resetPassword?type=_TYPE_", "middleware"),
      privateDomainForgetPasswordEndPoint: super.url("authService/private_domain_sendresetpassword"),
    };
  }
  forgetPassword(email, onSuccess, onError) {
    const forgetPasswordData = {
      email: email,
      action: "sendresetpassword",
    };
    this.post(
      this.forgotpassword.endpoint.replace("_TYPE_", "sendresetpassword"),
      forgetPasswordData,
      onSuccess,
      onError
    );
  }
  privateDomainForgetPassword(email, institute_domain, onSuccess, onError) {
    const forgetPasswordData = {
      email: email,
      institute_domain: institute_domain
      //action: "sendresetpassword",
    };
    this.post(
      this.forgotpassword.privateDomainForgetPasswordEndPoint,
      forgetPasswordData,
      onSuccess,
      onError
    );
  }

  registerPassword(password, onSuccess, onError) {
    const resetPasswordData = {
      password: password,
      action: "resetpassword",
    };
    this.post(
      this.forgotpassword.endpoint.replace("_TYPE_", "resetpassword"),
      resetPasswordData,
      onSuccess,
      onError
    );
  }
}
export default new ForgotPassword();
