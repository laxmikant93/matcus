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
import Uploader from '../Common/ImageUploader'
// import ImageCropper from '../Common/Cropper'
import UploadButton from '../Common/UploadButton'
import ImageViewer from '../Common/ImageViewer'
import ValidationFile from '../Classes/ValidationFile'
import FormError from '../Common/Form/FormError'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createWebsiteTemplate, editWebsiteTemplateSetting, resetEditWebsiteTemplateSetting, updateDynamicWebsiteSettingsTemplate, updateDynamicWebsiteThemeTemplate } from '../store/actions/WebsiteTemplate'
import { useRef } from 'react'

const SettingContent = ({ onUpdateSetting }) => {
  const [siteLogo, setSiteLogo] = useState("")
  const [siteAppIcon, setAppIcon] = useState("")
  const [siteAppName, setSiteAppName] = useState("IVJL")
  const [siteNameError, setSiteNameError] = useState(false)
  const [siteNameEditable, setSiteNameEditable] = useState(false)
  const siteLogoRef = useRef()
  const appIconRef = useRef()
  const { user, instituteData, instituteDataSuccess, themeData, editSettingsLoading, editSettingsSuccess } = useSelector((state) => {
    return {
      user: state.user,
      instituteData: state.websiteTemplate.getTemplate.data,
      instituteDataSuccess: state.websiteTemplate.getTemplate.success,
      themeData: state.websiteTemplate.getTemplate.data,
      editSettingsSuccess: state.websiteTemplate.edit.success,
      editSettingsLoading: state.websiteTemplate.edit.loading,
    }
  })
  const [isFilled, setIsFilled] = useState(false)
  const [siteNameHide, setSiteNameHide] = useState(true)
  const [isFilledPrev, setIsFilledPrev] = useState(false)
  const dispatch = useDispatch()
  const [prevSettingsData, setPrevSettingsData] = useState({})
  const { themeId } = useParams()
  const handleUpload = (data, type) => {
    if (type === "siteLogo") {
      setSiteLogo(data)
    } else {
      setAppIcon(data)
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
  const handleCheck = (e) => {
    setSiteNameHide(e.target.checked)
  }
  useEffect(() => {
    if (instituteDataSuccess && instituteData && !isFilled) {
      setIsFilled(true)
      setSiteLogo(instituteData.instituteData.institute_logo)
      setSiteAppName(instituteData.instituteData.institute_name)
      setAppIcon(instituteData.instituteData.favIcon)
      setSiteNameHide(instituteData.instituteData.showBusinessName)
    }
  }, [instituteData, instituteDataSuccess, isFilled])
  const payloadDataInstitute = {
    sitesettings: {
      institute_logo: siteLogo,
      institute_name: siteAppName,
      favIcon: siteAppIcon,
      showBusinessName: siteNameHide
    },
    owner: user._id,
    institute: user.user_institute,
    theme: themeData.themeData._id,
    isDefaultTheme: true,
    industry: user.user_business_type
  }
  const payloadDataBusiness = {
    sitesettings: {
      buisness_logo: siteLogo,
      business_name: siteAppName,
      showBusinessName: siteNameHide,
      favIcon: siteAppIcon,
    },
    owner: user._id,
    business: user.user_business,
    theme: themeData.themeData._id,
    isDefaultTheme: true,
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
  useEffect(() => {
    if (!siteNameEditable) {
      dispatch(updateDynamicWebsiteSettingsTemplate({
        sitesettings: {
          institute_logo: siteLogo,
          institute_name: siteAppName,
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
      {instituteDataSuccess ? <ul className="setting-wrap">
        <li>
          <span >Site Logo</span>
          <ImageViewer object={siteLogo ? siteLogo : dummyProfile} defaultImage={dummyProfile} className="img-fluid mb-20 mt-10" alt="" />
          {
            !siteLogo || siteLogo === "" ? (
              <>
                <div class="upload-wrap mb-20">
                  <div class="form-group file-input-wrapper">
                    {/* <ImageCropper
                      logoLand={true}
                      square={true}
                      minWidth={70}
                      ref={siteLogoRef}
                      maxWidth={210}
                      defaultValue={siteAppIcon}
                      onUploaded={(data) => handleUpload(data, "siteLogo")}
                      BtnName="Upload"
                      IconClassName="icon-file-cloud"
                      BtnPropClass="file-input-overlap button btn-xs button-primary"
                      InputOvelapClass="file-input-overlap button btn-xs button-primary"
                    /> */}
                    <Uploader size={5}
                      // accept={IMG_ACCEPT}
                      onclose={() => siteLogoRef?.current?.close()}
                      multiSelect={false} discartRef={siteLogoRef} onUploaded={(val) => handleUpload(val,"siteLogo")} uploadLimit={1} />
                    <UploadButton onClick={() => siteLogoRef?.current?.open()} IconClassName="icon-file-cloud"
                      BtnPropClass="file-input-overlap button btn-xs button-primary"
                      BtnName="Upload"
                      InputOvelapClass="file-input-overlap button btn-xs button-primary"/>
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
              <ImageViewer
                object={siteAppIcon ? siteAppIcon : metaIcon}
                defaultImage={metaIcon}
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
            <ImageViewer object={siteAppIcon ? siteAppIcon : Logo} defaultImage={Logo} width="72" alt="" />
          </div>
          {
            siteAppIcon === "" || !siteAppIcon ? (
              <>
                <div class="upload-wrap mb-20">
                  <div class="form-group file-input-wrapper">

                    {/* <ImageCropper
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
                    /> */}
                      <Uploader size={5}
                      onclose={() => appIconRef?.current?.close()}
                      multiSelect={false} discartRef={appIconRef} onUploaded={(val) => handleUpload(val,"appIcon")} uploadLimit={1} />

                    <UploadButton onClick={() => appIconRef?.current?.open()} IconClassName="icon-file-cloud"
                      BtnPropClass="file-input-overlap button btn-xs button-primary"
                      BtnName="Upload"
                      InputOvelapClass="file-input-overlap button btn-xs button-primary"/>

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
          {editSettingsLoading ? <button className='button button-primary btn-xs'>Saving...</button> :
            <button className='button button-primary btn-xs' onClick={updateSiteSettings}>Save Site Settings</button>}

          <button className='button btn-xs btn-o-gray' onClick={() => discardSettings()}>Discard</button>
        </div>
      </ul>
        : <div className='loadingGridData'>Loading....</div>
      }
    </>
  )
}

export default SettingContent