import Request from "../../../Classes/Request";

class sectionTitleRequest extends Request {
  constructor() {
    super();
    this.sectionTitleEndpoint = {
      sectionTitleRead: super.url("/subheader/?institute=__ID__&industry=__INDUSTRY__", "commonservices"),
      sectionTitleUpdate: super.url("/subheader", "commonservices"),
    };
  }
}
export default new sectionTitleRequest();
