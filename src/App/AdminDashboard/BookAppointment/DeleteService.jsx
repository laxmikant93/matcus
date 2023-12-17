import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '../../../Common/Dialog';
import DialogBody from '../../../Common/Dialog/DialogBody';
import { deleteService } from '../../../store/actions/bookAppointment';
import "./bookAppointment.style.scss"

const DeleteService = ({ popupClosehandle, deleteServiceRef, services }) => {


  const [serviceId, setServiceId] = useState()
  const { businesstype } = useSelector((state) => {
    return {
      businesstype: state.user.user_business_type
    }
  })

  useEffect(() => {
    setServiceId(services)
  }, [services])

  const closeModel = () => {
    popupClosehandle()
  }

  const dispatch = useDispatch();

  const handleDeleteUser = () => {
    dispatch(deleteService(services, businesstype));
    popupClosehandle()

  };
  return (
    <Dialog ref={deleteServiceRef} Position="center" slide="center" ClosePopUp={closeModel}>
      <DialogBody>
        <div>
          <h2 className="text-sm w-400 base mb-20"> You are about to remove this services.</h2>
          <h3 className="text-s w-400 base"> Are you sure?</h3>
        </div>
        <div className="inline end-xs">
          <div className="button_group">
            <button className="button btn-o-primary btn-xs" type="button" onClick={closeModel} >Cancel</button>
            <button className="button button-primary btn-xs" type="button" onClick={handleDeleteUser}>Remove</button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  )
}

export default DeleteService