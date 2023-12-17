import Request from "../../../Classes/Request";

class InstituteFacultyRequest extends Request {

  constructor() {
    super()
    this.instituteFacultyEndpoint = {
      list: super.url('faculty/managefaculty?institute=__INSTITUTE_ID__&isDeleted=false&industry=__type__', "commonservices")
    }
  }

}

export default new InstituteFacultyRequest()