import Request from "../../../Classes/Request";

class StudentAttendanceRequest extends Request {
    constructor() {
        super()
        this.StudentAttendanceEndpoint = {
            getStudentAttendanceList: super.url("/attendance/studentAttendanceList/?institute=__INSID__&user=__USERID__&course=__CLASSROOMID__&date=__DATE__"),
            sendLeaveRequest: super.url("/attendance/leaveRequest"),
            getLeaveRequestList: super.url("/attendance/leaveRequest/?institute=__INSID__&course=__CLASSROOMID__&user=__USERID__&date=__DATE__"),
            cancelLeaveRequest: super.url("/attendance/leaveRequest/__ID__"),
            sortStudentLeaveRequestList: super.url("/attendance/leaveRequest/?institute=__INSID__&course=__CLASSROOMID__&user=__USERID__&date=__DATE__&__QUERY__=__VALUE__"),
        }
    }
}
export default new StudentAttendanceRequest();