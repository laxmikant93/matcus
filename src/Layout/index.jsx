import React, { Fragment, useEffect } from "react";
import AppLinkUrl from "../Common/AppLink/AppLinkUrl";
// import Header from "../";
import Auth from "../Classes/Auth";
import WithoutAuthLayout from "./WithoutAuthLayout";
import AuthLayout from "./AuthLayout";
import SubdomainLayout from "./SubdomainLayout";
import CommonError from "../Common/CommonError";
import SuccessMessagePopup from "../Common/SuccessMessagePopup";
import NotificationPopup from "../Common/NotificationPopup";
import { useLocation } from "react-router-dom";
// import WebsiteLayoutVespertine from "../WebsiteTemplateCustomization/WebsiteLayout/WebsiteLayout_Vespertine";
// import WebsiteLayout_Defaultine from "../WebsiteTemplateCustomization/WebsiteLayout/WebsiteLayout_Defaultine";
import { useSelector } from "react-redux";
// import { findPrivateDomain } from "../store/actions/institutewebsite";
// import Cookies from "../Classes/Cookies";
import ScrollToTop from "../App/Home/ScrollToTop";
import MessageToast from "../Common/MessageToast/MessageToast";
import { data, isWebView } from "../CommonFunctions";
// import UserDetailPopup from "../App/Admin/AccountSetting/UserDetailPopup";

const Layout = ({ children }) => {
  // const dispatch = useDispatch();
  const { pathname } = useLocation()
  const { websiteType } = useSelector((state) => {
    return {
      websiteType: state.websiteTemplate.getTemplate.websiteType,
    }
  })
  const conditionalRender = () => {
    if (pathname.includes("/theme-sidebar") || pathname.includes("/service-template-preview") || pathname.includes('/service-theme-sidebar') || pathname.includes("/ecommerce/invoice") || pathname === "/check-domain" || pathname === "/create-skin" || pathname === "/skin-theme" || pathname === "/auth/logout" || pathname.includes('/website-template-preview/') || pathname.includes('/community') || pathname.includes('/dashboard/student-online-test')) {
      return false
    } else {
      return true
    }
  }
  const conditionRenderWithoutAuth = () => {
    if (pathname.includes("/request-demo/thankyou") || pathname.includes("/contact/thankyou")) {
      return false
    } else {
      return true
    }
  }

  return (
    // !pathname.includes("/dashboard/student-online-test/") &&
    // !pathname.includes("/create-skin") &&
    // !pathname.includes("/skin") &&
    // !pathname.includes("printInvoice") &&
    // !pathname.includes("/preview-skintheme") &&
    // !pathname.includes("/loginv1") &&
    // !pathname.includes("/ecommerce") &&
    // !pathname.includes("/print-report-card") && (
    <Fragment>

      {(AppLinkUrl.subdomain() || AppLinkUrl.privateDomain()) ? (
        <React.Fragment>
          {
            websiteType==="LMS"?
            <SubdomainLayout children={children} />:children
          }
        </React.Fragment>
      ) : (
        Auth.isLogin() ? (
          <React.Fragment>
            {
              conditionalRender() ? <AuthLayout children={children} /> : children
            }
          </React.Fragment>

          // <AppHeader />
        ) : (

          conditionRenderWithoutAuth() ? < WithoutAuthLayout children={children} /> : children

        )
      )}
      <CommonError />
      <SuccessMessagePopup />
      <MessageToast />
      <NotificationPopup />
      <ScrollToTop />
    </Fragment>
  )
  // );
}
export default Layout;
