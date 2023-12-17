/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import Card from "../../../../Common/Card";
import CardBody from "../../../../Common/Card/CardBody";
import FormInput from "../../../../Common/Form/FormInput";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import Cropper from "../../../../Common/Cropper";
import ValidationUtils from "../../../../Classes/ValidationUtils";
import { postService, resetServices } from "../../../../store/actions/services";
import { useDispatch, useSelector } from "react-redux";
import FormError from "../../../../Common/Form/FormError";
import { useNavigate } from "react-router";
import { IconAttachment } from "../../../../Common/Icon";
import ValidationFile from "../../../../Classes/ValidationFile";
import TextEditor from "../../../../Common/Form/TextEditor";
import UploadButton from "../../../../Common/UploadButton";
import Uploader from "../../../../Common/ImageUploader";

const ServicesDetail = () => {
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  const dispatch = useDispatch();
  const history = useNavigate();
  const [index,setIndex]=useState("")
  const { user, addService, businesstype } = useSelector((state) => {
    return {
      user: state.user,
      addService: state.services.addService,
      businesstype: state.user.user_business_type,

    };
  });
  const ref = useRef()
  let [services, setServices] = useState([
    {
      institute: user.user_institute,
      business: user.user_institute,
      type: "Institute",
      industry: businesstype,
      title: "",
      details: "",
      thumbnail: "",
      isStatus: "",
      titleIsValid: false,
      detailIsValid: false,

    },
  ]);
  const [servicesTitleError, setServicesTitleError] = useState(false);
  const [servicesDetailsError, setServicesDetailsError] = useState(false);
  const isTitleValid = () => {
    let isValid = true;
    for (let key = 0; key < services.length; key++) {
      const element = services[key];
      if (ValidationUtils.isEmpty(element.title)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setServicesTitleError(false);
    } else {
      setServicesTitleError(true);
    }
    return isValid;
  };
  const isDetailValid = () => {
    let isValid = true;
    for (let key = 0; key < services.length; key++) {
      const element = services[key];
      if (ValidationUtils.isEmpty(element.details)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setServicesDetailsError(false);
    } else {
      setServicesDetailsError(true);
    }
    return isValid;
  };
  const addMoreServices = () => {
    // setFaculty([...faculty, faculty]);
    let serviceLists = services;
    serviceLists.push({
      institute: user.user_institute,
      business: user.user_institute,
      type: "Institute",
      industry: businesstype,
      title: "",
      details: "",
      thumbnail: "",
      isStatus: "",
      titleIsValid: false,
      detailIsValid: false,
    });
    setServices([...serviceLists]);
  };

  const removeServices = (key) => {
    services.splice(key, 1);
    setServices([...services]);
  };
  const handleServicesTitleInput = (e, key) => {
    let inputValue = e.target.value.trimStart();
    services[key]["title"] = inputValue;
    services[key]["institute"] = user.user_institute;
    services[key]["business"] = user.user_institute;
    services[key]["titleIsValid"] = ValidationUtils.isNotEmpty(inputValue);
    setServices([...services]);
    isTitleValid();
  };
  const handleServicesDetailsInput = (value, key) => {
    let inputValue = value;
    services[key]["details"] = inputValue;
    services[key]["detailIsValid"] = ValidationUtils.isNotEmpty(inputValue);
    setServices([...services]);
    isDetailValid();
  };
  const uploadImage = (data, key) => {
    let imgData = data;
    let allinputs = services;
    allinputs[key]["thumbnail"] = imgData;
    setServices([...allinputs]);
  };
  const removeImage = (key) => {
    let imgData = "";
    let allinputs = services;
    allinputs[key]["thumbnail"] = imgData;
    setServices([...allinputs]);
  };
  const handleSave = () => {
    setServicesTitleError(true);
    setServicesDetailsError(true);
    const titleValid = isTitleValid();
    const detailValid = isDetailValid();

    if (titleValid && detailValid) {
      for (let key = 0; key < services.length; key++) {
        services[key]["isStatus"] = "Saved";
      }
      let type = "save";
      dispatch(postService(services, type));
    }
  };
  const handlePublish = () => {
    setServicesTitleError(true);
    setServicesDetailsError(true);
    const titleValid = isTitleValid();
    const detailValid = isDetailValid();
    if (titleValid && detailValid) {
      for (let key = 0; key < services.length; key++) {
        services[key]["isStatus"] = "Active";
      }
      let type = "publish";
      dispatch(postService(services, type));
    }
  };

  const [createService, setCreateService] = useState(false);
  if (!createService && addService.success) {
    setCreateService(true);
    dispatch(resetServices());
    history("/services-list");
  }
  return (
    <React.Fragment>
      <div className="S-DetailCst">
        <div className="S-DetailList">
          {services.map((servicesData, key) => {
            return (
              <Card className="cardPadding mt-10" key={key}>
                <CardBody>
                  {services.length !== 1 && (
                    <button
                      type="button"
                      onClick={(e) => removeServices(key)}
                      className="btnText primary itemRemoveBtn"
                    >
                      Remove
                    </button>
                  )}
                  <p className="text-xs">List the services that you provide</p>
                  <div className="formFieldwrap mt-10">
                    <FormInput
                      label="Service Title"
                      value={servicesData.title}
                      placeholder="E.g. Educational Visits/Smart Classes/Air Conditioning/Canteen/Transportation"
                      name={key}
                      maxLength="200"
                      onChange={(e) => handleServicesTitleInput(e, key)}
                      className={!services[key]["title"] && servicesTitleError ? "errorInput" : ""}
                    />
                    <FormError
                      show={!services[key]["title"] && servicesTitleError}
                      error="Service title is required."
                    />
                  </div>

                  <div className="formFieldwrap">
                    {/* <FormTextArea
                      className={`form-control ${!services[key]["details"] && servicesDetailsError ? "errorInput" : ""}`}
                      id="exampleFormControlTextarea1"
                      rows="3"
                      type="text"
                      name={key}
                      onChange={(e) => handleServicesDetailsInput(e, key)}
                      placeholder="Service Detail"
                      value={servicesData.details}
                      label="Service Detail"
                      style={{ whiteSpace: " pre-wrap" }}
                      maxLength="500"
                      TextareaBtmTxt="500"
                    ></FormTextArea> */}

                    <TextEditor
                      preFilledData={servicesData.details}
                      currentResponse={(value) => handleServicesDetailsInput(value, key)}
                    />
                    <FormError
                      show={!services[key]["details"] && servicesDetailsError}
                      error="Service details are required."
                    />
                  </div>
                  <p className="text-xs w-500">
                    {" "}
                    Upload thumbnail Image or Icon
                  </p>
                  <div className="DashedInstructionList">
                    <p className="text-xxs">
                      - For images accept only .PNG or .JPG file format.
                    </p>
                  </div>
                  <div className="formFieldwrap mt-10">
                    {/* <Cropper
                      minWidth={120}
                      ref={ref}
                      maxWidth={400}
                      defaultRatio={1 / 1}
                      onUploaded={(e) => uploadImage(e, key)}
                      BtnName="Upload Image"
                      IconClassName="i-md gray"
                      BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                    /> */}
                      <UploadButton
                      ref={ref}
                      BtnName="Upload Image"
                      array={true}
                      IconClassName="i-md gray"
                      BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                      onClick={()=>{ref.current.open();setIndex(key)}}
                      showLink={true}
                      object={servicesData.thumbnail}
                    />
               <Uploader size={5}
      accept="image/png, image/jpeg, image/jpg, image/PNG, image/webp, image/WEBP"
       onclose={() => ref.current.close()}
      multiSelect={false} discartRef={ref} onUploaded={(data)=>uploadImage(data,index)}  uploadLimit={1} />

                   
                  </div>
                  <div className="formFieldwrap mt-8">
                    {services[key]["thumbnail"] ? (
                      <button
                        type="button"
                        onClick={(e) => removeImage(key)}
                        className="button btn-sm btn-o-red red mt-8"
                      >
                        Remove
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </CardBody>
              </Card>
            );
          })}
          {services.length < 5 && (
            <button
              onClick={addMoreServices}
              className="button button-primary btn-sm mt-20"
            >
              Add More
            </button>
          )}
          <div className="mt-40 mb-40">
            {addService.loading ? (
              <button
                className="button btn-md button-theme btn-md"
                type="button"
              // onClick={handlePublish}
              >
                Publishing...
              </button>
            ) : (
              <button
                className="button btn-md button-theme btn-md"
                type="button"
                onClick={handlePublish}
              >
                Publish Services
              </button>
            )}

            {addService.saveLoading ? (
              <button
                className="button btn-o-primary primary btn-md"
                type="button"
              >
                Saving Services...
              </button>
            ) : (
              <button
                className="button btn-o-primary primary btn-md"
                type="button"
                onClick={handleSave}
              >
                Save for later
              </button>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ServicesDetail;
