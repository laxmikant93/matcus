import Request from "../../../Classes/Request";

class PaymentModeRequest extends Request {
  constructor() {
    super();
    this.request = {
      paymentModes: super.url("/feestructure/paymentmode/?institute=__ID__"),
      postUpiDetails: super.url("/paymentmode"),
      postBankDetails: super.url("/paymentmode"),
      postPaypalDetails: super.url("/paymentmode"),
      postChequeDetails: super.url("/paymentmode"),
      updatePaymentDetails: super.url("/paymentmode/__ID__"),
      emailCheckUnique: super.url("/authService/EmailCheckUnique"),
      deletePaymentDetails: super.url("/paymentmode/__ID__"),
      paymentLists: super.url("/paymentmode/?institute=__ID__"),
      ifscValidation: super.url("/paymentmode/ifscValidator"),
      availablePaymentModes: super.url("/paymentmode?institute=__INSID__"),

      kycVerification: super.url("/feeManagement/instituteOnboarding?institute=_INS_")

    };
  }
}

export default new PaymentModeRequest();