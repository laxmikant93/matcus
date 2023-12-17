import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ValidationFile from "../../../../Classes/ValidationFile";
import Cropper from "../../../../Common/Cropper";
import MetatagtabImg from "./metatags.jpg";
import MetatagfabImg from "../MetaTags/modal-payment-mode-logo.svg";
import { updateInstituteInformation } from '../../../../store/actions/instituteregistration/action';
import FormInput from '../../../../Common/Form/FormInput';
import FormError from '../../../../Common/Form/FormError';
import FormTextArea from '../../../../Common/Form/FormTextArea';
import ImageViewer from '../../../../Common/ImageViewer';
import UploadButton from '../../../../Common/UploadButton';
import Uploader from '../../../../Common/ImageUploader';
const BasicMetaTags = ({ manageToggleUsingSubmitButton }) => {
  const statictMetaTitle =
    "The Top Learning Management System | Get a free demo 2021";
  const statictMetaDesc =
    "Edneed is the best School Management System solution provider in India. Contact us for a free demo and create your website in just 2 minutes."
  const statictMetaKeywords =
    "School Management System | LMS Software | Edneed";
  const { users, institutedetail } = useSelector((state) => {
    return {
      users: state.user,
      institutedetail: state.manageinstituteinfo,
    };
  });

  const extractTitleFromUrl = window.location.hostname;
  const dispatch = useDispatch()
  const [isFilled, setisFilled] = useState(false);
  const [favIcon, setFavIcon] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaTitleError, setMetaTitleError] = useState(false);
  const [metaDescError, setMetaDescError] = useState(false);
  const [metaKeywordsError, setMetaKeywordsError] = useState(false);
  const [tagError, setTagError] = useState(false)
  const ref = useRef()
  useEffect(() => {
    if (institutedetail.success && !institutedetail.loading && !isFilled) {
      setisFilled(true);
      setFavIcon(institutedetail.data.favIcon);
      setMetaTitle(
        institutedetail.data.meta_title
          ? institutedetail.data.meta_title
          : statictMetaTitle
      );
      setMetaDesc(
        institutedetail.data.meta_description
          ? institutedetail.data.meta_description
          : statictMetaDesc
      );
      setMetaKeywords(
        institutedetail.data.meta_keywords
          ? institutedetail.data.meta_keywords
          : statictMetaKeywords
      );

    }
  }, [institutedetail.data.favIcon, institutedetail.data.meta_description, institutedetail.data.meta_keywords, institutedetail.data.meta_title, institutedetail.loading, institutedetail.success, isFilled])
  const uploadImage = (data) => {
    let logo = data;
    setFavIcon(logo);
  };
  const handleInput = (e) => {
    let inputValue = e.target.value;
    let inputName = e.target.name;
    setTagError(false)
    switch (inputName) {
      case "metatitle":
        setMetaTitle(ValidationFile.spaceNotAccept(inputValue));
        setMetaTitleError(ValidationFile.isEmpty(inputValue));
        break;
      case "metakeyword":
        setMetaKeywords(ValidationFile.spaceNotAccept(inputValue));
        setMetaKeywordsError(ValidationFile.isEmpty(inputValue));
        break;
      case "metadesc":
        setMetaDesc(ValidationFile.spaceNotAccept(inputValue));
        setMetaDescError(ValidationFile.isEmpty(inputValue));
        break;
      default:
        return false;
    }
  };
  const metaTagsData = () => {
    return {
      favIcon: favIcon,
      meta_title: metaTitle,
      meta_description: metaDesc,
      meta_keywords: metaKeywords,
    };
  };
  const removeImage = () => {
    setFavIcon("")
  }
  const [toggleStatebro, setToggleStateBro] = useState("browsertabper");
  const browsertabper = () => {
    setToggleStateBro("browsertabper");
  };
  const htmlcodeper = () => {
    setToggleStateBro("htmlcodeper");
  };
  const [toggleStatenext, setToggleStateNext] = useState("browsertabpernext");
  const browsertabpernext = () => {
    setToggleStateNext("browsertabpernext");
  };
  const htmlcodepernext = () => {
    setToggleStateNext("htmlcodepernext");
  };

  const handleSubmit = () => {
    setTagError(true);
    if (ValidationFile.isEmpty(metaTitle)) {
      setMetaTitleError(true);
    }
    if (ValidationFile.isEmpty(metaDesc)) {
      setMetaDescError(true);
    }
    if (ValidationFile.isEmpty(metaKeywords)) {
      setMetaKeywordsError(true);
    }
    if (
      !ValidationFile.isEmpty(metaTitle) &&
      !ValidationFile.isEmpty(metaDesc) &&
      !ValidationFile.isEmpty(metaKeywords)
    ) {
      dispatch(
        updateInstituteInformation(users.user_institute, metaTagsData(), "meta", users.user_business_type)
      );
      manageToggleUsingSubmitButton()
    }
  };

  return (
    <React.Fragment>
      <div>
        <div className="uploadfac_conatiner">
          <div>
            <h1 className="w-100 mt-10">Upload Favicon</h1>
            <p className="text-xs">
              Submit an image (PNG,JPG,SVG,...) atleast 70x70.
            </p>
            <p className="text-xs">
              Your image should be 260x260 for more optimal results.
            </p>
            <div className="upload_fab_img_input">
              {/* <Cropper
                uploadViaModel={false}
                minWidth={400}
                ref={ref}
                maxWidth={1200}
                defaultRatio={1 / 1}
                onUploaded={uploadImage}
                InputOvelapLabel="Browse Image"
                InputUploadIconClass="icon-file-upload i-md gray"
                InputOvelapClass="button btn-xs btn-o-silver browserbtn-fabadd"
              /> */}

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
                onUploaded={(data) => uploadImage(data)}
                uploadLimit={1}
              />
              <ImageViewer
                object={favIcon}
                defaultImage={MetatagfabImg}
                height="45"
                width="45"
                className="fab_icon_output"
              />
              <React.Fragment>
                <div className="inline mb-20">
                  {/* <button
                    className="button button-xs btn-o-primary primary mt-8"
                    onClick={updateFavIcon}
                    disabled={isSuccess ? true : false}
                  >
                    {!isSuccess ? "Update" : "Updating..."}
                  </button> */}

                  {favIcon?.src && (
                    <button
                      onClick={removeImage}
                      className="button btn-sm btn-o-primary primary mt-8"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </React.Fragment>
            </div>
          </div>
          <div className="fabiconrightoutput card">
            <h3 className="text-sm w-400">Favicon Preview</h3>
            <p className="primary w-400">Sample Format</p>
            <div className="browsertabmeta mt-10">
              <button
                className={
                  toggleStatebro === "browsertabper"
                    ? "button btn-sm base button-base"
                    : "button btn-sm base btn-o-base"
                }
                onClick={browsertabper}
              >
                Browser Tab Preview
              </button>
              <button
                className={
                  toggleStatebro === "htmlcodeper"
                    ? "button btn-sm base button-base"
                    : "button btn-sm base btn-o-base"
                }
                onClick={htmlcodeper}
              >
                HTML Code Preview
              </button>
            </div>
            {toggleStatebro === "browsertabper" ? (
              <div className="metatag">
                <img
                  src={MetatagtabImg}
                  alt="metaicon"
                  className="backgroudn-blacklayout"
                />
                <p className="text-xs metatitlefab">
                  {" "}
                  <ImageViewer
                    object={favIcon}
                    defaultImage={MetatagfabImg}
                    width="20"
                  />
                  <span className="substringmetafabtitle">
                    {metaTitle
                      ? metaTitle.length < 33
                        ? metaTitle
                        : metaTitle.substring(0, 32) + "..."
                      : statictMetaTitle.substring(0, 32) + "..."}
                  </span>
                </p>
                <p className="text-s metasearchtitle">{extractTitleFromUrl}</p>
              </div>
            ) : toggleStatebro === "htmlcodeper" ? (
              <div className="htmlcodeoutput mt-10">
                &#60;link rel="icon" href=
                {favIcon?.src ? favIcon?.src : "favicon.ico"}
                type="image/x-icon" /&#62; <br />
                &#60;link rel="shortcut icon" href= `
                {favIcon?.src ? favIcon?.src : "favicon.ico"}`
                type="image/x-icon" /&#62;
              </div>
            ) : (
              toggleStatebro
            )}
          </div>
        </div>
        <hr />
        <h1 className="w-100 mt-50 mb-30">Website Meta</h1>
        <div className="websitemetainput mt-20">
          <div className="AddSocialLinkItem">
            <div className="formFieldwrap">
              <FormInput
                type="text"
                label="Meta Title"
                name="metatitle"
                value={metaTitle}
                placeholder="Meta Title"
                onChange={handleInput}
                onKeyUp={handleInput}
                maxLength="79"
                className={`form-control ${
                  metaTitleError && tagError ? "errorInput" : ""
                }`}
              />
              <p className="text-xs">
                Metadata title should be no longer than 80 characters.
              </p>
              <FormError
                show={metaTitleError && tagError}
                error="Meta Title required."
              />
            </div>
            <div className="formFieldwrap">
              <FormTextArea
                //  type="text"
                label="Meta Description"
                name="metadesc"
                value={metaDesc}
                placeholder="Meta Description"
                onChange={handleInput}
                onKeyUp={handleInput}
                maxLength="159"
                rows="3"
                className={`form-control ${
                  metaDescError && tagError ? "errorInput" : ""
                }`}
              />
              <p className="text-xs">
                Metadata description should be no longer than 160 characters.
              </p>
              <FormError
                show={metaDescError && tagError}
                error="Meta Description required.."
              />
            </div>
            <div className="formFieldwrap">
              <FormTextArea
                type="text"
                label="Meta Keywords"
                name="metakeyword"
                value={metaKeywords}
                placeholder="Meta Keywords"
                onChange={handleInput}
                onKeyUp={handleInput}
                maxLength="255"
                rows="5"
                className={`form-control ${
                  metaKeywordsError && tagError ? "errorInput" : ""
                }`}
              />
              <p className="text-xs">
                Metadata keywords should be no longer than 255 characters.
              </p>
              <FormError
                show={metaKeywordsError && tagError}
                error="Meta Keywords required."
              />
              {institutedetail.updating ? (
                <button
                  type="submit"
                  className="button btn-md button-theme btn-md button-block mt-30"
                  // onClick={handleSubmit}
                >
                  Saving...
                </button>
              ) : (
                <button
                  type="submit"
                  className="button btn-md button-theme btn-md button-block mt-30"
                  onClick={handleSubmit}
                >
                  Save Basic Meta
                </button>
              )}
            </div>
          </div>
          <div>
            <div className="fabiconrightoutput card">
              <h3 className="text-sm w-400">Website Meta Preview</h3>
              <p className="primary w-400">Sample Format</p>
              <div className="metatahplaceholder">
                <p className="text-xs w-600">{metaKeywords}</p>
              </div>
              <p className="text-xs w-200">
                About 4,41,00,00,000 results (0.79 seconds){" "}
              </p>

              <div className="browsertabmeta mt-10 mb-20">
                <button
                  className={
                    toggleStatenext === "browsertabpernext"
                      ? "button btn-sm base button-base"
                      : "button btn-sm base btn-o-base"
                  }
                  onClick={browsertabpernext}
                >
                  Search Engine Preview
                </button>
                <button
                  className={
                    toggleStatenext === "htmlcodepernext"
                      ? "button btn-sm base button-base"
                      : "button btn-sm base btn-o-base"
                  }
                  onClick={htmlcodepernext}
                >
                  HTML Code Preview
                </button>
              </div>
              {toggleStatenext === "browsertabpernext" ? (
                <div>
                  <p className="text-xs w-400">{extractTitleFromUrl}</p>
                  <h3 className="primary mt-8">{metaTitle}</h3>
                  <p className="text-xs mt-8">{metaDesc}</p>
                </div>
              ) : toggleStatenext === "htmlcodepernext" ? (
                <div>
                  <p className="htmlcodeoutput mt-10">
                    &#60;Title&#62; {metaTitle}
                    &#60;/Title&#62; <br />
                    &#60;meta name="description" content={metaDesc} /&#62;{" "}
                    <br />
                    &#60;meta name="keywords" content ={metaKeywords} /&#62;
                  </p>
                </div>
              ) : (
                toggleStatenext
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default BasicMetaTags