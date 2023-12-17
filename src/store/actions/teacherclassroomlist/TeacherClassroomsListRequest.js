import Request from "../../../Classes/Request";

class TeacherClassroomsListRequest extends Request {
    constructor() {
        super()
        this.TeacherClassroomsListEndpoint = {
            getTeacherClassroomsList: super.url('/classroomAssign/assignedCourseList?forUI=assignedCourseList&institute=__INSID__&user=__USERID__&kind=teacher'),
            getTeacherClassroomsListSortBy: super.url('/newcourse/coursesList?institute=__ID__'),
            getTeacherClassroomsListSearch: super.url('/newcourse/coursesList?institute=__ID__'),

        }
    }
}
export default new TeacherClassroomsListRequest();