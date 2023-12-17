import Request from "../../../Classes/Request";

class CourseRequest extends Request {
    constructor() {
        super()
        this.classroomEndpoint = {
            postclassroom: super.url('/newclassroom'),
            getclassroomCourse: super.url('/newclassroom?course=__ID__&$limit=50'),
            deleteclassroom: super.url('/newclassroom/delete/__ID__'),
            updateclassroom: super.url('/newclassroom/__ID__'),
            getCourseInfoData: super.url('/newcourse/coursesList?institute=__ID__'),
            getCourseDataViaClassroom: super.url('/newcourse/CourseDataViaClassroom/__ID__'),
            updatecourse: super.url('/newcourse/editCourse/__ID__'),

        }
    }
}
export default new CourseRequest();