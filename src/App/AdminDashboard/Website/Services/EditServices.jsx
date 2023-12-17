/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Modal from "../../../../Common/Modal";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import ModalBody from "../../../../Common/Modal/ModalBody";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
import FormInput from "../../../../Common/Form/FormInput";
import Cropper from "../../../../Common/Cropper";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import { useDispatch, useSelector } from "react-redux";
import ValidationFile from "../../../../Classes/ValidationFile";
import FormError from "../../../../Common/Form/FormError";
import {
  ClearselectServiceToUpdate,
  clearUpdateServicesData,
  serviceListUpdate,
} from "../../../../store/actions/services";
import { IconAttachment } from "../../../../Common/Icon";
import "./Services.scss";
import TextEditor from "../../../../Common/Form/TextEditor";
import UploadButton from "../../../../Common/UploadButton";
import Uploader from "../../../../Common/ImageUploader";
const EditServices = ({ onclose, show }) => {
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  const { serviceUpdateData, updateServiceInfo, businesstype } = useSelector((state) => {
    return {
      serviceUpdateData: state.services.updateSelection,
      updateServiceInfo: state.services.update,
      businesstype: state.user.user_business_type,

    };
  });
  const dispatch = useDispatch();
  const [isFilled, setisFilled] = useState(false);
  const [servicesError, setServicesError] = useState(true);
  const [titleEdit, setTitleEdit] = useState("");
  const [detailsEdit, setDetailsEdit] = useState("");
  const [titleEditError, setTitleEditError] = useState(false);
  const [detailsEditError, setDetailsEditError] = useState(false);
  const [thumbnailEdit, setThumbnailEdit] = useState("");
  const ref = useRef()

  useEffect(() => {
    if (serviceUpdateData.data && serviceUpdateData.success && !isFilled) {
      setisFilled(true);
      setTitleEdit(serviceUpdateData.data.title);
      setDetailsEdit(serviceUpdateData.data.details);
      setThumbnailEdit(serviceUpdateData.data.thumbnail);
    }
  }, [isFilled, serviceUpdateData.data, serviceUpdateData.success])

  const closeModalState = () => {
    onclose();
    setServicesError(false);
    dispatch(ClearselectServiceToUpdate());
    setisFilled(false);
  };
  const handleInput = (event) => {
    let inputValue = event.target.value;
    let inputName = event.target.name;
    switch (inputName) {
      case "title":
        setTitleEdit(inputValue);
        setTitleEditError(ValidationFile.isEmpty(inputValue));
        break;
      case "details":
        setDetailsEdit(inputValue);
        setDetailsEditError(ValidationFile.isEmpty(inputValue));
        break;
      default:
        return false;
    }
  };

  const handleServicesDetailsInput = (val) => {
    setDetailsEdit(val);
    setDetailsEditError(ValidationFile.isEmpty(val));
  }

  const uploadImage = (data) => {
    let imgData = data;
    setThumbnailEdit(imgData);
  };
  const removeImage = () => {
    let imgData = "";
    setThumbnailEdit(imgData);
  };
  const handleEditData = (e) => {
    e.preventDefault();
    setServicesError(true);
    if (ValidationFile.isEmpty(titleEdit)) {
      setTitleEditError(true);
    }
    if (ValidationFile.isEmpty(detailsEdit)) {
      setDetailsEditError(true);
    }
    if (
      !ValidationFile.isEmpty(titleEdit) &&
      !ValidationFile.isEmpty(detailsEdit)
    ) {
      dispatch(
        serviceListUpdate(serviceUpdateData.data._id, editServiceData())
      );
    }
  };
  const [updatedData, setUpdatedData] = useState(false);

  useEffect(() => {
    if (updateServiceInfo.success && !updatedData) {
      setUpdatedData(true);
      onclose();
      dispatch(ClearselectServiceToUpdate());
      setServicesError(false);
      dispatch(clearUpdateServicesData());
    }
    setUpdatedData(false);
    setisFilled(false);
  }, [updateServiceInfo, dispatch, onclose, updatedData]);

  const editServiceData = () => {
    return {
      title: titleEdit,
      details: detailsEdit,
      thumbnail: thumbnailEdit,
      industry: businesstype
    };
  };
  return (
    <React.Fragment>
      <Modal show={show}>
        <ModalHeader
          title="Update Service"
          closeButton={true}
          onclose={closeModalState}
        />
        <ModalBody className="EditService-MBody">
          {/* <ServicesDetail /> */}
          <div className="formFieldwrap">
            <FormInput
              label="Service Title"
              placeholder="Service Title"
              value={serviceUpdateData.success ? titleEdit : "Loading....."}
              name="title"
              maxLength="200"
              onChange={handleInput}
            />
            <FormError
              show={titleEditError && servicesError}
              error="Service title is required."
            />
          </div>
          <div className="formFieldwrap">
            {/* <FormTextArea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              type="text"
              name="details"
              onChange={handleInput}
              placeholder="Service Detail"
              value={serviceUpdateData.success ? detailsEdit : "Loading....."}
              label="Service Detail"
              style={{ whiteSpace: " pre-wrap" }}
              maxLength="500"
              TextareaBtmTxt="500"
            ></FormTextArea> */}
            <TextEditor
              preFilledData={detailsEdit}
              currentResponse={(value) => handleServicesDetailsInput(value)}
            />
            <FormError
              show={detailsEditError && servicesError}
              error="Service details are required."
            />
          </div>
          <p className="text-xs w-500"> Upload thumbnail Image or Icon</p>
          <div className="DashedInstructionList">
            <p className="text-xxs">
              - For images accept only .PNG or .JPG file format.
            </p>
          </div>
          <div className="formFieldwrap mt-15">
            {/* <Cropper
              minWidth={120}
              maxWidth={400}
              ref={ref}
              defaultRatio={1 / 1}
              onUploaded={uploadImage}
              BtnName="Upload Image"
              IconClassName="i-md gray"
              BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
            />
            {thumbnailEdit && (
              <a
                className="btnText priamry text-2xs attachmentwithtext mt-3"
                href={thumbnailEdit}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ed-icon icon-attachment gray i-xs"></i>
                {thumbnailEdit.replace(s3Url, "")}
              </a>
            )} */}
            <UploadButton
                      ref={ref}
                      BtnName="Upload Image"
                      array={true}
                      IconClassName="i-md gray"
                      BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                      onClick={()=>{ref.current.open()}}
                      showLink={true}
                      object={thumbnailEdit}
                    />
               <Uploader size={5}
      accept="image/png, image/jpeg, image/jpg, image/PNG, image/webp, image/WEBP"
       onclose={() => ref.current.close()}
      multiSelect={false} discartRef={ref} onUploaded={(data)=>uploadImage(data)}  uploadLimit={1} />
          </div>
          <div>
            {thumbnailEdit ? (
              <button
                onClick={removeImage}
                className="button btn-sm btn-o-red red mt-8"
              >
                Remove
              </button>
            ) : (
              ""
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          {updateServiceInfo.loading ? (
            <button className="button btn-md button-theme btn-md" type="button">
              Updating...
            </button>
          ) : (
            <button
              className="button btn-md button-theme btn-md"
              onClick={handleEditData}
              type="button"
            >
              Update
            </button>
          )}
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default EditServices;
