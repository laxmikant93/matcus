import Request from "../../../Classes/Request";

class EdPartnerRequest extends Request {
  constructor() {
    super();
    this.EdPartnerEndpoint = {
      postEdPartner: super.url("/edneedPartner/createPartner"),
    }
  }
}
export default new EdPartnerRequest(); 