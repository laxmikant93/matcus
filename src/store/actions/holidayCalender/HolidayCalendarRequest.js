import Request from "../../../Classes/Request";

class HolidayCalendarRequest extends Request {
  constructor() {
    super();
    this.holidayCalendarEndpoint = {
      addHoliday:super.url('/attendance/addHoliday'),
      editHoliday:super.url('/attendance/editHoliday/__ID__'),
      getSingleHoliday:super.url("/attendance/getHoliday/__ID__"),
      deleteSingleHoliday:super.url("/attendance/deleteHoliday/__ID__"),
      getAdminHolidayList:super.url("/attendance/getHolidayList/?institute=__INSID__&date=__DATE__"),
      getTeacherHolidayList:super.url("/attendance/getHolidayList/?institute=__INSID__&owner=__OWNERID__&date=__DATE__"),
      searchSortAdminHolidayList:super.url("/attendance/getHolidayList/?institute=__INSID__&date=__DATE__&__QUERY__=__VALUE__"),
      searchSortTeacherHolidayList:super.url("/attendance/getHolidayList/?institute=__INSID__&owner=__OWNERID__&date=__DATE__&__QUERY__=__VALUE__"),
      classroomFilterAdminHolidayList:super.url("/attendance/getHolidayList/?institute=__INSID__&date=__DATE__&course=[__VALUES__]"),
      classroomFilterTeacherHolidayList:super.url("/attendance/getHolidayList/?institute=__INSID__&owner=__OWNERID__&date=__DATE__&course=[__VALUES__]")
    };
  }
}
export default new HolidayCalendarRequest();