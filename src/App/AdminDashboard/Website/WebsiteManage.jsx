/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
// import { IconExternalLink } from "../../../Common/Icon";
import InstituteTheme from "../../../Common/Theme/InstituteTheme";
import AppLink from "../../../Common/AppLink";
import SessionStorage from "../../../Classes/SessionStorage";
import { useDispatch, useSelector } from "react-redux";
import {
  getInstituteData,
  patchInstituteDataREST,
} from "../../../store/actions/checkdomain";
import { getPaymentModes, paymentLists, resetAvailPaymentModes } from "../../../store/actions/paymentmode";
import { getUserRole } from "../../../store/actions/userRole";
import AppLinkUrl from "../../../Common/AppLink/AppLinkUrl";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import IconAdmission from "./IconWebsiteManage/icon-admission.svg";
import IconAnnouncement from "./IconWebsiteManage/icon-announcement.svg";
import IconMetaData from "./IconWebsiteManage/icon-meta-data.svg";
import IconBasicInfo from "./IconWebsiteManage/icon-basic-info.svg";
import IconEditOverview from "./IconWebsiteManage/icon-editoverview.svg";
import IconColorSkin from "./IconWebsiteManage/icon-colorskin.svg";
import IconFaculty from "./IconWebsiteManage/icon-faculty.svg";
import IconFaq from "./IconWebsiteManage/icon-faq.svg";
import IconFeeStructure from "./IconWebsiteManage/icon-fee-structure.svg";
import IconGallery from "./IconWebsiteManage/icon-gallery.svg";
import IconPayment from "./IconWebsiteManage/icon-payment.svg";
import IconService from "./IconWebsiteManage/icon-services.svg";
import IconSocialLink from "./IconWebsiteManage/icon-social-link.svg";
import IconTestimonial from "./IconWebsiteManage/icon-testimonial.svg";
import IconVacancy from "./IconWebsiteManage/icon-vacancy.svg";
import IconWebsiteMenu from "./IconWebsiteManage/icon-website-menu.svg";
import IconSupport from "./IconWebsiteManage/icon-support.svg";
import IconExternalLink from "./icon-external-link.svg";
import UseOutsideClick from "../../../Common/UseOutsideClick";
import IconNoticeboard from "./IconWebsiteManage/IconNoticeboard.svg";

import {
  createPrivateDomainNewInstiute,
  PaymentComplete,
  privateDomain,
  privateDomainAddNewIns,
  privateDomainBookNew,
  privateDomainOfflineFlow,
  privateDomainOpt,
  privateDomainProceedToCheckout,
  privateDomainTLDS,
  registerDetails,
  registrationWorkDone,
  totalPriceValue,
} from "../../../Constant/auth";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../../store/actions/privateDomain";
import SupportRequestForm from "../../Admin/Website/SupportRequestForm";
// import FormInput from "../../../Common/Form/FormInput";
// import InputDateTimePicker from "../../../Common/Form/InputDateTimePicker";
// import InputDatePicker from "../../../Common/Form/InputDatePicker";
// import FormTextArea from "../../../Common/Form/FormTextArea";
import Storage from "../../../Classes/Storage";
import "./WebsiteManage.scss";
import { queryByAttribute } from "@testing-library/react";
export default function WebsiteManage(ref) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const {
    InstituteInfo,
    users,
    domain,
    paymentData,
    // InstituteInfoSuccess,
    userDetailSuccess,
    userDetailData,
    institute_private_domain,
    institute_private_domain_success,
    privateDomainName,
    availablePaymentModesSuccess
  } = useSelector((state) => {
    return {
      InstituteInfo: state.checkdomain.list.data,
      // InstituteInfoSuccess: state.checkdomain.list.success,
      users: state.user,
      domain: state.user.user_institute_institute_subdomain,
      privateDomainName: state.checkdomain.list.data.domain,
      paymentData: state.paymentmode.allPaymentList.data,
      getInstituteSuccess: state.privatedomain.getInstitutedetails.success,
      getInstituteDetailsData: state.privatedomain.getInstitutedetails.data,
      userDetailSuccess: state.privatedomain.getUserDetails.success,
      userDetailLoading: state.privatedomain.getUserDetails.loading,
      userDetailData: state.privatedomain.getUserDetails.data,
      postSupportMailDataSuccess:
        state.privatedomain.postSupportMailData.success,
      institute_Exit_Domain:
        state.privatedomain.postSupportMailData.data.institute_Exit_Domain,
      institute_private_domain: state.checkdomain.list.data.domain,
      institute_private_domain_success: state.checkdomain.list.success,
    };
  });

  useEffect(() => {
    SessionStorage.remove(privateDomainOpt);
    SessionStorage.remove(privateDomain);
    SessionStorage.remove(privateDomainTLDS);
    SessionStorage.remove(createPrivateDomainNewInstiute);
    SessionStorage.remove(registrationWorkDone);
    SessionStorage.remove(registerDetails);
    SessionStorage.remove(totalPriceValue);
    SessionStorage.remove(PaymentComplete);
    SessionStorage.remove(privateDomainOfflineFlow);
    SessionStorage.remove(privateDomainAddNewIns);
    SessionStorage.remove(privateDomainBookNew);
    SessionStorage.remove(privateDomainProceedToCheckout);
    SessionStorage.remove("UserRegistration");
    SessionStorage.remove("RegisterInstitiute");
    SessionStorage.remove("DomainName");
    SessionStorage.remove("InstituteWebsite");

    Storage.remove("__wz_pd_adni__");

    Storage.remove("registerDetails");
    Storage.remove("__wz_pd_ip__");
  }, []);

  useEffect(() => {
    dispatch(getUserDetails(users._id, users.user_institute));
    dispatch(getInstituteData(users.user_institute));
    // dispatch(paymentLists(users.user_institute));
    InstituteInfo.owner &&
      // dispatch(getUserRole(InstituteInfo.owner, InstituteInfo._id));
      dispatch(patchInstituteDataREST());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const BookPrivateDomain = () => {
    SessionStorage.setBool(privateDomainBookNew, true);
    history("/check-domain");
  };
  const ProceedToBook = () => {
    SessionStorage.setBool(privateDomainProceedToCheckout, true);
    history("/myCart");
  };
  const dropdownRef = useRef(null);
  const [supportrequest, setsupportrequest] = useState(false);

  const sendsupportrequest = () => {
    setsupportrequest(!supportrequest);
  };
  // UseOutsideClick(dropdownRef, () => {
  //   if (supportrequest) setsupportrequest(false);
  // });

  const closeSendSupportRequest = () => {
    setsupportrequest(false);
  };
  const openPrivateDomain = () => {
    window.open(`https://${privateDomainName}`);
  };

  const openSubDomain = () => {
    window.open(
      `https://${users.user_institute_institute_subdomain}.edneed.com`
    );
  };

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="website-manage" title="Manage Website" />
      </Breadcrumb>
      <h3 className="heading text-sm w-300 mt-30">Manage Website</h3>
      <div className="manageWebsiteHeadWrapper mb-10 mt-10">
        <div className="manageWebsiteHeadWrapperItem">
          {AppLinkUrl.privateDomain() ? (
            <div className="ManageWebsiteExtLink">
              {/* <p
                  className="inlineLink w-700 text-xs"
                  onClick={openSubDomain}
                >
                  {users.user_institute_institute_subdomain}.edneed.com
                </p> */}
              <p
                className="mt-8 dgray w-600 text-xs primary"
                onClick={openSubDomain}
              >
                {users.user_institute_institute_subdomain}.edneed.com&nbsp;
                <img src={IconExternalLink} alt="External Link Iocn" />
                {/* <React.Fragment>
                    <span className="inlineLink w-700 text-xs">
                      
                    </span>
                  </React.Fragment> */}
              </p>
            </div>
          ) : (
            <div className="ManageWebsiteExtLink">
              <AppLink
                createsubdomain={true}
                to={users.user_institute_institute_subdomain}
                target="_blank"
                className="mt-8 dgray w-600 text-xs primary"
              >
                {domain
                  ? AppLinkUrl.createSubdomain(
                    users.user_institute_institute_subdomain
                  )
                  : ""}{" "}
                &nbsp;
                <img src={IconExternalLink} alt="External Link Iocn" />
                {/* <React.Fragment>
                    <span className="inlineLink w-700 text-xs">
                      
                    </span>
                  </React.Fragment> */}
              </AppLink>
            </div>
          )}

          {privateDomainName && (
            <div className="ManageWebsiteExtLink">
              <p
                className="mt-8 dgray w-600 text-xs primary"
                onClick={openPrivateDomain}
              >
                {privateDomainName ? `https://${privateDomainName}` : ""}{" "}
                &nbsp;
                <img src={IconExternalLink} alt="External Link Iocn" />
                {/* <React.Fragment>
                    <span className="inlineLink w-700 text-xs">
                   
                    </span>
                  </React.Fragment> */}
              </p>
            </div>
          )}

          {!InstituteInfo.domain &&
            !userDetailData.DomainInfo &&
            userDetailSuccess ? (
            <button
              className="button btn-sm button-primary mt-10"
              onClick={BookPrivateDomain}
            >
              Book Private Domain
            </button>
          ) : (
            ""
          )}

          {/* <br />
          {InstituteInfoSuccess && institute_private_domain && (
            <AppLink
              createsubdomain={true}
              to={institute_private_domain}
              target="_blank"
              className="mt-8 dgray text-xxs"
            >
              <React.Fragment>
                <span className="inlineLink w-700 text-xs">
                  {institute_private_domain_success && institute_private_domain
                    ? institute_private_domain
                    : ""}
                  <i>
                    <img src={IconExternalLink} alt="external icon" />
                  </i>
                </span>
              </React.Fragment>
            </AppLink>
          )} */}
        </div>
        <div className="manageWebsiteHeadWrapperItem">
          {!institute_private_domain && institute_private_domain_success ? (
            <p className="text-xxs">
              Have an existing domain? No worries, contact our team to set up
              your institute’s website.
            </p>
          ) : (
            <p className="text-xxs"></p>
          )}

          {!institute_private_domain && institute_private_domain_success ? (
            <React.Fragment>
              <div className="supportRequestWrapper" ref={dropdownRef}>
                <button
                  className="button btn-sm btn-o-primary primary mt-10"
                  onClick={sendsupportrequest}
                >
                  Send Support Request
                </button>
                {supportrequest && (
                  <div className="supportRequestFormWrapper">
                    <SupportRequestForm
                      closeSendSupportRequest={() =>
                        closeSendSupportRequest()
                      }
                    />
                  </div>
                )}
              </div>
            </React.Fragment>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* {!InstituteInfo.institute_private_domain &&
        !userDetailData.DomainInfo &&
        userDetailSuccess ? (
          <button
            // to="/check-domain"
            className="button btn-sm button-primary"
            onClick={BookPrivateDomain}
          >
            Book Private Domain
          </button>
        ) : (
          ""
        )}
        {institute_private_domain ? "" : <SupportRequestForm users={users} />}
        */}
      {userDetailData.DomainInfo &&
        userDetailSuccess &&
        institute_private_domain_success &&
        !institute_private_domain ? (
        <div className="manageDomainCartWrapper">
          <ul className="manageDomainCartCustom">
            <li>
              <p className="text-xs w-600">Domain Cart</p>
              <p className="text-xs secondary">1 Domain is in your cart.</p>
            </li>
            <li>
              <button
                className="button btn-sm btn-o-primary primary"
                onClick={ProceedToBook}
              >
                Proceed to Book
              </button>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
      {/* {!supportrequest && ( */}
      <React.Fragment>
        {/* <div className="manageDomainCartWrapper">
              <ul className="manageDomainCartCustom">
                <li>
                  <p className="text-xs w-600">Domain Cart</p>
                  <p className="text-xs secondary">
                    1 Domain is in your cart.
                  </p>
                </li>
                <li>
                  <button className="button btn-sm btn-o-primary primary">
                    Procees to Book
                  </button>
                </li>
              </ul>
            </div> */}
        <div className="manage-web-custom mt-30">
          <AppLink to="/manage-basic-info" data-tooltip="You can update your Institute's information in this field like: Institute's name, email, address, contact, etc." data-tooltip-conf="top" >
            {/* <img src={IconBasicInfo} alt="Basic Info" /> */}
            <i className="Icon-BasicInfo"></i>
            <p>Basic Info</p>
          </AppLink>
          <AppLink to="/institute-info-manage" data-tooltip="You can edit website details like school logo, banner image, mission & vision, and message from the principal which will be displayed on the website." data-tooltip-conf="top">
            {/* <img src={IconEditOverview} alt="Edit Overview" /> */}
            <i className="Icon-EditOverview"></i>
            <p>Edit Overview</p>
          </AppLink>
          <AppLink to="/skin-theme" data-tooltip="You can edit your website's color." data-tooltip-conf="top">
            {/* <i className="ed-icon icon-content primary"></i> */}
            {/* <img src={IconColorSkin} alt="Website Color Skin" /> */}
            <i className="Icon-ColorSkin"></i>
            <p>Website Color Skin</p>
          </AppLink>
          <AppLink to="/menu-header-list" data-tooltip="You can choose the headers to be displayed on your website as per your need." data-tooltip-conf="top">
            <img src={IconNoticeboard} className="web-icon" alt="Contact_List" />
            <p>Home & Menu</p>
          </AppLink>
          {/* <AppLink to="/">
              <span className="rtBadge text-2xs">New</span>
                <img src={IconWebsiteMenu} alt="Website Menu"/>
                <p>Website Menu</p>
              </AppLink>
              <AppLink to="/">
              <span className="rtBadge text-2xs">New</span>
                <img src={IconColorSkin} alt="Website  Color Skin"/>
                <p>Website Color Skin</p>
              </AppLink> */}
          <AppLink to="/seo-metatag" data-tooltip="You can edit SEO information of your website." data-tooltip-conf="top">
            {/* <img src={IconMetaData} alt="Meta Data" /> */}
            <i className="Icon-MetaData"></i>
            <p>Meta Data</p>
          </AppLink>
          <AppLink to="/faculty-route" data-tooltip="You can add or edit information about your faculties which will be displayed on the website's faculty section." data-tooltip-conf="top">
            {/* <img src={IconFaculty} alt="Faculties" /> */}
            <i className="Icon-Faculty"></i>
            <p>Faculties</p>
          </AppLink>
          <AppLink to="/services-list" data-tooltip="You can add special features and services of your schools which will be displayed on the website. " data-tooltip-conf="top">
            {/* <img src={IconService} alt="Services" /> */}
            <i className="Icon-Services"></i>
            <p>Services</p>
          </AppLink>
          <AppLink to="/fee-structure" data-tooltip="You can create and edit fee structure(s) for your classes." data-tooltip-conf="top">
            {/* <img src={IconFeeStructure} alt="Fee Structure" /> */}
            <i className="Icon-FeeStructure"></i>
            <p>Fee Structure</p>
          </AppLink>
          <AppLink to="/admission-list" data-tooltip="You can update admission information about your schools which will be displayed on the website." data-tooltip-conf="top" >
            {/* <img src={IconAdmission} alt="Admissions" /> */}
            <i className="Icon-Admissions"></i>
            <p>Admissions</p>
          </AppLink>
          <AppLink to="/gallery-list" data-tooltip="You can add images & videos of your school events which will be displayed in the website's gallery section. " data-tooltip-conf="top">
            {/* <img src={IconGallery} alt="Gallery" /> */}
            <i className="Icon-Gallery"></i>
            <p>Gallery</p>
          </AppLink>
          <AppLink to="/announcement-list" data-tooltip="You can create or edit announcements which will be displayed on the website under announcement section." data-tooltip-conf="top" >
            {/* <img src={IconAnnouncement} alt="Announcements" /> */}
            <i className="Icon-Announcements"></i>
            <p>Announcements</p>
          </AppLink>
          <AppLink to="/testimonial-list" data-tooltip="You can add or edit testimonials received for your school. It will be displayed in the testimonials section on the website." data-tooltip-conf="top" >
            {/* <img src={IconTestimonial} alt="Testimonials" /> */}
            <i className="Icon-Testimonials"></i>
            <p>Testimonials</p>
          </AppLink>
          <AppLink to="/manage-faqs" data-tooltip="You can add,delete or edit frequently asked questions about your school along with their answers. It will be displayed on the website's FAQ section." data-tooltip-conf="top">
            {/* <img src={IconFaq} alt="FAQs" /> */}
            <i className="Icon-FAQs"></i>
            <p>FAQs</p>
          </AppLink>
          <AppLink to="/vacancy-list" data-tooltip="You can add new job vacancies or edit existing ones. They will be shown on the website's vacancy section." data-tooltip-conf="top" >
            {/* <img src={IconVacancy} alt="Vacancies" /> */}
            <i className="Icon-Vacancies"></i>
            <p>Vacancies</p>
          </AppLink>
          <AppLink to="/add-social-links" data-tooltip="You can add links of your Social Media accounts that will be displayed on the website i.e. Facebook, Linkedin, Instagram and Twitter" data-tooltip-conf="top" >
            {/* <img src={IconSocialLink} alt="Social Links" /> */}
            <i className="Icon-SocialLink"></i>
            <p>Social Links</p>
          </AppLink>
          {paymentData.length ? (
            <AppLink to="/payment-mode-details" data-tooltip="You can set up your payment details (bank account & UPI) which will be used to receive payments from the students." data-tooltip-conf="top" >
              {/* <img src={IconPayment} alt="Payment Mode" /> */}
              <i className="Icon-Payment"></i>
              <p>Payment Mode</p>
            </AppLink>
          ) : (
            <AppLink to="/payment-mode-details" data-tooltip="You can set up your payment details (bank account & UPI) which will be used to receive payments from the students." data-tooltip-conf="top" >
              {/* <img src={IconPayment} alt="Payment Mode" /> */}
              <i className="Icon-Payment"></i>
              <p>Payment Mode</p>
            </AppLink>
          )}
          <AppLink to="/admin-support-center" data-tooltip="You can set up one or more phone numbers for customer support. Your customers can contact your support team on these numbers." data-tooltip-conf="top" >
            {/* <img src={IconSupport} alt="Support Center" /> */}
            <i className="Icon-Support"></i>
            <p>Support Center</p>
          </AppLink>
          <AppLink to="/miscellaneous-list" data-tooltip="You can create or edit urgent updates in miscellaneous which will be visible on website under Miscellaneous section." data-tooltip-conf="top" >
            {/* <img src={IconNoticeboard} className="web-icon" alt="Noticeboard" /> */}
            <i className="Icon-Miscellaneous"></i>
            <p>Miscellaneous</p>
          </AppLink>
          <AppLink to="/contact-list" data-tooltip="You can view the list of request made by the user from the website here and revert back accordingly." data-tooltip-conf="top">
            {/* <img src={IconNoticeboard} className="web-icon" alt="Contact_List" /> */}
            <i className="Icon-Contact"></i>
            <p>Contact List</p>
          </AppLink>
          {/* <AppLink to="/menu-header-list" data-tooltip="You can select the headers to be displayed on your website as per your need." data-tooltip-conf="top">
        
              <i className="Icon-HomeMenu"></i>
              <p>Home & Menu</p>
            </AppLink> */}
        </div>
      </React.Fragment>
    </React.Fragment>
  );
}
