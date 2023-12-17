import React from 'react';
import iconedneed from "../../assets/Icons/icon-edneed.svg";
import MobileSignup from "../../assets/images/img/signup_logo.png";
import BackToHome from "../../assets/Icons/login-logo.svg";
import iconimg from "../../assets/Icons/loginIcon2.svg"
import AppLink from '../../Common/AppLink';
import SuccessMessagePopup from '../../Common/SuccessMessagePopup';
import "./auth.scss";
import AppLinkUrl from '../../Common/AppLink/AppLinkUrl';
const AuthLayout = ({ children }) => {
  console.log('app',AppLinkUrl.url.location)
  return (
    <React.Fragment>
      <SuccessMessagePopup />

      <div className='sign_sec_wrapper'>
        {
          AppLinkUrl.privateDomain() ?
            <AppLink to="/">
              <div className="private_closeIcn">
                <button className='close_button'><span>&#10006;</span> CLOSE</button>
              </div>
            </AppLink>
            : ""

        }
        <div className='wrapper'>
          <div className="item">
            <div className="Mobile-img">
              {
                AppLinkUrl.privateDomain() ? "" : <img src={MobileSignup} alt="" className='img-fluid' />
              }

            </div>
            <div className={AppLinkUrl.getHost().includes("intelligencevidyarthi.in")?"vidyarthiLoginColor wrapper-column": "wrapper-column"}>
              <div className="backhome-icon">
                {
                  AppLinkUrl.privateDomain() ? "" :
                    <AppLink to="/">
                      <img src={BackToHome} className="img-fluid" alt="" />
                    </AppLink>
                }
              </div>

              {
                AppLinkUrl.privateDomain() ?
                  <React.Fragment>
                    <h1 className='white'>Login</h1>
                    <p className='white'>Welcome back! Please
                      enter your credentials to
                      Log-in </p>
                  </React.Fragment> :
                  <React.Fragment>
                    <h1 className='white'>Next  <br /> Revolution <br /> in <span className='blue w-800'>Technology</span></h1>
                    <p className='white'>Create an account to join the community with Edneed</p>
                  </React.Fragment>
              }

              <div className="loginIcon">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              {
                AppLinkUrl.privateDomain() ?
                  <div className="Private_edicon">
                    <img src={iconimg} className="img-fluid" alt="" />
                  </div> :
                  <div className="edicon">
                    <img src={iconedneed} className="img-fluid" alt="" />
                  </div>
              }


            </div>
          </div>
          <div className="formitem">
            {children}
            {
              AppLinkUrl.privateDomain() ? "" :
                <div className='term_list'>
                  <ul>
                    <li><a href="/terms-of-service" target="_blank" rel="noreferrer">Terms of Service</a></li>
                    <li>&#10072;</li>
                    <li><a href="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a></li>
                  </ul>
                </div>
            }
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default AuthLayout;