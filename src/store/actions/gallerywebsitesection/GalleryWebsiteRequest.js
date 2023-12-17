import Request from "../../../Classes/Request";

class GalleryWebsiteListRequest extends Request {
    constructor() {
        super()
        this.GalleryWebsiteListEndpoint = {
            GalleryWebsiteList: super.url('/gallerymicro/managegallery?institute=__ID__'),

        }
    }
}
export default new GalleryWebsiteListRequest();