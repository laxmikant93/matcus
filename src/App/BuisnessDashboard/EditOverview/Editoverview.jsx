/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import InstituteTheme from "../../../Common/Theme/InstituteTheme";
import FormInput from "../../../Common/Form/FormInput";
import FormTextArea from "../../../Common/Form/FormTextArea";
import { useDispatch, useSelector } from "react-redux";
import demoLogo from "../../../assets/images/logo/demo-logo.jpg";
import Upload from "../../../Common/Upload/index";
import { useNavigate } from "react-router-dom";
import Card from "../../../Common/Card";
import CardBody from "../../../Common/Card/CardBody";
import Breadcrumb from "../../../Common/Breadcrumb";
import FormError from "../../../Common/Form/FormError";
import { IconAttachment } from "../../../Common/Icon";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import BackgroundDefault from "../../../assets/images/img/BackgroundDefault.png";
import DummyProfile from "../../../assets/images/img/DummyProfile.png";
import Cropper from "../../../Common/Cropper";
import "./editoverview.scss";
import { getInstituteData, patchInstituteInfo, patchInstituteDataReset, getInstituteDataReset } from "../../../store/actions/businessInfo";
import TextEditor from "../../../Common/Form/TextEditor";
import { createRef } from "react";
import RenderTabs from "../../../Common/Tabs/RenderTabs";

export default function Editoverview() {
  const history = useNavigate();
  const [isFilled, setisFilled] = useState(false);
  const [seconds, setSeconds] = React.useState(5);
  const logoRef = useRef()
  const aboutRef = useRef()
  const coeRef = useRef()
  const principleRef = useRef()

  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";

  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setTimeout(() => { });
    }
  });

  const dispatch = useDispatch();

  const { InstituteInfo, users, InstitutePatchSuccess, businessId } = useSelector(
    (state) => {
      return {
        InstituteInfo: state.businessInfo.getInstituiteData.data,
        InstitutePatchSuccess: state.businessInfo.patchInstituteInfo.loading,
        users: state.user,
        businessId: state.user.user_business
      };
    }
  );

  useEffect(() => {
    return () => {
      dispatch(patchInstituteDataReset())
      dispatch(getInstituteDataReset())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getInstituteData(businessId, users.user_business_type));
  }, [dispatch, users]);

  const [isPatched, setIsPatched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!InstitutePatchSuccess && !isPatched && isLoading) {
    setIsPatched(true);
    history(`/`);
  }

  const [institute_logo, set_institute_logo] = useState("");
  const [institute_about, set_institute_about] = useState("");
  const [institute_about_head, set_institute_about_head] = useState("");
  const [institute_about_subhead, set_institute_about_subhead] = useState("");

  const [institute_mission_head, set_institute_mission_head] = useState("");
  const [institute_mission_subhead, set_institute_mission_subhead] =
    useState("");
  const [institute_vision_head, set_institute_vision_head] = useState("");
  // const [institute_location, set_institute_location] = useState("");
  const [locationValid, set_locationValid] = useState(false);

  const [institute_about_upload, set_institute_about_upload] = useState("");
  const [institute_owner_message, set_institute_owner_message] = useState("");
  const [institute_intro_description, set_institute_intro_description] =
    useState("");

  const [institute_coe, set_institute_coe] = useState("");
  const [institute_coe_head, set_institute_coe_head] = useState("");
  const [institute_coe_subhead, set_institute_coe_subhead] = useState("");
  const [institute_coe_upload, set_institute_coe_upload] = useState("");

  const [institute_vision_subhead, set_institute_vision_subhead] = useState("");
  const [institute_vision, set_institute_vision] = useState("");
  const [institute_mission, set_institute_mission] = useState("");
  const [institute_owner_name, set_institute_owner_name] = useState("");
  const [institute_owner_designation, set_institute_owner_designation] =
    useState("");
  const [institute_owner_profile_photo, set_institute_owner_profile_photo] =
    useState("");
  const [institute_intro_video, set_institute_intro_video] = useState("");
  const [institute_intro_title, set_institute_intro_title] = useState("");

  const [business_owner_details, setBusiness_owner_details] = useState([
    {
      business_owner_name: "",
      business_owner_designation: "",
      business_owner_profile_photo: "",
      business_owner_message: ""
    }
  ])
  // console.log(business_owner_details, "line 111")
  const [banners, setBanners] = useState([
    {
      business_featured_banner: "",
      business_featured_banner_Active: "Desktop",
      business_featured_mobile_banner: "",
      business_featured_banner_Url: "",
      business_featured_headline: "",
      business_short_description: "",
    },
  ]);


  const oldBanner = [
    {
      business_featured_banner: InstituteInfo.business_featured_banner,
      business_featured_mobile_banner: InstituteInfo.business_featured_mobile_banner,
      business_featured_headline: InstituteInfo.business_featured_headline,
      business_short_description: InstituteInfo.business_short_description,
      business_featured_banner_Active: InstituteInfo.business_featured_banner_Active,
      business_featured_banner_Url: InstituteInfo.business_featured_banner_Url,
    },
  ];
  // console.log(InstituteInfo?.business_owner_details?.length > 0, "line 127")
  if (InstituteInfo.business_subdomain && !isFilled) {
    setisFilled(true);
    setBusiness_owner_details(InstituteInfo?.business_owner_details?.length > 0 ? InstituteInfo.business_owner_details : business_owner_details)
    set_institute_logo(InstituteInfo.business_logo);
    set_institute_about(InstituteInfo.business_about);
    set_institute_owner_message(InstituteInfo.business_owner_message);

    set_institute_about_head(
      !InstituteInfo.business_about_head
        ? "About Us"
        : InstituteInfo.business_about_head
    );
    set_institute_about_subhead(
      !InstituteInfo.business_about_subhead
        ? "Changing lives, one student at a time."
        : InstituteInfo.business_about_subhead
    );

    set_institute_about_upload(InstituteInfo.business_about_upload);

    set_institute_intro_description(InstituteInfo.business_intro_description);
    InstituteInfo.banners
      ? setBanners([...InstituteInfo.banners])
      : setBanners(oldBanner);




    set_institute_mission(!InstituteInfo.business_mission ?
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
      : InstituteInfo.business_mission);
    set_institute_owner_name(InstituteInfo.business_owner_name);
    set_institute_owner_designation(!InstituteInfo.business_owner_designation ? "Changing lives, one student at a time." : InstituteInfo.business_owner_designation);
    set_institute_owner_profile_photo(
      InstituteInfo.business_owner_profile_photo
    );


    set_institute_mission_head(
      !InstituteInfo.business_mission_head
        ? "Mission"
        : InstituteInfo.business_mission_head
    );
    set_institute_mission_subhead(
      !InstituteInfo.business_mission_subhead
        ? "Strive for progress, not perfection."
        : InstituteInfo.business_mission_subhead
    );
    set_institute_vision_head(
      !InstituteInfo.business_vision_head
        ? "Vision"
        : InstituteInfo.business_vision_head
    );
    set_institute_vision_subhead(
      !InstituteInfo.business_vision_subhead
        ? "Excellence is not a skill. It is an attitude."
        : InstituteInfo.business_vision_subhead
    );
    set_institute_vision(!InstituteInfo.business_vision ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry.when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." : InstituteInfo.business_vision);
    set_institute_about_upload(InstituteInfo.business_about_upload);
    set_institute_intro_video(InstituteInfo.business_intro_video);
    set_institute_intro_title(!InstituteInfo.business_intro_title ? "Add Intro Video" : InstituteInfo.business_intro_title);
    set_institute_intro_description(!InstituteInfo.business_intro_description ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry.when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." : InstituteInfo.business_intro_description);
    // set_institute_location(InstituteInfo.location_url)

    set_institute_coe(InstituteInfo.business_coe)
    set_institute_coe_head(InstituteInfo.business_coe_head)
    set_institute_coe_subhead(InstituteInfo.business_coe_subhead)
    set_institute_coe_upload(InstituteInfo.business_coebanner)
    if (InstituteInfo.banners && InstituteInfo.banners.length > 0) {
      let array = InstituteInfo.banners.map((item) => ({
        ...item,
        business_featured_banner_Active: "Desktop", // just for example
      }));
      setBanners([...array])
    } else {
      setBanners(oldBanner);
    }
  }

  const handleinput = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    switch (inputName) {
      case "institute_logo":
        set_institute_logo(inputValue);
        break;

      case "institute_about":
        set_institute_about(inputValue);
        break;

      case "institute_about_head":
        set_institute_about_head(inputValue);
        break;

      case "institute_about_subhead":
        set_institute_about_subhead(inputValue);
        break;

      case "institute_about_upload":
        set_institute_about_upload(inputValue);
        break;
      case "institute_mission":
        set_institute_mission(inputValue);
        break;

      case "institute_mission_head":
        set_institute_mission_head(inputValue);
        break;

      case "institute_mission_subhead":
        set_institute_mission_subhead(inputValue);
        break;

      case "institute_vision":
        set_institute_vision(inputValue);
        break;

      case "institute_vision_head":
        set_institute_vision_head(inputValue);
        break;

      case "institute_vision_subhead":
        set_institute_vision_subhead(inputValue);
        break;

      case "institute_intro_video":
        const embed = inputValue.includes("youtu.be")
          ? inputValue.replace("youtu.be", "youtube.com/embed")
          : inputValue.replace("watch?v=", "embed/");
        const params = embed.split("&")[0];
        set_institute_intro_video(params);
        break;

      case "institute_intro_title":
        set_institute_intro_title(inputValue);
        break;

      case "institute_intro_description":
        set_institute_intro_description(inputValue);
        break;

      case "institute_owner_message":
        set_institute_owner_message(inputValue);
        break;

      case "institute_owner_name":
        set_institute_owner_name(inputValue);
        break;

      case "institute_owner_designation":
        set_institute_owner_designation(inputValue);
        break;

      case "institute_owner_profile_photo":
        set_institute_owner_profile_photo(inputValue);
        break;
      // case "institute_location":
      //   // const locationEmbede = inputValue.includes("youtu.be")
      //   //   ? inputValue.replace("youtu.be", "youtube.com/locationEmbede")
      //   //   : inputValue.replace("watch?v=", "locationEmbede/");
      //   // const locationParams = locationEmbede.split("&")[0];
      //   // console.log(inputValue, "inputValue")
      //   set_locationValid(true)
      //   let location = inputValue
      //   if (location.includes('iframe src="https') || location === "") {
      //     set_institute_location(location);
      //     set_locationValid(false)
      //     // if (locationValid === true)
      //     //   setError()
      //     // console.log(locationValid, " 277 dushyant")
      //     // console.log(institute_location, " 2shyant")
      //   }
      //   break;
      case "institute_coe":
        set_institute_coe(inputValue);
        break;

      case "institute_coe_head":
        set_institute_coe_head(inputValue);
        break;

      case "institute_coe_subhead":
        set_institute_coe_subhead(inputValue);
        break;


      default:
        break;
    }
  };


  // ADD NEW BANNER LIST
  const handleAddBannerClick = (e) => {
    e.preventDefault();
    setShowError(false);
    const newBanner = banners;
    newBanner.push({
      business_featured_banner: "",
      business_featured_mobile_banner: "",
      business_featured_banner_Active: "Desktop",
      business_featured_headline: "",
      business_short_description: "",
      business_featured_banner_Url: ""
    });
    setBanners([...newBanner]);
  };

  // const uploadProfileImage = (data) => {
  //   let imgData = data.location;
  //   set_institute_owner_profile_photo(imgData);
  // };

  // const removeProfileImage = () => {
  //   set_institute_owner_profile_photo("");
  // };

  const uploadIntroVideo = (data) => {
    let imgData = data.location;
    set_institute_intro_video(imgData);
  };

  const removeIntroVideo = () => {
    set_institute_intro_video("");
  };


  // REMOVE BANNER LIST
  const handleRemoveBannnerClick = (index) => {
    // e.preventDefault();
    const removeBanner = banners;
    removeBanner.splice(index, 1);
    setBanners([...removeBanner]);
  };

  const [showError, setShowError] = useState(false);
  const handlesubmit = (e) => {
    e.preventDefault();
    if (banners.length > 1) {
      setShowError(true);
      if (banners.every((item) => item.business_featured_banner)) {
        dispatch(
          patchInstituteInfo(businessId, patchInstituteFormData(), users.user_business_type)
        );
        setIsLoading(true);
      }
    } else {


      dispatch(
        patchInstituteInfo(businessId, patchInstituteFormData(), users.user_business_type)

      );
      setIsLoading(true);
    }
  };

  const patchInstituteFormData = () => {
    return {
      business_logo: institute_logo,
      business_about: institute_about,
      business_owner_message: institute_owner_message,
      business_category: InstituteInfo.institute_category,
      business_name: InstituteInfo.institute_name,
      business_about_upload: institute_about_upload,
      business_about_head: institute_about_head,
      business_about_subhead: institute_about_subhead,
      business_intro_description: institute_intro_description,
      banners: banners,

      business_mission: institute_mission,
      business_owner_profile_photo: institute_owner_profile_photo,
      business_owner_name: institute_owner_name,
      business_owner_designation: institute_owner_designation,
      business_vision: institute_vision,
      business_mission_head: institute_mission_head,
      business_mission_subhead: institute_mission_subhead,
      business_vision_head: institute_vision_head,
      business_vision_subhead: institute_vision_subhead,
      business_intro_video: institute_intro_video,
      business_intro_title: institute_intro_title,
      business_coebanner: institute_coe_upload,
      business_coe: institute_coe,
      business_coe_head: institute_coe_head,
      business_coe_subhead: institute_coe_subhead,
      // location_url: institute_location,
      business_owner_details: business_owner_details
    };
  };

  const uploadLogoImage = (data, option) => {
    let imgData = data.location;
    set_institute_logo(imgData);
  };

  const removeLogoImage = (e) => {
    set_institute_logo("");
  };

  const uploadAboutImage = (data) => {
    let imgData = data.location;
    set_institute_about_upload(imgData);
  };

  const removeAboutImage = () => {
    set_institute_about_upload("");
  };
  const removeCoeImage = () => {
    set_institute_coe_upload("");
  };
  const uploadBanner = (data, key) => {
    let imgData = data.location;
    const temp = banners;
    temp[key]["business_featured_banner"] = imgData;
    setBanners([...temp]);
  };
  const uploadMobileBanner = (data, key) => {
    let imgData = data.location;
    const temp = banners;
    temp[key]["business_featured_mobile_banner"] = imgData;
    setBanners([...temp]);
  };
  const removeFeaturedBanner = (key) => {
    setShowError(false);
    const temp = banners;
    temp[key]["business_featured_banner"] = "";
    setBanners([...temp]);
  };
  const removeFeaturedMobileBanner = (key) => {
    setShowError(false);
    const temp = banners;
    temp[key]["business_featured_mobile_banner"] = "";
    setBanners([...temp]);
  };
  const handleBannerHeadline = (e, key) => {
    const data = e.target.value;
    const temp = banners;
    temp[key]["business_featured_headline"] = data;
    setBanners([...temp]);
  };
  const handleBannerUrl = (e, key) => {
    const data = e.target.value;
    const temp = banners;
    temp[key]["business_featured_banner_Url"] = data;
    setBanners([...temp]);
  };
  const handleBannerDescription = (e, key) => {
    const data = e.target.value;
    const temp = banners;
    temp[key]["business_short_description"] = data;
    setBanners([...temp]);
  };

  const [ToggleUpload, SetToggleUpload] = useState("video");
  const [once, setOnce] = useState(false);

  if (institute_intro_video && !once) {
    setOnce(true);
    if (institute_intro_video.includes(".mp4")) SetToggleUpload("video");
    else SetToggleUpload("url");
  }

  const UploadHandler = (ToggleUpload) => {
    removeIntroVideo();
    SetToggleUpload(ToggleUpload);
  };
  const uploadCoeImage = (data) => {
    let imgData = data.location;
    set_institute_coe_upload(imgData);
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  const handleRemovebusiness_owner_Click = (index) => {
    const removeBanner = business_owner_details;
    // console.log(removeBanner, "line 484")
    removeBanner.splice(index, 1);
    setBusiness_owner_details([...removeBanner]);
  }
  const handleActiveView = (val, key) => {
    const temp = banners;
    temp[key]['business_featured_banner_Active'] = val;
    setBanners([...temp]);
  }
  const handleAddbusiness_owner_Click = () => {
    let tempData = business_owner_details
    const temp = {
      business_owner_name: "",
      business_owner_designation: "",
      business_owner_profile_photo: "",
      business_owner_message: ""
    };
    tempData.push(temp)
    setBusiness_owner_details([...tempData]);
  }

  const handleAuthorityName = (e, key) => {
    let inputValue = e.target.value;
    business_owner_details[key]["business_owner_name"] = inputValue;
    setBusiness_owner_details([...business_owner_details]);
  }

  const handleAuthorityDesignation = (e, key) => {
    let inputValue = e.target.value;
    business_owner_details[key]["business_owner_designation"] = inputValue;
    setBusiness_owner_details([...business_owner_details]);
  }
  // const handleAuthorityMessage = (e, key) => {
  //   let inputValue = e.target.value;
  //   business_owner_details[key]["business_owner_message"] = inputValue;
  //   setBusiness_owner_details([...business_owner_details]);
  // }

  const uploadProfileImage = (data, key) => {
    // console.log(data, key)
    let imgData = data.location;
    let allinputs = business_owner_details;
    allinputs[key]["business_owner_profile_photo"] = imgData;
    setBusiness_owner_details([...allinputs]);
  };

  const removeProfileImage = (key) => {
    let imgData = "";
    let allinputs = business_owner_details;
    allinputs[key]["business_owner_profile_photo"] = imgData;
    setBusiness_owner_details([...allinputs]);
  };
  // console.log(business_owner_details, "line 528")

  const handleOnChangeContent = (value) => {
    set_institute_about(value);
  };

  const handleMissionChangeContent = (value) => {
    set_institute_mission(value);
  };

  const handleVisionChangeContent = (value) => {
    set_institute_vision(value);
  };

  const handleIntroVideoContent = (value) => {
    set_institute_intro_description(value);
  };

  const handleOwnerMessageContent = (value, key) => {
    let inputValue = value;
    business_owner_details[key]["business_owner_message"] = inputValue;
    setBusiness_owner_details([...business_owner_details]);
  };

  const handleCOEContent = (value) => {
    set_institute_coe(value);
  };


  console.log("bsl",banners )
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/ecommerce/business-info-manage" title="Edit Overview" />
      </Breadcrumb>
      <div className="PageTopHead PTH-MIW-Head mt-30">
        <div className="PTH-Item">
          <h1 className="text-sm w-300">Edit Business Information</h1>
          <p className="heading text-xxs base">
            Tell us more amazing things about your business.
          </p>
        </div>
      </div>
      <div className="EditSiteBuilderBody">
        <div className="SBBodyHeadWrap">
          <div className="SBBodyHeadItem">
            <p className="secondary text-xs w-500">
              {users.user_institute_institute_subdomain}.edneed.com
            </p>
          </div>
        </div>

        <div className="MIW-UploadLogoSectonWrap">
          <div className="MIW-UploadLogoSecton">
            <div className="file-upload-input">
              <p className="labelcst text-sm w-500">
                Upload your business Logo
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
                <li className="text-xxs">Accept only .jpg, .bmp or .png.</li>
              </ul>
            </div>
            <Cropper
              logoLand={true}
              ref={logoRef}
              square={true}
              minWidth={users.user_business_type === "Services" ? 168 : 70}
              maxWidth={users.user_business_type === "Services" ? 210 : 210}
              minHeight={users.user_business_type === "Services" && 84}
              maxHeight={users.user_business_type === "Services" && 105}
              defaultValue={institute_logo}
              onUploaded={uploadLogoImage}
              BtnName="Upload Image"
              IconClassName="i-md gray"
              BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
            />
            {institute_logo && (
              <a
                className="btnText priamry text-2xs attachmentwithtext mt-3"
                href={institute_logo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ed-icon icon-attachment gray i-xs"></i>
                {institute_logo.replace(s3Url, "")}
              </a>
            )}

            <div className="logoPreview">
              <h6 className="text-xxs dgray w-400">Logo preview</h6>
              <img
                className="logoPreviewImg"
                src={institute_logo ? institute_logo : demoLogo}
                alt="logo preview"
              />
            </div>
            {institute_logo && (
              <button
                className="button btn-sm btn-o-red red"
                onClick={removeLogoImage}
              >
                {" "}
                Remove
              </button>
            )}
          </div>
        </div>
        <Card className="MIW-AboutInstitute cardPadding mt-40">
          <CardBody>
            <p className="labelcst text-sm w-500 mb-5">About Business</p>
            <div className="formFieldwrap">
              <FormInput
                label="Main Heading"
                onChange={handleinput}
                value={institute_about_head}
                name="institute_about_head"
                placeholder="About Us"
                maxLength="80"
              />
            </div>
            <div className="formFieldwrap">
              <FormInput
                label="Subheading"
                onChange={handleinput}
                value={institute_about_subhead}
                name="institute_about_subhead"
                placeholder="Changing lives, one student at a time"
                maxLength="140"
              />
            </div>
            <div className="formFieldwrap">
              {/* <FormTextArea
                onKeyUp={handleinput}
                id="101"
                rows="7"
                type="text"
                placeholder="Tell something amazing about your business"
                label="About your business"
                name="institute_about"
                value={institute_about}
                style={{ whiteSpace: " pre-wrap" }}
                maxLength="2000"
                onChange={handleinput}
                TextareaBtmTxt="2000"
              ></FormTextArea> */}
              <TextEditor
                feature={"Tell something amazing about your business"}
                preFilledData={institute_about}
                currentResponse={(value) => handleOnChangeContent(value)}
              />
            </div>
            <div className="MIW-AboutUploadImage">
              <div className="MIW-AboutUploadImageLeft">
                <p>Upload Image</p>
                <ul className="DashedInstructionList">
                  <li className="text-xxs">Accept only .jpg, .bmp or .png.</li>
                </ul>
                <div className="formFieldwrap mt-15">
                  <Cropper
                    minWidth={users.user_business_type === "Services" ? 900 : 300}
                    maxWidth={users.user_business_type === "Services" ? 1440 : 600}
                    minHeight={users.user_business_type === "Services" && 300}
                    maxHeight={users.user_business_type === "Services" && 480}
                    defaultRatio={users.user_business_type === "Services" ? 7 / 2 : 8 / 2}
                    onUploaded={uploadAboutImage}
                    ref={aboutRef}
                    BtnName="Upload Image"
                    IconClassName="i-md gray"
                    BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
                  />
                  {institute_about_upload && (
                    <a
                      className="btnText priamry text-2xs attachmentwithtext mt-3"
                      href={institute_about_upload}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ed-icon icon-attachment gray i-xs"></i>
                      {institute_about_upload.replace(s3Url, "")}
                    </a>
                  )}
                </div>
              </div>
              <div className="MIW-AboutUploadImageRight">
                <div className="MIW-AboutImagePreview">
                  <h6 className="text-xxs dgray w-400">Image preview</h6>
                  <img
                    className="MIW-AboutImgPreview"
                    src={
                      institute_about_upload
                        ? institute_about_upload
                        : BackgroundDefault
                    }
                    alt="About preview"
                  />
                </div>
                {institute_about_upload && (
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

        {users.user_business_type === "Services" && <React.Fragment>
          <Card className="MIW-InstituteMision cardPadding mt-40">
            <CardBody>
              <p className="labelcst text-sm w-500 mb-5">Mission</p>
              <div className="formFieldwrap">
                <FormInput
                  label="Main Heading"
                  onChange={handleinput}
                  defaultValue={institute_mission_head}
                  name="institute_mission_head"
                  placeholder="Our Mission"
                  maxLength="80"
                />
              </div>
              <div className="formFieldwrap">
                <FormInput
                  label="Subheading"
                  onChange={handleinput}
                  defaultValue={institute_mission_subhead}
                  name="institute_mission_subhead"
                  placeholder="Strive for progress, not perfection"
                  maxLength="140"
                />
              </div>
              <div className="formFieldwrap">
                {/* <FormTextArea
                  onKeyUp={handleinput}
                  id="102"
                  rows="6"
                  type="text"
                  name="institute_mission"
                  defaultValue={institute_mission}
                  onChange={handleinput}
                  maxLength="2000"
                  TextareaBtmTxt="2000"
                  label="About your Mission"
                  placeholder="Explain the meaning and purpose behind your institute."
                /> */}
                <TextEditor
                  feature={"Explain the meaning and purpose behind your institute."}
                  preFilledData={institute_mission}
                  currentResponse={(value) => handleMissionChangeContent(value)}
                />
              </div>
            </CardBody>
          </Card>
          <Card className="MIW-InstituteVision cardPadding mt-40">
            <CardBody>
              <p className="labelcst text-sm w-500 mb-5">Vision</p>

              <div className="formFieldwrap">
                <FormInput
                  label="Main Heading"
                  onChange={handleinput}
                  defaultValue={institute_vision_head}
                  name="institute_vision_head"
                  placeholder="Our Vision"
                  maxLength="80"
                />
              </div>
              <div className="formFieldwrap">
                <FormInput
                  label="Subheading"
                  onChange={handleinput}
                  defaultValue={institute_vision_subhead}
                  name="institute_vision_subhead"
                  placeholder="Excellence is not a skill. It is an attitude."
                  maxLength="140"
                />
              </div>
              <div className="formFieldwrap">
                {/* <FormTextArea
                  onKeyUp={handleinput}
                  id="103"
                  label="About your Vision"
                  placeholder="Tell visitors what your institute stands for."
                  rows="6"
                  type="text"
                  name="institute_vision"
                  defaultValue={institute_vision}
                  onChange={handleinput}
                  maxLength="2000"
                  TextareaBtmTxt="2000"
                ></FormTextArea> */}
                <TextEditor
                  feature={"Tell visitors what your institute stands for."}
                  preFilledData={institute_vision}
                  currentResponse={(value) => handleVisionChangeContent(value)}
                />
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
                      onChange={handleinput}
                      name="institute_intro_title"
                      defaultValue={institute_intro_title}
                      label="Video Title"
                      placeholder="Video Title"
                      maxLength="80"
                    />
                  </div>
                  <div className="MIW-IntroVideoRadio mb-5">
                    <div className="input-custom-type inline">
                      <label
                        className={ToggleUpload === "video" ? "active" : ""}
                      >
                        <input
                          type="radio"
                          name="a"
                          value="video"
                          checked={ToggleUpload === "video"}
                          onChange={(e) => UploadHandler("video")}
                        />
                        Upload Video
                      </label>
                      <label className={ToggleUpload === "url" ? "active" : ""}>
                        {" "}
                        <input
                          type="radio"
                          name="a"
                          value="url"
                          checked={ToggleUpload === "url"}
                          onChange={(e) => UploadHandler("url")}
                        />
                        Add YouTube Video URL
                      </label>
                    </div>
                  </div>
                  {ToggleUpload === "url" && (
                    <React.Fragment>
                      <p className="labelcst text-xs w-500 mb-5">Upload URL</p>
                      <div className="formFieldwrap">
                        <FormInput
                          onChange={handleinput}
                          name="institute_intro_video"
                          value={institute_intro_video}
                          label="Video Url"
                          placeholder="Video Url"
                        />
                      </div>
                    </React.Fragment>
                  )}
                  {ToggleUpload === "video" && (
                    <React.Fragment>
                      <p className="labelcst text-xs w-500">Upload Video</p>
                      <ul className="DashedInstructionList">
                        <li className="text-xxs">Accept only .MP4 </li>
                        <li className="text-xxs">
                          Recommended aspect ratio is 4:3.
                        </li>
                      </ul>
                      <div className="formFieldwrap">
                        <Upload
                          onUploaded={uploadIntroVideo}
                          size={10}
                          label="Upload Video"
                          onlyVideo={true}
                          hidenFileName={true}
                          invalidError={() => removeIntroVideo()}
                          IconFileUploadClass="icon-file-upload base i-xs"
                        />
                        {institute_intro_video &&
                          institute_intro_video !== "" &&
                          institute_intro_video.includes(".mp4") && (
                            <a
                              className="btnText priamry text-2xs attachmentwithtext mt-3"
                              href={institute_intro_video}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {institute_intro_video.replace(s3Url, "")}
                            </a>
                          )}
                      </div>
                    </React.Fragment>
                  )}
                  <div className="formFieldwrap">
                    {/* <FormTextArea
                      onChange={handleinput}
                      defaultValue={institute_intro_description}
                      id="104"
                      placeholder="Videos are 85% more engaging than photos."
                      label="Video Description"
                      rows="6"
                      type="text"
                      name="institute_intro_description"
                      maxLength="1000"
                      TextareaBtmTxt="1000"
                    ></FormTextArea> */}
                    <label>Video Description</label>
                    <TextEditor
                      feature={"Videos are 85% more engaging than photos."}
                      preFilledData={institute_intro_description}
                      currentResponse={(value) => handleIntroVideoContent(value)}
                    />
                  </div>
                </div>
                {institute_intro_video && ToggleUpload === "url" ? "" :
                  <div className="MIW-IntroVideoRight">
                    <div className="MIW-IntroVideoPreview">
                      <h6 className="dgray text-xxs w-400 mb-5">Video preview</h6>
                      {institute_intro_video &&
                        institute_intro_video.includes(".mp4") ? (
                        <video
                          height="180"
                          src={institute_intro_video && institute_intro_video}
                          controls
                          className="gallery-thumnail"
                          alt=""
                        ></video>
                      ) : institute_intro_video &&
                        institute_intro_video.includes("embed") ? (
                        <iframe
                          title="youtube video"
                          src={institute_intro_video && institute_intro_video}
                          frameborder="0"
                          width="350"
                          height="250"
                        ></iframe>
                      ) : (
                        <video
                          height="180"
                          src=""
                          controls
                          className="gallery-thumnail"
                          alt=""
                        ></video>
                      )}
                    </div>
                    {institute_intro_video && (
                      <button
                        className="button btn-sm btn-o-red red mt-8"
                        onClick={removeIntroVideo}
                      >
                        {" "}
                        Remove
                      </button>
                    )}
                  </div>
                }
              </div>
            </CardBody>
          </Card>
          <Card className="MIW-InstituteAuthority cardPadding mt-40">
            <CardBody>
              <p className="labelcst text-sm w-500 mb-5">
                Message from Institute Authority
              </p>
              {business_owner_details.map((item, key) => {
                return (
                  <div className="MIW-InstituteAuthoritymain mb-20" key={key}>
                    <div className="MIW-InstituteAuthorityLeft">
                      <div className="formFieldwrap">
                        <FormInput
                          onKeyUp={(e) => handleAuthorityName(e, key)}
                          type="text"
                          label="Person Name"
                          placeholder="Person Name"
                          name="business_owner_name"
                          value={item.business_owner_name}
                          onChange={(e) => handleAuthorityName(e, key)}
                          maxLength="80"
                        />
                      </div>
                      <div className="formFieldwrap">
                        <FormInput
                          onKeyUp={(e) => handleAuthorityDesignation(e, key)}
                          className=""
                          type="text"
                          label="Designation"
                          placeholder="Designation e.g. director, principal, founder"
                          name="business_owner_designation"
                          maxLength="80"
                          value={item.business_owner_designation}
                          onChange={(e) => handleAuthorityDesignation(e, key)}
                        />
                      </div>
                      <div className="formFieldwrap">
                        <div className="file-upload-input">
                          <p className="labelcst text-xs w-500 ">Profile photo</p>
                          <div className="tooltip-cst">
                            <span className="question-circle-icon">
                              <i className="ed-icon icon-tooltip i-xxs base"></i>
                            </span>
                            <div className="tooltip-content-cst text-xxs">
                              <p>
                                The picture will be displayed above the message on
                                the website with the concerned person's name and
                                designation.
                              </p>
                            </div>
                          </div>
                          <ul className="DashedInstructionList">
                            <li className="text-xxs">Accept only .JPG or .PNG</li>
                          </ul>
                        </div>
                        <Cropper
                          minWidth={200}
                          maxWidth={500}
                          ref={principleRef}
                          defaultRatio={1 / 1}
                          onUploaded={(e) => uploadProfileImage(e, key)}
                          BtnName="Upload Image"
                          IconClassName="i-md gray"
                          BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
                        />
                        {item.business_owner_profile_photo && (
                          <a
                            className="btnText priamry text-2xs attachmentwithtext mt-3"
                            href={item.business_owner_profile_photo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="ed-icon icon-attachment gray i-xs"></i>
                            {item.business_owner_profile_photo.replace(s3Url, "")}
                          </a>
                        )}
                      </div>
                      <div className="formFieldwrap">
                        {/* <FormTextArea
                          onKeyUp={(e) => handleAuthorityMessage(e, key)}
                          id="105"
                          rows="6"
                          style={{ whiteSpace: " pre-wrap" }}
                          label="Institute Authority Message"
                          placeholder="Enter message. Tip: Keep content motivational and in line with your vision"
                          value={item.business_owner_message}
                          name="business_owner_message"
                          onChange={(e) => handleAuthorityMessage(e, key)}
                          maxLength="1000"
                          TextareaBtmTxt="1000"
                        /> */}
                        <label>Institute Authority Message</label>
                        <div className="mt-5">
                          <TextEditor
                            feature={"Enter message. Tip: Keep content motivational and in line with your vision"}
                            preFilledData={item.business_owner_message}
                            currentResponse={(value) => handleOwnerMessageContent(value, key)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="MIW-InstituteAuthorityRight">
                      <div className="MIW-ProfileImagePreview">
                        <p className="dgray text-xxs w-400">Profile photo preview</p>
                        <img
                          className="MIW-ProfileImgPreview"
                          src={
                            item.business_owner_profile_photo
                              ? item.business_owner_profile_photo
                              : DummyProfile
                          }
                          alt="logo preview"
                        />
                      </div>
                      {item.business_owner_profile_photo && (
                        <button
                          className="button btn-sm btn-o-red red mt-8"
                          onClick={() => removeProfileImage(key)}
                        >
                          {" "}
                          Remove
                        </button>
                      )}
                    </div>
                    {business_owner_details.length > 1 && (
                      <button
                        className="button btn-sm btn-o-primary"
                        onClick={() => handleRemovebusiness_owner_Click(key)}
                      >
                        <i className="ed-icon icon-delete primary i-xs"></i>
                        Delete
                      </button>
                    )}
                  </div>
                )
              })
              }
              {business_owner_details.length < 5 && (
                <button
                  className="button btn-sm button-primary mt-20"
                  onClick={(e) => handleAddbusiness_owner_Click(e)}
                >
                  <i className="ed-icon icon-plus-add white i-xs"></i>
                  Add new Authority
                </button>
              )}
            </CardBody>
          </Card>
        </React.Fragment>}

        {
          users.user_business_type === "Services" &&
          <Card className="MIW-AboutInstitute cardPadding mt-40">
            <CardBody>
              <p className="labelcst text-sm w-500 mb-5">Centre of Excellence</p>
              <div className="formFieldwrap">
                <FormInput
                  label="Main Heading"
                  onChange={handleinput}
                  value={institute_coe_head}
                  name="institute_coe_head"
                  placeholder="Centre of Excellence"
                  maxLength="80"
                />
              </div>
              <div className="formFieldwrap">
                <FormInput
                  label="Subheading"
                  onChange={handleinput}
                  value={institute_coe_subhead}
                  name="institute_coe_subhead"
                  placeholder="Changing lives, one student at a time"
                  maxLength="140"
                />
              </div>
              <div className="formFieldwrap">
                {/* <FormTextArea
                  onKeyUp={handleinput}
                  id="101"
                  rows="7"
                  type="text"
                  placeholder="Tell something amazing highlights your business"
                  label="About your COE"
                  name="institute_coe"
                  value={institute_coe}
                  style={{ whiteSpace: " pre-wrap" }}
                  maxLength="2000"
                  onChange={handleinput}
                  TextareaBtmTxt="2000"
                ></FormTextArea> */}
                <label>About your COE</label>
                <TextEditor
                  feature={"Tell something amazing highlights your business"}
                  preFilledData={institute_coe}
                  currentResponse={(value) => handleCOEContent(value)}
                />
              </div>
              <div className="MIW-AboutUploadImage">
                <div className="MIW-AboutUploadImageLeft">
                  <p>Upload Image</p>
                  <ul className="DashedInstructionList">
                    <li className="text-xxs">Accept only .jpg, .bmp or .png.</li>
                  </ul>
                  <div className="formFieldwrap mt-15">
                    <Cropper
                      minWidth={300}
                      maxWidth={600}
                      defaultRatio={5 / 3}
                      onUploaded={uploadCoeImage}
                      ref={coeRef}
                      BtnName="Upload Image"
                      IconClassName="i-md gray"
                      BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
                    />
                    {institute_coe_upload && (
                      <a
                        className="btnText priamry text-2xs attachmentwithtext mt-3"
                        href={institute_coe_upload}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="ed-icon icon-attachment gray i-xs"></i>
                        {institute_coe_upload.replace(s3Url, "")}
                      </a>
                    )}
                  </div>
                </div>
                <div className="MIW-AboutUploadImageRight">
                  <div className="MIW-AboutImagePreview">
                    <h6 className="text-xxs dgray w-400">Image preview</h6>
                    <img
                      className="MIW-AboutImgPreview"
                      src={
                        institute_coe_upload
                          ? institute_coe_upload
                          : BackgroundDefault
                      }
                      alt="About preview"
                    />
                  </div>
                  {institute_about_upload && (
                    <button
                      className="button btn-sm btn-o-red red mt-8"
                      onClick={removeCoeImage}
                    >
                      {" "}
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>

        }

        <Card className="MIW-FeaturedBanner cardPadding mt-40">
          <CardBody>
            <p className="labelcst text-sm w-500">Home Banner Slider</p>
            <ul className="DashedInstructionList mb-15">
              <li className="text-xxs">Accept only .JPG or .PNG</li>
            </ul>
            {banners.length ? (
              banners.map((banner, key) => {
                return (
                  <>
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
                                  prospects see when they visit your business.
                                </p>
                              </div>
                            </div>
                          </div>
                          <RenderTabs
                            TabWrapperClass={`mb-20`}
                            activeTitle={(val) => handleActiveView(val, key)}
                            valueState={true}
                            // TabButtonClass={`button btn-2xs ${styles.ThemeSettingButton}`}
                            ActiveTabClass="button-primary"
                            tabs={[
                              {
                                title: "Desktop", render: () =>
                                  <React.Fragment>
                                    <div className="formFieldwrap">
                                      <Cropper
                                        minWidth={users.user_business_type === "Services" ? 1366 : 1440}
                                        maxWidth={users.user_business_type === "Services" ? 1920 : 2000}
                                        minHeight={users.user_business_type === "Services" && 220}
                                        maxHeight={users.user_business_type === "Services" && 440}
                                        defaultRatio={users.user_business_type === "Services" ? 7 / 2 : 8 / 2}
                                        onUploaded={(e) => uploadBanner(e, key)}
                                        BtnName="Upload Image"
                                        array={true}
                                        IconClassName="i-md gray"
                                        BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
                                      />
                                      {banner.business_featured_banner && (
                                        <a
                                          className="btnText priamry text-2xs attachmentwithtext mt-3"
                                          href={banner.business_featured_banner}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <i className="ed-icon icon-attachment gray i-xs"></i>
                                          {banner.business_featured_banner.replace(
                                            s3Url,
                                            ""
                                          )}
                                        </a>
                                      )}
                                      <FormError
                                        show={
                                          !banner.business_featured_banner && showError
                                        }
                                        error="File required"
                                      />
                                    </div>
                                  </React.Fragment>
                              },
                              {
                                title: "Mobile", render: () =>
                                  <React.Fragment>
                                    <div className="formFieldwrap">
                                      <Cropper
                                        minWidth={320}
                                        maxWidth={320}
                                        minHeight={320}
                                        maxHeight={320}
                                        defaultRatio={1 / 1}
                                        onUploaded={(e) => uploadMobileBanner(e, key)}
                                        BtnName="Upload Mobile Image"
                                        array={true}
                                        IconClassName="i-md gray"
                                        BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
                                      />
                                      {banner.business_featured_mobile_banner && (
                                        <a
                                          className="btnText priamry text-2xs attachmentwithtext mt-3"
                                          href={banner.business_featured_mobile_banner}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <i className="ed-icon icon-attachment gray i-xs"></i>
                                          {banner.business_featured_mobile_banner.replace(
                                            s3Url,
                                            ""
                                          )}
                                        </a>
                                      )}
                                      <FormError
                                        show={
                                          !banner.business_featured_mobile_banner && showError
                                        }
                                        error="File required"
                                      />
                                    </div>
                                  </React.Fragment>
                              },
                            ]}
                          />

                          <div className="formFieldwrap">
                            <FormInput
                              name="business_featured_headline"
                              value={banner.business_featured_headline}
                              defaultValue={
                                banners[key].business_featured_headline
                              }
                              type="text"
                              label="Banner headline"
                              placeholder="Enter business motto here"
                              style={{ whiteSpace: " pre-wrap" }}
                              maxLength="80"
                              TextareaBtmTxt="80"
                              onKeyUp={(e) => handleBannerHeadline(e, key)}
                              onChange={(e) => handleBannerHeadline(e, key)}
                            />
                          </div>
                          <div className="formFieldwrap">
                            <FormInput
                              name="business_featured_headline"
                              value={banner.business_featured_banner_Url}
                              defaultValue={
                                banners[key].business_featured_banner_Url
                              }
                              type="text"
                              label="Banner Url"
                              placeholder="Enter redirection url here"
                              style={{ whiteSpace: " pre-wrap" }}
                              onKeyUp={(e) => handleBannerUrl(e, key)}
                              onChange={(e) => handleBannerUrl(e, key)}
                            />
                          </div>
                          <div className="formFieldwrap">
                            <FormTextArea
                              value={banner.business_short_description}
                              defaultValue={
                                banners[key].business_short_description
                              }
                              label="Banner Description"
                              rows="5"
                              id={key}
                              placeholder="Tip: Describe your business's features and advantages"
                              maxLength="140"
                              style={{ whiteSpace: "pre-wrap" }}
                              name="business_short_description"
                              TextareaBtmTxt="140"
                              onKeyUp={(e) => handleBannerDescription(e, key)}
                              onChange={(e) =>
                                handleBannerDescription(e, key)
                              }
                            />
                          </div>
                        </div>
                        <div className="MIW-FeaturedBannerRight">

                          {
                            banner.business_featured_banner_Active === "Desktop" ?
                              <React.Fragment>
                                <div className="MIW-BannerImagePreview">
                                  <h6 className="dgray text-xxs w-400">
                                    Banner preview
                                  </h6>
                                  <img
                                    className="MIW-BannerImgPreview"
                                    src={
                                      banner.business_featured_banner
                                        ? banner.business_featured_banner
                                        : BackgroundDefault
                                    }
                                    alt="logo preview"
                                    label="Upload your image"
                                  />
                                </div>
                                {banner.business_featured_banner && (
                                  <button
                                    className="button btn-sm btn-o-red red mb-20"
                                    onClick={() => removeFeaturedBanner(key)}
                                  >
                                    {" "}
                                    Remove
                                  </button>
                                )}
                              </React.Fragment> :
                              banner.business_featured_banner_Active === "Mobile"?
                              <React.Fragment>
                                <div className="MIW-BannerImagePreview">
                                  <h6 className="dgray text-xxs w-400">
                                    Mobile Banner preview
                                  </h6>
                                  <img
                                    className="MIW-BannerImgPreview"
                                    src={
                                      banner.business_featured_mobile_banner
                                        ? banner.business_featured_mobile_banner
                                        : BackgroundDefault
                                    }
                                    alt="logo preview"
                                    label="Upload your image"
                                  />
                                </div>
                                {banner.business_featured_mobile_banner && (
                                  <button
                                    className="button btn-sm btn-o-red red mb-20"
                                    onClick={() => removeFeaturedMobileBanner(key)}
                                  >
                                    {" "}
                                    Remove
                                  </button>
                                )}
                              </React.Fragment>:
                              <React.Fragment>
                                <div className="MIW-BannerImagePreview">
                                  <h6 className="dgray text-xxs w-400">
                                    Banner preview
                                  </h6>
                                  <img
                                    className="MIW-BannerImgPreview"
                                    src={
                                      banner.business_featured_banner
                                        ? banner.business_featured_banner
                                        : BackgroundDefault
                                    }
                                    alt="logo preview"
                                    label="Upload your image"
                                  />
                                </div>
                                {banner.business_featured_banner && (
                                  <button
                                    className="button btn-sm btn-o-red red mb-20"
                                    onClick={() => removeFeaturedBanner(key)}
                                  >
                                    {" "}
                                    Remove
                                  </button>
                                )}
                              </React.Fragment>
                          }


                        </div>
                      </div>
                      {banners.length > 1 && (
                        <button
                          className="button btn-sm btn-o-primary"
                          onClick={() => handleRemoveBannnerClick(key)}
                        >
                          <i className="ed-icon icon-delete primary i-xs"></i>
                          Delete
                        </button>
                      )}
                    </div>
                  </>
                );
              })
            ) : (
              <p>No Banners</p>
            )}
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

        {/* {
          users.user_business_type === "Services" &&
          <React.Fragment>
            <Card className="cardPadding mt-40">
              <CardBody>
                <p className="labelcst text-sm w-500 mb-5">Business Location</p>
                <div className="tooltip-cst">
                  <span className="question-circle-icon">
                    <i className="ed-icon icon-tooltip i-xxs base"></i>
                  </span>
                  <div className="tooltip-content-cst">
                    <p>
                      Open Google Map - Select your location - Click on share Button - Select (Embed a map) - Copy Html - Paste your Business location in Your Location
                    </p>
                  </div>
                </div>
                <div className="formFieldwrap">
                  <FormInput
                    label="Location"
                    onChange={handleinput}
                    defaultValue={institute_location}
                    value={institute_location}
                    name="institute_location"
                    placeholder="Your Location"
                  // maxLength="80"
                  />
                  <FormError
                    show={!institute_location && locationValid}
                    error="Please enter a valid location"

                  />

                </div>

              </CardBody>
            </Card> */}
        {/* <Card className="MIW-MapAddress cardPadding mt-40">
              <CardBody>
                <p className="labelcst text-sm w-500 mb-5">Map Address</p>
                <>
                  {institute_location ?
                    <div className=""
                      dangerouslySetInnerHTML={{
                        __html:
                          institute_location,
                      }}
                    >
                    </div>
                    :
                    <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1121329808684!2d77.37013491549513!3d28.626401191108382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce563f95b5bd1%3A0x4d091c1f9b830f7b!2sEdneed%20-Best%20Education%20Management%20System%20in%202022%7C%20Get%20a%20free%20demo%20now!5e0!3m2!1sen!2sin!4v1653122622503!5m2!1sen!2sin" ></iframe>}
                </>
              </CardBody>
            </Card> */}
        {/* </React.Fragment>
        } */}
        <div className="SiteBuilderAction mt-50">
          {!InstitutePatchSuccess ? (
            <button className="button btn-md button-theme btn-md" onClick={handlesubmit}>
              Update Business
            </button>
          ) : (
            <button className="button btn-md button-theme btn-md">Updating...</button>
          )}
        </div>
      </div >
    </React.Fragment >
  );
}
