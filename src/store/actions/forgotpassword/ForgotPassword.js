import Request from "../../../Classes/Request";

class ForgotPassword extends Request {
    constructor() {
        super()
        this.forgotpassword = {
            endpoint: super.url('/authorization-middleware/email_resetPassword?type=_TYPE_', "middleware"),
            privateDomainendpoint: super.url('/authService/private_domain_resetpassword'),
        }
    }
    forgetPassword(email, onSuccess, onError) {
        const forgetPasswordData = {

            email: email,
            action: "sendresetpassword"

        };
        this.post(this.forgotpassword.endpoint.replace("_TYPE_", "sendresetpassword"), forgetPasswordData, onSuccess, onError)
    }

    registerPassword(password, verificationcode, onSuccess, onError) {
        const resetPasswordData = {
            edneedapi_key: "useredneed_987",
            action: "resetpassword",
            password: password,
            token: verificationcode,

        };
        this.post(this.forgotpassword.endpoint.replace("_TYPE_", "resetpassword"), resetPasswordData, onSuccess, onError)
    }
    privateDomainrRegisterPassword(password, verificationcode, institute_domain, onSuccess, onError) {
        const resetPasswordData = {
            edneedapi_key: "useredneed_987",
            action: "resetpassword",
            password: password,
            token: verificationcode,
            institute_domain: institute_domain

        };
        this.post(this.forgotpassword.privateDomainendpoint, resetPasswordData, onSuccess, onError)
    }

    // Change Password
    changePassword(oldPassword, newPassword, email, onSuccess, onError) {
        const changePasswordData = {
            edneedapi_key: "useredneed_987",
            action: "password_change",
            email: email,
            oldPassword: oldPassword,
            password: newPassword,
        };
        this.post(this.forgotpassword.endpoint, changePasswordData, onSuccess, onError)
    }


    signupVerification(token, onSuccess, onError) {
        const signupVarificationData = {

            action: "singnverification",
            token: token,
        };
        this.post(this.forgotpassword.endpoint, signupVarificationData, onSuccess, onError)
    }
}
export default new ForgotPassword();