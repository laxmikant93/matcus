import React from "react";
import FormError from "../../../../Common/Form/FormError";
import FormInput from "../../../../Common/Form/FormInput";
import Upload from "../../../../Common/Upload";

const DemandDraft = ({
  demandDraftData,
  totalAmount,
  discount,
  error,
  handleChange,
  handleUploadFile,
}) => {
  return (
    <React.Fragment>
      <div className="s-dd-pay">
        <div className="formFieldwrap">
          <FormInput
            className=""
            type="number"
            label="Paying Amount"
            placeholder="Paying Amount"
            value={totalAmount - discount}
            name="PaidAmount"
            readOnly
          />
        </div>
        <div className="formFieldwrap">
          <FormInput
            className=""
            type="text"
            label="Demand Draft Number"
            placeholder="Demand Draft Number"
            value={demandDraftData.DemandDraftNo.value}
            onChange={handleChange}
            name="DemandDraftNo"
          />
          <FormError
            show={error && !demandDraftData.DemandDraftNo.isValid}
            error="Demand Draft Number is required"
          />
        </div>
        <div className="formFieldwrap">
          <FormInput
            className=""
            type="text"
            label="Bank Name"
            placeholder="Bank Name"
            value={demandDraftData.BankName.value}
            onChange={handleChange}
            name="BankName"
          />
          <FormError
            show={error && !demandDraftData.BankName.isValid}
            error="Bank Name is required"
          />
        </div>
        <div className="formFieldwrap">
          <FormInput
            className=""
            type="text"
            label="Branch Name"
            placeholder="Branch Name"
            value={demandDraftData.BankBranch.value}
            onChange={handleChange}
            name="BankBranch"
          />
          <FormError
            show={error && !demandDraftData.BankBranch.isValid}
            error="Bank Branch Name is required"
          />
        </div>
        <div className="formFieldwrap">
          <FormInput
            className=""
            type="text"
            label="Name of Account Holder"
            placeholder="Name of Account Holder"
            value={demandDraftData.accountHolderName.value}
            onChange={handleChange}
            name="accountHolderName"
          />
          <FormError
            show={error && !demandDraftData.accountHolderName.isValid}
            error="Account Holder Name is required"
          />
        </div>
        <div className="formFieldwrap">
          <FormInput
            className=""
            type="number"
            label="Contact Number"
            placeholder="Contact Number"
            value={demandDraftData.contact.value}
            onChange={handleChange}
            name="contact"
          />
          <FormError
            show={error && !demandDraftData.contact.isValid}
            error="Contact Number is required"
          />
        </div>
      </div>
      <div className="formFieldwrap">
        <Upload
          size={10}
          name="uploadFile"
          label="Upload Demand Draft"
          allFiles={true}
          hidenFileName={true}
          IconFileUploadClass="icon-file-upload base i-xs"
          onUploaded={handleUploadFile}
          value={demandDraftData.uploadFile.value}
        />
      </div>
    </React.Fragment>
  );
};

export default DemandDraft;
