import Request from "../../../Classes/Request";

class LoginRequest extends Request {
  constructor() {
    super();
    this.loginEndpoint = {
      emailLogin:super.url("/authService/login")
    };
  }
}
export default new LoginRequest();