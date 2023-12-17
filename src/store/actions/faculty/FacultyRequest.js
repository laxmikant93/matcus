import Request from "../../../Classes/Request";

class FacultyRequest extends Request {
  constructor() {
    super();
    this.facultyEndpoint = {
      faculty: super.url("/faculty"),
      deleteFaculty: super.url("/faculty/__FacultyId__"),
      updateFaculty: super.url("/faculty/__FacultyId__"),
    };
  }
}
export default new FacultyRequest();
