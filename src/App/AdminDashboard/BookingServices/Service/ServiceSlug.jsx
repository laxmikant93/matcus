/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ValidationUtils from '../../../../Classes/ValidationUtils';
import AppLink from '../../../../Common/AppLink';
import FormError from '../../../../Common/Form/FormError';
import FormInput from '../../../../Common/Form/FormInput';
import FormTextArea from '../../../../Common/Form/FormTextArea';
import { RemoveHTMLTags } from "../../../../CommonFunctions";
import { getSlugAvailibilty } from '../../../../store/actions/ecommerce/action/product';
import SeoServicePopup from './SeoPopup';

import "./ServiceSlug.scss"

const ServiceSlug = ({ serviceTitle,handleUpdate, serviceDescription, allDataForSeo, metakeywordss, urlSlugs, metaDescriptions, handleSubmit }) => {
  const [seoSetting, setSeoSetting] = useState(false);
  const [metaDescription, setmetaDescription] = useState()
  const [urlSlug, seturlSlug] = useState("");
  const [metaInputWrapper, setMetaInputWrapper] = useState(false);
  const [metakeywords, setMetaKeywords] = useState([]);
  const [keyword, setKeyword] = useState("")
  const [editSeo, setEditSeo] = useState(false);
  const [metaDescriptionError, setmetaDescriptionError] = useState(false);
  const [urlSlugError, seturlSlugError] = useState(false);
  let dispatch = useDispatch();
  const history = useNavigate()
  const [seoData, setseoData] = useState();
  // console.log(urlSlugs)
  // console.log(metakeywordss)
  const SeoConfirmPoupref = useRef()
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  })

  useEffect(() => {
    seturlSlug(serviceTitle.replaceAll(" ", "-"))
    if (RemoveHTMLTags(serviceDescription)) {
      setmetaDescription(RemoveHTMLTags(serviceDescription.replaceAll("<br>", " ")).slice(0, 155).replaceAll("&nbsp;", " "));
    } else if (serviceTitle) {
      seturlSlug(serviceTitle.replaceAll(" ", "-"))
    }
  }, [metaDescriptions, metakeywordss, serviceDescription, serviceTitle])

  useEffect(() => {
    if (metakeywordss && metaDescriptions) {
      // console.log("asdasd")
      setmetaDescription(metaDescriptions)
      seturlSlug(urlSlugs)
      setMetaKeywords(metakeywordss)
    }
  }, [metaDescriptions, metakeywordss, urlSlugs])

  const handleChange = (e) => {
    let inputName = e.target.name
    let inputValue = e.target.value
    switch (inputName) {
      case "Meta_description":
        setmetaDescription(inputValue);
        setmetaDescriptionError(ValidationUtils.isEmpty(inputValue))
        break;
      case "URL_slug":
        seturlSlug(inputValue.replaceAll(" ", "-"))
        seturlSlugError(ValidationUtils.isEmpty(inputValue.replaceAll(" ", "-")))
        break;

      default:
        break;
    }
  }

  const handleDelete = (i) => {
    let array = metakeywords
    array.splice(i, 1)
    setMetaKeywords([...array])
  }

  const handleInput = (e) => {
    let inputValue = e.target.value
    let key = e.key
    // console.log(key, e)
    setKeyword(inputValue)
  }

  const handleRemove = (e) => {
    if (metakeywords.length > 0) {
      handleDelete(metakeywords.length - 1)
    }
  }

  const SeoHandle = () => {
    setSeoSetting(!seoSetting)
    setEditSeo(!seoSetting)
  }

  const handleSave = (e) => {
    let key = e.key
    let inputValue = e.target.value
    let array = metakeywords
    if (inputValue) {
      if (key === 'Enter') {
        array.push(inputValue)
        setKeyword("")
        setMetaKeywords([...array])
      }
    }
  }

  const handleCancel = () => {
    // setmetaDescription(RemoveHTMLTags(serviceDescription.replaceAll("<br>", " ")).slice(0, 155).replaceAll("&nbsp;", " "));
    seturlSlug(serviceTitle)
    setMetaKeywords([])
    setSeoSetting(seoData && seoData.title ? seoData.title : serviceTitle);
    setSeoSetting(!seoSetting)
    setEditSeo(!seoSetting)
  }

  const isFormValid = () => {
    return ValidationUtils.isNotEmpty(urlSlug)
      && ValidationUtils.isNotEmpty(metaDescription)
  }

  const HandleSaveeeeee = () => {

    if (isFormValid()) {
      setseoData({
        title: urlSlug,
        desc: metaDescription,
        url: urlSlug
      })
      allDataForSeo({
        metaTitle: urlSlug,
        metaDescription: metaDescription,
        urlSlug: urlSlug,
        metakeywords: metakeywords
      })
      setSeoSetting(!seoSetting)
      setEditSeo(!seoSetting)


    } else {
      setmetaDescriptionError(true)
      seturlSlugError(true)
    }
  }
  const handleContactUs = () => {
    SeoConfirmPoupref.current.open()
    // if (handleSubmit()) {
    // history("/marketing-form")
    // }
  }

  const handleSeoConfirmClose=()=>{
    SeoConfirmPoupref.current.close()
  }
  return (
    <>
      <div className="book-wrapper">
        <div className="Seo-head">
          <h2 className="title">SEO Settings</h2>
          {editSeo ?
            <button className="seo-btn primary" onClick={SeoHandle}>Close</button>
            :

            <button className="seo-btn primary" onClick={SeoHandle}>Edit</button>
          }

        </div>
        <div className="Seo-body">
          <h3 className='title'>Search engine preview</h3>
          <h5 className='subtitle mb-5'>{urlSlug ? urlSlug : serviceTitle}</h5>
          {user.domain ?
            <p className="LinkUrl">{`https://${user.domain}${urlSlug}`}</p>
            :
            user.user_institute_institute_subdomain ?
              <p className="LinkUrl">{`https://${user.user_institute_institute_subdomain}${urlSlug}`}</p>
              : <p className="LinkUrl">{`https://${user.user_institute_institute_subdomain}${urlSlug}`}</p>
          }
          <small>{metaDescription}</small>
        </div>
        {
          seoSetting ? (
            <>
              {/* <form > */}
              <div className="drop-body">
                <div className="formFieldwrap">
                  <FormTextArea
                    name="Meta_description"
                    labelPosition="top"
                    label="Meta description"
                    placeholder="Add Meta description"
                    value={metaDescription}
                    onChange={handleChange}
                    maxLength="155"
                  />
                  <FormError />
                  <FormError
                    show={!metaDescription && metaDescriptionError}
                    error="Meta description is required."
                  />
                </div>
                <div className="formFieldwrap">
                  <FormInput
                    labelPosition="top"
                    label="URL slug"
                    name="URL_slug"
                    onChange={handleChange}
                    placeholder="URL slug"
                    maxLength="80"
                    value={urlSlug}
                  />
                  <FormError />
                  <FormError
                    show={!urlSlug && urlSlugError}
                    error="URL Slug is required."
                  />
                </div>
                <div className="formFieldwrap">
                  {/* <FormInput
                      labelPosition="top"
                      label="Meta keywords"
                      placeholder="Enter meta keywords"
                    />
                    <FormError /> */}
                  <p className="label-heading"> Meta keywords</p>
                  <div className={`meta-keywords-wrapper ${metaInputWrapper ? 'meta-keywords-border' : ''}`} onClick={() => setMetaInputWrapper(!metaInputWrapper)}>

                    {/* // <p className="text-xxs w-500 base" > hello people</p> */}
                    <div className="meta-keywords-wrap">
                      {
                        metakeywords.length ? metakeywords.map((options, key) => (
                          <div className="chips-container" >
                            <div
                              role={'button'}
                              onClick={() => handleDelete(key)} className="chip-button">
                              <span className="chip-name">{options}</span>
                              <i className="icon-chipCross "></i></div>
                          </div>
                        )) : ""
                      }
                      <div className="input-container">
                        <input type="text" placeholder="Enter meta keywords"
                          value={keyword}
                          onChange={handleInput}
                          onKeyUp={handleInput}
                          onKeyDown={(e) => e.key === "Enter" ? handleSave(e) : e.key === "Backspace" && !e.target.value && handleRemove(e)} name="meta_input" className="meta-keyword-input" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="drop-foot">
                <button className="button btn-xs btn-o-primary btn-oval" onClick={handleCancel}>Cancel</button>
                <button className="button btn-xs button-primary btn-oval" onClick={HandleSaveeeeee}>Save</button>
              </div>
              <div className="drop-description">
                <h5 className="title">Hire a professional</h5>
                <p className="subtitle">Optimize your store's product pages
                  with the help of an expert. &nbsp;
                  {/* <AppLink to="#" >Contact us</AppLink> */}
                  <span role={'button'}
                    className="contact-us-link primary underline text-xxs"
                    onClick={() => handleContactUs()}
                  >Contact Us </span>
                </p>
              </div>
              {/* </form> */}
            </>
          ) : ""
        }
      </div>

      <SeoServicePopup openref={SeoConfirmPoupref} handleUpdate={handleUpdate} handleSubmit={handleSubmit} onclose={() => handleSeoConfirmClose()} HandleSaveDetails={HandleSaveeeeee}/>
    </>
  )
}

export default ServiceSlug