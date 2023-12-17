import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Auth from "../../Classes/Auth";
// import AppLinkUrl from "../../Common/AppLink/AppLinkUrl";
import ScrollToTop from "../../Common/ScrollPageTop"
// import { getDomainServiceRouteCheck } from "../../store/actions/serviceWebsiteTemplate";
// import { getDomainRouteCheck } from "../../store/actions/WebsiteTemplate";
import WebsiteLayout from "../../WebsiteTemplateCustomization/WebsiteLayout";
import TheTranquillLayout from "../../WebsiteTemplateCustomization/WebsiteLayout/TheTranquillLayout";
import EcomLayout from "../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/EcomLayout";
import AuthLayout from "../AuthLayout";
// import Request from "../../Classes/Request";
import Footer from "./SubDomainFooter"
import Header from "./SubDomainHeader"
// import ComponentLoader from "../../Common/Loader/ComponentLoader";
import AppLinkUrl from "../../Common/AppLink/AppLinkUrl";
import { useEffect } from "react";


const SubdomainLayout = ({ children }) => {
  const { success, isOld, websiteType, businessInfoSuccess,
    businessInfoData, data } = useSelector((state) => {
      return {
        success: state.websiteTemplate.getTemplate.success,
        loading: state.websiteTemplate.getTemplate.loading,
        isOld: state.websiteTemplate.getTemplate.isOld,
        data: state.websiteTemplate.getTemplate.data,
        websiteType: state.websiteTemplate.getTemplate.websiteType,
        businessInfoSuccess: state.businessInfo.ecomWebsite.success,
        businessInfoData: state.businessInfo.ecomWebsite.data,

      }
    })

  // console.log(businessInfoSuccess, businessInfoData, "line 34", success)
  const { pathname } = useLocation()
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   // declare the data fetching function
  //   const fetchData = async () => {
  //     const WebsiteTemplateRequest = new Request();
  //     const query = AppLinkUrl.privateDomain() ? "domain" : "subdomain"
  //     const domain = AppLinkUrl.privateDomain() ? AppLinkUrl.getHost() : AppLinkUrl.subdomain()
  //     await WebsiteTemplateRequest.get(WebsiteTemplateRequest.url(`/websiteDefaulttheme/UserActivatedTemplateV2?${query}=${domain}`, "commonservices"),
  //       (success) => {
  //         dispatch(getDomainRouteCheck(success.data))
  //         dispatch(getDomainServiceRouteCheck(success.data))
  //       },
  //       (error) => {
  //         console.log(error)
  //       }
  //     );
  //   }
  //   // call the function
  //   if (!success && !loading) {
  //     if (AppLinkUrl.privateDomain() || AppLinkUrl.subdomain()) {
  //       fetchData().catch(console.error);
  //     }
  //   }

  //   // make sure to catch any error
  // }, [dispatch, loading, success])

  useEffect(() => {
    if (AppLinkUrl.subdomain()) {
      if (websiteType === "Ecommerce") {
        if (businessInfoSuccess && businessInfoData) {
          let link = document.querySelector("link[rel~='icon']");
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
          }
          document.title = businessInfoData.meta_title ? businessInfoData.meta_title : businessInfoData.business_name
          link.href = businessInfoData.favIcon ? businessInfoData.favIcon : "https://edneed-images-uat.s3.amazonaws.com/app_icon/edneed-app-icon-512x512.png";
        }
      } else if (websiteType === "Services") {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
        document.title = data && data.instituteData && data.instituteData.meta_title ? data.instituteData.meta_title : data.instituteData.business_name
        link.href = data && data.instituteData && data.instituteData.favIcon ? data.instituteData.favIcon : "https://edneed-images-uat.s3.amazonaws.com/app_icon/edneed-app-icon-512x512.png";
      } else if (websiteType === "LMS") {
        if (isOld === true) {
          let link = document.querySelector("link[rel~='icon']");
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
          }
          // document.title = data && data.instituteData && data.instituteData.meta_title ? data.instituteData.meta_title : data.instituteData.institute_name

          link.href = "https://edneed-images-uat.s3.amazonaws.com/app_icon/edneed-app-icon-512x512.png";

        } else {
          let link = document.querySelector("link[rel~='icon']");
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
          }
          document.title = data && data.instituteData && data.instituteData.meta_title ? data.instituteData.meta_title : data.instituteData.institute_name

          link.href = data && data.instituteData && data.instituteData.favIcon ? data.instituteData.favIcon : "https://edneed-images-uat.s3.amazonaws.com/app_icon/edneed-app-icon-512x512.png";
        }
      } else {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = "https://edneed-images-uat.s3.amazonaws.com/app_icon/edneed-app-icon-512x512.png";
      }
    }
  }, [businessInfoData, businessInfoSuccess, data, isOld, websiteType]);

  return (
    <>
      {
        AppLinkUrl.privateDomain() ?
          <React.Fragment>
            {
              Auth.isLogin() ? !success && "" : ""
            }
          </React.Fragment>
          // : !success && children
          : ""
      }
      {
        success || businessInfoSuccess ? isOld ?
          <>
            <React.Fragment>
              {
                Auth.isLogin() ?
                  <React.Fragment>
                    {
                      ['/', '/overview', '/miscellaneous', '/book_Appointment',
                        '/faculty', '/announcements', '/admission', '/feestructure', '/gallery', '/contactus',
                        '/vacancy', '/aboutus', '/services', '/faqs'].includes(pathname) ?
                        <React.Fragment> <Header /> {children} <Footer /> <ScrollToTop /></React.Fragment> :
                        <React.Fragment>

                          <AuthLayout children={children} />
                        </React.Fragment>
                    }
                  </React.Fragment> :
                  <React.Fragment>
                    <Header /> {children} <Footer /> <ScrollToTop />
                  </React.Fragment>

              }
            </React.Fragment>
          </>
          :
          businessInfoSuccess && businessInfoData.business_category === "Ecommerce" ?
            <EcomLayout children={children} />


            : websiteType === "Services" ?
              <TheTranquillLayout>
                {children}
              </TheTranquillLayout>
              :
              <React.Fragment>
                {
                  Auth.isLogin() ?
                    <React.Fragment>
                      {
                        ['/', '/overview', '/miscellaneous', '/book_Appointment',
                          '/faculty', '/announcements', '/admission', '/feestructure', '/gallery', '/contactus',
                          '/vacancy', '/aboutus', '/services', '/faqs'].includes(pathname) ?
                          <React.Fragment>
                            <WebsiteLayout>
                              {children}
                            </WebsiteLayout></React.Fragment> :
                          <React.Fragment>

                            <AuthLayout children={children} />
                          </React.Fragment>
                      }
                    </React.Fragment> :
                    <React.Fragment>
                      <WebsiteLayout>
                        {children}
                      </WebsiteLayout>
                    </React.Fragment>

                }
              </React.Fragment>

          : ""
      }

    </>
  )
}

export default SubdomainLayout