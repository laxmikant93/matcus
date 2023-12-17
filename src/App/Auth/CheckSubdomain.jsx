import React, { useEffect, useState } from "react";
import SessionStorage from "../../Classes/SessionStorage";
// import FormInput from "../../Common/Form/FormInput";
import ValidationFile from "../Auth/ValidationFile";
import FormError from "../../Common/Form/FormError";
import UserRequest from "../../store/actions/user/UserRequest";
import AppLink from "../../Common/AppLink";
import { useNavigate } from "react-router-dom";
const CheckSubdomain = () => {
  // FUNCTIONAL COMPONENT RECIEVING PROPS FOR  SUBDOMAIN REGISTRATION

  // USING DISPACH HOOK FOR DATA MANIPULATION IN REDUX

  // LOCAL STATE VARIBALE FOR DOMAIN REGISTRATION
  const history = useNavigate()
  const nonAllowedDomains = ["edneed", "www", "api", "blog"];

  const [symbolsArr] = useState([" ", ",", '"', `'`, "!", "@", "`", "~", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "=", "+", ".", "<", ">", "/", "?", ":", ";", "{", "}", "[", "]", `|`]);

  const [domainNotExit, setdomainNotExist] = useState(false);
  const [domainAvailable, setdomainAvailable] = useState(false);
  const [noSpace, setNoSpace] = useState(false);
  const [nonValidDomain, setNonValidDomain] = useState(false);
  const [domainRegexNotValid, setDomainRegexNotValid] = useState(false);
  const [emptyCheck, setEmptyCheck] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false)
  const [validationError, setValidationError] = useState(false)
  const [checkDomain, setcheckDomain] = useState({
    institute_subdomain: {
      value: "",
      isValid: false,
    },
  });



  useEffect(() => {
    if (SessionStorage.alive("subdomain")) {
      let domainName = SessionStorage.getJson("subdomain");
      let checkDomainData = {
        ...checkDomain,
        institute_subdomain: {
          value: domainName.institute_subdomain.value,
          isValid: ValidationFile.validEmpty(domainName.institute_subdomain.value),
        },
      };
      setcheckDomain(checkDomainData);
      getCheckHandleSubmitFirstCheck(domainName.institute_subdomain.value);
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
    setButtonClicked(false)
    let val = inputValue.split(".");
    let checkDomainData = {
      ...checkDomain,
      [inputName]: {
        value: val[0],
        isValid: ValidationFile.validEmpty(val[0]),
      },
    };
    setValidationError(false)
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
  const nonValidDomains = () => {

    if (
      nonAllowedDomains.indexOf(checkDomain.institute_subdomain.value) < 0
    ) {
      return true;
    } else {
      return false;
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

  const [loading, setLoading] = useState(false)
  ////// ON BLUR

  // const OnBlurHandel = () => {
  //   getCheckHandleSubmit();
  //   // setIsEditableSubDomainFunc();
  // };
  // FINAL SUBMIT BEFORE CONTINUE
  const getCheckHandleSubmit = (e) => {
    e && e.preventDefault()
    setValidationError(true)
    const EmptyCheckDomain = emptyDomainField();
    const regex = domainRegex();
    const nonValidDomain = nonValidDomains();
    const spaceCheck = spaceNotAllowed();
    let subdomainVal = SessionStorage.getJson("DomainName");
    if (!spaceCheck) {
      if (nonValidDomain) {
        if (regex) {
          if (EmptyCheckDomain) {
            setLoading(true)
            SessionStorage.setJson("subdomain", checkDomain)
            UserRequest.checkDomain(
              subdomainVal,
              (success) => {
                setButtonClicked(true)
                setLoading(false)
                if (success.data.data.length) {
                  setdomainAvailable(false);
                  setdomainNotExist(true);
                } else {
                  setdomainAvailable(true);
                  setdomainNotExist(false);
                }
              },
              (error) => {
              }
            );
          } else {
            setEmptyCheck(true);
          }
        } else {
          setDomainRegexNotValid(true);
        }
      } else {
        setNonValidDomain(true);
      }
    } else {
      setNoSpace(true);
    }
  };
  const getCheckHandleSubmitFirstCheck = (domainName) => {
    const EmptyCheckDomain = emptyDomainField(domainName);
    const regex = domainRegex(domainName);
    const nonValidDomain = nonValidDomains(domainName);
    const spaceCheck = spaceNotAllowed(domainName);
    //let subdomainVal = SessionStorage.getJson("DomainName")
    setValidationError(true)
    if (!spaceCheck) {
      if (nonValidDomain) {
        if (regex) {
          if (EmptyCheckDomain) {
            UserRequest.checkDomain(
              domainName,
              (success) => {
                setButtonClicked(true)
                setLoading(false)
                if (success.data.data.length) {
                  setdomainAvailable(false);
                  setdomainNotExist(true);
                } else {
                  setdomainAvailable(true);
                  setdomainNotExist(false);
                }
              },
              (error) => {
              }
            );
          } else {
            setEmptyCheck(true);
          }
        } else {
          setDomainRegexNotValid(true);
        }
      } else {
        setNonValidDomain(true);
      }
    } else {
      setNoSpace(true);
    }
  };

  // FINAL SUBMIT METHOD IS INVOKED IF CONTINUE BUTTON IS PRESSED
  const handleNext = () => {
    setValidationError(true)
    if (buttonClicked && domainAvailable &&
      !domainNotExit &&
      !emptyCheck &&
      !domainRegexNotValid &&
      !nonValidDomain &&
      !noSpace) {
      SessionStorage.setJson("subdomain", checkDomain)
      history("websiteoverviewV1")
    }
  }
  const [checkState, setCheckState] = useState(false)
  if (SessionStorage.alive("subdomain") && !checkState) {
    setCheckState(true)
  }
  return (
    <React.Fragment>
      <form onSubmit={getCheckHandleSubmit}>
        <div className="formFieldwrap">
          <label htmlFor="#">Check availability of your website</label>
          <div className="custom_domain_input_wrapper">
            <div className="custom_subscribe_input">
              <input
                className={`custom_domain_input_field ${(validationError && nonValidDomain) ||
                  (buttonClicked && !domainAvailable && domainNotExit) || (validationError && !checkDomain.institute_subdomain.value) || (validationError && domainRegexNotValid) ? "errorInput" : ""}`}
                onChange={handleinput}
                onKeyUp={handleinput}
                name="institute_subdomain"
                type="text"
                onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                placeholder={checkDomain.institute_subdomain.value}
                defaultValue={checkDomain.institute_subdomain.value}
                autoFocus
              />

            </div>
            <button type="button" className="button custom_domain_button btn-sm ">.edneed.com</button>
          </div>
          <FormError show={buttonClicked && !domainAvailable && domainNotExit} error={`${checkDomain.institute_subdomain.value}.edneed.com is not avialable`} />
          {/* <FormError
            show={buttonClicked && domainNotExit}
            error="Your subdomain is Not available!"
          /> */}
          <FormError show={validationError && !checkDomain.institute_subdomain.value} error="Enter Domain name." />
          <FormError
            show={validationError && domainRegexNotValid}
            error="Subdomain can only consist a-z & 0-9!"
          />
          <FormError
            show={validationError && nonValidDomain}
            error="Subdomain can't contain www, edneed, blog, api"
          />
          <FormError show={validationError && noSpace} error="Subdomain cannot contain space" />
          <FormError
            show={buttonClicked && domainAvailable &&
              !domainNotExit &&
              !emptyCheck &&
              !domainRegexNotValid &&
              !nonValidDomain &&
              !noSpace
            }
            success={true}
            error={`Your domain ${checkDomain.institute_subdomain.value}.edneed.com is available`}
            className="secondary"
          />
        </div>
        <button className='button button-primary btn-sm white next_btn mb-30' type={loading ? "button" : "submit"}>{loading ? <React.Fragment>Checking...<div className='loader loader25'></div></React.Fragment> : " CHECK AVAILABILITY"}</button>
        <p className='mb-30 font-14'><AppLink to="/privatedomainV1" className="text">Click here</AppLink> to Learn more about private domain option.</p>
        <button className='button btn-o-primary btn-sm primary next_btn' type="button" onClick={handleNext}>NEXT</button>
      </form>
    </React.Fragment>
  );
};

export default CheckSubdomain;
