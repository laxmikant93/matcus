import Request from "../../../Classes/Request";
class FeeRequest extends Request {
  constructor() {
    super();
    this.urlEndpoint = {
      FeeList: super.url("/FeeManagement/lmsFeestructure?institute=__INSID__"),
      PaymetnList: super.url("/paymentmode/feestructure?institute=__INSID__"),
      sortByLTH: super.url("/FeeManagement/lmsFeestructure?institute=__INSID__&fee=lth"),
      sortByHTL: super.url("/FeeManagement/lmsFeestructure?institute=__INSID__&fee=htl"),
      PostFee: super.url("/FeeManagement/lmsFeestructure"),
      EditFee: super.url("/FeeManagement/lmsFeestructure/__Id__"),
      DeleteFee: super.url("/FeeManagement/lmsFeestructure/__Id__"),
      StatusActive: super.url(
        "/FeeManagement/lmsFeestructure?institute=__INSID__&status=Active"
      ),
      availableCourses: super.url(
        "/FeeManagement/lmsFeeStructure/availableCourses?institute=__INSID__"
      ),
      StatusInActive: super.url(
        "/FeeManagement/lmsFeestructure?institute=__INSID__&status=Inactive"
      ),
      sortByFeeType: super.url("/FeeManagement/lmsFeestructure?institute=__INSID__&feetype=__TYPE__"),
      StatusSaved: super.url("/FeeManagement/lmsFeestructure?institute=__INSID__&status=Saved"),
      SearchFee: super.url(
        "/FeeManagement/lmsFeestructure?institute=__INSID__&search=__TITLE__"
      ),
      SingleFeeData: super.url("/FeeManagement/lmsFeestructure/__ID__"),
    };
  }
}
export default new FeeRequest();
