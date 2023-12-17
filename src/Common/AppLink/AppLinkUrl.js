import Url from "../../Classes/Url";

class AppLinkUrl extends Url {
    urlWithoutSubdmain() {
        let currentUrl = this.baseUrl()
        let subdomain = `${this.subdomain()}.`
        return currentUrl.replace(subdomain, '')
    }

    mainBaseUrl(extendedUrl = null) {
        if (extendedUrl != null) {
            extendedUrl = extendedUrl.substring(0, 1) === "/" ? extendedUrl.substring(1) : extendedUrl;
        }
        return `${this.urlWithoutSubdmain()}${extendedUrl}`;
    }

    createSubdomain(subdomainName, extendedUrl = null) {
        if (extendedUrl != null) {
            extendedUrl = extendedUrl.substring(0, 1) === "/" ? extendedUrl.substring(1) : extendedUrl;
        }
        else {
            extendedUrl = '';
        }
        return `${this.subdomainUrlGenerator().replace(this.placeholder, subdomainName)}${extendedUrl}`;
    }

    reserveDomains() {
        return process.env.REACT_APP_DOMAIN
    }

    privateDomain() {

        if (!this.reserveDomains()) {
            return false
        }

        let reserveDomains = undefined;
        reserveDomains = this.reserveDomains().split(",")
        if (reserveDomains && reserveDomains.length > 0) {
           
            return !reserveDomains.includes(this.getDomainName())
        }
        else {
            return false
        }

    }
}

export default new AppLinkUrl();