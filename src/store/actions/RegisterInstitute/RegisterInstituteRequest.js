import Request from "../../../Classes/Request";

class RegisterInstituteRequest extends Request {
  constructor() {
    super();
    this.request = {
      postInstituteOffline: super.url("/offlineregistration"),
      postInstituteOnline: super.url("/institute"),
    };
  }

}

export default new RegisterInstituteRequest();