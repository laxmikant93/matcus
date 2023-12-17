import Request from "../../../Classes/Request";

class ServiceTemplateRequest extends Request {
  constructor() {
    super();
    this.templateEndpoint = {
      getTemplateForEdit: super.url("/websiteDefaulttheme/getAggregatorUserTemplate?owner=__OWNERID__&industryId=__BUSINESSID__&industry=__INDUSTRY__&template=__TEMPLATEID__&__QUERY__=__VALUE__", "commonservices"),
      getPreviewTemplate: super.url("/websiteDefaulttheme/getPreviewTemplate?owner=__OWNERID__&industryId=__BUSINESSID__&industry=__INDUSTRY__&template=__TEMPLATEID__", "commonservices"),
      domainTemplate: super.url("/websiteDefaulttheme/UserActivatedTemplateV2?__QUERY__=__VALUE__", "commonservices"),
    
      editTemplate: super.url("/websiteDefaulttheme/EditTemplateUser", "commonservices"),
      getGalleryAlbum: super.url("/gallerymicro/managegalleryuploadSingle/__GALLERYID__?industry=Services", "commonservices"),
      getGallery: super.url("/gallerymicro/managegallery?institute=__InstituteId__&forUI=GalleryList&industry=__INDUSTRY__", "commonservices"),

      createTemplateUser: super.url('/websiteDefaulttheme/CreateUserTheme', "commonservices"),
      getUserTemplates: super.url("/websiteDefaulttheme/getUserAllTemplateSimple?owner=__OWNERID__&__TYPE__=__BUSINESSID__&industry=__INDUSTRY__", "commonservices"),
      activateTemplateUser: super.url("/websiteDefaulttheme/ActivateTemplateUser", "commonservices"),

      getSelectedTemplate: super.url("/websiteDefaulttheme/UpdateTemplateThemeSpecific?owner=__OWNERID__&industryId=__BUSINESSID__&industry=__INDUSTRY__&theme=__THEMEID__&templateID=__TEMPLATEID__&isDefaulttheme=__TYPE__", "commonservices"),
     
      getServiceDetails: super.url("/appointmentBooking/service?type=Services", "commonservices"),
      getFacultyDetails: super.url("/faculty/managefaculty/__FACULTYID__?industry=Services", "commonservices"),
     
      getCategoryDetails: super.url("/appointmentBooking/getCateoryDetail?type=Services&category=_CATEGORYID_&business=__BUSINESSID__", "commonservices"),
      getAllServicesOfCategory: super.url("/appointmentBooking/getAllServicesEndUserSide?business=_BUSINESSID_&owner=_OWNERID_&type=Services", "commonservices"),
      getSingleOfCategory: super.url("/appointmentBooking/getSingleCateoryDetail?type=Services&category=_CATEGORYID_&business=__BUSINESSID__", "commonservices"),
    };
  }
}
export default new ServiceTemplateRequest();
