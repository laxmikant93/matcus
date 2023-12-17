import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './orderConfirm.scss';
import SuccessImg from '../../assets/icons/success.gif';
import CancelImg from '../../assets/icons/cancel.gif';
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';
import Auth from '../../../../Classes/Auth';
import useDownTimer from "../../../../App/Auth/Hooks/useTimer";

const OrderConfirm = () => {

  const history = useNavigate();
  const { status } = useParams();
  const handle = () => {
    history("/products")
  }

  const [redirectTo, setRedirectTo] = useState("");

  const [timer, setTimer] = useDownTimer();

  useEffect(() => {
    // console.log("line 26", timer)
    if (timer === "0s") {
      if (redirectTo === "/ecom-myOrders") {
        history("/ecom-myOrders")
      } else if (redirectTo === "/ecom-orderDetails") {
        history('/ecom-orderDetails')
      }
    }
  }, [timer])

  // setInterval(() => {

  //   if (timer <= 0) {

  //   } else {
  //     setTimer(timer - 1)
  //   }
  // }, 1000);

  useEffect(() => {
    setTimer(5);
    ((Auth.isLogin() && AppLinkUrl.privateDomain()) || (Auth.isSubdomainLogin() && AppLinkUrl.subdomain())) ?
      setRedirectTo("/ecom-myOrders")

      :
      setRedirectTo("/ecom-orderDetails")
  }, []);



  const handleViewOrders = () => {
    ((Auth.isLogin() && AppLinkUrl.privateDomain()) || (Auth.isSubdomainLogin() && AppLinkUrl.subdomain())) ?
      history("/ecom-myOrders")
      :
      history('/ecom-orderDetails')
  }


  // page scroll to top

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <React.Fragment>
      <div className='containerTrue pb-45'>
        <div className='orderConfirm-container'>
          {
            status === 'success' ? (
              <div className='order-confirm-status'>
                <h1 className='order-heading color-primary '>Your order has been placed successfully!</h1>
                <div className='status-div'>
                  <img src={SuccessImg} alt="" />
                </div>
              </div>
            )
              :
              (
                < div className='order-confirm-status'>
                  <h1 className='order-heading color-red  '>Your order has been  Unsuccessfully!</h1>
                  <div className='status-div'>
                    <img src={CancelImg} alt="" />
                  </div>
                </div>
              )
          }
          <div className="order-confirm-lower-div">
            {
              status === 'success' ? <p>Thank You for shopping with us</p> : <p>Please try again</p>
            }


            <button className='buttonTrue btnTrue-o-primary btn-xs' onClick={handle}>Explore More</button>
            <div className='view-btn-div'>

              <button className='view-btn' onClick={handleViewOrders}>View Orders</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment >
  )
}

export default OrderConfirm