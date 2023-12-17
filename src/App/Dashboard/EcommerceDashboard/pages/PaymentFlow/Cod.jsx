import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SwitchButton from "../../../../../Common/Button/SwitchButton";
import { getInstituteData, patchInstituteInfo } from "../../../../../store/actions/businessInfo";
import { useState } from 'react';
import '../paymentFlow.scss';
import "../sidebar.scss";
import Cod from '../../assets/icons/cod.png';
import { useEffect } from "react";
const CodPaymentFlow = () => {

  let dispatch = useDispatch();

  const { user, getbusinessInfoSuccess, getbusinessInfoData } = useSelector((state) => {
    return {
      user: state.user,
      getbusinessInfoSuccess: state.businessInfo.getInstituiteData.success,
      getbusinessInfoData: state.businessInfo.getInstituiteData.data,
    };
  })

  useEffect(() => {
    dispatch(getInstituteData(user.user_business, user.user_business_type))
  }, [])

  useEffect(() => {
    if (getbusinessInfoSuccess && getbusinessInfoData) {
      setCOD(getbusinessInfoData.cash_on_delivery_enabled)
      setCODLimitation(getbusinessInfoData.cod_price_limitation)
      setCODPriceLimit(getbusinessInfoData.cash_on_delivery_price_limit)
      setRazorPayID(getbusinessInfoData.razorpay_acount_id)
    }

  }, [getbusinessInfoSuccess, getbusinessInfoData])

  const [COD, setCOD] = useState(true);
  const [hideDoneButton, setHideDoneButton] = useState(false);
  const [CODLimitation, setCODLimitation] = useState(false);
  const [CODPriceLimit, setCODPriceLimit] = useState("");
  const [razorpay_id, setRazorPayID] = useState("");

  const handleCODSetting = (e) => {
    let inputChecked = e.target.checked;
    if (razorpay_id) {
      if (inputChecked) {
        setCOD(true);
        dispatch(patchInstituteInfo(user.user_business, { cash_on_delivery_enabled: true }, user.user_business_type))
      }
      else {
        setCOD(false);
        dispatch(patchInstituteInfo(user.user_business, { cash_on_delivery_enabled: false }, user.user_business_type))
      }
    }
    else {
      if (inputChecked) {
        setCOD(true);
        dispatch(patchInstituteInfo(user.user_business, { cash_on_delivery_enabled: true }, user.user_business_type))
      }
      else {
        setCOD(false);
      }
    }
  }

  const handleDoneButton = () => {
    dispatch(patchInstituteInfo(user.user_business, { cash_on_delivery_price_limit: CODPriceLimit, cod_price_limitation: true }, user.user_business_type))
    setHideDoneButton(true);
  }

  const handleInput = (e) => {
    setCODPriceLimit(e.target.value);
    setHideDoneButton(false);
  }

  const handleCODPriceLimitSettings = (e) => {
    if (e.target.checked) {
      setCODLimitation(true);
      setHideDoneButton(false);
    }
    else {
      setCODLimitation(false);
      dispatch(patchInstituteInfo(user.user_business, { cod_price_limitation: false }, user.user_business_type))
    }
  }

  return (
    <React.Fragment>
      <div className='cod-wrapper'>
        <div className='cod-leftSidebar'>
          <div className='cod-icon-div'>
            <img src={Cod} alt="codIcon" />
          </div>
          <div className='cod-text-div'>
            <h5 className='text-s w-400 base'> Cash on Delivery</h5>
            <p className='text-xxs w-300 lgray'>Add Cash on delivery to accept cash, check or other custom forms of payment. </p>
          </div>
        </div>
        <div className='cod-rightSidebar cod-position-relative'>
          <div className='switch-button '>
            <SwitchButton
              checked={COD}
              onChange={(e) => handleCODSetting(e)}
            />
          </div>
        </div>
      </div>

      {
        COD &&
        <div className='cod-leftSidebar inline  align-center mt-25 confirmation-div'>
          <div className='cod-text-div confirmation-cod-text-div inline align-center'>
            <input type="checkbox" checked={CODLimitation === true} onChange={handleCODPriceLimitSettings} />
            <p className='text-xs w-300 base'>Do not allow cash on delivery if the product price exceeds over</p>
          </div>
          <div className='cod-icon-div payment-input-div'>
            {CODLimitation &&
              <>
                <div className='input-item'>
                  <input type="number" value={CODPriceLimit} onChange={handleInput} /><span>₹</span>
                  <button className={`button btn-sm button-primary ${hideDoneButton ? "buttonHide" : ''}`} onClick={handleDoneButton} >Done</button>
                </div>
              </>
            }
          </div>
        </div>
      }
    </React.Fragment>
  )
}
export default CodPaymentFlow