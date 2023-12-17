import Request from "../../../Classes/Request";

class InstituteAnnouncementRequest extends Request {
    constructor() {
        super()
        this.insAnnEndpoint = {
            find: super.url('announcement?institute=__INSTITUTE_ID__&$limit=__LIMIT__&$skip=__SKIP__&isStatus=Active'),
            get: super.url('announcement/__INS_ANNOUNCEMENT_ID_')
        }
    }
}


export default new InstituteAnnouncementRequest()