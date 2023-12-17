import React, { useEffect, useRef, useState } from 'react'
import FormError from '../../../../Common/Form/FormError';
import { useDispatch, useSelector } from 'react-redux';
import { paymentLists, selectKycBank, selectKycBankReset } from '../../../../store/actions/paymentmode';
import AddKycDocuments from './AddKycDocuments';
import SelectedBankDetails from './SelectedBankDetails';
import { Adhar_IsValid, CIN_IsValid, GST_IsValid, PAN_IsValid } from './Validation';
import SelectInput from '../../../../Common/Form/SelectInput';


function KycDetails({ modalAddBankState }) {
  const initialValues = {
    pan_number: "",
    pan_numberIsValid: false,
    pan_numbererror: "Empty Field",
    gstin_number: "",
    gstin_numberIsValid: false,
    gstin_numbererror: "Empty Field",
    cin_number: "",
    cin_numberIsValid: false,
    cin_numbererror: "Empty Field",
    aadhar_number: "",
    aadhar_numberIsValid: false,
    aadhar_numbererror: "Empty Field",
    cin_document: "",
    meta_document: "",
    meta_documentIsValid: false,
    pan_document: "",
    pan_documentIsValid: false
  };
  const ref = useRef()
  const dispatch = useDispatch();
  const [inputVals, setInputVals] = useState(initialValues);
  const [showKYCError, setKYCError] = useState(false);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputVals({
      ...inputVals,
      [name]: value,
    });
    let inputName = e.target.name;
    let inputValue = e.target.value;
    switch (inputName) {
      case "pan_number":
        setInputVals({
          ...inputVals, [inputName]: inputValue,
          [inputName + "IsValid"]: PAN_IsValid(inputValue).isValid,
          [inputName + "error"]: PAN_IsValid(inputValue).error
        });
        break;
      case "gstin_number":
        setInputVals({
          ...inputVals, [inputName]: inputValue,
          [inputName + "IsValid"]: GST_IsValid(inputValue).isValid,
          [inputName + "error"]: GST_IsValid(inputValue).error
        });
        break;
      case "cin_number":
        setInputVals({
          ...inputVals, [inputName]: inputValue,
          [inputName + "IsValid"]: CIN_IsValid(inputValue).isValid,
          [inputName + "error"]: CIN_IsValid(inputValue).error
        });
        break;
      case "aadhar_number":
        setInputVals({
          ...inputVals, [inputName]: inputValue,
          [inputName + "IsValid"]: Adhar_IsValid(inputValue).isValid,
          [inputName + "error"]: Adhar_IsValid(inputValue).error
        });
        break;
      default:
        return false;
    }
  };
  const DocumentUpload = (data) => {

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setKYCError(true);
    // if (!ValidationFile.isEmpty(inputVals.pan_number)) {
    //   set_pan_error(true);
    // }
  };
  const { user, bankDetails, selectedKycBank } = useSelector((state) => {
    return {
      user: state.user,
      bankDetails: state.paymentmode.bankDetails,
      selectedKycBank: state.paymentmode.selectedKycBank.data
    }
  });
  useEffect(() => {
    dispatch(paymentLists(user.user_institute));
  }, [user.user_institute, dispatch]);
  const selectAddedBank = (e) => {
    const id = e.target.value;
    const details = bankDetails.data && bankDetails.data.find((item) => { return item._id === id });
    details ? dispatch(selectKycBank(details)) : dispatch(selectKycBankReset())
  }
  return (
    <div className="pageColWrapper mt-20">
      <div className="page-wrap-left">
        {/* <div className="pwl-section">
          <h3>Personal Details</h3>
          <div className="pwl-wrap">
            <div className="pwl-left">
              <div className="mt-20">
                <p className="text-2xs w-500">Full Name</p>
                <p>{user.user_fullname}</p>
              </div>
              <div className="mt-10">
                <p className="text-2xs w-500">
                  Email ID <span className="secondary">Verified</span>
                </p>
                <p>{user.user_email}</p>
              </div>
              <div className="mt-20">
                <p className="text-2xs w-500">
                  Mobile Number{" "}
                  <span className="secondary">Verified</span>
                </p>
                <p>+91 {user.user_contact}</p>
              </div>
            </div> */}
        {/* <div className="pwl-right">
            <div className="pwl-container">
              <img src={DummyProfile} alt="Akansha Negi" />
              <div className="mt-5">
                <Cropper
                  minWidth={200}
                  maxWidth={400}
                  ref={ref}
                  defaultRatio={1 / 1}
                  //onUploaded={(e) => updateImage(e)}
                  BtnName="Upload Photo"
                  IconClassName="i-md gray"
                  BtnPropClass="upload_img_student_page btn-o-primary primary btn-sm button-block CropUploadBtn text-xxs"
                />
              </div>
            </div>
          </div> */}
        {/* </div>
        </div> */}
        {/* <div className="pwl-section">
          <h3>Institute Details</h3>
          <div className="mt-10">
            <p className="text-2xs w-500">Institute Name</p>
            <p>{user.user_institute_institute_name}</p>
            <p className="text-xxs">
              {user.user_institute_institute_address}
            </p>
          </div>
          <div className="mt-20">
            <p className="text-2xs w-500">
              Email ID <span className="secondary">Verified</span>
            </p>
            <p>{user.user_email}</p>
          </div>
          <div className="mt-20">
            <p className="text-2xs w-500">
              Mobile Number <span className="secondary">Verified</span>
            </p>
            <p>+91 {user.user_contact}</p>
          </div>
        </div> */}
        <AddKycDocuments
          showKYCError={showKYCError}
          inputVals={inputVals}
          handleInput={handleInput}
          DocumentUpload={DocumentUpload} />
        <div className="pwl-section">
          <h3>Bank Details</h3>
          <div className="mt-15">
            <div className="formFieldwrap">
              <SelectInput id="selected_bank" onChange={selectAddedBank} label="Select your added Bank">
                <option>Select</option>
                {bankDetails.data && bankDetails.data.map((item) => {
                  return (<option value={item._id}>{item.bankDetails.bankname}</option>)
                })}
                {/* <option>PNB Bank, Dwarka</option> */}
              </SelectInput>
              {/* <label className="animLabel" htmlFor="selected_bank">
                Select your added Bank
              </label> */}
            </div>
            <FormError
              show={(selectedKycBank === null || selectedKycBank === undefined || selectedKycBank === "") && showKYCError}
              error="Please select your bank."
            />
          </div>
          <SelectedBankDetails selectedKycBank={selectedKycBank} />
          <div className="mt-20">
            <button
              className="button btn-xs btn-o-primary primary"
              onClick={() => modalAddBankState()}
            >
              Add Bank Details
            </button>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="button button-primary"
            onClick={handleSubmit}
          >
            Validate KYC Now!
          </button>
          <button type="button" className="button btn-o-silver base">
            Validate Later
          </button>
        </div>
      </div>
      <div className="page-wrap-right">
        <p className="w-600 red">Instructions</p>
        <ul className="bulletList-items">
          <li>Full Personal Details.</li>
          <li>Please be ready with your recent passport photo.</li>
          <li>You will need the images of your pan card.</li>
          <li>Active Bank Details.</li>
        </ul>
      </div>
    </div>
  )
}

export default KycDetails