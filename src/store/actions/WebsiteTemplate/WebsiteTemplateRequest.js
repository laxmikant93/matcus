import Request from "../../../Classes/Request";

class websiteTemplateRequest extends Request {
  constructor() {
    super();
    this.templateEndpoint = {
      createTemplate: super.url("/websiteDefaulttheme/createUserTemplateStartup", "commonservices"),
      templateList: super.url("/websiteDefaulttheme/getDefaultAllTemplateSimple?industry=__INDUSTRY__", "commonservices"),
      deleteUserTemplate: super.url("/websiteDefaulttheme/DeleteQueryAll", "commonservices"),
      getTemplateForEdit: super.url("/websiteDefaulttheme/getAggregatorUserTemplate?owner=__OWNERID__&industryId=__BUSINESSID__&industry=__INDUSTRY__&template=__TEMPLATEID__", "commonservices"),
      getPreviewTemplate: super.url("/websiteDefaulttheme/getPreviewTemplate?owner=__OWNERID__&industryId=__BUSINESSID__&industry=__INDUSTRY__&template=__TEMPLATEID__", "commonservices"),
      domainTemplate: super.url("/authorization-middleware/getTemplateDynamic?__QUERY__=__VALUE__", "middleware"),

      getSelectedTemplate: super.url("/websiteDefaulttheme/UpdateTemplateThemeSpecific?owner=__OWNERID__&industryId=__BUSINESSID__&industry=__INDUSTRY__&theme=__THEMEID__&templateID=__TEMPLATEID__&isDefaulttheme=__TYPE__", "commonservices"),
      editTemplate: super.url("/websiteDefaulttheme/EditTemplateUser", "commonservices"),
      createTemplateUser: super.url('/websiteDefaulttheme/CreateUserTheme', "commonservices"),
      getUserTemplates: super.url("/websiteDefaulttheme/getUserAllTemplateSimple?owner=__OWNERID__&__TYPE__=__BUSINESSID__&industry=__INDUSTRY__", "commonservices"),
      activateTemplateUser: super.url("/websiteDefaulttheme/ActivateTemplateUser", "commonservices"),
      getGalleryAlbum: super.url("/gallerymicro/managegalleryuploadSingle/__GALLERYID__?industry=__TYPE__", "commonservices"),
      getGallery: super.url("/gallerymicro/managegallery?institute=__InstituteId__&forUI=GalleryList", "commonservices")
    };
  }
}
export default new websiteTemplateRequest();
