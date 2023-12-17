import React, { useEffect, useState } from 'react';
import RadioAddress from '../../CommonComponent/CommonJsx/Address/RadioAddress';
// import AddressList from '../../CommonComponent/CommonJsx/AddressList/AddressList';
import AddressPopUp from '../../CommonComponent/CommonJsx/AddressPopUp/AddressPopUp';
import DeleteConfirmPop from '../../CommonComponent/CommonJsx/DeleteConfirmPop/DeleteConfirmPop';
import './savedAddress.scss';

const SavedAddress = () => {
  const [showModal, setShowModal] = useState(false);
  //  add address modal 
  const cartModal = () => {
    setShowModal(!showModal);
  }
  const cartModalClose = () => {
    setShowModal(false);
  };

  const [deletePop, setDeletePop] = useState(false);
  const handleOpenPop = () => {
    setDeletePop(true)
  }

  const address = [
    {
      id: 2,
      name: "taran kolhi",
      line1: "Edneed, 203, Tower C, Ithum Towers, Sector 62, Noida, Uttar Pradesh 201309",
      state: 'Uttar Pradesh ',
      pinCode: 201309,
      mobileNumber: 9192939495
    },
    {
      id: 1,
      name: "rajesh bhatt",
      line1: "Edneed, 203, Tower C, Ithum Towers, Sector 62, Noida, Uttar Pradesh 201309",
      state: 'Uttar Pradesh ',
      pinCode: 201309,
      mobileNumber: 9192939495
    },
    {
      id: 3,
      name: "rajesh bhatt",
      line1: "Edneed, 203, Tower C, Ithum Towers, Sector 62, Noida, Uttar Pradesh 201309",
      state: 'Uttar Pradesh ',
      pinCode: 201309,
      mobileNumber: 9192939495
    },
    {
      id: 4,
      name: "rajesh bhatt",
      line1: "Edneed, 203, Tower C, Ithum Towers, Sector 62, Noida, Uttar Pradesh 201309",
      state: 'Uttar Pradesh ',
      pinCode: 201309,
      mobileNumber: 9192939495
    },
  ];

  // page scroll to top

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <React.Fragment>
      <div className='containerTrue pb-45 '>
        <div className='saveAddress-container'>
          <h4 className='savedAddress-heading'><span><span className='heading-arrow'>&#10229;</span></span>Back to My Account</h4>
          <div className='savedAddress-wrapper'>
            <div className='savedAddress-select-address'>
              <h3 className='select-address-p'>Select Devilery Address </h3>

              {/* hide this button when no address is listed */}
              <button className='buttonTrue btnTrue-o-primary btn-sm'>ADD ADDRESS</button>
            </div>
            {
              address.length < 1 ? (
                <>
                  <div className='cart-address-container'>
                    <div className='cart-add-left'>
                      <p className='no-delivery-p'>No Delivery Address</p>
                    </div>
                    <div className='cart-address-right'>
                      <button className='buttonTrue btnTrue-o-primary btn-sm' onClick={cartModal}>ADD ADDRESS</button>

                      <AddressPopUp onClose={cartModalClose} show={showModal} />

                    </div>
                  </div>
                </>
              ) : (
                <div className='savedAddress-address-list'>
                  {
                    address.map(({ id, ...address }) => {
                      return (
                        < div key={id} className='address-wrapper'>
                          <RadioAddress showFullAddress={true} {...address} />
                          <div className='edit-btn-wrap'>
                            <button className='edit-btn'>Edit</button>
                            <button className='edit-btn' onClick={handleOpenPop}>Remove</button>
                            {
                              deletePop && <DeleteConfirmPop onClosePop={setDeletePop} />
                            }
                          </div>
                        </div>
                      )
                    })
                    // < React.Fragment >

                    // </React.Fragment>
                  }
                </div>

              )

            }
          </div>
        </div>
      </div>
    </React.Fragment >
  )
}

export default SavedAddress