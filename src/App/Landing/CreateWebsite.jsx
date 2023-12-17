/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import FormInput from "../../Common/Form/FormInput";
import FormTextArea from "../../Common/Form/FormTextArea";
import ValidationFile from "../Auth/ValidationFile";
import Upload from "../../Common/Upload/index";
import demoLogo from "../../assets/images/logo/demo-logo.jpg";
import BackgroundDefault from "../../assets/images/img/BackgroundDefault.png";
import DummyProfile from "../../assets/images/img/DummyProfile.png";
import SessionStorage from "../../Classes/SessionStorage";
import AppLink from "../../Common/AppLink";
import { useNavigate } from "react-router-dom";
import CommonArtTheme from "../../Common/Theme/CommonArtTheme";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../Common/Card";
import HomeFooter from "../../Layout/WithoutAuthLayout/Footer";
import CardBody from "../../Common/Card/CardBody";
import { Userid, UserActiveRole } from "../../Common/UserElement";
import {
  postInstituteDataOffline,
  postInstituteDataOnline,
} from "../../store/actions/RegisterInstitute";
import AppLinkUrl from "../../Common/AppLink/AppLinkUrl";
import FormError from "../../Common/Form/FormError";
import Cropper from "../../Common/Cropper";
import { IconAttachment } from "../../Common/Icon";
import { subDomainMail } from "../../store/actions/privateDomain";
import "./CreateWebsite.scss";
// FUNCTIONAL COMPONENT FOR CREATING WEBSITE CONTENT
const CreateWebsite = () => {
  // CLOUDFRONT URL
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  // USING DISPACH HOOK FOR DATA MANIPULATION IN REDUX
  const dispatch = useDispatch();
  const ref = useRef()
  // REACT HOOK FOR PUBLISHING ROUTE
  const history = useNavigate();

  // REDUX HOOK FOR GETTING LOGGED IN USER TOKEN
  const userToken = useSelector((state) => state.user.token);
  const registerInstitute = useSelector((state) => state.registerInstitute);

  // ASSIGNING LOGGED IN USERID THROUGH INVOKING USERID METHOD FROM UTILITY
  const id = Userid();
  const userRole = UserActiveRole();

  // LOCAL STATE VARIBALE FOR STORING DOMAIN NAME
  const [checkDomain, setcheckDomain] = useState({
    institute_subdomain: {
      value: "",
      isValid: false,
      changeinput: false,
    },
  });

  // LOCAL STORE VARIBALE FOR STORING INSTITUTE WEBSITE DETAILS
  const [createWebsite, setCreateWebsite] = useState({
    institute_logo: "",
    institute_about: "",
    institute_about_head: "About Us",
    institute_about_subhead: "Changing lives, one student at a time.",
    institute_about_upload: "",
    institute_mission: "",
    institute_mission_head: "Mission",
    institute_mission_subhead: "Strive for progress, not perfection.",
    institute_vision: "",
    institute_vision_head: "Vision",
    institute_vision_subhead: "Excellence is not a skill. It is an attitude.",
    institute_owner_message: "",
    institute_owner_name: "",
    institute_owner_designation: "",
    institute_owner_profile_photo: "",
    institute_intro_video: "",
    institute_intro_title: "",
    institute_intro_description: "",
  });

  const [banners, setBanners] = useState([
    {
      institute_featured_banner: "",
      institute_featured_headline: "",
      institute_short_description: "",
      bannnerError: false,
    },
  ]);

  // ADD NEW BANNER LIST
  const handleAddBannerClick = (e) => {
    e.preventDefault();
    setShowError(false);
    const newBanner = banners;
    newBanner.push({
      institute_featured_banner: "",
      institute_featured_headline: "",
      institute_short_description: "",
    });
    setBanners([...newBanner]);
  };

  // REMOVE BANNER LIST
  const handleRemoveBannnerClick = (e, index) => {
    e.preventDefault();
    setShowError(false);
    const removeBanner = banners;
    removeBanner.splice(index, 1);
    setBanners([...removeBanner]);
  };

  // SET INSTITUTE LOGO IMAGE
  const uploadImage1 = (data, option) => {
    let imgData = data.location;
    const createWebsiteData = {
      ...createWebsite,
      institute_logo: imgData,
    };
    setCreateWebsite(createWebsiteData);
  };

  const removeLogoImage = () => {
    const temp = {
      ...createWebsite,
      institute_logo: "",
    };
    setCreateWebsite(temp);
  };

  // SET INSTITUTE ABOUT IMAGE
  const uploadImage5 = (data) => {
    let imgData = data.location;
    const createWebsiteData = {
      ...createWebsite,
      institute_about_upload: imgData,
    };
    setCreateWebsite(createWebsiteData);
  };

  const removeAboutImage = () => {
    const temp = {
      ...createWebsite,
      institute_about_upload: "",
    };
    setCreateWebsite(temp);
  };

  // SET AUTHORITY PROFILE IMAGE
  const uploadImage2 = (data) => {
    let imgData = data.location;
    const createWebsiteData = {
      ...createWebsite,
      institute_owner_profile_photo: imgData,
    };
    setCreateWebsite(createWebsiteData);
  };

  const removeProfileImage = () => {
    const temp = {
      ...createWebsite,
      institute_owner_profile_photo: "",
    };
    setCreateWebsite(temp);
  };

  // SET INTRO VIDEO
  const uploadImage4 = (data) => {
    const imgData = data.location;
    const createWebsiteData = {
      ...createWebsite,
      institute_intro_video: imgData,
    };
    setCreateWebsite(createWebsiteData);
  };

  const removeIntroVideo = () => {
    const temp = {
      ...createWebsite,
      institute_intro_video: "",
    };
    setCreateWebsite(temp);
  };

  // SET FEATURED BANNERS
  const handleBannerUpload = (e, key) => {
    let data = e.location;
    const temp = banners;
    temp[key]["institute_featured_banner"] = data;
    setBanners([...temp]);
  };

  const removeFeaturedBanner = (key) => {
    const temp = banners;
    temp[key]["institute_featured_banner"] = "";
    setBanners([...temp]);
  };

  const handleBannerHeadline = (e, key) => {
    const data = e.target.value;
    const temp = banners;
    temp[key]["institute_featured_headline"] = data;
    setBanners([...temp]);
  };

  const handleBannerDescription = (e, key) => {
    const data = e.target.value;
    const temp = banners;
    temp[key]["institute_short_description"] = data;
    setBanners([...temp]);
  };

  // HANDLING FORM INPUT TO STATE VARIABLE
  const handleInput = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const embed = inputValue.includes("youtu.be")
      ? inputValue.replace("youtu.be", "youtube.com/embed")
      : inputValue.replace("watch?v=", "embed/");
    const params = embed.split("&")[0];
    const createWebsiteData = {
      ...createWebsite,
      [inputName]: params ? params : inputValue,
    };
    setCreateWebsite(createWebsiteData);
  };

  // REACT HOOK FOR CHECKING WHETHER DOMAIN NAME IS AVIALABLE IN LOCALSTORAGE
  useEffect(() => {
    if (SessionStorage.alive("DomainName")) {
      const domainName = SessionStorage.getJson("DomainName");
      const checkDomainData = {
        ...checkDomain,
        institute_subdomain: {
          value: domainName,
          isValid: ValidationFile.validEmpty(domainName),
        },
      };
      // SETTING DOMAIN NAME TO LOCAL STATE
      setcheckDomain(checkDomainData);
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // THIS REACT HOOK METHOD HANDLES DATA FROM STORAGE AND SET IN WEBSITE
  // IT CAN PERSIST LAST STORED DATA FROM LOCALSTORAGE
  useEffect(() => {
    if (SessionStorage.alive("InstituteWebsite")) {
      const websiteValue = SessionStorage.getJson("InstituteWebsite");

      const institute_logo = websiteValue.institute_logo;
      const institute_about = websiteValue.institute_about;
      const institute_about_head = createWebsite.institute_about_head;
      const institute_about_subhead = createWebsite.institute_about_subhead;
      const institute_about_upload = createWebsite.institute_about_upload;
      const institute_mission = websiteValue.institute_mission;
      const institute_mission_head = createWebsite.institute_mission_head;
      const institute_mission_subhead = createWebsite.institute_mission_subhead;
      const institute_vision = createWebsite.institute_vision;
      const institute_vision_head = createWebsite.institute_vision_head;
      const institute_vision_subhead = createWebsite.institute_vision_subhead;
      const institute_owner_message = websiteValue.institute_owner_message;
      const institute_owner_name = websiteValue.institute_owner_name;
      const institute_owner_designation =
        websiteValue.institute_owner_designation;
      const institute_owner_profile_photo =
        websiteValue.institute_owner_profile_photo;
      const institute_intro_video = createWebsite.institute_intro_video;
      const institute_intro_title = createWebsite.institute_intro_title;
      const institute_intro_description =
        createWebsite.institute_intro_description;
      // const banners = [...banners];

      const createWebsiteData = {
        ...createWebsite,
        institute_logo: institute_logo,
        institute_about: institute_about,
        institute_about_head: institute_about_head,
        institute_about_subhead: institute_about_subhead,
        institute_about_upload: institute_about_upload,
        institute_mission: institute_mission,
        institute_mission_head: institute_mission_head,
        institute_mission_subhead: institute_mission_subhead,
        institute_vision: institute_vision,
        institute_vision_head: institute_vision_head,
        institute_vision_subhead: institute_vision_subhead,
        institute_owner_message: institute_owner_message,
        institute_owner_name: institute_owner_name,
        institute_owner_designation: institute_owner_designation,
        institute_owner_profile_photo: institute_owner_profile_photo,
        institute_intro_video: institute_intro_video,
        institute_intro_title: institute_intro_title,
        institute_intro_description: institute_intro_description,
        banners: banners,
      };
      // SETTING DATA TO STATE
      setCreateWebsite(createWebsiteData);
    }
  }, [banners, createWebsite]);

  // RETURNS WEBSITE DATA IN OBJECT
  const getWesbiteData = () => {
    return {
      institute_logo: createWebsite.institute_logo,
      institute_about: createWebsite.institute_about,
      institute_about_head: createWebsite.institute_about_head,
      institute_about_subhead: createWebsite.institute_about_subhead,
      institute_about_upload: createWebsite.institute_about_upload,
      institute_mission: createWebsite.institute_mission,
      institute_mission_head: createWebsite.institute_mission_head,
      institute_mission_subhead: createWebsite.institute_mission_subhead,
      institute_vision: createWebsite.institute_vision,
      institute_vision_head: createWebsite.institute_vision_head,
      institute_vision_subhead: createWebsite.institute_vision_subhead,
      institute_owner_designation: createWebsite.institute_owner_designation,
      institute_owner_profile_photo:
        createWebsite.institute_owner_profile_photo,
      institute_owner_message: createWebsite.institute_owner_message,
      institute_owner_name: createWebsite.institute_owner_name,
      institute_intro_video: createWebsite.institute_intro_video,
      institute_intro_title: createWebsite.institute_intro_title,
      institute_intro_description: createWebsite.institute_intro_description,
      banners: [...banners],
    };
  };

  //  HANDLE DATA STORE IN LOCALSTORAGE REDIRECT TO PREVIEW PAGE
  // const handlePreview = () => {
  //   const websiteData = getWesbiteData();
  //   Storage.setJson("InstituteWebsite", websiteData);
  //   history("/preview-website");
  // };

  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  // THIS METHOD HANDLES FINAL WEBSITE PUBLISH
  const finalSubmit = (e) => {
    e.preventDefault();
    const websiteData = getWesbiteData();
    SessionStorage.setJson("InstituteWebsite", websiteData);
    // IF USER IS LOGGED IN
    if (userToken) {
      // ASSIGNING STORAGE VARIABLE TO LOCAL VARIABLE
      const domain = SessionStorage.getJson("DomainName");
      const regInstitute = SessionStorage.getJson("RegisterInstitiute");
      const regWebsite = SessionStorage.getJson("InstituteWebsite");
      // WRAPPING IN ONE OBJECT AND HITTING POST REQUEST TO API
      const payloadForOnline = {
        ...regInstitute,
        ...regWebsite,
        institute_subdomain: domain,
        owner: id,
      };
      if (banners.length > 1) {
        setShowError(true);
        if (banners.every((item) => item.institute_featured_banner)) {
          dispatch(postInstituteDataOnline(payloadForOnline));
        }
      } else {
        dispatch(postInstituteDataOnline(payloadForOnline));
      }
      setIsLoading(true);
      setOnlineResgiter(true);
      // REMOVE ALL THE STORAGE DATA AFTER SUCCESSFUL DATA POST
      SessionStorage.remove("DomainName");
      SessionStorage.remove("InstituteWebsite");
      SessionStorage.remove("RegisterInstitiute");
    }
    // USER IS NOT LOGGED IN
    else {
      // ASSIGNING STORAGE VARIABLE TO LOCAL VARIABLE
      const domain = SessionStorage.getJson("DomainName");
      const regInstitute = SessionStorage.getJson("RegisterInstitiute");
      const regWebsite = SessionStorage.getJson("InstituteWebsite");
      const regUser = SessionStorage.getJson("UserRegistration");
      // WRAPPING IN ONE OBJECT AND HITTING POST REQUEST TO API
      const payloadForOffline = {
        ...regInstitute,
        ...regWebsite,
        ...regUser,
        institute_subdomain: domain,
      };
      if (banners.length > 1) {
        setShowError(true);
        if (banners.every((item) => item.institute_featured_banner)) {
          dispatch(postInstituteDataOffline(payloadForOffline));
        }
      } else {
        dispatch(postInstituteDataOffline(payloadForOffline));
      }
      setIsLoading(true);
      setOfflineResgiter(true);
    }
  };

  const [isOnlineRegiter, setOnlineResgiter] = useState(false);
  const [isOfflineRegiter, setOfflineResgiter] = useState(false);

  if (isOnlineRegiter && registerInstitute.success) {
    window.open(
      AppLinkUrl.createSubdomain(registerInstitute.data.institute_subdomain)
    );
    let data = {
      userId: id,
      instituteId: registerInstitute.data._id,
    };
    dispatch(subDomainMail(data));
    setOnlineResgiter(false);
    history("/");
  } else if (isOfflineRegiter && registerInstitute.success) {
    let data = {
      userId: registerInstitute.data.userInfo,
      instituteId: registerInstitute.data.instituteInfo,
    };
    dispatch(subDomainMail(data));
    setOfflineResgiter(false);
    history("/pending-email-verify");
  }

  const [ToggleUpload, SetToggleUpload] = useState("video");
  const UploadHandler = (ToggleUpload) => {
    SetToggleUpload(ToggleUpload);
  };

  return (
    <React.Fragment>
      <div className="mt-80">
        <AppLink className="btnText text-xs" to="/register-institute">
          <i className="animate-r-arrow-icon back-i"></i> back to information
        </AppLink>
      </div>
      <div className="PageTopHead PTH-MIW-Head mt-30">
        <div className="PTH-Item">
          <h1 className="text-sm w-300">Edit Website Information</h1>
          <p className="heading text-xxs base">
            Tell us more amazing things about your institute.
          </p>
        </div>
        <div className="PTH-Item P-Right">
          {id && (
            <>
              <p className="heading text-xs base">
                Don't have the required information?
              </p>
              <div className="MIW-BrowseHT">
                {userRole && (
                  <AppLink to="/" className="btnText text-xs">
                    Dashboard
                    <i className="animate-r-arrow-icon"></i>
                  </AppLink>
                )}
                <AppLink to="/edneed-feed" className="btnText text-xs">
                  Browse Feed
                  <i className="animate-r-arrow-icon"></i>
                </AppLink>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="EditSiteBuilderBody">
        <div className="SBBodyHeadWrap">
          <div className="SBBodyHeadItem">
            <p className="secondary text-xs w-500">
              {checkDomain.institute_subdomain.value}.edneed.com
            </p>
          </div>
        </div>
        <div className="MIW-UploadLogoSectonWrap">
          <div className="MIW-UploadLogoSecton">
            <div className="file-upload-input">
              <p className="labelcst text-sm w-500">
                Upload your Institute Logo
              </p>
              <div className="tooltip-cst">
                <span className="question-circle-icon">
                  <i className="ed-icon icon-tooltip i-xxs base"></i>
                </span>
                <div className="tooltip-content-cst">
                  <p>
                    Upload school's logo. A logo provides a unique
                    identification of the school, and is a representation of
                    the school's history, culture, and tradition.
                  </p>
                </div>
              </div>
              <ul className="DashedInstructionList">
                <li className="text-xxs">Accept only .jpg or .png.</li>
              </ul>
            </div>
            <div className="formFieldwrap mt-8">
              {/* <Upload
                    onUploaded={uploadImage1}
                    size="0.5"
                    label="Upload Logo"
                    invalidError={() => removeLogoImage()}
                    hidenFileName={true}
                  /> */}
              <Cropper
                logoLand={true}
                square={true}
                ref={ref}
                minWidth={80}
                maxWidth={300}
                onUploaded={uploadImage1}
                BtnName="Upload Image"
                IconClassName="i-md gray"
                BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
              />
              {createWebsite.institute_logo && (
                <a
                  className="btnText priamry text-2xs attachmentwithtext mt-3"
                  href={createWebsite.institute_logo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ed-icon icon-attachment gray i-xs"></i>
                  {createWebsite.institute_logo.replace(s3Url, "")}
                </a>
              )}
            </div>
            <div className="logoPreview">
              <h6 className="text-xxs dgray w-400">Logo preview</h6>
              <img
                className="logoPreviewImg"
                src={
                  createWebsite.institute_logo
                    ? createWebsite.institute_logo
                    : demoLogo
                }
                alt="logo preview"
              />
            </div>
            {createWebsite.institute_logo && (
              <button
                className="button btn-sm btn-o-red red mt-8"
                onClick={removeLogoImage}
              >
                Remove
              </button>
            )}
          </div>
        </div>
        <Card className="MIW-AboutInstitute cardPadding mt-40">
          <CardBody>
            <p className="labelcst text-sm w-500 mb-5">About Institute</p>
            <div className="formFieldwrap">
              <FormInput
                type="text"
                maxLength="80"
                name="institute_about_head"
                defaultValue={createWebsite.institute_about_head}
                label="Main Heading"
                placeholder="About Us"
                onChange={handleInput}
              />
            </div>
            <div className="formFieldwrap">
              <FormInput
                type="text"
                maxLength="140"
                name="institute_about_subhead"
                defaultValue={createWebsite.institute_about_subhead}
                label="Subheading"
                placeholder="Changing lives, one student at a time"
                onChange={handleInput}
              />
            </div>
            <div className="formFieldwrap">
              <FormTextArea
                onKeyUp={handleInput}
                className="form-control"
                id="6"
                rows="5"
                type="text"
                placeholder="Tell something amazing about your institute"
                label="Tell something amazing about your institute"
                name="institute_about"
                defaultValue={createWebsite.institute_about}
                style={{ whiteSpace: " pre-wrap" }}
                maxLength="1000"
                onChange={handleInput}
                TextareaBtmTxt="1000"
              ></FormTextArea>
            </div>
            <div className="MIW-AboutUploadImage">
              <div className="MIW-AboutUploadImageLeft">
                <p>Upload Image</p>
                <ul className="DashedInstructionList">
                  <li className="text-xxs">Accept only .JPG or .PNG</li>
                </ul>
                <div className="formFieldwrap mt-15">
                  {/* <Upload
                        onUploaded={uploadImage5}
                        size="0.5"
                        label="Upload Image"
                        invalidError={() => removeAboutImage()}
                        hidenFileName={true}
                      /> */}
                  <Cropper
                    minWidth={300}
                    maxWidth={600}
                    ref={ref}
                    defaultRatio={5 / 3}
                    onUploaded={uploadImage5}
                    BtnName="Upload Image"
                    IconClassName="i-md gray"
                    BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                  />
                  {createWebsite.institute_about_upload && (
                    <a
                      className="btnText priamry text-2xs attachmentwithtext mt-3"
                      href={createWebsite.institute_about_upload}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ed-icon icon-attachment gray i-xs"></i>
                      {createWebsite.institute_about_upload.replace(
                        s3Url,
                        ""
                      )}
                    </a>
                  )}
                </div>
              </div>
              <div className="MIW-AboutUploadImageRight">
                <div className="MIW-AboutImagePreview">
                  <h6 className="text-xxs dgray w-400">Image preview</h6>
                  <img
                    src={
                      createWebsite.institute_about_upload
                        ? createWebsite.institute_about_upload
                        : BackgroundDefault
                    }
                    className="MIW-AboutImgPreview"
                    alt="About preview"
                  />
                </div>
                {createWebsite.institute_about_upload && (
                  <button
                    className="button btn-sm btn-o-red red mt-8"
                    onClick={removeAboutImage}
                  >
                    {" "}
                    Remove
                  </button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="MIW-InstituteMision cardPadding mt-40">
          <CardBody>
            <p className="labelcst text-sm w-500 mb-5">Mission</p>
            <div className="formFieldwrap">
              <FormInput
                type="text"
                maxLength="80"
                name="institute_mission_head"
                defaultValue={createWebsite.institute_mission_head}
                onChange={handleInput}
                label="Main Heading"
                placeholder="Our Mission"
              />
            </div>
            <div className="formFieldwrap">
              <FormInput
                type="text"
                maxLength="140"
                name="institute_mission_subhead"
                defaultValue={createWebsite.institute_mission_subhead}
                onChange={handleInput}
                label="Subheading"
                placeholder="Strive for progress, not perfection"
              />
            </div>
            <div className="formFieldwrap">
              <FormTextArea
                onKeyUp={handleInput}
                className="form-control"
                id="exampleFormControlTextarea2"
                placeholder="Explain the meaning and purpose behind your institute."
                label="Explain the meaning and purpose behind your institute"
                rows="6"
                type="text"
                name="institute_mission"
                defaultValue={createWebsite.institute_mission}
                onChange={handleInput}
                maxLength="1000"
                TextareaBtmTxt="1000"
              ></FormTextArea>
            </div>
          </CardBody>
        </Card>
        <Card className="MIW-InstituteVision cardPadding mt-40">
          <CardBody>
            <p className="labelcst text-sm w-500 mb-5">Vision</p>
            <div className="formFieldwrap">
              <FormInput
                type="text"
                maxLength="80"
                name="institute_vision_head"
                defaultValue={createWebsite.institute_vision_head}
                onChange={handleInput}
                label="Main Heading"
                placeholder="Our Vision"
              />
            </div>
            <div className="formFieldwrap">
              <FormInput
                type="text"
                maxLength="140"
                name="institute_vision_subhead"
                defaultValue={createWebsite.institute_vision_subhead}
                onChange={handleInput}
                label="Subheading"
                placeholder="Excellence is not a skill. It is an attitude."
              />
            </div>
            <div className="formFieldwrap">
              <FormTextArea
                onKeyUp={handleInput}
                className="form-control"
                id="exampleFormControlTextarea3"
                placeholder="Tell visitors what your institute stands for."
                label="About your Vision"
                rows="6"
                type="text"
                name="institute_vision"
                defaultValue={createWebsite.institute_vision}
                onChange={handleInput}
                maxLength="1000"
                TextareaBtmTxt="1000"
              ></FormTextArea>
            </div>
          </CardBody>
        </Card>
        <Card className="MIW-IntroVideo cardPadding mt-40">
          <CardBody>
            <p className="labelcst text-sm w-500 mb-5">Add Intro Video</p>
            <div className="MIW-IntroVideomain">
              <div className="MIW-IntroVideoLeft">
                <div className="formFieldwrap">
                  <FormInput
                    label="Video Title"
                    placeholder="Video Title"
                    onChange={handleInput}
                    name="institute_intro_title"
                    maxLength="80"
                    defaultValue={createWebsite.institute_intro_title}
                  />
                </div>
                <div className="MIW-IntroVideoRadio">
                  <div className="input-custom-type">
                    <label
                      className={`RadioContainer ${ToggleUpload === "video" ? "active" : ""
                        }`}
                    >
                      Upload Video
                      <input
                        type="radio"
                        name="a"
                        value="video"
                        checked={ToggleUpload === "video"}
                        onChange={(e) => UploadHandler("video")}
                      />
                      <span className="RadioCheckmark"></span>
                    </label>
                    <label
                      className={`RadioContainer ${ToggleUpload === "url" ? "active" : ""
                        }`}
                    >
                      {" "}
                      Add YouTube Video URL
                      <input
                        type="radio"
                        name="a"
                        value="url"
                        checked={ToggleUpload === "url"}
                        onChange={(e) => UploadHandler("url")}
                      />
                      <span className="RadioCheckmark"></span>
                    </label>
                  </div>
                </div>
                {ToggleUpload === "url" && (
                  <React.Fragment>
                    <p className="labelcst text-xs w-500">Upload URL</p>
                    <div className="formFieldwrap">
                      <FormInput
                        onChange={handleInput}
                        name="institute_intro_video"
                        defaultValue={createWebsite.institute_intro_video}
                        label="Video Url"
                        placeholder="Video Url"
                      />
                      {createWebsite.institute_intro_video}
                    </div>
                  </React.Fragment>
                )}
                {ToggleUpload === "video" && (
                  <React.Fragment>
                    <p className="labelcst text-xs w-500">Upload Video</p>
                    <ul className="DashedInstructionList">
                      <li className="text-xxs">
                        Accept only .MP4 and maximum file size 10 MB.
                      </li>
                      <li className="text-xxs">
                        Recommended aspect ratio is 4:3.
                      </li>
                    </ul>
                    <div className="formFieldwrap">
                      <Upload
                        size={10}
                        onlyVideo={true}
                        label="Upload Video"
                        onUploaded={uploadImage4}
                        invalidError={() => removeIntroVideo()}
                        hidenFileName={true}
                        IconFileUploadClass="icon-file-upload base i-xs"
                      />
                      {createWebsite.institute_intro_video && (
                        <a
                          className="btnText priamry text-2xs attachmentwithtext mt-3"
                          href={createWebsite.institute_intro_video}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="ed-icon icon-attachment gray i-xs"></i>
                          {createWebsite.institute_intro_video.replace(
                            s3Url,
                            ""
                          )}
                        </a>
                      )}
                    </div>
                  </React.Fragment>
                )}
                <div className="formFieldwrap">
                  <FormTextArea
                    className="form-control"
                    id="exampleFormControlTextarea6"
                    placeholder="Videos are 85% more engaging than photos."
                    label="Video Description"
                    onChange={handleInput}
                    rows="6"
                    type="text"
                    name="institute_intro_description"
                    maxLength="500"
                    TextareaBtmTxt="500"
                  ></FormTextArea>
                </div>
              </div>
              <div className="MIW-IntroVideoRight">
                <div className="MIW-IntroVideoPreview">
                  <h6 className="dgray text-xxs w-400 mb-5">Video preview</h6>
                  {/* {!createWebsite.institute_intro_video &&
                      <video
                        height="180"
                        src={createWebsite.institute_intro_video}
                        controls
                        autoPlay
                        className="gallery-thumnail"
                        alt=""
                      ></video>
                    } */}
                  {createWebsite.institute_intro_video &&
                    createWebsite.institute_intro_video.includes(".mp4") ? (
                    <video
                      height="180"
                      src={createWebsite.institute_intro_video}
                      controls
                      autoPlay
                      className="gallery-thumnail"
                      alt=""
                    ></video>
                  ) : createWebsite.institute_intro_video.includes(
                    "embed"
                  ) ? (
                    <iframe
                      title="youtube video"
                      src={createWebsite.institute_intro_video}
                      frameborder="0"
                      width="350"
                      height="250"
                    ></iframe>
                  ) : (
                    <video
                      height="180"
                      src=""
                      controls
                      autoPlay
                      className="gallery-thumnail"
                      alt=""
                    ></video>
                  )}
                </div>
                {createWebsite.institute_intro_video && (
                  <button
                    className="button btn-sm btn-o-red red mt-8"
                    onClick={removeIntroVideo}
                  >
                    {" "}
                    Remove
                  </button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="MIW-InstituteAuthority cardPadding mt-40">
          <CardBody>
            <p className="labelcst text-sm w-500 mb-5">
              Message from Institute Authority
            </p>
            <div className="MIW-InstituteAuthoritymain">
              <div className="MIW-InstituteAuthorityLeft">
                <div className="formFieldwrap">
                  <FormInput
                    onKeyUp={handleInput}
                    className=""
                    type="text"
                    label="Person Name"
                    placeholder="Person Name"
                    name="institute_owner_name"
                    defaultValue={createWebsite.institute_owner_name}
                    onChange={handleInput}
                    maxLength="80"
                  />
                </div>
                <div className="formFieldwrap">
                  <FormInput
                    onKeyUp={handleInput}
                    className=""
                    type="text"
                    label="Designation"
                    placeholder="Designation e.g. director, principal, founder"
                    name="institute_owner_designation"
                    maxLength="80"
                    defaultValue={createWebsite.institute_owner_designation}
                    onChange={handleInput}
                  />
                </div>
                <div className="file-upload-input">
                  <p className="labelcst text-xs w-500 ">Profile photo</p>
                  <div className="tooltip-cst">
                    <span className="question-circle-icon">
                      <i className="ed-icon icon-tooltip i-xxs base"></i>
                    </span>
                    <div className="tooltip-content-cst text-xxs">
                      <p>
                        The picture will be displayed above the message on the
                        website with the concerned person's name and
                        designation.
                      </p>
                    </div>
                  </div>
                  <ul className="DashedInstructionList">
                    <li className="text-xxs">
                      Accept only .JPG or .PNG and maximum file size 100 KB.
                    </li>
                  </ul>
                </div>
                <div className="formFieldwrap">
                  {/* <Upload
                        onUploaded={uploadImage2}
                        size={10}
                        label="Select profile photo"
                        hidenFileName={true}
                        invalidError={() => removeProfileImage()}
                      /> */}
                  <Cropper
                    minWidth={200}
                    maxWidth={500}
                    defaultRatio={1 / 1}
                    ref={ref}
                    onUploaded={uploadImage2}
                    BtnName="Upload Image"
                    IconClassName="i-md gray"
                    BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                  />
                  {createWebsite.institute_owner_profile_photo && (
                    <a
                      className="btnText priamry text-2xs attachmentwithtext mt-3"
                      href={createWebsite.institute_owner_profile_photo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ed-icon icon-attachment gray i-xs"></i>
                      {createWebsite.institute_owner_profile_photo.replace(
                        s3Url,
                        ""
                      )}
                    </a>
                  )}
                </div>
                <div className="formFieldwrap">
                  <FormTextArea
                    onKeyUp={handleInput}
                    className="form-control"
                    id="exampleFormControlTextarea4"
                    rows="5"
                    style={{ whiteSpace: " pre-wrap" }}
                    label="Enter Message"
                    placeholder="Enter message. Tip: Keep content motivational and in line with your vision"
                    defaultValue={createWebsite.institute_owner_message}
                    name="institute_owner_message"
                    onChange={handleInput}
                    maxLength="500"
                    TextareaBtmTxt="500"
                  />
                </div>
              </div>
              <div className="MIW-InstituteAuthorityRight">
                <div className="MIW-ProfileImagePreview">
                  <h6 className="dgray text-xxs w-400">
                    Profile photo preview
                  </h6>
                  <img
                    className="MIW-ProfileImgPreview"
                    src={
                      createWebsite.institute_owner_profile_photo
                        ? createWebsite.institute_owner_profile_photo
                        : DummyProfile
                    }
                    alt="logo preview"
                  />
                </div>
                {createWebsite.institute_owner_profile_photo && (
                  <button
                    className="button btn-sm btn-o-red red mt-8"
                    onClick={removeProfileImage}
                  >
                    {" "}
                    Remove
                  </button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="MIW-FeaturedBanner cardPadding mt-40">
          <CardBody>
            {banners.map((banner, key) => {
              return (
                <>
                  <p className="labelcst text-sm w-500">Home Banner Slider</p>
                  <ul className="DashedInstructionList mb-15">
                    <li className="text-xxs">Accept only .JPG or .PNG</li>
                  </ul>
                  <div className="MIW-FeaturedBannerMainWrap mt-20">
                    <div className="MIW-FeaturedBannerMain">
                      <div className="MIW-FeaturedBannerLeft">
                        <div className="file-upload-input mb-5">
                          <p className="labelcst text-xs w-500">
                            Upload your banner
                          </p>
                          <div className="tooltip-cst">
                            <span className="question-circle-icon">
                              <i className="ed-icon icon-tooltip i-xxs base"></i>
                            </span>
                            <div className="tooltip-content-cst text-xxs">
                              <p>
                                Featured Banner will be the first photo that
                                prospects see when they visit your website.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="formFieldwrap">
                          {/* <Upload
                                onUploaded={(e) => handleBannerUpload(e, key)}
                                size={10}
                                label="Upload banner image"
                                hidenFileName={true}
                                invalidError={() => removeFeaturedBanner(key)}
                              /> */}
                          <Cropper
                            minWidth={1000}
                            maxWidth={2000}
                            defaultRatio={16 / 7}
                            ref={ref}
                            onUploaded={(e) => handleBannerUpload(e, key)}
                            BtnName="Upload Image"
                            IconClassName="i-md gray"
                            BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                          />
                          {banner.institute_featured_banner && (
                            <a
                              className="btnText priamry text-2xs attachmentwithtext mt-3"
                              href={banner.institute_featured_banner}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="ed-icon icon-attachment gray i-xs"></i>
                              {banner.institute_featured_banner.replace(
                                s3Url,
                                ""
                              )}
                            </a>
                          )}
                          <FormError
                            show={
                              !banner.institute_featured_banner && showError
                            }
                            error="File required."
                          />
                        </div>
                        <div className="formFieldwrap">
                          <FormInput
                            name="institute_featured_headline"
                            value={banner.institute_featured_headline}
                            defaultValue={
                              createWebsite.institute_featured_headline
                            }
                            type="text"
                            label="Banner headline"
                            placeholder="Enter institute motto here"
                            style={{ whiteSpace: " pre-wrap" }}
                            maxLength="80"
                            TextareaBtmTxt="80"
                            onKeyUp={(e) => handleBannerHeadline(e, key)}
                            onChange={(e) => handleBannerHeadline(e, key)}
                          />
                        </div>
                        <div className="formFieldwrap">
                          <FormTextArea
                            id="6"
                            value={banner.institute_short_description}
                            defaultValue={
                              createWebsite.institute_short_description
                            }
                            label="Banner description"
                            rows="5"
                            placeholder="Tip: Describe your institute's features and advantages"
                            style={{ whiteSpace: "pre-wrap" }}
                            name="institute_short_description"
                            TextareaBtmTxt="140"
                            onKeyUp={(e) => handleBannerDescription(e, key)}
                            onChange={(e) => handleBannerDescription(e, key)}
                          />
                        </div>
                      </div>
                      <div className="MIW-FeaturedBannerRight">
                        <div className="MIW-BannerImagePreview">
                          <h6 className="dgray text-xxs w-400">
                            Banner preview
                          </h6>
                          <img
                            className="MIW-BannerImgPreview"
                            src={
                              banner.institute_featured_banner
                                ? banner.institute_featured_banner
                                : BackgroundDefault
                            }
                            alt="logo preview"
                            label="Upload your image"
                          />
                        </div>
                        {banner.institute_featured_banner && (
                          <button
                            className="button btn-sm btn-o-red red mt-8"
                            onClick={() => removeFeaturedBanner(key)}
                          >
                            {" "}
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                    {banners.length > 1 && (
                      <button
                        className="button btn-sm btn-o-primary"
                        onClick={(e) => handleRemoveBannnerClick(e, key)}
                      >
                        <i className="ed-icon icon-delete primary i-xs"></i>
                        Delete
                      </button>
                    )}
                  </div>
                </>
              );
            })}
            {banners.length < 5 && (
              <button
                className="button btn-sm button-primary mt-20"
                onClick={(e) => handleAddBannerClick(e)}
              >
                <i className="ed-icon icon-plus-add white i-xs"></i>
                Add new Banner
              </button>
            )}
          </CardBody>
        </Card>
        <div className="SiteBuilderAction mt-50">
          {!isLoading ? (
            <button className="button btn-md button-theme btn-md" onClick={finalSubmit}>
              Publish Website!
            </button>
          ) : (
            <button className="button btn-md button-theme btn-md">Loading...</button>
          )}
        </div>
      </div>
      <HomeFooter />
    </React.Fragment>
  );
};

export default CreateWebsite;
