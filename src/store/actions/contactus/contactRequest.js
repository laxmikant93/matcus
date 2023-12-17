import Request from "../../../Classes/Request";

class sendRequest extends Request {

    constructor() {
        super()
        this.contactusEndpoint = {
            contactusUrl: super.url("contact/contactus", "commonservices"),
            getContacts: super.url("contact/getcontactus?instituteId=_Id_&sortOrder=_sortValue_&limit=__LIMIT__&search=_searchValue_&tileStatus=_tileValue_&skip=__SKIP__&industry=__TYPE__", "commonservices"),
            sortContactList: super.url("/contact/getcontactus?instituteId=_Id_&sortOrder=_sortValue_&limit=__LIMIT__&skip=__SKIP__&industry=__TYPE__", "commonservices"),
            searchContactList: super.url("/contact/getcontactus?instituteId=_Id_&search=_searchValue_&limit=__LIMIT__&skip=__SKIP__&industry=__TYPE__", "commonservices"),
            downloadExcelSheet: super.url("contact/downloadContactUs", "commonservices")

        }
    }
}

export default new sendRequest();