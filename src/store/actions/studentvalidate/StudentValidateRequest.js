import Request from "../../../Classes/Request";

class StudentValidateRequest extends Request {
  constructor() {
    super();
    this.validatestudentrequest = {
      validateStudent: super.url("/invitestudent"),
      validateStudent: super.url("/invitestudent/__StudentId__"),
    };
  }

  //   inviteTeacher(email, onSuccess, onError) {
  //     this.post(this.teacherrequest.inviteteacher, email, onSuccess, onError);
  //   }
}
export default new StudentValidateRequest();
