import { toHaveValue } from '@testing-library/jest-dom/dist/matchers'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Storage from '../../../../Classes/Storage'
// import ValidationFile from '../../../../App/Auth/ValidationFile'
import ValidationUtils from '../../../../Classes/ValidationUtils'
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl'
import { convertToIndianFormat } from '../../../../CommonFunctions/helperFunction'
import { privateDomain } from '../../../../Constant/auth'
import { createOrderFromCart, getShippingDetails, resetShippingDetails } from '../../../../store/actions/ecommerce/action/cartOrder'
import { getGuestCartDetail, postAddressDetailsGuest, resetPostAddressDetailsGuest, updateShippingPrice } from '../../../../store/actions/ecommerce/action/guestIndex'
import { priceCalculator } from '../../CommonComponent/commonFunction/PriceCalculator'
import DeliveryNotAvailableToast from '../../CommonComponent/CommonJsx/DeliveryNotAvailable/DeliveryNotAvailableToast'
import Shipping from '../../CommonComponent/CommonJsx/Shipping/Shipping'
// import GuestOrderDetail from './GuesrOrderDetail/GuestOrderDetail'
import './guestlogin.scss'
import GuestLoginForm from './GuestLoginForm/GuestLoginForm'
import GuestMyBag from './GuestMyBag/GuestMyBag'
import GuestPayment from './GuestPayment/GuestPayment'
import Image from './icon.png'

const GuestLogin = () => {
  const {
    user, subdomainuser, guestCustomerCartData, shippingDetailsSuccess, shippingDetails, guestCustomerCartsuccess, PostAddressDetailsSuccess, PostAddressDetailsData, businessInfoSuccess,
    businessInfoData, currency } = useSelector((state) => {
      return {
        user: state.user,
        subdomainuser: state.subdomainuser,
        guestCustomerCartData: state.guestDataReducer.guestCustomerCart.data,
        guestCustomerCartsuccess: state.guestDataReducer.guestCustomerCart.success,
        PostAddressDetailsSuccess: state.guestDataReducer.PostAddressDetails.success,
        PostAddressDetailsData: state.guestDataReducer.PostAddressDetails,
        businessInfoSuccess: state.businessInfo.ecomWebsite.success,
        // businessinfo: state.businessInfo.getInstituiteData.data,
        businessInfoData: state.businessInfo.ecomWebsite.data,
        currency: state.currencyList,
        shippingDetailsSuccess: state.orderCartList.shippingDetails.success,
        shippingDetails: state.orderCartList.shippingDetails.data
      }
    });
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Uuid_For_Guest_Login") && businessInfoSuccess && businessInfoData) {
      let guestUuidData = localStorage.getItem("Uuid_For_Guest_Login");
      dispatch(getGuestCartDetail(guestUuidData, businessInfoData._id));
    }

  }, [businessInfoData]);

  // useEffect(() => {
  //   dispatch(getGuestCartDetail("1SUITANDJEANS8799878", user.user_business));
  // }, []);

  const [guestEmail, setGuestEmail] = useState("")
  const [guestFullName, setGuestFullName] = useState("")
  const [addressStreetFlat, setAddressStreetFlat] = useState("")
  const [areaLocality, setAreaLocality] = useState("")
  const [usercity, setUserCity] = useState("")
  const [userState, setUserState] = useState("")
  const [userPinCode, setUserPinCode] = useState("")
  const [userLandMark, setUserLandMark] = useState("")
  const [userCountry, setUserCountry] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [countryCode, setCountryCode] = useState("91")


  const { data, success } = useSelector((state) => state.businessInfo.ecomWebsite);
  const [guestEmailError, setGuestEmailError] = useState(false)
  const [guestFullNameError, setGuestFullNameError] = useState(false)
  const [addressStreetFlatError, setAddressStreetFlatError] = useState(false)
  const [areaLocalityError, setAreaLocalityError] = useState(false)
  const [usercityError, setUserCityError] = useState(false)
  const [userStateError, setUserStateError] = useState(false)
  const [userPinCodeError, setUserPinCodeError] = useState(false)
  const [userCountryError, setUserCountryError] = useState(false)
  const [userPhoneError, setUserPhoneError] = useState(false)

  const [paymentMode, setPaymentMode] = useState("");


  // console.log(userPhone, "userPhoneuserPhoneuserPhone")
  const BussienessInfoData = (value) => {
    // console.log(value, "value.mobleeee")
    setGuestEmail(value?.guestEmail)
    setGuestFullName(value?.guestFullName)
    setAddressStreetFlat(value?.addressStreetFlat)
    setAreaLocality(value?.areaLocality)
    setUserCity(value?.usercity)
    setUserState(value?.userState)
    setUserPinCode(value?.userPinCode)
    setUserLandMark(value?.userLandMark)
    setUserCountry(value?.userCountry)
    setUserPhone(value?.userPhone)
    // setUserPhone(value.mobile)
    setCountryCode(value?.dialCode)
    // console.log(value)
  }
  // console.log(userPhone, "userPhonee index")
  // console.log(countryCode, "countryCode index")
  // console.log(userPhoneError, "userPhoneError")

  // console.log(guestEmail)
  // console.log(guestEmailError)
  // console.log(guestFullName)
  // console.log(addressStreetFlat)
  // console.log(areaLocality)
  // console.log(usercity)
  // console.log(userState)
  // console.log(userPinCode)
  // console.log(userLandMark)
  // console.log(shippingDetails)
  // console.log(user)

  const [wellDoneError, setWellDoneError] = useState(false)

  const handlewellDone = () => {
    // console.log("hello")
    // if (shippingDetails.length === 0) {
    //   setWellDoneError(true)
    //   console.log("adasdasd")
    // }

  }

  useEffect(() => {
    // console.log("falsefalse ")
    if (shippingDetailsSuccess && shippingDetails && shippingDetails?.available_shippings?.length > 0) {
      setWellDoneError(false)
    } else {
      if (userState && shippingDetailsSuccess && shippingDetails.length === 0) {
        setWellDoneError(true)
      } else {
        setWellDoneError(false)
      }
    }
  }, [shippingDetails, shippingDetailsSuccess, userState])
  // if (!shippingDetailsSuccess && shippingDetails && shippingDetails?.available_shippings?.length > 0) {
  //   console.log("state")
  //   setWellDoneError(true)

  // }  
  const handlePaymentPage = (e) => {
    e.preventDefault();
    let guestUuidData = localStorage.getItem("Uuid_For_Guest_Login");

    if (ValidationUtils.isNotEmpty(guestEmail) &&
      ValidationUtils.isNotEmpty(guestFullName) &&
      ValidationUtils.isNotEmpty(addressStreetFlat) &&
      ValidationUtils.isNotEmpty(areaLocality) &&
      ValidationUtils.isNotEmpty(usercity) &&
      ValidationUtils.isNotEmpty(userState) &&
      ValidationUtils.isNotEmpty(userPinCode) &&
      ValidationUtils.isNotEmpty(userCountry) &&
      ValidationUtils.isNotEmpty(userPhone)
    ) {
      // console.log("api hit")
      let body = {
        name: guestFullName,
        userId: guestUuidData,
        email: guestEmail,
        pinCode: userPinCode,
        city: usercity,
        state: userState,
        landmark: userLandMark,
        addressLineTwo: addressStreetFlat,
        addressLineThree: areaLocality,
        country: userCountry,
        phone: userPhone,
        countryCode: countryCode

      }

      // AppLinkUrl.getHost() - privateDomain
      // AppLinkUrl.subdomain() - subdomain
      if (AppLinkUrl.privateDomain()) {

        dispatch(postAddressDetailsGuest(body, "domain", AppLinkUrl.getHost()))
      } else {

        dispatch(postAddressDetailsGuest(body, "subdomain", AppLinkUrl.subdomain()))
      }
      // (PostAddressDetailsSuccess === true ? "" : "")

      // if (PostAddressDetailsSuccess === true) {
      //   console.log("postdonesucces")
      //   let shipping_address_Id = PostAddressDetailsData && PostAddressDetailsData?.data && PostAddressDetailsData?.data?.userAddress && PostAddressDetailsData?.data?.userAddress?._id;
      //   let userId = PostAddressDetailsData && PostAddressDetailsData?.data && PostAddressDetailsData?.data?.userAddress && PostAddressDetailsData?.data?.userAddress?.userId;
      //   console.log(shipping_address_Id, "shipping_address_Id")
      //   console.log(userId, "userId")
      // }
      // let aaashipping_address_Id = PostAddressDetailsData && PostAddressDetailsData?.data && PostAddressDetailsData?.data?.userAddress && PostAddressDetailsData?.data?.userAddress?._id;
      // let aaauserId = PostAddressDetailsData && PostAddressDetailsData?.data && PostAddressDetailsData?.data?.userAddress && PostAddressDetailsData?.data?.userAddress?.userId;
      // console.log(aaashipping_address_Id, "shipping_address_Id")
      // console.log(aaauserId, "userId")
    } else {

      setGuestEmailError(true)
      setGuestFullNameError(true)
      setAddressStreetFlatError(true)
      setAreaLocalityError(true)
      setUserCityError(true)
      setUserStateError(true)
      setUserPinCodeError(true)
      setUserCountryError(true)
      setUserPhoneError(true)
      // setWellDoneError(true)
    }
  };
  // console.log(wellDoneError, "DATATAATATATAT")
  useEffect(() => {
    if (userCountry && userState && userPinCode && success) {
      dispatch(getShippingDetails(data._id, userPinCode, userCountry, userState))
    }
  }, [data, dispatch, success, userCountry, userPinCode, userState])
  // console.log(guestCustomerCartData && guestCustomerCartData?.data && guestCustomerCartData?.data?.length);
  const [deliveryFees, setDeliveryFees] = useState(0)

  const handleShippingRate = (val) => {
    setDeliveryFees(val)
  }
  useEffect(() => {
    if (PostAddressDetailsSuccess === true) {
      let shipping_address_Id = PostAddressDetailsData && PostAddressDetailsData?.data && PostAddressDetailsData?.data?.userAddress && PostAddressDetailsData?.data?.userAddress?._id;
      let userId = PostAddressDetailsData && PostAddressDetailsData?.data && PostAddressDetailsData?.data?.userAddress && PostAddressDetailsData?.data?.userAddress?.userId;
      localStorage.setItem("Guest_shipping_address_Id", shipping_address_Id);
      localStorage.setItem("Guest_new_userId", userId);
      let country = PostAddressDetailsData && PostAddressDetailsData?.data && PostAddressDetailsData?.data?.userAddress && PostAddressDetailsData?.data?.userAddress?.country
      let state = PostAddressDetailsData && PostAddressDetailsData?.data && PostAddressDetailsData?.data?.userAddress && PostAddressDetailsData?.data?.userAddress?.state
      let pinCode = PostAddressDetailsData && PostAddressDetailsData?.data && PostAddressDetailsData?.data?.userAddress && PostAddressDetailsData?.data?.userAddress?.pinCode

      Storage.setJson('userCountryState', { userCountry: country, userState: state, userPinCode: pinCode })
      dispatch(updateShippingPrice({
        user: userId,
        business: success && data._id,
        price: deliveryFees ? parseInt(deliveryFees) : 0,
      }))


      history("/Payment-Details-WL")
      dispatch(resetPostAddressDetailsGuest())
    }
  }, [PostAddressDetailsData, PostAddressDetailsSuccess, data._id, deliveryFees, dispatch, success, userCountry, userPinCode, userState])
  const { pathname } = useLocation()
  useEffect(() => {
    if (Storage.alive('userCountryState') && pathname !== "/Adrees-Details-WL") {
      let data = Storage.getJson('userCountryState')
      // console.log(data, "userCS")
      setUserPinCode(data.userPinCode)
      setUserCountry(data.userCountry)
      setUserState(data.userState)
    }
  }, [pathname])

  // let bbbshipping_address_Id = PostAddressDetailsData && PostAddressDetailsData?.data && PostAddressDetailsData?.data?.userAddress && PostAddressDetailsData?.data?.userAddress?._id;
  // let bbbuserId = PostAddressDetailsData && PostAddressDetailsData?.data && PostAddressDetailsData?.data?.userAddress && PostAddressDetailsData?.data?.userAddress?.userId;
  // console.log(bbbshipping_address_Id, "bbbshipping_address_Id")
  // console.log(bbbuserId, "bbbuserId")
  let ErrorData = {
    guestEmailError: guestEmailError,
    guestFullNameError: guestFullNameError,
    addressStreetFlatError: addressStreetFlatError,
    areaLocalityError: areaLocalityError,
    usercityError: usercityError,
    userStateError: userStateError,
    userPinCodeError: userPinCodeError,
    userCountryError: userCountryError,
    userPhoneError: userPhoneError
  }

  const handleCheckout = () => {
    if (window.location.pathname.includes("/guestlogin")) {
      history("/Adrees-Details-WL")
    }
  }


  const modeData = (value) => {
    // console.log(value, "valuevaluevaluevalue")
    setPaymentMode(value)
  }
  // console.log(paymentMode)

  // const handleOrderSucces = () => {
  //   history("/ecom-orderConfirm")
  //   // setChangePage(true)
  //   // if (window.location.pathname.includes("/Adrees-Details-WL")) {
  //   //   history("/Adrees-Details-WL")
  //   // }
  // }

  const handleOrderSucces = () => {
    // const businessShopid = customerDetail.data.business && customerDetail.data.business.length > 0 ? customerDetail.data.business[0]._id : customerDetail.data.business._id
    const businessShopid = success && data._id;
    let guestshippingaddressId = localStorage.getItem("Guest_shipping_address_Id");
    let guestuserId = localStorage.getItem("Guest_new_userId");
    dispatch(updateShippingPrice({
      user: guestuserId,
      business: success && data._id,
      price: deliveryFees ? parseInt(deliveryFees) : 0,
    }))
    // console.log(guestshippingaddressId)
    // console.log(guestuserId)
    // const userId = AppLinkUrl.privateDomain() ? user._id : subdomainuser._id;
    // console.log(userId, "userIduserIduserIduserIduserId")
    // console.log(PostAddressDetailsData && PostAddressDetailsData?.data && PostAddressDetailsData?.data?.userAddress && PostAddressDetailsData?.data?.userAddress?.userId, " PostAddressDetailsData && PostAddressDetailsData?.data && PostAddressDetailsData?.data?.userAddress && PostAddressDetailsData?.data?.userAddress?.userId")
    let body = {
      user: guestuserId,
      business: businessShopid,
      shipping_address: guestshippingaddressId,
      cart: guestCustomerCartsuccess && guestCustomerCartData.data[0].cartId,
      order_payment_method: paymentMode
    };
    dispatch(createOrderFromCart(body, history));
    Storage.remove('userCountryState')
  }
  // console.log(guestCustomerCartData, "guestCustomerCartData")
  // console.log(guestCustomerCartData?.data?.length > 0, "guestCustomerCartData")

  useEffect(() => {
    if (pathname.includes("/Adrees-Details-WL")) {
      Storage.remove('userCountryState')
      dispatch(resetShippingDetails())
    }
  }, [pathname])

  useEffect(() => {
    if (pathname.includes('/Payment-Details-WL')) {
      if (guestCustomerCartsuccess) {
        setDeliveryFees(guestCustomerCartData.shippingPrice ? parseInt(guestCustomerCartData.shippingPrice) : 0)
      }
    }
  }, [guestCustomerCartData.shippingPrice, guestCustomerCartsuccess, pathname])

  const getPrice = (val) => {
    if (currency) {
      if (currency.selectedCurrency && currency.selectedCurrency.data.rate) return `${currency.selectedCurrency.data.symbol ? currency.selectedCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.selectedCurrency.data.commision, currency.selectedCurrency.data.rate))}`;
      else return `${currency.primaryCurrency.data.symbol ? currency.primaryCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.primaryCurrency.data.commision, currency.primaryCurrency.data.rate))}`;
    }
    return val;
  }

  return (
    <div>
      <div className='mt-20'>
        <div className='containerTrue pb-45 '>
          <div className='trueTheme-cart-container'>
            <div className='cart-top-heading-div'>
              { 
              <>
                <h1 className='top-heading'><span className='darkHeading'>My Bag &nbsp;</span><span className='cart-item-heading'>{guestCustomerCartData && guestCustomerCartData?.data && guestCustomerCartData?.data?.length}{guestCustomerCartData && guestCustomerCartData?.data && guestCustomerCartData?.data?.length === 1 ? ' item' : ' item(s)'}</span></h1>
              
                </>
              }
            </div>
            <div className='truetheme-cart-wrappper'>

              <div className='trueTheme-cart-leftSidebar'>
                {/* sdfsdfsdfsd */}
                {/* guest my bag  */}
                {window.location.pathname.includes("/Payment-Details-WL") ?
                  (<GuestPayment modeData={modeData} />)
                  :

                  (window.location.pathname.includes("/guestlogin") ?
                    <GuestMyBag />
                    :
                    <GuestLoginForm BussienessInfoData={BussienessInfoData} AllValidation={ErrorData} wellDoneError={wellDoneError} />

                  )
                }



                {/* Guest Login form   */}


                {/*  guest payment option */}

                {/* order details  */}
                {/* <GuestOrderDetail /> */}
              </div>
              <div className='vLine'></div>
              <div className='guest-trueTheme-cart-rightSidebar' >
                <div className='shipping-container'>
                  <div className='shipping-wrap'>
                    {
                      window.location.pathname.includes("/Adrees-Details-WL") ? <Shipping shippingRate={handleShippingRate} apiHit={false} /> :
                        ""
                    }
                    {
                      window.location.pathname.includes("/Adrees-Details-WL") ? wellDoneError ?
                      <>
                        <div className='delivery-error-wrap'>
                          <img src={Image} alt="" />
                          <p className='delivery-error-para'>Our service is not available in this location</p>
                        </div> 
                        </>
                        : "" :
                        ""
                    }
                  </div>
                </div>
                <div className='cartOrdersDetails-container' aria-disabled={wellDoneError ? true : false}>
                  <div className='order-summary-wrap'>
                    <p className='order-summary-text'>
                      ORDER SUMMARY
                    </p>
                  </div>
                  <div className='guest-order-value-details'>
                    <div className='order-value-details-wrap'>
                      <p className='order-product-details'>Total Product Price</p>
                      <p className='order-product-details'>&nbsp;{guestCustomerCartsuccess && getPrice(guestCustomerCartData.CartTotalAmount)}</p>
                    </div>
                    <div className='order-value-details-wrap'>
                      <p className='order-product-details'>Delivery Fee</p>
                      <p className={`order-product-details discount-price ${deliveryFees === 0 ? "" : "active"}`}>{deliveryFees === 0 ?'Rs 0' : deliveryFees}</p>
                    </div>
                    <div className='order-value-details-wrap'>
                      <p className='order-product-details'>Discount</p>
                      <p className='order-product-details'><span className={`discount-price ${(guestCustomerCartsuccess && guestCustomerCartData.data.length && guestCustomerCartData.CartTotalAmount - guestCustomerCartData.DiscountedPrice) === 0 ? "" : "active"}`}>&nbsp;-{guestCustomerCartsuccess && guestCustomerCartData.data.length ? getPrice(guestCustomerCartData.CartTotalAmount - guestCustomerCartData.DiscountedPrice) : "00"}</span></p>

                    </div>
                  </div>
                  <hr className='hori-line-order' />
                  <div className='order-amount-wrapper'>
                    <div className='order-amount-div'>
                      <p className='order-amount-p'>Total Amount</p>
                      <p className='order-total-amount'>{guestCustomerCartsuccess && getPrice(guestCustomerCartData.DiscountedPrice + (deliveryFees ? parseInt(deliveryFees) : 0))}</p>
                    </div>
                    <div className='guest-order-amount-button'>

                      {
                        window.location.pathname.includes("/Payment-Details-WL") ?
                          (<button className='buttonTrue checkout-btn btn-md' onClick={handleOrderSucces}> PLACE ORDER</button>
                          )
                          :

                          (window.location.pathname.includes("/Adrees-Details-WL") ?

                            <button className='buttonTrue checkout-btn btn-md' onClick={handlePaymentPage}>CONTINUE TO PAYMENT</button>


                            :
                            guestCustomerCartData?.data?.length > 0 ?
                              <button className='buttonTrue checkout-btn btn-md' onClick={handleCheckout}>Checkout</button>
                              : ""
                          )

                      }

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default GuestLogin