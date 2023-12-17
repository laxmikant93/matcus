import React, { useEffect, useState } from "react";
import DomainSelectDropdown from "./DomainSelectDropdown";
import SessionStorage from "../../Classes/SessionStorage";
import { privateDomain, privateDomainTLDS } from "../../Constant/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  getDomainAvailablity,
  getDomainAvailablityRESET,
} from "../../store/actions/privateDomain";
import FormInput from "../../Common/Form/FormInput";
import ValidationFile from "../Auth/ValidationFile";
import FormError from "../../Common/Form/FormError";

const PrivateDomainSelection = ({
  EditPrivateDomainBool,
  setIsEditablePrivateDomainFunc,
  regPrivateDomainData,
  ChangeSubmitValidationCheck,
  privateDomainGo
}) => {

  const dispatch = useDispatch();
  const [privateDomainValue, setPrivateDomainVal] = useState("");
  const [tldsVal, settldsVal] = useState("");
  const [suggestionShow, setSuggestionShow] = useState(false);
  const [onlyTLDSData, setOnlyTLDSData] = useState([]);
  const [suggestionResult, setSuggestionResult] = useState([]);
  const [responseClear, setResponseClear] = useState(false);
  const [defaultTldsNotAvailable, setDefaultTldsNotAvailable] = useState(false);
  const [domainSuggestionSelected, setDomainSuggestionSelected] = useState(false);
  const [domainPreviouslySelected, setDomainPreviouslySelected] = useState("");
  const [domainSelectedAndTldsOnly, setDomainSelectedAndTldsOnly] = useState(false);
  const [selectedTlds, setSelectedTlds] = useState("");
  const [edneedError, setEdneedError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [privateDomainGoCheck, setPrivateDomainGoCheck] = useState(false);
  const nonAllowedDomains = ["edneed", "www", "api", "blog"];


  useEffect(() => {
    if (privateDomainGo) {
      if (privateDomainGoCheck) {
        regPrivateDomainData()
      } else {
        ChangeSubmitValidationCheck()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privateDomainGo])

  useEffect(() => {
    if (SessionStorage.alive(privateDomain)) {
      let privateDomainName = SessionStorage.getJson(privateDomain);
      setPrivateDomainVal(privateDomainName);
      dispatch(getDomainAvailablity(privateDomainName));
    }
    if (SessionStorage.alive(privateDomainTLDS)) {
      settldsVal(SessionStorage.getJson(privateDomainTLDS));
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(getDomainAvailablityRESET());
    };
  }, [dispatch]);

  const {
    domainAvailableLoading,
    domainAvailableData,
    domainAvailableSuccess,
  } = useSelector((state) => {
    return {
      domainAvailableLoading:
        state.privatedomain.privateDomainAvailability.loading,
      domainAvailableSuccess:
        state.privatedomain.privateDomainAvailability.success,
      domainAvailableData: state.privatedomain.privateDomainAvailability.data,
    };
  });

  let output = [];
  let onlyTLDS = [];
  let suggestionList = [];
  if (domainAvailableSuccess && !responseClear && domainAvailableData && !domainAvailableLoading) {
    setResponseClear(true);
    if (domainAvailableData.suggestionResult) {
      setPrivateDomainGoCheck(false)
      setSuggestionShow(true);
      Object.keys(domainAvailableData.suggestionResult).map(function (item) {
        output.push(item);
        suggestionList.push({
          SuggestionName: item.split(".")[0],
          tlds: item.split(".")[1],
        });
        return output;
      });
      setSuggestionResult(suggestionList);
      SessionStorage.remove(privateDomainTLDS);
    } else {
      Object.keys(domainAvailableData).map(function (item) {
        output.push(item);
        if (item.split(".")[1] === "co") {
          onlyTLDS.push({
            tlds: `.` + item.split(".")[1] + "." + item.split(".")[2],
            keys: item,
          });
        } else {
          onlyTLDS.push({ tlds: `.` + item.split(".")[1], keys: item });
        }
        return output;
      });

      setOnlyTLDSData(onlyTLDS)
      setPrivateDomainGoCheck(true)
      let availTlds = [];
      onlyTLDS.forEach((element) => {
        availTlds.push(element.tlds);
      });
      if (availTlds.length === 1 && tldsVal === availTlds[0]) {
        setDomainSelectedAndTldsOnly(true)
      } else {
        setDomainSelectedAndTldsOnly(false)
      }
      if (availTlds.includes(tldsVal)) {
        setDefaultTldsNotAvailable(false)
        setDomainPreviouslySelected(tldsVal)
      } else {
        setPrivateDomainGoCheck(false)
        setDefaultTldsNotAvailable(true)
        setDomainPreviouslySelected(tldsVal)
      }
    }
  }

  const SubmitPrivateDomain = () => {
    if (!edneedError && privateDomainValue) {
      dispatch(getDomainAvailablity(privateDomainValue));
      setIsEditablePrivateDomainFunc();
      setResponseClear(false);
      output = [];
      onlyTLDS = [];
      suggestionList = [];
      setOnlyTLDSData([])
    } else {
      setShowError(true)
    }
  };

  const PrivateDomainNameChange = (e) => {
    setShowError(false);
    setPrivateDomainGoCheck(false)
    let DomainValue = e.target.value.toLowerCase().trim();
    let Value = ValidationFile.filterDomainName(DomainValue)
    if (nonAllowedDomains.includes(Value.dvalue)) {
      setEdneedError(true)
    } else {
      setEdneedError(false)
      SessionStorage.setJson(privateDomainTLDS, Value.tdlsVal);
      SessionStorage.setJson(privateDomain, Value.dvalue);
      setPrivateDomainVal(Value.dvalue)
      settldsVal(Value.tdlsVal);
    }
  };

  const handelAssignToUpdate = (e) => {
    let Domainvalue = e.target.value;
    SessionStorage.setJson(privateDomainTLDS, Domainvalue);
    setDomainSuggestionSelected(true)
    setPrivateDomainGoCheck(true)
    setSelectedTlds(Domainvalue)
  };

  const handelAssignInitialTlds = () => {
    // if (defaultTldsNotAvailable && !EditPrivateDomainBool) {
    //   setPrivateDomainGoCheck(true)
    // }
    setDomainSuggestionSelected(false);
    SessionStorage.setJson(privateDomainTLDS, domainPreviouslySelected);
  }

  const handelChooseDomainSuggestion = (e) => {
    let item = e.target.value
    SessionStorage.setJson(privateDomain, item);
    dispatch(getDomainAvailablity(item));
    setSuggestionShow(false);
    setPrivateDomainVal(item);
    setOnlyTLDSData([]);
    setResponseClear(false);
    SessionStorage.setJson(privateDomainTLDS, ".com");
  };
  useEffect(() => {
    if (EditPrivateDomainBool) {
      setSuggestionShow(false);
    }
  }, [EditPrivateDomainBool])
  return (
    <React.Fragment>
      {domainAvailableData && domainAvailableSuccess && responseClear ? (
        <React.Fragment>
          {suggestionShow ? (
            <React.Fragment>
              <div className="PrivateAndSubDomainItem">
                <div className="PrivateAndSubDomainLeftCnt">
                  <div className="input-custom-type">
                    <label>
                      <input type="radio" name="domain" checked />
                      {privateDomainValue}{tldsVal}
                    </label>
                  </div>
                  <p className="text-xxs secondary red">
                    Your Domain {privateDomainValue} is not available!
                  </p>
                </div>
                <div className="PrivateAndSubDomainRightCnt"></div>
              </div>
              <div className="suggestDomainNameList">
                <div className="input-custom-type">
                  {domainAvailableSuccess && suggestionResult.length > 0 ? (
                    suggestionResult.length > 0 ? (
                      suggestionResult.slice(0, 8).map((item, key) => {
                        return (
                          <React.Fragment key={key}>
                            <label>
                              <input type="radio" name="SuggestionName" value={item.SuggestionName} onChange={handelChooseDomainSuggestion} />
                              {item.SuggestionName}
                            </label>
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <p>No Record Found</p>
                    )
                  ) : (
                    <p>Loading</p>
                  )}
                </div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="PrivateAndSubDomainItem">
                {EditPrivateDomainBool ? (
                  <React.Fragment>
                    <FormInput
                      onChange={PrivateDomainNameChange}
                      onBlur={() => {
                        SubmitPrivateDomain();
                      }}
                      name="domainname"
                      type="text"
                      placeholder={privateDomainValue}
                      defaultValue={privateDomainValue + tldsVal}
                      autoFocus
                    />
                    <FormError
                      show={showError && !edneedError}
                      error="Please enter your domain name."
                      className="text-xs w-500 "
                    />
                    <FormError
                      show={edneedError}
                      error="Domain can't contain www, edneed, blog, api."
                      className="text-xs w-500 "
                    />
                  </React.Fragment>

                ) : (
                  <div className="input-custom-type">
                    <label>
                      <input type="radio" name="PrivateDomain" value={domainPreviouslySelected} onChange={handelAssignInitialTlds} checked={!defaultTldsNotAvailable && !domainSuggestionSelected} />
                      {privateDomainValue}{tldsVal}
                    </label>
                  </div>
                )}
                {defaultTldsNotAvailable && !EditPrivateDomainBool ? (
                  <p className="text-xxs secondary mt-3 red">The domain name is unavailable. You can choose from amazing suggestions below.</p>
                ) : (
                  <>
                    {
                      EditPrivateDomainBool ? (
                        " "
                      ) : (
                        <p className="text-xxs secondary mt-3">Domain is available!</p>
                      )
                    }
                  </>
                )}
              </div>

              {!EditPrivateDomainBool && !domainSelectedAndTldsOnly && (
                <div className="PrivateAndSubDomainRightCnt">
                  {onlyTLDSData.length > 0 && (
                    <DomainSelectDropdown
                      privateDomainValue={privateDomainValue}
                      onlyTLDSData={onlyTLDSData}
                      handelAssignToUpdate={(e) => handelAssignToUpdate(e)}
                      tldsVal={tldsVal}
                      selectedTlds={selectedTlds}
                      domainSuggestionSelected={domainSuggestionSelected}
                    />
                  )}
                </div>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="PrivateAndSubDomainItem">
            <p className="text-xxs secondary mt-3">Loading...</p>
          </div>
        </React.Fragment>
      )
      }
    </React.Fragment >
  );
};

export default PrivateDomainSelection;
