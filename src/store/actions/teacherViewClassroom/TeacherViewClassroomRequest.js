import Request from "../../../Classes/Request";

class TeacherViewClassroomRequest extends Request {
    constructor() {
        super()
        this.TeacherViewClassroomEndpont = {
          getTeacherViewClassroomOnlineClasses:super.url("/onlineclasses/?owner=__OWNERID__&institute=__INSID__&search=&$populate[]=course&$populate[]=classroom")
        }
    }
}
export default new TeacherViewClassroomRequest();