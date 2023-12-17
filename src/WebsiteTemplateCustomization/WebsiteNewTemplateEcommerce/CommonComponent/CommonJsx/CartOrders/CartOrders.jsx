import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { convertToIndianFormat } from '../../../../../CommonFunctions/helperFunction';
import { priceCalculator } from '../../commonFunction/PriceCalculator';
import './cartOrders.scss';

const CartOrders = ({ submitCart, shippingValid, deliveryFees, discount, loading, priceDetail, prodTot, grTot, codStatus, codOption, page, disabled }) => {

  let dispatch = useDispatch();


  const { getbusinessInfoSuccess, getbusinessInfoData, customerCartData, customerCartSuccess,
    razorpayOrderLoading, currency } = useSelector((state) => {
      return {
        // user: state.user,
        getbusinessInfoSuccess: state.businessInfo.ecomWebsite.success,
        getbusinessInfoData: state.businessInfo.ecomWebsite.data,
        customerCartData: state.orderCartList.customerCart.data,
        customerCartSuccess: state.orderCartList.customerCart.success,
        razorpayOrderLoading: state.orderCartList.razorpayOrder.loading,
        currency: state.currencyList,
      };
    })

  // const convertToIndianFormat = (val) => {
  //   let resp = '';
  //   let prev = 0;
  //   let curr = 3;
  //   let out = [];
  //   if (val || val == 0) {
  //     resp = val.toString().split('').reverse();
  //     if (resp.length >= 3) {
  //       while (curr <= resp.length + 1) {
  //         const str = resp.slice(prev, curr);
  //         out = [...out, ...str, ','];
  //         prev = curr;
  //         curr = curr + 2;
  //       }
  //       out = out.reverse()
  //       out = out.join("").substring(1);
  //       return out;
  //     }
  //   }
  //   return val;
  // }

  const [status, setStatus] = useState(true);

  const changeStatus = () => {
    codOption(!status);
    setStatus(prev => prev = !prev);
  };

  const getPrice = (val) => {
    if (currency) {
      if (currency.selectedCurrency && currency.selectedCurrency.data.rate) return `${currency.selectedCurrency.data.symbol ? currency.selectedCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.selectedCurrency.data.commision, currency.selectedCurrency.data.rate))}`;
      else return `${currency.primaryCurrency.data.symbol ? currency.primaryCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.primaryCurrency.data.commision, currency.primaryCurrency.data.rate))}`;
    }
    return val;
  }

  useEffect(() => {console.log('codStatus',codStatus)},[codStatus])

  return (
    <React.Fragment>
      <div className='cartOrdersDetails-container' aria-disabled={shippingValid ? false : true}>
        <div className='order-summary-wrap'>
          <p className='order-summary-text'>ORDER SUMMARY</p>
        </div>
        <div className='order-value-details'>
          <div className='order-value-details-wrap'>
            <p className='order-product-details'>Total Product Price</p>
            <p className='order-product-details'>&nbsp;{customerCartSuccess && getPrice(customerCartData.CartTotalAmount)}</p>
          </div>
          <div className='order-value-details-wrap'>
            <p className='order-product-details'>Delivery Fee</p>
            <p className={`order-product-details discount-price ${shippingValid &&deliveryFees > 0 ? "active" : "" }`}>
              {
                shippingValid ?
                  deliveryFees === 0 ? 'Rs 0' : getPrice(deliveryFees) : 'Rs 0'
              }
            </p>
          </div>
          <div className='order-value-details-wrap'>
            <p className='order-product-details'>Discount</p>
            <p className='order-product-details'><span className={`discount-price ${customerCartSuccess && customerCartData.data.length ? "active" : "" }`}>&nbsp;-{customerCartSuccess && customerCartData.data.length ? getPrice(customerCartData.CartTotalAmount - customerCartData.DiscountedPrice) : "00"}</span></p>
          </div>

          {/* <div className='order-value-details-wrap'>
            <p className='order-product-details'>Cash on Delivery</p>
            {!user.user_razorpay_id ?
              <input type="checkbox" id="vehicle1" name="vehicle1" checked={status} disabled />
              :
              <input type="checkbox" id="vehicle1" name="vehicle1" checked={status} onClick={() => { changeStatus() }} />
            }
          </div> */}
        </div>
        <hr className='hori-line-order' />
        <div className='order-amount-wrapper'>
          <div className='order-amount-div'>
            <p className='order-amount-p'>Total Amount</p>
            <p className='order-total-amount'> {customerCartSuccess && getPrice(customerCartData.DiscountedPrice + deliveryFees)}</p>
          </div>
          {customerCartSuccess && customerCartData.DiscountedPrice > 0 &&
            <div className='order-amount-button'>
              {
                razorpayOrderLoading ?
                  <button className='buttonTrue btnTrue-primary btn-md'>Loading...</button>
                  :
                  <React.Fragment>
                    {page === "Cart" ?
                      <React.Fragment>
                        {!disabled && shippingValid ?
                          <button className='buttonTrue btnTrue-primary btn-md' onClick={() => { submitCart() }}>CONTINUE</button>
                          :
                          <button className='buttonTrue btn-disable  btn-md' disabled>CONTINUE</button>
                        }
                      </React.Fragment>


                      :
                      page === "PaymentMode" && getbusinessInfoData.razorpay_acount_id ?
                        <React.Fragment>
                          {!disabled && shippingValid ?

                            < button className='buttonTrue btnTrue-primary btn-md' onClick={() => { submitCart() }}>CONTINUE</button>


                            :
                            <button className='buttonTrue btn-disable  btn-md' disabled>CONTINUE</button>
                          }
                        </React.Fragment>
                        :
                        <React.Fragment>
                          {page === "PaymentMode" && codStatus && codStatus.every((i) => i?.product?.cod === true) && !disabled && shippingValid ?

                            <button className='buttonTrue btnTrue-primary btn-md' onClick={() => { submitCart() }}>CONTINUE</button>

                            :
                            <button className='buttonTrue btn-disable  btn-md' disabled>CONTINUE</button>
                          }
                        </React.Fragment>
                    }
                    {/* <button className='buttonTrue btnTrue-primary btn-md' onClick={() => { submitCart() }}>CONTINUE</button> */}
                  </React.Fragment>

              }
            </div>
          }

        </div>
      </div>
    </React.Fragment >
  )
}

export default CartOrders