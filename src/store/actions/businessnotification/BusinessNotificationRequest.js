import Request from "../../../Classes/Request";

class BusinessNotificationRequest extends Request {
  constructor() {
    super();
    this.businessnotifications = {
      getAllnotification: super.url("/notifications/sendNotification/businessID/activeRole/Owner?industry=_TYPE_", "commonservices"),
      unseennotification: super.url("/notifications/patchunseen/businessID/activeRole/Owner?industry=_TYPE_", "commonservices"),
    };
  }
}

export default new BusinessNotificationRequest();
