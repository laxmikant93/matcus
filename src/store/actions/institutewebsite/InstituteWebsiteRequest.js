import Request from "../../../Classes/Request";

class InstituteWebsiteRequest extends Request {
    constructor() {
        super()
        this.ins_website_endpoint = {
            institute_subdomain: super.url('institute?institute_subdomain=__SUBDOMAIN__'),
            institute_privatedomain: super.url('institute?domain=__DOMAIN__'),
            institute_like_post: super.url('like'),
            institute_like_get: super.url('like/?liked=__INSID__&user=__UID__'),
            institute_pwa_domain: super.url('institutepwa?domain=__DOMAIN__'),
            getPrivateDomainHeader: super.url("menubar/getdynamicheader?domain=__DOMAIN__"),
            getSubdomainHeader: super.url("menubar/getdynamicheader?subDomain=__SUBDOMAIN__")
        }
    }
}

export default new InstituteWebsiteRequest()