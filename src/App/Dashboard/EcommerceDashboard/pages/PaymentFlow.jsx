import React from 'react'
import './paymentFlow.scss';
import "./sidebar.scss";
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';
import CodPaymentFlow from "./PaymentFlow/Cod"
import RazorPayPayement from './PaymentFlow/RazorPayPayement';
import CircleButton from '../../../BuisnessDashboard/DashboardSetting/SettingComponents/CircleButton/CircleButton'
const PaymentFlow = () => {

  return (
    <React.Fragment>
      <div className='paymentFlow-container'>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/ecommerce/payments/default/id" title="Accept Payments" />
        </Breadcrumb>
        <div className='heading-div'>
          <div className="heading-wrap">
            <CircleButton position={'left'} path={'/'} />
            <div>
              <p className='text-md w-600 base mt-15'>Accept Payments</p>
              <p className='text-xxs w-400 base mt-5'>Manage your payments settings here to receive payments from customers and clients.</p>
            </div>
          </div>
          <hr className='mt-20 lgray' />
        </div>
        <div className='paymentFlow-input-wrapper'>
          <CodPaymentFlow />
          <RazorPayPayement />

        </div>
      </div>
    </React.Fragment>
  );
}
export default PaymentFlow;