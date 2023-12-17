import Request from "../../../Classes/Request";

class EditStudentListRequest extends Request {
    constructor() {
        super()
        this.editStudentListEndpoint = {
            postEditStudentList: super.url('/courseAssign'),
            // getEditStudentListInstitute: super.url('/classroomassigned/?forUI=studentListCountUI&institute=__ID__&course=__COURSEID__&kind=student'),
            getEditStudentListInstitute: super.url('/classroomAssign/studentListCountUI?forUI=studentListCountUI&institute=__ID__&course=__COURSEID__&kind=student'),
            // https://api.getmelight.com/courseassigned/?institute=603cf2c614441d201ef0d162&course=603f445cb0b6583d1f5b16f1&$populate[]=user&$populate[]=activeRole=5efd3350be16b16e6b061b4b
            // getEditStudentListInstitute:super.url('/courseassigned?institute=__ID__&course=__CID__'),
            getEditStudentUsernameList: super.url('/user?email[$search]=__VALUE__'),
            deleteEditStudentList: super.url('/courseAssign/removeCourseAssigned'),
            updateEditStudentList: super.url('/courseassigned/__ID__'),
            getCourseInstitute: super.url('/newcourse/coursesList?institute=__ID__'),

        }
    }
}
export default new EditStudentListRequest();