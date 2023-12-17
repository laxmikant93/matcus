import Request from "../../../Classes/Request";

class TeacherValidateRequest extends Request {
  constructor() {
    super();
    this.validateteacherrequest = {
      validateTeacher: super.url("/inviteteacher"),
      validateTeacher: super.url("/inviteteacher/__TeacherId__"),
    };
  }
}
export default new TeacherValidateRequest();
