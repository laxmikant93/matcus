import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AppLink from '../../../../Common/AppLink';
import ComponentLoader from '../../../../Common/Loader/ComponentLoader';
import StartLoader from '../../../../Common/Loader/StartLoader';
import { findInstituteInformation } from '../../../../store/actions/instituteregistration/action';
import ImageBlur from '../imageBlur.png';
import './templateChoose.scss';
import UpdateSubdomain from './UpdateSubdomain';
import ImageViewer from '../../../../Common/ImageViewer';

const TemplateChoose = ({ defaultTemp, domain, instituteDetailCountSuccess }) => {
  const editDomainModal = useRef(null);
  console.log("domainnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",domain)
  const { user, businessData,
    businessDataSuccess } = useSelector((state) => {
      return {
        user: state.user,
        businessData: state.businessInfo.getInstituiteData.data,
        businessDataSuccess: state.businessInfo.getInstituiteData.data,
      };
    });
  const dynamicRoute = () => {
    if (window.location.host.includes("my_app")) {
      return ".my_app.com:3000"
    } else if (window.location.host.includes("getmelight")) {
      return ".getmelight.com"
    } else if (window.location.host.includes("unicated")) {
      return ".unicated.com"
    } else if (window.location.host.includes("edneed")) {
      return ".edneed.com"
    } else {
      return ".edneed.com"
    }
  }

  const openSubDomain = () => {
    if (window.location.host.includes("my_app")) {
      window.open(
        `http://${user.user_institute_institute_subdomain}${dynamicRoute()}`
      );
    } else {
      window.open(
        `https://${user.user_institute_institute_subdomain}${dynamicRoute()}`
      );
    }

  };
  // const [showModal, setShowModal] = useState();
  // const closeModal = () => {
  //   setShowModal(!showModal);
  // }
  const openDomain = () => {
    if (user.user_business_type === "LMS") {
      window.open(
        `https://${domain}`
      );
    } else {
      window.open(
        `https://${businessData.domain}`
      );
    }
  };
  const [removeData, setRemoveData] = useState(false)
  const openPopup = () => {
    editDomainModal.current.open()
    // addEditDomainModal.current.open()
    setRemoveData(true)
  }

  const closePopUp = () => {
    editDomainModal.current.close()
    setRemoveData(false)
  }
  return (
    <React.Fragment>
      {!user.user_institute_isOld && user.user_business_type === "LMS" ? (
        <div className="instituteDashboard-middle-left">
          <p className="text-sm w-600">{user.user_institute_institute_name}</p>
          <div className="instituteDashboard-edit">
            {defaultTemp && <button className="text-xxs w-400 primary" onClick={openDomain}>{domain}</button>}
          </div>
          <div className="instituteDashboard-edit">
            <button className="text-xxs w-400 primary" onClick={openSubDomain}>{user.user_institute_institute_subdomain}{dynamicRoute()}</button>
            <i className='ed-icon i-xs primary icon-edit' onClick={() => editDomainModal.current.open()}></i>
          </div>
          <div className="instituteDashboard-select-div">
            {/* image with change on selected theme */}
            {/* before selecting any theme imageBlur will show */}
            <ImageViewer 
            object={instituteDetailCountSuccess && defaultTemp.data.templateImg}
            defaultImage={ImageBlur} />
            {/* this div will hide when he theme is  selected */}
            {/* <div className="select-plan-text">
              <p className="text-xs w-400 primary ">Select a Template</p>
            </div> */}
            {/* when hover on the template image this screen will show */}
            {defaultTemp && defaultTemp.data._id ? (
              <div className="select-button-wrap">
                <div className="select-button-div">
                  <AppLink className="button button-primary btn-2xs btn-oval" to={`/theme-sidebar/${defaultTemp.data._id}`} target="_blank">Edit</AppLink>
                  <AppLink className="button btn-o-primary btn-2xs btn-oval" to={`/website-template-preview/${defaultTemp.data._id}/user`} target="_blank">Preview</AppLink>
                  {/* <button className=""></button>
                  <button className="button btn-o-primary btn-2xs btn-oval"></button> */}
                </div>
              </div>) : (<div className="select-plan-text">
                <AppLink className="text-xs w-400 primary " to="/templates">Select a Template</AppLink>
                {/* <p className="text-xs w-400 primary ">Select a Template</p> */}
              </div>)}
          </div>
        </div>
      ) : (
        <div className="instituteDashboard-middle-left">
          <p className="text-sm w-600">{user.user_institute_institute_name}</p>
          <div className="instituteDashboard-edit">
            {businessDataSuccess && domain && <button className="text-xxs w-400 primary" onClick={openDomain}>{domain}</button>}
          </div>
          <div className="instituteDashboard-edit">
            <button className="text-xxs w-400 primary" onClick={openSubDomain}>{user.user_institute_institute_subdomain}{dynamicRoute()}</button>
            <i className='ed-icon i-xs primary icon-edit' onClick={() => openPopup()}></i>
          </div >
          <div className="instituteDashboard-select-div">
            {/* image with change on selected theme */}
            {/* before selecting any theme imageBlur will show */}
            <img src={ImageBlur} alt="" />
            {/* this div will hide when he theme is  selected */}
            {/* when hover on the template image this screen will show */}
            {/* <div className="select-button-wrap">
              <div className="select-button-div">
                <AppLink className="button button-primary btn-2xs btn-oval" to="/">Save</AppLink>
                <AppLink className="button btn-o-primary btn-2xs btn-oval" to="/">Edit</AppLink>
              </div>
            </div> */}
          </div>
        </div >
      )}
      <UpdateSubdomain refProp={editDomainModal} closePopUp={() => closePopUp()} edit={removeData} />
    </React.Fragment >
  )
}

export default TemplateChoose