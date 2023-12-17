import React, { useEffect, useState } from "react";
import SessionStorage from "../../Classes/SessionStorage";
import FormInput from "../../Common/Form/FormInput";
import ValidationFile from "../Auth/ValidationFile";
import FormError from "../../Common/Form/FormError";
import UserRequest from "../../store/actions/user/UserRequest";
const SubDomainSelection = ({
  EditSubDomainBool,
  submitCheckSubdomain,
  ChangeSubmitValidationCheck,
  regDomainData,
  setIsEditableSubDomainFunc,
}) => {
  // FUNCTIONAL COMPONENT RECIEVING PROPS FOR  SUBDOMAIN REGISTRATION

  // USING DISPACH HOOK FOR DATA MANIPULATION IN REDUX

  // LOCAL STATE VARIBALE FOR DOMAIN REGISTRATION

  const nonAllowedDomains = ["edneed", "www", "api", "blog"];

  const [domainNotExit, setdomainNotExist] = useState(false);
  const [domainAvailable, setdomainAvailable] = useState(false);
  const [noSpace, setNoSpace] = useState(false);
  const [nonValidDomain, setNonValidDomain] = useState(false);
  const [domainRegexNotValid, setDomainRegexNotValid] = useState(false);
  const [emptyCheck, setEmptyCheck] = useState(false);

  const [checkDomain, setcheckDomain] = useState({
    institute_subdomain: {
      value: "",
      isValid: false,
    },
  });

  useEffect(() => {
    if (submitCheckSubdomain) {
      getCheckHandleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCheckSubdomain]);

  useEffect(() => {
    if (SessionStorage.alive("DomainName")) {
      let domainName = SessionStorage.getJson("DomainName");
      let checkDomainData = {
        ...checkDomain,
        institute_subdomain: {
          value: domainName,
          isValid: ValidationFile.validEmpty(domainName),
        },
      };
      setcheckDomain(checkDomainData);
      getCheckHandleSubmitFirstCheck(domainName);
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (SessionStorage.alive(registrationWorkDone)) {
  //     if (SessionStorage.getBool(registrationWorkDone) === "true") {
  //       setdomainAvailable(true);
  //       setdomainNotExist(false);
  //     }
  //   }
  // }, [])

  // HANDLING FORM INPUT TO STATE VARIABLE
  const handleinput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value.toLowerCase();
    let val = inputValue.split(".");
    let checkDomainData = {
      ...checkDomain,
      [inputName]: {
        value: val[0],
        isValid: ValidationFile.validEmpty(val[0]),
      },
    };

    setcheckDomain(checkDomainData);
    setdomainNotExist(false);
    setNoSpace(false);
    setNonValidDomain(false);
    setDomainRegexNotValid(false);
    setEmptyCheck(false);
    setdomainAvailable(false);
    SessionStorage.setJson("DomainName", inputValue);
  };

  // CHECK FOR VALID DOMAIN
  const domainRegex = (domainName) => {
    if (domainName) {
      return ValidationFile.validDomain(domainName);
    } else {
      return ValidationFile.validDomain(checkDomain.institute_subdomain.value);
    }
  };

  // VALIDATION FOR NON ALLOWED DOMAIN
  const nonValidDomains = (domainName) => {
    if (domainName) {
      if (nonAllowedDomains.indexOf(domainName) < 0) {
        return true;
      } else {
        return false;
      }
    } else {
      if (
        nonAllowedDomains.indexOf(checkDomain.institute_subdomain.value) < 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  // VALIDATION FOR RESTRICTING SPACE
  const spaceNotAllowed = (domainName) => {
    if (domainName) {
      let val = domainName;
      let space = val.split(" ");
      if (space.length > 1) {
        return true;
      } else {
        return false;
      }
    } else {
      let val = checkDomain.institute_subdomain.value;
      let space = val.split(" ");
      if (space.length > 1) {
        return true;
      } else {
        return false;
      }
    }
  };

  // VALIDATION FOR RESTRICTING EMPTY FIELD
  const emptyDomainField = (domainName) => {
    if (domainName) {
      return ValidationFile.validEmpty(domainName);
    } else {
      return ValidationFile.validEmpty(checkDomain.institute_subdomain.value);
    }
  };


  ////// ON BLUR

  const OnBlurHandel = () => {
    getCheckHandleSubmit();
    setIsEditableSubDomainFunc();
  };
  // FINAL SUBMIT BEFORE CONTINUE
  const getCheckHandleSubmit = () => {
    const EmptyCheckDomain = emptyDomainField();
    const regex = domainRegex();
    const nonValidDomain = nonValidDomains();
    const spaceCheck = spaceNotAllowed();
    let subdomainVal = SessionStorage.getJson("DomainName");
    if (!spaceCheck) {
      if (nonValidDomain) {
        if (regex) {
          if (EmptyCheckDomain) {
            UserRequest.checkDomain(
              subdomainVal,
              (success) => {
                if (success.data.data.length) {
                  setdomainAvailable(false);
                  setdomainNotExist(true);
                  ChangeSubmitValidationCheck();
                } else {
                  setdomainAvailable(true);
                  setdomainNotExist(false);
                  regDomainData();
                }
              },
              (error) => {
              }
            );
          } else {
            setEmptyCheck(true);
            ChangeSubmitValidationCheck();
          }
        } else {
          setDomainRegexNotValid(true);
          ChangeSubmitValidationCheck();
        }
      } else {
        setNonValidDomain(true);
        ChangeSubmitValidationCheck();
      }
    } else {
      setNoSpace(true);
      ChangeSubmitValidationCheck();
    }
  };
  const getCheckHandleSubmitFirstCheck = (domainName) => {
    const EmptyCheckDomain = emptyDomainField(domainName);
    const regex = domainRegex(domainName);
    const nonValidDomain = nonValidDomains(domainName);
    const spaceCheck = spaceNotAllowed(domainName);
    //let subdomainVal = SessionStorage.getJson("DomainName")

    if (!spaceCheck) {
      if (nonValidDomain) {
        if (regex) {
          if (EmptyCheckDomain) {
            UserRequest.checkDomain(
              domainName,
              (success) => {
                if (success.data.data.length) {
                  setdomainAvailable(false);
                  setdomainNotExist(true);
                  ChangeSubmitValidationCheck();
                } else {
                  setdomainAvailable(true);
                  setdomainNotExist(false);
                  regDomainData();
                }
              },
              (error) => {
              }
            );
          } else {
            setEmptyCheck(true);
            ChangeSubmitValidationCheck();
          }
        } else {
          setDomainRegexNotValid(true);
          ChangeSubmitValidationCheck();
        }
      } else {
        setNonValidDomain(true);
        ChangeSubmitValidationCheck();
      }
    } else {
      setNoSpace(true);
      ChangeSubmitValidationCheck();
    }
  };

  // FINAL SUBMIT METHOD IS INVOKED IF CONTINUE BUTTON IS PRESSED

  return (
    <React.Fragment>
      <div className="SubdomainSuggestion">
        {EditSubDomainBool ? (
          <React.Fragment>
            <div className="SubdomainSuggestionItem">
              <FormInput
                onChange={handleinput}
                onBlur={() => {
                  OnBlurHandel();
                }}
                name="institute_subdomain"
                type="text"
                placeholder={checkDomain.institute_subdomain.value}
                defaultValue={checkDomain.institute_subdomain.value}
                autoFocus
              />
            </div>
            <div className="SubdomainSuggestionItem">
              <p className="text-xs">.edneed.com</p>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="SubdomainSuggestionItem">
              <div className="input-custom-type">
                <label>
                  <input type="radio" name="a" value="pd" defaultChecked />
                  {checkDomain.institute_subdomain.value}
                </label>
              </div>
            </div>
            <div className="SubdomainSuggestionItemItem">
              <p className="text-xs">.edneed.com</p>
            </div>
          </React.Fragment>
        )}
        {!domainAvailable &&
          domainNotExit &&
          emptyCheck &&
          domainRegexNotValid &&
          nonValidDomain &&
          noSpace && (
            <p className="text-xxs secondary mt-3">
              Also Subdomain is available!
            </p>
          )}
        <React.Fragment>
          {domainAvailable &&
            !domainNotExit &&
            !emptyCheck &&
            !domainRegexNotValid &&
            !nonValidDomain &&
            !noSpace && (
              <p className="text-xxs secondary mt-3">
                Congrats{" "}
                <strong>
                  {checkDomain.institute_subdomain.value}
                  .edneed.com
                </strong>{" "}
                is available!
              </p>
            )}
          <FormError
            show={domainNotExit}
            error="Your subdomain is Not available!"
          />
          <FormError show={emptyCheck} error="Enter Domain name." />
          <FormError
            show={domainRegexNotValid}
            error="Subdomain can only consist a-z & 0-9!"
          />
          <FormError
            show={nonValidDomain}
            error="Subdomain can't contain www, edneed, blog, api"
          />
          <FormError show={noSpace} error="Subdomain cannot contain space" />
        </React.Fragment>
      </div>
    </React.Fragment>
  );
};

export default SubDomainSelection;
