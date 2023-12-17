import Request from "../../../Classes/Request";

class TeacherRegister extends Request {
    constructor(){
        super()
        this.teacherregister = {
            teacherinvite:super.url('/teacher-invite'),
            users:super.url('/user')
        }
    }
    teacherSignUp(name,userName,password,onSuccess,onError){
        const teacherSignUpData={
            name:name,
            userName:userName,
            password:password
            
        };
        this.post(this.teacherregister.teacherinvite,teacherSignUpData,onSuccess,onError)
    }

    teacherSignUpFetch(onSuccess,onError)
    {
        this.get(this.teacherregister.users,onSuccess,onError)
    }

}
export default new TeacherRegister();