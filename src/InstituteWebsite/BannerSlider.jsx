import React, { Component } from "react";
import Slider from "react-slick";
import ImageViewer from "../Common/ImageViewer"
import DefaultInstituteBanner from "../assets/images/img/institute-banner-blank.jpg";

import AppLink from "../Common/AppLink";
function SliderSlide({ image, title, description, allowAddOption }) {
  return (
    <div className="institute-banner">
      {image && (
        <ImageViewer  object={image}/>
        // <img src={image} alt={title} />
      )}
      {title || description ? (
        <div className="banner-overlay">
          <div className="banner-overlay-wrapper">
            <h1 className="heading w-700">{title}</h1>
            <p className="w-600 mt-20">{description}</p>
          </div>
        </div>
      ) : (
        allowAddOption && (
          <div className="DefaultOverlay">
            <div className="DefaultOverlayWrap">
              <AppLink
                className="linkbtn text-xxs"
                to="/institute-info-manage"
                target="_blank"
              >
                Add Hero Banner/Slides
              </AppLink>
              <p className="text-2xs">You can add upto 5 banners</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default class BannerSlider extends Component {
  showAddOption(image, title, des) {
    return this.props.LoginCheck && !image && !title && !des;
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      swipeToSlide: true,
    };
    const { banners } = this.props;
    return (
      <Slider {...settings}>
        {banners.map((banner) => (
          <SliderSlide
            key={Math.random()}
            image={
              banner.institute_featured_banner
                ? banner.institute_featured_banner
                : DefaultInstituteBanner
            }
            title={banner.institute_featured_headline}
            description={banner.institute_short_description}
            allowAddOption={this.showAddOption(
              banner.institute_featured_banner,
              banner.institute_featured_headline,
              banner.institute_short_description
            )}
          />
        ))}
      </Slider>
    );
  }
}
