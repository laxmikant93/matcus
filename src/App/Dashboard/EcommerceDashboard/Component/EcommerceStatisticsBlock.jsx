import React from 'react'

const EcommerceStatisticsBlock = ({ data }) => {
  return (
    <React.Fragment>
      <div className='order-section-warp'>
        <div className='image-div'>
          <div className='order-btn-square'><img src={data.icon} alt="icon" className='order-image-left' /></div>
        </div>
        <div className='text-div'>
          <h3 className='text-md w-600 text-center'>{data.status === 'payment' ? <span>	&#8377;</span> : ''}{data.number}</h3>
          <p className='mt-5 text-regf w-500'>{data.text}</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default EcommerceStatisticsBlock