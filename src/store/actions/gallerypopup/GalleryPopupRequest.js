import Request from "../../../Classes/Request";

class GalleryPopupRequest extends Request {

    constructor() {
        super()
        this.galleryPopupEndpoint = {
            get: super.url("galleryupload?gallery=__GALLERYID__&$populate[]=gallery&$limit=__LIMIT__&featuredFlag=true&$skip=__SKIP__"),
            getKind: super.url("galleryupload?gallery=__GALLERYID__&kind=__KIND__&featuredFlag=true&$populate[]=gallery&$limit=__LIMIT__&$skip=__SKIP__")
        }
    }
}

export default new GalleryPopupRequest()