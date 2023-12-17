import Request from "../../../Classes/Request";

class InviteStudent extends Request {
  constructor() {
    super();
    this.studentrequest = {
      invitestudent: super.url("/invitestudent"),
    };
  }

  inviteStudent(email, course, onSuccess, onError) {
    const studentData = {
      email: email,
      course: course,
    };
    this.post(
      this.studentrequest.invitestudent,
      studentData,
      onSuccess,
      onError
    );
  }
}
export default new InviteStudent();
