import Request from "../../../Classes/Request";

class GalleryRequest extends Request {
  constructor() {
    super();
    this.galleryEndpoint = {
      gallery: super.url("/gallerymicro/managegallery?institute=__ID__&forUI=GalleryList&industry=type", "commonservices"),
      //editRead
      readGalleryId: super.url("/gallerymicro/managegallery/__GalleryId__?industry=type", "commonservices"),
      deleteGallery: super.url("/gallerymicro/managegallery/__GalleryId__?industry=type", "commonservices"),
      updateGallery: super.url("/gallerymicro/managegallery/__GalleryId__?industry=type", "commonservices"),
      fileupload: super.url("fs"),
      galleryNotification: super.url("/notifications/websitegallery/id","commonservices"),
      updateGalleryNotification: super.url("/notifications/editwebsitegallery/id","commonservices")
    };
  }
}

export default new GalleryRequest();
