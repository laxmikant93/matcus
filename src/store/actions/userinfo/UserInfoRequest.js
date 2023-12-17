import Request from "../../../Classes/Request";

class UserInfoRequest extends Request {
  constructor() {
    super();
    this.userinforequest = {
      userInfo: super.url("/userinfo?institute=__ID__&activeRole=__Role__"),
      updateUserInfo: super.url("/userinfo/__UserId__"),
      deleteUserInfo: super.url("/userinfo/__UserId__"),
      instituteUsersInfo: super.url("/userinfo?institute=__INS_ID__&activeRole=__Role__"),
      UserInfoList: super.url('/user?_id=__id__'),
      UserInfoListEdit: super.url('/userinfo/__id__')

    };
  }

}

export default new UserInfoRequest();
