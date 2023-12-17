import Request from "../../../Classes/Request";

class UserSideListAppointmentRequest extends Request {
  constructor() {
    super();
    this.UserListEndpoint = {
      getuserBookingList: super.url("/appointmentBooking/getUserAppointment/user?type=__type__", "commonservices"),
      getUserBookingListSort: super.url("/appointmentBooking/getUserAppointment/user?sort=_VALUE_&type=__type__", "commonservices"),
      getBookinguserListSearch: super.url("/appointmentBooking/getUserAppointment/user?services=[SERVICEID]&search=_VALUE_&type=__type__", "commonservices"),

      editusermylist: super.url("/appointmentBooking/edituserAppointment/id?type=__type__", "commonservices"),
      searchusermylist: super.url(""),
    }
  }
}
export default new UserSideListAppointmentRequest(); 