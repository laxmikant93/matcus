import React from 'react'

function SelectedBankDetails({ selectedKycBank }) {
  const hideBankAccountNumber = (value) => {
    const splice = value.slice(-3);
    const hideData = "xxxxxxxxxxx" + splice;
    return hideData;
  }
  return selectedKycBank && selectedKycBank.bankDetails && (
    <div className="pwl-wrap col2 mt-10">
      <div className="items">
        <p className="text-2xs w-500">Bank Name</p>
        <p>{selectedKycBank.bankDetails.ifscCode}</p>
      </div>
      <div className="items">
        <p className="text-2xs w-500">Branch Code</p>
        <p>5689</p>
      </div>
      <div className="items">
        <p className="text-2xs w-500">Account Number</p>
        <p>{hideBankAccountNumber(selectedKycBank.bankDetails.acnumber)}</p>
      </div>
      <div className="items">
        <p className="text-2xs w-500">IFSC Code</p>
        <p>{selectedKycBank.bankDetails.ifscCode}</p>
      </div>
      <div className="items">
        <p className="text-2xs w-500">MICR Code</p>
        <p>DL/IN/201687934</p>
      </div>
      <div className="items">
        <p className="text-2xs w-500">Branch Address</p>
        <p>
          No. 22, Shivalik Road, G/67-67, Dwarka, Sector -16B New
          Delhi
        </p>
      </div>
    </div>

  )
}

export default SelectedBankDetails