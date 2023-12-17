import Request from "../../../Classes/Request";

class TeacherRequest extends Request {
  constructor() {
    super();
    this.teacherrequest = {
      inviteteacher: super.url("/invite-teacher"),
    };
  }

  inviteTeacher(email, onSuccess, onError) {
    const emailData = {
      email,
    };
    this.post(this.teacherrequest.inviteteacher, emailData, onSuccess, onError);
  }
}
export default new TeacherRequest();
