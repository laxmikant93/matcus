import React, { useEffect, useState } from "react";
import SessionStorage from "../../../../Classes/SessionStorage";
// import FormInput from "../../Common/Form/FormInput";
import ValidationFile from "../../../Auth/ValidationFile";
import FormError from "../../../../Common/Form/FormError";
import Modals from "../../../../Common/Modals";
import ModalsBody from "../../../../Common/Modals/ModalsBody";
import ModalsHeader from "../../../../Common/Modals/ModalsHeader";
import ModalsFooter from "../../../../Common/Modals/ModalsFooter";
import { useDispatch } from "react-redux";
import { checkSubdomainAvaibility, resetCheckSubdomain, resetUpdateSudomain, UpdateSubdomainAvailable } from "../../../../store/actions/institutes";
import { useSelector } from "react-redux";
import './updateSubdomain.scss';
import FormInput from "../../../../Common/Form/FormInput";
import EditDomainImage from "./edit-domain.svg";
const UpdateSubdomain = ({ refProp, closePopUp, edit }) => {
  // FUNCTIONAL COMPONENT RECIEVING PROPS FOR  SUBDOMAIN REGISTRATION

  // USING DISPACH HOOK FOR DATA MANIPULATION IN REDUX

  // LOCAL STATE VARIBALE FOR DOMAIN REGISTRATION
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

  const { checkSubdomain, user, updateSubdomain } = useSelector((state) => {
    return {
      checkSubdomain: state.institute.checkSubdomain,
      user: state.user,
      updateSubdomain: state.institute.updateSubdomain
    }
  })

  // useEffect(() => {
  //   if (SessionStorage.alive("subdomain")) {
  //     let domainName = SessionStorage.getJson("subdomain");
  //     let checkDomainData = {
  //       ...checkDomain,
  //       institute_subdomain: {
  //         value: domainName.institute_subdomain.value,
  //         isValid: ValidationFile.validEmpty(domainName.institute_subdomain.value),
  //       },
  //     };
  //     setcheckDomain(checkDomainData);
  //     getCheckHandleSubmitFirstCheck(domainName.institute_subdomain.value);
  //   } else {
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
    dispatch(resetCheckSubdomain());
    dispatch(resetUpdateSudomain())
    setdomainAvailable(false);
  };

  const onClose = () => {
    if (edit === true) {
      closePopUp()
      setdomainNotExist(false);
      setdomainAvailable(false);
      setValidationError(false)

      setcheckDomain({
        institute_subdomain: {
          value: "",
          isValid: false,
        },
      })
    }
    else {
      closePopUp()

    }
  }
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
  const dispatch = useDispatch();
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
    return ValidationFile.validEmpty(checkDomain.institute_subdomain.value);
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
    if (!spaceCheck) {
      if (nonValidDomain) {
        if (regex) {
          if (EmptyCheckDomain) {
            dispatch(checkSubdomainAvaibility(checkDomain.institute_subdomain.value))
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
  // const getCheckHandleSubmitFirstCheck = (domainName) => {
  //   const EmptyCheckDomain = emptyDomainField(domainName);
  //   const regex = domainRegex(domainName);
  //   const nonValidDomain = nonValidDomains(domainName);
  //   const spaceCheck = spaceNotAllowed(domainName);
  //   //let subdomainVal = SessionStorage.getJson("DomainName")
  //   setValidationError(true)
  //   if (!spaceCheck) {
  //     if (nonValidDomain) {
  //       if (regex) {
  //         if (EmptyCheckDomain) {

  //         } else {
  //           setEmptyCheck(true);
  //         }
  //       } else {
  //         setDomainRegexNotValid(true);
  //       }
  //     } else {
  //       setNonValidDomain(true);
  //     }
  //   } else {
  //     setNoSpace(true);
  //   }
  // };

  // FINAL SUBMIT METHOD IS INVOKED IF CONTINUE BUTTON IS PRESSED


  const handleNext = () => {
    setValidationError(true)
    const EmptyCheckDomain = emptyDomainField();
    const regex = domainRegex();
    const nonValidDomain = nonValidDomains();
    const spaceCheck = spaceNotAllowed();
    if (!spaceCheck) {
      if (nonValidDomain) {
        if (regex) {
          if (EmptyCheckDomain) {
            if (!checkSubdomain.loading && checkSubdomain.success && domainAvailable && !domainNotExit) {
              let body = {
                subdomain: checkDomain.institute_subdomain.value,
                institute_subdomain: checkDomain.institute_subdomain.value,
                business_subdomain: checkDomain.institute_subdomain.value
              }
              dispatch(UpdateSubdomainAvailable(user.user_institute, body, user.user_business_type))
            }
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
  }
  useEffect(() => {
    setButtonClicked(true)
    setLoading(false)
    if (checkSubdomain.exist === "Exist") {
      setdomainAvailable(false);
      setdomainNotExist(true);
    } else if (checkSubdomain.exist === "Not Exist") {
      setdomainAvailable(true);
      setdomainNotExist(false);
    }
    if (!updateSubdomain.loading && updateSubdomain.success) {
      dispatch(resetCheckSubdomain());
      dispatch(resetUpdateSudomain())
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkSubdomain, updateSubdomain]);
  return (
    <React.Fragment>
      {/* <div className="updateSubdomain-container"> */}
      <Modals ref={refProp} Position="center" slide="top" ClosePopUp={onClose}>
        {/* <div className="institute-checkAvialabilty-popUp-header">
          <h1 className="text-xs w-300 white ">Edit Subdomain Name</h1>
          <ModalsHeader
            title="Edit Subdomain Name"
          />
        </div> */}
        <ModalsHeader
          title="Edit Subdomain Name"
          onclose={closePopUp}
        />
        <ModalsBody>
          <div className="updateSubdomain-grid">
            <div className="updateSubdomain-grid-left">
              <img src={EditDomainImage} alt="" />
            </div>
            <div className="gridDivider"></div>
            <div className="updateSubdomain-grid-right">
              <div className="grid-right-content">
                <div className="formFieldwrap">
                  <FormInput type="text" label="Your existing subdomain name" placeholder="subdomain name" value={user.user_institute_institute_subdomain} disabled={true} />
                </div>
                <p className="label text-xxs w-300 lgray">Check availability of your website</p>
                <div className="new-subdomain-search-input">
                  <h3 className="text-xxs w-400 lgray">https//:</h3>
                  <div className="formFieldwrap">
                    <FormInput type="text"
                      className={`custom_domain_input_field ${(validationError && nonValidDomain) ||
                        (buttonClicked && !domainAvailable && domainNotExit) || (validationError && !checkDomain.institute_subdomain.value) || (validationError && domainRegexNotValid) ? "errorInput" : ""}`}
                      onChange={handleinput}
                      onKeyUp={handleinput}
                      name="institute_subdomain"
                      onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                      placeholder={checkDomain.institute_subdomain.value}
                      defaultValue={checkDomain.institute_subdomain.value}
                      autoFocus
                    />
                    {/* <input
                  
                    type="text"
                    
                  /> */}
                    {/* <button type="button" className="button custom_domain_button btn-sm ">.edneed.com</button> */}
                    <FormError show={buttonClicked && !domainAvailable && domainNotExit} error={`${checkDomain.institute_subdomain.value}.edneed.com is not avialable`} />

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
                  <h3 className="text-xxs w-400 lgray">.edneed.com/</h3>
                </div>
              </div>
              <div className="action-wrap">
                {(!checkSubdomain.loading && checkSubdomain.success && domainAvailable && !domainNotExit) ? (
                  <React.Fragment>
                    {
                      updateSubdomain.loading ? (
                        < button className='button btn-o-silver btn-sm primary'>Saving...</button>
                      ) : (
                        < button className='button btn-o-silver btn-sm primary' type="button" onClick={handleNext}>Save</button>
                      )
                    }
                  </React.Fragment>
                ) : (
                  <button className='button button-primary btn-sm' onClick={getCheckHandleSubmit} disabled={checkSubdomain.loading || updateSubdomain.loading} type={checkSubdomain.loading ? "button" : "submit"}>{checkSubdomain.loading ? <React.Fragment>Checking...<div className='loader loader25'></div></React.Fragment> : "Done"}</button>

                )
                }
                {/* <button className='button button-primary btn-sm' onClick={getCheckHandleSubmit} disabled={checkSubdomain.loading || updateSubdomain.loading} type={checkSubdomain.loading ? "button" : "submit"}>{checkSubdomain.loading ? <React.Fragment>Checking...<div className='loader loader25'></div></React.Fragment> : "Done"}</button> */}
                <button className='button btn-o-silver btn-sm' type="button" onClick={onClose}>Cancel</button>
              </div>
            </div>
          </div>
        </ModalsBody>
      </Modals>
      {/* </div> */}
    </React.Fragment >
  );
};

export default UpdateSubdomain;
