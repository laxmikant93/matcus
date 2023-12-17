import Request from "../../../Classes/Request"

class StudentHolidaysListRequest extends Request {
  constructor() {
    super()
    this.StudentHolidaysListEndpoint = {
      getStudentHolidaysList: super.url("/attendance/getHolidayList/?institute=__INSID__&user=__USERID__&date=__DATE__"),
      getStudentHolidaysListSortBy: super.url("/attendance/getHolidayList/?institute=__INSID__&date=__DATE__&__QUERY__=__VALUE__"),
    }
  }
}
export default new StudentHolidaysListRequest();