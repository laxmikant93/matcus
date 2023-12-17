import React from 'react';
import RadioAddress from '../Address/RadioAddress';
import './addressList.scss';
import DeleteConfirmPop from '../DeleteConfirmPop/DeleteConfirmPop';
import { useState } from 'react';


const AddressList = ({ address }) => {
  const [deletePop, setDeletePop] = useState(false);
  const handleOpenPop = () => {
    setDeletePop(true)
  }
  return (
    <React.Fragment>
      <div className='addressList-container'>
        <h3 className='addressList-para'>Select Devilery Address</h3>
        <div className='adddress-div'>
          <div className='address-wrapper'>
            <RadioAddress {...address[0]} />
            <div className='edit-btn-wrap'>
              <button className='edit-btn'>Edit</button>
              <button className='edit-btn' onClick={handleOpenPop}>Remove</button>
              {
                deletePop && <DeleteConfirmPop onClosePop={setDeletePop} />
              }
            </div>
          </div>
          <div className='otherAddress-div'>
            <p>OTHER ADDRESS</p>
          </div>
          <>
            {
              address.slice(1).map(({ id, ...options }) => {
                return (
                  < div className='address-wrapper'>
                    <RadioAddress key={id} {...options} />
                    <div className='edit-btn-wrap'>
                      <button className='edit-btn'>Edit</button>
                      <button className='edit-btn'>Remove</button>
                    </div>
                  </div>
                )
              })

            }
          </>
        </div>
        <div className='bottom-btn-wrapper'>
          <button className='buttonTrue btnTrue-o-primary btn-xs '>ADD NEW ADDRESS</button>
        </div>
      </div>

    </React.Fragment >
  )
}

export default AddressList