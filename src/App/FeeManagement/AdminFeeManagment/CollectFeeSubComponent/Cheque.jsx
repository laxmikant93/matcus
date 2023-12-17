import React from "react";
import FormError from "../../../../Common/Form/FormError";
import FormInput from "../../../../Common/Form/FormInput";
import Upload from "../../../../Common/Upload";

const Cheque = ({
  handleChange,
  chequeData,
  error,
  handleUploadFile,
  totalAmount,
  discount,
}) => {
  return (
    <React.Fragment>
      <div className="s-cheque-pay">
        <div className="formFieldwrap">
          <FormInput
            className=""
            type="number"
            label="Paying Amount"
            placeholder="Paying Amount"
            readOnly
            value={totalAmount - discount}
            name="paidAmount"
          />
        </div>

        <div className="formFieldwrap">
          <FormInput
            className=""
            type="text"
            label="Cheque Number"
            placeholder="Cheque Number"
            onChange={handleChange}
            name="ChequeNo"
            value={chequeData.ChequeNo.value}
          />
          <FormError
            show={error && !chequeData.ChequeNo.isValid}
            error="Cheque Number is required"
          />
        </div>

        <div className="formFieldwrap">
          <FormInput
            className=""
            type="text"
            label="Bank Name"
            placeholder="Bank Name"
            value={chequeData.BankName.value}
            onChange={handleChange}
            name="BankName"
          />
          <FormError
            show={error && !chequeData.BankName.isValid}
            error="Bank Name is required"
          />
        </div>

        <div className="formFieldwrap">
          <FormInput
            className=""
            type="text"
            label="Branch Name"
            placeholder="Branch Name"
            value={chequeData.BankBranch.value}
            onChange={handleChange}
            name="BankBranch"
          />
          <FormError
            show={error && !chequeData.BankBranch.isValid}
            error="Branch Name is required"
          />
        </div>
        <div className="formFieldwrap">
          <FormInput
            className=""
            type="text"
            label="Name of Account Holder"
            placeholder="Name of Account Holder"
            value={chequeData.accountHolderName.value}
            onChange={handleChange}
            name="accountHolderName"
          />
          <FormError
            show={error && !chequeData.accountHolderName.isValid}
            error="Account Holder Name is required"
          />
        </div>
        <div className="formFieldwrap">
          <FormInput
            className=""
            type="number"
            label="Contact Number"
            placeholder="Contact Number"
            onChange={handleChange}
            value={chequeData.contact.value}
            name="contact"
          />
          <FormError
            show={error && !chequeData.contact.isValid}
            error="Contact Number is required"
          />
        </div>

        <Upload
          size={10}
          name="uploadFile"
          label="Upload Cheque"
          allFiles={true}
          hidenFileName={true}
          onUploaded={handleUploadFile}
          IconFileUploadClass="icon-file-upload base i-xs"
          value={chequeData.uploadFile.value}
        />
      </div>
    </React.Fragment>
  );
};

export default Cheque;
