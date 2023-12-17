import Request from "../../../Classes/Request";

class TeacherRequest extends Request {
  constructor() {
    super();
    this.teacherEndpoint = {
      teacher: super.url("/mannualinviteteacher"),
      bulkupload: super.url("/bulkUploadTeacher/bulkUploadTeacherInvite"),
      // getteacherlist: super.url("/inviteteacher?institute=__Id__"),

      getteacherlist: super.url(
        "/inviteteacher/?institute=__Id__&$limit=100&$skip=0"
      ),
      // teacherId: super.url(
      //   "/inviteteacher?emailotp=__otp__&$populate[]=institute&$populate[]=owner"
      // ),
      teacherId: super.url(
        "/inviteteacher?emailotp=__otp__&email=__email__&$populate[]=institute&$populate[]=owner"
      ),
      teacherwithoutId: super.url(
        "/inviteteacher?emailotp=__otp__&$populate[]=institute&$populate[]=owner"
      ),
      teacherpatchId: super.url("/inviteteacher/__Id__"),
      notAssignedclassrooms: super.url("mannualinviteteacher/?institute=__INS__&course=__COUSEID__"),
    };
  }
}
export default new TeacherRequest();
