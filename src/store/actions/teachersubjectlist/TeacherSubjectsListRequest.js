import Request from "../../../Classes/Request";

class TeacherSubjectsListRequest extends Request {
    constructor() {
        super()
        this.TeacherSubjectsListEndpoint = {
            getTeacherSubjectsList: super.url('/classroomAssign/classroomInCourseList?forUI=classroomInCourseList&institute=__INSID__&user=__USERID__&course=__COURSEID__&kind=teacher'),
            getTeacherSubjectsListSortBy: super.url('/newcourse/coursesList?institute=__ID__'),
            getTeacherSubjectsListSearch: super.url('/newcourse/coursesList?institute=__ID__'),
            getTeacherClassroomData: super.url('/newcourse/coursesList?institute=__ID__'),

        }
    }
}
export default new TeacherSubjectsListRequest();