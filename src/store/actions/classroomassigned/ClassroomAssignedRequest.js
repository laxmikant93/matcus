import Request from "../../../Classes/Request";

class ClassroomAssignedRequest extends Request {
  constructor() {
    super();
    this.classroomassignedEndpoint = {
      // getClassroomAssigned: super.url(
      //   "/classroomassigned?institute=__instituteId__&user=__userID__&kind=__KIND__&forUI=assignmentList"
      // ),
      getClassroomAssigned: super.url(
        "/classroomAssign/assignmentList?institute=__instituteId__&user=__userID__&kind=__KIND__&forUI=assignmentList"
      ),
      // getClassroomAssignedFaculty: super.url(
      //   "classroomassigned/?institute=__Id__&user=__UserId__&forUI=editFaculty"
      // ),
      getClassroomAssignedFaculty: super.url(
        "classroomAssign/editFaculty?institute=__Id__&user=__UserId__&forUI=editFaculty"
      ),
      postClassroomAssigned: super.url("/classroomAssign"),
      // deleteClassroomAssignedData: super.url(
      //   "/classroomassigned/?user=__UserId__&course=__courseId__&forUI=removeTeacher"
      // ),
      deleteClassroomAssignedData: super.url(
        "/classroomAssign/removeTeacher?user=__UserId__&course=__courseId__&forUI=removeTeacher"
      ),
      // getTeacherClassroomData: super.url('classroomassigned/?institute=__INS__&course=__COURSEID__&user=__UID__&forUI=InstituteCourseTeacher'),
      getTeacherClassroomData: super.url('classroomAssign/InstituteCourseTeacher/?institute=__INS__&course=__COURSEID__&user=__UID__&forUI=InstituteCourseTeacher'),

      deleteEditTeacherClassroomList: super.url('/classroomAssign/__ID__')
    };
  }
}

export default new ClassroomAssignedRequest();
