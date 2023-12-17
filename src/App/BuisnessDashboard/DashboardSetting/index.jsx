import React from 'react';
import { useSelector } from 'react-redux';
import Breadcrumb from '../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem';
import CircleButton from './SettingComponents/CircleButton/CircleButton';
import SettingCard from './SettingComponents/SettingCard/SettingCard';
import './style.scss';

const DashboardSetting = () => {

  const { user } = useSelector((state) => {
    return {
      user: state.user,
    }
  })

  const LMSdata = [{
    id: 1,
    heading: 'Website Settings',
    settingData:
      [{
        id: 101,
        path: '/WebsiteSetting',
        icon: 'icon-website',
        title: 'Website Settings',
        subtitle: 'Manage your website settings like site’s name, URL, favicon and more.'
      }]

  },
  {
    id: 2,
    heading: 'Business Settings',
    settingData: [
      {
        id: 201,
        path: '/businesssetting',
        icon: 'icon-bussiness',
        title: 'Business Settings',
        subtitle: 'Provide your business name, contact info and more, so visitors can find you.'
      },
      {
        id: 202,
        path: '/mail-setting',
        icon: 'icon-policy',
        title: 'SMTP Mail Settings',
        subtitle: 'Register/Test your SMTP mail settings here'
      }
    ]
  }]

  const data = [
    {
      id: 1,
      heading: 'Website Settings',
      settingData: [
        {
          id: 101,
          path: '/ecommerce/websitesetting',
          icon: 'icon-website',
          title: 'Website Settings',
          subtitle: 'Manage your website settings like site’s name, URL, favicon and more.'
        },
        {
          id: 102,
          path: '/ecommerce/currency-and-language',
          icon: 'icon-currency',
          title: 'Currency & Language',
          subtitle: 'Manage your website’s language and currency here.'
        }
      ]
    },
    {
      id: 2,
      heading: 'Business Settings',
      settingData: [
        {
          id: 201,
          path: '/ecommerce/businesssetting',
          icon: 'icon-bussiness',
          title: 'Business Settings',
          subtitle: 'Provide your business name, contact info and more, so visitors can find you.'
        },
        {
          id: 202,
          path: '/ecommerce/policysetting',
          icon: 'icon-policy',
          title: 'Policy Settings',
          subtitle: 'Manage your policy settings, terms of service and more.'
        },
        {
          id: 202,
          path: '/ecommerce/mail-setting',
          icon: 'icon-policy',
          title: 'SMTP Mail Settings',
          subtitle: 'Register/Test your SMTP mail settings here'
        }
      ]
    },


  ]


  return (
    <React.Fragment>
      <div className='dashboardSetting-container'>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/ecommerce/settings" title="Settings" />
        </Breadcrumb>
        <div className='dashboard-heading-div'>
          <CircleButton position={'left'} path={'/'} className="mt-15"/>
          <div>
            <h1 className='text-md base w-600'>Settings</h1>
            <p className='text-2xs base w-400 mt-5'>Setup your website and business settings here.</p>
          </div>
        </div>
        <hr className='mt-20 ' />
        {user.user_business_type === "LMS" ?
          <SettingCard LMSdata={LMSdata} />
          :
          <SettingCard data={data} />
        }
      </div>
    </React.Fragment>
  )
}

export default DashboardSetting