import Request from "../../../Classes/Request";

class edneedYoutubeRequest extends Request {

    constructor() {
        super()
        this.edneedYoutubeEndpoint = {
            getAllYoutubeVideos: super.url('/videos/youtubevideo'),
            sortUserType: super.url("/videos/youtubevideo/?userType=__USERTYPE__"),
            getStaticVideos: super.url("/videos/homepageVideo?videoName=__VIDEONAME__")
        }
    }
}

export default new edneedYoutubeRequest();