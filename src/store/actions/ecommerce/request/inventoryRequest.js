import Request from "../../../../Classes/Request";

class inventoryRequest extends Request {
  constructor() {
    super()
    this.endpoint = {
      getAdminInventoryList: super.url("productService/inventory-list?businessId=_BUSNIESSID_&page=__PAGE__&limit=__LIMIT__", "ecommerce"),
      inventoryDeleteReq: super.url("productService/delete-product?condition=_CONDITION_&ids=_INVENTORYID_", "ecommerce"),
      searchInventoryReq: super.url("productService/inventory-list?businessId=_BUSNIESSID_&search=__SEARCH__", "ecommerce"),
      inventoryListInOutStock: super.url("productService/inventory-stock-status?variation=_VARIATIONID_&status=_STATUSVALUE_", "ecommerce")
    }
  }
}

export default new inventoryRequest();