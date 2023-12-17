import Request from "../../../Classes/Request";

class TeacherSelectRequest extends Request {

    constructor() {
        super()
        this.teacherSelectEndpoint = {
            // "classroomassigned": super.url("classroomassigned?institute=__INSTITITEID__&user=__USERID__&kind=__KIND__&forUI=assignmentList"),
            "classroomassigned": super.url("classroomAssign/assignmentList?institute=__INSTITITEID__&user=__USERID__&kind=__KIND__&forUI=assignmentList"),
            "instituteCourse": super.url("/newcourse/coursesList?institute=__INSTITITEID__")
        }
    }
}

export default new TeacherSelectRequest()