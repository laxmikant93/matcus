import React, { lazy } from 'react'
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom'
import LoginWithEmailv1 from "../App/Auth/AuthV1/LoginWithEmail";
import Dashboard from '../App/Dashboard';
// import ComponentLoader from '../Common/Loader/ComponentLoader';
// import { getSavedCustomerTemplate } from '../store/actions/ecommerce/action/auth';
// import error404 from '../../Common/Error404';
// import EcommerceProtectedRoutes from './ProtectedRoutes';
import AboutPages from '../WebsiteTemplateCustomization/PageImports/AboutUs'
import ContactPages from '../WebsiteTemplateCustomization/PageImports/Contact'
import TeamPages from '../WebsiteTemplateCustomization/PageImports/Team'
import AnnouncementsPages from '../WebsiteTemplateCustomization/PageImports/Announcements'
import VacancyPages from '../WebsiteTemplateCustomization/PageImports/Vacancy'
// import GalleryPages from '../WebsiteTemplateCustomization/PageImports/Gallery'
// import ServicePage from "../WebsiteTemplateCustomization/PageImports/Service"
import CategoryPage from "../WebsiteTemplateCustomization/PageImports/Category"
import MiscellaneousPage from "../WebsiteTemplateCustomization/PageImports/Miscellaneous"
import ServicePageDetails from "../WebsiteTemplateCustomization/PageImports/Service"
import ProfilePageDetails from "../WebsiteTemplateCustomization/PageImports/Profile"
import FacilitiesPage from "../WebsiteTemplateCustomization/PageImports/Facility"
import TestimonialPage from '../WebsiteTemplateCustomization/PageImports/testimonial'
import GalleryListPages from '../WebsiteTemplateCustomization/PageImports/GalleryList'



// import ServicesPage from '../WebsiteTemplateCustomization/PageImports/Service'

import EmpanelmentPage from '../WebsiteTemplateCustomization/PageImports/EmpanelmentPage'
import NoticeBoardPage from '../WebsiteTemplateCustomization/PageImports/NoticeBoard'
import LMSRoutes from './LmsRoutes';
import AppointmentThankYouPage from '../InstituteWebsite/AppointmentThankYouPage';
import EcomNewTemHome from "../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/Home/Home"
import EcomNewShopPage from "../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/shopPage/ShopPage";

import EcomProductpage from "../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/ProductPage/ProductPage";
import ContactUs from "../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/ContactUs/Contact";
import AboutUs from "../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/AboutUs/AboutUS";
import GuestLogin from '../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/GuestLogin/index';
import GuestOrderDetail from '../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/GuestLogin/GuesrOrderDetail/GuestOrderDetail';
import CurrencySelector from '../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/HeaderLayout/MobileCurrencySelector/MobileCurrencySelector';
import PageNotFound from '../Common/PageNotFound/PageNotFound';
// const EcomProductpage = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/ProductPage/ProductPage"));
// const EcomNewTemHome = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/Home/Home"));
// const AboutUs = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/AboutUs/AboutUS"));
// const ContactUs = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/ContactUs/Contact"));


const CollectionPage = lazy(() => import('../WebsiteTemplateCustomization/SectionComponent/Collection/TheTranquill/Collection'));
const CollectionListPage = lazy(() => import( '../WebsiteTemplateCustomization/SectionComponent/Collection/TheTranquill/CollectionListPage'));


const WebsiteBookAppointment = lazy(() => import("../InstituteWebsite/WebsiteBookAppointment"));
const WebsiteMyBooking = lazy(() => import("../App/AdminDashboard/BookAppointmentUserside/MyBooking"));

const Logout = lazy(() => import("../App/Auth/Logout"));
const WebsiteServiceList = lazy(() => import("../InstituteWebsite/WebsiteServiceList"));

const TheTranquillHome = lazy(() => import('../WebsiteTemplateCustomization/TheTranquill'));
const EcomTempHome = lazy(() => import("../WebsiteTemplateCustomization/websiteTempleteEcommerce/LayoutComponent/Home"));
const EcomFooter = lazy(() => import("../WebsiteTemplateCustomization/websiteTempleteEcommerce/FooterLayout/Footer"));
// new template ecommerce

const EcomNewLogin = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/LoginSignUp/CustomerLoginWithEmail"));
const EcomOTPLogin = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/LoginSignUp/CustomerLoginWithOTP"));
//SignUp
const EcomNewSignup = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/LoginSignUp/CustomerSignup"));
const CustomerSignupOtpVerify = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/LoginSignUp/CustomerSignupOtpVerify"))
// const EcomProductpage = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/ProductPage/ProductPage"));
const EcomCart = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/Cart/Cart"));
const OrderConfirm = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/OrderConfirm/OrderConfirm"));
const MyOrders = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/MyOrders/MyOrders"));
const OrderDetails = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/OrderDetails/OrderDetails"));
const MyAccount = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/MyAccount/MyAccount"));
const SavedAddress = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/SavedAddress/SavedAddress"));
const MyProfile = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/MyProfile/MyProfile"));
const WishList = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/WishList/WishList"));
const ReturnPolicy = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/ReturnPolicy/ReturnPolicy"));
const TermAndCondition = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/TermAndCondition/TermAndCondition"));
const FAQS = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/FAQS/FAQS"));
const EcomPaymentStart = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/Payment/InitialPaymentPage"));
const EcomRazorAccountCreate = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/RazorPay/CreateAccount"));
const EcomPaymentModePage = lazy(() => import("../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/PaymentMode/PaymentMode"));
// const EcommerceDashboard = lazy(() => import("../App/Dashboard/EcommerceDashboard"));
const InstituteWebsite = lazy(() => import('../InstituteWebsite'))
const Template = lazy(() =>
  import("../WebsiteTemplateCustomization")
);

const TemplateRoutes = () => {
  const { success, isOld, websiteType, businessInfoSuccess, businessInfoData } = useSelector((state) => {
    return {
      success: state.websiteTemplate.getTemplate.success,
      isOld: state.websiteTemplate.getTemplate.isOld,
      websiteType: state.websiteTemplate.getTemplate.websiteType,
      businessInfoSuccess: state.businessInfo.ecomWebsite.success,
      businessInfoData: state.businessInfo.ecomWebsite.data,
    }
  })
  // console.log(success, isOld, websiteType, businessInfoSuccess, businessInfoData, "line 84")

  // useEffect(() => {
  //   // declare the data fetching function
  //   const fetchData = async () => {
  //     const WebsiteTemplateRequest = new Request();
  //     const query = AppLinkUrl.privateDomain() ? "domain" : "subdomain"
  //     const domain = AppLinkUrl.privateDomain() ? AppLinkUrl.getHost() : AppLinkUrl.subdomain()
  //     await WebsiteTemplateRequest.get(WebsiteTemplateRequest.url(`/websiteDefaulttheme/UserActivatedTemplateV2?${query}=${domain}`, "commonservices"),
  //       (success) => {
  //         switch (success?.data?.type) {
  //           case "Ecommerce":
  //             dispatch(getDomainRouteCheck(success.data))
  //             dispatch(getHomeProductTemplate(success.data.data))
  //             dispatch(getEcomWebsiteTemplate(success.data.data.BusinessInfo))
  //             break;
  //           case "Services":
  //             dispatch(getDomainRouteCheck(success.data))
  //             dispatch(getDomainServiceRouteCheck(success.data))
  //             break;
  //           case "LMS":
  //             dispatch(getDomainRouteCheck(success.data))
  //             break;

  //           default:
  //             dispatch(getDomainRouteCheck(success.data))
  //             break;
  //         }
  //         // dispatch(getDomainRouteCheck(success.data))
  //         // console.log("app routing")
  //       },
  //       (error) => {
  //         console.log(error)
  //       }
  //     );
  //   }
  //   // call the function
  //   if (!success) {
  //     if (AppLinkUrl.privateDomain() || AppLinkUrl.subdomain()) {
  //       fetchData().catch(console.error);
  //     }
  //   }

  //   // make sure to catch any error
  // }, [dispatch, success])

  return (
    <React.Fragment>
    {websiteType==="LMS"? 
    <Routes>

      {
        success || businessInfoSuccess ? isOld === true ?
          <React.Fragment>
            <Route path="/overview" element={<InstituteWebsite/>} />
            <Route path="/faculty" element={<InstituteWebsite/>} />
            <Route path="/announcements" element={<InstituteWebsite/>} />
            <Route path="/admission" element={<InstituteWebsite/>} />
            <Route path="/feestructure" element={<InstituteWebsite/>} />
            <Route path="/facility" element={<InstituteWebsite/>} />
            <Route path="/gallery" element={<InstituteWebsite/>} />
            <Route path="/gallery-list" element={<InstituteWebsite/>} />
            <Route path="/contactus" element={<InstituteWebsite/>} />
            <Route path="/vacancy" element={<InstituteWebsite/>} />
            <Route path="/aboutus" element={<InstituteWebsite/>} />
            <Route path="/services" element={<InstituteWebsite/>} />
            <Route path="/faqs" element={<InstituteWebsite/>} />
            <Route path="/miscellaneous" element={<InstituteWebsite/>} />
            <Route path="/book-appointment/:_id" element={<WebsiteBookAppointment/>} />
            <Route path="/blogs" element={<InstituteWebsite/>} />
            <Route path="/service_List" element={<InstituteWebsite/>} />

            <Route path="/auth/login" element={LoginWithEmailv1} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/auth/logout" element={<Logout/>} />
            <Route path="/" element={<InstituteWebsite/>} />
            {/* <Route path="/noticeboard" element={<InstituteWebsite/>} />
                  <Route path="/add-new-notice" element={<InstituteWebsite/>} /> */}
            {/** end private domain */}
            {/* Redirect not found and other subdomain routes to subdomain */}
            <Route path="*" element={<InstituteWebsite/>} />

          </React.Fragment> :
          <React.Fragment>
            {
              businessInfoSuccess && businessInfoData.business_category === "Ecommerce" ?
                <React.Fragment>
                  <Route path="/ecomFooter" element={<EcomFooter/>} />
                  <Route path="/customer-login" element={<EcomNewLogin/>} />
                  <Route path="/customer-login-with-otpv1/:contact" element={<EcomOTPLogin/>} />
                  <Route path="/customer-signup" element={<EcomNewSignup/>} />
                  <Route path="/customer-signup-otp-verify/:type/:value" element={<CustomerSignupOtpVerify/>} />
                  <Route path="/ecommerce/addproduct" element={<ecommerceAddProduct/>} />
                  <Route path="/ecomTemHome" element={<EcomTempHome/>} />
                  <Route path="/ecomFooter" element={<EcomFooter/>} />
                  <Route path="/ecomDefaultTemp" element={<EcomNewTemHome/>} />

                  <Route path="/products" element={<EcomNewShopPage/>} exact />
                  <Route path="/products/:prodId" element={<EcomProductpage/>} exact />
                  <Route path="/guestlogin" element={<GuestLogin/>} exact />
                  <Route path="/Adrees-Details-WL" element={<GuestLogin/>} exact />
                  <Route path="/Payment-Details-WL" element={<GuestLogin/>} exact />
                  <Route path="/ecom-orderDetails" element={<GuestOrderDetail/>} exact />

                  <Route path="/products?search=" element={<EcomNewShopPage/>} exact />
                  <Route path="/category/:categoryslug" element={<EcomNewShopPage/>} exact />
                  <Route path="/category/:categoryslug/:subcategoryslug" element={<EcomNewShopPage/>} exact />
                  <Route path="/category/:categoryslug/:subcategoryslug/:subsubcategoryslug" element={<EcomNewShopPage/>} exact />
                  {/* <Route path="/ecom-productPage/:prodId" element={EcomProductpage} /> */}
                  <Route path="/ecom-cart" element={<EcomCart/>} />
                  <Route path="/ecom-orderConfirm/:status" element={<OrderConfirm/>} />
                  <Route path="/ecom-myOrders" element={<MyOrders/>} />
                  <Route path="/ecom-orderDetails/:orderId/:productId" element={<OrderDetails/>} />
                  <Route path="/ecom-order/initiatePayment" element={<EcomPaymentStart/>} />
                  <Route path="/ecom-RazorPay/create-account" element={<EcomRazorAccountCreate/>} />
                  <Route path="/ecom-myaccount" element={<MyAccount/>} />
                  <Route path="/ecom-savedaddress" element={<SavedAddress/>} />
                  <Route path="/ecom-myprofile" element={<MyProfile/>} />
                  <Route path="/ecom-wishlist" element={<WishList/>} />
                  <Route path="/ecom-aboutus" element={<AboutUs/>} />
                  <Route path='/ecom-paymode/:id' element={<EcomPaymentModePage/>} />

                  <Route path="/ecom-contactus" element={<ContactUs/>} />
                  <Route path="/ecom-returnpolicy" element={<ReturnPolicy/>} />
                  <Route path="/ecom-tnc" element={<TermAndCondition/>} />
                  <Route path="/ecom-faqs" element={<FAQS/>} />
                  <Route path="/ecom-currency-selector" element={<CurrencySelector/>} />
              


                  <Route path="/" element={<EcomNewTemHome/>} exact/>
                  
        <Route path="*" element={<PageNotFound/>} />
                  {/* <Route path="*" element={error404} /> */}

                </React.Fragment>
                : websiteType === "Services" ?
                  <React.Fragment>
                    <Route path="/customer-login" element={<EcomNewLogin/>} />
                    <Route path="/customer-signup" element={<EcomNewSignup/>} />
                    <Route path="/faculty" element={TeamPages["TheTranquill_TeamPage"]} />
                    <Route path="/customer-login-with-otpv1/:contact" element={<EcomOTPLogin/>} />
                    <Route path="/customer-signup-otp-verify/:type/:value" element={<CustomerSignupOtpVerify/>} />
                    <Route path="/aboutus" element={AboutPages["TheTranquill_AboutUsPage"]} />
                    <Route path="/contactus" element={ContactPages["TheTranquill_ContactPage"]} />
                    <Route path="/miscellaneous" element={MiscellaneousPage["TheTranquill_MiscellaneousPage"]} />
                    <Route path="/categories" element={CategoryPage["TheTranquill_CategoryPage"]} />
                    <Route path="/service-detail/:_id" element={ServicePageDetails["TheTranquill_ServicePageDetails"]} />
                    <Route path="/profile-detail/:_id" element={ProfilePageDetails["TheTranquill_ProfilePageDetails"]} />
                    <Route path="/facilities" element={FacilitiesPage["TheTranquill_FacilityPage"]} />
                    <Route path="/announcements" element={AnnouncementsPages["TheTranquill_AnnouncementsPage"]} />
                    <Route path="/vacancy" element={VacancyPages["TheTranquill_VacancyPage"]} />
                    <Route path="/gallery" element={<TheTranquillHome/>} />
                    <Route path="/testimonials" element={TestimonialPage["TheTranquill_TestimonialPage"]} />
                    <Route path="/gallery-list" element={GalleryListPages["TheTranquill_GalleryListPage"]} />
                    <Route path="/service" element={ServicePageDetails["TheTranquill_ServicePageDetails"]} />
                    <Route path="/empanelment" element={EmpanelmentPage["TheTranquill_EmpanelmentPage"]} />
                    <Route path="/category-services/:_id" element={ServicePageDetails["TheTranquill_ServicePageDetails"]} />
                    <Route path="/center-of-excellence" element={NoticeBoardPage["TheTranquill_NoticeBoardPageCOE"]} />
                    <Route path="/select-appointment-service" element={<WebsiteServiceList/>} />
                    <Route path="/book-appointment/:_id" element={<WebsiteBookAppointment/>} />
                    <Route path="/my-booking" element={<WebsiteMyBooking/>} />
                    <Route path="/collections" element={<CollectionPage/>} />
                    <Route path="/collection/:_id" element={<CollectionListPage/>} />
                    <Route path="/appointment-ThankYou" element={<AppointmentThankYouPage/>} />
                    <Route path="/" element={<TheTranquillHome/>} />
                    {/* <Route path="*" element={error404} /> */}
                    
        <Route path="*" element={<PageNotFound/>} />
                  </React.Fragment>
                  : <React.Fragment>

                    <Route path="/overview" element={<Template/>} />
                    <Route path="/faculty" element={<Template/>} />
                    <Route path="/announcements" element={<Template/>} />
                    <Route path="/admission" element={<Template/>} />
                    <Route path="/feestructure" element={<Template/>} />
                    <Route path="/facility" element={<Template/>} />
                    <Route path="/gallery" element={<Template/>} />
                    <Route path="/gallery-list" element={<Template/>} />
                    <Route path="/contactus" element={<Template/>} />
                    <Route path="/vacancy" element={<Template/>} />
                    <Route path="/aboutus" element={<Template/>} />
                    <Route path="/services" element={<Template/>} />
                    <Route path="/faqs" element={<Template/>} />
                    <Route path="/miscellaneous" element={<Template/>} />
                    <Route path="/privacypolicy" element={<Template/>} />

                    <Route path="/auth/login" element={<LoginWithEmailv1/>} />
                    <Route path="/service_List" element={<Template/>} />
                    {/* <Route path="/" element={InstituteWebsite} /> */}
                    <Route path="/auth/logout" element={Logout} />
                    <Route path="/" element={<Template/>} />
                    
        <Route path="*" element={<PageNotFound/>} />
                    {/* <Route path="/noticeboard" element={InstituteWebsite} />
                <Route path="/add-new-notice" element={InstituteWebsite} /> */}
                    {/** end private domain */}
                    {/* Redirect not found and other subdomain routes to subdomain */}
                    {/* <Route path="*" element={Template} /> */}
                    {/* <Route path="*" element={error404} /> */}

                  </React.Fragment>
            }</React.Fragment>
          : 
          <Route path="*" element={<PageNotFound/>} />
      }
      {/* <Route path="/" exact element={InstituteWebsite} /> */}
      <Route path="/*" element={<LMSRoutes />}/>
      <Route path="*" element={<PageNotFound/>} />
    </Routes >:<PageNotFound/>}
    </React.Fragment>
  )
}
export default TemplateRoutes