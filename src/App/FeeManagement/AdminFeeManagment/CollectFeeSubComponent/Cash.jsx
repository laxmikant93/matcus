/* eslint-disable no-unused-vars */
import React from "react";
import InputDateTimePicker from "../../../../Common/Form/InputDateTimePicker";
import FormError from "../../../../Common/Form/FormError";
import FormInput from "../../../../Common/Form/FormInput";
import InputDatePicker from "../../../../Common/Form/InputDatePicker";

const Cash = ({
  handleChange,
  discount,
  cashData,
  handleDatePicker,
  error,
  totalAmount,
}) => {
  return (
    <>
      <div className="s-cash-pay">
        <div className="formFieldwrap">
          <FormInput
            className=""
            type="number"
            label="Paying Amount(₹)"
            placeholder="Paying Amount"
            readOnly
            value={totalAmount - discount}
            name="PaidAmount"
          />
        </div>

        {/* <div className="datePickerWrap">
          <InputDateTimePicker
            placeholder="*Transaction Date"
            id="end_session"
            name="transactionDate"
            type="datetime-local"
            value={cashData.transactionDate.value}
            // showMonthYearPicker
            // showFullMonthYearPicker
            minDate={new Date()}
            onSelect={(selectedDate) => handleDatePicker(selectedDate)}
          />
        </div>
        <FormError
          show={
            error &&
            !cashData.transactionDate.isValid &&
            cashData.transactionDate.value === ""
          }
          error="Transaction Date is required"
        />
        <FormError
          show={
            error &&
            !cashData.transactionDate.isValid &&
            cashData.transactionDate.value !== ""
          }
          error="Transaction Date need to be in future."
        /> */}
      </div>
    </>
  );
};
export default Cash;
