import Request from "../../../Classes/Request";

class WebsiteUIfacultyRequest extends Request {
  constructor() {
    super();
    this.websiteuifacultyRequest = {
      InstituteFaculty: super.url("/userinfo?institute=__ID__"),      
    };
  }
}
export default new WebsiteUIfacultyRequest();
