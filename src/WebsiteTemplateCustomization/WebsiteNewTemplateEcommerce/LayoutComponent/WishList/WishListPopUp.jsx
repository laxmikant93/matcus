import React from 'react'
import Modals from '../../../../Common/Modals'
import ModalHeader from '../../../../Common/Modals/ModalsHeader'
import ModalBody from '../../../../Common/Modals/ModalsBody'
import './wishlist.scss';
import FormError from '../../../../Common/Form/FormError';
import SuccessMessagePopup from '../../../../Common/SuccessMessagePopup';

const WishListPopUp = ({ wishListRef, close }) => {
  const closeHandle = () => {
    close()
  }
  return (
    <Modals ref={wishListRef} Position="center" slide="top" ClosePopUp={() => closeHandle()} ModalsSize={'modal-s'}>
      {/* <ModalHeader title={'Order Reject Confirmation'} /> */}
      <ModalBody>
        <div className="WishListPopUp-headWrap">
          <div className="Product-img">
            <img src="https://images.unsplash.com/photo-1594409855476-29909f35c73c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" alt="" />
          </div>
          <div className="Product-details">
            <h2 className="title">Relaxed Fit Orange Cotton Tshirts Women</h2>
            <p className="price-details">
              <span className="price">Rs.1,299.00</span>
              <strike className="less-price">Rs.1,999.00</strike>
              <span className="discount">(35% OFF)</span>
            </p>
          </div>
        </div>
        <div className="WishListPopUp-bodywrap">
          <form>
            <div className="Inputform-wrap">
              <label>Select Type</label>
              <select
                className='select-dropdown'
              >
                <option value='DTDC'>DTDC</option>
                <option value='FED'>FED EX</option>
                <option value='DELHIVERY'>DELHIVERY</option>

              </select>
              <FormError
                className="mt-5"
                show={false}
                error="please select shipping partner"
              />
            </div>
            <div className="Inputform-wrap">
              <label>Select Color</label>
              <select
                className='select-dropdown'
              >
                <option value='DTDC'>DTDC</option>
                <option value='FED'>FED EX</option>
                <option value='DELHIVERY'>DELHIVERY</option>

              </select>
              <FormError
                className="mt-5"
                show={false}
                error="please select shipping partner"
              />
            </div>
            <button className="button AddtoCard-btn">ADD TO CART</button>
          </form>
          <SuccessMessagePopup EcomSuccess="Ecommerce" />
        </div>

      </ModalBody>
    </Modals>
  )
}

export default WishListPopUp