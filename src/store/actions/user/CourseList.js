import Request from "../../../Classes/Request";

class CoursesList extends Request {
  constructor() {
    super();
    this.coursesdata = {
      endpoint: super.url("/courses"),
      coursedat: super.url("/courses/__USERID__"),
    };
  }
  CreateCourse(title, classRoom, onSuccess, onError) {
    const CourseData = {
      title: title,
      classRoom: classRoom,
    };
    this.post(this.coursesdata.endpoint, CourseData, onSuccess, onError);
  }

  GetCourses(onSuccess, onError) {
    this.get(this.coursesdata.endpoint, onSuccess, onError);
  }

  GetSingleCourse(id, onSuccess, onError) {
    // this.get(this.facultydata.singledata.replace(id),onSuccess,onError)
    this.get(
      this.coursesdata.coursedata.replace("__USERID__", id),
      onSuccess,
      onError
    );
  }

  CourseEdit(name, _id, onSuccess, onError) {
    const CourseData = {
      name: name,
      _id:_id
    };

    this.patch(this.coursedata.coursedat, CourseData, onSuccess, onError);
  }
  DeleteCourse(name, _id ,onSuccess, onError) {
    const CourseData = {
      name: name,
      _id: _id
    };

    this.delete(this.coursedata.endpoint, CourseData, onSuccess, onError);
  }
}
export default new CoursesList();
