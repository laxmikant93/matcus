import React from 'react';
import FormInput from '../../../Common/Form/FormInput';
import './accountSetting.scss';
import SingleSelectDropdown from '../../../Common/Form/MultipleSelectDropdown'
import SelectInput from '../../../Common/Form/SelectInput';
import CardBody from '../../../Common/Card/CardBody';
import Card from '../../../Common/Card';
import { useState } from 'react';
import PersonalSetting from './PersonalSetting/PersonalSetting';
import Breadcrumb from '../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem';
import MessageDisplay from './MessageDisplay/MessageDisplay';
import SettingControl from './SettingControl/SettingControl';

const AccountSetting = () => {
  const [tabCount, setTabCount] = useState(1);
  const handleChnageTab = (index) => {
    setTabCount(index)
  }
  return (
    <React.Fragment>
      <div className='accountSetting-wrap'>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
          <BreadcrumbItem to="/account-setting" title="Account Settings" />
        </Breadcrumb>
        <div className='accountSetting-heading-wrap'>
          <div className='heading-wrap-leftSide'>
            <h2 className='text-md w-600 base'>Account Settings</h2>
            <p className='text-2xs w-400 base'>Manage your account passwords and settings here</p>
          </div>
          <div className='accountSetting-right'>
            {/* for success send type 'success'
             for erroer send type 'error' */}

          </div>
        </div>
        <div className='hr-line'> </div>
        <div className='accountSetting-container'>
          {/* <FormInput
          type={'text'}
          label={'hello'}
          placeholder={'enter name'}
          labelPosition="top"
        />
        <SelectInput
          label={'testing'}
        />
        <h1>hello this is testing</h1> */}
          <Card className={'card'}>
            <CardBody className={'card-body'}>
              <div className='card-tab-container'>
                <div className={`card-tab ${tabCount === 1 ? 'tab-active' : 'tab-inActive'} `} onClick={() => handleChnageTab(1)}>
                  <div className='tab-btn tab-btn-active'>Personal</div>
                </div>
                <div className={`card-tab ${tabCount === 2 ? 'tab-active' : 'tab-inActive'} `} onClick={() => handleChnageTab(2)}>
                  <div className='tab-btn '>Settings</div>
                </div>
              </div>
              <div className='card-container'>
                {
                  tabCount === 1 &&
                  <div className='personalSetting-container'>
                    <PersonalSetting />
                  </div>
                }
                {
                  tabCount === 2 &&
                  <div className='changeSetting-container'>
                    <SettingControl />
                  </div>
                }
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AccountSetting