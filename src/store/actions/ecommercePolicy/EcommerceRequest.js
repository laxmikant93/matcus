import Request from "../../../Classes/Request";

class EcommerceRequest extends Request {
  constructor() {
    super();
    this.AppointmentEndpoint = {
      geteommercepolicy: super.url('/authorization-middleware/getpolicy?industry=BUSINESSID&business=_TYPE_', "middleware"),
      editeommercepolicy: super.url('/authorization-middleware/editpolicy?industry=_TYPE_&policy=POLICYID', "middleware"),
    }
  }
}
export default new EcommerceRequest(); 