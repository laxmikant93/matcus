import Request from "../../../Classes/Request";

class StudentRegister extends Request {
    constructor(){
        super()
        this.studentregister = {
            studentinvite:super.url('/invite-teacher'),
            users:super.url('/user'),
        }
    }
    studentSignUp(name,userName,password,onSuccess,onError){
        const studentSignUpData={
            name:name,
            userName:userName,
            password:password
        };
        this.post(this.studentregister.studentinvite,studentSignUpData,onSuccess,onError)
    }

    studentSignUpFetch(onSuccess,onError)
    {
        this.get(this.studentregister.users,onSuccess,onError)
    }
    

}
export default new StudentRegister();
