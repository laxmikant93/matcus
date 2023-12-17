import React, { useEffect } from 'react'
import "./themesidebar.scss"
import dummyProfile from "../assets/images/img/defaultprofile.jpg"
// import IconCloud from "./sidebar-icon/icon-cloud.svg"
import Metaframe from "./sidebar-icon/img-frame.png"
import Logo from "./sidebar-icon/logo.png"
import metaIcon from "./sidebar-icon/metalogo.png"
import { useSelector } from 'react-redux'
// import FormInputFile from "../Common/Form/FormInputFile"
import { useState } from 'react'
import ImageCropper from '../Common/Cropper'
import ValidationFile from '../Classes/ValidationFile'
import FormError from '../Common/Form/FormError'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createWebsiteTemplate, editWebsiteTemplateSetting, resetEditWebsiteTemplateSetting, updateDynamicWebsiteSettingsTemplate, updateDynamicWebsiteThemeTemplate } from '../store/actions/serviceWebsiteTemplate'
import { useRef } from 'react'

const ServiceSettingContent = ({ onUpdateSetting }) => {
  const [siteLogo, setSiteLogo] = useState("")
  const [siteAppIcon, setAppIcon] = useState("")
  const [siteAppName, setSiteAppName] = useState("IVJL")
  const [siteNameHide, setSiteNameHide] = useState(true)
  const [siteNameError, setSiteNameError] = useState(false)
  const [siteNameEditable, setSiteNameEditable] = useState(false)
  const { user, instituteData, instituteDataSuccess, themeData, editSettingsLoading, editSettingsSuccess } = useSelector((state) => {
    return {
      user: state.user,
      instituteData: state.serviceTemplate.getTemplate.data,
      instituteDataSuccess: state.serviceTemplate.getTemplate.success,
      themeData: state.serviceTemplate.getTemplate.data,
      editSettingsSuccess: state.serviceTemplate.edit.success,
      editSettingsLoading: state.serviceTemplate.edit.loading,
    }
  })
  const [isFilled, setIsFilled] = useState(false)

  const [isFilledPrev, setIsFilledPrev] = useState(false)
  const dispatch = useDispatch()
  const [prevSettingsData, setPrevSettingsData] = useState({})
  const { themeId } = useParams()
  const siteLogoRef = useRef()
  const appIconRef = useRef()
  const handleUpload = (data, type) => {
    let location = data.location
    if (type === "siteLogo") {
      setSiteLogo(location)
    } else {
      setAppIcon(location)
    }
  }
  const handleInput = (e) => {
    let value = e.target.value
    setSiteAppName(ValidationFile.spaceNotAccept(value))
    setSiteNameError(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(value)))
  }
  const handleSave = () => {
    if (ValidationFile.isEmpty(siteAppName)) {
      setSiteNameError(true)
    }
    if (ValidationFile.isNotEmpty(siteAppName)) {
      setSiteNameEditable(false)
    }
  }
  useEffect(() => {
    if (instituteDataSuccess && instituteData && !isFilled) {
      setIsFilled(true)
      setSiteLogo(instituteData.instituteData.business_logo)
      setSiteAppName(instituteData.instituteData.business_name)
      setAppIcon(instituteData.instituteData.favIcon)
      setSiteNameHide(instituteData.instituteData.showBusinessName)
    }
  }, [instituteData, instituteDataSuccess, isFilled])
  const payloadDataInstitute = {
    sitesettings: {
      institute_logo: siteLogo,
      institute_name: siteAppName,
      favIcon: siteAppIcon,
    },
    owner: user._id,
    institute: user.user_institute,
    // theme: themeData.themeData._id,
    isDefaultTheme: true,
    industry: user.user_business_type
  }
  const payloadDataBusiness = {
    sitesettings: {
      buisness_logo: siteLogo,
      business_name: siteAppName,
      favIcon: siteAppIcon,
      showBusinessName: siteNameHide
    },
    owner: user._id,
    business: user.user_business,
    // theme: themeData.themeData._id,

    industry: user.user_business_type
  }
  const updateSiteSettings = () => {
    if (ValidationFile.isEmpty(siteAppName)) {
      setSiteNameError(true)
    }
    if (ValidationFile.isNotEmpty(siteAppName)) {
      setSiteNameEditable(false)
      if (user.user_business_type === "LMS") {


        dispatch(editWebsiteTemplateSetting(payloadDataInstitute))
      } else {

        dispatch(editWebsiteTemplateSetting(payloadDataBusiness))

      }
      // dispatch(editWebsiteTemplateSetting(payloadData))

    }
  }
  const discardSettings = () => {
    onUpdateSetting()
    dispatch(updateDynamicWebsiteThemeTemplate(prevSettingsData))
  }
  const handleCheck = (e) => {
    setSiteNameHide(e.target.checked)
  }
  useEffect(() => {
    if (!siteNameEditable) {
      dispatch(updateDynamicWebsiteSettingsTemplate({
        sitesettings: {
          business_logo: siteLogo,
          business_name: siteAppName,
          favIcon: siteAppIcon,
          showBusinessName: siteNameHide
        }
      }))
    }
  }, [dispatch, siteAppIcon, siteAppName, siteLogo, siteNameEditable, siteNameHide])
  useEffect(() => {
    if (editSettingsSuccess) {
      onUpdateSetting()
      dispatch(resetEditWebsiteTemplateSetting())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editSettingsSuccess])
  useEffect(() => {
    if (!isFilledPrev) {
      setIsFilledPrev(true)
      setPrevSettingsData(themeData)
    }
  }, [isFilledPrev, themeData])
  return (
    <>
      {/* {instituteDataSuccess ?  */}
      <ul className="setting-wrap">
        <li>
          <span >Site Logo</span>
          <img src={siteLogo ? siteLogo : dummyProfile} className="img-fluid mb-20 mt-10" alt="" />
          {
            !siteLogo || siteLogo === "" ? (
              <>
                <div class="upload-wrap mb-20">
                  <div class="form-group file-input-wrapper">
                    <ImageCropper
                      logoLand={true}
                      square={true}
                      minWidth={70}
                      maxWidth={210}
                      ref={siteLogoRef}
                      defaultValue={siteAppIcon}
                      onUploaded={(data) => handleUpload(data, "siteLogo")}
                      BtnName="Upload"
                      IconClassName="icon-file-cloud"
                      BtnPropClass="file-input-overlap button btn-xs button-primary"
                      InputOvelapClass="file-input-overlap button btn-xs button-primary"
                    />
                    {/* <div class="file-input-overlap button btn-xs button-primary">
                      <i class="icon-file-cloud"></i>Upload
                    </div> */}
                  </div>
                </div>
              </>
            ) : (<button className="button btn-xs btn-o-primary mb-20" onClick={() => setSiteLogo("")}>Remove</button>)
          }


        </li>
        <li>Site Name

          <div className="editable_content mt-10" >
            {
              siteNameEditable ?
                <div className='formFieldwrap'>
                  <input type="text" onChange={handleInput} value={siteAppName} />
                  <FormError show={siteNameError} error="Site Name required." />
                </div>
                : <h4 onClick={() => setSiteNameEditable(true)} >{siteAppName}</h4>
            }
            {!siteNameEditable && <button className="primary" onClick={() => setSiteNameEditable(!siteNameEditable)}>Edit</button>}
            {siteNameEditable && <button className="primary" onClick={handleSave}>save</button>}

          </div>
          <div className='mb-10' >
            <label>
              <input type="checkbox" onChange={handleCheck} checked={siteNameHide} /> Show Site Name
            </label>
          </div>


        </li>
        <li>Site App Icon
          <div className="logo-wrap mb-20 mt-10">
            <img src={Metaframe} className="" alt="" />
            <p className="text-xs metalogo">
              {" "}
              <img
                src={siteAppIcon ? siteAppIcon : metaIcon}
                alt="metafab"
                width="20"
              />
              <span className="metatitle">
                {siteAppName
                  ? siteAppName.length < 6
                    ? siteAppName
                    : siteAppName.substring(0, 5) + ".."
                  : siteAppName.substring(0, 5) + ".."}
              </span>
            </p>
            <img src={siteAppIcon ? siteAppIcon : Logo} width="72" alt="" />
          </div>
          {
            siteAppIcon === "" || !siteAppIcon ? (
              <>
                <div class="upload-wrap mb-20">
                  <div class="form-group file-input-wrapper">

                    <ImageCropper
                      logoLand={true}
                      square={true}
                      minWidth={70}
                      maxWidth={210}
                      ref={appIconRef}
                      defaultValue={siteAppIcon}
                      onUploaded={(data) => handleUpload(data, "appIcon")}
                      BtnName="Upload"
                      IconClassName="icon-file-cloud"
                      BtnPropClass="file-input-overlap button button-primary"
                      InputOvelapClass="file-input-overlap button button-primary"
                    />
                    {/* <div class="file-input-overlap button button-primary">
                      <i class="icon-file-cloud"></i>Upload
                    </div> */}
                  </div>
                </div>
              </>
            ) : (<button className="button btn-xs btn-o-primary mb-10" onClick={() => setAppIcon("")}>Remove</button>)
          }
        </li>
        <div className="group-btn">
          {editSettingsLoading ?
            <button className='button button-primary btn-xs'>Saving...</button> :
            <button className='button button-primary btn-xs'
              onClick={updateSiteSettings}
            >Save Site Settings</button>
          }

          <button className='button btn-xs btn-o-gray' onClick={() => discardSettings()}>Discard</button>
        </div>
      </ul>
      {/* : <div className='loadingGridData'>Loading....</div> */}
      {/* } */}
    </>
  )
}

export default ServiceSettingContent