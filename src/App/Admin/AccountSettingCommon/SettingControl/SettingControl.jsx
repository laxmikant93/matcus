import React from 'react'
import { useState } from 'react';
import FormError from '../../../../Common/Form/FormError';
import FormInput from '../../../../Common/Form/FormInput';
import FormTextArea from '../../../../Common/Form/FormTextArea';
import ChangePassword from '../ChangePassword/ChangePassword';
import DeactiveAccount from '../DeactiveAccount/DeactiveAccount';
import DeleteAccount from '../DeleteAccount/DeleteAccount';
import './settingControl.scss';
const SettingControl = () => {
  const [componentCollap, setComponentCollap] = useState("");

  // console.log(componentCollap, "kinewhc");

  return (
    <div className='settingContol-container'>
      <ChangePassword componentCollap={componentCollap} setComponentCollap={(val) => setComponentCollap(val)} />
      {/* Deactive Account */}
      {/* <DeactiveAccount /> */}
      {/* Delete Account */}
      <DeleteAccount componentCollap={componentCollap} setComponentCollap={(val) => setComponentCollap(val)} />

    </div>
  )
}

export default SettingControl