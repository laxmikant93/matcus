import React from 'react';
import Modals from '../../../../Common/Modals/index'
import ModalHeader from '../../../../Common/Modals/ModalsHeader'
import ModalBody from '../../../../Common/Modals/ModalsBody'

import SwitchButton from '../../../../Common/Button/SwitchButton';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstituteData, getInstituteDataReset, patchInstituteDataReset, patchInstituteInfo } from '../../../../store/actions/businessInfo';
import { useEffect } from 'react';
import './settingsPopup.scss';
import SelectDropDown from '../../../../Common/SelectDropDown';

const SettingsPopup = ({ openref, onclose }) => {

  const dispatch = useDispatch();

  const { user, patchBusinessInfoSuccess, getInstituteInfoData, getInstituteInfoSuccess } = useSelector((state) => {
    return {
      user: state.user,
      patchBusinessInfoSuccess: state.businessInfo.patchInstituteInfo.loaded,
      getInstituteInfoSuccess: state.businessInfo.getInstituiteData.success,
      getInstituteInfoData: state.businessInfo.getInstituiteData.data,
    }
  })

  const [reviewToggle, setReviewToggle] = useState(true);
  const [writeReviewOption, setWriteReviewOption] = useState("Anyone can write a review");
  const [showValue, setShowValue] = useState("Anyone can write a review");
  const [disableDropdown, setDisableDropdown] = useState(false);
  const SelectValue = ['Anyone can write a review', 'Only those who have bought the product'];

  const closeModal = () => {
    onclose();
    dispatch(getInstituteDataReset());
  }

  const handleSelect = (value) => {
    if(value === "Anyone can write a review"){
      setWriteReviewOption("anyone");
    }
    else{
      if(value ==="Only those who have bought the product"){
        setWriteReviewOption("buyer");
      }
    }
    // setWriteReviewOption(value);
  }

  const handleSwitchButton = (e) => {
    if (e.target.checked) {
      setReviewToggle(true);
    }
    else {
      setReviewToggle(false);
    }
  }

  const handleSaveButton = () => {
    let data = reviewToggle ? writeReviewOption : "none";
    dispatch(patchInstituteInfo(user.user_business, { write_review: data }, user.user_business_type));
  }

  // useEffect(() => {
  //   dispatch(getInstituteData(user.user_business, user.user_business_type))
  // }, [dispatch, user.user_business, user.user_business_type])

  useEffect(() => {
    if (getInstituteInfoSuccess && getInstituteInfoData && getInstituteInfoData.write_review) {
      if (getInstituteInfoData.write_review === "none") {
        setReviewToggle(false);
      }
      else {
        setReviewToggle(true);
        setWriteReviewOption(getInstituteInfoData.write_review);
        if(getInstituteInfoData.write_review ==="anyone"){
          setShowValue("Anyone can write a review");
        }
        else{
          setShowValue("Only those who have bought the product");
        }
      }
    }
  }, [getInstituteInfoData, getInstituteInfoSuccess])

  useEffect(() => {
    if (patchBusinessInfoSuccess) {
      closeModal();
    }
    return () => {
      dispatch(patchInstituteDataReset());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, patchBusinessInfoSuccess])

  const handleCancelButton = () => {
    closeModal();
  }

  useEffect(()=>{
    if(!reviewToggle){
      setDisableDropdown(true);
    }
    else{
      setDisableDropdown(false);
    }
  },[reviewToggle])

  return (
    <Modals ref={openref} Position="center" slide="center" ClosePopUp={() => closeModal()} ModalsSize={'modal-s'}>
      <ModalHeader title={'Review Settings'}>  </ModalHeader>
      <ModalBody>
        <div className='settingpopUp-container'>
          <div className='setting-toggle-wraper'>
            <p className='text-xs w-500 base'>Turn On/Off Reviews</p>
            <SwitchButton onChange={handleSwitchButton} checked={reviewToggle} />
          </div>
          <div className='settingpopUp-SelectWrapper'>
            <p className='text-xs w-500 base'>Select who can write a review</p>
            {/* <select onChange={handleSelect} value={writeReviewOption} disabled={!reviewToggle}>
                <option value="anyone">Anyone can write a review</option>
                <option value="buyer">Only those who have bought the product</option>
              </select> */}
            <SelectDropDown values={SelectValue} handleSelect={handleSelect} showValue={showValue} disabled={disableDropdown} />
          </div>
          {/* aria-disable will be true when button is disable */}
          <div className='settingpopup-btn-wrapper'>
            <button className='button btn-xs button-o-silver btn-oval button-block'
              onClick={handleCancelButton}
            >
              Cancel
            </button>
            <button className='button btn-xs button-primary btn-oval button-block '
              onClick={handleSaveButton}
            >
              Save
            </button>
          </div>
        </div>
      </ModalBody>

    </Modals>

  )
}

export default SettingsPopup