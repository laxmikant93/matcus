import Request from "../../../Classes/Request";

class registerUserRequest extends Request {
  constructor() {
    super();
    this.registerUserRequest = {
      postUser: super.url("/user")
    };
  }

}

export default new registerUserRequest();