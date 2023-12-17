import Request from "../../../Classes/Request";

class ViewStudentClassroomRequest extends Request {
  constructor() {
    super();
    this.viewStudentClassroomEndpoint = {
      courseClassroomInfo: super.url("/classroomAssign/instituteCourseAndClassroom?forUI=instituteCourseAndClassroom&institute=__INSID__&classroom=__CLASSROOMID__&kind=student"),
      getStudentAssignments: super.url("/submittedassignmentsmicro/?institute=__INSID__&student=__STUDENTID__&classroom=[__CLASSROOMID__]&course=[__COURSEID__]"),

      getSubjectTeacherLists: super.url("/classroomAssign/instituteClassroomTeacher?forUI=instituteClassroomTeacher&institute=__INSID__&classroom=__ClassroomId__&course=__COURSEID__&kind=teacher"),

      getStudentSubjectOnlineClasses: super.url("/meet/studentClassesList/?institute=__INSID__&student=__STUDENTID__&classroom=[__CLASSROOMID__]"),

      getStudentSubjectCourses: super.url('/edneedCourses/studentCourseSubjectList/?institute=__INSID__&user=__STUDENTID__&course=__COURSEID__&classroom=__CLASSROOMID__&kind=student'),
      getSearchSortByStudentSubjectCourses: super.url('/edneedCourses/studentCourseSubjectList/?institute=__INSID__&user=__STUDENTID__&course=__COURSEID__&classroom=__CLASSROOMID__&__QUERY__=__VALUE__&kind=student'),

      searchSortByOnlineClasses: super.url("/meet/studentClassesList/?student=__STUDENTID__&institute=__INSID__&course=[__COURSEID__]&classroom=[__CLASSROOMID__]&__QUERY__=__VALUE__"),

      searchSortByTeacher: super.url("/classroomAssign/instituteClassroomTeacher?forUI=instituteClassroomTeacher&institute=__INSID__&classroom=__CLASSROOMID__&__QUERY__=__VALUE__&course=__COURSEID__&kind=teacher"),

      searchSortByAssignments: super.url("/submittedassignmentsmicro?student=__STUDENTID__&institute=__INSID__&course=[__COURSEID__]&classroom=[__CLASSROOMID__]&__QUERY__=__VALUE__"),

      createdByFilterStudentSubjectCoursesList: super.url("/edneedCourses/studentCourseSubjectList/?institute=__INSID__&user=__STUDENTID__&course=__COURSEID__&classroom=__CLASSROOMID__&createdBy=[__VALUE__]&kind=student")
    };
  }
}
export default new ViewStudentClassroomRequest();
