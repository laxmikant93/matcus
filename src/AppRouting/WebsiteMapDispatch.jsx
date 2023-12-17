import { getEcomWebsiteTemplate } from "../store/actions/businessInfo";
import { setDefaultProductList, getHomeProductTemplate, getProductDetails } from "../store/actions/ecommerce/action/product";

import { getDomainServiceRouteCheck } from "../store/actions/serviceWebsiteTemplate";
import { getDomainRouteCheck } from "../store/actions/WebsiteTemplate";
export const WEBSITE_TEMPLATE_MAP_STATE_TO_PROPS = (state) => {
  return {
    templateInfo: state.websiteTemplate.getTemplate,
  };
};

export const WEBSITE_TEMPLATE_MAP_DISPATCH_TO_PROPS = (dispatch) => {
  return {
    getProductDetails: (item) => dispatch(getProductDetails(item)),
    loadWebsiteTemplate: (item) => dispatch(getDomainRouteCheck(item)),
    loadServiceTemplate: (item) => dispatch(getDomainServiceRouteCheck(item)),
    getHomeProductTemplate: (item) => dispatch(getHomeProductTemplate(item)),
    getEcomWebsiteTemplate: (item, type, query, domain) => dispatch(getEcomWebsiteTemplate(item, type, query, domain)),
    getProductList: (item, query, domain) => dispatch(setDefaultProductList(item, query, domain)),
  };
};
