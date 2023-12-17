import { string } from 'prop-types'
import React from 'react'
import ImageViewer from '../../Common/ImageViewer'

const PaymentModeItem = ({ title, subtitle, image }) => {

  if (!title && !subtitle) {

    return <React.Fragment></React.Fragment>
  }

  return (
    <li>
      <p className="text-xs w-500">{title}</p>
      <p className="sub-heading text-xxs w-600">{subtitle}</p>
      {image && <p className="sub-heading text-xxs w-600">
        <ImageViewer object={image} alt="QR code/Other" height={160} width={120}/>
        {/* <img src={image} alt="QR code/Other" height={160} width={120} /> */}
      </p>}
    </li>
  )
}

PaymentModeItem.defaultProps = {
  title: undefined,
  subtitle: undefined,
  image: undefined
}


PaymentModeItem.propTypes = {
  title: string,
  subtitle: string,
  image: string
}


export default PaymentModeItem
