import React from 'react';
// import backarrow from "../../assets/Icons/icon-Back-arrow.svg";
import backicon from "../../assets/Icons/icon-back.svg";
import SessionStorage from '../../Classes/SessionStorage';
import AppLink from '../../Common/AppLink';
import "./auth.scss";

const AuthTimeLineLayout = ({ children }) => {
  return (
    <div className='sign_sec_wrapper'>
      <div className='wrapper'>
        <div className="item">
          <div className="main-wrapper">
            <div className="wrapper-icon">
              <div className="icon">
                <React.Fragment>
                  {/* {
                    window.location.pathname === "/basicdetailV1" ?
                      <AppLink to="/">
                        <img src={backicon} className="img-fluid" alt="" />
                      </AppLink> :
                      window.location.pathname === "/institutedetailsV1" ?
                        <AppLink to="/basicdetailV1">
                          <img src={backicon} className="img-fluid" alt="" />
                        </AppLink> :
                        window.location.pathname === "/getwebsiteV1" ?
                          <AppLink to="/institutedetailsV1">
                            <img src={backicon} className="img-fluid" alt="" />
                          </AppLink> :
                          window.location.pathname === "/websiteoverviewV1" ?
                            <AppLink to="/getwebsiteV1">
                              <img src={backicon} className="img-fluid" alt="" />
                            </AppLink> : ""
                  } */}

                </React.Fragment>


              </div>
              <h3 className='w-600'>Hi, <span className='primary w-400'>Admin</span></h3>
            </div>
            <div className="AuthTimeline">
              <div className={`AuthTimelineWrap ${window.location.pathname !== "/basicdetailV1" ? "done" : "active"} right`}>
                <div className={`AuthTimelineContent ${window.location.pathname !== "/basicdetailV1" ? "done" : "active"}`}>
                  <h2>Basic Details</h2>
                  <p>Please fill your basic details</p>
                </div>
              </div>
              <div
                // className={`AuthTimelineWrap ${window.location.pathname === "/institutedetailsV1" ? "active" : "done"
                //   } right`}
                className={window.location.pathname === "/institutedetailsV1" ? "AuthTimelineWrap active right" :
                  SessionStorage.alive("RegisterInstitiute") && window.location.pathname !== "/institutedetailsV1" ?
                    "AuthTimelineWrap done right" :
                    "AuthTimelineWrap right"}>
                <div className={window.location.pathname === "/institutedetailsV1" ? "AuthTimelineContent active right" :
                  SessionStorage.alive("RegisterInstitiute") && window.location.pathname !== "/institutedetailsV1" ?
                    "AuthTimelineContent done right" :
                    "AuthTimelineContent right"}>
                  <h2>Institute Details</h2>
                  <p>Please fill your institute details</p>
                </div>
              </div>

              <div className={window.location.pathname === "/getwebsiteV1" ? "AuthTimelineWrap active right" :
                SessionStorage.alive("subdomain") && window.location.pathname !== "/getwebsiteV1" ?
                  "AuthTimelineWrap done right" :
                  "AuthTimelineWrap right"}>
                <div className={window.location.pathname === "/getwebsiteV1" ? "AuthTimelineContent active right" :
                  SessionStorage.alive("subdomain") && window.location.pathname !== "/getwebsiteV1" ?
                    "AuthTimelineContent done right" :
                    "AuthTimelineContent right"}>
                  <h2>Get Your Free Website</h2>
                  <p>Please fill your institute details</p>
                </div>
              </div>

              <div className={window.location.pathname === "/websiteoverviewV1" ? "AuthTimelineWrap active right"
                :
                "AuthTimelineWrap right"}>
                <div className={window.location.pathname === "/websiteoverviewV1" ? "AuthTimelineContent active right" :
                  "AuthTimelineContent right"}>
                  <h2>Website Overview</h2>
                  <p>View your website</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="formitem">
          {children}
          <div className='term_list'>
            <ul>
              <li><a href="/terms-of-service" target="_blank" rel="noreferrer">Terms of Service</a></li>
              <li>&#10072;</li>
              <li><a href="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AuthTimeLineLayout;