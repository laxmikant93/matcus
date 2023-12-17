import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import SwitchButton from '../../../../../../Common/Button/SwitchButton'
import CancellationPopup from './CancellationPopup'

const Cancellation = ({ oncancellationData }) => {

  const [cancellation, setCancellation] = useState(false)
  const [AllowCancellationDataNew, setAllowCancellationDataNew] = useState()

  const { productDetails, productDetailsSuccess } = useSelector((state) => {
    return {
      productDetails: state.productList.getSingleProduct.data,
      productDetailsSuccess: state.productList.getSingleProduct.success
    }
  })

  useEffect(() => {
    if (productDetails && productDetailsSuccess) {
      setCancellation(productDetails?.product?.allowCancellation)
    }
  }, [productDetails, productDetailsSuccess])


  const openpopup = useRef(null);
  const onOpenRejectOrder = (e) => {
    let inputChecked = e.target.checked;
    setCancellation(inputChecked)
    if (inputChecked === true) {
      openpopup.current.open()
    }
  }

  const onCloseRejectOrder = () => {
    openpopup.current.close()
  }

  const oncloseAndSwitchButton = (value) => {
    setCancellation(value)
  }

  const AllowCancellationData = (value1) => {
    oncancellationData(value1)
  }

  useEffect(() => {
    // if (AllowCancellationDataNew === "true") {
    // console.log("dasdasdads")
    // oncancellationData(AllowCancellationDataNew)
    oncancellationData(cancellation)

    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancellation])

  return (
    <React.Fragment>
      <div className='addProduct-container  sectionGap'>
        <div className='e-commerce-wrap'>
          <p className='sidebar-heading '>Cancellation</p>
          <hr className='horizontal-line' />
          <div className='sidebar-collection-wrap side-padding'>
            <div className='delivery-container'>
              <div className='text-div'>
                <p className='text-xs w-500 base'>Allow Cancellation</p>
              </div>

              <div className='switch-button'>
                <SwitchButton
                  checked={cancellation}
                  onChange={(e) => onOpenRejectOrder(e)}
                />
                {
                  <CancellationPopup openpopup={openpopup} onclose={onCloseRejectOrder} oncloseAndSwitchButton={oncloseAndSwitchButton} AllowCancellationData={AllowCancellationData} />
                }
              </div>
              {/* 
            <div className='switch-button'>
              {edit === true ?
                <DiscartPopUp onclose={() => oncloseDiscardPopup()} discartRef={discartRef} popuptext={true} editpopup={true} editId={editId} />
                :
                <DiscartPopUp onclose={() => oncloseDiscardPopup()} discartRef={discartRef} popuptext={true} />
              }
            </div> */}
            </div>
            <p className='text-3xs w-300 toogle-text'>Turn on the toggle button to allow users to cancel their order when they order this product</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Cancellation