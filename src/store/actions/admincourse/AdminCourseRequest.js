import Request from "../../../Classes/Request";

class AdminCourseRequest extends Request {
    constructor() {
        super()
        this.AdminCourseEndpoint = {
            getAdminCourse: super.url('/edneedCourses/courseList/?institute=__INSID__&kind=admin'),
            getAssignedList: super.url('/edneedCourses/assignList/__ID__?teacherRole=__TEACHERROLE__&studentRole=__STUDENTROLE__'),
            getAllClassroomSubjects: super.url('/invitationhistorymicro/?institute=__INSID__&forUI=courseList'),
            getAllClassroomSubjectsForTeacher: super.url("/invitationhistorymicro/?institute=__INSID__&user=__USERID__&forUI=courseList"),
            getAllClassroomSubjectsForTeacherAttendance: super.url("/invitationhistorymicro/?institute=__INSID__&user=__USERID__&action=attendance&forUI=courseList"),

            addNewClassroom: super.url('/courses'),
            addNewSubject: super.url('/newclassroom'),
            postAdminCourse: super.url('/edneedCourses/courseInfo'),
            deleteCourse: super.url('/edneedCourses/courseInfo/__ID__'),
            getSingleCourseInfoData: super.url('/edneedCourses/courseInfo/__ID__'),
            editCourseInfoData: super.url('/edneedCourses/courseInfo/__ID__'),
            filterAdminCourseList: super.url('/edneedCourses/courseList/?institute=__INSID__&__QUERY__=__VALUE__&kind=admin&search=__SEARCH__'),
            filterSearchAllAdminCourseList: super.url('/edneedCourses/courseList/?institute=__INSID__&__QUERY__=__VALUE__&kind=admin'),

            postTaxanomy: super.url('/edneedCourses/courseTaxanomy'),
            getCourseTaxanomy: super.url('edneedCourses/courseTaxanomy/__ID__'),
            patchCourseContent: super.url('edneedCourses/courseContent/__ID__'),
            getCourseContent: super.url('edneedCourses/courseContent/__ID__'),
            postAssignedData: super.url("/edneedCourses/assignCourses/__ID__"),
            filterAdminCourseClassroomList: super.url('/edneedCourses/courseList/?institute=__INSID__&classroom=[__CLASSROOM__]&subject=[__SUBJECTS__]&kind=admin'),
            assignToFilterAdminList: super.url('/edneedCourses/courseList/?institute=__INSID__&createdBy=[__ASSIGNTO__]&kind=admin')
        }
    }
}
export default new AdminCourseRequest();