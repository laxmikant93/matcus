import Request from "../../../Classes/Request";

class AnnouncementWebsiteListRequest extends Request {
    constructor(){
        super()
        this.AnnouncementWebsiteListEndpoint = {
            AnnouncementWebsiteList:super.url('/announcement?institute=__ID__'),
            // AnnouncementWebsiteList:super.url('/announcement'),
              
        }
    }
}

export default new AnnouncementWebsiteListRequest();