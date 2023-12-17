import Request from "../../../Classes/Request";

class StudentClassroomRequest extends Request {
  constructor() {
    super();
    this.studentClassroomEndpoint = {
      // classroomList: super.url("/classroomassigned/?forUI=assignedCourseList&institute=__INSID__&user=__USERID__&kind=student"),
      classroomList: super.url("/classroomAssign/assignedCourseList?forUI=assignedCourseList&institute=__INSID__&user=__USERID__&kind=student"),

      getSingleClassroomInfo: super.url("/newcourse/coursesList?institute=__ID__"),
      getStudentClassroomSubjectList: super.url('/classroomAssign/classroomInCourseList?forUI=classroomInCourseList&institute=__INSID__&user=__USERID__&course=__COURSEID__&kind=student')
      // servicesPost: super.url("/services"),
      // serviceDelete: super.url("/services/__Id__"),
      // searchService: super.url("/services/?institute=__ID__&search=__TITLE__"),
      // sortService : super.url("/services/?institute=__ID__&isStatus=__STATUS__"),
      // serviceUpdate: super.url("/services/__Id__"),
    };
  }
}
export default new StudentClassroomRequest();
