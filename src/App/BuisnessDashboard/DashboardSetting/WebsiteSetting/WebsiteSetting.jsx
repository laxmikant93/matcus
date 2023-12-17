import React, { useEffect } from 'react'
import Breadcrumb from '../../../../Common/Breadcrumb'
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem'
import CardContainer from '../SettingComponents/CardContainer/CardContainer';
import CircleButton from '../SettingComponents/CircleButton/CircleButton'
import './websiteSetting.scss';
import FormInput from '../../../../Common/Form/FormInput';
import FormError from '../../../../Common/Form/FormError'
import { useState } from 'react';
import UploadFavIcon from './Components/UploadFavicon/UploadFavIcon';
import WebsiteMetaTitle from './Components/WebsiteMetatitle/WebsiteMetaTitle';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateInstituteInformation } from '../../../../store/actions/instituteregistration/action';
import { getInstituteData, patchInstituteInfo } from '../../../../store/actions/businessInfo';
import ValidationFile from '../../../../Classes/ValidationFile';
import { useRef } from 'react';

const WebsiteSetting = () => {
  const { user, businessdetail, getbusinessInfoData } = useSelector((state) => {
    return {
      user: state.user,
      businessdetail: state.manageinstituteinfo,
      getbusinessInfoData: state.businessInfo.getInstituiteData,

    };
  });
  const [changeText, setChangeText] = useState(false)
  const history = useNavigate();
  const dispatch = useDispatch()
  const [siteName, setSiteName] = useState("")
  const [domainName, setdomainName] = useState("")
  const [siteNameError, setSiteNameError] = useState(false);
  const [isFilled, setisFilled] = useState(false);
  const [editSiteName, seteditSiteName] = useState(false);




  const handleSiteName = (e) => {
    let inputValue = e.target.value;
    setSiteName(inputValue)
    let noSpace = inputValue.replaceAll(" ", "")
    setdomainName(noSpace)
  }
  // console.log(domainName, "domian")
  useEffect(() => {
    dispatch(getInstituteData(user.user_business, user.user_business_type));
  }, [dispatch, user.user_business, user.user_business_type])

  const handleEdit = () => {
    seteditSiteName(true)
  }
  const handleDone = () => {
    if (ValidationFile.isEmpty(siteName)) {
      setSiteNameError(true);
    }
    if (!ValidationFile.isEmpty(siteName)) {
      setChangeText(!changeText)
      dispatch(patchInstituteInfo(user.user_business, { business_name: siteName }, user.user_business_type, user._id, user.user_dashboard_stepper));
    }
    seteditSiteName(false)
  }
  useEffect(() => {
    if (getbusinessInfoData.success && !getbusinessInfoData.loading && !isFilled) {
      setisFilled(true);
      if(user.user_business_type==="LMS"){
        setSiteName(getbusinessInfoData.data.institute_name?getbusinessInfoData.data.institute_name:"")
        let nospace = (getbusinessInfoData.data.institute_name)?.replaceAll(" ", "")
        setdomainName(nospace)
      }else{
        setSiteName(getbusinessInfoData.data.business_name ? getbusinessInfoData.data.business_name : "");
        let nospace = (getbusinessInfoData.data.business_name)?.replaceAll(" ", "")
        setdomainName(nospace)
      }
    
    }
  }, [getbusinessInfoData.success, getbusinessInfoData, user.user_business_type, isFilled])

  const checkAvailability = () => {
    history(`/checkdomain/${domainName}`);
  }
  const [metaTitle,setMetaTitle]=useState("")
  const [favIcon,setFavIcon]=useState("")
  const onUploadFavIcon=(val)=>{
    setMetaTitle(val)
  }
  const onMetaTitle = (val)=>{
    setFavIcon(val)
  }
  useEffect(() => {
    if (getbusinessInfoData.success && !getbusinessInfoData.loading) {
      setFavIcon(getbusinessInfoData.data.favIcon);
      setMetaTitle(getbusinessInfoData.data.meta_title ? getbusinessInfoData.data.meta_title : "School Management System I LMS");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getbusinessInfoData.success, getbusinessInfoData])
  return (

    < React.Fragment >
      <div className='websiteSetting-container'>
        <Breadcrumb>
          <BreadcrumbItem to="/settings" title=" Settings" />
          {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
          <BreadcrumbItem to="/WebsiteSetting" title="Website Settings" />
        </Breadcrumb>
        <div className='websiteSetting-wrapper'>
          <div className='websiteSetting-topdiv'>
            <div className='heading-div'>
              <CircleButton position={'left'} path={'/settings'} />
              <div>
                <h1 className='text-md w-600 website-Setting-heading base'>Website Settings</h1>
                <p className='text-2xs w-400 base'>Setup your website settings here.</p>
              </div>
            </div>
            <hr className='mt-20' />
          </div>
          <div className='websiteSetting-lowerDiv'>
            <div className='lowerSection-nameSection'>
              <div className='nameSection-leftSidebar'>
                <CardContainer>
                  <div className='siteName-wrapper'>
                    <p className='tex-18 w-500 primary website-name'>Site Name</p>
                    <p className='text-xxs base w-300 mt-8'>Edit this name to easily find it on your Dashboard and more.</p>
                    {editSiteName ?
                      <div className='siteNameDone-wrapper'>
                        <div className='input-wrapper'>
                          <div className="formFieldwrap ">
                            <FormInput
                              type="text"
                              label=""
                              id="name"
                              name="site_name"
                              value={siteName}
                              onChange={handleSiteName}
                              placeholder="Enter Site Name"
                              maxLength="80"
                              autoFocus={true}
                            />
                            <FormError
                              show={siteNameError}
                              error=" Site name is required."
                            />
                          </div>
                        </div>
                        <div className='doneText-wrapper'>
                          <p className='text-xs w-400 primary cursor-pointer' onClick={handleDone}>Done</p>
                        </div>
                      </div> :
                      <>
                        <div className='siteName-edit-wrapper'>
                          <div className='edit-input-wrapper'>
                            <div className="formFieldwrap ">
                              <FormInput
                                type="text"
                                label=""
                                id="name"
                                name="site_name"
                                value={siteName}
                                placeholder="Enter Site Name"
                                maxLength="80"

                              />
                            </div>
                          </div>
                          <div className='edit-text-wrap'>
                            <p className='text-xs w-400 primary cursor-pointer s' onClick={handleEdit}>Edit</p>
                          </div>
                        </div>
                      </>
                    }
                  </div>
                </CardContainer>
              </div>
              <div className='nameSection-rightSidebar'>
                <div className='site-wrapper-right'>
                  <p className='text-18 w-400 primary'>Connect Domain</p>
                  <p className='text-xxs base w-300 mt-8'>Is your site name available for domain name. Check  the domain
                    availability of <span className='primary'>{domainName}</span> </p>
                  <button className='button btn-xs btn-o-primary btn-check mt-15' onClick={checkAvailability}>Check Availability</button>
                </div>
              </div>
            </div>

            <div className='uploadIocn-div'>
              <UploadFavIcon onUploadFavIcon={(v)=>onUploadFavIcon(v)} metaProp={metaTitle}/>
            </div>

            <div className='websiteMeta-title'>
              <WebsiteMetaTitle onMetaTitle={(v)=>onMetaTitle(v)} favProp={favIcon}/>
            </div>

          </div>

        </div>

      </div>
    </React.Fragment >
  )
}

export default WebsiteSetting