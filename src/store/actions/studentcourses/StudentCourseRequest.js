import Request from "../../../Classes/Request";

class StudentCourseRequest extends Request {
    constructor() {
        super()
        this.StudentCourseEndpoint = {
            getStudentCoursesList:super.url('/edneedCourses/courseList/?institute=__INSID__&owner=__USERID__&kind=student'),
            searchFilter:super.url('/edneedCourses/courseList/?institute=__INSID__&owner=__USERID__&kind=student&__QUERY__=__VALUE__'),
            getPerticularCourseDetails:super.url('/edneedCourses/courses/__ID__/?user=__USERID__&kind=__KIND__'),
            filterStudentCourseClassroomList: super.url('/edneedCourses/courseList/?institute=__INSID__&owner=__USERID__&classroom=[__CLASSROOM__]&subject=[__SUBJECTS__]&kind=student'),
            createdByFilterStudentCoursesList:super.url("/edneedCourses/courseList/?institute=__INSID__&owner=__OWNERID__&createdBy=[__VALUE__]&kind=student"),
            getPerticularSubjectCourseDetails:super.url('/edneedCourses/courses/__ID__/?subject=__SUBJECTID__'),
        }
    }
}
export default new StudentCourseRequest();