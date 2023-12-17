import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwitchButton from '../../../../../Common/Button/SwitchButton';
import { getMainBusinessCategory } from '../../../../../store/actions/bookAppointment';
import './showHeaderAndFooter.scss';

const ShowHeaderFooter = ({ outSideClickRef, showOnHeader, showOnFooter, handleshowOnFooter, handleshowOnHeader }) => {

  return (
    <div className='showHeaderFooter-container'>
      <div className='setting-content-wrap' ref={outSideClickRef}>
        <div className='showHeader-wrap'>
          <label className='switch-label' > Show on header menu</label>
          <SwitchButton
            checked={showOnHeader}
            onChange={handleshowOnHeader} />
        </div>
        <div className='showHeader-wrap showFooter'>
          <label className='switch-label' > Show on footer menu</label>
          <SwitchButton
            checked={showOnFooter}
            onChange={handleshowOnFooter} />
        </div>
      </div>
    </div>
  )
}

export default ShowHeaderFooter