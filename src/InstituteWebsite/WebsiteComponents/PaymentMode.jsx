import React from 'react'
import PaymentModeItem from './PaymentModeItem'
import { array, string } from 'prop-types'

function PaymentMode({ title, type, options }) {

  function payoption(optionDetail) {
    switch (type) {
      case "bank":
        return <React.Fragment>
          <PaymentModeItem title="A/C Name" subtitle={optionDetail.bankDetails.acname} />
          <PaymentModeItem title="A/C Number" subtitle={optionDetail.bankDetails.acnumber} />
          <PaymentModeItem title="IFSC Code" subtitle={optionDetail.bankDetails.ifscCode} />
          <PaymentModeItem title="Bank Name" subtitle={optionDetail.bankDetails.bankname} />
          <PaymentModeItem title="Branch Name" subtitle={optionDetail.bankDetails.branchname} />
          <PaymentModeItem title="Branch Address" subtitle={optionDetail.bankDetails.branchaddress} />
        </React.Fragment>

      case "upi":
        return <React.Fragment>
          <PaymentModeItem title="UPI Name" subtitle={optionDetail.addUpi.merchantID} />
          <PaymentModeItem title="Merchant Name" subtitle={optionDetail.addUpi.name} />
          <PaymentModeItem title="Merchant Mobile" subtitle={optionDetail.addUpi.merchantmobile} />
          <PaymentModeItem title="QR code OR Scanner" image={optionDetail.addUpi.upload} />
        </React.Fragment>

      case "cheque":

        return <React.Fragment>
          <PaymentModeItem title="Bank Name" subtitle={optionDetail.cancelledCheque.bankname} />
          <PaymentModeItem title="Pay To " subtitle={optionDetail.cancelledCheque.payto} />
          <PaymentModeItem title="Sample Cheque" image={optionDetail.cancelledCheque.upload} />
        </React.Fragment>

      case "paypal":
        return <React.Fragment>
          <PaymentModeItem title="PayPal Email" subtitle={optionDetail.addPaypal.email} />
          <PaymentModeItem title="PayPal ID" subtitle={optionDetail.addPaypal.id} />
          <PaymentModeItem title="PayPal Code" subtitle={optionDetail.addPaypal.code} />
        </React.Fragment>

      default:
        break;
    }
  }


  return (
    <div className="PAM-BankTransfer mt-20">
      <p className="subheading">{title}</p>
      {
        options.length > 0 ?
          options.map((option, optionIndex) => <React.Fragment>
            <ul className="mt-15">
              {payoption(option.paymentModeData)}
            </ul>
            {optionIndex > 0 && <div className="divider"></div>}
          </React.Fragment>
          )
          :
          <div>NA</div>
      }

    </div>
  )
}

PaymentMode.defaultProps = {
  title: undefined,
  options: []
}

PaymentMode.propTypes = {
  title: string,
  options: array
}

export default PaymentMode
