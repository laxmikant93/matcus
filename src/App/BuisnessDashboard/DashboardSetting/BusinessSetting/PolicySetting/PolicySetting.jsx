import React, { useState, useRef, useEffect, useMemo } from 'react'
import Breadcrumb from '../../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../../Common/Breadcrumb/BreadcrumbItem';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./policySetting.scss";
import { postEcommercePolicy, getEcommercePolicy, EditEcommercePolicy, EditEcommercePolicyReset } from '../../../../../store/actions/ecommercePolicy';
import FormTextArea from "../../../../../Common/Form/FormTextArea"
import FormInput from "../../../../../Common/Form/FormInput"
import { showSuccessPopup } from "../../../../../store/actions/successmessagepopup"
import FormError from '../../../../../Common/Form/FormError';
import ValidationUtils from '../../../../../Classes/ValidationUtils';
import TextEditor from '../../../../../Common/Form/TextEditor';
import { useDetectOutsideClick } from '../../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import ScrollToTop from '../../../../../Common/ScrollPageTop'

const PolicySetting = () => {
  const dropdownRef = useRef();
  const accordianRef = useRef();
  const history = useNavigate();
  const dispatch = useDispatch()
  const [showPolicy, setHidePolicy] = useDetectOutsideClick(dropdownRef, -1);
  const [showCustomPolicy, setCustomHidePolicy] = useDetectOutsideClick(accordianRef, -1);

  const symbolsArr = [",", '"', `'`, "!", "@", "`", "~", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "=", "+", ".", "<", ">", "/", "?", ":", ";", "{", "}", "[", "]", `|`]

  const { PostPolicyLoading, PostPolicysuccess, PostPolicydata, insID, users, getPolicySuccess, getPolicyData, getPolicyLoading, businesstype } = useSelector((state) => {
    return {
      insID: state.user.user_institute,
      ownerID: state.user._id,
      users: state.user,
      businesstype: state.user.user_business_type,
      getPolicyData: state.ecommercePolicy.getPolicy.data,
      getPolicySuccess: state.ecommercePolicy.getPolicy.success,
      getPolicyLoading: state.ecommercePolicy.getPolicy.loading,
      PostPolicyLoading: state.ecommercePolicy.updatePolicy.loading,
      PostPolicysuccess: state.ecommercePolicy.updatePolicy.success,
      PostPolicydata: state.ecommercePolicy.updatePolicy.data
    }
  })

  const [TermsPolicy, setTermsPolicy] = useState({
    title: "",
    slug: "",
    show_on_footer: false,
    isValid: true,
  })
  const [ReturnPolicy, setReturnPolicy] = useState({
    title: "",
    slug: "",
    show_on_footer: false,
    isValid: true,
  })
  const [privacyPolicy, setPrivacyPolicy] = useState({
    title: "",
    slug: "",
    show_on_footer: false,
    isValid: true,
  })
  const [CancellationPolicy, setCancellationPolicy] = useState({
    title: "",
    slug: "",
    show_on_footer: false,
    isValid: true,
  })
  const [CustomPolicy, setCustomPolicy] = useState(
    [
      {
        _id: Math.floor(Math.random() * 80000000000),
        title: "",
        slug: "",
        description: "",
        show_on_footer: false,
        isValid: false,

      },
    ]
  );
  const [sameTitleError, setSameTitleError] = useState(false);

  // useEffect(() => {


  // }, [TermsPolicy, privacyPolicy, sameTitle])

  // description editor start

  const [DescriptionTermsPolicy, setDescriptionTermsPolicy] = useState({
    description: "",
    show_on_footer: false,
    isValid: true,
  })
  const [DescriptionReturnPolicy, setDescriptionReturnPolicy] = useState({
    description: "",
    show_on_footer: false,
    isValid: true,
  })
  const [DescriptionprivacyPolicy, setDescriptionPrivacyPolicy] = useState({
    description: "",
    show_on_footer: false,
    isValid: true,
  })
  const [DescriptionCancellationPolicy, setDescriptionCancellationPolicy] = useState({
    description: "",
    show_on_footer: false,
    isValid: true,
  })

  //onchnage handle for editor description

  const HandleDescription = (e, type, inpName) => {
    let inputName = inpName;
    let inputValue = e;

    switch (type) {
      case "TermsPolicy":
        let TermsPolicyData = {
          ...DescriptionTermsPolicy,
          [inputName]: inputValue,
          isValid: validCheck("TermsPolicy", DescriptionTermsPolicy.show_on_footer)
        }
        setDescriptionTermsPolicy(TermsPolicyData)
        break;
      case "PrivacyPolicy":
        let privacyPolicyData = {
          ...DescriptionprivacyPolicy,
          [inputName]: inputValue,
          isValid: validCheck("privacyPolicy", DescriptionprivacyPolicy.show_on_footer)
        }
        setDescriptionPrivacyPolicy(privacyPolicyData)
        break;
      case "ReturnsPolicy":
        let ReturnPolicyData = {
          ...DescriptionReturnPolicy,
          [inputName]: inputValue,
          isValid: validCheck("ReturnPolicy", DescriptionReturnPolicy.show_on_footer)
        }
        setDescriptionReturnPolicy(ReturnPolicyData)
        break;
      case "CancellationPolicy":
        let CancellationPolicyData = {
          ...DescriptionCancellationPolicy,
          [inputName]: inputValue,
          isValid: validCheck("CancellationPolicy", DescriptionCancellationPolicy.show_on_footer)
        }
        setDescriptionCancellationPolicy(CancellationPolicyData)
        break;
      default:
        break;
    }
  }


  //onchnage handle for custom editor description
  const handleCustomDescription = (e, key, inpName) => {
    let Name = inpName;
    let value = e;
    let allInputs = CustomPolicy;

    allInputs[key][Name] = value;

    if (allInputs[key].show_on_footer) {
      allInputs[key]["isValid"] = ValidationUtils.isNotEmpty(allInputs[key].title) && ValidationUtils.isNotEmpty(allInputs[key].description);
    } else {
      allInputs[key]["isValid"] = true;
    }
    setCustomPolicy([...allInputs])
  }

  const handleCustomInput = (e, key) => {
    let Name = e.target.name;
    let value = e.target.value;
    let allInputs = CustomPolicy;
    allInputs[key][Name] = value;
    allInputs[key]["slug"] = value?.replaceAll(" ", "-");

    if (allInputs[key].show_on_footer) {
      allInputs[key]["isValid"] = ValidationUtils.isNotEmpty(allInputs[key].title) && ValidationUtils.isNotEmpty(allInputs[key].description);
    } else {
      allInputs[key]["isValid"] = true;
    }
    setCustomPolicy([...allInputs])
  }

  const checkCustomPolicyhandle = (e, key) => {
    let checkcustomPolicy = e.target.checked;
    let allInputs = CustomPolicy;
    allInputs[key]["show_on_footer"] = checkcustomPolicy;

    if (allInputs[key]["show_on_footer"]) {
      allInputs[key]["isValid"] = ValidationUtils.isNotEmpty(allInputs[key].title) && ValidationUtils.isNotEmpty(allInputs[key].description);
    } else {
      allInputs[key]["isValid"] = true
    }
    setCustomPolicy([...allInputs]);
  }
  useEffect(() => {
  }, [CustomPolicy])


  const validCheck = (type, state) => {
    switch (type) {
      case "TermsPolicy":
        return state === false ? true : !ValidationUtils.isEmpty(TermsPolicy.title) && !ValidationUtils.isEmpty(DescriptionTermsPolicy.description)
      case "privacyPolicy":
        return state === false ? true : !ValidationUtils.isEmpty(privacyPolicy.title) && !ValidationUtils.isEmpty(DescriptionprivacyPolicy.description)
      case "ReturnPolicy":
        return state === false ? true : !ValidationUtils.isEmpty(ReturnPolicy.title) && !ValidationUtils.isEmpty(DescriptionReturnPolicy.description)
      case "CancellationPolicy":
        return state === false ? true : !ValidationUtils.isEmpty(CancellationPolicy.title) && !ValidationUtils.isEmpty(DescriptionCancellationPolicy.description)
      default:
        break
    }
  }

  const checkPolicyhandle = (e, type) => {
    let checkpolicy = e.target.checked;

    switch (type) {
      case "TermsPolicy":
        let TermsPolicyData = {
          ...TermsPolicy,
          show_on_footer: checkpolicy,
          isValid: validCheck("TermsPolicy", checkpolicy)
        }
        setTermsPolicy(TermsPolicyData)
        break;
      case "PrivacyPolicy":
        let privacyPolicyData = {
          ...privacyPolicy,
          show_on_footer: checkpolicy,
          isValid: validCheck("privacyPolicy", checkpolicy)
        }
        setPrivacyPolicy(privacyPolicyData)
        break;
      case "ReturnsPolicy":
        let ReturnPolicyData = {
          ...ReturnPolicy,
          show_on_footer: checkpolicy,
          isValid: validCheck("ReturnPolicy", checkpolicy)
        }
        setReturnPolicy(ReturnPolicyData)
        break;
      case "CancellationPolicy":
        let CancellationPolicyData = {
          ...CancellationPolicy,
          show_on_footer: checkpolicy,
          isValid: validCheck("CancellationPolicy", checkpolicy)
        }
        setCancellationPolicy(CancellationPolicyData)
        break;
      default:
        break

    }

    switch (type) {
      case "TermsPolicy":
        let TermsPolicyData = {
          ...DescriptionTermsPolicy,
          show_on_footer: checkpolicy,
          isValid: validCheck("TermsPolicy", checkpolicy)
        }
        setDescriptionTermsPolicy(TermsPolicyData)
        break;
      case "PrivacyPolicy":
        let privacyPolicyData = {
          ...DescriptionprivacyPolicy,
          show_on_footer: checkpolicy,
          isValid: validCheck("privacyPolicy", checkpolicy)
        }
        setDescriptionPrivacyPolicy(privacyPolicyData)
        break;
      case "ReturnsPolicy":
        let ReturnPolicyData = {
          ...DescriptionReturnPolicy,
          show_on_footer: checkpolicy,
          isValid: validCheck("ReturnPolicy", checkpolicy)
        }
        setDescriptionReturnPolicy(ReturnPolicyData)
        break;
      case "CancellationPolicy":
        let CancellationPolicyData = {
          ...DescriptionCancellationPolicy,
          show_on_footer: checkpolicy,
          isValid: validCheck("CancellationPolicy", checkpolicy)
        }
        setDescriptionCancellationPolicy(CancellationPolicyData)
        break;
      default:
        break

    }
  }
  const handleInput = (e, type) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    switch (type) {
      case "TermsPolicy":
        let TermsPolicyData = {
          ...TermsPolicy,
          [inputName]: inputValue,
          slug: inputValue?.replaceAll(" ", "-"),
          isValid: validCheck("TermsPolicy", TermsPolicy.show_on_footer)
        }
        setTermsPolicy(TermsPolicyData)
        break;
      case "PrivacyPolicy":
        let privacyPolicyData = {
          ...privacyPolicy,
          [inputName]: inputValue,
          slug: inputValue?.replaceAll(" ", "-"),
          isValid: validCheck("privacyPolicy", privacyPolicy.show_on_footer)
        }
        setPrivacyPolicy(privacyPolicyData)
        break;
      case "ReturnsPolicy":
        let ReturnPolicyData = {
          ...ReturnPolicy,
          [inputName]: inputValue,
          slug: inputValue?.replaceAll(" ", "-"),
          isValid: validCheck("ReturnPolicy", ReturnPolicy.show_on_footer)
        }
        setReturnPolicy(ReturnPolicyData)
        break;
      case "CancellationPolicy":
        let CancellationPolicyData = {
          ...CancellationPolicy,
          [inputName]: inputValue,
          slug: inputValue?.replaceAll(" ", "-"),
          isValid: validCheck("CancellationPolicy", CancellationPolicy.show_on_footer)
        }
        setCancellationPolicy(CancellationPolicyData)
        break;
      default:
        break;
    }
  }


  const handlePolicyRemove = (PolicyId) => {
    let policylist = CustomPolicy.filter((item) => item._id !== PolicyId)
    setCustomPolicy([...policylist]);
  };
  const AddMorePolicy = () => {
    let addCudtomPolicy = CustomPolicy
    addCudtomPolicy.push(
      {
        _id: Math.floor(Math.random() * 80000000000),
        title: "",
        description: "",
        show_on_footer: false,
        isValid: true
      }
    )
    setCustomPolicy([...addCudtomPolicy,]);
  };

  useEffect(() => {
    if (getPolicySuccess && getPolicyData) {
      setTermsPolicy({ ...getPolicyData.terms_of_service[0], isValid: true });
      setCancellationPolicy({ ...getPolicyData.cancellation[0], isValid: true });
      setReturnPolicy({ ...getPolicyData.returns_and_exchange[0], isValid: true });
      setPrivacyPolicy({ ...getPolicyData.privacy_policy[0], isValid: true });

      setDescriptionTermsPolicy({ ...getPolicyData.terms_of_service[0], isValid: true });
      setDescriptionPrivacyPolicy({ ...getPolicyData.privacy_policy[0], isValid: true });
      setDescriptionReturnPolicy({ ...getPolicyData.returns_and_exchange[0], isValid: true });
      setDescriptionCancellationPolicy({ ...getPolicyData.cancellation[0], isValid: true });

      let data = []
      for (let index = 0; index < getPolicyData?.custom_policy?.length; index++) {
        const element = getPolicyData.custom_policy[index];
        let isValid
        if (element.show_on_footer) {
          if (ValidationUtils.isNotEmpty(element.title) && ValidationUtils.isNotEmpty(element.description)) {
            isValid = true
          } else {
            isValid = false
          }
        } else {
          isValid = true
        }
        data.push({
          ...getPolicyData.custom_policy[index],
          isValid: isValid
        })
      }
      setCustomPolicy([...data])
    }
  }, [getPolicySuccess, getPolicyData])

  function finalDataPrep() {
    let policydata = {
      business: insID,
      terms_of_service: [
        {
          "title": TermsPolicy.title,
          "slug": TermsPolicy.slug,
          "description": DescriptionTermsPolicy.description,
          "show_on_footer": TermsPolicy.show_on_footer
        }
      ],
      privacy_policy: [
        {
          "title": privacyPolicy.title,
          "slug": privacyPolicy.slug,
          "description": DescriptionprivacyPolicy.description,
          "show_on_footer": privacyPolicy.show_on_footer
        }
      ],
      returns_and_exchange: [
        {
          "title": ReturnPolicy.title,
          "slug": ReturnPolicy.slug,
          "description": DescriptionReturnPolicy.description,
          "show_on_footer": ReturnPolicy.show_on_footer
        }
      ],
      cancellation: [
        {
          "title": CancellationPolicy.title,
          "slug": CancellationPolicy.slug,
          "description": DescriptionCancellationPolicy.description,
          "show_on_footer": CancellationPolicy.show_on_footer
        }
      ],
      custom_policy: CustomPolicy.map((item) => {
        return (
          {
            "show_on_footer": item.show_on_footer,
            "title": item.title,
            "slug": item.slug,
            "description": item.description
          }
        );
      }),
    };
    return policydata;
  }


  const isFormValid = () => {
    return (TermsPolicy.isValid && ReturnPolicy.isValid && privacyPolicy.isValid && CancellationPolicy.isValid && DescriptionTermsPolicy.isValid && DescriptionReturnPolicy.isValid && DescriptionprivacyPolicy.isValid && DescriptionCancellationPolicy.isValid) ? true : false
  };
  const isCustomFormValid = () => {
    let isValid = true;
    for (let key = 0; key < CustomPolicy.length; key++) {
      const element = CustomPolicy[key];

      if (!element.isValid) {
        isValid = false;
        break;
      }
    }

    return isValid;
  };


  const checkSameData = () => {
    let isValid = true;
    let result;
    let sameTitle = [];
    if (TermsPolicy) {
      let samedata = sameTitle;
      samedata.push(TermsPolicy);
    }
    if (privacyPolicy) {
      let samedata = sameTitle;
      samedata.push(privacyPolicy);
    }
    if (CustomPolicy) {
      let samedata = sameTitle;
      for (let i = 0; i < CustomPolicy.length; i++) {
        let element = CustomPolicy[i];
        samedata.push(element);
      }
    }


    if (sameTitle.length) {
      for (let i = 0; i < sameTitle.length; i++) {
        let element = sameTitle[i];
        result = sameTitle.filter((item) => item?.title === element?.title)
      }
      if (result.length > 1) {
        setSameTitleError(true);
        return isValid = false;
      }
      else {
        setSameTitleError(false);
        return isValid = true;
      }
    }
    return isValid;
  }

  const handleSave = () => {
    let sameData = checkSameData();
    if (isFormValid() && isCustomFormValid() && sameData) {
      if (getPolicyData && getPolicyData._id && getPolicySuccess) {
        dispatch(EditEcommercePolicy(users.user_business_type, getPolicyData._id, finalDataPrep()))
        // history("/ecommerce/policysetting")
      } else {
        dispatch(EditEcommercePolicy(users.user_business_type, getPolicyData._id, finalDataPrep()))
        // dispatch(postEcommercePolicy(users.user_business_type, finalDataPrep()))
        // history("/ecommerce/settings")
      }
      setHidePolicy(-1);
    }
  }

  const handleCancle = () => {
    history("/ecommerce/settings")
    dispatch(EditEcommercePolicyReset())
  }

  useEffect(() => {
    dispatch(getEcommercePolicy(users.user_institute, users.user_business_type))
  }, [dispatch, users.user_business_type, users.user_institute])


  function PolicyHandle(type) {
    switch (type) {
      case "TermsPolicy":
        setHidePolicy(showPolicy === "TermsPolicy" ? -1 : "TermsPolicy");
        break;
      case "PrivacyPolicy":
        setHidePolicy(showPolicy === "PrivacyPolicy" ? -1 : "PrivacyPolicy");
        break;
      case "ReturnsPolicy":
        setHidePolicy(showPolicy === "ReturnsPolicy" ? -1 : "ReturnsPolicy");
        break;
      case "CancellationPolicy":
        setHidePolicy(showPolicy === "CancellationPolicy" ? -1 : "CancellationPolicy");
        break;
      default:
        break;
    }
  }
  function CustomPolicyHandle(index) {
    setCustomHidePolicy(showCustomPolicy === index ? -1 : index);
  }
  // useEffect(() => {
  //   if (PostPolicysuccess && PostPolicydata) {
  //     history("/ecommerce/settings")
  //   }
  // }, [PostPolicysuccess, PostPolicydata, history])


  return (
    <React.Fragment>
      <ScrollToTop />
      <div className="">
        <Breadcrumb>
          <BreadcrumbItem to="/ecommerce/settings" title="Settings " />
          <BreadcrumbItem to="/ecommerce/policysetting" title="Policy Settings" />
        </Breadcrumb>
        <div className="mt-10">
          <div className='Policyheader mb-20 border-bottom'>
            <div className="headgrid">
              <Link to="/ecommerce/settings"><i className='icon-back'>&#x276E;</i></Link>
              <div>
                <h1>Policy Settings</h1>
                <p>Manage your policy settings, terms of service and more. </p>
              </div>
            </div>
            <div className="btn-group">
              <button className="button btn-o-primary primary btn-sm bg-lightblue" onClick={handleCancle}>Cancel</button>

              {PostPolicyLoading ? (
                <button className="button button-primary btn-sm" >Saving...</button>
              ) : (
                <button className="button button-primary btn-sm" onClick={() => handleSave()}>Save</button>
              )}

            </div>
            <FormError
              show={sameTitleError}
              error="Title can't be same."
            />
          </div>
          {
            getPolicyLoading ? (
              <div className="">
                <div className="loadingGridData">
                  <i className="ed-loadingGrid"></i>
                </div>
              </div>
            ) : (
              <React.Fragment>
                <div className="policysetting-wrapper mb-30">
                  <article
                    className={`${showPolicy === ("TermsPolicy" || "PrivacyPolicy" || "ReturnsPolicy" || "CancellationPolicy") ? "active" : ""}`}
                  >
                    <div>
                      <div className="headlist" onClick={() => PolicyHandle("TermsPolicy")}>
                        <div className="heading">
                          <h5> {TermsPolicy.title ? TermsPolicy.title : "Terms of Service"}</h5>
                        </div>
                        {showPolicy === "TermsPolicy" ?
                          <span className="close_icon mr-5">&#10095;</span>
                          : <span className="open_icon mr-5">&#10095;</span>}
                      </div>
                      {
                        showPolicy === "TermsPolicy" &&
                        <div className="setting-card">
                          <>
                            <div className="formFieldwrap mb-20">
                              <FormInput
                                value={TermsPolicy.title}
                                onChange={(e) => handleInput(e, "TermsPolicy")}
                                name="title"
                                type="text"
                                label="Title"
                                labelPosition="top"
                                placeholder="Terms of Service"
                                onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}

                              />
                              <FormError
                                show={!TermsPolicy.isValid && TermsPolicy.title === ""}
                                error={"Title  error"}
                                className="mt-5"
                              />
                            </div>
                            <div className="formFieldwrap mb-20">
                              <TextEditor
                                feature="description"
                                preFilledData={DescriptionTermsPolicy.description}
                                currentResponse={(e) => HandleDescription(e, "TermsPolicy", "description")}
                              />
                              <FormError
                                show={!DescriptionTermsPolicy.isValid && DescriptionTermsPolicy.description === ""}
                                error={"Description Error"}
                              />
                            </div>
                            <label className="foot_checkbox">
                              <input type="checkbox" name="show_on_footer" checked={TermsPolicy.show_on_footer} onChange={(e) => checkPolicyhandle(e, "TermsPolicy")} />Show on footer
                            </label>
                          </>
                        </div>
                      }
                    </div>
                    <div>
                      <div className="headlist" onClick={() => PolicyHandle("PrivacyPolicy")}>
                        <div className="heading">
                          <h5>{privacyPolicy.title ? privacyPolicy.title : "Privacy Policy"}</h5>
                        </div>
                        {showPolicy === "PrivacyPolicy" ?
                          <span className="close_icon mr-5">&#10095;</span>
                          : <span className="open_icon mr-5">&#10095;</span>}
                      </div>
                      {
                        showPolicy === "PrivacyPolicy" &&
                        <div className="setting-card">
                          <>
                            <div className="formFieldwrap mb-20">
                              <FormInput
                                name="title"
                                type="text"
                                label="Title"
                                labelPosition="top"
                                placeholder="Privacy Policy "
                                onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                                value={privacyPolicy.title}
                                onChange={(e) => handleInput(e, 'PrivacyPolicy')}
                              />
                              <FormError
                                show={!privacyPolicy.isValid && privacyPolicy.title === ""}
                                error={"Title  error"}
                                className="mt-5"
                              />
                            </div>
                            <div className="formFieldwrap mb-20">
                              <TextEditor
                                feature="description"
                                preFilledData={DescriptionprivacyPolicy.description}
                                currentResponse={(e) => HandleDescription(e, "PrivacyPolicy", "description")}
                              />
                              <FormError
                                show={!DescriptionprivacyPolicy.isValid && DescriptionprivacyPolicy.description === ""}
                                error={"Description Error"}
                              />
                            </div>
                            <label className="foot_checkbox">
                              <input type="checkbox" name="show_on_footer" checked={privacyPolicy.show_on_footer} onChange={(e) => checkPolicyhandle(e, 'PrivacyPolicy')} />Show on footer
                            </label>
                          </>
                        </div>
                      }
                    </div>
                    {/* <div>
                      <div className="headlist" onClick={() => PolicyHandle("ReturnsPolicy")}>
                        <div className="heading">
                          <h5> Returns & Cancellations policy</h5>
                        </div>
                        {showPolicy === "ReturnsPolicy" ?
                          <span className="close_icon mr-5">&#10095;</span>
                          : <span className="open_icon mr-5">&#10095;</span>}
                      </div>
                      {
                        showPolicy === "ReturnsPolicy" &&
                        <div className="setting-card">
                          <>
                            <div className="formFieldwrap mb-20">
                              <FormInput
                                name="title"
                                type="text"
                                label="Title"
                                labelPosition="top"
                                placeholder="Returns and Cancellation Policy"

                                value={ReturnPolicy.title}
                                onChange={(e) => handleInput(e, 'ReturnsPolicy')}
                              />
                              <FormError
                                show={!ReturnPolicy.isValid && ReturnPolicy.title === ""}
                                error={"Title  error"}
                                className="mt-5"
                              />
                            </div>
                            <div className="formFieldwrap mb-20">
                              <TextEditor
                                feature="description"
                                preFilledData={DescriptionReturnPolicy.description}
                                currentResponse={(e) => HandleDescription(e, "ReturnsPolicy", "description")}
                              />
                              <FormError
                                show={!DescriptionReturnPolicy.isValid && DescriptionReturnPolicy.description === ""}
                                error={"Description Error"}
                              />
                            </div>
                            <label className="foot_checkbox">
                              <input type="checkbox" name="show_on_footer" checked={ReturnPolicy.show_on_footer} onChange={(e) => checkPolicyhandle(e, 'ReturnsPolicy')} />Show on footer
                            </label>
                          </>
                        </div>
                      }
                    </div>
                    <div>
                      <div className={`headlist`} onClick={() => PolicyHandle("CancellationPolicy")}>
                        <div className="heading">
                          <h5> Cancellation Policy</h5>
                        </div>
                        {showPolicy === "CancellationPolicy" ?
                          <span className="close_icon mr-5">&#10095;</span>
                          : <span className="open_icon mr-5">&#10095;</span>}
                      </div>
                      {
                        showPolicy === "CancellationPolicy" &&
                        <div className="setting-card">
                          <>
                            <div className="formFieldwrap mb-20">
                              <FormInput
                                name="title"
                                type="text"
                                label="Title"
                                labelPosition="top"
                                placeholder="Cancellation Policy"

                                value={CancellationPolicy.title}
                                onChange={(e) => handleInput(e, 'CancellationPolicy')}
                              />
                              <FormError
                                show={!CancellationPolicy.isValid && CancellationPolicy.title === ""}
                                error={"Title error"}
                                className="mt-5"
                              />
                            </div>
                            <div className="formFieldwrap mb-20">
                              <TextEditor
                                feature="description"
                                preFilledData={DescriptionCancellationPolicy.description}
                                currentResponse={(e) => HandleDescription(e, "CancellationPolicy", "description")}
                              />
                              <FormError
                                show={!DescriptionCancellationPolicy.isValid && DescriptionCancellationPolicy.description === ""}
                                error={"Description Error"}
                              />
                              {console.log(!DescriptionCancellationPolicy.isValid && DescriptionCancellationPolicy.description === "")}
                            </div>
                            <label className="foot_checkbox">
                              <input type="checkbox" name="show_on_footer" checked={CancellationPolicy.show_on_footer} onChange={(e) => checkPolicyhandle(e, 'CancellationPolicy')} />Show on footer
                            </label>
                          </>
                        </div>
                      }
                    </div> */}
                    <ul>
                      {
                        CustomPolicy && CustomPolicy.map((list, index) => (
                          <>
                            <li key={list._id}>
                              <div className={`headlist`} onClick={() => CustomPolicyHandle(index, list.id)}>
                                <div className="heading">
                                  <h5>{CustomPolicy[index].title ? CustomPolicy[index].title : `Create custom Policy ${index + 1}`}</h5>
                                </div>
                                {showCustomPolicy === index ?
                                  <span className="close_icon mr-5">&#10095;</span>
                                  : <span className="open_icon mr-5">&#10095;</span>}
                              </div>
                              {
                                showCustomPolicy === index &&
                                <div className='setting-card'>
                                  <div className="formFieldwrap mb-20">
                                    <FormInput
                                      name="title"
                                      type="text"
                                      label="Title"
                                      labelPosition="top"
                                      placeholder="Shipping Policy"

                                      value={CustomPolicy[index].title}
                                      onChange={(e) => handleCustomInput(e, index)}
                                    />
                                    <FormError
                                      show={!CustomPolicy[index].isValid && CustomPolicy[index].title === "" && CustomPolicy[index].show_on_footer}
                                      error={"Title Error"}
                                      className="mt-5"
                                    />
                                  </div>
                                  <div className="formFieldwrap mb-20">
                                    <TextEditor
                                      feature="description"
                                      preFilledData={CustomPolicy[index].description}
                                      currentResponse={(e) => handleCustomDescription(e, index, "description")}
                                    />
                                    <FormError
                                      className="mt-5"
                                      show={!CustomPolicy[index].isValid && CustomPolicy[index].show_on_footer && CustomPolicy[index].description === ""}
                                      error={"Description Error"}
                                    />
                                  </div>
                                  <div className="group-foot">
                                    <label className="foot_checkbox">
                                      <input type="checkbox" name="show_on_footer" checked={CustomPolicy[index].show_on_footer} onChange={(e) => checkCustomPolicyhandle(e, index)} />Show on footer
                                    </label>
                                    {
                                      CustomPolicy.length !== 0 && (
                                        <button className='delete-btn' onClick={() => handlePolicyRemove(list._id)}><i className="icon-trash" ></i> Delete</button>
                                      )
                                    }
                                  </div>
                                </div>
                              }
                            </li>
                          </>
                        ))
                      }
                    </ul>
                  </article>
                </div>
                <div className="addcustompolicy_buttons">
                  {
                    CustomPolicy && CustomPolicy.length < 8 && (
                      <button className="button btn-o-primary btn-sm bg-lightblue" onClick={AddMorePolicy}><i className="icon">&#43;</i> Create more policies</button>
                    )
                  }
                </div>
              </React.Fragment>
            )
          }
        </div>
      </div>
    </React.Fragment>
  )
}

export default PolicySetting