/* eslint-disable jsx-a11y/no-distracting-elements */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from 'react-redux';
import React from 'react';
import RenderComponents from '../../AboutUs/Defaultine/renderComponents';

const AboutUs = () => {
  const { homecomponenthideData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  return (
    <React.Fragment>
      {homecomponenthideData.length > 0 && homecomponenthideData[0].aboutSectionHideData?.length > 0 && homecomponenthideData[0].aboutSectionHideData.map((item, key) => {
        return (
          <React.Fragment>
            {item.show === true && React.createElement(RenderComponents[item.field])}
          </React.Fragment>
        )
      })
      }
    </React.Fragment>
  )
}



export default AboutUs