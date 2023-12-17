import Request from "../../../Classes/Request";

class EmployeeRequest extends Request {
  constructor() {
    super();
    this.employeeEndpoint = {
      employeeList: super.url('userrolemicro/getEmployee?institute=__INSID__&kind=__KIND__&industry=LMS', "commonservices"),
      deleteEmployee: super.url('/userrolemicro/__ID__', "commonservices"),
    };
  }
}
export default new EmployeeRequest();
