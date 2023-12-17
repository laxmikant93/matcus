import Request from "../../../Classes/Request";

class classroomDetailRequest extends Request {
  constructor() {
    super();
    this.ClassroomDetailEndPoint = {
      getClassroomDetailOnlineClasses: super.url(
        "/meet/zoomOnlineClass/?institute=__INSID__&classroom=[__ClassroomId__]"
      ),
      getClassroomDetailAssignment: super.url(
        "/assignmentmicro/getAssignment?institute=__INSID__&classroom=[__ClassroomId__]&limit=100"
      ),
      // getClassroomDetailTeachers: super.url(
      //   "/classroomassigned/?forUI=instituteClassroomTeacher&institute=__INSID__&course=__COURSEID__&classroom=__ClassroomId__&kind=teacher"
      // ),
      // getClassroomDetailStudents: super.url(
      //   "/classroomassigned/?forUI=instituteClassroomTeacher&institute=__INSID__&course=__COURSEID__&classroom=__ClassroomId__&kind=student"
      // ),
      // getAllTeacherDetail: super.url(
      //   "classroomassigned/?forUI=instituteTeacher&institute=__INSID__&classroom=__ClassroomId__&kind=teacher"
      // ),
      getClassroomDetailTeachers: super.url(
        "/classroomAssign/instituteClassroomTeacher?forUI=instituteClassroomTeacher&institute=__INSID__&course=__COURSEID__&classroom=__ClassroomId__&kind=teacher"
      ),
      getClassroomDetailStudents: super.url(
        "/classroomAssign/instituteClassroomTeacher?forUI=instituteClassroomTeacher&institute=__INSID__&course=__COURSEID__&classroom=__ClassroomId__&kind=student"
      ),
      getAllTeacherDetail: super.url(
        "classroomAssign/instituteTeacher?forUI=instituteTeacher&institute=__INSID__&classroom=__ClassroomId__&kind=teacher"
      ),
      deleteClassroomDetailOnlineClasses: super.url("/onlineclasses/__ID__"),
      postOnlineClasses: super.url("/onlineclasses"),
      deleteClassroomDetailAssignment: super.url("/assignmentmicro/delete/__ID__"),
      deleteClassroomDetailTeachers: super.url("/classroomAssign/delete/__ID__"),
      // SearchClassroomDetailTeachers: super.url(
      //   "/classroomassigned/?forUI=instituteClassroomTeacher&institute=__INS__&course=__COURSEID__&classroom=__CLASSID__&kind=teacher&search=__VAL__&limit=100"
      // ),
      // SearchClassroomDetailStudents: super.url(
      //   "/classroomassigned/?forUI=instituteClassroomTeacher&institute=__INS__&course=__COURSEID__&classroom=__CLASSID__&kind=student&search=__VAL__&limit=100"
      // ),
      SearchClassroomDetailTeachers: super.url(
        "/classroomAssign/instituteClassroomTeacher?forUI=instituteClassroomTeacher&institute=__INS__&course=__COURSEID__&classroom=__CLASSID__&kind=teacher&search=__VAL__&limit=100"
      ),
      SearchClassroomDetailStudents: super.url(
        "/classroomAssign/instituteClassroomTeacher?forUI=instituteClassroomTeacher&institute=__INS__&course=__COURSEID__&classroom=__CLASSID__&kind=student&search=__VAL__&limit=100"
      ),
      SearchClassroomDetailOnlineClasses: super.url(
        "/meet/zoomOnlineClass/?institute=__INS__&classroom=[__CLASSID__]&search=__VAL__&owner=__OWNER__&limit=100"
      ),
      SearchClassroomDetailAssignment: super.url(
        "/assignmentmicro/getAssignment/?institute=__INS__&classroom=[__CLASSID__]&search=__VAL__&limit=100"
      ),
      ClassroomDetailIdGet: super.url(
        "classroomAssign/instituteCourseAndClassroom?forUI=instituteCourseAndClassroom&classroom=__CLASSID__&institute=__INS__&kind=teacher"
      ),
      getTeacherCourseData: super.url('/newcourse/coursesList?institute=__ID__'),
      Addteacher: super.url("classroomAssign"),
      AssignmentUpdateAssign: super.url(
        "/assignmentmicro/update/__ID__?assign=__AssignID__&assignBy=__USERID__"
      ),
      OnlineClassesUpdateAssign: super.url(
        "onlineclasses/__ID__?assign=__AssignID__&assignBy=__USERID__"
      ),
      postAssignment: super.url("/assignmentmicro/createAssignment"),
      UpdateAssignment: super.url("/assignmentmicro/update/__ID__"),
      // getSortTeacherClassroom: super.url(
      //   "/classroomassigned/?forUI=instituteClassroomTeacher&institute=__INS__&classroom=__CLASSROOM__&__STATE__=__VAL__&course=__COURSEID__&kind=__KIND__"
      // ),
      getSortTeacherClassroom: super.url(
        "/classroomAssign/instituteClassroomTeacher?forUI=instituteClassroomTeacher&institute=__INS__&classroom=__CLASSROOM__&__STATE__=__VAL__&course=__COURSEID__&kind=__KIND__"
      ),
      getSortAssignmentClassroom: super.url(
        "/assignmentmicro/getAssignment/?institute=__INS__&classroom=[__CLASSROOM__]&__STATE__=__VAL__"
      ),
      getMultiSelectSortAssignmentClassroom: super.url(
        "/assignmentmicro/getAssignment/?institute=__INS__&classroom=[__CLASSROOM__]&__STATE__=[__VAL__]"
      ),
      getSortOnlineClassesClassroom: super.url(
        "/meet/zoomOnlineClass/?institute=__INS__&classroom=[__CLASSROOM__]&__STATE__=__VAL__&owner=__OWNER__"
      ),
      getSortOnlineClassesClassroom2: super.url(
        "/meet/zoomOnlineClass/?institute=__INS__&classroom=[__CLASSROOM__]&__STATE__=__VAL__"
      ),
      getMultiSelectOnlineClassesClassroom: super.url(
        "/onlineclasses/?institute=__INS__&classroom=[__CLASSROOM__]&__STATE__=[__VAL__]"
      ),
      getClassroomDetailCourses: super.url(
        "/edneedCourses/AdminCourseSubjectList/?institute=__INSID__&course=__COURSEID__&classroom=__CLASSROOMID__"
      ),
      deleteAdminCourse: super.url("/edneedCourses/courseInfo/__ID__"),
      cancelClassNotification: super.url("/notifications/cancelonlineclass/id","commonservices"),
      getClassroomDetailOnlineTest: super.url('/exam/adminGetExam/?instituteId=__INSID__&classroom=__ClassroomId__&limit=100'),
      getSortOnlineTest: super.url('/exam/adminGetExam/?instituteId=__INS__&classroom=__CLASSROOM__&__STATE__=__VAL__'),
      SearchClassroomDetailOnlineTest: super.url('/exam/adminGetExam/?instituteId=__INS__&classroom=__CLASSID__&search=__VAL__&limit=100'),
      getMultiSelectSortOnlineTestClassroom: super.url('/exam/createdbyFillter/?instituteId=__INS__&classroom=__CLASSID__&__STATE__=[__VAL__]'),
      OnlineTestUpdateAssign: super.url('/exam/assignTo/__ID__'),
      notifyOnlineAdminExam: super.url('/exam/notifyExam/__ID__'),
      cancelOnlineAdminExam: super.url('/exam/cancelExam/__ID__'),
      deleteOnlineAdminExam: super.url("/exam/__ID__"),
      addAssignmentNotification: super.url("/notifications/addAssignment/id","commonservices"),
      removeAssignmentNotification: super.url(
        "/notifications/CancelAssignment/id","commonservices"
      ),
      editAssignmentNotification: super.url("/notifications/EditAssignment/id","commonservices"),
      assignAssignmentNotification: super.url(
        "/notifications/assignAssignment/id?assign=_assign_&assignBy=_assignBy_","commonservices"
      ),
      assignToTeacherNotification: super.url(
        "/notifications/assigntoteacher/:id","commonservices"
      ),
      teacherClassroomCoursesList: super.url(
        "/edneedCourses/studentCourseSubjectList/?institute=__INSID__&user=__USERID__&course=__CLASSROOMID__&classroom=__SUBJECTID__&kind=teacher"
      ),
      searchSortTeacherClassroomCoursesList: super.url(
        "/edneedCourses/studentCourseSubjectList/?institute=__INSID__&user=__USERID__&course=__CLASSROOMID__&classroom=__SUBJECTID__&__QUERY__=__VALUE__&kind=teacher"
      ),
      sortBycoursesAdminClassroom: super.url(
        "/edneedCourses/AdminCourseSubjectList/?institute=__INSID__&course=__COURSEID__&classroom=__CLASSROOMID__&__QUERY__=__VALUE__"
      ),
      createdByAssignToCourses: super.url(
        "/edneedCourses/AdminCourseSubjectList/?institute=__INSID__&course=__COURSEID__&classroom=__CLASSROOMID__&__QUERYY__=[__VAL__]"
      ),
      createdByFilterTeacherClassroomCoursesList: super.url(
        "/edneedCourses/studentCourseSubjectList/?institute=__INSID__&user=__USERID__&course=__CLASSROOMID__&classroom=__SUBJECTID__&__QUERY__=[__VALUES__]&kind=teacher"
      ),
    }
  }
}
export default new classroomDetailRequest();
