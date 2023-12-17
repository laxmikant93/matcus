import Request from "../../../Classes/Request";

class JoinClassRequest extends Request {
  constructor() {
    super();
    this.joinclassEndpoint = {
      getJoinClass: super.url(
        "/meet/studentClassesList/?institute=__INSID__&student=__ID__"
      ),
      assignedStudents: super.url(
        "/meet/assignToStudent/?institute=__INSID__&course=__COURSEID__&classroom=__CLASSROOMID__"
      ),
      upcomingClass: super.url(
        "/meet/studentClassesList/?student=__ID__&institute=__INSID__&status=upcoming"
      ),
      ongoingClass: super.url(
        "/meet/studentClassesList/?student=__ID__&institute=__INSID__&status=ongoing"
      ),
      attendedClass: super.url(
        "/meet/studentClassesList/?student=__ID__&institute=__INSID__&status=attended"
      ),
      missedClass: super.url(
        "/meet/studentClassesList/?student=__ID__&institute=__INSID__&status=missed"
      ),
      classCreatedBySelf: super.url(
        "/meet/studentClassesList/?student=__ID__&institute=__INSID__&status=missed"
      ),
      classCreatedByInstitute: super.url(
        "/meet/studentClassesList/?student=__ID__&institute=__INSID__&status=missed"
      ),
      classCreatedByOther: super.url(
        "/meet/studentClassesList/?student=__ID__&institute=__INSID__&status=missed"
      ),
      searchClass: super.url(
        "/meet/studentClassesList/?student=__ID__&institute=__INSID__&search=__CLASSNAME__"
      ),
      student_course_Classroom: super.url(
        "/meet/studentClassesList/?student=__USERID__&institute=__INSID__&course=[__COURSE__]&classroom=[__CLASSROOM__]"
      ),
      sortByToggleValue: super.url("/meet/daysfilter?ownerId=__USERID__&instituteId=__INSID__&toggleValue=__SORTBY__"),
      filterOnlineClass: super.url(
        "/meet/studentClassesList/?student=__ID__&institute=__INSID__&__QUERY__=__VALUE__"
      ),
      courseClassroomFilter: super.url(
        "/meet/studentClassesList/?student=__ID__&institute=__INSID__&course=[__COURSE__]&classroom=[__CLASSROOM__]"
      ),
      studentAttendedTime:super.url("/meet/attendesList/?studentId=__STUDENTID__&onlineClassId=__CLASSID__")
    };
  }
}
export default new JoinClassRequest();
