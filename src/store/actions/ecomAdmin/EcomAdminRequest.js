import Request from "../../../Classes/Request";

class EcomAdminRequest extends Request {
  constructor() {
    super()
    this.EcomAdminEndpoint = {
      getCategoryEcomAdmin: super.url('categoryService/getallcategories?business=__BUSINESS__', "ecommerce"),
      createCategoryEcomAdmin: super.url('/categoryService/createcategory', "ecommerce"),
      editCategoryEcomAdmin: super.url('/categoryService/editcategory', "ecommerce"),
      editCategoryPositionEcomAdmin: super.url('/categoryService/positionedit', "ecommerce"),
      editDragCategoryEcomAdmin: super.url('/categoryService/editcategoriesdrag?business=__INS__&newposition=__NEWPOS__&category=__CAT__&subcategory=__SUBCAT__&subsubcategory=__SUBSUBCAT__&movinglevel=__MOVING__&movingcategoryid=__MCAT__&movingcategoryupperid=__MUCAT__', "ecommerce"),
    }
  }
}
export default new EcomAdminRequest();
