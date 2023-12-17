import Request from "../../../Classes/Request";

class StudentRegistrationRequest extends Request {

    constructor(){
        super()
        this.studentReqEndpoint = {
            verifytoken:super.url('invitestudent?emailotp=__invitation_id__'),
            acceptInvite:super.url('invitestudent/__invitation_id__')
        }
    }
}

export default new StudentRegistrationRequest()