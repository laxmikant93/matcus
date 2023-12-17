import React from 'react'
import SwitchButton from '../../../../../../Common/Button/SwitchButton'

const Return = () => {
  return (
    <React.Fragment>
      <div className='addProduct-container  sectionGap'>
        <div className='e-commerce-wrap'>
          <p className='sidebar-heading '>Returns</p>
          <hr className='horizontal-line' />
          <div className='sidebar-collection-wrap side-padding'>
            <div className='delivery-container'>
              <div className='text-div'>
                <p className='text-xs w-500 base'>Allow Returns</p>
              </div>

              <div className='switch-button'>
                <SwitchButton
                />
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
            <p className='text-3xs w-300 toogle-text'>Turn on the toggle button to allow returns/refunds for this product</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Return