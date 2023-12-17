import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartDomainFeature from "./CartDomainFeature";
import CartPrice from "./CartPrice";
import CartTop from "./CartTop";
import {
  privateDomain,
  privateDomainTLDS,
  totalPriceValue,
  registerDetails,
  registrationWorkDone,
  privateDomainOfflineFlow,
  privateDomainBookNew,
  privateDomainAddNewIns,
  privateDomainProceedToCheckout,
  PaymentComplete,
} from "../../../Constant/auth";
import SessionStorage from "../../../Classes/SessionStorage";
import {
  postDomainSubmit,
  postDomainSubmitRESET,
  getUserDetails,
  getUserDetailsRESET,
  getDomainAvailablityRESET,
  postDomainUserDetailsOffline,
  postDomainUserDetailsOnline,
  postUserDetailsOnlineRESET,
  postUserDetailsOffilineRESET,
  getDomainAvailablity,
  instituteDetailsData,
  getInstiuteDetailsRESET,
} from "../../../store/actions/privateDomain";
import { useNavigate, useParams } from "react-router-dom";
import ComponentLoader from "../../../Common/Loader/ComponentLoader";
// import FormInput from "../../../Common/Form/FormInput";
// import PhoneInput from "react-phone-input-2";
// import CountrySelect from "../../../Common/Form/CountrySelect";
// import StateSelect from "../../../Common/Form/StateSelect";
import PackagePrice from "./PackagePrice";
import UpdateInstituteInfo from "./UpdateInstituteInfo";
import ZipCodes from "../../../Common/Zipcodes/Zipcodes.json";
import "./DomainCart.scss";
// import { bool, func, string } from "prop-types";
const DomainCart = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { domainSelected } = useParams();
  const [domainName, setDomainName] = useState("");
  const [tlds, settlds] = useState("");
  const [subdomain, setSubDomain] = useState("");
  const [cartValueFilled, setcartValueFilled] = useState(false);

  const [privateDomainOffline, setPrivateDomainOffline] = useState(false);
  const [privateDomainProceedToCheck, setPrivateDomainProceedToCheckout] =
    useState(false);
  const [privateDomainBook, setPrivateDomainBook] = useState(false);
  const [privateDomainAddnewIns, setPrivateDomainAddnewIns] = useState(false);
  const [continueButtonDisable, setContinueButtonDisable] = useState(false);
  const [isInstituteEmpty, setIsInsitiuteEmpty] = useState([]);
  const [validationTrue, setValidationTrue] = useState(false);
  const [finalFucntionSubmit, setFinalFucntionSubmit] = useState(false);
  const [proceedCheckoutButtonCLick, setProceedCheckoutButtonCLick] = useState(false);

  const {
    users,
    PostDomainInfoSuccess,
    userDetails,
    userDetailSuccess,
    userDetailLoading,
    domainAvailableLoading,
    domainAvailableSuccess,
    postUserDetailsSuccess,
    postUserDetailsloading,
    postUserDetailsData,
    instituteDetailsSuccess,
    instituteDetails,
    patchInstituteDetailsSuccess,
    patchInstituteDetailsData,
    domainAvailableData
  } = useSelector((state) => {
    return {
      users: state.user,
      patchInstituteDetailsSuccess: state.privatedomain.patchInstituteDetails.success,
      patchInstituteDetailsData: state.privatedomain.patchInstituteDetails.data,
      userDetails: state.privatedomain.getUserDetails.data,
      userDetailSuccess: state.privatedomain.getUserDetails.success,
      userDetailLoading: state.privatedomain.getUserDetails.loading,
      GetTldsLoading: state.privatedomain.getTlds.loading,
      GetTldsSuccess: state.privatedomain.getTlds.success,
      PostDomainInfoLoading: state.privatedomain.postDomainInfo.loading,
      PostDomainInfoSuccess: state.privatedomain.postDomainInfo.success,
      GetTldsData: state.privatedomain.getTlds.data,
      domainAvailableLoading: state.privatedomain.privateDomainAvailability.loading,
      domainAvailableSuccess: state.privatedomain.privateDomainAvailability.success,
      domainAvailableData: state.privatedomain.privateDomainAvailability.data,
      postUserDetailsSuccess: state.privatedomain.postUserDetails.success,
      postUserDetailsloading: state.privatedomain.postUserDetails.loading,
      postUserDetailsData: state.privatedomain.postUserDetails.data,
      instituteDetailsSuccess: state.privatedomain.getInstitutedetails.success,
      instituteDetails: state.privatedomain.getInstitutedetails.data.data,
    };
  });

  // useEffect(() => {

  //   dispatch(getUserDetails(users._id, users.user_institute, users.user_business_type));

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   if (SessionStorage.alive(PaymentComplete)) {
  //     history("/payment-invoice");
  //   }
  // }, [history]);

  // useEffect(() => {
  //   if (SessionStorage.alive(privateDomain)) {
  //     let data = SessionStorage.getJson(privateDomain);
  //     setDomainName(data);
  //   }
  //   if (SessionStorage.alive(privateDomainTLDS)) {
  //     let data = SessionStorage.getJson(privateDomainTLDS);
  //     settlds(data);
  //   }
  //   if (SessionStorage.alive("DomainName")) {
  //     let data = SessionStorage.getJson("DomainName");
  //     setSubDomain(data);
  //   }

  //   if (SessionStorage.alive(privateDomainOfflineFlow)) {
  //     setPrivateDomainOffline(true);
  //   }
  //   if (SessionStorage.alive(privateDomainAddNewIns)) {
  //     setPrivateDomainAddnewIns(true);
  //   }
  //   if (SessionStorage.alive(privateDomainBookNew)) {
  //     setPrivateDomainBook(true);
  //   }
  //   if (SessionStorage.alive(privateDomainProceedToCheckout)) {
  //     setPrivateDomainProceedToCheckout(true);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    return () => {
      dispatch(postUserDetailsOffilineRESET());
      dispatch(postUserDetailsOnlineRESET());
      dispatch(postDomainSubmitRESET());
      dispatch(getUserDetailsRESET());
      dispatch(getDomainAvailablityRESET());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let tempDomain = ""
    let tempDomainTlds = ""

    tempDomain = domainSelected.split(".")[0]
    tempDomainTlds = domainSelected.split(".")[1]
    settlds(tempDomainTlds)
    setDomainName(tempDomain)
    dispatch(getDomainAvailablity(tempDomain))
    setcartValueFilled(true)


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const continueButtonCheckFalse = () => {
    setContinueButtonDisable(false);
  };
  const continueButtonChecktrue = () => {
    setContinueButtonDisable(true);
  };

  const CheckValidationFucn = () => {
    let data = {
      "user": users._id,
      "business": users.user_institute,
      "domain": domainName + `.` + tlds,
      "type": users.user_business_type
    }
    dispatch(postDomainSubmit(data));
  };

  // useEffect(() => {
  //   if (validationTrue || patchInstituteDetailsSuccess) {
  //     if (isInstituteEmpty.length > 0 && patchInstituteDetailsSuccess) {
  //       AddToCart();
  //     }
  //     if (
  //       validationTrue &&
  //       !isInstituteEmpty.length &&
  //       proceedCheckoutButtonCLick
  //     ) {
  //       AddToCart();
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   validationTrue,
  //   patchInstituteDetailsSuccess,
  //   proceedCheckoutButtonCLick,
  // ]);

  const AddToCart = () => {
  };

  // useEffect(() => {
  //   if (postUserDetailsSuccess && !postUserDetailsloading) {
  //     dispatch(postDomainSubmit(DomainInfoRegisterData()));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [postUserDetailsSuccess, postUserDetailsloading]);

  useEffect(() => {
    if (PostDomainInfoSuccess) {
      history("/payment-summary");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PostDomainInfoSuccess]);

  // const IsoCodeCountryWise = (institute_country) => {
  //   for (let i = 0; i < ZipCodes.zipCode.length; i++) {
  //     if (institute_country === ZipCodes.zipCode[i].Country) {
  //       return ZipCodes.zipCode[i].ISO;
  //     }
  //   }
  // };

  const DomainInfoRegisterData = () => {
    let data = {
      "user": users._id,
      "business": users.user_business,
      "domain": domainName + `.` + tlds,
      "type": users.user_business_type
    }
    return data
  }

  // useEffect(() => {
  //   if (users.token) {
  //     if (
  //       SessionStorage.alive(privateDomainProceedToCheckout) ||
  //       SessionStorage.alive(privateDomainBookNew)
  //     ) {
  //       dispatch(instituteDetailsData(users.user_institute));
  //     }
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [users]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(getInstiuteDetailsRESET());
  //   };
  // }, [dispatch]);

  // useEffect(() => {
  //   if (instituteDetailsSuccess && instituteDetails) {
  //     let arrIns = [];
  //     if (!instituteDetails.institute_address) {
  //       arrIns.push("institute_address");
  //     } else if (instituteDetails.institute_address.length > 67) {
  //       arrIns.push("institute_address");
  //     }
  //     if (!instituteDetails.institute_city) {
  //       arrIns.push("institute_city");
  //     }
  //     if (!instituteDetails.institute_country) {
  //       arrIns.push("institute_country");
  //     }
  //     if (!instituteDetails.institute_phone) {
  //       arrIns.push("institute_phone");
  //     } else if (instituteDetails.institute_phone.length < 10) {
  //       arrIns.push("institute_phone");
  //     }

  //     if (!instituteDetails.institute_zipcode) {
  //       arrIns.push("institute_zipcode");
  //     } else if (instituteDetails.institute_zipcode.length > 6) {
  //       arrIns.push("institute_zipcode");
  //     }
  //     if (!instituteDetails.institute_state) {
  //       arrIns.push("institute_state");
  //     }
  //     if (!instituteDetails.institute_phone_country_code) {
  //       arrIns.push("institute_phone_country_code");
  //     } else if (instituteDetails.institute_phone_country_code.length < 2) {
  //       arrIns.push("institute_phone_country_code");
  //     }
  //     setIsInsitiuteEmpty(arrIns);
  //     if (arrIns.length <= 0) {
  //       setValidationTrue(true);
  //     }
  //   }
  // }, [instituteDetails, instituteDetailsSuccess]);



  // useEffect(() => {
  //   if (userDetails.DomainInfo && userDetailSuccess) {
  //     if (
  //       SessionStorage.alive(privateDomainProceedToCheckout) &&
  //       SessionStorage.alive(privateDomain)
  //     ) {
  //       let data = SessionStorage.getJson(privateDomain);
  //       dispatch(getDomainAvailablity(data));
  //     } else {
  //       setDomainName(userDetails.DomainInfo.domain);
  //       settlds(userDetails.DomainInfo.domain_tlds);
  //       dispatch(getDomainAvailablity(userDetails.DomainInfo.domain));
  //     }
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userDetails, userDetailSuccess]);
  const changesdomainValues = (domain, tldsas) => {
    setDomainName(domain)
    settlds(tldsas)
  }

  const ValidationTrue = () => {
    setValidationTrue(true);
  };
  const ValidationFalse = () => {
    setValidationTrue(false);
  };

  return (
    <React.Fragment>
      <div className="">
        <div className="DomainCartWrapper mt-60">
          <div className="DomainCartCustom">
            <React.Fragment>
              {cartValueFilled && domainAvailableSuccess && domainAvailableData ? (
                <React.Fragment>
                  <div className="CartIconSection">
                    <i className="ed-icon icon-domain-cart primary i-85"></i>
                  </div>
                  <div className="domainTopInfo mb-20">
                    <div className="leftinfo">
                      <CartTop
                        privateDomainOffline={privateDomainOffline}
                        privateDomainProceedToCheck={
                          privateDomainProceedToCheck
                        }
                        privateDomainBook={privateDomainBook}
                        privateDomainAddnewIns={privateDomainAddnewIns}
                        continueButtonCheckFalse={() => continueButtonCheckFalse()}
                        continueButtonChecktrue={() => continueButtonChecktrue()}
                        changesdomainValues={(domain, tlds) => changesdomainValues(domain, tlds)}
                      />
                    </div>
                    <PackagePrice />
                  </div>
                  {/* {isInstituteEmpty.length > 0 ? (
                      <UpdateInstituteInfo
                        isInstituteEmpty={isInstituteEmpty}
                        ValidationTrue={() => ValidationTrue()}
                        ValidationFalse={() => ValidationFalse()}
                        finalFucntionSubmit={finalFucntionSubmit}
                      />
                    ) : (
                      ""
                    )} */}

                  <CartPrice
                    subdomain={subdomain}
                    privateDomainOffline={privateDomainOffline}
                    privateDomainAddnewIns={privateDomainAddnewIns}
                    AddToCart={() => CheckValidationFucn()}
                    privateDomainProceedToCheck={privateDomainProceedToCheck}
                    domainAvailableLoading={domainAvailableLoading}
                    continueButtonDisable={continueButtonDisable}
                  />
                </React.Fragment>
              ) : (
                <ComponentLoader />
              )}
            </React.Fragment>
            {/* <React.Fragment>
              <div className="CartIconSection">
                <i className="ed-icon icon-domain-cart primary i-85"></i>
              </div>
              <div className="domainTopInfo">
                <div className="leftinfo">
                  <CartTop
                    domainName={domainName}
                    tlds={tlds}
                    privateDomainOffline={privateDomainOffline}
                    privateDomainProceedToCheck={privateDomainProceedToCheck}
                    privateDomainBook={privateDomainBook}
                    privateDomainAddnewIns={privateDomainAddnewIns}
                    continueButtonCheckFalse={() =>
                      continueButtonCheckFalse()
                    }
                    continueButtonChecktrue={() => continueButtonChecktrue()}
                  />
                </div>
                <div className="aniWrapFlow">
                  <PackagePrice />
                </div>
              </div>
              <CartPrice
                subdomain={subdomain}
                privateDomainOffline={privateDomainOffline}
                privateDomainAddnewIns={privateDomainAddnewIns}
                AddToCart={() => CheckValidationFucn()}
                privateDomainProceedToCheck={privateDomainProceedToCheck}
                domainAvailableLoading={domainAvailableLoading}
                continueButtonDisable={continueButtonDisable}
              />
            </React.Fragment> */}
          </div>
        </div>
      </div>
      <CartDomainFeature />
    </React.Fragment>
  );
};

// DomainCart.defaultProps = {

//   continueButtonCheckFalse: () => { },
//   continueButtonChecktrue: () => { }

// };

// DomainCart.propTypes = {
//   continueButtonCheckFalse: func.isRequired,
//   continueButtonChecktrue: func.isRequired,
// };
export default DomainCart;
