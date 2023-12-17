import Auth from "./Auth";
import AppLinkUrl from "../Common/AppLink/AppLinkUrl";

class Api {
  constructor() {
    this.apiConfig = {
      mode: "production", // development || production || productionqa
      development: {
        protocol: "http", // http or https
        host: "localhost",
        port: 5000,
        prefix: "",
        verticaltype:"Edneed"
      },
      production: {
        protocol: "https", // http or https
        host: "api.edneed.com", //18.213.245.99
        dynamicHost: ".edneed.com",
        port: "",
        prefix: "",
        verticaltype:"Edneed"
      },
      productionqa: {
        protocol: "https", // http or https
        host: "api.unicated.com", //3.208.183.54
        port: "",
        dynamicHost: ".unicated.com",
        prefix: "",
        verticaltype:"Edneed"
      },
      productiondev: {
        protocol: "https", // http or https
        host: "api.getmelight.com", //3.215.96.215
        port: "",
        dynamicHost: ".getmelight.com",
        prefix: "",
        verticaltype:"Edneed"
      },
    };
  }

  /**
   * @type {*} return type: non returnable
   * @param {*} key : key is required for @config method
   * @param {*} value : any value for passed kay
   * @param {*} mode :
   */

  config(key, value, mode) {
    if (this.apiConfig[mode].hasOwnProperty(key)) {
      this.apiConfig[mode][key] = value;
    }
  }

  /**
   * @type {*} non returnable
   * @param {*} mode : production or development
   */
  setMode(mode) {
    if (mode === "production" || mode === "development") {
      this.apiConfig.mode = mode;
    } else {
    }
  }

  /**
   * @type {*} : return
   * @param : null,
   */
  getBaseUrl(dynamicUrl) {

    return this.apiConfig.mode === "production"
      ? this.productionUrl(dynamicUrl)
      : this.getApiBaseUrl(dynamicUrl);
  }

  /**
   * @type : return
   * @productionUrl method returns api production URL
   */

  productionUrl(dynamicUrl) {
    const productionDetail = this.apiConfig.production;
    let productionUrl;
    if (dynamicUrl) {

      productionUrl =
        productionDetail.protocol + "://" + dynamicUrl + productionDetail.dynamicHost;
    } else {
      productionUrl =
        productionDetail.protocol + "://" + productionDetail.host;
    }
    // productionUrl =
    //   productionDetail.protocol + "://" + productionDetail.host;
    productionUrl +=
      productionDetail.port > 0 ? ":" + productionDetail.port + "/" : "/";
    productionUrl += productionDetail.prefix
      ? productionDetail.prefix + "/"
      : "";


    return productionUrl;
  }

  /**
   * @type : return
   * @developmentUrl method returns api development URL
   */

  developmentUrl() {
    const developmentDetail = this.apiConfig.development;
    let developmentUrl =
      developmentDetail.protocol + "://" + developmentDetail.host;
    developmentUrl +=
      developmentDetail.port > 0 ? ":" + developmentDetail.port + "/" : "/";
    developmentUrl += developmentDetail.prefix
      ? developmentDetail.prefix + "/"
      : "";
    return developmentUrl;
  }

  getApiBaseUrl(dynamicUrl) {
    const developmentDetail = this.apiConfig[this.apiConfig.mode];
    let developmentUrl
    if (dynamicUrl) {
      developmentUrl =
        developmentDetail.protocol + "://" + dynamicUrl + developmentDetail.dynamicHost;
    } else {
      developmentUrl =
        developmentDetail.protocol + "://" + developmentDetail.host;
    }
    developmentUrl +=
      developmentDetail.port > 0 ? ":" + developmentDetail.port + "/" : "/";
    developmentUrl += developmentDetail.prefix
      ? developmentDetail.prefix + "/"
      : "";

    return developmentUrl;
  }

  /**
   * @type : return, It will return complete api url along with passed @extendedUrl. If @extendedUrl will not passed then only base url will be return
   * @param {*} extendedUrl : optional params
   */
  url(extendedUrl = null, dynamicUrl) {

    if (extendedUrl != null) {
      extendedUrl =
        extendedUrl.substring(0, 1) === "/"
          ? extendedUrl.substring(1)
          : extendedUrl;
    }
    return extendedUrl
      ? `${this.getBaseUrl(dynamicUrl)}${extendedUrl}`
      : this.getBaseUrl(dynamicUrl);
  }

  /**
   * @type : return
   * @param: null
   * @description : header
   */
  getApiheader() {
    const { rbac, rbacid } = Auth.rbacToken();
    if (AppLinkUrl.privateDomain()) {
      return {
        "Content-Type": "application/json",
        token: Auth.token(),
        hash: Auth.hash(),
        rbac: rbac,
        rbacid: rbacid,
        mailerUrl: AppLinkUrl.mainBaseUrl("/"),
        domainname: AppLinkUrl.getDomainName(),
        verticaltype:this.apiConfig[this.apiConfig.mode].verticaltype
      };
    } else {
      return {
        "Content-Type": "application/json",
        token: Auth.token(),
        hash: Auth.hash(),
        rbac: rbac,
        rbacid: rbacid,
        mailerUrl: AppLinkUrl.mainBaseUrl("/"),
        verticaltype:this.apiConfig[this.apiConfig.mode].verticaltype
      };
    }
  }

  getAuthToken() {
    return Auth.token();
  }

  getNonLoginApiHeader() {
    return {
      "Content-Type": "application/json",
    };
  }
}

export default Api;
