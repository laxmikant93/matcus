import Request from "../../../Classes/Request";

class WebsiteUIRequest extends Request {
    constructor(){
        super()
        this.WebsiteEndpoint = {
            Institute:super.url('/institute?institute_subdomain=__SUBDOMAIN__'),
       
        }
    }
}
export default new WebsiteUIRequest();