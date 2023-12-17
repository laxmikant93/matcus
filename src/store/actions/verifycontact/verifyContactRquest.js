import Request from "../../../Classes/Request";

class verifyContactRquest extends Request {
  constructor() {
    super()
    this.ContactVerify = {
      OtpRequest: super.url('authService/sendContactVerifyOtp'),
      OtpVerify: super.url('authService/verifyContactOtp'),
      userWhatsappContact: super.url('user/__ID__'),
    }
  }
}
export default new verifyContactRquest();