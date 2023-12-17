import Request from "../../../../Classes/Request";

class AuthRequest extends Request {
  constructor() {
    super()
    this.endpoint = {
      apiSignup: super.url("e-authorization/signup?domain=__DOMAIN__", "ecommerce"),
      apiSignupSubdomain: super.url("e-authorization/signup?subdomain=__DOMAIN__", "ecommerce"),
      apiLogin: super.url("e-authorization/Privatelogin?domain=__DOMAIN__&type=__TYPE__", "ecommerce"),
      apiLoginSubdomain: super.url("e-authorization/Privatelogin?domain=__DOMAIN__&type=__TYPE__", "ecommerce"),
      apiSignupOtpCheck: super.url("e-authorization/signup?domain=__DOMAIN__&otpCheck=true", "ecommerce"),
      apiSignupSubdomainOtpCheck: super.url("e-authorization/signup?subdomain=__DOMAIN__&otpCheck=true", "ecommerce"),
    }
  }
}

export default new AuthRequest();