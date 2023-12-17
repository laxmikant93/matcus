import Request from "../../../Classes/Request";

class EdneedUserRequest extends Request {
  constructor() {
    super();
    this.request = {
      userInfo: super.url("/onlineclasses"),
      updateClass: super.url("/onlineclasses/__ID__"),
      joineeList: super.url("/meet/zoomOnlineClass/__CLASSID__"),
      scheduleMeet: super.url("meet/google_onlineclass"),
      createonlineClassNotification: super.url("/notifications/onlineclass/id","commonservices")

    };
  }
}

export default new EdneedUserRequest();

