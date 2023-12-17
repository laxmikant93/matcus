import Request from "../../../Classes/Request";
// import Auth from "../../../Classes/Auth";
class InstituteRegisterRequest extends Request {

    constructor() {
        super()
        this.endpoint = {
            create: super.url("institute"),
            get: super.url('institute/__id__'),
            getBusinessInfoForEcommerce: super.url('/authorization-middleware/getbusiness?business=__id__&type=__TYPE__', "middleware"),
            patchBusinessInfo: super.url("/authorization-middleware/businessdomain/__id__/?type=__TYPE__", "middleware"),
            patchInstituteInfo: super.url("/authorization-middleware/businessdomain/__id__/?type=LMS", "middleware"),
            DashboardStepperUpdate: super.url("/authService/DashboardStepperUpdate")
        }
    }
}




export default new InstituteRegisterRequest();