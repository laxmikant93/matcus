import React, { useEffect } from "react";
import AppLink from "../../Common/AppLink";
import SessionStorage from "../../Classes/SessionStorage";
import { useDispatch, useSelector } from "react-redux";
import {
  getInstituteData,
  patchInstituteDataREST,
} from "../../store/actions/checkdomain";

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
} from "../../Constant/auth";
import { getUserDetails } from "../../store/actions/privateDomain";
import Storage from "../../Classes/Storage";
import { useLocation } from "react-router-dom";


export default function WebsiteMenuListItem() {
  const dispatch = useDispatch();
  const {
    InstituteInfo,
    users,
    paymentData,
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
  const { pathname } = useLocation()

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
    InstituteInfo.owner &&
      dispatch(patchInstituteDataREST());
  }, []);

  return (
    <React.Fragment>
      <ul className={`subMenuList`}>
        <li className={`subMenuListItem ${pathname === "/manage-basic-info" ? "active" : ""}`}  >
          <AppLink to="/manage-basic-info">
            <span className="title">Basic Info</span>
          </AppLink>
        </li>
        <li className={`subMenuListItem ${pathname === "/institute-info-manage" ? "active" : ""}`}>
          <AppLink to="/institute-info-manage">
            <span className="title">Edit Overview</span>
          </AppLink>
        </li>
        <li className={`subMenuListItem ${pathname === "/skin-theme" ? "active" : ""}`}>
          <AppLink to="/skin-theme">
            <span className="title">Website Color Skin</span>
          </AppLink>
        </li>
        <li className={`subMenuListItem ${pathname === "/menu-header-list" ? "active" : ""}`}>
          <AppLink to="/menu-header-list">
            <span className="title">Home & Menu</span>
          </AppLink>
        </li>
        <li className={`subMenuListItem ${pathname === "/seo-metatag" ? "active" : ""}`}>
          <AppLink to="/seo-metatag">
            <span className="title">Meta Data</span>
          </AppLink>
        </li>
        <li className={`subMenuListItem ${pathname === "/manage-faculty" ? "active" : ""}`}>
          <AppLink to="/faculty-route">
            <span className="title">Faculties</span>
          </AppLink>
        </li>
        <li className={`subMenuListItem ${pathname === "/services-list" ? "active" : ""}`}>
          <AppLink to="/services-list">
            <span className="title">Services</span>
          </AppLink>
        </li>
        <li className={`subMenuListItem ${pathname === "/fee-structure" ? "active" : ""}`}>
          <AppLink to="/fee-structure">
            <span className="title">Fee Structure</span>
          </AppLink>
        </li>
        <li className={`subMenuListItem ${pathname === "/admission-list" ? "active" : ""}`}>
          <AppLink to="/admission-list">
            <span className="title">Admissions</span>
          </AppLink>
        </li>
        <li className={`subMenuListItem ${pathname === "/gallery-list" ? "active" : ""}`}>
          <AppLink to="/gallery-list">
            <span className="title">Gallery</span>
          </AppLink>
        </li>
        <li className={`subMenuListItem ${pathname === "/announcement-list" ? "active" : ""}`}>
          <AppLink to="/announcement-list">
            <span className="title">Announcements</span>
          </AppLink>
        </li>
        <li className={`subMenuListItem ${pathname === "/testimonial-list" ? "active" : ""}`}>
          <AppLink to="/testimonial-list">
            <span className="title">Testimonials</span>
          </AppLink>
        </li>
        <li className={`subMenuListItem ${pathname === "/manage-faqs" ? "active" : ""}`}>
          <AppLink to="/manage-faqs">
            <span className="title">FAQs</span>
          </AppLink>
        </li>
        <li className={`subMenuListItem ${pathname === "/vacancy-list" ? "active" : ""}`}>
          <AppLink to="/vacancy-list">
            <span className="title">Vacancies</span>
          </AppLink>
        </li>
        <li className={`subMenuListItem ${pathname === "/add-social-links" ? "active" : ""}`}>
          <AppLink to="/add-social-links">
            <span className="title">Social Links</span>
          </AppLink>
        </li>
        <li className={`subMenuListItem ${pathname === "/payment-mode-details" ? "active" : ""}`}>
          {paymentData.length ? (
            <AppLink to="/payment-mode-details">
              <span className="title">Payment Mode</span>
            </AppLink>
          ) : (
            <AppLink to="/payment-mode-details">
              <span className="title">Payment Mode</span>
            </AppLink>
          )}
        </li>
        <li className={`subMenuListItem ${pathname === "/admin-support-center" ? "active" : ""}`}>
          <AppLink to="/admin-support-center">
            <span className="title">Support Center</span>
          </AppLink>
        </li>
        <li className={`subMenuListItem ${pathname === "/miscellaneous-list" ? "active" : ""}`}>
          <AppLink to="/miscellaneous-list">
            <span className="title">Miscellaneous</span>
          </AppLink>
        </li>
        <li className={`subMenuListItem ${pathname === "/contact-list" ? "active" : ""}`}>
          <AppLink to="/contact-list">
            <span className="title">Contact List</span>
          </AppLink>
        </li>
      </ul>
    </React.Fragment>

  );
}
