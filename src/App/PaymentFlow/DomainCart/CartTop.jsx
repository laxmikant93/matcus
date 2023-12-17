import FormInput from "../../../Common/Form/FormInput";
import React, { useEffect, useState } from "react";
import DomainSelectDropdown from "../../Landing/DomainSelectDropdown";
// import SessionStorage from "../../../Classes/SessionStorage";
// import {
//   privateDomain,
//   privateDomainProceedToCheckout,
//   privateDomainTLDS,
// } from "../../../Constant/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  getDomainAvailablity,
  getDomainAvailablityRESET,
} from "../../../store/actions/privateDomain";

import ValidationFile from "../../Auth/ValidationFile";
import FormError from "../../../Common/Form/FormError";
import { Link, useNavigate, useParams } from "react-router-dom";

const CartTop = ({
  privateDomainProceedToCheck,
  continueButtonCheckFalse,
  continueButtonChecktrue,
  changesdomainValues
}) => {
  // const continueButtonCheckFalse = () => {
  // }

  const dispatch = useDispatch();
  const history = useNavigate();

  const { domainSelected } = useParams();
  const [privateDomainValue, setPrivateDomainVal] = useState("");
  const [tldsVal, settldsVal] = useState("");
  const [suggestionShow, setSuggestionShow] = useState(false);
  const [onlyTLDSData, setOnlyTLDSData] = useState([]);
  const [suggestionResult, setSuggestionResult] = useState([]);
  const [responseClear, setResponseClear] = useState(false);
  const [defaultTldsNotAvailable, setDefaultTldsNotAvailable] = useState(false);
  const [domainSuggestionSelected, setDomainSuggestionSelected] =
    useState(false);
  const [selectedTlds, setSelectedTlds] = useState("");
  const [edneedError, setEdneedError] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [editDomainName, setEditDomainName] = useState(false);
  const [domainPreviouslySelected, setDomainPreviouslySelected] = useState("");
  const [domainSelectedAndTldsOnly, setDomainSelectedAndTldsOnly] =
    useState(false);
  const nonAllowedDomains = ["edneed", "www", "api", "blog"];

  useEffect(() => {
    changesdomainValues(privateDomainValue,
      tldsVal)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privateDomainValue,
    tldsVal])
  // useEffect(() => {
  //   if (SessionStorage.alive(privateDomain)) {
  //     let privateDomainName = SessionStorage.getJson(privateDomain);
  //     setPrivateDomainVal(privateDomainName);
  //     // if (privateDomainProceedToCheck) {
  //     //   dispatch(getDomainAvailablity(privateDomainName));
  //     // }
  //   }
  //   if (SessionStorage.alive(privateDomainTLDS)) {
  //     settldsVal(SessionStorage.getJson(privateDomainTLDS));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     dispatch(getDomainAvailablityRESET());
  //   };
  // }, [dispatch]);

  const {
    userDetails,
    userDetailSuccess,
    domainAvailableLoading,
    domainAvailableData,
    domainAvailableSuccess,
  } = useSelector((state) => {
    return {
      userDetails: state.privatedomain.getUserDetails.data,
      userDetailSuccess: state.privatedomain.getUserDetails.success,
      userDetailLoading: state.privatedomain.getUserDetails.loading,
      domainAvailableLoading: state.privatedomain.privateDomainAvailability.loading,
      domainAvailableSuccess: state.privatedomain.privateDomainAvailability.success,
      domainAvailableData: state.privatedomain.privateDomainAvailability.data,
    };
  });

  // useEffect(() => {
  //   if (users.token) {
  //     if (SessionStorage.alive(privateDomainProceedToCheckout)) {
  //       dispatch(getUserDetails(users._id, users.user_institute))
  //     }
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [users._id, users.token, users.user_institute])

  useEffect(() => {
    let tempDomain = ""
    let tempDomainTlds = ""
    tempDomain = domainSelected.split(".")[0]
    tempDomainTlds = domainSelected.split(".")[1]
    setPrivateDomainVal(tempDomain);
    settldsVal(tempDomainTlds);
    checkDomainAvailability(tempDomain, tempDomainTlds)
    //  else if (SessionStorage.alive(privateDomain)) {
    //   dispatch(getDomainAvailablity(SessionStorage.getJson(privateDomain)))
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails, userDetailSuccess]);

  const checkDomainAvailability = (domain, tlds) => {
    if (domainAvailableData.Available.includes(domain + `.` + tlds)) {
      setDefaultTldsNotAvailable(false);
      setDomainPreviouslySelected(tldsVal);
    } else {
      setSuggestionShow(true);
      setDefaultTldsNotAvailable(true);
      setDomainPreviouslySelected(tldsVal);
    }
  }

  // let output = [];
  // let onlyTLDS = [];
  // let suggestionList = [];
  // if (
  //   domainAvailableSuccess &&
  //   !responseClear &&
  //   domainAvailableData &&
  //   !domainAvailableLoading
  // ) {
  //   setResponseClear(true);
  //   if (domainAvailableData.suggestionResult) {
  //     setSuggestionShow(true);
  //     Object.keys(domainAvailableData.suggestionResult).map(function (item) {
  //       output.push(item);
  //       suggestionList.push({
  //         SuggestionName: item.split(".")[0],
  //         tlds: item.split(".")[1],
  //       });
  //       return output;
  //     });
  //     setSuggestionResult(suggestionList);
  //     SessionStorage.remove(privateDomainTLDS);
  //     setDefaultTldsNotAvailable(true);
  //   } else {
  //     Object.keys(domainAvailableData).map(function (item) {
  //       output.push(item);
  //       if (item.split(".")[1] === "co") {
  //         onlyTLDS.push({
  //           tlds: `.` + item.split(".")[1] + "." + item.split(".")[2],
  //           keys: item,
  //         });
  //       } else {
  //         onlyTLDS.push({ tlds: `.` + item.split(".")[1], keys: item });
  //       }
  //       return output;
  //     });

  //     setOnlyTLDSData(onlyTLDS);

  //     let availTlds = [];
  //     onlyTLDS.forEach((element) => {
  //       availTlds.push(element.tlds);
  //     });
  //     if (availTlds.length === 1 && tldsVal === availTlds[0]) {
  //       setDomainSelectedAndTldsOnly(true);
  //     } else {
  //       setDomainSelectedAndTldsOnly(false);
  //     }

  //     if (SessionStorage.alive(privateDomainTLDS)) {
  //       let tldsData = SessionStorage.getJson(privateDomainTLDS);
  //       if (availTlds.includes(tldsData)) {
  //         setDefaultTldsNotAvailable(false);
  //         setDomainPreviouslySelected(tldsData);
  //       } else {
  //         setDefaultTldsNotAvailable(true);
  //         setDomainPreviouslySelected(tldsData);
  //       }
  //     } else {
  //       if (availTlds.includes(userDetails.DomainInfo.domain_tlds)) {
  //         setDefaultTldsNotAvailable(false);
  //       } else {
  //         setDefaultTldsNotAvailable(true);
  //       }
  //     }
  //   }
  // }

  const SubmitPrivateDomain = (e) => {
    if (privateDomainValue !== "Choose the one suitable for you") {
      if (!edneedError && privateDomainValue) {
        history(`${privateDomainValue + `.com`}`)
        dispatch(getDomainAvailablity(privateDomainValue));
        setPrivateDomainVal(privateDomainValue);
        settldsVal(".com");
        setResponseClear(false);
      } else {
        setSubmit(true);
      }
    } else {
      setSubmit(true);
    }
  };

  const PrivateDomainNameChange = (e) => {
    setSubmit(false);
    let DomainValue = e.target.value.toLowerCase().trim();
    let Value = ValidationFile.filterDomainName(DomainValue);
    if (nonAllowedDomains.includes(Value.dvalue)) {
      setEdneedError(true);
    } else {
      setEdneedError(false);
      // SessionStorage.setJson(privateDomainTLDS, Value.tdlsVal);
      // SessionStorage.setJson(privateDomain, Value.dvalue);
      // if (SessionStorage.alive(privateDomainProceedToCheckout)) {

      // } else {
      //   SessionStorage.setJson(privateDomainTLDS, Value.tdlsVal);
      //   SessionStorage.setJson(privateDomain, Value.dvalue);
      // }
     
      setPrivateDomainVal(Value.dvalue);
      if (Value.tdlsVal) {
        settldsVal(Value.tdlsVal);
      } else {
        settldsVal(".com");
      }
    }
  };

  const handelAssignToUpdate = (e) => {
    let Domainvalue = e.target.value;
    setDomainSuggestionSelected(true);
    setSelectedTlds(Domainvalue);
    continueButtonCheckFalse();
  };

  const handelAssignInitialTlds = () => {
    setDomainSuggestionSelected(false);
    // SessionStorage.setJson(privateDomainTLDS, domainPreviouslySelected);
  };

  const handelChooseDomainSuggestion = (e) => {
    let item = e.target.value;
    history(`${item + `.com`}`)
    dispatch(getDomainAvailablity(item));
    setPrivateDomainVal(item);
    settldsVal(".com");

    // window.location.href = (`${item + `.com`}`)
    // let onlyDomain = item.split(".")[0]
    // let onlyTlds = item.split(".")[0]
    // dispatch(getDomainAvailablity(onlyDomain));
    // setSuggestionShow(false);
    // setPrivateDomainVal(onlyDomain);
    // settldsVal(onlyTlds);
    // setResponseClear(false);
    // setDefaultTldsNotAvailable(false);
  };

  const OpenEditDomain = () => {
    continueButtonChecktrue();
    setEditDomainName(true);
    setOnlyTLDSData([]);
    //setSuggestionShow(false)
    setPrivateDomainVal("Choose the one suitable for you");
    settldsVal("");
  };
  // const checkDomainAvailability = () => {
  //   setEditDomainName(false)
  //   setSuggestionShow(false)
  //   output = [];
  //   onlyTLDS = [];
  //   suggestionList = [];
  //   setOnlyTLDSData([])

  // }

  // useEffect(() => {
  //   if (domainAvailableSuccess && domainAvailableData) {
  //     setEditDomainName(false);
  //     if (domainAvailableData.suggestionResult) {
  //       setSuggestionShow(true);
  //     } else {
  //       setSuggestionShow(false);
  //     }
  //   }
  // }, [domainAvailableSuccess, domainAvailableData]);

  useEffect(() => {
    if (suggestionShow || defaultTldsNotAvailable) {
      continueButtonChecktrue();
    } else {
      continueButtonCheckFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestionShow, defaultTldsNotAvailable]);
  return (
    <div className="CartTopCustom">
      {defaultTldsNotAvailable && domainAvailableSuccess && !editDomainName ? (
        <>
          <p className="text-xs w-500 red mt-60">
            Sorry, {privateDomainValue + `.` + tldsVal} is already taken!
          </p>
        </>
      ) : (
        <>
          {!editDomainName && (
            <p className="secondary text-xxs mt-8 w-500">
              Your institute domain is available.
            </p>
          )}
        </>
      )}
      {defaultTldsNotAvailable && domainAvailableSuccess ? (
        ""
      ) : (
        <>
          {editDomainName ? (
            <>
              <div className="input-custom-type mt-10">
                <label>
                  <input
                    type="radio"
                    name="tldsName"
                    value={domainPreviouslySelected}
                    onChange={handelAssignInitialTlds}
                    checked={
                      !defaultTldsNotAvailable && !domainSuggestionSelected
                    }
                  />
                  {privateDomainValue + tldsVal}
                </label>
              </div>
              <p>&nbsp;</p>
            </>
          ) : (
            <>
              {privateDomainValue && !editDomainName && (
                <p className="text-sm w-600 base">
                  {privateDomainValue + `.` + tldsVal}
                </p>
              )}
            </>
          )}
        </>
      )}
      {defaultTldsNotAvailable && domainAvailableSuccess && (
        <>
          {suggestionShow === true && !domainAvailableData.Available.length > 0 ? (
            <React.Fragment>
              <p className="text-2xs red mt-3">
                This domain name {privateDomainValue + `.` + tldsVal} is unavailable.
                You can choose from the amazing suggestions below.
              </p>
              <div className="suggestDomainNameList mt-8">
                <div className="input-custom-type">
                  <p className="text-xxs secondary red">
                    Your Domain {privateDomainValue + `.` + tldsVal} is not available!
                  </p>
                  {domainAvailableSuccess && domainAvailableData.Suggestions.length > 0 ? (
                    domainAvailableData.Suggestions.length > 0 ? (
                      domainAvailableData.Suggestions.slice(0, 8).map((item, key) => {
                        return (
                          <React.Fragment key={key}>
                            <label>
                              <input
                                type="radio"
                                name="SuggestionName"
                                value={item}
                                onChange={handelChooseDomainSuggestion}
                              />
                              {item}
                            </label>
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <p>No Record Found.</p>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </React.Fragment>
          ) : (
            ""
          )}
        </>
      )
      }
      {
        !editDomainName && (
          <p className="text-xxs primary underline" onClick={OpenEditDomain}>
            Want to change Private Domain
          </p>
        )
      }

      {editDomainName && (
        <div className="EditcartDomainName">
          <div className="ecdnTxtWrap">
            <p className="text-xs w-600 base">
              {privateDomainValue + tldsVal}
            </p>
          </div>
          <div className="formFieldwrap">
            <FormInput
              type="text"
              placeholder="Enter your domain name."
              onChange={PrivateDomainNameChange}
            />
            <FormError
              show={submit && !edneedError && (!privateDomainValue || privateDomainValue == "Choose the one suitable for you")}
              error="Please enter your domain name."
              className="text-xs "
            />
            <FormError
              show={submit && edneedError}
              error="Domain can't contain www, edneed, blog, api."
              className="text-xs"
            />
          </div>
          {editDomainName && (
            <div className="SearchcartDomainName mb-20">
              {domainAvailableLoading ? (
                <button className="button btn-o-primary btn-oval btn-md button-block">
                  Checking...
                </button>
              ) : (
                <button
                  className="button btn-o-primary btn-md btn-oval button-block"
                  onClick={SubmitPrivateDomain}
                >
                  Check Availability
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {domainAvailableData.Available.length > 0 && !editDomainName && (
        <DomainSelectDropdown
          privateDomainValue={privateDomainValue}
          onlyTLDSData={domainAvailableData.Available}
          handelAssignToUpdate={(e) => handelAssignToUpdate(e)}
          tldsVal={tldsVal}
          selectedTlds={selectedTlds}
          domainSuggestionSelected={domainSuggestionSelected}
          changesdomainValues={(selectedTlds, tldsVal) => changesdomainValues(selectedTlds, tldsVal)}
        />
      )}


    </div >
  );
};

export default CartTop;
