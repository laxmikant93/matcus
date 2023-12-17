import Request from "../../../Classes/Request";

class FeeManagementStudentRequest extends Request {
  constructor() {
    super();
    this.FeeManagementEndpoint = {
      getStudentFees: super.url("FeeManagement/getStudentfee?classRoomId=__CLASSID__&institute=__INS__&studentId=__OWNER__&filter=_FILTER_"),
      getStudentCourseData: super.url("FeeManagement/getStudentCoursesData?institute=__INS__&user=__OWNER__"),
      createRazorPayOrder: super.url("feePayments/orders"),
      getOrderDetails: super.url("feePayments/orderGet?instituteId=__INSID__&owner=__STUDID__&classroom=__CLASSID__"),
      getStudentFeeViewDetails: super.url("feePayments/receipt/_ID_"),
      getStudentFeeViewSingle: super.url("FeeManagement/calculateStudentFee/__ID__"),
      getStudentInvoiceData:super.url("feePayments/studentFee?feeId=__ID__")
    };
  }
}
export default new FeeManagementStudentRequest();
