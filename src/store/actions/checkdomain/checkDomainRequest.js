import Request from "../../../Classes/Request";

class checkDomain extends Request {
    constructor() {
        super()
        this.checkDomainRequest = {
            endpoint: super.url('/institute/__ID__'),
            patchInstituteInfo: super.url('/institute/__INS_ID__'),
            patchInstituteMiddlewareInfo: super.url('/authorization-middleware/businessdomain/__BUSINESS_ID__?type=__TYPE__', "middleware"),
            fileupload: super.url('fs'),
            infocheckdomain: super.url('/institute?institute_subdomain=__domain__')

        }
    }
    fileUpload(fileData, onSuccess, onError) {

        this.post(this.checkDomainRequest.fileupload, fileData, onSuccess, onError)
    }
}
export default new checkDomain();