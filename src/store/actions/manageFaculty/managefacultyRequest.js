import Request from "../../../Classes/Request";

class FacultyRequest extends Request {
    constructor() {
        super()
        this.urlEndpoint = {
            // FacultyList:super.url('/managefaculty/__FACULTYID__'),
            FacultyList: super.url('/faculty/managefaculty?institute=__FACULTYID__&isDeleted=false&$limit=100&industry=__type__', "commonservices"),
            PostFaculty: super.url('/faculty/managefaculty?industry=__type__', "commonservices"),
            EditFaculty: super.url('/faculty/managefaculty/__Id__?industry=__type__', "commonservices"),
            getEditFaculty: super.url('/faculty/managefaculty/__Id__?industry=__type__', "commonservices"),
            DeleteFaculty: super.url('/faculty/managefaculty/__Id__?industry=__type__', "commonservices"),
        }
    }
}
export default new FacultyRequest();

// managefaculty/?institute=608013a105c0753bd018740b&isDeleted=false
// institute=&isDeleted=false