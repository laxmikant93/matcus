import Request from "../../../Classes/Request";

class OnlineExamRequest extends Request {
    constructor() {
        super()
        this.OnlineExamEndpoint = {
            getOnlineExam: super.url('/exam/owner?ownerId=__OWNERID__&instituteId=__INSID__'),
            postOnlineExam: super.url('/exam'),
            updateOnlineExam: super.url('/exam/__ID__'),
            deleteOnlineExam: super.url("/exam/__ID__"),
            notifyOnlineExam: super.url('/exam/notifyExam/__ID__'),
            cancelOnlineExam: super.url('/exam/cancelExam/__ID__'),
            studentListSubmittedExam: super.url('/exam/submittedExam/__ID__?instituteId=__INSID__'),
            studentListSubmissionExam: super.url('/exam/submittedExam/__ID__?instituteId=__INSID__&status=Participated'),
            getSingleOnlineExam: super.url("/exam/__ID__"),
            examDetailForCheck: super.url("exam/studentSubmittedExam?examid=__EXAMID__&studentid=__STUDENTID__"),
            getDataByCoursesAndClassroomsForTeacher: super.url('/exam/owner/?ownerId=__OWNERID__&instituteId=__INSID__&course=[__COURSESARRAY__]&classroom=[__CLASSROOMARRAY__]'),
            searchTeacherList: super.url('/exam/owner?ownerId=__ID__&instituteId=__INSID__&__query__=__SEARCHTERM___'),
            searchAndSortSubmissionList: super.url('/exam/submittedExam/__ID__/?__QUERY__=__TERM__'),
            examViewRequest: super.url("/exam/viewGraceRequest"),
            getGraceRequest: super.url("/exam/viewRequestGreaceTime?examId=__EXAMID__&studentId=__STUDENTID__"),
            PostTeacherAccept: super.url("exam/requestApprove"),
            PostTeacherReject: super.url("exam/requestApprove"),
            checkStudentExam: super.url("/exam/checkExam/__ID__"),
            // created_by: super.url("classroomassigned/?forUI=createdByList&institute=__INSID__&owner=__OWNERID__&createdFor=onlineTest"),
            created_by: super.url("classroomAssign/createdByList?institute=__INSID__&owner=__OWNERID__&createdFor=onlineTest"),
            getOnlineCreatedBy: super.url("/exam/owner?ownerId=__OWNERID__&instituteId=__INSID__&createdById=__NAME__"),
            examResult: super.url(
                "exam/viewResult?examid=__EXAMID__&studentid=__STUDENTID__"
            ),
        }
    }
}
export default new OnlineExamRequest();
