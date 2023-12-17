import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../../assets/images/logo/edneed-logo.svg";
import "./FormSubmitThankYou.scss";
const Thankyou = () => {

  const history = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      history('/')
    }, 10000)
  }, [history])

  return (
    <div className='thankyou-wrap'>
      <div className='edContainer'>
        <Link to="/">
          <div className='logo-wrapper'>
            <img className='logo' src={Logo} alt="" />
          </div>
        </Link>
        <div className='thankyou-content'>
          {/* <img src={ThankYou} alt=""/> */}
          <p>Thank you for your query.</p>
          <p>Our team will get back to you as soon as possible.</p>
          <div className='goback'>
            <Link className="button btn-md button-primary" to="/">Go to Homepage</Link>
          </div>
          <br />
          <small>or you will be redirected to home page automatically.</small>
        </div>
      </div>
    </div>
  )
}
export default Thankyou;