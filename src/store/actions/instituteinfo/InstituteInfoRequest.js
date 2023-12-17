import Request from "../../../Classes/Request";

class InstitutePageWebsiteListRequest extends Request {
  constructor() {
    super();
    this.InstitutePageWebsiteListEndpoint = {
      InstitutePageWebsiteList: super.url(
        "/institute/?institute_subdomain=__SUBDOMAIN_NAME__"
      ),
      insInfoSocialLinks: super.url("/institute/__ID__"),
    };
  }
}
export default new InstitutePageWebsiteListRequest();
