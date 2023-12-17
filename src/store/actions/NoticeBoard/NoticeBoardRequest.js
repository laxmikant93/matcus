import Request from "../../../Classes/Request";
class NoticeBoardRequest extends Request {
  constructor() {
    super();
    this.noticeBoardList = {
      addNotice: super.url('/notices/createNotice', "commonservices"),
      editNotice: super.url('/notices/editNotice/__ID__', "commonservices"),
      getNotice: super.url('/notices/getNotice?institute=__INSID__&industry=__type__', "commonservices"),
      searchSortByNoticeList: super.url('/notices/getNotice?institute=__INSID__&isStatus=__VALUE__&industry=__type__', "commonservices"),
      getSingleNotice: super.url('/notices/getSingleNotice?noticeId=__ID__&industry=__type__', "commonservices"),
      deleteSingleNotice: super.url('/notices/deleteNotice/__ID__?industry=__type__', "commonservices"),
    };
  }
}
export default new NoticeBoardRequest();