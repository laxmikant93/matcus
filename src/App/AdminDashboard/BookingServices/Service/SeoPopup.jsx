import React, { useState } from 'react'
import Dialog from '../../../../Common/Dialog'
import ModalsHeader from "../../../../Common/Modals/ModalsHeader";
import DialogBody from '../../../../Common/Dialog/DialogBody';
import "./ServiceSlug.scss"
import AppLink from '../../../../Common/AppLink';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FormError from '../../../../Common/Form/FormError';


const SeoServicePopup = ({handleSubmit,handleUpdate, onclose, openref,HandleSaveDetails, createProductHandler, editProductHandler, productDetail }) => {

  const history = useNavigate();
  const { id, state } = useParams();
  const [createProductError, setCreateProductError] = useState(false);

  const closeModal = () => {
    onclose();
    setCreateProductError(false)
  }
  console.log(id,"line23")
  const handleSave = () => {
    if(id && window.location.pathname.includes('serviceId')){
      handleUpdate()
      history("/marketing-form")
      HandleSaveDetails()
    }else{
      handleSubmit()
      HandleSaveDetails()
      history("/marketing-form")
    }
    // setCreateProductError(false)
    // } else {
    //   setCreateProductError(true)
    // }
  }

  const handleCancel = () => {
    openref.current.close();
  }

  // const handleUpdate = () => {
  //   if (editProductHandler()) {
  //     history(`o`)
  //     setCreateProductError(false)
  //   } else {
  //     setCreateProductError(true)
  //   }
  // }
  // console.log(createProductError, "cretae")
  return (
    <React.Fragment>
      <div className='teete'>
        <Dialog ref={openref} >
          <DialogBody>
            <p className='text-s w-400 base'>Save unsaved changes</p>
            <div className='divider'></div>
            <p className='text-xs w-400 base mt-20 mb-20'>You’ve made some changes. Are you sure want to discard them?</p>
            <FormError
              show={createProductError}
              error="Please fill required information of the product."
            />
            <div className='seoPop-btn-wrapper mt-15'>
              <button className='button btn-o-base btn-xs' onClick={handleCancel}> Continue editing</button>
              {/* {
                productDetail ? <button className='button btn-xs seo-btns btn-save' onClick={handleUpdate}> Update changes</button> :
                  <button className='button btn-xs seo-btns btn-save' onClick={handleSave}> Save changes</button>
              } */}

              <button className='button button-primary btn-xs' onClick={handleSave}> Save changes</button>
            </div>
          </DialogBody>
        </Dialog>
      </div>
    </React.Fragment>
  )
}

export default SeoServicePopup