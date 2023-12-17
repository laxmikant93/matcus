import { postStudentFee } from ".";
import Request from "../../../Classes/Request";

class FeeManagementRequest extends Request {
  constructor() {
    super();
    this.FeeManagementEndpoint = {
      getInstituteCourses: super.url("/FeeManagement/getInstituteAllCoursesData?institute=_INS_&owner=_OWNER_&limit=_LIMIT_&skip=_SKIP_"),
      InstituteCourseInfiniteScroll: super.url("/FeeManagement/getInstituteAllCoursesData?institute=_INS_&owner=_OWNER_&skip=_SKIP_&limit=_LIMIT_&search=_SEARCH_"),

      getInstituteFeeStructureList: super.url("/FeeManagement/getInstitutesStudentfee?institute=_INS_&classRoomId=_CLASSROOM_&filter=_FILTER_&date=_DATE_&search=_SEARCH_&limit=_LIMIT_&skip=_SKIP_"),
      getInstituteFeeStructureListScrolling: super.url("/FeeManagement/getInstitutesStudentfee?institute=_INS_&classRoomId=_CLASSROOM_&limit=_LIMIT_&filter=_FILTER_&date=_DATE_&search=_SEARCH_&skip=_SKIP_"),

      EditStudentFeeStructure: super.url("/FeeManagement/editStudentFee/_ID_"),


      getStudentCollectFee: super.url("/FeeManagement/getStudentfee/_ID_"),

      postStudentCollectFee: super.url("/FeeManagement/collectFee/_ID_"),

      feeStructureExist: super.url("/FeeManagement/feeStructureExist?institute=_INS_&owner=_OWNER_"),

      razorPayAccount: super.url("/feePayments/createaccount"),


      EditFee: super.url("/FeeManagement/activateFeeStructure/__Id__"),

      postExcelSheetColumns: super.url("/FeeManagement/downloadFeeManagement")

    };
  }
}
export default new FeeManagementRequest();
