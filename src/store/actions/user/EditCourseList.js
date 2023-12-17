import Request from "../../../Classes/Request";

class EditCourse extends Request {
  constructor() {
    super();
    this.coursedata = {
      endpoint: super.url("/courses"),
      singledata: super.url("/courses/__USERID__"),
    };
  }
  CourseCreate(name, userName, password, onSuccess, onError) {
    const CoursesData = {
      name: name,
    };
    this.post(this.coursedata.endpoint, CourseData, onSuccess, onError);
  }

  CourseRead(onSuccess, onError) {
    this.get(this.coursedata.endpoint, onSuccess, onError);
  }

  SingleCourseRead(id, onSuccess, onError) {
    // this.get(this.facultydata.singledata.replace(id),onSuccess,onError)
    this.get(
      this.coursedata.singledata.replace("__USERID__", id),
      onSuccess,
      onError
    );
  }

  CourseEdit(name, email, username, onSuccess, onError) {
    const CourseData = {
      name: name,
      username: username,
      email: email,
    };

    this.patch(this.coursedata.endpoint, FacultyData, onSuccess, onError);
  }
  CourseDelete(username, onSuccess, onError) {
    const CourseData = {
      username: username,
    };

    this.delete(this.coursedata.endpoint, FacultyData, onSuccess, onError);
  }
}
export default new EditCourse();
