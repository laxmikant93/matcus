import Request from "../../../Classes/Request";

class businessRequest extends Request {
  constructor() {
    super()
    this.business_endpoint = {
      getInstituteData: super.url("/authorization-middleware/getbusiness?business=__BUSINESS_ID__&type=__TYPE__", "middleware"),
      getBusinessCategory: super.url("/categoryService/categoryList", "ecommerce", "commonservices"),
      patchInstituteInfo: super.url('/authorization-middleware/businessdomain/__BUSINESS_ID__?type=__TYPE__', "middleware"),
      ecomWebsite: super.url('productService/getecommercebusiness/?__TYPE__=__VALUE__', "ecommerce"),
      smtpTestMail: super.url('/authorization-middleware/testmail', "middleware"),
      // smtpTestMail: super.url('/productService/testmail', "ecommerce"),
      getShopProduct: super.url("productService/product-list-client/_ID_?search=_searchValue_", "ecommerce"),
      homeProductData: super.url("/websiteDefaulttheme/UserActivatedTemplateV2?__QUERY__=__DOMAIN__", "commonservices"),
    }
  }
}
export default new businessRequest();
