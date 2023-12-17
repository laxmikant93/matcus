/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import Cropper from '../../../../Common/Cropper'
import DummyProfile from "../../../../assets/images/img/DummyProfile.png";
import FormInput from '../../../../Common/Form/FormInput';
import FormError from '../../../../Common/Form/FormError';
import ValidationFile from '../../../../Classes/ValidationFile';
import Upload from '../../../../Common/Upload';
function AddKycDocuments({ showKYCError, handleInput, inputVals, DocumentUpload }) {
  const PdfDocument = (data) => {
    DocumentUpload(data.location)
  }
  const ref = useRef()
  return (
    <div className="pwl-section">
      <h3>KYC Documents</h3>
      <div className="pwl-wrap col2 mt-10">
        <div className="items">
          <p className="text-2xs w-500">PAN or TAN Number</p>
          <div className="formFieldwrap">
            <FormInput
              className={
                ValidationFile.isEmpty(inputVals.pan_number) &&
                  showKYCError
                  ? "errorInput"
                  : ""
              }
              type="text"
              name="pan_number"
              id="pan_number"
              placeholder="PAN/TAN Number"
              onChange={handleInput}
              onKeyUp={handleInput}
              value={inputVals.pan_number}
            />
            <FormError
              show={!inputVals.pan_numberIsValid && showKYCError}
              error={inputVals.pan_numbererror}
            />
          </div>
        </div>
        <div className="items">
          <p className="text-2xs w-500">If you are tax payer</p>
          <div className="formFieldwrap">
            <FormInput
              type="text"
              name="gstin_number"
              id="gstin_number"
              placeholder="GSTIN Number"
              value={inputVals.gstin_number}
              onChange={handleInput}
              onKeyUp={handleInput}
            />
            <FormError
              show={!inputVals.gstin_numberIsValid && showKYCError}
              error={inputVals.gstin_numbererror}
            />
          </div>
        </div>
      </div>
      <div className="pwl-wrap col2 mt-10">
        <div className="items">
          <p className="text-2xs w-500">
            Certification of Incorporation
          </p>
          <div className="mt-5">
            <FormInput
              type="text"
              name="cin_number"
              id="cin_number"
              placeholder="Corporate Identity Number "
              value={inputVals.cin_number}
              onChange={handleInput}
              onKeyUp={handleInput}
            />
            <FormError
              show={!inputVals.cin_numberIsValid && showKYCError}
              error={inputVals.cin_numbererror}
            />
          </div>
          <div>
            {/* <Cropper
              minWidth={200}
              maxWidth={400}
              defaultRatio={1 / 1}
              ref={ref}
              onUploaded={PdfDocument}
              BtnName="Upload CIN Document"
              IconClassName="i-md gray"
              BtnPropClass="upload_img_student_page btn-o-primary primary btn-sm button-block CropUploadBtn text-xxs"
            /> */}
            <Upload
              isFileImage={true}
              size={1}
              label="Upload CIN Document"
              onUploaded={PdfDocument}
              hidenFileName={true}
              // invalidError={() => removeFileUpload()}
              IconFileUploadClass="icon-file-upload base i-xs"
            />
          </div>
        </div>
        <div className="items">
          <p className="text-2xs w-500">
            Aadhar Number issued by the UIDAI
          </p>
          <div className="mt-5">
            <FormInput
              type="text"
              name="aadhar_number"
              id="aadhar_number"
              placeholder="12-digit Number"
              value={inputVals.aadhar_number}
              onChange={handleInput}
              onKeyUp={handleInput}
            />
            <FormError
              show={!inputVals.aadhar_numberIsValid && showKYCError}
              error={inputVals.aadhar_numbererror}
            />
          </div>
          <div>
            {/* <Cropper
              minWidth={200}
              maxWidth={400}
              ref={ref}
              defaultRatio={1 / 1}
              //onUploaded={(e) => updateImage(e)}
              BtnName="Upload Aadhar Card"
              IconClassName="i-md gray"
              BtnPropClass="upload_img_student_page btn-o-primary primary btn-sm button-block CropUploadBtn text-xxs"
            /> */}
            <Upload
              isFileImage={true}
              size={1}
              label="Upload Aadhar Card"
              onUploaded={PdfDocument}
              hidenFileName={true}
              // invalidError={() => removeFileUpload()}
              IconFileUploadClass="icon-file-upload base i-xs"
            />
            <FormError
              show={!inputVals.meta_documentIsValid && showKYCError}
              error="Aadhar document is required."
            />
          </div>
          <div>
            <Upload
              isFileImage={true}
              size={1}
              label="Upload Pan Card"
              onUploaded={PdfDocument}
              hidenFileName={true}
              // invalidError={() => removeFileUpload()}
              IconFileUploadClass="icon-file-upload base i-xs"
            />
            <FormError
              show={!inputVals.pan_documentIsValid && showKYCError}
              error="Pan document is required."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddKycDocuments