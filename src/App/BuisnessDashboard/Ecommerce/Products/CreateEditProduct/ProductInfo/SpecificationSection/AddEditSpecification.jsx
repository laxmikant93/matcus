import React, { useState } from "react";
import FormInput from "../../../../../../../Common/Form/FormInput";
import FormTextArea from "../../../../../../../Common/Form/FormTextArea";
import Modals from "../../../../../../../Common/Modals";
import ModalsHeader from "../../../../../../../Common/Modals/ModalsHeader";
import ModalsBody from "../../../../../../../Common/Modals/ModalsBody";
import FormError from "../../../../../../../Common/Form/FormError";
import ValidationFile from "../../../../../../../Classes/ValidationFile";
import ValidationUtils from "../../../../../../../Classes/ValidationUtils";
import { useEffect } from "react";
import "../productCategory.scss"
const AddEditSpecification = ({ infoSectionRef, onClose, infoIndex, infoDataArray, setInfoDataArray, setInfoIndex, }) => {

  const [infoTitle, setInfoTitle] = useState("");
  const [infoTitleError, setInfoTitleError] = useState(false);
  const [infoDesc, setInfoDesc] = useState("");

  const closeModal = () => {
    onClose();
    handleResetInfoData();
  }

  const handleAddSectionInputs = (e) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    let inputName = e.target.name;
    switch (inputName) {
      case "infoTitle":
        setInfoTitle(value);
        setInfoTitleError(ValidationUtils.isEmpty(value));
        break;
      default:
        setInfoDesc(value);
    }
  }

  const handleResetInfoData = () => {
    setInfoTitle("");
    setInfoDesc("");
    setInfoTitleError(false);
    setInfoIndex("");
  }

  const closeModalPopup = () => {
    infoSectionRef.current.close();
    handleResetInfoData();
  }

  const handleSaveButton = () => {
    if (ValidationUtils.isEmpty(infoTitle)) {
      setInfoTitleError(true);
    }

    if (ValidationUtils.isNotEmpty(infoTitle)) {
      let data = infoDataArray;
      let body = {
        title: infoTitle,
        description: infoDesc,
      }
      data.push(body);
      setInfoDataArray([...data]);
      infoSectionRef.current.close();
      handleResetInfoData();
    }
  }

  useEffect(() => {
    if (infoIndex || infoIndex === 0) {
      setInfoTitle(infoDataArray[infoIndex].title);
      setInfoDesc(infoDataArray[infoIndex].description);
    }
    else {
      handleResetInfoData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoDataArray, infoIndex])

  const handleUpdateButton = () => {
    if (ValidationUtils.isEmpty(infoTitle)) {
      setInfoTitleError(true);
    }
    if (ValidationUtils.isNotEmpty(infoTitle)) {
      let body = {
        title: infoTitle,
        description: infoDesc
      }
      let data = infoDataArray.map((item, i) => i === infoIndex ? body : item);
      setInfoDataArray([...data]);
      infoSectionRef.current.close();
      handleResetInfoData();
    }
  }

  return (
    <React.Fragment>
      <Modals ref={infoSectionRef} Position="center" slide="top" ClosePopUp={() => closeModal()} ModalsSize="modal-s">
        <ModalsHeader title={infoIndex || infoIndex === 0 ? 'Edit Specification Section' : 'Add Specification Section'} />
        <ModalsBody>
          <div className='discart-container'>
            <div>
              <p className='text-xs w-400 base'>Info Title</p>
              <FormInput
                className="mt-5 gray text-xxs w-400"
                placeholder="e.g., Material or Shipping & Return Policy "
                name="infoTitle"
                value={infoTitle}
                onChange={handleAddSectionInputs}
              />
              <FormError
                show={infoTitleError}
                error="Please enter info title."
              />
            </div>
            <div>
              <p className='text-xs w-400 base mt-25'>Description</p>
              <FormTextArea
                className="mt-5"
                placeholder="Add description about the product additional information section."
                name="infoDesc"
                maxlength={120}
                rows={5}
                value={infoDesc}
                onChange={handleAddSectionInputs}
              />
            </div>
            <div className='discard-btn-wrapper '>
              <button className='button btn-xs text-xs w-400 btn-oval btn-o-primary'
                onClick={closeModalPopup}
              >
                Cancel
              </button>
              {infoIndex || infoIndex === 0 ?
                <button className='button btn-xs text-xs w-400 btn-oval button-primary'
                  onClick={handleUpdateButton}
                >
                  Update
                </button>
                :
                <button className='button btn-xs text-xs w-400 btn-oval button-primary'
                  onClick={handleSaveButton}
                >
                  Save
                </button>
              }

            </div>
          </div>
        </ModalsBody>
      </Modals>
    </React.Fragment>
  )
}
export default AddEditSpecification 