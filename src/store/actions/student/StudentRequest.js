import Request from "../../../Classes/Request";

class StudentRequest extends Request {
  constructor() {
    super();
    this.studentEndpoint = {
      student: super.url("/manualInviteStudent/invitestudent"),
      bulkuploadstudent: super.url("/bulkUploadStudent/bulkUploadStudentInvite"),
      studentId: super.url(
        "/invitestudent?emailotp=__otp__&email=__email__&$populate[]=institute&$populate[]=owner&$populate[]=course"
      ),
      studentwithoutId: super.url(
        "/invitestudent?emailotp=__otp__&$populate[]=institute&$populate[]=owner&$populate[]=course"
      ),
      studentpatchId: super.url("/invitestudent/__Id__"),
      getStudentHistory: super.url(
        "/invitestudent?institute=__Id__&$limit=100&$skip=0&$populate[]=course"
      ),
    };
  }
}
export default new StudentRequest();

// "/invitestudent?emailotp=__otp__&$populate[]=institute&$populate[]=owner"
