import Request from "../../../Classes/Request";

class edneedFeedRequest extends Request {

    constructor() {
        super()
        this.edneedFeedEndPoint = {
            communityfeed: super.url('/post?$populate[]=owner&$sort=-_id&$limit=__LIMIT__'),
            institutelisting: super.url('/institute/?$skip=__INC__&$limit=__LIMIT__'),
            instagramfeed: super.url('/'),
            institute_like_post: super.url("like"),
        }
    }
}

export default new edneedFeedRequest();