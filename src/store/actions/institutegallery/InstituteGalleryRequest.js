import Request from "../../../Classes/Request";

class InstituteGalleryRequest extends Request {
    constructor() {
        super()
        this.insGalEndpoint = {
            find: super.url('gallery?forUI=GalleryListALL&institute=__INSTITUTE_ID__&$limit=__LIMIT__&$skip=__SKIP__&industry=__type__'),
            filterGalleryList: super.url('gallery?forUI=__FORUI__&institute=__INSTITUTE_ID__&$limit=__LIMIT__&$skip=__SKIP__&industry=__type__'),
            get: super.url('gallery/__INS_GALLERY_ID_')
        }
    }
}


export default new InstituteGalleryRequest()