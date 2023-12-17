import Request from "../../../Classes/Request";

class GalleryUploadRequest extends Request {
  constructor() {
    super();
    this.galleryuploadEndpoint = {
      // galleryUpload: super.url("/gallerymicro/managegalleryupload?gallery=__GalleryDataId__&$limit=100&industry=type"),
      // galleryUpload: super.url("/gallerymicro/managegallery?institute=__GalleryDataId__&forUI=__GalleryList__&industry=type"),
      galleryUpload: super.url("/gallerymicro/managegalleryuploadSingle/__GalleryDataId__?industry=type", "commonservices"),


      postgalleryUpload: super.url("/gallerymicro/managegalleryupload", "commonservices"),
      deleteGalleryUpload: super.url("/gallerymicro/managegalleryupload/__GalleryUploadId__?industry=type", "commonservices"),
      getupdateGalleryUpload: super.url("/gallerymicro/managegalleryuploadSingleForEdit/__GalleryDataId__?industry=type", "commonservices"),
      updateGalleryUpload: super.url("/gallerymicro/managegalleryupload/__GalleryDataId__", "commonservices"),
      updateGalleryUploadNotification: super.url("/notifications/editwebsitegallery/:id","commonservices"),
    };
  }
}

export default new GalleryUploadRequest();
