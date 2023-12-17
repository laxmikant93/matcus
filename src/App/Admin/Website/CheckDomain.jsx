import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import FormInput from "../../../Common/Form/FormInput";
import CommonHomeTheme from "../../../Common/Theme/CommonHomeTheme";
import ComponentLoader from "../../../Common/Loader/ComponentLoader";
import DomainSelectDropdown from "../../Landing/DomainSelectDropdown";
import SessionStorage from "../../../Classes/SessionStorage";
import {
  createPrivateDomainNewInstiute,
  instiid,
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
  reviewValue,
  totalPriceValue,
  uid,
} from "../../../Constant/auth";
import { useNavigate } from "react-router-dom";
import {
  getDomainAvailablity,
  getDomainAvailablityRESET,
  getDomainDetails,
} from "../../../store/actions/privateDomain";
import { useDispatch, useSelector } from "react-redux";
import FormError from "../../../Common/Form/FormError";
import ValidationFile from "../../Auth/ValidationFile";
import Storage from "../../../Classes/Storage";
import "./CheckDomain.scss";
import { useParams } from "react-router-dom";
const CheckDomain = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { domainName } = useParams()
  const {
    user,
    domainAvailableLoading,
    domainAvailableData,
    domainAvailableSuccess,
    instituteData,
    instituteDataSuccess,
    postedDomainDetailsData,
    postedDomainDetailsSuccess

  } = useSelector((state) => {
    return {
      user: state.user,
      instituteData: state.institute.detail.data,
      instituteDataSuccess: state.institute.detail.success,
      domainAvailableLoading:
        state.privatedomain.privateDomainAvailability.loading,
      domainAvailableSuccess:
        state.privatedomain.privateDomainAvailability.success,
      domainAvailableData: state.privatedomain.privateDomainAvailability.data,
      postedDomainDetailsData: state.privatedomain.domainDetailsGet.data,
      postedDomainDetailsSuccess: state.privatedomain.domainDetailsGet.success,
    };
  });

  // useEffect(() => {
  //   SessionStorage.remove(privateDomainOpt);
  //   SessionStorage.remove(privateDomain);
  //   SessionStorage.remove(privateDomainTLDS);
  //   SessionStorage.remove(createPrivateDomainNewInstiute);
  //   SessionStorage.remove(registrationWorkDone);
  //   SessionStorage.remove(registerDetails);
  //   SessionStorage.remove(totalPriceValue);
  //   SessionStorage.remove(PaymentComplete);
  //   SessionStorage.remove(privateDomainOfflineFlow);
  //   SessionStorage.remove(privateDomainProceedToCheckout);
  //   SessionStorage.remove(reviewValue);
  //   SessionStorage.remove("UserRegistration");
  //   SessionStorage.remove("RegisterInstitiute");
  //   SessionStorage.remove("DomainName");
  //   SessionStorage.remove(uid);
  //   SessionStorage.remove(instiid);
  //   Storage.remove("__wz_pd_offl__");
  //   Storage.remove("__wz_pd_adni__");
  //   SessionStorage.remove("InstituteWebsite");
  //   Storage.remove("__wz_pd_adni__");
  //   Storage.remove("registerDetails");
  //   Storage.remove("__wz_pd_ip__");
  // }, []);

  // useEffect(() => {
  //   if (SessionStorage.alive(privateDomainAddNewIns)) {
  //     setAddnewInstitute(true);
  //   } else {
  //     setAddnewInstitute(false);
  //   }
  //   if (SessionStorage.alive(privateDomainBookNew)) {
  //     setBookNewDomain(true);
  //   } else {
  //     setBookNewDomain(false);
  //   }
  // }, []);

  useEffect(() => {
    return () => {
      dispatch(getDomainAvailablityRESET());
    };
  }, [dispatch]);

  const [suggestionShow, setSuggestionShow] = useState(false);
  const [onlyTLDSData, setOnlyTLDSData] = useState([]);
  const [suggestionResult, setSuggestionResult] = useState([]);
  const [responseClear, setResponseClear] = useState(false);
  const [defaultTldsNotAvailable, setDefaultTldsNotAvailable] = useState(false);
  const [domainSuggestionSelected, setDomainSuggestionSelected] =
    useState(false);
  const [domainPreviouslySelected, setDomainPreviouslySelected] = useState("");
  const [domainSelectedAndTldsOnly, setDomainSelectedAndTldsOnly] =
    useState(false);
  const [selectedTlds, setSelectedTlds] = useState("");
  const [bookNewDomain, setBookNewDomain] = useState(false);
  const [addNewInstitute, setAddnewInstitute] = useState(false);
  const [domain, setDomain] = useState("");
  const [tlds, setTlds] = useState("");
  const [submit, setSubtmiShow] = useState(false);
  const [edneedError, setEdneedError] = useState(false);
  const [IsCheckAvailablity, setIsCheckAvailablity] = useState(false);
  const [setTldsSuggestion, setShowTldsSuggestion] = useState(false);
  const [
    tldsSelectedForNonDefultTldsAvailable,
    setTldsSelectedForNonDefultTldsAvailable,
  ] = useState(false);
  const nonAllowedDomains = ["edneed", "www", "api", "blog"];

  const onChange = (e) => {
    setSubtmiShow(false);
    let DomainValue = e.target.value.toLowerCase().trim();
    let Value = ValidationFile.filterDomainName(DomainValue);

    if (nonAllowedDomains.includes(Value.dvalue)) {
      setEdneedError(true);
    } else {
      setDomain(Value.dvalue);
      setTlds(Value.tdlsVal);
      setEdneedError(false);
    }
  };

  // const handleSubmit = () => {
  //   setSubtmiShow(true);
  //   if (!domain || edneedError) {
  //   } else {
  //     SessionStorage.setBool(privateDomainOpt, true);
  //     SessionStorage.setJson(privateDomainTLDS, tlds);
  //     SessionStorage.setJson("DomainName", domain);
  //     SessionStorage.setJson(privateDomain, domain);
  //     history("/register-institute");
  //   }
  // };

  // useEffect(() => {
  //   if (SessionStorage.alive(privateDomain)) {
  //     let privateDomainName = SessionStorage.getJson(privateDomain);
  //     setDomain(privateDomainName);
  //   }
  //   if (SessionStorage.alive(privateDomainTLDS)) {
  //     setTlds(SessionStorage.getJson(privateDomainTLDS));
  //   }
  // }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(getDomainAvailablityRESET());
    };
  }, [dispatch]);

  let output = [];
  let onlyTLDS = [];
  let suggestionList = [];

  useEffect(() => {
    if (postedDomainDetailsSuccess && postedDomainDetailsData && postedDomainDetailsData.domain) {
      history(`/myCart/${postedDomainDetailsData.domain}`);
    }
  }, [postedDomainDetailsSuccess, postedDomainDetailsData])

  useEffect(() => {
    dispatch(getDomainDetails(user._id, user.user_institute, user.user_business_type))
  }, [])

  useEffect(() => {
    if (domainAvailableSuccess && !responseClear && domainAvailableData && !domainAvailableLoading) {
      if (domainAvailableData.Available.length > 0) {
        setIsCheckAvailablity(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        onlyTLDS = domainAvailableData.Available
        setOnlyTLDSData(onlyTLDS);
        if (onlyTLDS.includes(domain + tlds)) {
          setDefaultTldsNotAvailable(false);
          setDomainPreviouslySelected(tlds);
          setTldsSelectedForNonDefultTldsAvailable(false);
        } else {
          setTldsSelectedForNonDefultTldsAvailable(true);
          setDefaultTldsNotAvailable(true);
          setDomainPreviouslySelected(tlds);
        }
      } else {
        setResponseClear(true);
        setSubtmiShow(false);
        if (domainAvailableData.Suggestions) {
          setSuggestionShow(true);
          domainAvailableData.Suggestions.map(function (item) {
            output.push(item);
            suggestionList.push({
              SuggestionName: item.split(".")[0],
              tlds: item.split(".")[1],
            });
            return output;
          });
          setSuggestionResult(suggestionList);
          // SessionStorage.remove(privateDomainTLDS);
        }
      }
    }
  }, [domainAvailableSuccess, responseClear, domainAvailableData, domainAvailableLoading])


  const SubmitPrivateDomain = () => {
    setSubtmiShow(true);

    if (!edneedError && domain) {
      dispatch(getDomainAvailablity(domain));
      setResponseClear(false);
      setShowTldsSuggestion(true);
      output = [];
      onlyTLDS = [];
      suggestionList = [];
      setOnlyTLDSData([]);
      setResponseClear(false);
    } else {
    }
  };

  const PrivateDomainNameChange = (e) => {
    setSubtmiShow(false);
    setIsCheckAvailablity(false);
    setShowTldsSuggestion(false);
    setOnlyTLDSData([]);
    let DomainValue = e.target.value.toLowerCase().trim();
    if (DomainValue) {
      let Value = ValidationFile.filterDomainName(DomainValue);
      if (nonAllowedDomains.includes(Value.dvalue)) {
        setEdneedError(true);
      } else {
        setEdneedError(false);
        setDomain(Value.dvalue);
        setTlds(Value.tdlsVal);
      }
    } else {
      setDomain("");
      setTlds("");
    }
  };

  const handelAssignToUpdate = async (e) => {
    let Domainvalue = e.target.value;
    // SessionStorage.setJson(privateDomainTLDS, Domainvalue);
    setDomainSuggestionSelected(true);
    await setSelectedTlds(Domainvalue);
    // setTlds(Domainvalue);
    setTldsSelectedForNonDefultTldsAvailable(false);
  };

  const handelAssignInitialTlds = () => {
    setDomainSuggestionSelected(false);
    // SessionStorage.setJson(privateDomainTLDS, domainPreviouslySelected);
  };

  const handelChooseDomainSuggestion = (e) => {
    let item = e.target.value;
    dispatch(getDomainAvailablity(item));
    setSuggestionShow(false);
    setDomain(item);
    setOnlyTLDSData([]);
    setResponseClear(false);
  };

  useEffect(() => {
    if (domainName) {
      setDomain(domainName);
      setTlds(".com");
      SubmitPrivateDomain();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domainName, domain])

  const ContinuePrivateDomainAlready = () => {
    if (domain && IsCheckAvailablity && !tldsSelectedForNonDefultTldsAvailable) {
      if (domainSuggestionSelected) {
        history(`/myCart/${selectedTlds}`);
      } else {
        history(`/myCart/${domain + tlds}`);
      }
    } else {
      setSubtmiShow(true);
    }
    setSubtmiShow(true);
  };

  const [symbolsArr] = useState(["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "=", "+", ".", " ", "/", "<", ">", ";", ":", "'"]);
  return (
    <React.Fragment>
      {
        postedDomainDetailsSuccess ? (
          <div className="CheckDomainWrapper">
            <CommonHomeTheme>
              <React.Fragment>
                <p className="CheckDomainCustomHead w-300">
                  <span className="primary">Create</span> a fully functional
                  <span className="primary"> Website</span>
                </p>
                <p className="CheckDomainCustomSubHead w-300">
                  For your institute
                  <span className="primary"> within 2 Mins.</span> No coding
                  required!
                </p>

                <div className="CheckDomainCustom mt-50">
                  <p className="text-xs text-center ">
                    To start with, check your institute's domain availability.
                  </p>
                  <div className="checkDomainAvailability mt-10">
                    {domainName ?
                      <FormInput
                        onChange={PrivateDomainNameChange}
                        type="text"
                        value={domainName}
                        placeholder="Type to search your institute's domain"
                        onKeyDown={(e) =>
                          symbolsArr.includes(e.key) && e.preventDefault()
                        }
                      /> :
                      <FormInput
                        onChange={PrivateDomainNameChange}
                        type="text"
                        defautlValue={domain + tlds}
                        placeholder="Type to search your institute's domain"
                        onKeyDown={(e) =>
                          symbolsArr.includes(e.key) && e.preventDefault()
                        }
                      />
                    }
                    <FormError
                      show={submit && !edneedError && !domain}
                      error="Please enter your domain name."
                      className="text-xs w-500"
                    />
                    <FormError
                      show={submit && edneedError}
                      error="Domain can't contain www, edneed, blog, api."
                      className="text-xs w-500"
                    />
                    <FormError
                      show={
                        domain &&
                        !domainAvailableLoading &&
                        !IsCheckAvailablity &&
                        submit
                      }
                      error="Check the availability first."
                      className="text-xs w-500"
                    />
                    {onlyTLDSData.length > 0 && setTldsSuggestion && (
                      <React.Fragment>
                        {defaultTldsNotAvailable ? (
                          <>
                            <div className="input-custom-type mt-10">
                              <p className="text-sm w-700 base">
                                {domain + tlds}
                              </p>
                              <p className="text-xxs mt-3 secondary red">
                                The domain name {domain + tlds} is unavailable.
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="input-custom-type mt-10">
                              <p className="text-xxs base"></p>
                              <label>
                                <input
                                  type="radio"
                                  name="tldsName"
                                  value={domainPreviouslySelected}
                                  onChange={handelAssignInitialTlds}
                                  checked={
                                    !defaultTldsNotAvailable &&
                                    !domainSuggestionSelected
                                  }
                                />
                                {domain + tlds}
                              </label>
                              <p className="text-xs mt-8 secondary mb-10">
                                Domain {domain + tlds} is available.
                              </p>
                            </div>
                          </>
                        )}
                      </React.Fragment>
                    )}
                  </div>
                  {onlyTLDSData.length > 0 &&
                    !domainSelectedAndTldsOnly &&
                    setTldsSuggestion && (
                      <DomainSelectDropdown
                        privateDomainValue={domain}
                        onlyTLDSData={onlyTLDSData}
                        handelAssignToUpdate={(e) => handelAssignToUpdate(e)}
                        tldsVal={tlds}
                        selectedTlds={selectedTlds}
                        domainSuggestionSelected={domainSuggestionSelected}
                      />
                    )}
                  {suggestionShow && (
                    <div className="suggestDomainNameList mt-20">
                      <div className="input-custom-type">
                        <p className="text-xs w-600 secondary red">
                          Your Domain {domain + tlds} is not available!
                        </p>
                        {domainAvailableSuccess && suggestionResult.length > 0 ? (
                          suggestionResult.length > 0 ? (
                            suggestionResult.slice(0, 8).map((item, key) => {
                              return (
                                <React.Fragment key={key}>
                                  <label>
                                    <input
                                      type="radio"
                                      name="SuggestionName"
                                      value={item.SuggestionName}
                                      onChange={handelChooseDomainSuggestion}
                                    />
                                    {item.SuggestionName}
                                  </label>
                                </React.Fragment>
                              );
                            })
                          ) : (
                            <p>No Record Found</p>
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  )}
                  {domainAvailableLoading && (
                    <button className="button btn-sm button-primary button-block">
                      Checking...
                    </button>
                  )}
                  {!onlyTLDSData.length > 0 && !domainAvailableLoading && (
                    <button
                      className="button btn-sm button-primary button-block"
                      type="button"
                      onClick={SubmitPrivateDomain}
                    >
                      Check Availability
                    </button>
                  )}
                  {onlyTLDSData.length > 0 && (
                    <button
                      className="button btn-sm button-primary button-block"
                      onClick={ContinuePrivateDomainAlready}
                    >
                      Continue
                    </button>
                  )}
                </div>
              </React.Fragment>
            </CommonHomeTheme>
          </div>) : (
          <ComponentLoader />
        )
      }

    </React.Fragment>
  );
};

export default CheckDomain;
