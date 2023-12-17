import Request from "../../../Classes/Request";

class stuedntOnlineExamRequest extends Request {
    constructor() {
        super()
        this.StudentOnlineExamEndpoint = {
            getStudentOnlineExam: super.url('exam/examForStudents/?instituteId=__ID__&studentId=__UID__'),
            getCourseId: super.url('courseassigned/?user=__USERID__&institute=__INSID__'),
            sortAndSearch: super.url('/exam/examForStudents/?studentId=__STUDENTID__&instituteId=__INSID__&courseId=__CID__&__QUERY__=__SEARCHTERM__'),
            courseFilterStudentTestList: super.url('/exam/examForStudents/?studentId=__STUDENTID__&instituteId=__INSID__&courseId=__CID__&course=[__COURSEARRAY__]&classroom=[__CLASSROOMARRAY__]'),
            AssignTo: super.url("exam/assignTeacher?studentId=__STUDENTID__&instituteId=__INSID__&assignToId=[__NAME__]")
        }
    }
}
export default new stuedntOnlineExamRequest();