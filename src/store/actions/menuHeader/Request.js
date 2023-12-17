import Request from "../../../Classes/Request";

class menuHeaderRequest extends Request {
  constructor() {
    super();
    this.menuHeaderEndpoint = {
      getdynamicHeader: super.url("/menubar/getdynamicheader?instituteId=_Id_"),
      patchdynamicHeader: super.url("/menubar/patchdynamicheader/_Id_"),
      dynamicMenuSubheaders: super.url("/institute?institute_subdomain=__SUBDOMAIN__")
    }
  }
}
export default new menuHeaderRequest(); 