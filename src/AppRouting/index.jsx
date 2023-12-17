import React, { Component, Suspense, lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  // useNavigate,
} from "react-router-dom";
import ComponentLoader from "../Common/Loader/ComponentLoader";
import AppLinkUrl from "../Common/AppLink/AppLinkUrl";
import Auth from "../Classes/Auth";



// import EdneedTags from '../Common/DynamicSeoTags/EdneedTags';

// import SubdomainTags from '../Common/DynamicSeoTags/SubdomainTags'
// import Loginv1 from "../App/Auth/AuthV1/Login";
import CreatePasswordv1 from "../App/Auth/AuthV1/CreatePassword";
import EmailcheckNotev1 from "../App/Auth/AuthV1/EmailcheckNote";
import ForgotPasswordv1 from "../App/Auth/AuthV1/ForgotPassword";
import ForgotPasswordOtpv1 from "../App/Auth/AuthV1/ForgotPasswordOtp";
import ForgotPasswordWithNumberv1 from "../App/Auth/AuthV1/ForgotPasswordWithNumber";
import LoginWithEmailv1 from "../App/Auth/AuthV1/LoginWithEmail";
import LoginWithNumberv1 from "../App/Auth/AuthV1/LoginWithNumber";
import LoginWithOTPv1 from "../App/Auth/AuthV1/LoginWithOTP";
import LoginWithPasswordv1 from "../App/Auth/AuthV1/LoginWithPassword";
import Signupv1 from "../App/Auth/AuthV1/Signup";
import CreateAccountSignUp from "../App/Auth/AuthV1/CreateAccountSignUp";
import SignupOtpVerifyv1 from "../App/Auth/AuthV1/SignupOtpVerify";
import SignupProcessloaderv1 from "../App/Auth/AuthV1/SignupProcessloader";
import SignupVerifyEmailv1 from "../App/Auth/AuthV1/SignupVerifyEmail";
import SignupWithNumberv1 from "../App/Auth/AuthV1/SignupWithNumber";
import PostEncryptComponent from "../App/Auth/AuthV1/PostEncryptComponent";
// import ToolTip from "../Common/toolTip/ToolTips";

// import UserSearchDemo from "../App/UserSearchDemo";
import { login } from "../Constant/auth";
// import { array } from "prop-types";
// import SubDomainTags from "../Common/DynamicSeoTags/SubdomainTags";
// import EdneedTags from "../Common/DynamicSeoTags/EdneedTags";
import HomeRoute from "./HomeRoute";
// import loginAdmin from "../App/Auth/AuthV1/HOC/index"

// import LMSRoutes from "./LmsRoutes";

// import SelectRowV1 from "../App/Auth/SelectRow"
// import TeacherTestCheck from "../App/Dashboard/TeacherDashboard/TeacherOnlineTestCheck";
//import FeeManagement from "../App/FeeManagement";
// const Login = lazy(() => import("../App/Auth/Login"));



// import WebsiteTemplatePreview from "../WebsiteTemplateCustomization/WebsiteTemplatePreview";
import BusinessName from "../App/Auth/BusinessName";

// const ToolTips = lazy(() =>
//   import("../Common/toolTip/ToolTips")
// );

import Layout from "../Layout";
import { connect } from "react-redux";
import { WEBSITE_TEMPLATE_MAP_DISPATCH_TO_PROPS, WEBSITE_TEMPLATE_MAP_STATE_TO_PROPS } from "./WebsiteMapDispatch";
import Request from "../Classes/Request";
import error404 from "../Common/Error404";
import PageNotFound from "../Common/PageNotFound/PageNotFound";
import LMSRoutes from "./LmsRoutes";
// import PostEncryptComponent from "../App/Authentication/SignUp/PostEncryptComponent";
// const VerifySignup = lazy(() => import("../App/Auth/Login/VerifySignup"));
// const VerifyEmail = lazy(() => import("../App/Auth/Login/VerifyEmail"));
// const CreateAccount = lazy(() => import("../App/Auth/CreateAccount"));
const ThankYouSignup = lazy(() =>
  import("../App/Auth/CreateAccount/ThankYouSignup")
);
const EmailLogin = lazy(() => import("../App/Auth/Login/EmailLogin"));
// const Layout = lazy(() => import("../Layout"));
// Auth
const Logout = lazy(() => import("../App/Auth/Logout"));
// Auth

const ForgotPassword = lazy(() => import("../App/Auth/ForgotPassword"));
const ResetPassword = lazy(() =>
  import("../App/Auth/ForgotPassword/ResetPassword")
);

const WebsitePreview = lazy(() => import("../WebsiteTemplateCustomization/WebsitePreview"));
//Website-Template Customization
const ThemeSidebar = lazy(() =>
  import("../ThemeCustomizeSidebar/ThemeSidebar")
);

const MyTemplates = lazy(() => import("../App/WebsiteTemplates/MyTemplates"));
const TemplateListing = lazy(() => import("../App/WebsiteTemplates/TemplateListing"));
// function AuthenticatedRoutes({ children }) {
//   if (AppLinkUrl.privateDomain()) {
//     return Auth.isLogin() ? children : <VespertineTheme />;
//   } else {
//     return Auth.isLogin() ? children : <HomeRoute />;
//   }
//   //return Auth.isLogin() ? Auth.user().user_password_change? children:<EmailResetPassword />: <Home />  ;
// }

// marketing routes
// Marketing routs
const Marketingform = lazy(() => import("../App/Marketing/Marketingform"));
const Marketing = lazy(() => import("../App/Marketing/Marketing"));
const BusinessCardMarketing = lazy(() => import("../App/Marketing/businesscardsmarketing"));
const EmailMarketing = lazy(() => import("../App/Marketing/Emailmarketing"));
const DigitalMarketing = lazy(() => import("../App/Marketing/Digitalmarketing"));
const LogoMarketing = lazy(() => import("../App/Marketing/Logomarketing"));
const GoogleMarketing = lazy(() => import("../App/Marketing/Googlemarketing"));
const ThankyouPage = lazy(() => import("../App/Marketing/Thankyou"));

//common policy routes
const TermsAndConditions = lazy(() => import("../App/BuisnessDashboard/WebsitePolicy/TermsAndConditions"));
const ReturnPolicy = lazy(() => import("../App/BuisnessDashboard/WebsitePolicy/ReturnPolicy"));
const PrivacyPolicies = lazy(() => import("../App/BuisnessDashboard/WebsitePolicy/PrivacyPolicies"));
const CancellationPolicy = lazy(() => import("../App/BuisnessDashboard/WebsitePolicy/CancellationPolicy"));
const CustomPolicy = lazy(() => import("../App/BuisnessDashboard/WebsitePolicy/CustomPolicy"));


function AuthRouteRedirection({ children }) {
  if (AppLinkUrl.privateDomain()) {
    return Auth.isLogin() ? <Navigate to="/" /> : children;
  }
  else {
    return Auth.isLogin() ? <Navigate to="/" /> : children;
  }
}
class AppRouting extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      isLoggedIn: Auth.isLogin(),
      isSubLoggedIn: Auth.isSubdomainLogin(),
    };
  }
  crosstabLoginLogout = (evt) => {
    // Logout user from all open tabs
    if (evt.key === login && evt.newValue === null) {
      window.location.reload();
    }

    // Login user in all open tabs
    if (evt.key === login && evt.newValue !== null) {
      window.location.reload();
    }
  };

  detectLoginAndReload = () => {
    if (AppLinkUrl.subdomain()) {
      if (Auth.isSubdomainLogin() !== this.state.isSubLoggedIn) {
        window.location.reload();
      }
    } else {
      if (Auth.isLogin() !== this.state.isLoggedIn) {
        window.location.reload();
      }
    }
  };

  suspenseLoader = () => {
    return <ComponentLoader />;
  };

  // detectLoginAndReload = () => {
  //   if (Auth.isLogin() !== this.state.isLoggedIn) {
  //     window.location.reload();
  //   }
  // };
  startLoading = () => {
    const fetchData = async () => {
      if (window.location.href.includes("/products/")) {
        const WebsiteTemplateRequest = new Request();
        const query = AppLinkUrl.privateDomain() ? "domain" : "subdomain"
        const domain = AppLinkUrl.privateDomain() ? AppLinkUrl.getHost() : AppLinkUrl.subdomain();
        const slug = window.location.href.split(`/products/`)[1]
        await WebsiteTemplateRequest.get(WebsiteTemplateRequest.url(`/productService/get-product?${query}=${domain}&urlSlug=${slug}`, "ecommerce"),
          (success) => {
            this.props.getEcomWebsiteTemplate(success.data.data.businessShopId, "needHome", query, domain)
            this.props.getProductDetails(success.data.data)
          },
          (error) => {
            console.log(error)
          }
        );

      } else if (window.location.href.includes("/products")) {
        const WebsiteTemplateRequest = new Request();
        const query = AppLinkUrl.privateDomain() ? "domain" : "subdomain"
        const domain = AppLinkUrl.privateDomain() ? AppLinkUrl.getHost() : AppLinkUrl.subdomain()
        await WebsiteTemplateRequest.get(WebsiteTemplateRequest.url(`/productService/product-list-client-initital?${query}=${domain}`, "ecommerce"),
          (success) => {
            this.props.getEcomWebsiteTemplate(success.data.data.businessInfo, "noNeedHome")
            this.props.getProductList(success.data.data, query, domain)
            // WebsiteTemplateRequest.get(WebsiteTemplateRequest.url(`/ websiteDefaulttheme / UserActivatedTemplateV2 ? ${ query }=${ domain } `, "commonservices"),
            //   (success) => { this.props.getHomeProductTemplate(success.data.data) }, (error) => {
            //     console.log(error)
            //   })
            // this.props.getHomeProductTemplate(success.data.data)
            // dispatch(getDomainRouteCheck(success.data))
            // console.log("app routing")
          },
          (error) => {
            console.log(error)
          }
        );

      } else {

        const WebsiteTemplateRequest = new Request();
        const query = AppLinkUrl.privateDomain() ? "domain" : "subdomain"
        const domain = AppLinkUrl.privateDomain() ? AppLinkUrl.getHost() : AppLinkUrl.subdomain()
        await WebsiteTemplateRequest.get(WebsiteTemplateRequest.url(`/websiteDefaulttheme/UserActivatedTemplateV2?${query}=${domain}`, "commonservices"),
          (success) => {
            switch (success?.data?.type) {
              case "Ecommerce":
                // this.props.loadWebsiteTemplate(success.data)
                this.props.getHomeProductTemplate(success.data.data)
                this.props.getEcomWebsiteTemplate(success.data.data.BusinessInfo, "noNeedHome")
                this.props.loadWebsiteTemplate(success.data)
                // dispatch(getDomainRouteCheck(success.data))
                // dispatch(getHomeProductTemplate(success.data.data))
                // dispatch(getEcomWebsiteTemplate(success.data.data.BusinessInfo))
                break;
              case "Services":
                this.props.loadServiceTemplate(success.data)
                
                this.props.loadWebsiteTemplate(success.data)
                // dispatch(getDomainRouteCheck(success.data))
                // dispatch(getDomainServiceRouteCheck(success.data))
                break;
              case "LMS":
                this.props.loadWebsiteTemplate(success.data)
                // dispatch(getDomainRouteCheck(success.data))
                break;

              default:
                this.props.loadWebsiteTemplate(success.data)
                // dispatch(getDomainRouteCheck(success.data))
                break;
            }
            // dispatch(getDomainRouteCheck(success.data))
            // console.log("app routing")
          },
          (error) => {
            console.log(error)
          }
        );
      }
    }

    // call the function
    if (!this.props.templateInfo.success) {
      if (AppLinkUrl.privateDomain() || AppLinkUrl.subdomain()) {
        fetchData().catch(console.error);
      }
    }
  };
  componentDidMount() {

    // Subdomain redirection
    // Navigate subdomain wwww to non www subdomain
    // if (AppLinkUrl.subdomainWithWWW()) {
    //   window.location.href = AppLinkUrl.createSubdomain(AppLinkUrl.subdomain());
    // }
    if (window.location.href.includes(`www.getmelight.com`)) {
      window.location.href = "http://getmelight.com/"
    } else if (window.location.href.includes(`www.unicated.com`)) {
      window.location.href = "http://unicated.com/"
    } else if (window.location.href.includes(`www.edneed.com`)) {
      window.location.href = "http://edneed.com/"
    }
    this.setState((prevState) => {
      return {
        ...prevState,
        loaded: true,
      };
    });
    this.startLoading()
    // Track user login on mouseenter
    document.addEventListener("mouseenter", this.detectLoginAndReload);

    // Track user login on touch start
    document.addEventListener("touchstart", this.detectLoginAndReload);

    window.addEventListener("storage", this.crosstabLoginLogout);
  }
  componentWillUnmount() {
    window.removeEventListener("storage", this.crosstabLoginLogout);
  }
  privateDomainOrSubdomain() {
    return (
      (AppLinkUrl.subdomain() && AppLinkUrl.subdomain() !== "www") ||
      AppLinkUrl.privateDomain()
    );
  }
  homeRedirection() {
    if (AppLinkUrl.privateDomain()) {
      return <Navigate to="/" />;
    }
    else {
      return <Navigate to="/" />;
    }
  }
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Layout>
          <Suspense
            fallback={
              this.state.loaded ? (
                this.suspenseLoader()
              ) : (
                <React.Fragment></React.Fragment>
              )
            }
          >
            <Routes>
              {/* Only for private domain and subdomain website routes Start */}
              {/* ecommerce templete route  */}
              <Route path='/website-template-preview/:_id/:type' element={<WebsitePreview/>} />
              <Route path="/service-template-preview/:_id/:type" element={<WebsitePreview/>} />
              <Route path="/business-name" element={<BusinessName/>} />
              {/* Only for private domain and subdomain website routes Ends */}
             
              {/* <Route path="/auth"> */}
                {/* <AuthRouteRedirection> */}
                  {/* <Routes> */}
                    <Route
                      path="/auth/resetpassword/:verificationcode?"
                      element={<AuthRouteRedirection><ResetPassword/></AuthRouteRedirection>}
                    />

                    <Route
                      path="/auth/forgot-password"
                      element={<AuthRouteRedirection><ForgotPassword/></AuthRouteRedirection>}
                    />
                   
                   <Route path="/auth/logout" element={<Logout/>} />
                  <Route path="/auth/login" element={<AuthRouteRedirection><LoginWithEmailv1/></AuthRouteRedirection>} />
                    <Route
                      path="/auth/create-account"
                      element={<AuthRouteRedirection><Signupv1/></AuthRouteRedirection>}
                    />
                    <Route path="/auth/login-with-otpv1/:contact" element={<AuthRouteRedirection><LoginWithOTPv1/></AuthRouteRedirection>} />
                    <Route path="/auth/thank-you" element={<AuthRouteRedirection><ThankYouSignup/></AuthRouteRedirection>} />

                    {/* <Route path="/auth/login" element={Loginv1} /> */}
                    {/* <Route path="/auth/create-account" element={Signupv1} /> */}
                    <Route path="/auth/create-passwordv1" element={<AuthRouteRedirection><CreatePasswordv1/></AuthRouteRedirection>} />
                    <Route path="/auth/email-check-notev1" element={<AuthRouteRedirection><EmailcheckNotev1/></AuthRouteRedirection>} />
                    <Route path="/auth/forgot-passwordv1" element={<AuthRouteRedirection><ForgotPasswordv1/></AuthRouteRedirection>} />
                    <Route path="/auth/forgot-password-otpv1" element={<AuthRouteRedirection><ForgotPasswordOtpv1/></AuthRouteRedirection>} />
                    <Route path="/auth/forgot-password-with-numberv1" element={<AuthRouteRedirection><ForgotPasswordWithNumberv1/></AuthRouteRedirection>} />
                    <Route path="/auth/login-with-emailv1" element={<AuthRouteRedirection><LoginWithEmailv1/></AuthRouteRedirection>} />
                    <Route path="/auth/login-with-numberv1" element={<AuthRouteRedirection><LoginWithNumberv1/></AuthRouteRedirection>} />
                    <Route path="/auth/login-with-passwordv1" element={<AuthRouteRedirection><LoginWithPasswordv1/></AuthRouteRedirection>} />
                    {/* <Route path="/auth/signup-password/:type/:value" element={Signupv1} /> */}
                    <Route path="/auth/signup" element={<AuthRouteRedirection><CreateAccountSignUp/></AuthRouteRedirection>} />
                    <Route path="/auth/signup-otp-verifyv1/:type/:value" element={<AuthRouteRedirection><SignupOtpVerifyv1/></AuthRouteRedirection>} />
                    <Route path="/auth/signup-process-loaderv1" element={<AuthRouteRedirection><SignupProcessloaderv1/></AuthRouteRedirection>} />
                    <Route path="/auth/signup-verify-emailv1" element={<AuthRouteRedirection><SignupVerifyEmailv1/></AuthRouteRedirection>} />
                    <Route path="/auth/signup-with-numberv1" element={<AuthRouteRedirection><SignupWithNumberv1/></AuthRouteRedirection>} />
                    <Route path="/auth/theme-sidebar" element={<AuthRouteRedirection><ThemeSidebar/></AuthRouteRedirection>} />
                    <Route path="/auth/homeencrypt/:code/:websiteType" element={<AuthRouteRedirection><PostEncryptComponent/></AuthRouteRedirection>} />

                  {/* </Routes> */}
                {/* </AuthRouteRedirection> */}
              {/* </Route> */}


              <Route path="/templates" element={<TemplateListing/>} />
              <Route path="/theme-sidebar/:_id" element={<ThemeSidebar/>} />
              <Route path="/user-templates" element={<MyTemplates/>} />

              {/* marketing seo routes */}
              <Route path="/marketing" element={<Marketing/>} />
              <Route path="/business-card-marketing" element={<BusinessCardMarketing/>} />
              <Route path="/email-marketing" element={<EmailMarketing/>} />
              <Route path="/digital-marketing" element={<DigitalMarketing/>} />
              <Route path="/logo-marketing" element={<LogoMarketing/>} />
              <Route path="/google-marketing" element={<GoogleMarketing/>} />
              <Route path="/marketing-form" element={<Marketingform/>} />
              <Route path="/marketingform/:state" element={<Marketingform/>} />
              <Route path="/thank-you" element={<ThankyouPage/>} />

              {/* common policy routes */}
              <Route path="/policy/:slug" element={<TermsAndConditions/>} />
              <Route path="/policy/return-policy" element={<ReturnPolicy/>} />
              <Route path="/policy/privacy-policy" element={<PrivacyPolicies/>} />
              <Route path="/policy/cancellation-policy" element={<CancellationPolicy/>} />
              <Route path="/policy/custom-policy/:_id" element={<CustomPolicy/>} />
              <Route path="/auth/homeencrypt/:code/:websiteType" element={<PostEncryptComponent/>} />
            

              <Route path="/" exact element={<HomeRoute/>}/>

              <Route path="/dashboard" exact element={<HomeRoute/>}/>
              
                <Route path="/*" element={<LMSRoutes/>}/>
              <Route path="*" element={<PageNotFound/>} />
          
              <Route path="*" element={<PageNotFound/>} />
            </Routes>
          </Suspense>

        </Layout>

      </BrowserRouter>
    );
  }
}
export default connect(
  WEBSITE_TEMPLATE_MAP_STATE_TO_PROPS,
  WEBSITE_TEMPLATE_MAP_DISPATCH_TO_PROPS
)(AppRouting);