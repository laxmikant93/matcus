import Request from "../../../Classes/Request";

class FeeRequest extends Request {
  constructor() {
    super();
    this.urlEndpoint = {
      FeeList: super.url("/fee/feestructure?institute=__INSID__"),
      PaymetnList: super.url("paymentmode/feestructure?institute=__INSID__"),
      sortByLTH: super.url("/fee/feestructure?institute=__INSID__&fee=lth"),
      sortByHTL: super.url("/fee/feestructure?institute=__INSID__&fee=htl"),
      PostFee: super.url("/fee/feestructure"),
      EditFee: super.url("/fee/feestructure/__Id__"),
      DeleteFee: super.url("/fee/feestructure/__Id__"),
      StatusActive: super.url(
        "/fee/feestructure?institute=__INSID__&status=Active"
      ),
      StatusInActive: super.url(
        "/fee/feestructure?institute=__INSID__&status=Inactive"
      ),
      sortByFeeType: super.url("/fee/feestructure?institute=__INSID__&feetype=__TYPE__"),
      StatusSaved: super.url("/fee/feestructure?institute=__INSID__&status=Saved"),
      SearchFee: super.url(
        "/fee/feestructure?institute=__INSID__&search=__TITLE__"
      ),
      SingleFeeData: super.url("/fee/feestructure/__ID__"),
    };
  }
}
export default new FeeRequest();
