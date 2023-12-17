import Request from "../../../Classes/Request";

class EcomCurrencyRequest extends Request {
  constructor() {
    super()
    this.EcomCurrencyEndpoint = {
      getCurrencyList: super.url('/productService/currency-list', "ecommerce"),
      postCurrency: super.url('/productService/manage-currency-language?business=_BUSINESS_', "ecommerce"),
      getSelectedCurrency: super.url('/productService/get-currency-language?business=_BUSINESS_', "ecommerce"),
      deleteCurrency: super.url('productService/delete-admin-currency?business=_BUSINESS_&code=_CODE_', "ecommerce"),
    }
  }
}
export default new EcomCurrencyRequest();
