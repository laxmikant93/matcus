import Request from "../../../../Classes/Request";

class ProductRequest extends Request {
  constructor() {
    super()
    this.endpoint = {

      homeProductData: super.url("/websiteDefaulttheme/UserActivatedTemplateV2?__QUERY__=__DOMAIN__", "commonservices"),
      createProduct: super.url("productService/create-product", "ecommerce"),
      editProduct: super.url("productService/edit-product?status=__STATUS__&businessId=__businessID__&productId=__prodID__", "ecommerce"),
      editMultiProduct: super.url("productService/editMultiProduct/__STATUS__", "ecommerce"),
      getProductVendor: super.url("productService/getProductVendor", "ecommerce"),
      deleteProduct: super.url("productService/delete-product?condition=_CONDITION_&ids=_PRODUCTID_", "ecommerce"),
      productDetail: super.url("productService/getProductDetail?productId=__ID__", "ecommerce"),
      inventoryStatusChangeAPI: super.url("productService/stockStatus?variationId=__ID__&status=__STATUS__", "ecommerce"),
      //product list filters 
      getProductBusiness: super.url("productService/productlist-admin/__ID__", "ecommerce"),
      getProductListByCategoryCollection: super.url("productService/productlist-admin/__ID__", "ecommerce"),
      getProductListBySortby: super.url("productService/productlist-admin/__ID__?sortBy=_VALUE_", "ecommerce"),
      getProductListSearch: super.url("productService/productlist-admin/__ID__?search=_VALUE_", "ecommerce"),
      addMultipleProductToCollCat: super.url("productService/multipleproductassign?condition=_VALUE_", "ecommerce"),

      dashboardCount: super.url("productService/dashboardcount?business=__ID__", "ecommerce"),
      getProductList: super.url("productService/productList?__TYPE__=__DOMAIN__", "ecommerce"),
      filterProduct: super.url("productService/shop-filter?__TYPE__=__DOMAIN__", "ecommerce"),
      getProductDetail: super.url("productService/get-product?__QUERY__=__VALUE__&urlSlug=__SLUG__", "ecommerce"),
      shippingOrder: super.url("productService/updateOrder/_id_", "ecommerce"),

      getSlugAvailibilty: super.url("/productService/slugavailability?business=_BUSNIESSID_&slug=_VALUE_", "ecommerce"),
      getSkuAvailibilty: super.url("/productService/skuavailability", "ecommerce"),
      inventoryDetail: super.url("/productService/get-product?productId=_ID_", "ecommerce"),

      getSingleProductApi: super.url("/productService/get-product?productId=__PRODUCTID__", "ecommerce"),
      getShopProduct: super.url("productService/product-list-client/_ID_?search=_searchValue_", "ecommerce"),
      getDynamicFilterData: super.url('/productService/getFilters-client/__ID__', "ecommerce"),
      RejectedOrder: super.url("/productService/updateOrder/_id_", "ecommerce"),

      updateSubOrdershipping: super.url("/productService/updateSubOrderId", "ecommerce"),
      updateSubOrderFailDeli: super.url("/productService/shippedItemStatusChange/__ID__", "ecommerce"),
      getShippingDetails: super.url("/shipping-rate/shippingCharges/__BUSID__?pincode=__PINCODE__&country=__COUNTRY__&state=__STATE__", "ecommerce")
    }
  }
}

export default new ProductRequest();