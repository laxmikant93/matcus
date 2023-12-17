import Request from "../../../Classes/Request";

class InvitationHistoryRequest extends Request {
  constructor() {
    super()
    this.InvitationHistoryEndpoint = {
      getInvitationHistoryList: super.url('/invitationhistorymicro/?institute=__INSID__&role=__ROLE__&forUI=__UILIST__'),
      deleteInvitationHistoryList: super.url('/invitationhistorymicro/__ID__'),
      resendInvitationHistoryList: super.url('/invitationhistorymicro/__ID__'),
      searchInvitationHistoryList: super.url('/invitationhistorymicro/?institute=__INSID__&role=__ROLE__&search=__VAL__&forUI=__UILIST__'),
      MultiSelectInvitationHistoryList: super.url('/invitationhistorymicro/?institute=__INSID__&role=__ROLE__&course=[__COURSE__]&classroom=[__CLASSROOM__]&forUI=teacherList'),
      MultiSelectStudentInvitationHistoryList: super.url('/invitationhistorymicro/?institute=__INSID__&role=__ROLE__&course=[__COURSE__]&forUI=teacherList'),
      sortByInvitationHistoryList: super.url('/invitationhistorymicro/?institute=__INSID__&role=__ROLE__&__SortBY__=__VAL__&forUI=__UILIST__'),
    }
  }
}
export default new InvitationHistoryRequest();