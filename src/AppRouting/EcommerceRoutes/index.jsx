import React from 'react'
import { Switch,Route } from 'react-router-dom'
import PageNotFound from '../../Common/PageNotFound/PageNotFound';
// import error404 from '../../Common/Error404';
import EcommerceProtectedRoutes from './ProtectedRoutes';
// const EcomTempHome = lazy(() => import("../../WebsiteTemplateCustomization/websiteTempleteEcommerce/LayoutComponent/Home"));
// const EcomFooter = lazy(() => import("../../WebsiteTemplateCustomization/websiteTempleteEcommerce/FooterLayout/Footer"));
// // new template ecommerce
// const EcomNewTemHome = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/Home/Home"));
// const EcomNewShopPage = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/shopPage/ShopPage"));
// const EcomNewLogin = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/LoginSignUp/Login"));
// const EcomNewSignup = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/LoginSignUp/Signup"));
// const EcomProductpage = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/ProductPage/ProductPage"));
// const EcomCart = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/Cart/Cart"));
// const OrderConfirm = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/OrderConfirm/OrderConfirm"));
// const MyOrders = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/MyOrders/MyOrders"));
// const OrderDetails = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/OrderDetails/OrderDetails"));
// const MyAccount = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/MyAccount/MyAccount"));
// const SavedAddress = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/SavedAddress/SavedAddress"));
// const MyProfile = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/MyProfile/MyProfile"));
// const WishList = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/WishList/WishList"));
// const AboutUs = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/AboutUs/AboutUS"));
// const ContactUs = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/ContactUs/Contact"));
// const ReturnPolicy = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/ReturnPolicy/ReturnPolicy"));
// const TermAndCondition = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/TermAndCondition/TermAndCondition"));
// const FAQS = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/FAQS/FAQS"));
// const EcomPaymentStart = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/Payment/InitialPaymentPage"));
// const EcomRazorAccountCreate = lazy(() => import("../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/RazorPay/CreateAccount"));
// // const EcommerceDashboard = lazy(() => import("../App/Dashboard/EcommerceDashboard"));
// const ecommerceAddProduct = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/AddProduct"));
const EcommerceRoutes = () => {
  return (
    <React.Fragment>
      <Switch>
        <EcommerceProtectedRoutes />
        
        <Route path="*" component={PageNotFound} />
      </Switch>

    </React.Fragment>
  )
}
export default EcommerceRoutes