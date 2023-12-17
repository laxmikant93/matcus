import Request from "../../../Classes/Request";

class OnlineClassRequest extends Request {
  constructor() {
    super();
    this.OnlineClassEndpoint = {
      postOnlineClasses: super.url("/meet/zoomOnlineclass"),
      postOnlineClassesMeet: super.url("/meet/google_onlineclass"),
      editOnlineClassesRequest: super.url("/meet/zoomOnlineclass/?onlineClassId=__ID__"),
      editOnlineGoogleClassesRequest: super.url("/meet/google_onlineclass/?onlineClassId=__ID__"),

      getOnlineClass: super.url("/meet/zoomOnlineclass/__ID__"),
      getStudentClasses: super.url(
        "/meet/studentClassesList/?institute=__INSID__&student=__ID__"
      ),
      deleteOnlineClass: super.url("/meet/onlineClass/__ID__"),
      getOnlineClasses: super.url(
        "/meet/zoomOnlineClass/?owner=__Owner__&institute=__INS__&__QUERY__=__VALUE__"
      ),
      getClassroomClasses: super.url(
        "/meet/zoomOnlineClass/?institute=__INS__&classroom=[__CLASSROOM__]&owner=__Owner__&__QUERY__=__VALUE__"
      ),
      getFilteredClass: super.url("/meet/zoomOnlineClass/?owner=__Owner__&institute=__INS__&__QUERY__=__VALUE__"),
      getCreatedBy: super.url(
        "/meet/zoomOnlineClass/?owner=__USERID__&institute=__INSID__&createdBy=[__NAME__]"
      ),
      searchClasses: super.url(
        "/onlineclasses/?owner=__USERID__&institute=__INSID__&search=__CLASSNAME__&$populate[]=course&$populate[]=classroom"
      ),
      sortByRTO: super.url(
        "/onlineclasses/?owner=__USERID__&institute=__INSID__&createdon=rto&$populate[]=course&$populate[]=classroom"
      ),
      sortByOTR: super.url(
        "/onlineclasses/?owner=__USERID__&institute=__INSID__&createdon=otr&$populate[]=course&$populate[]=classroom"
      ),
      sortByZoom: super.url(
        "/onlineclasses/?owner=__USERID__&institute=__INSID__&meetingon=Zoom&$populate[]=course&$populate[]=classroom"
      ),
      sortByMeet: super.url(
        "/onlineclasses/?owner=__USERID__&institute=__INSID__&meetingon=GoogleMeet&$populate[]=course&$populate[]=classroom"
      ),
      sortDurationHTL: super.url(
        "/onlineclasses/?owner=__USERID__&institute=__INSID__&duration=htl&$populate[]=course&$populate[]=classroom"
      ),
      sortDurationLTH: super.url(
        "/onlineclasses/?owner=__USERID__&institute=__INSID__&duration=lth&$populate[]=course&$populate[]=classroom"
      ),
      sortByAttendeeHTL: super.url(
        "/onlineclasses/?owner=__USERID__&institute=__INSID__&attendees=htl&$populate[]=course&$populate[]=classroom"
      ),
      sortByAttendeeLTH: super.url(
        "/onlineclasses/?owner=__USERID__&institute=__INSID__&attendees=lth&$populate[]=course&$populate[]=classroom"
      ),
      course_Classroom: super.url(
        "/meet/zoomOnlineClass/?owner=__USERID__&institute=__INSID__&course=[__COURSE__]&classroom=[__CLASSROOM__]"
      ),
      courseAndClassroom: super.url(
        "/invitationhistorymicro/?institute=__INSID__&forUI=courseList"
      ),
      // classroom_Assigned: super.url(
      //   "classroomassigned/?forUI=createdByList&institute=__INSID__&owner=__USERID__&createdFor=onlineclasses"
      // ),
      classroom_Assigned: super.url(
        "classroomAssign/createdByList?institute=__INSID__&owner=__USERID__&createdFor=onlineclasses"
      ),
      deleteOnlineClasses: super.url("/onlineclasses/__ID__"),
      // cancelClassNotification: super.url("/notifications/cancelonlineclass/id"),
      getStudentList: super.url(
        "/meet/classroom?courseId=__COURSEID__&classRoomId=__CLASSROOMID__&instituteId=__INSID__"
      ),
      postStudentList: super.url("/meet/classroom"),
      sortByToggle: super.url(
        "/meet/daysfilter?ownerId=__USERID__&instituteId=__INSID__&toggleValue=__SORTBY__"
      ),
    };
  }
}
export default new OnlineClassRequest();

// api.getmelight.com/onlineclasses/?institute=609230a21e681f4958a77377&owner=6092620dcc9e181da01ea3b5&createdon=rto
// classroomassigned/?forUI=createdByList&institute=609230a21e681f4958a77377&owner=6092620dcc9e181da01ea3b5&createdFor=assignment
