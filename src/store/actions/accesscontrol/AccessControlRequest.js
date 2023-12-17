import Request from "../../../Classes/Request";

class AccessControlRequest extends Request {
  constructor() {
    super()
    this.AccessControlEndpoint = {
      getTeahcerAccessControl: super.url('userrolemicro/getEmployee?institute=__INSID__&kind=__KIND__&industry=LMS', "commonservices"),
      getEmployeeAccessControl: super.url('/userrolemicro?institute=6086777f743b11099e13d0a5&role=5efd333cbe16b16e6b061b4a&kind=teacher&limit=10&skip=0', "commonservices"),
      updateStaffAccessControl: super.url('/userrolemicro/PatchAccessRolesMultiple', "commonservices"),

    }
  }
}
export default new AccessControlRequest();