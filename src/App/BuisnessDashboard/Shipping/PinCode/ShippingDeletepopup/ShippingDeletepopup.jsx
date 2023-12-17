import React, { forwardRef } from 'react'
import Dialog from '../../../../../Common/Dialog'
import DialogBody from '../../../../../Common/Dialog/DialogBody'
import FormError from '../../../../../Common/Form/FormError'
import FormTextArea from '../../../../../Common/Form/FormTextArea'

const ShippingDeletepopup = ({ onCloseCancel, cancelBokingRef, deleteZone }) => {
  const closeModel = () => {
    cancelBokingRef.current.close()

  }
  return (
    <div>
      <Dialog ref={cancelBokingRef} Position="center" slide="center" ClosePopUp={closeModel}>
        <DialogBody>
          <h3 className="text-s w-500 base mb-10">Delete Account</h3>
          <hr />
          <h5 className="text-xs w-400 base mb-20 mt-15"> Do you really wish to delete the zone created?</h5>
          <form className="cancelBooking-wrap">

            <div className="inline end-xs">
              <div className="button_group">
                <button className="button button-o-gray btn-xs" type="button" onClick={closeModel}>No</button>
                <button className="button button-red btn-xs" type="button" onClick={deleteZone}>Yes </button>
              </div>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </div >
  )
}

export default ShippingDeletepopup