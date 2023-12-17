import Request from "../../../Classes/Request";

class TeacherAcceptRequest extends Request {
  constructor() {
    super();
    this.teacheracceptEndpoint = {
      teacheraccept: super.url("/teacheracceptinvitation"),
    };
  }
}
export default new TeacherAcceptRequest();
