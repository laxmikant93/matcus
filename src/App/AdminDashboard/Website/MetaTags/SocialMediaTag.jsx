/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ValidationFile from "../../../../Classes/ValidationFile";
import Cropper from "../../../../Common/Cropper";
import FormError from "../../../../Common/Form/FormError";
import FormInput from "../../../../Common/Form/FormInput";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import { MetatagfabImg } from "../../../../Common/Images";
import { MetatagtabImg } from "../../../../Common/Images";
import { MetatagbannerImg } from "../../../../Common/Images";
import { updateInstituteInformation } from "../../../../store/actions/instituteregistration/action";
import UploadButton from "../../../../Common/UploadButton";
import Uploader from "../../../../Common/ImageUploader";
import ImageViewer from "../../../../Common/ImageViewer";

const SocialMediaTag = () => {
  const dispatch = useDispatch()
  const ref = useRef()
  const statictMetaTitle =
    "The Top Learning Management System | Get a free demo 2021";
  const statictMetaDesc =
    "Edneed is the best School Management System solution provider in India. Contact us for a free demo and create your website in just 2 minutes.";
  const history = useNavigate()
  const extractTitleFromUrl = window.location.hostname;
  const [ogTitle, setOgTitle] = useState("");
  const [ogDesc, setOgDesc] = useState("");
  const [ogtBanner, setOgtBanner] = useState("");
  const [gatCode, setGatCode] = useState("false");
  const [tagError, setTagError] = useState(false);
  const [ogTitleError, setOgTitleError] = useState(false);
  const [ogDescError, setOgDescError] = useState(false);
  const { users, institutedetail } = useSelector((state) => {
    return {
      users: state.user,
      institutedetail: state.manageinstituteinfo,
    };
  });
  useEffect(() => {
    if (institutedetail.success && !institutedetail.loading) {

      setOgTitle(
        institutedetail.data.og_title
          ? institutedetail.data.og_title
          : statictMetaTitle
      );
      setOgDesc(
        institutedetail.data.og_description
          ? institutedetail.data.og_description
          : statictMetaDesc
      );
      setOgtBanner(
        institutedetail.data.og_tag
      );

    }
  }, [institutedetail.data.og_description, institutedetail.data.og_tag, institutedetail.data.og_title, institutedetail.loading, institutedetail.success])

  const uploadBannerImage = (data) => {
    let banner = data;
    setOgtBanner(banner);
  };
  const removeBanner = () => {
    setOgtBanner("")
  }
  const handleInput = (e) => {
    let inputValue = e.target.value;
    let inputName = e.target.name;
    setTagError(false)
    switch (inputName) {
      case "metatitle":
        setOgTitle(ValidationFile.spaceNotAccept(inputValue));
        setOgTitleError(ValidationFile.isEmpty(inputValue));
        break;
      case "metadesc":
        setOgDesc(ValidationFile.spaceNotAccept(inputValue));
        setOgDescError(ValidationFile.isEmpty(inputValue));
        break;
      default:
        return false;
    }
  };
  const ogTagsData = () => {
    return {
      og_title: ogTitle,
      og_description: ogDesc,
      og_tag: ogtBanner
    }
  }
  const handleSubmit = () => {
    setTagError(true);
    if (ValidationFile.isEmpty(ogTitle)) {
      setOgTitleError(true);
    }
    if (ValidationFile.isEmpty(ogDesc)) {
      setOgDescError(true);
    }
    if (
      !ValidationFile.isEmpty(ogTitle) &&
      !ValidationFile.isEmpty(ogDesc)
    ) {
      dispatch(
        updateInstituteInformation(users.user_institute, ogTagsData(), "meta", users.user_business_type)
      );
      history("/")
    }
  };
  return (
    <div>
      <h1 className="w-100 mt-30 mb-30">Open Graph Meta Tags</h1>
      <div className="Social_wrapper">
        <div>
          <h3 className="text-xs w-100">Banner Image</h3>
          <p className="text-xxs mb-20">
            Recommended dimension: 1200 x 630 or more for optimal results.
          </p>
        
            <UploadButton
                InputOvelapLabel="Browse Image"
                InputUploadIconClass="icon-file-upload i-md gray"
                InputOvelapClass="button btn-xs btn-o-silver browserbtn-fabadd"
                 BtnName="Browse Image"
                    IconClassName="i-md gray"
                    BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                onClick={() => {
                  ref.current.open();
                }}
              />
              <Uploader
                onclose={() => ref.current.close()}
                multiSelect={false}
                discartRef={ref}
                onUploaded={(data) => uploadBannerImage(data)}
                uploadLimit={1}
              />
          {ogtBanner?.src ? (
            <React.Fragment>
              <div className="inline mb-20">
                {/*  <button
                  className="button btn-xs btn-o-primary primary mt-8"
                  onClick={handleMetaBanner}
                >
                  Update
                </button> */}
                <button
                  onClick={removeBanner}
                  className="button btn-xs btn-o-primary primary mt-8"
                >
                  Remove
                </button>
              </div>
            </React.Fragment>
          ) : (
            ""
          )}

          <div className="mt-30">
            <div className="formFieldwrap">
              <FormInput
                type="text"
                label="OG Title"
                name="metatitle"
                value={ogTitle}
                placeholder="OG Title"
                onChange={handleInput}
                onKeyUp={handleInput}
                maxLength="79"
              />
              <p className="text-xs">
                OG title should be no longer than 80 characters.
              </p>
              <FormError
                show={ogTitleError && tagError}
                error="OG Title required.."
              />
            </div>
            <div className="formFieldwrap">
              <FormTextArea
                //  type="text"
                label="OG Description"
                name="metadesc"
                value={ogDesc}
                placeholder="OG Description"
                onChange={handleInput}
                onKeyUp={handleInput}
                maxLength="159"
                rows="3"
              />
              <p className="text-xs">
                OG Description should be no longer than 160 characters.
              </p>
              <FormError
                show={ogDescError && tagError}
                error="OG Description required.."
              />
            </div>
            <button
              type="submit"
              className="button btn-md button-theme button-md button-block mt-30"
              onClick={handleSubmit}
            >
              Save Social Tags
            </button>
          </div>
        </div>
        <div>
          <p className="primary w-400">Sample Format</p>
          <div className="socialuputformat mt-10">
            {/* <div className="logoheading">
              <img
                src={favIcon ? favIcon : MetatagfabImg}
                alt="meta-sample"
                width="40"
              />
              <div className="metatagtitlesocial">
                <h3 className="w-200">
                  {ogTitle ? ogTitle : `Edneed`}
                </h3>
              </div>
            </div> */}
            <ImageViewer
              object={ogtBanner}
              defaultImage={"https://edneed-mailer-uat.s3.amazonaws.com/edneed-social-og-image.jpg"}
              className="bannermetatagoutput"
             
            />
            <div className="pleft">
              <p className="text-xs mt-8">
                {/* Gagandeeppublicschool.com */}
                {extractTitleFromUrl ? extractTitleFromUrl : `edneed.com`}
              </p>
              <h3 className="mt-8 w-600">
                {ogTitle
                  ? ogTitle
                  : `School Management System | LMS Software | Edneed`}
              </h3>
              <p className="text-xxs mt-8">
                {ogDesc
                  ? ogDesc
                  : `
                  Edneed is the Best School Management System provider in India, 2022. We Provide LMS Software for Schools. Let us show you a free demo and create your website in just 2 minutes.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialMediaTag;
