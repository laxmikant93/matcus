import React, { useState, useEffect } from "react";
import { paymentLists } from "../../../../store/actions/paymentmode";
import { useDispatch, useSelector } from "react-redux";
import AddPaymentModal from "./AddPaymentModal";
const PaymentModeOption = () => {
  const dispatch = useDispatch();
  const [ScheduleClassModal, SetScheduleClassModal] = useState(false);
  const [SelectedPaymentOpt, SetSelectedPaymentOpt] = useState("");
  const [PopUpClose, setPopUpClose] = useState(false);

  const closeModalState = () => {
    setPopUpClose(!PopUpClose)
    SetScheduleClassModal(!ScheduleClassModal);
  };

  const { InstituteID } = useSelector((state) => {
    return {
      InstituteID: state.user.user_institute,
      allPaymentList: state.paymentmode.allPaymentList.data,
    }
  });
  useEffect(() => {
    dispatch(paymentLists(InstituteID))
  }, [dispatch, InstituteID])

  return (
    <React.Fragment>
      <ul className="PaymentModeOptionCst">
        <li
          className="button btn-o-primary primary"
          onClick={() => {
            SetScheduleClassModal(!ScheduleClassModal);
            SetSelectedPaymentOpt("bank");
            setPopUpClose(!PopUpClose)
          }}
        >
          Add Bank Details
        </li>
        <li
          className="button btn-o-primary primary"
          onClick={() => {
            SetScheduleClassModal(!ScheduleClassModal);
            SetSelectedPaymentOpt("upi");
            setPopUpClose(!PopUpClose)
          }}
        >
          Add UPI
        </li>

      </ul>
      <AddPaymentModal
        selected={SelectedPaymentOpt}
        onclose={closeModalState}
        show={ScheduleClassModal}
        modalClose={closeModalState}
        PopUpClose={PopUpClose}
      />
    </React.Fragment>
  );
};

export default PaymentModeOption;
