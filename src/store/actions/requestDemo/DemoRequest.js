import Request from "../../../Classes/Request";

class DemoRequest extends Request {
  constructor() {
    super();
    this.demoRequestEndpoint = {
      postDemoRequestData: super.url("/requestdemo"),
    };
  }
}
export default new DemoRequest();
