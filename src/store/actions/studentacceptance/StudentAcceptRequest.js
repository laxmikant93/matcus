import Request from "../../../Classes/Request";

class StudentAcceptRequest extends Request {
  constructor() {
    super();
    this.studentEndpoint = {
      studentaccept: super.url("/acceptinvitation"),
    };
  }
}
export default new StudentAcceptRequest();
