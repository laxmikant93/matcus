import Request from "../../../Classes/Request";

class CourseRequest extends Request {
  constructor() {
    super();
    this.coursesEndpoint = {
      postCourse: super.url("/newcourse/createcourse"),
      getCourseInstitute: super.url("/newcourse/coursesList?institute=__ID__"),
      getNotAssignedCourses: super.url("/newcourse/notAssignedCourseList?institute=__ID__&user=__USERID__&forUI=notAssignedCourseList"),
      deleteCourse: super.url("/newcourse/delete/__ID__"),
      updateCourse: super.url("/newcourse/editCourse/__ID__"),
      getAssignedMultipleCourses: super.url("/invitationhistorymicro/?institute=__INSID__&user=__USERID__&kind=__KIND__&forUI=studentCourseAssignedList"),
      assignMultipleCourses: super.url("/courseAssign/updateCourseAssigned/:id?user=__USERID__&institute=__INSID__&owner=__OWNERID__&kind=__KIND__"),
      deleteAssignedCourse: super.url("/courseAssign/removeCourseAssigned/"),
      dashboardsteppercourse: super.url("/authService/DashboardStepperUpdate")
    };
  }
}
export default new CourseRequest();
