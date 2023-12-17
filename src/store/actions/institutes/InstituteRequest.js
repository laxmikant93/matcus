import Request from "../../../Classes/Request";

class InstituteInfoRequest extends Request {
    constructor() {
        super();
        this.InstituteInfoRequest = {
            InstituteInfoRequest: super.url("/institute/__INS__",),
            instituteCountRequest: super.url("/authService/institutedatacount?institute=__INS__&owner=__OWNER__&type=__TYPE__"),
            checksubdomainAvaibility: super.url("/authorization-middleware/checksubdomainAvaibility?subdomain=_subdomain_&domain=_domain_", "middleware"),
            updateSubdomain: super.url("/authorization-middleware/businessdomain/_ID_?type=_TYPE_", "middleware")
        };
    }
}
export default new InstituteInfoRequest();
