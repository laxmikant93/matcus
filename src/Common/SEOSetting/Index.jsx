import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ValidationUtils from '../../Classes/ValidationUtils';
import AppLink from '../AppLink';
import AppLinkUrl from '../AppLink/AppLinkUrl';
import FormError from '../Form/FormError';
import FormInput from '../Form/FormInput';
import FormTextArea from '../Form/FormTextArea'
import InputChips from './InputChips/InputChips';
import './seoSetting.scss';


const SEOSetting = ({ showSlider, collase, onclose, SeoData, getSeoData, mainName,firstRoute }) => {

  const history = useNavigate()

  const [symbolsArr] = useState(["#", " ", "%", "/", "&"]);
  //STATES
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setmetaDescription] = useState("")
  const [urlSlug, seturlSlug] = useState("");

  const [metaKeywords, setMetaKeywords] = useState([]);
  const [getMetaKeywords, setGetMetaKeywords] = useState([]);

  //ERROR STATES
  const [metaTitleError, setMetaTitleError] = useState(false)
  const [metaDescriptionError, setmetaDescriptionError] = useState(false)
  const [urlSlugError, seturlSlugError] = useState(false);

  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  })

  // GET SEO DATA
  useEffect(() => {
    if (getSeoData) {
      // console.log(getSeoData)
      setMetaTitle(getSeoData?.metaTitle)
      setmetaDescription(getSeoData?.metaDescription)
      seturlSlug(getSeoData?.urlSlug)
      setGetMetaKeywords(getSeoData?.metaKeywords)
    }
  }, [getSeoData])


  // FUNCTION 
  const closeModal = () => {
    onclose();
    setMetaTitle("")
    setmetaDescription("")
    seturlSlug("")
    setMetaKeywords("")
  }

  const handleContactUs = () => {
    history("/marketing-form")
  }


  useEffect(() => {
    if (mainName && !getSeoData?.metaTitle && !getSeoData?.urlSlug) {
      setMetaTitle(mainName);
      seturlSlug(mainName)
    }
  }, [getSeoData?.metaTitle, getSeoData?.urlSlug, mainName])
  const handleChange = (e) => {
    let inputName = e.target.name
    let inputValue = e.target.value
    switch (inputName) {
      case "Meta_title":
        setMetaTitle(inputValue);
        setMetaTitleError(ValidationUtils.isEmpty(inputValue))
        break;
      case "Meta_description":
        setmetaDescription(inputValue);
        setmetaDescriptionError(ValidationUtils.isEmpty(inputValue))
        break;
      case "URL_slug":
        seturlSlug(inputValue)
        seturlSlugError(ValidationUtils.isEmpty(inputValue))
        break;
      default:
        break;
    }
  }

  const isFormValid = () => {
    return ValidationUtils.isNotEmpty(metaTitle)
      && ValidationUtils.isNotEmpty(metaDescription)
      && ValidationUtils.isNotEmpty(urlSlug)
  }

  const handleSave = () => {
    if (isFormValid()) {
      SeoData({
        metaTitle: metaTitle,
        metaDescription: metaDescription,
        urlSlug: urlSlug,
        metaKeywords: metaKeywords
      })
      closeModal()
    } else {
      setMetaTitleError(true)
      setmetaDescriptionError(true)
      seturlSlugError(true)
    }
  }
  const metaKeyData = (value) => {
    setMetaKeywords(value)
  }


  return (
    <div className='seoContainer'>

      <div className='seoSetting-preview-wrap'>
        <p className='text-xs w-500 base'>Search engine preview</p>
        <p className='text-xs w-500 primary mt-8'>{metaTitle}</p>

        {user.domain ?
          <p className="text-2xs w-400 seo-link mt-5">{firstRoute?`https://${user.domain}${firstRoute}/${urlSlug ? urlSlug : ""}}`:`https://${user.domain}/${urlSlug ? urlSlug : ""}}`}</p>
          :
          <p className="text-2xs w-400 seo-link mt-5">{firstRoute?`https://${user.user_institute_institute_subdomain}.${AppLinkUrl.getHost()}/${firstRoute}/${urlSlug ? urlSlug : ""}`:`https://${user.user_institute_institute_subdomain}.${AppLinkUrl.getHost()}/${urlSlug ? urlSlug : ""}`}</p>
        }
        <p className='text-2xs w-400 base seo-link-describtion'>{metaDescription}</p>
      </div>
      {
        collase ? '' : (
          <React.Fragment>
            <hr className='line' />
            <section className={`seo-upper-section ${showSlider ? 'showOverFlow' : ''}`}>
              <div className='meta-title-wrap'>
                <div className="formFieldwrap ">
                  <FormInput
                    type="text"
                    label="Meta Title"
                    labelPosition={'top'}
                    id="titletag"
                    name="Meta_title"
                    value={metaTitle}
                    onChange={handleChange}
                    placeholder="Title tag"
                    maxLength="80"
                  />
                  <FormError
                    show={!metaTitle && metaTitleError}
                    error="Title tag is required."
                  />
                </div>
              </div>
              <div className='meta-description-wrap'>
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
              </div>

              <div className='url-slug-wrap'>
                <div className="formFieldwrap ">
                  <FormInput
                    labelPosition="top"
                    label="URL slug"
                    name="URL_slug"
                    onChange={handleChange}
                    placeholder="URL slug"
                    maxLength="80"
                    value={urlSlug}
                    onKeyDown={(e) =>
                      symbolsArr.includes(e.key) && e.preventDefault()
                    }
                  />
                  <FormError
                    show={!urlSlug && urlSlugError}
                    error="URL Slug is required."
                  />
                  {/* <FormError
                    show={false}
                    error="URL Slug is already exist."
                  /> */}
                </div>
              </div>
              <div className='metaKeywords-wrap'>
                <InputChips metaKeyData={metaKeyData} getMetaKeywords={getMetaKeywords} />
              </div>
            </section>
            <div className='seobtn-wrap'>
              <hr className='line' />
              <button className='button btn-xs btn-o-primary btn-oval' onClick={() => closeModal()}>Cancel</button>
              <button className='button btn-xs button-primary btn-oval' onClick={handleSave}>Save</button>
            </div>
            <div className='hireProfessinal-section'>
              <p className='text-xxs w-500 base'>Hire a professional</p>
              <div className='hireProfessinal-details'>
                <p className='text-xxs w-400 base'>Optimize your store's product pages
                  with the help of an expert. <span className='primary cursor-pointer'>Contact us</span> </p>
              </div>
            </div>
          </React.Fragment>
        )
      }
    </div>
  )
}

export default SEOSetting