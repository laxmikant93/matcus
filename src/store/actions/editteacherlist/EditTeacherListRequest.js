import Request from "../../../Classes/Request";

class EditTeacherListRequest extends Request {
    constructor() {
        super()
        this.editTeacherListEndpoint = {
            postEditTeacherList: super.url('/classroomAssign'),
            // /courseassigned/?institute=608f98786564f041f1533ed5&course=60e827c33fcd8548a686d403&$populate[]=user&$limit=200
            // getEditTeacherListInstitute: super.url('/classroomassigned?forUI=studentListCountUI&institute=__INSID__&course=__COURSEID__&kind=teacher'),
            getEditTeacherListInstitute: super.url('/classroomAssign/studentListCountUI?forUI=studentListCountUI&institute=__INSID__&course=__COURSEID__&kind=teacher'),
            // getEditTeacherListInstitute:super.url('/userinfo?institute=__ID__&activeRole=__Role__'),
            // getTeacherClassroomData: super.url('classroomassigned/?institute=__INS__&course=__COURSEID__&user=__UID__&forUI=InstituteCourseTeacher'),
            getTeacherClassroomData: super.url('classroomAssign/InstituteCourseTeacher?institute=__INS__&course=__COURSEID__&user=__UID__&forUI=InstituteCourseTeacher'),
            // getassignedclassroomToTeacher:super.url('/classroomassigned?user=__USERID__&course=__COURSEID__&$populate[]=classroom'),
            // getEditTeacherUsernameList:super.url('/userinfo?_id=__ID__&institute=__ID__&activeRole=__ROLE__&$populate[]=userinfo'),

            //getEditTeacherUsernameList:super.url('/user?email[$search]=__VALUE__'),
            getEditTeacherUsernameList: super.url('userrolemicro/?institute=__INSID__&role=__TEACHER__ROLE__&course1=__CID__&search=__VALUE__&kind=__KIND__&usernamesearch=__usernameSearch__&industry=_industry_', "commonservices"),
            // /user/?institute=604c670871b25169693c0278&activeRole=5efd333cbe16b16e6b061b4a&email[$search]=1teacher 
            getClassroomUsernameList: super.url('userrolemicro/?institute=__INSID__&role=__TEACHER__ROLE__&course1=__CID__&classroom1=__CLASSROOM__&search=__VALUE__&kind=__KIND__&usernamesearch=__usernameSearch__&industry=_industry_', "commonservices"),

            // deleteEditTeacherList: super.url('/classroomassigned/?user=__TEACHERID__&course=__COURSEID__&institute=__INSID__&kind=teacher&forUI=removeTeacher'),
            deleteEditTeacherList: super.url('/classroomAssign/removeTeacher?user=__TEACHERID__&course=__COURSEID__&institute=__INSID__&kind=teacher&forUI=removeTeacher'),


            deleteEditTeacherClassroomList: super.url('/classroomAssign/__ID__'),
            updateEditTeacherList: super.url('/classroomAssign/__ID__'),

            postClassTeacher: super.url("/attendance/classTeacher")

        }
    }
}
export default new EditTeacherListRequest();