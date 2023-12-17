import Request from "../../../Classes/Request";

class ValidateOtp extends Request {
    constructor(){
        super()
        this.validateotp = {
            endpoint:super.url('/teacher-invite'),
        }
    }
    validateOtp(otp,onSuccess,onError){
        const resetPasswordData={
            otp:otp,
        };
        this.post(this.validateotp.endpoint,resetPasswordData,onSuccess,onError)
    }
}
export default new ValidateOtp();