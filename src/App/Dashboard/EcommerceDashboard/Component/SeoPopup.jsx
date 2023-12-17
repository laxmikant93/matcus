import React, { useImperativeHandle, useState } from 'react'
import Dialog from '../../../../Common/Dialog'
import ModalsHeader from "../../../../Common/Modals/ModalsHeader";
import DialogBody from '../../../../Common/Dialog/DialogBody';
import './seoPopup.scss';
import AppLink from '../../../../Common/AppLink';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FormError from '../../../../Common/Form/FormError';


const SeoPopup = ({ onclose, openref,contactRef }) => {

  const history = useNavigate();
  const [createProductError, setCreateProductError] = useState(false);

  const closeModal = () => {
    onclose();
    setCreateProductError(false)
  }
  const [contact,setContact]=useState(false)
  const handleSave = () => {
    contactRef.current.contact=true
    contactRef.current.saveProduct()
    
  console.log(contactRef,"jjijijiji")
  }

  const handleCancel = () => {
    openref.current.close();
  }
  console.log(contactRef,"jjijijiji")
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
              show={contactRef?.current?.error
              }
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

export default SeoPopup