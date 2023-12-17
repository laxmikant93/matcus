import Request from "../../../Classes/Request";

class UserRequest extends Request {
  constructor() {
    super();
    this.request = {
      // userRole: super.url("userrole?$populate[]=user&$populate[]=institute&user=__ID__&$populate[]=role&isDeleted=false&$limit=100"),
      userRole: super.url("/userrolemicro/userInfo/?user=__ID__&industry=__INDUSTRY__", "commonservices"),
      userRolePrivateDomain: super.url("userrolemicro?$populate[]=user&$populate[]=institute&institute=__IID__&user=__ID__&$populate[]=role&isDeleted=false&$limit=100&industry=LMS", "commonservices"),
      user: super.url("user/__USERID__"),
      updateUserRole: super.url("userrolemicro/__USERROLEID__", "commonservices"),
    };
  }
}
export default new UserRequest();