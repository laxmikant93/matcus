import Request from "../../../Classes/Request";

class VacancyRequest extends Request {
    constructor() {
        super()
        this.VacancyEndpoint = {
            getVacancy: super.url('/vacancy/?institute=__INSID__&industry=__type__', "commonservices"),
            getApplicantlist: super.url('/vacancy/applicant/?institute=__INSID__&vacancy=__ID__&industry=__type__', "commonservices"),
            getVacancySelection: super.url('/vacancy/__VID__?industry=__type__', "commonservices"),
            getFilterVacancy: super.url('/vacancy/?institute=__INSID__&__FILTER__=__FILVAL__&industry=__type__', "commonservices"),
            getFilterApplicant: super.url('/vacancy/applicant/?institute=__INSID__&vacancy=__ID__&__FILTER__=__FILVAL__&industry=__type__', "commonservices"),
            getSearchFilterVacancy: super.url('/vacancy/?institute=__INSID__&search=__VAL__&industry=__type__', "commonservices"),
            getSearchFilterApplicant: super.url('/vacancy/applicant/?institute=__INSID__&vacancy=__ID__&search=__VAL__&industry=__type__', "commonservices"),
            post: super.url('/vacancy', "commonservices"),
            updateVacancy: super.url('/vacancy/__ID__', "commonservices"),
            deleteVacancy: super.url("/vacancy/__ID__?industry=__type__", "commonservices"),
            listStatusUpdateVacancy: super.url("/vacancy/__ID__", "commonservices"),
            getListStatusUpdateVacancy: super.url("/vacancy/__ID__?industry=__type__", "commonservices"),
            applicantlistStatusUpdateVacancy: super.url("/vacancy/applicant/__ID__", "commonservices"),
            applyVacancynotification: super.url("/notifications/applyvacany", "commonservices")
        }
    }
}
export default new VacancyRequest();