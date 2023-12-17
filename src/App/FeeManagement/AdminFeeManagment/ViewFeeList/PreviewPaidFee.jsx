import React from 'react'

const PreviewPaidFee = ({ closeManagePaidPreview, preview, paidPreviewModal }) => {

  return (


    <div className={`modal modalShowing-${paidPreviewModal}`}>
      <div className="modalwrapper">
        <span
          className="closeModal text-xxs dgray"
          onClick={() => closeManagePaidPreview()}
        // onClick={closeManagePaidPreview}
        >
          X Close
        </span>
        <div className="modalHead">
          <div>
            <h3 className="text-sm w-300">Preview Paid Fee Details</h3>
            {/* <h5>Classroom 8E, 2022-23</h5> */}
            <hr />
          </div>
        </div>
        <div className="modalbody">
          <h4>Order Summary</h4>
          <div className="pricebreakupTbl">
            {/* <ul>
              <li>Order Date</li>
              <li>12 Mar. 2021 4:33pm</li>
            </ul>
            <ul>
              <li>Invoice No.</li>
              <li>DLEN7899588</li>
            </ul>
            <ul>
              <li>Payment Method</li>
              <li>Net Banking - ICICI Bank</li>
            </ul> */}
            <ul>
              <li className="w-600">Paid Amount</li>
              <li className="w-600">₹{preview.totalAmount - preview.feeStudentDiscount - preview.feeStudentScholorship}</li>
            </ul>
            <ul className="seperator">
              <li>
                <hr />
              </li>
            </ul>
          </div>
          <h4 className="mt-40">Fee Breakups</h4>
          <div className="pricebreakupTbl">
            {preview && preview.feestructure.length > 0 && preview.feestructure.map((item) => {
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
              <li>{preview.feeStudentScholorship}</li>
            </ul>
            <ul>
              <li>Discount(INR)</li>
              <li>{preview.feeStudentDiscount}</li>
            </ul>
            <ul>
              <li>Convenience(3%)</li>
              <li>{preview.paymentType !== "Manual" ? ((preview.totalAmount) - preview.feeStudentDiscount + preview.feeStudentScholorship) * 3 / 100 : 0}</li>
            </ul>
            <ul className="seperator">
              <li>
                <hr />
              </li>
            </ul>
            {preview.paymentType === "Manual" ? <ul>
              <li className="w-600">Total</li>
              <li className="w-600">₹{preview.totalAmount - preview.feeStudentDiscount - preview.feeStudentScholorship}</li>
            </ul> :
              <ul>
                <li className="w-600">Total</li>
                <li className="w-600">₹{(preview.totalAmount - preview.feeStudentDiscount - preview.feeStudentScholorship) + ((preview.totalAmount) - preview.feeStudentDiscount + preview.feeStudentScholorship) * 3 / 100}</li>
              </ul>}
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

export default PreviewPaidFee