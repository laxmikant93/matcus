import Request from "../../../Classes/Request";

class AdmissionRequest extends Request {
    constructor() {
        super()
        this.AdmissionEndpoint = {
            getAdmission: super.url('/admission/?institute=__INSID__'),
            getApplicantlist: super.url('/admission/application/?institute=__INSID__&admission=__ID__'),
            getAdmissionSelection: super.url('/admission/__VID__'),
            getFilterAdmission: super.url('/admission/?institute=__INSID__&__FILTER__=__FILVAL__'),
            getFilterApplicant: super.url('/admission/application/?institute=__INSID__&admission=__ID__&__FILTER__=__FILVAL__'),
            getSearchFilterAdmission: super.url('/admission/?institute=__INSID__&search=__VAL__'),
            getSearchFilterApplicant: super.url('/admission/application/?institute=__INSID__&admission=__ID__&search=__VAL__'),
            post: super.url('/admission'),
            updateAdmission: super.url('/admission/__ID__'),
            deleteAdmission: super.url("/admission/__ID__"),
            listStatusUpdateAdmission: super.url("/admission/__ID__"),
            applicantlistStatusUpdateAdmission: super.url("/admission/application/__ID__"),
            applyAdmissionNotification:super.url("/notifications/applyadmission","commonservices")
        }
    }
}
export default new AdmissionRequest();