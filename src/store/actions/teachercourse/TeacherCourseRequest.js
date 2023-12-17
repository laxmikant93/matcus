import Request from "../../../Classes/Request";

class TeacherCourseRequest extends Request {
    constructor() {
        super()
        this.TeacherCourseEndpoint = {
            getTeacherCoursesList:super.url('/edneedCourses/courseList/?institute=__INSID__&owner=__OWNERID__&kind=teacher'),
            sortByTeacherCoursesList:super.url('/edneedCourses/courseList/?institute=__INSID__&owner=__OWNERID__&__TERM__=__VALUE__&kind=teacher'),
            getPerticularCourseDetails:super.url('/edneedCourses/courses/__ID__'),
            deleteTeacherCourse:super.url('/edneedCourses/courseInfo/__ID__'),
            filterCourseClassroomTeacherList:super.url("/edneedCourses/courseList/?institute=__INSID__&owner=__OWNERID__&classroom=[__CLASSROOM__]&subject=[__SUBJECTS__]&kind=teacher"),
            createdByFilterTeacherList:super.url("/edneedCourses/courseList/?institute=__INSID__&owner=__OWNERID__&createdBy=[__VALUE__]&kind=teacher")
        }
    }
}
export default new TeacherCourseRequest();