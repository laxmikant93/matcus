import Request from "../../../Classes/Request";

class changePasswordRequest extends Request {

    constructor() {
        super()
        this.changePasswordEndpoint = {
            changePasswordUrl: super.url('/authManagement'),
            privateDomainChangePasswordUrl: super.url('/authService/private_domain_changepassword'),
            changedPasswordTrue: super.url('/user/__ID__')
        }
    }
}

export default new changePasswordRequest();