import React, { useState } from 'react';
import './paymentMode.scss';
import '../Cart/cart.scss';
import RozarPay from '../../assets/images/rozarPay.png';
import COD from '../../assets/images/codimage.png'
import CartOrdersDetails from '../../CommonComponent/CommonJsx/CartOrders/CartOrders'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createOrderFromCart, Getcart, PostcartReset } from '../../../../store/actions/ecommerce/action/cartOrder';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import { getSavedCustomer } from '../../../../store/actions/ecommerce/action/auth';
import { getInstituteData } from '../../../../store/actions/businessInfo';
import ComponentLoader from '../../../../Common/Loader/ComponentLoader';
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';
import Auth from '../../../../Classes/Auth';

const PaymentMode = () => {

  let dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();

  // const [loading, setLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");
  // const [disbaleCOD, setDisbaleCOD] = useState(false);
  // const [productTotal, setProductTotal] = useState(0);
  // const [totalItems, setTotalItems] = useState(0);
  // const [totalDiscount, setTotalDiscount] = useState(0);
  // const [grandTotal, setGrandTotal] = useState(0);
  const [disableContinueButton, setDisableContinueButton] = useState(false);

  // const { customerCart } = useSelector((state) => state.orderCartList);
  // const { customerDetail } = useSelector((state) => state.ecomAuth);
  const user = useSelector((state) => state.user);
  // const subdomainuser = useSelector((state) => state.subdomainuser);

  const { getbusinessInfoSuccess, getbusinessInfoData, subdomainuser, customerCartData,
    customerCartSuccess
  } = useSelector((state) => {
    return {
      // user: state.user,
      subdomainuser: state.subdomainuser,
      getbusinessInfoSuccess: state.businessInfo.ecomWebsite.success,
      getbusinessInfoData: state.businessInfo.ecomWebsite.data,
      customerCartData: state.orderCartList.customerCart.data,
      customerCartSuccess: state.orderCartList.customerCart.success,

    };
  })
  // console.log(user, "useruseruser")
  // console.log(subdomainuser, "useruseruser")
  // console.log(disableContinueButton, "disableContinueButton");
  // console.log(disableContinueButton, "disableContinueButton-52");
  // useEffect(() => {
  //   dispatch(getSavedCustomer());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getInstituteData(subdomainuser.user_business, subdomainuser.user_business_type));
  }, [dispatch, subdomainuser.user_business, subdomainuser.user_business_type])

  useEffect(() => {
    return () => {
      dispatch(PostcartReset());
    }
  }, [dispatch])
  useEffect(() => {
    if (AppLinkUrl.privateDomain() && Auth.isLogin()) {
      dispatch(Getcart(user._id, user.user_business))
    } else if (AppLinkUrl.subdomain() && Auth.isSubdomainLogin()) {
      dispatch(Getcart(subdomainuser._id, subdomainuser.user_business))
    }

  }, [user, subdomainuser])
  // useEffect(() => {
  //   if (getbusinessInfoSuccess && getbusinessInfoData && getbusinessInfoData.cash_on_delivery_enabled === false) {
  //     setDisbaleCOD(true)
  //   }
  // }, [getbusinessInfoData, getbusinessInfoSuccess])

  // useEffect(() => {
  //   if (getbusinessInfoSuccess && getbusinessInfoData && getbusinessInfoData.cod_price_limitation) {
  //     if (getbusinessInfoData.cash_on_delivery_price_limit < productTotal) {
  //       setDisbaleCOD(true);
  //       // console.log("whcv");
  //       setPaymentMode("");
  //     }
  //     if (getbusinessInfoData.razorpay_acount_id) {
  //       setPaymentMode("Razorpay");
  //     }
  //   }
  // }, [getbusinessInfoData, getbusinessInfoSuccess, productTotal])


  useEffect(() => {
    if (getbusinessInfoSuccess && getbusinessInfoData.razorpay_acount_id) {
      setPaymentMode("Razorpay");
    }
    else {
      setPaymentMode("cashOnDelivery");
    }
  }, [getbusinessInfoSuccess, getbusinessInfoData])

  // useEffect(() => {
  //   if (customerCart.data.cartProduct) {
  //     if (!customerCart.data.cartProduct.every((i) => i.cod === true)) {
  //       setDisbaleCOD(true);
  //     }
  //   }
  // }, [customerCart.data.cartProduct])

  // useEffect(() => {
  //   if (customerCart.success === true && customerCart.data && customerCart.data.cartProduct && customerCart.data.cartProduct.length > 0) {

  //     const pTot = customerCart.data.cartProduct.reduce((tot, curr, i) => {
  //       return tot + curr.price * curr.quantity;
  //     }, 0);
  //     const iTot = customerCart.data.cartProduct.reduce((tot, curr, i) => {
  //       return tot + curr.quantity;
  //     }, 0);
  //     const dTot = customerCart.data.cartProduct.reduce((tot, curr, i) => {
  //       if (curr.discountPercentage > 0) {
  //         return tot + Math.floor((curr.price * curr.discountPercentage) / 100) * curr.quantity;
  //       } else {
  //         return tot
  //       }
  //     }, 0);
  //     setTotalDiscount(dTot);
  //     setTotalItems(iTot);
  //     setProductTotal(pTot);
  //     setGrandTotal(pTot + customerCart.data.deliveryFees - dTot);
  //   }
  // }, [customerCart]);

  const handlePaymentMode = (value) => {
    if (value === "cashOnDelivery") {
      if (!disableContinueButton) {
        setPaymentMode(value);
      }
    }
    else if (getbusinessInfoData.razorpay_acount_id) {
      setPaymentMode(value);
    }
  }

  const handleRazorpay = () => {
    // const businessShopid = customerDetail.data.business && customerDetail.data.business.length > 0 ? customerDetail.data.business[0]._id : customerDetail.data.business._id
    const businessShopid = AppLinkUrl.privateDomain() ? user.user_business : subdomainuser.user_business;
    const userId = AppLinkUrl.privateDomain() ? user._id : subdomainuser._id;
    let body = {
      user: userId,
      business: businessShopid,
      shipping_address: id,
      cart: customerCartSuccess && customerCartData.data[0].cartId,
      order_payment_method: paymentMode
    };
    dispatch(createOrderFromCart(body, history));
  }

  // useEffect(() => {
  //   if (!getbusinessInfoData.razorpay_acount_id && disbaleCOD) {
  //     setDisableContinueButton(true);
  //   }
  //   else {
  //     setDisableContinueButton(false);
  //   }
  // }, [disbaleCOD, getbusinessInfoData.razorpay_acount_id])

  useEffect(() => {
    if (getbusinessInfoSuccess && getbusinessInfoData && customerCartSuccess && customerCartData) {
      if (getbusinessInfoData?.cash_on_delivery_enabled) {
        if (getbusinessInfoData?.cod_price_limitation) {
          if (getbusinessInfoData?.cash_on_delivery_price_limit > customerCartData?.CartTotalAmount) {
            if (customerCartData.data.length) {
              let data = customerCartData.data.every((i) => i?.product?.cod === true)
              if (data === true) {
                setDisableContinueButton(false);
              }
              else {
                setDisableContinueButton(true);
              }
            }
          }
          else {
            setDisableContinueButton(true);
          }
        }
        else {
          if (customerCartData.data.length) {
            let data = customerCartData.data.every((i) => i?.product?.cod === true)
            if (data === true) {
              setDisableContinueButton(false);
            }
            else {
              setDisableContinueButton(true);
            }
          }
        }
      }
      else {
        setDisableContinueButton(true);
      }
    }
  }, [customerCartData, customerCartSuccess, getbusinessInfoData, getbusinessInfoSuccess])


  // console.log(!getbusinessInfoData.razorpay_acount_id, "!getbusinessInfoData.razorpay_acount_id")

  return (
    <React.Fragment>
      {getbusinessInfoSuccess && getbusinessInfoData &&
        customerCartSuccess && customerCartData ? (
        <div className='containerTrue pb-45 mt-24  '>
          <div className='payment-container'>
            <div className='paymentMode-wrapper'>
              {/* {console.log(getbusinessInfoData.cash_on_delivery_price_limit < customerCartData.DiscountedPrice, customerCartData.data.find((i) => i.product.cod === false), getbusinessInfoData.cash_on_delivery_enabled === false, "line 156")} */}
              <h3 className='paymentMode-text'>Choose Payment Mode</h3>
              <div className='payment-div'>
                {/* make aria-disabled  'true' when disable the div  */}
                <div className='payment-rozarPay' aria-disabled={!getbusinessInfoData.razorpay_acount_id}>
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
                  <div className='paymentMode-container' onClick={() => handlePaymentMode("Razorpay")}>
                    <div className='payment-container-img'>
                      <img src={RozarPay} alt="" className={!getbusinessInfoData.razorpay_acount_id ? 'imgFilter' : ''} />
                    </div>
                    <div className='paymentMode-container-text-div'>
                      <p className='paymentMode-container-text'>Pay using Razorpay</p>
                    </div>
                  </div>
                </div>
                {/* cod div */}
                <div className='payment-rozarPay mt-24' aria-disabled={disableContinueButton} >
                  <div className='rozarpay-radio' aria-disabled={disableContinueButton}>
                    {disableContinueButton ?
                      <input type='radio' id='paymentMode' name='paymentMode' className='change-address-radio'
                        checked={paymentMode === "cashOnDelivery"}
                        disabled
                      />
                      :
                      <input type='radio' id='paymentMode' name='paymentMode' className='change-address-radio'
                        checked={paymentMode === "cashOnDelivery"}
                        onChange={() => handlePaymentMode("cashOnDelivery")}
                      />
                    }
                  </div>
                  <div className='paymentMode-container' disabled={disableContinueButton} onClick={() => handlePaymentMode("cashOnDelivery")}>
                    <div className='payment-container-img'>
                      <img src={COD} alt="" className={disableContinueButton ? 'imgFilter' : ''} />
                    </div>
                    <div className='paymentMode-container-text-div'>
                      <p className='paymentMode-container-text'>Cash on Delivery</p>
                    </div>

                  </div>

                </div>
              </div>
              {/* {customerCartData.data.every((i) => i.product.cod === true) ?
                ""
                :
                <p className='info-text'>Please check your cart, few product's are not applicable for COD</p>
              } */}
              {getbusinessInfoSuccess && getbusinessInfoData && !getbusinessInfoData.cash_on_delivery_enabled
                ?
                <p className='info-text'>COD is not available on this product.</p>
                :
                getbusinessInfoSuccess && getbusinessInfoData && 
                (!getbusinessInfoData.cash_on_delivery_enabled) &&
                ((getbusinessInfoData?.cash_on_delivery_price_limit || getbusinessInfoData?.cash_on_delivery_price_limit === null) < customerCartData?.CartTotalAmount)
                  ?
                  <p className='info-text'>COD is not availabe on this product.</p>
                  :
                  getbusinessInfoSuccess && getbusinessInfoData && customerCartData.data.every((i) => i?.product?.cod === true) && 
                  ((getbusinessInfoData?.cash_on_delivery_price_limit || getbusinessInfoData?.cash_on_delivery_price_limit === null) > customerCartData?.CartTotalAmount)
                    ?
                    <p className='info-text'>COD is available on this product.</p>
                    :
                    customerCartData.data.every((i) => i.product.cod !== true) ?
                      <p className='info-text'>Please check your cart, few product's are not applicable for COD</p>
                      :
                      <p className='info-text'>Please check your cart, few product's are not applicable for COD</p>
              }

            </div>
            <div className='vLine'></div>
            <div className='trueTheme-cart-rightSidebar'>
              <CartOrdersDetails
                // loading={loading}
                submitCart={handleRazorpay}
                // discount={totalDiscount}
                priceDetail={customerCartData.data}
                // prodTot={productTotal}
                // grTot={grandTotal}
                codStatus={customerCartData.data}
                // codOption={(v) => { codStatusHandler(v) }}
                page="PaymentMode"
                deliveryFees={customerCartData.shippingPrice ? customerCartData.shippingPrice : 0}
                disabled={disableContinueButton && paymentMode === "cashOnDelivery"}
                shippingValid={true}
              />
            </div>
          </div>
        </div>
      ) : (

        <ComponentLoader />
      )

      }

    </React.Fragment >
  )
}

export default PaymentMode