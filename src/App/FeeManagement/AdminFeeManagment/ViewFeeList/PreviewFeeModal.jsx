import React, { forwardRef } from 'react';
import DummyProfile from "../../../../assets/images/img/DummyProfile.png";
const PreviewFeeModal = forwardRef((props, ref) => {
  // { modalState, closeModalState, feeList, preview }
  return (
    <div className={`modal modalShowing-${props.modalState}`} ref={ref}>
      <div className="modalwrapper">
        <span
          className="closeModal text-xxs dgray"
          onClick={() => props.closeModalState()}
        >
          X Close
        </span>
        <div className="modalHead">
          <div>
            <h3 className="text-sm w-300">View Fee Details</h3>
            <h5>{props.feeList.ClassRoom && props.feeList.ClassRoom.coursename}, {props.preview.feeYear}</h5>
          </div>
          <div>
            <div className="userDetails mt-20">
              <div className="profileCircle">
                <a href="*" rel="noreferrer" target="_blank">
                  <img src={DummyProfile} alt="Akansha Negi" />
                </a>
              </div>
              <div className="profileDetails">
                <div className="profile-name">
                  <a href="*" rel="noreferrer" target="_blank">
                    {props.preview.fullname}
                  </a>
                </div>
                <div className="admission-no">
                  <span>ADM No. {props.preview.admission_no}</span>
                </div>
              </div>
            </div>
            <hr />
            <div className="modalbody">
              <h3>Fee Structure</h3>
              <div className="gridListTable">
                <ul className="gridHeader">
                  <li className="col col-8">Fee Type</li>
                  <li className="col col-4">Amount</li>
                </ul>
                <div className="gridBody no-fixed">
                  {props.preview && props.preview.feestructure.length > 0 && props.preview.feestructure.map((item) => {
                    return (
                      <div className="gridRow" key={item._id}>
                        <ul className="topInfo">
                          <li className="col col-8" data-head="Fee Type">
                            {item.type}
                          </li>
                          <li className="col col-4" data-head="Amount">
                            ₹{item.amount}
                          </li>
                        </ul>
                      </div>
                    )
                  })}
                  {/* <div className="gridRow">
                    <ul className="topInfo">
                      <li className="col col-8" data-head="Fee Type">
                        Cricket
                      </li>
                      <li className="col col-4" data-head="Amount">
                        ₹500
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
              <h3 className="mt-30">Fee Deductions</h3>
              <div className="gridListTable">
                <ul className="gridHeader">
                  <li className="col col-6">Deduction Type</li>
                  <li className="col col-3">Deducted Amount</li>
                  <li className="col col-3">Total</li>
                </ul>
                <div className="gridBody no-fixed">
                  <div className="gridRow">
                    <ul className="topInfo">
                      <li className="col col-8" data-head="Deduction Type">
                        Scholarship
                      </li>
                      <li className="col col-4" data-head="Deducted Amount">
                        ₹{props.preview.feeStudentScholorship}
                      </li>
                      <li className="col col-4" data-head="Total Amount">
                        ₹{props.preview.totalAmount - (props.preview.feeStudentDiscount + props.preview.feeStudentScholorship)}
                      </li>
                    </ul>
                  </div>
                  <div className="gridRow">
                    <ul className="topInfo">
                      <li className="col col-8" data-head="Deduction Type">
                        Discount
                      </li>
                      <li className="col col-4" data-head="Deducted Amount">
                        ₹{props.preview.feeStudentDiscount}
                      </li>
                      <li className="col col-4" data-head="Total Amount">
                        ₹{props.preview.totalAmount - (props.preview.feeStudentDiscount + props.preview.feeStudentScholorship)}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <h2 className="mt-30">₹{props.preview.totalAmount - (props.preview.feeStudentDiscount + props.preview.feeStudentScholorship)}</h2>
              <p className="text-xxs">
                ({props.preview.paymentCycle} fee is inclusive of all taxes + 3% convenience charges.)
              </p>
            </div>
          </div>
        </div>
        <div className="modalFooter mt-20">
          <div className="row">
            {/* <button className="button btn-o-primary primary">
              Notifiy to Student
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
});

export default PreviewFeeModal;
