import Request from "../../../Classes/Request";

class instituteThemeRequest extends Request {
  constructor() {
    super();
    this.instituteThemeEndPoint = {
      getPublicTheme: super.url("/skintheme/public/_id_"),
      getDefaultsThemes: super.url("/skintheme/defaultskins"),
      getDefaultTheme: super.url("/skintheme/defaultskin/_id_"),
      getUserCustomeThemes: super.url("/skintheme/skins"),
      getUserCustomeTheme: super.url("/skintheme/skin/__ID__"),
      getActivateThemes: super.url("/skintheme/getuseractivate/theme/_id_"),
      getActivePrivateDomainTheme:super.url("/skintheme/getuseractivateWebsite/theme/?domain=_id_"),
      getActiveSubDomainTheme:super.url("/skintheme/getuseractivateWebsite/theme/?institute_subdomain=_id_"),
      activateCustomTheme: super.url("/skintheme/activatetheme/_id_"),
      deleteCustomTheme: super.url("/skintheme/deleteskin/_id_"),
      editCustomTheme: super.url("/skintheme/editskin/_id_"),
      createCustomTheme: super.url("/skintheme/create/_id_"),
      activateDefaultTheme: super.url("/skintheme/defaultactivatetheme/_id_"),
      cloneDefaultTheme: super.url("/skintheme/createclone/_id_"),
      previewDefaultThemes: super.url("/skintheme/defaultskin/_themeid_"),
      previewCustomeTheme: super.url("/skintheme/skin/_INSID_"),
      getSingleThemeOnPreview: super.url(
        "/skintheme/previewthemesingle/_THEMEID_?skintype=__TYPE__"
      ),
    };
  }
}

export default new instituteThemeRequest();
