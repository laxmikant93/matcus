import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActivateTheme } from "../../store/actions/institutetheme";
import Slider from "react-slick";
import { findSubdomain } from "../../store/actions/institutewebsite";
import PreviewNavItem from "../PreviewNavItem";
import SubDomainFooter from "../../Layout/SubdomainLayout/SubDomainFooter";
import ImageViewer from "../../Common/ImageViewer";

const SkinPreview = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const website = useSelector((state) => state.institutewebsite);

  useEffect(() => {
    dispatch(getActivateTheme(user.user_institute));
    dispatch(findSubdomain(user.user_institute_institute_subdomain));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.user_institute]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="SkinPreviewWrapper ">
      <React.Fragment>
        <PreviewNavItem
          subdomainLogo={website.data.institute_logo}
          title={website.data.institute_name}
        />

        {/* <PreviewNavItem subdomainLogo={website.data.institute_logo} /> */}
        <div className="sidePrevCenter">
          <Slider {...settings}>
            {website.data &&
              website.data.banners &&
              // eslint-disable-next-line array-callback-return
              website.data.banners.map((im, idx) => (
                <div key={idx} className="previesliderOne">
                  <ImageViewer object={im.institute_featured_banner} />
                  {/* <img src={im.institute_featured_banner} alt="" /> */}
                </div>
              ))}
          </Slider>

          <div className="institutes_skinpreviewrightshow">
            <div className="pngiconwrapper">
              <div className="circle_previewleftpngimag"></div>
              <div className="blackCrickePreview">
                <div className="roater_pngposition">
                  <span className="previewiconlineone"></span>
                  <span className="previewiconlineone mt-5"></span>
                  <span className="previewiconlineone mt-5"></span>
                  <span className="previewiconlineone mt-5"></span>
                  <span className="previewiconlineone mt-5"></span>
                </div>
              </div>
              <div className="small_circle_blackpreview"></div>
              <div className="verysmall_circle_blackpreview"></div>
            </div>

            <section className="institute-info-sec">
              <div className="institute-info">
                {/* <h1 className="text-sm w-500 capitalize">
                  {website.data.institute_name}
                </h1> */}
                <p className="text-xxs mt-2 w-500">
                  {website.data.institute_state}, {website.data.institute_city}
                </p>
                <p className="sd-contact-display">
                  <span>{website.data.institute_phone}</span>
                  <span>{website.data.institute_email}</span>
                </p>
              </div>
            </section>
          </div>
        </div>
        <div className="secAboutWrapCnt prevskinaboutussection ">
          <div className="sd-aboutwrap">
            <div className="SD-Item">
              <div className="PageTopHead">
                <div className="PTH-Item secHeadWrap">
                  <h3 className="heading">
                    About{" "}
                    {website.data.institute_about_head
                      ? website.data.institute_about_head
                      : website.data.institute_name}
                  </h3>

                  {website.data.institute_about_subhead ? (
                    <p className="subheading">
                      {website.data.institute_about_subhead}
                    </p>
                  ) : (
                    <p className="subheading">
                      Flowering of the child's physical, emotional, mental and
                      spiritual personality
                    </p>
                  )}
                </div>
              </div>
              <p>{website.data.institute_about}</p>
              <p className="button mt-15">Read More</p>
            </div>
          </div>
        </div>
        <SubDomainFooter instituteid={website.data._id} />
      </React.Fragment>
    </div>
  );
};

export default SkinPreview;
