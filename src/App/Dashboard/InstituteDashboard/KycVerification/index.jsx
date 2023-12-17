import React, { useState } from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import AddPaymentModal from "./AddPaymentModal";
import KycDetails from "./KycDetails";
const KycVerification = () => {


  const [modalAddBank, setModalAddBank] = useState(false);
  const modalAddBankState = () => {
    setModalAddBank(!modalAddBank);
  };
  const closeModalAddBankState = () => {
    setModalAddBank(!modalAddBank);
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/kyc-verification"
            title="KYC Verification"
          />
        </Breadcrumb>
        <div className="pageHeadIntro">
          <h1 className="heading text-sm w-300 mt-10">KYC Verification</h1>
          <p>
            Once you complete KYC online, you eligible to receive your
            payment.
          </p>
        </div>
        <KycDetails
          modalAddBankState={modalAddBankState} />
        <AddPaymentModal
          onclose={closeModalAddBankState}
          show={modalAddBank}
        // selected
        // updateItem
        // PopUpClose
        />
        {/* <div className={`modal modalShowing-${modalAddBank}`}>
          <div className="modalwrapper">
            <span
              className="closeModal text-xxs dgray"
              onClick={() => closeModalAddBankState()}
            >
              X Close
            </span>
            <div className="modalHead">
              <div>
                <h3 className="text-sm w-300">Add Bank Details</h3>
              </div>
            </div>
            <div className="modalbody">
              showing fields for bank adding... it is a dummy
            </div>
            <div className="modalFooter">
              <div className="row">
                <button className="button btn-md button-theme primary">
                  Save Bank Details
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </React.Fragment>
    </React.Fragment>
  );
};

export default KycVerification;
