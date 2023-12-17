import Request from "../../../Classes/Request";

class TeacherAttendanceRequest extends Request {
    constructor() {
        super()
        this.TeacherAttendanceEndpoint = {
            postAttendance:super.url('/attendance/createAttendance'),
            getStudentAttendanceForTeacher:super.url("/attendance/attendanceList/?institute=__INSID__&owner=__USERID__&course=__CLASSROOMID__&classroom=__SUBJECTID__&date=__DATE__"),
            getStudentAttendanceForAdmin:super.url("/attendance/attendanceList/?institute=__INSID__&course=__CLASSROOMID__&classroom=__SUBJECTID__&date=__DATE__"),
            getStudentAttendanceForTeacherClassroom:super.url("/attendance/attendanceList/?institute=__INSID__&owner=__USERID__&course=__CLASSROOMID__&date=__DATE__"),
            getStudentAttendanceForAdminClassroom:super.url("/attendance/attendanceList/?institute=__INSID__&course=__CLASSROOMID__&date=__DATE__"),
            getSingleAttendanceInfo:super.url('/attendance/attendanceByDate/?institute=__INSID__&course=__CLASSROOMID__&classroom=__SUBJECTID__&date=__DATE__'),
            editAttendance:super.url('/attendance/updateAttendance/__ID__'),
            getSingleStudentAttendanceInfo:super.url("/attendance/attendanceByDate/?institute=__INST__&course=__COURSE__&user=__STD_ID__&date=__DATE__"),
           
           
            searchStudentAdminClassroom:super.url("/attendance/attendanceList/?institute=__INSID__&course=__CLASSROOMID__&date=__DATE__&search=__SEARCH__"),
            searchStudentAdminClassroomSubject:super.url("/attendance/attendanceList/?institute=__INSID__&course=__CLASSROOMID__&classroom=__SUBJECTID__&date=__DATE__&search=__SEARCH__"),
            searchStudentTeacherClassroom:super.url("/attendance/attendanceList/?institute=__INSID__&owner=__USERID__&course=__CLASSROOMID__&date=__DATE__&search=__SEARCH__"),
            searchStudentTeacherClassroomSubject:super.url("/attendance/attendanceList/?institute=__INSID__&owner=__USERID__&course=__CLASSROOMID__&classroom=__SUBJECTID__&date=__DATE__&search=__SEARCH__"),
            
            
            getTeacherLeaveRequestList:super.url("/attendance/leaveRequest/?institute=__INSID__&course=__CLASSROOMID__&date=__DATE__"),
            getSinglePeriodDataOfStudent:super.url("/attendance/attendanceByDate/?institute=_INS_&course=_COURSE_&user=_USER_&date=_DATE_&classroom=_CLASSROOM_"),
            searchStudentLeaveRequest:super.url("/attendance/leaveRequest/?institute=__INSID__&course=__CLASSROOMID__&date=__DATE__&__QUERY__=__VALUE__"),
            acceptLeaveRequest:super.url("/attendance/leaveRequest/__ID__"),
            getSingleLeaveRequest:super.url("/attendance/leaveRequest/__ID__"),
            deleteAttendance: super.url("/attendance/deleteAttendance/__ID__"),
            // getSinglePeriodDataOfStudent:super.url("/attendance/attendanceByDate/?institute=_INS_&course=_COURSE_&user=_USER_&date=_DATE_&classroom=_CLASSROOM_")
        }
    }
}
export default new TeacherAttendanceRequest();