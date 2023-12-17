/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import InstituteTheme from "../../../../Common/Theme/InstituteTheme";
import FormInput from "../../../../Common/Form/FormInput";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import { useDispatch, useSelector } from "react-redux";
import demoLogo from "../../../../assets/images/logo/demo-logo.jpg";
import Upload from "../../../../Common/Upload/index";
import { useNavigate } from "react-router-dom";
import Card from "../../../../Common/Card";
import CardBody from "../../../../Common/Card/CardBody";
import Breadcrumb from "../../../../Common/Breadcrumb";
import FormError from "../../../../Common/Form/FormError";
import { IconAttachment } from "../../../../Common/Icon";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import BackgroundDefault from "../../../../assets/images/img/BackgroundDefault.png";
import DummyProfile from "../../../../assets/images/img/DummyProfile.png";
import Cropper from "../../../../Common/Cropper";
import {
  getInstituteData,
  patchInstituteData,
  patchInstituteDataReset,
} from "../../../../store/actions/checkdomain";
import "./InstituteInfoManage.scss";
import { MapContainer } from "../../../../WebsiteTemplateCustomization/FooterLayout/Defaultine/Footer.styled";
import TextEditor from "../../../../Common/Form/TextEditor";
import RenderTabs from "../../../../Common/Tabs/RenderTabs";
import ComponentLoader from "../../../../Common/Loader/ComponentLoader";
import UploadButton from "../../../../Common/UploadButton";
import Uploader from "../../../../Common/ImageUploader";
import ImageViewer from "../../../../Common/ImageViewer";

export default function InstituteInfoManage() {
  const history = useNavigate();
  const [isFilled, setisFilled] = useState(false);
  const [seconds, setSeconds] = React.useState(5);
  const introVideoRef = useRef(null);
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  const logoRef = useRef();
  const bannerRef = useRef();
  const aboutRef = useRef();
  const principleRef = useRef();
  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setTimeout(() => {});
    }
  });

  const dispatch = useDispatch();

  const {
    InstituteInfo,
    InstituteInfoSuccess,
    users,
    patchSuccess,
    InstitutePatchSuccess,
  } = useSelector((state) => {
    return {
      InstituteInfo: state.checkdomain.list.data,
      InstituteInfoSuccess: state.checkdomain.list.success,
      checkDomainDataInfo: state.checkdomain.domainread.data,
      InstitutePatchSuccess: state.checkdomain.patch.loading,
      patchSuccess: state.checkdomain.patch.success,
      users: state.user,
    };
  });

  // console.log("InstituteInfo",InstituteInfo);

  useEffect(() => {
    dispatch(getInstituteData(users.user_institute));
  }, [dispatch, users]);

  const [isPatched, setIsPatched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (patchSuccess) {
      history(`/dashboard`);
    }
  }, [patchSuccess]);

  useEffect(() => {
    Array.from(document.getElementsByTagName("iframe")).forEach((iframe) => {
      iframe.contentWindow.addEventListener(
        "load",
        () => {
          const doc = iframe.contentWindow.document;
          iframe.height = doc.body.scrollHeight;
        },
        true
      );
      iframe.contentWindow.addEventListener(
        "resize",
        () => {
          iframe.height = iframe.contentWindow.document.body.scrollHeight + 40;
        },
        true
      );
    });
  }, []);

  const [index, setIndex] = useState("");
  const [institute_logo, set_institute_logo] = useState("");
  const [institute_about, set_institute_about] = useState("");
  const [institute_about_head, set_institute_about_head] = useState("");
  const [institute_about_subhead, set_institute_about_subhead] = useState("");
  const [institute_mission_head, set_institute_mission_head] = useState("");
  const [institute_mission_subhead, set_institute_mission_subhead] =
    useState("");
  const [institute_vision_head, set_institute_vision_head] = useState("");
  const [institute_location, set_institute_location] = useState("");
  const [locationValid, set_locationValid] = useState(false);

  // const [error, setError] = useState(false);

  const [ToggleUpload, SetToggleUpload] = useState("video");
  const [once, setOnce] = useState(false);

  const [institute_vision_subhead, set_institute_vision_subhead] = useState("");
  const [institute_vision, set_institute_vision] = useState("");
  const [institute_about_upload, set_institute_about_upload] = useState("");
  const [institute_about_upload_type, set_institute_about_upload_type] =
    useState("image");
  const [institute_mission, set_institute_mission] = useState("");
  const [institute_owner_message, set_institute_owner_message] = useState("");
  const [institute_owner_name, set_institute_owner_name] = useState("");
  const [institute_owner_name_head, set_institute_owner_name_head] =
    useState("");
  const [institute_owner_designation, set_institute_owner_designation] =
    useState("");
  const [institute_owner_profile_photo, set_institute_owner_profile_photo] =
    useState("");
  const [institute_intro_video, set_institute_intro_video] = useState("");
  const [institute_intro_title, set_institute_intro_title] = useState("");
  const [institute_intro_description, set_institute_intro_description] =
    useState("");
  const [banners, setBanners] = useState([
    {
      institute_featured_banner: "",
      institute_featured_headline: "",
      institute_featured_banner_Active: "Desktop",
      institute_featured_banner_Url: "",
      institute_short_description: "",
      institute_featured_mobile_banner: "",
    },
  ]);

  const [institute_owner_details, setInstitute_owner_details] = useState([]);

  const oldBanner = [
    {
      institute_featured_banner: InstituteInfo.institute_featured_banner,
      institute_featured_mobile_banner:
        InstituteInfo.institute_featured_mobile_banner
          ? InstituteInfo.institute_featured_mobile_banner
          : "",
      institute_featured_headline: InstituteInfo.institute_featured_headline,
      institute_short_description: InstituteInfo.institute_short_description,
      institute_featured_banner_Active:
        InstituteInfo.institute_featured_banner_Active
          ? InstituteInfo.institute_featured_banner_Active
          : "Desktop",
      institute_featured_banner_Url: InstituteInfo.institute_featured_banner_Url
        ? InstituteInfo.institute_featured_banner_Url
        : "",
    },
  ];

  // useEffect(() => {
  //   if (!isFilled && InstituteInfo && InstituteInfo.institute_owner_details && InstituteInfo.institute_owner_details.length) {

  //   }
  // }, [InstituteInfo, isFilled])

  useEffect(() => {
    if (InstituteInfo.institute_subdomain && !isFilled) {
      setisFilled(true);
      // setInstitute_owner_details(InstituteInfo && InstituteInfo.institute_owner_details?.length && InstituteInfo.institute_owner_details)
      set_institute_logo(InstituteInfo.institute_logo);
      set_institute_about(
        !InstituteInfo.institute_about
          ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry.when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
          : InstituteInfo.institute_about
      );
      set_institute_mission(
        !InstituteInfo.institute_mission
          ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
          : InstituteInfo.institute_mission
      );
      set_institute_owner_message(
        !InstituteInfo.institute_owner_message
          ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
          : InstituteInfo.institute_owner_message
      );
      set_institute_owner_name(InstituteInfo.institute_owner_name);
      set_institute_owner_designation(
        !InstituteInfo.institute_owner_designation
          ? "Changing lives, one student at a time."
          : InstituteInfo.institute_owner_designation
      );
      set_institute_owner_profile_photo(
        InstituteInfo.institute_owner_profile_photo
      );
      set_institute_about_head(
        !InstituteInfo.institute_about_head
          ? "About Us"
          : InstituteInfo.institute_about_head
      );
      set_institute_about_subhead(
        !InstituteInfo.institute_about_subhead
          ? "Changing lives, one student at a time."
          : InstituteInfo.institute_about_subhead
      );
      set_institute_mission_head(
        !InstituteInfo.institute_mission_head
          ? "Mission"
          : InstituteInfo.institute_mission_head
      );
      set_institute_mission_subhead(
        !InstituteInfo.institute_mission_subhead
          ? "Strive for progress, not perfection."
          : InstituteInfo.institute_mission_subhead
      );
      set_institute_vision_head(
        !InstituteInfo.institute_vision_head
          ? "Vision"
          : InstituteInfo.institute_vision_head
      );
      set_institute_vision_subhead(
        !InstituteInfo.institute_vision_subhead
          ? "Excellence is not a skill. It is an attitude."
          : InstituteInfo.institute_vision_subhead
      );
      set_institute_vision(
        !InstituteInfo.institute_vision
          ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry.when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
          : InstituteInfo.institute_vision
      );
      set_institute_about_upload(InstituteInfo.institute_about_upload);
      set_institute_about_upload_type(
        InstituteInfo.institute_about_upload_type
          ? InstituteInfo.institute_about_upload_type
          : "image"
      );
      set_institute_owner_name_head(InstituteInfo.institute_owner_name_head);
      set_institute_intro_video(InstituteInfo.institute_intro_video);
      set_institute_intro_title(
        !InstituteInfo.institute_intro_title
          ? "Add Intro Video"
          : InstituteInfo.institute_intro_title
      );
      set_institute_intro_description(
        !InstituteInfo.institute_intro_description
          ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry.when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
          : InstituteInfo.institute_intro_description
      );
      set_institute_location(InstituteInfo.location_url);
      setInstitute_owner_details(
        InstituteInfo.institute_owner_details.length > 0
          ? InstituteInfo.institute_owner_details
          : [
              {
                institute_owner_name: "",
                institute_owner_designation: "",
                institute_owner_profile_photo: "",
                institute_owner_message: "",
              },
            ]
      );
      if (InstituteInfo.banners && InstituteInfo.banners.length > 0) {
        let array = InstituteInfo.banners.map((item) => ({
          ...item,
          institute_featured_banner_Active: "Desktop", // just for example
        }));
        setBanners([...array]);
      } else {
        setBanners(oldBanner);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [InstituteInfo, isFilled, InstituteInfo.institute_subdomain]);

  const handleinput = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    switch (inputName) {
      case "institute_logo":
        set_institute_logo(inputValue);
        break;
      case "institute_owner_name_head":
        set_institute_owner_name_head(inputValue);
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
      case "institute_location":
        // const locationEmbede = inputValue.includes("youtu.be")
        //   ? inputValue.replace("youtu.be", "youtube.com/locationEmbede")
        //   : inputValue.replace("watch?v=", "locationEmbede/");
        // const locationParams = locationEmbede.split("&")[0];
        set_locationValid(true);
        let location = inputValue;
        if (location.includes('iframe src="https') || location === "") {
          set_institute_location(location);
          set_locationValid(false);
          // if (locationValid === true)
          //   setError()
        }
        break;

      default:
        break;
    }
  };

  console.log(institute_about_upload, "line no 314444");
  const [showError, setShowError] = useState(false);
  // ADD NEW BANNER LIST
  const handleAddBannerClick = (e, type) => {
    // console.log(type, "type")
    e.preventDefault();
    setShowError(false);
    const newBanner = banners;
    newBanner.push({
      institute_featured_banner: "",
      institute_featured_headline: "",
      institute_short_description: "",
      institute_featured_mobile_banner: "",
      institute_featured_banner_Url: "",
      institute_featured_banner_Active: "Desktop",
    });
    setBanners([...newBanner]);
  };
  // console.log(banners, "bannerss")
  // console.log(showError, "ShowERR")
  // REMOVE BANNER LIST
  const handleRemoveBannnerClick = (index) => {
    // e.preventDefault();
    const removeBanner = banners;
    removeBanner.splice(index, 1);
    setBanners([...removeBanner]);
  };
  const ref = useRef();
  const handlesubmit = (e) => {
    e.preventDefault();
    if (locationValid === true) {
      set_locationValid(true);
    } else {
      if (banners.length > 1) {
        setShowError(true);
        if (
          banners.every(
            (item) =>
              item.institute_featured_banner ||
              item.institute_featured_mobile_banner
          )
        ) {
          dispatch(
            patchInstituteData(
              users.user_institute,
              patchInstituteFormData(),
              users.user_business_type
            )
          );
          setIsLoading(true);
        }
      } else {
        dispatch(
          patchInstituteData(
            users.user_institute,
            patchInstituteFormData(),
            users.user_business_type
          )
        );
        setIsLoading(true);
      }
    }
  };

  const patchInstituteFormData = () => {
    return {
      institute_logo: institute_logo,
      institute_about: institute_about,
      institute_mission: institute_mission,
      institute_owner_profile_photo: institute_owner_profile_photo,
      institute_owner_message: institute_owner_message,
      institute_owner_name: institute_owner_name,
      institute_owner_designation: institute_owner_designation,
      institute_owner_name_head: institute_owner_name_head,
      institute_category: InstituteInfo.institute_category,
      institute_name: InstituteInfo.institute_name,
      institute_about_upload: institute_about_upload,
      institute_about_upload_type: institute_about_upload_type,
      institute_vision: institute_vision,
      institute_about_head: institute_about_head,
      institute_about_subhead: institute_about_subhead,
      institute_mission_head: institute_mission_head,
      institute_mission_subhead: institute_mission_subhead,
      institute_vision_head: institute_vision_head,
      institute_vision_subhead: institute_vision_subhead,
      institute_intro_video: institute_intro_video,
      institute_intro_title: institute_intro_title,
      institute_intro_description: institute_intro_description,
      banners: banners,
      location_url: institute_location,
      institute_owner_details: institute_owner_details,
    };
  };

  const uploadLogoImage = (data, option) => {
    let imgData = data;
    set_institute_logo(imgData);
  };

  const removeLogoImage = (e) => {
    set_institute_logo("");
  };

  const uploadAboutImage = (data) => {
    let imgData = data;
    set_institute_about_upload(imgData);
  };

  const removeAboutImage = () => {
    set_institute_about_upload("");
  };

  // const uploadProfileImage = (data) => {
  //   let imgData = data.location;
  //   set_institute_owner_profile_photo(imgData);
  // };

  // const removeProfileImage = () => {
  //   set_institute_owner_profile_photo("");
  // };

  const uploadIntroVideo = (data) => {
    let imgData = data;
    set_institute_intro_video(imgData);
  };

  const removeIntroVideo = () => {
    set_institute_intro_video("");
  };

  const uploadBanner = (data, key) => {
    let imgData = data;
    const temp = banners;
    temp[key]["institute_featured_banner"] = imgData;
    setBanners([...temp]);
  };
  const uploadMobileBanner = (data, key) => {
    let imgData = data;
    const temp = banners;
    temp[key]["institute_featured_mobile_banner"] = imgData;
    setBanners([...temp]);
  };
  const removeFeaturedMobileBanner = (key) => {
    setShowError(false);
    const temp = banners;
    temp[key]["institute_featured_mobile_banner"] = "";
    setBanners([...temp]);
  };
  const removeFeaturedBanner = (key) => {
    setShowError(false);
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
  const handleBannerUrl = (e, key) => {
    const data = e.target.value;
    const temp = banners;
    temp[key]["institute_featured_banner_Url"] = data;
    setBanners([...temp]);
  };
  const handleBannerDescription = (value, key) => {
    const data = value;
    const temp = banners;
    temp[key]["institute_short_description"] = data;
    setBanners([...temp]);
  };

  const [ToggleAboutUpload, SetToggleAboutUpload] = useState("video");

  useEffect(() => {
    if (institute_about_upload && !once) {
      setOnce(true);
      if (institute_about_upload?.src?.includes(".mp4"))
        SetToggleAboutUpload("video");
      else SetToggleAboutUpload("url");
    }
  }, [institute_about_upload, once]);

  const AboutUploadHandler = (ToggleUpload) => {
    removeAboutVideo();
    SetToggleAboutUpload(ToggleUpload);
  };

  const handleAboutUploadURL = (e) => {
    const inputValue = e.target.value;
    const embed = inputValue.src.includes("youtu.be")
      ? inputValue.replace("youtu.be", "youtube.com/embed")
      : inputValue.replace("watch?v=", "embed/");
    const params = embed.split("&")[0];
    set_institute_about_upload(params);
  };

  const uploadAboutVideo = (data) => {
    let imgData = data;
    set_institute_about_upload(imgData);
  };

  const removeAboutVideo = () => {
    set_institute_about_upload("");
  };

  const UploadHandler = (ToggleUpload) => {
    removeIntroVideo();
    SetToggleUpload(ToggleUpload);
  };

  useEffect(() => {
    if (institute_intro_video && !once) {
      setOnce(true);
      if (institute_intro_video?.src.includes(".mp4")) SetToggleUpload("video");
      else SetToggleUpload("url");
    }
  }, [institute_intro_video, once]);

  const handleOnChangeContent = (value, type) => {
    switch (type) {
      case "about":
        set_institute_about(value);
        break;
      case "mission":
        set_institute_mission(value);
        break;
      case "vision":
        set_institute_vision(value);
        break;
      case "message":
        set_institute_owner_message(value);
        break;
      case "introVideo":
        set_institute_intro_description(value);
        break;

      default:
        break;
    }
  };

  const handleActiveView = (val, key) => {
    const temp = banners;
    temp[key]["institute_featured_banner_Active"] = val;
    setBanners([...temp]);
  };
  useEffect(() => {
    return () => {
      dispatch(patchInstituteDataReset());
    };
  }, [dispatch]);

  const handleAboutUploadType = (type) => {
    set_institute_about_upload_type(type);
    set_institute_about_upload("");
  };

  ///////////////////////////////

  const handleAuthorityName = (e, key) => {
    let inputValue = e.target.value;
    institute_owner_details[key]["institute_owner_name"] = inputValue;
    setInstitute_owner_details([...institute_owner_details]);
  };

  const handleAuthorityDesignation = (e, key) => {
    let inputValue = e.target.value;
    institute_owner_details[key]["institute_owner_designation"] = inputValue;
    setInstitute_owner_details([...institute_owner_details]);
  };

  const uploadProfileImagee = (data, key) => {
    // console.log(data, key)
    let imgData = data;
    let allinputs = institute_owner_details;
    allinputs[key]["institute_owner_profile_photo"] = imgData;
    setInstitute_owner_details([...allinputs]);
  };

  const handleOwnerMessageContent = (value, key) => {
    const data = value;
    console.log("jijijiji");
    const temp = institute_owner_details;
    temp[key]["institute_owner_message"] = data;
    setInstitute_owner_details([...temp]);
    // let inputValue = value;
    // institute_owner_details[key]["institute_owner_message"] = inputValue;
    // setInstitute_owner_details([...institute_owner_details]);
  };

  const removeProfileImagee = (key) => {
    let imgData = "";
    let allinputs = institute_owner_details;
    allinputs[key]["institute_owner_profile_photo"] = imgData;
    setInstitute_owner_details([...allinputs]);
  };

  const handleRemovebusiness_owner_Click = (index) => {
    const removeBanner = institute_owner_details;
    // console.log(removeBanner, "line 484")
    removeBanner.splice(index, 1);
    setInstitute_owner_details([...removeBanner]);
  };

  const handleAddbusiness_owner_Click = () => {
    let tempData = institute_owner_details;
    const temp = {
      institute_owner_name: "",
      institute_owner_designation: "",
      institute_owner_profile_photo: "",
      institute_owner_message: "",
    };
    tempData.push(temp);
    setInstitute_owner_details([...tempData]);
  };
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/institute-info-manage" title="Edit Overview" />
      </Breadcrumb>
      <div className="PageTopHead PTH-MIW-Head mt-30">
        <div className="PTH-Item">
          <h1 className="text-sm w-300">Edit Website Information</h1>
          <p className="heading text-xxs base">
            Tell us more amazing things about your institute.
          </p>
        </div>
      </div>
      {InstituteInfoSuccess ? (
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
                  <li className="text-xxs">Accept only .jpg, .bmp or .png.</li>
                </ul>
              </div>
              {/* <Cropper
              logoLand={true}
              square={true}
              minWidth={70}
              maxWidth={210}
              ref={logoRef}
              defaultValue={institute_logo}
              onUploaded={uploadLogoImage}
              BtnName="Upload Image"
              IconClassName="i-md gray"
              BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
            /> */}

              <UploadButton
                BtnName="Upload Image"
                IconClassName="i-md gray"
                onClick={() => logoRef.current.open()}
                BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
                showLink={true}
                object={institute_logo}
              />
              <Uploader
                size={5}
                accept="image/png, image/jpeg, image/jpg, image/PNG, image/webp, image/WEBP"
                onclose={() => logoRef.current.close()}
                multiSelect={false}
                discartRef={logoRef}
                onUploaded={(data) => uploadLogoImage(data)}
                uploadLimit={1}
              />

              <div className="logoPreview">
                <h6 className="text-xxs dgray w-400">Logo preview</h6>
                <ImageViewer
                  className="logoPreviewImg"
                  object={institute_logo}
                  defaultImage={demoLogo}
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
              <p className="labelcst text-sm w-500 mb-5">About Institute</p>
              <div className="formFieldwrap">
                <FormInput
                  label="Main Heading"
                  onChange={handleinput}
                  defaultValue={institute_about_head}
                  name="institute_about_head"
                  placeholder="About Us"
                  maxLength="80"
                />
              </div>
              <div className="formFieldwrap">
                <FormInput
                  label="Subheading"
                  onChange={handleinput}
                  defaultValue={institute_about_subhead}
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
                placeholder="Tell something amazing about your institute"
                label="About your Institute"
                name="institute_about"
                defaultValue={institute_about}
                style={{ whiteSpace: " pre-wrap" }}
                maxLength="2000"
                onChange={handleinput}
                TextareaBtmTxt="2000"
              ></FormTextArea> */}
                <TextEditor
                  preFilledData={institute_about}
                  currentResponse={(value) =>
                    handleOnChangeContent(value, "about")
                  }
                />
              </div>
              <div className="MIW-AboutUploadImage">
                <div className="input-custom-type inline">
                  <label className="aboutInstitu-label">
                    <input
                      type="radio"
                      value={institute_about_upload_type}
                      onChange={() => handleAboutUploadType("image")}
                      checked={institute_about_upload_type === "image"}
                    />
                    Image
                  </label>
                  <label className="aboutInstitu-label">
                    <input
                      type="radio"
                      value={institute_about_upload_type}
                      onChange={() => handleAboutUploadType("video")}
                      checked={institute_about_upload_type === "video"}
                    />
                    Video
                  </label>
                </div>
                {institute_about_upload_type === "image" ? (
                  <React.Fragment>
                    <div className="MIW-AboutUploadImageLeft">
                      <p>Upload Image</p>
                      <ul className="DashedInstructionList">
                        <li className="text-xxs">
                          Accept only .jpg, .bmp or .png.
                        </li>
                      </ul>
                      <div className="formFieldwrap mt-15">
                        {/* <Cropper
                        minWidth={300}
                        maxWidth={600}
                        ref={aboutRef}
                        defaultRatio={5 / 3}
                        onUploaded={uploadAboutImage}
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
                      )} */}
                        <UploadButton
                          onClick={() => aboutRef.current.open()}
                          showLink={true}
                          object={institute_about_upload}
                          BtnName="Upload Image"
                          IconClassName="i-md gray"
                          BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
                        />
                        <Uploader
                          size={5}
                          accept="image/png, image/jpeg, image/jpg, image/PNG, image/webp, image/WEBP"
                          onclose={() => aboutRef.current.close()}
                          multiSelect={false}
                          discartRef={aboutRef}
                          onUploaded={(data) => uploadAboutImage(data)}
                          uploadLimit={1}
                        />
                      </div>
                    </div>
                    <div className="MIW-AboutUploadImageRight">
                      <div className="MIW-AboutImagePreview">
                        <h6 className="text-xxs dgray w-400">Image preview</h6>
                        <ImageViewer
                          className="MIW-AboutImgPreview"
                          object={institute_about_upload}
                          defaultImage={BackgroundDefault}
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
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="MIW-IntroVideoRadio mb-5 mt-10">
                      <div className="addVideoCheckboxSection">
                        <label
                          className={`addVideoCheckboxLabel${
                            ToggleAboutUpload === "video" ? "active" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="a"
                            value="video"
                            checked={ToggleAboutUpload === "video"}
                            onChange={(e) => AboutUploadHandler("video")}
                          />
                          Upload Video
                        </label>
                        <label
                          className={`addVideoCheckboxLabel ${
                            ToggleAboutUpload === "url" ? "active" : ""
                          }`}
                        >
                          {" "}
                          <input
                            type="radio"
                            name="a"
                            value="url"
                            checked={ToggleAboutUpload === "url"}
                            onChange={(e) => AboutUploadHandler("url")}
                          />
                          Add YouTube Video URL
                        </label>
                      </div>
                    </div>
                    {ToggleAboutUpload === "url" && (
                      <React.Fragment>
                        <p className="labelcst text-xs w-500 mb-5">
                          Upload URL
                        </p>
                        <div className="formFieldwrap">
                          <FormInput
                            onChange={handleAboutUploadURL}
                            name="institute_intro_video"
                            value={institute_about_upload}
                            label="Video Url"
                            placeholder="Video Url"
                          />
                        </div>
                      </React.Fragment>
                    )}
                    {ToggleAboutUpload === "video" && (
                      <React.Fragment>
                        <p className="labelcst text-xs w-500">Upload Video</p>
                        <ul className="DashedInstructionList">
                          <li className="text-xxs">Accept only .MP4 </li>
                          <li className="text-xxs">
                            Recommended aspect ratio is 4:3.
                          </li>
                        </ul>
                        <div className="formFieldwrap">
                          {/* <Upload
                          onUploaded={uploadAboutVideo}
                          size={10}
                          label="Upload Video"
                          onlyVideo={true}
                          hidenFileName={true}
                          invalidError={() => removeAboutVideo()}
                          IconFileUploadClass="icon-file-upload base i-xs"
                        /> */}
                          <UploadButton
                            onClick={() => aboutRef.current.open()}
                            BtnName="Upload Video"
                            IconClassName="icon-file-upload base i-xs"
                            BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
                          />
                          <Uploader
                            size={5}
                            // accept="image/png, image/jpeg, image/jpg, image/PNG, image/webp, image/WEBP"
                            onclose={() => aboutRef.current.close()}
                            multiSelect={false}
                            discartRef={aboutRef}
                            onUploaded={(data) => uploadAboutImage(data)}
                            validationProp={"onlyVideo"}
                            uploadLimit={1}
                          />
                          {institute_about_upload?.src &&
                            institute_about_upload?.src !== "" &&
                            institute_about_upload?.src.includes(".mp4") && (
                              <a
                                className="btnText priamry text-2xs attachmentwithtext mt-3"
                                href={institute_about_upload.src}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {institute_about_upload?.src.replace(s3Url, "")}
                              </a>
                            )}
                        </div>
                      </React.Fragment>
                    )}
                    <div className="MIW-IntroVideoRight">
                      <div className="MIW-IntroVideoPreview">
                        <h6 className="dgray text-xxs w-400 mb-5">
                          Video preview
                        </h6>
                        {institute_about_upload?.src &&
                        institute_about_upload?.src.includes(".mp4") ? (
                          <video
                            height="180"
                            src={
                              institute_about_upload.src &&
                              institute_about_upload.src
                            }
                            controls
                            className="gallery-thumnail"
                            alt=""
                            autoPlay={true}
                            muted
                          ></video>
                        ) : institute_about_upload?.src &&
                          institute_about_upload?.src.includes("embed") ? (
                          <iframe
                            title="youtube video"
                            src={
                              institute_about_upload.src &&
                              institute_about_upload.src
                            }
                            frameborder="0"
                            width="350"
                            height="250"
                            autoPlay={true}
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
                      {institute_about_upload?.src && (
                        <button
                          className="button btn-sm btn-o-red red mt-8"
                          onClick={removeAboutVideo}
                        >
                          {" "}
                          Remove
                        </button>
                      )}
                    </div>
                  </React.Fragment>
                )}
              </div>
            </CardBody>
          </Card>
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
                  preFilledData={institute_mission}
                  currentResponse={(value) =>
                    handleOnChangeContent(value, "mission")
                  }
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
                  preFilledData={institute_vision}
                  currentResponse={(value) =>
                    handleOnChangeContent(value, "vision")
                  }
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
                        {/* <Upload
                        onUploaded={uploadIntroVideo}
                        size={10}
                        label="Upload Video"
                        onlyVideo={true}
                        hidenFileName={true}
                        invalidError={() => removeIntroVideo()}
                        IconFileUploadClass="icon-file-upload base i-xs"
                      /> */}
                        <UploadButton
                          onClick={() => introVideoRef.current.open()}
                          BtnName="Upload Video"
                          IconClassName="icon-file-upload base i-xs"
                          BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
                        />
                        <Uploader
                          size={5}
                          // accept="image/png, image/jpeg, image/jpg, image/PNG, image/webp, image/WEBP"
                          onclose={() => introVideoRef.current.close()}
                          multiSelect={false}
                          discartRef={introVideoRef}
                          onUploaded={(data) => uploadIntroVideo(data)}
                          validationProp={"onlyVideo"}
                          uploadLimit={1}
                        />

                        {institute_intro_video?.src &&
                          institute_intro_video?.src !== "" &&
                          institute_intro_video?.src.includes(".mp4") && (
                            <a
                              className="btnText priamry text-2xs attachmentwithtext mt-3"
                              href={institute_intro_video.src}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {institute_intro_video?.src}
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
                    <TextEditor
                      preFilledData={institute_intro_description}
                      currentResponse={(value) =>
                        handleOnChangeContent(value, "introVideo")
                      }
                    />
                  </div>
                </div>
                <div className="MIW-IntroVideoRight">
                  <div className="MIW-IntroVideoPreview">
                    <h6 className="dgray text-xxs w-400 mb-5">Video preview</h6>
                    {institute_intro_video?.src &&
                    institute_intro_video?.src?.includes(".mp4") ? (
                      <video
                        height="180"
                        src={
                          institute_intro_video && institute_intro_video?.src
                        }
                        controls
                        className="gallery-thumnail"
                        alt=""
                        autoPlay={true}
                      ></video>
                    ) : institute_intro_video &&
                      institute_intro_video?.src.includes("embed") ? (
                      <iframe
                        title="youtube video"
                        src={
                          institute_intro_video?.src &&
                          institute_intro_video?.src
                        }
                        frameborder="0"
                        width="350"
                        height="250"
                        autoPlay={true}
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
                  {institute_intro_video?.src && (
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
              {/* <div className="MIW-InstituteAuthoritymain">
              <div className="MIW-InstituteAuthorityLeft">
                <div className="formFieldwrap">
                  <FormInput
                    onKeyUp={handleinput}
                    type="text"
                    label="Person Name"
                    placeholder="Person Name"
                    name="institute_owner_name_head"
                    defaultValue={institute_owner_name_head}
                    onChange={handleinput}
                    maxLength="80"
                  />
                </div>
                <div className="formFieldwrap">
                  <FormInput
                    onKeyUp={handleinput}
                    type="text"
                    label="Person Name"
                    placeholder="Person Name"
                    name="institute_owner_name"
                    defaultValue={institute_owner_name}
                    onChange={handleinput}
                    maxLength="80"
                  />
                </div>
                <div className="formFieldwrap">
                  <FormInput
                    onKeyUp={handleinput}
                    className=""
                    type="text"
                    label="Designation"
                    placeholder="Designation e.g. director, principal, founder"
                    name="institute_owner_designation"
                    maxLength="80"
                    defaultValue={institute_owner_designation}
                    onChange={handleinput}
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
                    defaultRatio={1 / 1}
                    ref={principleRef}
                    onUploaded={uploadProfileImage}
                    BtnName="Upload Image"
                    IconClassName="i-md gray"
                    BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
                  />
                  {institute_owner_profile_photo && (
                    <a
                      className="btnText priamry text-2xs attachmentwithtext mt-3"
                      href={institute_owner_profile_photo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ed-icon icon-attachment gray i-xs"></i>
                      {institute_owner_profile_photo.replace(s3Url, "")}
                    </a>
                  )}
                </div>
                <div className="formFieldwrap">
                  <TextEditor
                    preFilledData={institute_owner_message}
                    currentResponse={(value) => handleOnChangeContent(value, "message")}
                  />
                </div>
              </div>
              <div className="MIW-InstituteAuthorityRight">
                <div className="MIW-ProfileImagePreview">
                  <p className="dgray text-xxs w-400">Profile photo preview</p>
                  <img
                    className="MIW-ProfileImgPreview"
                    src={
                      institute_owner_profile_photo
                        ? institute_owner_profile_photo
                        : DummyProfile
                    }
                    alt="logo preview"
                  />
                </div>
                {institute_owner_profile_photo && (
                  <button
                    className="button btn-sm btn-o-red red mt-8"
                    onClick={removeProfileImage}
                  >
                    {" "}
                    Remove
                  </button>
                )}
              </div>
            </div> */}

              {/* added here */}
              <div className="MIW-InstituteAuthoritymain mb-20">
                <div className="MIW-InstituteAuthorityLeft">
                  <div className="formFieldwrap">
                    <FormInput
                      onKeyUp={handleinput}
                      type="text"
                      label="Principal Heading"
                      placeholder="Person Name"
                      name="institute_owner_name_head"
                      defaultValue={institute_owner_name_head}
                      onChange={handleinput}
                      maxLength="80"
                    />
                  </div>
                </div>
              </div>
              {institute_owner_details?.length &&
                institute_owner_details.map((item, ind) => {
                  return (
                    <React.Fragment key={ind}>
                      <div className="MIW-InstituteAuthoritymain mb-20">
                        <div className="MIW-InstituteAuthorityLeft">
                          <div className="formFieldwrap">
                            <FormInput
                              onKeyUp={(e) => handleAuthorityName(e, ind)}
                              type="text"
                              label="Person Name"
                              placeholder="Person Name"
                              name="institute_owner_name"
                              value={item.institute_owner_name}
                              onChange={(e) => handleAuthorityName(e, ind)}
                              maxLength="80"
                            />
                          </div>
                          <div className="formFieldwrap">
                            <FormInput
                              onKeyUp={(e) =>
                                handleAuthorityDesignation(e, ind)
                              }
                              className=""
                              type="text"
                              label="Designation"
                              placeholder="Designation e.g. director, principal, founder"
                              name="institute_owner_designation"
                              maxLength="80"
                              value={item.institute_owner_designation}
                              onChange={(e) =>
                                handleAuthorityDesignation(e, ind)
                              }
                            />
                          </div>
                          <div className="formFieldwrap">
                            <div className="file-upload-input">
                              <p className="labelcst text-xs w-500 ">
                                Profile photo
                              </p>
                              <div className="tooltip-cst">
                                <span className="question-circle-icon">
                                  <i className="ed-icon icon-tooltip i-xxs base"></i>
                                </span>
                                <div className="tooltip-content-cst text-xxs">
                                  <p>
                                    The picture will be displayed above the
                                    message on the website with the concerned
                                    person's name and designation.
                                  </p>
                                </div>
                              </div>
                              <ul className="DashedInstructionList">
                                <li className="text-xxs">
                                  Accept only .JPG or .PNG
                                </li>
                              </ul>
                            </div>
                            {/* <Cropper
                          minWidth={200}
                          maxWidth={500}
                          ref={principleRef}
                          array={true}
                          defaultRatio={1 / 1}
                          onUploaded={(e) => uploadProfileImagee(e, ind)}
                          BtnName="Upload Image"
                          IconClassName="i-md gray"
                          BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
                        />
                        {item.institute_owner_profile_photo && (
                          <a
                            className="btnText priamry text-2xs attachmentwithtext mt-3"
                            href={item.institute_owner_profile_photo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="ed-icon icon-attachment gray i-xs"></i>
                            {item.institute_owner_profile_photo.replace(s3Url, "")}
                          </a>
                        )} */}
                            <UploadButton
                              onClick={() => {
                                principleRef.current.open();
                                setIndex(ind);
                              }}
                              showLink={true}
                              object={item.institute_owner_profile_photo}
                              BtnName="Upload Image"
                              IconClassName="i-md gray"
                              BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
                            />
                            <Uploader
                              size={5}
                              accept="image/png, image/jpeg, image/jpg, image/PNG, image/webp, image/WEBP"
                              onclose={() => principleRef.current.close()}
                              multiSelect={false}
                              discartRef={principleRef}
                              onUploaded={(data) =>
                                uploadProfileImagee(data, index)
                              }
                              uploadLimit={1}
                            />
                          </div>
                          <div className="formFieldwrap">
                            {/* <FormTextArea
                          onKeyUp={(e) => handleAuthorityMessage(e, key)}
                          id="105"
                          rows="6"
                          style={{ whiteSpace: " pre-wrap" }}
                          label="Institute Authority Message"
                          placeholder="Enter message. Tip: Keep content motivational and in line with your vision"
                          value={item.institute_owner_message}
                          name="institute_owner_message"
                          onChange={(e) => handleAuthorityMessage(e, key)}
                          maxLength="1000"
                          TextareaBtmTxt="1000"
                        /> */}
                            <label>Institute Authority Message</label>
                            <div className="mt-5">
                              <TextEditor
                                feature={
                                  "Enter message. Tip: Keep content motivational and in line with your vision"
                                }
                                preFilledData={item.institute_owner_message}
                                currentResponse={(value) =>
                                  handleOwnerMessageContent(value, ind)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="MIW-InstituteAuthorityRight">
                          <div className="MIW-ProfileImagePreview">
                            <p className="dgray text-xxs w-400">
                              Profile photo preview
                            </p>
                            <ImageViewer
                              className="MIW-ProfileImgPreview"
                              object={
                                item.institute_owner_profile_photo
                              }
                              defaultImage={DummyProfile}
                            />
                          </div>
                          {item.institute_owner_profile_photo?.src && (
                            <button
                              className="button btn-sm btn-o-red red mt-8"
                              onClick={() => removeProfileImagee(ind)}
                            >
                              {" "}
                              Remove
                            </button>
                          )}
                        </div>
                        {institute_owner_details?.length > 1 && (
                          <button
                            className="button btn-sm btn-o-primary"
                            onClick={() =>
                              handleRemovebusiness_owner_Click(ind)
                            }
                          >
                            <i className="ed-icon icon-delete primary i-xs"></i>
                            Delete
                          </button>
                        )}
                      </div>
                    </React.Fragment>
                  );
                })}
              {institute_owner_details?.length < 5 && (
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
                                    prospects see when they visit your website.
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
                                  title: "Desktop",
                                  render: () => (
                                    <div className="formFieldwrap">
                                      {/* <Cropper
                                      minWidth={users.user_business_type === "Services" ? 1366 : 1440}
                                      maxWidth={users.user_business_type === "Services" ? 1920 : 2000}
                                      minHeight={users.user_business_type === "Services" && 220}
                                      maxHeight={users.user_business_type === "Services" && 440}
                                      defaultRatio={users.user_business_type === "Services" ? 7 / 2 : 16 / 5}
                                      array={true}
                                      onUploaded={(e) => uploadBanner(e, key)}
                                      BtnName="Upload Image"
                                      IconClassName="i-md gray"
                                      BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
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
                                    )} */}
                                      <UploadButton
                                        onClick={() => {
                                          bannerRef.current.open();
                                          setIndex(key);
                                        }}
                                        showLink={true}
                                        object={
                                          banner.institute_featured_banner
                                        }
                                        BtnName="Upload Image"
                                        IconClassName="i-md gray"
                                        BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
                                      />
                                      <Uploader
                                        size={5}
                                        accept="image/png, image/jpeg, image/jpg, image/PNG, image/webp, image/WEBP"
                                        onclose={() =>
                                          bannerRef.current.close()
                                        }
                                        multiSelect={false}
                                        discartRef={bannerRef}
                                        onUploaded={(data) =>
                                          uploadBanner(data, index)
                                        }
                                        uploadLimit={1}
                                      />
                                      <FormError
                                        show={
                                          !banner.institute_featured_banner &&
                                          showError
                                        }
                                        error="File required"
                                      />
                                    </div>
                                  ),
                                },
                                {
                                  title: "Mobile",
                                  render: () => (
                                    <div className="formFieldwrap">
                                      {/* <Cropper
                                        minWidth={320}
                                        maxWidth={640}
                                        minHeight={380}
                                        maxHeight={760}
                                        defaultRatio={10 / 12}
                                        array={true}
                                        onUploaded={(e) =>
                                          uploadMobileBanner(e, key)
                                        }
                                        BtnName="Upload Mobile Image"
                                        IconClassName="i-md gray"
                                        BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
                                      />
                                      {banner.institute_featured_mobile_banner && (
                                        <a
                                          className="btnText priamry text-2xs attachmentwithtext mt-3"
                                          href={
                                            banner.institute_featured_mobile_banner
                                          }
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <i className="ed-icon icon-attachment gray i-xs"></i>
                                          {banner.institute_featured_mobile_banner.replace(
                                            s3Url,
                                            ""
                                          )}
                                        </a>
                                      )} */}
                                      <UploadButton
                                        onClick={() => {
                                          bannerRef.current.open();
                                          setIndex(key);
                                        }}
                                        showLink={true}
                                        object={
                                          banner.institute_featured_mobile_banner
                                        }
                                        BtnName="Upload Mobile Image"
                                        IconClassName="i-md gray"
                                        BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
                                      />
                                      <Uploader
                                        size={5}
                                        accept="image/png, image/jpeg, image/jpg, image/PNG, image/webp, image/WEBP"
                                        onclose={() =>
                                          bannerRef.current.close()
                                        }
                                        multiSelect={false}
                                        discartRef={bannerRef}
                                        onUploaded={(data) =>
                                          uploadMobileBanner(data, index)
                                        }
                                        uploadLimit={1}
                                      />
                                      <FormError
                                        show={
                                          !banner.institute_featured_mobile_banner &&
                                          showError
                                        }
                                        error="File required"
                                      />
                                    </div>
                                  ),
                                },
                              ]}
                            />

                            <div className="formFieldwrap">
                              <FormInput
                                name="institute_featured_headline"
                                value={banner.institute_featured_headline}
                                defaultValue={
                                  banners[key].institute_featured_headline
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
                              <FormInput
                                name="institute_featured_headline"
                                value={banner.institute_featured_banner_Url}
                                defaultValue={
                                  banners[key].institute_featured_banner_Url
                                }
                                type="text"
                                label="Banner Url"
                                placeholder="Enter redirect url here"
                                style={{ whiteSpace: " pre-wrap" }}
                                maxLength="80"
                                TextareaBtmTxt="80"
                                onKeyUp={(e) => handleBannerUrl(e, key)}
                                onChange={(e) => handleBannerUrl(e, key)}
                              />
                            </div>
                            <div className="formFieldwrap">
                              {/* <FormTextArea
                              value={banner.institute_short_description}
                              defaultValue={
                                banners[key].institute_short_description
                              }
                              label="Banner Description"
                              rows="5"
                              id={key}
                              placeholder="Tip: Describe your institute's features and advantages"
                              maxLength="140"
                              style={{ whiteSpace: "pre-wrap" }}
                              name="institute_short_description"
                              TextareaBtmTxt="140"
                              onKeyUp={(e) => handleBannerDescription(e, key)}
                              onChange={(e) =>
                                handleBannerDescription(e, key)
                              }
                            /> */}
                              <TextEditor
                                preFilledData={
                                  banner.institute_short_description
                                }
                                currentResponse={(value) =>
                                  handleBannerDescription(value, key)
                                }
                              />
                            </div>
                          </div>
                          <div className="MIW-FeaturedBannerRight">
                            {banner.institute_featured_banner_Active ===
                            "Desktop" ? (
                              <React.Fragment>
                                <div className="MIW-BannerImagePreview">
                                  <h6 className="dgray text-xxs w-400">
                                    Banner preview
                                  </h6>
                                  {/* {console.log(banner.institute_featured_banner_Active)}
                                  {console.log(banner.institute_featured_banner)}
                                  {console.log(banner.institute_featured_mobile_banner)} */}

                                  {/* <img
                                    className="MIW-BannerImgPreview"
                                    src={
                                      banner.institute_featured_banner
                                        ? banner.institute_featured_banner
                                        : BackgroundDefault
                                    }
                                    alt="logo preview"
                                    label="Upload your image"
                                  /> */}
                                  <ImageViewer
                                    object={banner.institute_featured_banner}
                                    className="MIW-BannerImgPreview"
                                    defaultImage={BackgroundDefault}
                                  />
                                </div>
                                {banner.institute_featured_banner && (
                                  <button
                                    className="button btn-sm btn-o-red red mb-20"
                                    onClick={() => removeFeaturedBanner(key)}
                                  >
                                    {" "}
                                    Remove
                                  </button>
                                )}
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <div className="MIW-BannerImagePreview">
                                  {/* {console.log(banner.institute_featured_mobile_banner)} */}
                                  <h6 className="dgray text-xxs w-400">
                                    Mobile Banner preview
                                  </h6>
                                  <ImageViewer
                                    object={
                                      banner.institute_featured_mobile_banner
                                    }
                                    className="MIW-BannerImgPreview"
                                    defaultImage={BackgroundDefault}
                                  />

                                  {/* <img
                                    className="MIW-BannerImgPreview"
                                    src={
                                      banner.institute_featured_mobile_banner
                                        ? banner.institute_featured_mobile_banner
                                        : BackgroundDefault
                                    }
                                    alt="logo preview"
                                    label="Upload your image"
                                  /> */}
                                </div>
                                {banner.institute_featured_mobile_banner
                                  ?.src && (
                                  <button
                                    className="button btn-sm btn-o-red red mb-20"
                                    onClick={() =>
                                      removeFeaturedMobileBanner(key)
                                    }
                                  >
                                    {" "}
                                    Remove
                                  </button>
                                )}
                              </React.Fragment>
                            )}
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
                  onClick={(e) =>
                    handleAddBannerClick(
                      e,
                      banners.institute_featured_banner_Active
                    )
                  }
                >
                  <i className="ed-icon icon-plus-add white i-xs"></i>
                  Add new Banner
                </button>
              )}
            </CardBody>
          </Card>
          {/* <Card className="cardPadding mt-40">
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
        </Card>
        <Card className="MIW-MapAddress cardPadding mt-40">
          <CardBody>
            <p className="labelcst text-sm w-500 mb-5">Map Address</p>
            <>
              {institute_location ?
                <div className="sun-editor-output"
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
          <div className="SiteBuilderAction mt-50">
            {!InstitutePatchSuccess ? (
              <button
                className="button btn-md button-theme btn-md"
                onClick={handlesubmit}
              >
                Update Website
              </button>
            ) : (
              <button className="button btn-md button-theme btn-md">
                Updating...
              </button>
            )}
          </div>
        </div>
      ) : (
        <ComponentLoader />
      )}
    </React.Fragment>
  );
}
