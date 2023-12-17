import React, { useEffect, useState } from 'react'
import './guestpayment.scss'
import GuestloginStepper from '../GuestloginStepper/GuestloginStepper'
import RozarPay from '../../../assets/images/rozarPay.png';
import { useDispatch, useSelector } from 'react-redux';
import Cod from '../../../assets/images/codimage.png';
import DesiableCod from '../../../assets/images/cod.png';
import { getInstituteData } from '../../../../../store/actions/businessInfo';
import { useNavigate } from 'react-router-dom';
import { getGuestCartDetail } from '../../../../../store/actions/ecommerce/action/guestIndex';


const GuestPayment = ({ modeData }) => {
  const [paymentMode, setPaymentMode] = useState("");

  let dispatch = useDispatch();
  const history = useNavigate();

  const { getbusinessInfoSuccess, getbusinessInfoData, subdomainuser, customerCartData,
    customerCartSuccess, businessInfoData, businessInfoSuccess, guestCustomerCartData, guestCustomerCartsuccess
  } = useSelector((state) => {
    return {
      // user: state.user,
      subdomainuser: state.subdomainuser,
      getbusinessInfoSuccess: state.businessInfo.ecomWebsite.success,
      getbusinessInfoData: state.businessInfo.ecomWebsite.data,
      guestCustomerCartData: state.guestDataReducer.guestCustomerCart.data,
      guestCustomerCartsuccess: state.guestDataReducer.guestCustomerCart.success,

      customerCartData: state.orderCartList.customerCart.data,
      customerCartSuccess: state.orderCartList.customerCart.success,
      businessInfoSuccess: state.businessInfo.ecomWebsite.success,
      // businessinfo: state.businessInfo.getInstituiteData.data,
      businessInfoData: state.businessInfo.ecomWebsite.data,
      
    };
  })

  useEffect(() => {
    if (localStorage.getItem("Uuid_For_Guest_Login") && businessInfoSuccess && businessInfoData) {
      let guestUuidData = localStorage.getItem("Uuid_For_Guest_Login");
      dispatch(getGuestCartDetail(guestUuidData, businessInfoData._id));
    }

  }, [businessInfoData, businessInfoSuccess, dispatch]);

  // console.log(guestCustomerCartData, "guestCustomerCartData")

  useEffect(() => {
    if (getbusinessInfoSuccess && getbusinessInfoData.razorpay_acount_id) {
      setPaymentMode("Razorpay");
    }
    else {
      setPaymentMode("cashOnDelivery");
    }
  }, [getbusinessInfoSuccess, getbusinessInfoData])

  useEffect(() => {
    dispatch(getInstituteData(subdomainuser.user_business, subdomainuser.user_business_type));
  }, [dispatch, subdomainuser.user_business, subdomainuser.user_business_type])

  // const handlePaymentMode = (value) => {
  //   console.log(value, "value")

  //   if (value === "cashOnDelivery") {

  //     setPaymentMode("cashOnDelivery");
  //     modeData("cashOnDelivery")
  //   } else {
  //     setPaymentMode("Razorpay");
  //   }
  // }

  useEffect(() => {
    if (getbusinessInfoSuccess && getbusinessInfoData.razorpay_acount_id) {
      setPaymentMode("Razorpay");
      modeData("Razorpay")

    }
    else {
      setPaymentMode("cashOnDelivery");
      modeData("cashOnDelivery")

    }
  }, [getbusinessInfoSuccess, getbusinessInfoData])


  const handlePaymentMode = (value) => {

    if (value === "cashOnDelivery") {

      setPaymentMode("cashOnDelivery");
      modeData("cashOnDelivery")
    }
    else if (getbusinessInfoData.razorpay_acount_id) {
      setPaymentMode(value);
      modeData(value)

    }
  }
  let totalPrice = guestCustomerCartData.DiscountedPrice < getbusinessInfoData.cash_on_delivery_price_limit;
  const totalCartItem = guestCustomerCartsuccess && guestCustomerCartData.data.every((item) => item.product.cod === true)
  const isValidGlobleCod = getbusinessInfoSuccess && getbusinessInfoData.cash_on_delivery_enabled  && (getbusinessInfoData.cod_price_limitation === false)  && totalCartItem
  let isValidGlobleCodwithLimit = getbusinessInfoSuccess && getbusinessInfoData.cash_on_delivery_enabled && getbusinessInfoData.cod_price_limitation && totalCartItem && totalPrice


  const  desiableCashOnPayment = isValidGlobleCod || isValidGlobleCodwithLimit;

  // console.log(isValidGlobleCod,isValidGlobleCodwithLimit,guestCustomerCartData.data, "line108",totalCartItem)
  // console.log(desiableCashOnPayment ,isValidGlobleCodwithLimit,isValidGlobleCod,getbusinessInfoData.cash_on_delivery_price_limit >  totalPrice,"line99")
  // console.log(desiableOnlinePayment,getbusinessInfoData,guestCustomerCartData,totalPrice,totalCartItem,"line99")
  // console.log(getbusinessInfoData?.cash_on_delivery_enabled === false, "paymentModepaymentModepaymentModepaymentModepaymentMode")
  return (
    <div className='guestpayment-wrapper'>
      <GuestloginStepper />
      <div className='guest-payment-div-wrapper'>
        {/* razorpay mode */}
        <div className={`paymentMode-container ${paymentMode === "Razorpay" ? 'payment-active-border' : ''}`} aria-disabled={!getbusinessInfoData.razorpay_acount_id} onClick={() => handlePaymentMode("Razorpay")}>
          <div className='rozarpay-radio'>
            {!getbusinessInfoData.razorpay_acount_id ?
              <input type='radio' id='paymentMode' name='paymentMode' className='change-address-radio'
                checked={paymentMode === "Razorpay"}
                disabled
              />
              :
              <input type='radio' id='paymentMode' name='paymentMode' className='change-address-radio'
                checked={paymentMode === "Razorpay"}
                onChange={() => handlePaymentMode("Razorpay")}
              />
            }
          </div>
          <div>
            <div className='inline '>
              <div className='payment-container-img'>
                <img src={RozarPay} alt="" className='imgFilter' />
              </div>
              <div className='paymentMode-container-text-div'>
                <p className='paymentMode-container-text'> <i>Razorpay</i> </p>
              </div>
            </div>
            <p className='text-2xs'>Site: www.razorpay.com</p>
          </div>
        </div>


        {/* cash on delivery mode */}
        <div className={`paymentMode-container ${paymentMode === "cashOnDelivery" ? 'payment-active-border' : ''}  ${desiableCashOnPayment ? "" : "desiable"}`} onClick={() => handlePaymentMode('cashOnDelivery')}>
          <div className='rozarpay-radio'>
            <input type='radio' id='paymentMode' name='paymentMode' className='change-address-radio'
              checked={paymentMode === "cashOnDelivery"}
              onChange={() => handlePaymentMode('cashOnDelivery')}
              disabled={!desiableCashOnPayment}
            />
          </div>
          <div>
            <div className='inline'>
              <div className='paymentMode-container-text-div'>
                <p className='paymentMode-container-text desiable-title'><img src={ desiableCashOnPayment ? Cod : DesiableCod} alt="" className='codIcon' /> Cash On Delivery </p>
              </div>
            </div>


            {
              desiableCashOnPayment
                ?
                <p className='text-2xs text-desiable2 desiable-subtitle'>Pay on delivery</p>
                :
                <p className='info-text text-2xs desiable-subtitle'>COD is not available on this product.</p>

            }



          </div>
        </div>
      </div>
    </div>
  )
}

export default GuestPayment