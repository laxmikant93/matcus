import Request from "../../../Classes/Request";

class serviceRequest extends Request {
  constructor() {
    super();
    this.serviceEndpoint = {
      servicesRead: super.url("/services/?institute=__ID__&industry=__type__", "commonservices"),
      servicesPost: super.url("/services", "commonservices"),
      serviceDelete: super.url("/services/__Id__?industry=__type__", "commonservices"),
      searchService: super.url("/services/?institute=__ID__&search=__TITLE__&industry=__type__", "commonservices"),
      sortService: super.url("/services/?institute=__ID__&isStatus=__STATUS__&industry=__type__", "commonservices"),
      getSingleService: super.url("/services/__Id__?industry=__type__", "commonservices"),
      serviceUpdate: super.url("/services/__Id__", "commonservices"),
    };
  }
}
export default new serviceRequest();
