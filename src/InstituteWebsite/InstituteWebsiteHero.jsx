import React, { useEffect, useState } from "react";
import DefaultInstituteBanner from "../assets/images/img/institute-banner-blank.jpg";
import { useDispatch, useSelector } from "react-redux";
// import WebsiteLike from "./WebsiteLike";
import BannerSlider from "./BannerSlider";
import AppLink from "../Common/AppLink";
import { getUserDetails } from "../store/actions/privateDomain";
import { getInstituteData } from "../store/actions/checkdomain";
import AppLinkUrl from "../Common/AppLink/AppLinkUrl";
import { createPrivateDomainNewInstiute } from "../Constant/auth";
import Cookies from "../Classes/Cookies";
// import {
//   getActivateTheme,
//   getPublicTheme,
// } from "../store/actions/institutetheme";
import ImageViewer from "../Common/ImageViewer";

const InstituteWebsiteHero = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.institutewebsite);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { users, instituteWebsite } = useSelector((state) => {
    return {
      instituteWebsite: state.institutewebsite.data,
      users: state.user,
    };
  });
  // const publicinstitute = useSelector((state) => state.institutewebsite);

  // useEffect(() => {
  //   if (publicinstitute.data._id) {
  //     dispatch(getActivateTheme(publicinstitute.data._id));
  //   } else if (publicinstitute.data._id) {
  //     dispatch(getPublicTheme(publicinstitute.data._id));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (users.token) {
      if (
        users._id === instituteWebsite.owner &&
        users.user_activeRole === process.env.REACT_APP_PAGE_OWNER &&
        users.user_institute_institute_subdomain ===
        instituteWebsite.institute_subdomain
      ) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [users, instituteWebsite]);

  useEffect(() => {
    if (users.token) {
      dispatch(getUserDetails(users._id, users.user_institute));
      dispatch(getInstituteData(users.user_institute));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users.token]);

  const { InstituteInfo, InstituteInfoSuccess, userDetailData } = useSelector(
    (state) => {
      return {
        InstituteInfo: state.checkdomain.list.data,
        InstituteInfoSuccess: state.checkdomain.list.success,
        userDetailData: state.privatedomain.getUserDetails.data,
      };
    }
  );
  const proceedToBook = () => {
    const urlToRedirect = AppLinkUrl.mainBaseUrl("/pdRedirectSwitch");
    Cookies.setJson(createPrivateDomainNewInstiute, "proceedtobook");
    window.location.href = urlToRedirect;
  };
  const PrivateDomainBook = () => {
    const urlToRedirect = AppLinkUrl.mainBaseUrl("/pdRedirectSwitch");
    Cookies.setJson(createPrivateDomainNewInstiute, "privatedomainbook");
    window.location.href = urlToRedirect;
  };

  return (
    !loading && (
      <div className="secInstHeadWrapCnt">
        <div className="sectionCntrWrap">
          {data.banners ? (
            (data.banners && data.banners.length) > 1 ? (
              <BannerSlider LoginCheck={isLoggedIn} banners={data.banners} />
            ) : (
              <div className="institute-banner">
                {data.banners && data.banners[0].institute_featured_banner ? (
                  <ImageViewer  object={data.banners[0].institute_featured_banner} />
                  // <img
                  //   src={data.banners[0].institute_featured_banner}
                  //   alt={data.banners[0].institute_featured_banner}
                  // />
                ) : (
                  <React.Fragment>
                    <img src={DefaultInstituteBanner} alt="Default Banner" />
                    {data.banners &&
                      isLoggedIn &&
                      !data.banners[0].institute_featured_headline &&
                      !data.banners[0].institute_short_description && (
                        <div className="DefaultOverlay">
                          <div className="DefaultOverlayWrap">
                            <AppLink
                              className="linkbtn text-xxs"
                              to="/institute-info-manage"
                              target="_blank"
                            >
                              Add Hero Banner/Slides
                            </AppLink>
                            <p className="text-2xs">
                              You can add upto 5 banners
                            </p>
                          </div>
                        </div>
                      )}
                  </React.Fragment>
                )}
                {data.banners &&
                  (data.banners[0].institute_featured_headline ||
                    data.banners[0].institute_short_description) && (
                    <div className="banner-overlay">
                      <div className="banner-overlay-wrapper">
                        {data.banners[0].institute_featured_headline && (
                          <h1 className="heading w-700">
                            {data.banners[0].institute_featured_headline}
                          </h1>
                        )}
                        {data.banners[0].institute_short_description && (
                          <p className="w-600 mt-20">
                            {data.banners[0].institute_short_description}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
              </div>
            )
          ) : (
            <div className="institute-banner">
              {data.institute_featured_banner ? (
                <ImageViewer
                  object={data.institute_featured_banner}
                  alt={data.institute_featured_headline}
                />
              ) : (
                <img src={DefaultInstituteBanner} alt="Default Banner" />
              )}
              {(data.institute_featured_headline ||
                data.institute_short_description) && (
                  <div className="banner-overlay">
                    <div className="banner-overlay-wrapper">
                      {data.institute_featured_headline && (
                        <h1 className="heading w-700">
                          {data.institute_featured_headline}
                        </h1>
                      )}
                      {data.institute_short_description && (
                        <p className="w-600 mt-20">
                          {data.institute_short_description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
            </div>
          )}
          <React.Fragment>
            {isLoggedIn ? (
              <React.Fragment>
                {InstituteInfoSuccess &&
                  !InstituteInfo.domain &&
                  !userDetailData.DomainInfo ? (
                  <>
                    <div className="subdomainBookDomain">
                      <div className="subdomainBookDomainHead">
                        <p className="text-xxs">
                          How about one of this domain{" "}
                          {data.institute_subdomain}.com
                        </p>
                      </div>

                      <button
                        className="button button-primary btn-sm"
                        onClick={PrivateDomainBook}
                      >
                        Book Now!
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}

                {userDetailData.DomainInfo &&
                  !InstituteInfo.domain &&
                  InstituteInfoSuccess &&
                  isLoggedIn ? (
                  <>
                    <div className="subdomainBookDomain">
                      <div className="subdomainBookDomainHead">
                        <p className="text-xxs">
                          How about one of this domain{" "}
                          {data.institute_subdomain}.com
                        </p>
                      </div>

                      <button
                        className="button button-primary btn-sm"
                        onClick={proceedToBook}
                      >
                        Proceed to Book
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </React.Fragment>
            ) : (
              ""
            )}
          </React.Fragment>
          <section className="institute-info-sec">
            <div className="institute-info">
              <h1 className="heroInsName w-700 capitalize">
                {data.institute_name}
              </h1>
              <p>
                <small>
                  <i className="icon-pinLOc"></i>
                  {data.institute_state}, {data.institute_city}
                </small>
              </p>
              <p className="sd-contact-display">
                <span>
                  <i className="icon-phonering"></i>
                  {data.institute_phone}
                </span>
                <span>
                  <i className="icon-emailBox"></i>
                  {data.institute_email}
                </span>
              </p>
            </div>
            {/* <WebsiteLike like={data.totallike} /> */}
          </section>
        </div>
      </div>
    )
  );
};

export default InstituteWebsiteHero;
