import Request from "../../../../Classes/Request";

class CurrencyRequest extends Request {
  constructor() {
    super()
    this.endpoint = {
      adminCurrencies: super.url("productService/get-currency-language?business=__BUSINESS__&domain=__DOMAIN__&subdomain=__SUBDOMAIN__", "ecommerce")
    }
  }
}

export default new CurrencyRequest();