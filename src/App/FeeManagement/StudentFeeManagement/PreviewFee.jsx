import React from 'react'

function PreviewFee({ modalPaidFee, closeModalPaidFeeState, PreviewData, Receipt, AccumilativeFee, classRoomData }) {
  return (
    <div className={`modal modalShowing-${modalPaidFee}`}>
      <div className="modalwrapper">
        <span
          className="closeModal text-xxs dgray"
          onClick={() => closeModalPaidFeeState()}
        >
          X Close
        </span>
        <div className="modalHead">
          <div>
            <h3 className="text-sm w-300">View Fee Details</h3>
            <h5 className="text-xxs w-400">
              {PreviewData && PreviewData.paymentMonth
                ? PreviewData.paymentMonth.replace(",", " ")
                : ""},{" "}
              {PreviewData.feeYear},{" "}Classroom:{" "}{classRoomData && classRoomData.coursename}
            </h5>
            <hr />
          </div>
        </div>
        <div className="modalbody">
          {Receipt && PreviewData.paymentType === "Online" && (
            <>
              <h4>Order Summary #{PreviewData.orderId}</h4>
              <div className="pricebreakupTbl">
                <ul>
                  <li>Order Date</li>
                  <li>{PreviewData.paymentDate}</li>
                </ul>
                <ul>
                  <li>Invoice No.</li>
                  <li>{PreviewData.receiptId}</li>
                </ul>
                <ul>
                  <li>Payment Method</li>
                  <li>{PreviewData.paymentMethod}</li>
                </ul>
                <ul>
                  <li className="w-600">Paid Amount</li>
                  <li className="w-600">₹{PreviewData.totalAmount - PreviewData.feeStudentScholorship - PreviewData.feeStudentDiscount + AccumilativeFee}</li>
                </ul>
                <ul className="seperator">
                  <li>
                    <hr />
                  </li>
                </ul>
              </div>
            </>)}
          <h4 className="mt-40">Fee Breakups</h4>
          <div className="pricebreakupTbl">
            {PreviewData && PreviewData.feestructure.length > 0 && PreviewData.feestructure.map((item) => {
              return (<ul key={item._id}>
                <li>{item.type}</li>
                <li>₹{item.amount}</li>
              </ul>)
            })}
            <ul className="seperator">
              <li>
                <hr />
              </li>
            </ul>
            <ul>
              <li>Scholarship</li>
              <li>{PreviewData.feeStudentScholorship > 0 ? "-" : ""} ₹{PreviewData.feeStudentScholorship}</li>
            </ul>
            <ul>
              <li>Discount</li>
              <li>{PreviewData.feeStudentDiscount > 0 ? "-" : ""} ₹{PreviewData.feeStudentDiscount}</li>
            </ul>
            <ul className="seperator">
              <li>
                <hr />
              </li>
            </ul>
            {PreviewData.paidDueAmount && PreviewData.feeStatus === "Paid" ? (
              <ul>
                <li>Paid Due Amount</li>
                <li>{PreviewData.paidDueAmount > 0 ? "-" : ""} ₹{PreviewData.paidDueAmount}</li>
              </ul>
            ) : (
              <ul>
                <li>Due Amount</li>
                <li>₹{AccumilativeFee}</li>
              </ul>
            )
            }
            <ul>
              <li>Convenience(3%)</li>
              <li>₹{PreviewData.paymentType === "Online" ? ((PreviewData.totalAmount - (PreviewData.feeStudentScholorship + PreviewData.feeStudentDiscount)) * 3 / 100) : 0}</li>
            </ul>
            <ul className="seperator">
              <li>
                <hr />
              </li>
            </ul>
            <ul>
              <li className="w-600">Total</li>
              {
                PreviewData.paymentType === "Online" ? <li className="w-600">₹{(PreviewData.totalAmount - PreviewData.feeStudentScholorship - PreviewData.feeStudentDiscount + AccumilativeFee) + ((PreviewData.totalAmount - PreviewData.feeStudentScholorship - PreviewData.feeStudentDiscount) * 3 / 100)}</li> :
                  <li className="w-600">₹{PreviewData.totalAmount - PreviewData.feeStudentScholorship - PreviewData.feeStudentDiscount + AccumilativeFee}</li>
              }
            </ul>
            <ul className="seperator">

              <li>
                <hr />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewFee