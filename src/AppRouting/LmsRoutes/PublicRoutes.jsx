import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import error404 from '../../Common/Error404';
import PageNotFound from '../../Common/PageNotFound/PageNotFound';
import ThemeSidebar from '../../ThemeCustomizeSidebar/ThemeSidebar';
import TemplateRoutes from '../TemplateRoutes';
import ProtectedRoutes from './ProtectedRoutes';

const ContactUs = lazy(() => import("../../App/StaticPages/ContactUs"));

const AboutUs = lazy(() => import("../../App/StaticPages/AboutUs"));
const Modal = lazy(() => import("../../Modal"));
const Products = lazy(() => import("../../App/Home/EdProducts"));
const ChannelPartners = lazy(() => import("../../App/Home/EdPartners"));
const MobilePrivacyPolicy = lazy(() => import('../../App/StaticPages/MobilePrivacyPolicy'));

const PrivacyPolicy = lazy(() => import("../../App/StaticPages/PrivacyPolicy"));
const Terms = lazy(() => import("../../App/StaticPages/Terms"));
const CookiePolicy = lazy(() => import("../../App/StaticPages/CookiePolicy"));
// Institute
const InstituteListing = lazy(() =>
  import("../../App/Institute/InstituteListing")
);
const ProfileReviewList = lazy(() =>
  import("../../App/EdneedReview/ProfileReviewList")
);
const EdneedFeed = lazy(() => import("../../App/Feed"));
const EdneedVideo = lazy(() => import("../../App/EdneedVideo"));

const Faqs = lazy(() => import("../../App/StaticPages/Faqs"));
const PublicProfile = lazy(() => import("../../App/PublicProfile"));
const PersonalProfileList = lazy(() => import("../../App/PersonalProfileList"));
const DomainCart = lazy(() => import("../../App/PaymentFlow/DomainCart"));
const PaymentSummary = lazy(() =>
  import("../../App/PaymentFlow/Payment/PaymentSummary")
);
// **** Domain Registration Start***//
const AbandonedCart = lazy(() =>
  import("../../App/PaymentFlow/DomainCart/AbandonedCart")
);
const InvoiceRedirect = lazy(() =>
  import("../../App/PaymentFlow/Payment/InvoiceRedirect")
);

const PaymentRazor = lazy(() =>
  import("../../App/PaymentFlow/Payment/PaymentRazor")
);
const PaymentInvoice = lazy(() =>
  import("../../App/PaymentFlow/Payment/PaymentInvoice")
);
// landing register institute
const RegisterInstitute = lazy(() => import("../../App/Landing/Main"));

// create website of institute
const CreateWebsite = lazy(() => import("../../App/Landing/CreateWebsite"));

// preview website
// const PreviewWebsite = lazy(() => import("../App/Landing/PreviewWebsite"));
const WebsitePendingEmailVerification = lazy(() =>
  import("../../App/Landing/WebsitePendingEmailVerification")
);
const CheckDomain = lazy(() => import("../../App/Admin/Website/CheckDomain"));
// Institute
// request demo
const RequestDemo = lazy(() => import("../../App/RequestDemo"));
const ThankyouPage = lazy(() => import("../../Common/ThankyouPage"));
// request demo
// Site Under Maintenance
const SiteUnderMaintenance = lazy(() =>
  import("../../App/StaticPages/SiteUnderMaintenance")
);
/// MyCart Domain
const MyCart = lazy(() => import("../../App/PaymentFlow/DomainCart"));
const privatedDomainRedirectSwitch = lazy(() =>
  import("../../InstituteWebsite/privateDomainRedirectSwitch")
);

const Community = lazy(() => import("../../App/Community"));
const CommentOnQuestion = lazy(() =>
  import("../../App/Community/ListQuestion/CommentOnQuestion")
);

const Error404 = lazy(() => import("../../Common/Error404"));
//User Manual
// const Usermanual = lazy(() => import("../Common/PDFViewer"));
const PrintInvoice = lazy(() =>
  import("../../App/PaymentFlow/Payment/PrintInvoice")
);
const Mgt7a = lazy(() => import("../../App/StaticPages/Mgt7a"));

// new account setting route;
const AccountSetting = lazy(() => import("../../App/Admin/AccountSettingCommon/index"));

const PublicRoutes = () => {

  return (
    <React.Fragment>
      <Routes>
        {/* Not Authenticated Routes Start */}
        {/* <Route path="/edneed-feed" element={EdneedFeed} /> */}
        <Route path="/edneed-video" element={<EdneedVideo/>} />

        <Route path="/domain-cart" element={<DomainCart/>} />
        <Route
          path="/profile-review-list"
          element={<ProfileReviewList/>}
        />
        <Route path="/request-demo" element={<RequestDemo/>} exact />
        <Route path="/request-demo/thankyou" element={<ThankyouPage/>} exact />

        <Route
          path="/institute/institute-listing"
          element={<InstituteListing/>}
        />

        <Route path="/contact" element={<ContactUs/>} exact />
        <Route path="/contact/thankyou" element={<ThankyouPage/>} exact />
        <Route path="/community" element={<Community/>} />
        {/* <Route path="/ecommerce" element={EcommerceDashboard} /> */}


        <Route
          path="/register-institute"
          element={<RegisterInstitute/>}
        />
        <Route
          path="/create-website"
          element={<CreateWebsite/>}
        />

        <Route path="/faq" element={<Faqs/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/modales" element={<Modal/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/channel-partners" element={<ChannelPartners/>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/terms-of-service" element={<Terms/>} />
        <Route path="/cookie-policy" element={<CookiePolicy/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="/mobileapp-privacy-policy" element={<MobilePrivacyPolicy/>} />
        <Route path="/profile/:username" element={<PublicProfile/>} />
        <Route path="/profile-list" element={<PersonalProfileList/>} />
        <Route path="/payment-summary" element={<PaymentSummary/>} />
        <Route path="/payment-razor" element={<PaymentRazor/>} />
        <Route path="/payment-invoice" element={<PaymentInvoice/>} />
        <Route path="/check-domain" element={<CheckDomain/>} />
        <Route path="/checkdomain/:domainName" element={<CheckDomain/>} />
        <Route path="/edneed-mgt7a" element={<Mgt7a/>} />
        <Route
          path="/site-under-maintenance"
          element={<SiteUnderMaintenance/>}
        />
        <Route
          path="/pending-email-verify"
          element={<WebsitePendingEmailVerification/>}
        />
        <Route path="/answer/:postId" element={<CommentOnQuestion/>} />
        <Route path="/myCart/:domainSelected" element={<MyCart/>} />
        <Route
          path="/pdRedirectSwitch"
          element={<privatedDomainRedirectSwitch/>}
        />
        <Route path="/printInvoice" element={<PrintInvoice/>} />

        <Route path="/abandonedCart/:id" element={<AbandonedCart/>} />

        {/* new account setting route */}
        <Route path="/account-setting" element={<AccountSetting/>} />

        <Route path="/maileinvoie/:id" element={<InvoiceRedirect/>} />
        {/* Not Authenticated Routes Ends */}
        <Route path="/error-404" element={<PageNotFound/>} exact />

        <Route path="/*" element={ <ProtectedRoutes />}/>
        <Route path="/*" element={<TemplateRoutes />}/>
        
        
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </React.Fragment>

  )
}
export default PublicRoutes