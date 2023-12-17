import Request from "../../../Classes/Request";

class InviteFaculty extends Request {
    constructor(){
        super()
        this.studentregister = {
            invitefaculty:super.url('/teacher'),
        }
    }
    inviteEmail(name,userName,password,onSuccess,onError){
        const studentSignUpData={
            name:name,
            userName:userName,
            password:password
        };
        this.post(this.studentregister.studentinvite,studentSignUpData,onSuccess,onError)
    }  

}
export default new InviteFaculty();
