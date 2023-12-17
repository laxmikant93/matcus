import Request from "../../../Classes/Request";

class AnnouncemnetListRequest extends Request {

    constructor() {
        super()
        this.AnnouncementEndpoint = {
            announcement: super.url('/announcementmicro/get?institute=__ID__&isStatus=__VAL__&$limit=100&$skip=0&industry=__type__', "commonservices"),
            announcementFilter: super.url('/announcementmicro/get?institute=__ID__&isStatus=__VAL__&$limit=100&$skip=0&industry=__type__', "commonservices"),
            announcementCreate: super.url('/announcementmicro/create', "commonservices"),
            deleteAnnouncememt: super.url('/announcementmicro/delete?announcement=__AnnouncementId__&industry=__type__', "commonservices"),
            updateAnnouncement: super.url('/announcementmicro/update?announcement=__AnnouncementId__&industry=__type__', "commonservices"),
            createAnnouncementNotification: super.url('/notifications/addAnnouncement/id'),
            editAnnounceNotification: super.url('/notifications/EditAnnouncement/id')
            // fileupload:super.url('fs'),           
        }
    }

    // fileUpload(fileData,onSuccess,onError){

    //     this.post(this.AnnouncementEndpoint.fileupload,fileData,onSuccess,onError)
    // }
}

export default new AnnouncemnetListRequest();