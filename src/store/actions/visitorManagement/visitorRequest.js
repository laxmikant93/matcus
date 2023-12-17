import Request from "../../../Classes/Request";

class visitorRequest extends Request {
  constructor() {
    super();
    this.visitorEndpoint = {
      //teacher edit status
      getTeacherVisitorList: super.url("/visitor/getTeacherVisitorsList?institute=_ID_&user=_USERID_&date=_DATE_"),
      getAdminVisitorList: super.url("/visitor/getAllVisitor?institute=_ID_&date=_DATE_"),
      getTeacherSortList: super.url("/visitor/getTeacherVisitorsList?institute=_ID_&user=_USERID_&date=_DATE_&status=_VALUE_"),
      searchTeacherVisitor: super.url("/visitor/getTeacherVisitorsList?institute=_ID_&user=_USERID_&date=_DATE_&search=_VALUE_"),

      //admin,guard
      postVisitor: super.url("visitor/createVisitor"),
      getVisitorList: super.url("/visitor/getAllVisitor?institute=_Id_&date=_date_"),
      editVisitor: super.url("/visitor/editVisitorDetail/_Id_"),
      getSingleVisitor: super.url("/visitor/getSingleVisitor?visitorId=_Id_"),
      searchVisitor: super.url("/visitor/getAllVisitor?institute=_Id_&search=_value_&date=_date_"),
      sortVisitor: super.url("/visitor/getAllVisitor?institute=_Id_&status=_status_&date=_date_"),
    }
  }
}
export default new visitorRequest(); 