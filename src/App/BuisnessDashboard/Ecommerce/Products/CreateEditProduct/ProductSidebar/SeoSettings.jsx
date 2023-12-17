import React, { useRef } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ValidationUtils from "../../../../../../Classes/ValidationUtils";
import AppLink from "../../../../../../Common/AppLink";
import FormError from "../../../../../../Common/Form/FormError";
import FormInput from "../../../../../../Common/Form/FormInput";
import FormTextArea from "../../../../../../Common/Form/FormTextArea";
import { debounce } from "../../../../../../Common/ImageUploader/UnsplashSection/commonFunction";
import { RemoveHTMLTags } from "../../../../../../CommonFunctions";
import { getSlugAvailibilty } from "../../../../../../store/actions/ecommerce/action/product";
import SeoPopup from "../../../../../Dashboard/EcommerceDashboard/Component/SeoPopup";

const SeoSettings = ({ productName, productDesc, onLoadSeoData,contactRef }) => {
  const { data, loading, success } = useSelector((state) => state.productList.slugAvailability)
  let dispatch = useDispatch();
  const openref = useRef(null);
  const { _id } = useParams()

  const { user, productDetails } = useSelector((state) => {
    return {
      user: state.user,
      productDetails: state.productList.getSingleProduct.data,
    };
  })

  const [editSeo, setEditSeo] = useState(false);
  const [metaTitle, setmetaTitle] = useState("");
  const [metaDescription, setmetaDescription] = useState("");
  const [urlSlug, seturlSlug] = useState("");
  const [seoData, setseoData] = useState();
  const [urlSlugChanged, setUrlSlugChanged] = useState(false);
  const [metaInputWrapper, setMetaInputWrapper] = useState(false);
  const [metakeywords, setMetaKeywords] = useState([]);
  const [keyword, setKeyword] = useState("")
  //error states
  const [metaTitleError, setmetaTitleError] = useState(false);
  const [metaDescriptionError, setmetaDescriptionError] = useState(false);
  const [urlSlugError, seturlSlugError] = useState(false);


  console.log(contactRef,"jjijijiji")
  useEffect(() => {
    if (productName) {
      setmetaTitle(productName);
      seturlSlug(productName.replaceAll(" ", "-"))
      if (productName && !urlSlugChanged) {
        dispatch(getSlugAvailibilty(user.user_business, productName.replaceAll(" ", "-")))
      }

    }
    if (RemoveHTMLTags(productDesc)) {
      setmetaDescription(RemoveHTMLTags(productDesc.replaceAll("<br>", " ")).slice(0, 155).replaceAll("&nbsp;", " "));
    } else {
      if (productName) {
        setmetaDescription(`SHOP FOR ${productName}`);
      }
    }
  }, [dispatch, productDesc, productName, urlSlugChanged, user.user_business])

  useEffect(() => {
    if (productDetails && _id) {
      setmetaTitle(productDetails.product.metaTitle);
      setmetaDescription(productDetails.product.metaDescription);
      seturlSlug(productDetails.product.urlSlug);
      setMetaKeywords(productDetails.product?.metaKeywords);
    }
  }, [_id, productDetails])

  const handleEdit = () => {
    setEditSeo(true);
  }

  const handleChange = (e) => {
    let inputName = e.target.name
    let inputValue = e.target.value
    switch (inputName) {
      case "title_tag":
        setmetaTitle(inputValue)
        setmetaTitleError(ValidationUtils.isEmpty(inputValue));
        break;
      case "Meta_description":
        setmetaDescription(inputValue);
        setmetaDescriptionError(ValidationUtils.isEmpty(inputValue))
        break;
      case "URL_slug":
        setUrlSlugChanged(true)
        seturlSlug(inputValue.replaceAll(" ", "-"))
        seturlSlugError(ValidationUtils.isEmpty(inputValue.replaceAll(" ", "-")))

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
  const HandleSave = () => {
    if (isFormValid()) {
      setseoData({
        title: metaTitle,
        desc: metaDescription,
        url: urlSlug
      })
      dispatch(getSlugAvailibilty(user.user_business, urlSlug))
      setEditSeo(false);
    } else {
      setmetaTitleError(true)
      setmetaDescriptionError(true)
      seturlSlugError(true)
    }
  }
  // useEffect(() => {
  //   if (success) {
  //     if (data === urlSlug) {
  //       setEditSeo(false);
  //     } else {
  //       seturlSlug(data)
  //       seturlSlugError(true)
  //     }
  //   }

  // }, [data, success, urlSlug])

  const handleContactUs = () => {
    openref.current.open()
    // contactRoute(true)
  }
  const handleCancel = () => {
    setEditSeo(false);
    setmetaTitle(seoData && seoData.title ? seoData.title : productName);
  }
  const oncloseModal = () => {

  }
  useEffect(() => {
    onLoadSeoData({
      title: metaTitle,
      desc: metaDescription,
      url: urlSlug,
      keywords: metakeywords
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaDescription, metaTitle, urlSlug, metakeywords])
  // SEO mata keywords
  // meta keyword
  const handleDelete = (i) => {
    let array = metakeywords
    array.splice(i, 1)
    setMetaKeywords([...array])
  }
  const handleInput = (e) => {
    let inputValue = e.target.value
    let key = e.key
    setKeyword(inputValue)

  }
  const handleRemove = (e) => {
    // if (!inputValue) {
    // if (key === "Backspace") {
    if (metakeywords.length > 0) {
      handleDelete(metakeywords.length - 1)
    }
    // }
    // }
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


  return (
    <React.Fragment>
      <div className='addProduct-container  sectionGap'>
        <div className='e-commerce-wrap seo-wrap'>
          <div className='seo-text-wrapper'>
            <p className='text-s w-500 base '>SEO Settings</p>
            {editSeo ?
              <button className='add-another-option-btn' onClick={() => setEditSeo(false)}>Close</button> :
              <button className='add-another-option-btn' onClick={handleEdit}> Edit</button>}
          </div>

          <hr className='horizontal-line' />
          <div
            className={`sidebar-collection-wrap side-padding seo-div-wrapper seo-padding-bottom ${editSeo ? "" : 'seo-padding-bottom'}`}
          >
            <p className='text-xs w-500 base'>Search engine preview</p>
            <p className='text-xs w-500 primary mt-8'>{seoData && seoData.urlSlug ? seoData.urlSlug : metaTitle}</p>
            {user.domain ?
              <p className='seo-link'>{`https://${user.domain}/products/${urlSlug}`}</p>
              // <AppLink to="" className='seo-link'>{`https://${user.domain}/products/${metaTitle}`}</AppLink>
              :
              user.user_institute_institute_subdomain ?
                <p className='seo-link'>{`https://${user.user_institute_institute_subdomain}/products/${urlSlug}`}</p>
                // <AppLink to="" className='seo-link'>{`https://${user.user_institute_institute_subdomain}/products/${metaTitle}`}</AppLink>
                : <p className='seo-link'>{`https://${user.user_institute_institute_subdomain}/products/${urlSlug}`}</p>
            }
            {/* <p className='text-xxs w-400 base'>{metaDescription}</p> */}
            <p
            // dangerouslySetInnerHTML={{
            //   __html:
            //     metaDescription ?

            // : "",
            // }}
            >{metaDescription}</p>
          </div>
          {
            editSeo ? (
              <div className='seo-lower-wrapper'>
                <hr className='horizontal-line' />
                <div className='input-wrapper'>
                  <div className="formFieldwrap ">
                    <p className='label-heading'>
                      Title tag
                    </p>
                    <FormInput
                      type="text"
                      value={metaTitle}
                      id="titletag"
                      name="title_tag"
                      onChange={handleChange}
                      placeholder="Title tag"
                      maxLength="80"
                    />
                    <FormError
                      show={!metaTitle && metaTitleError}
                      error="Title tag is required."
                    />
                  </div>
                  <div className="formFieldwrap ">
                    <p className='label-heading'>
                      Meta description
                    </p>
                    <FormTextArea
                      className="form-control"
                      id="meta-description"
                      rows="3"
                      type="text"
                      name="Meta_description"
                      placeholder="Add Meta description"
                      value={metaDescription}
                      onChange={handleChange}
                      style={{ whiteSpace: " pre-wrap" }}
                      maxLength="155"
                    ></FormTextArea>
                    <FormError
                      show={!metaDescription && metaDescriptionError}
                      error="Meta description is required."
                    />
                  </div>
                  <div className="formFieldwrap ">
                    <p className='label-heading'>
                      URL slug
                    </p>
                    <FormInput
                      type="text"
                      // label="name"
                      value={urlSlug}
                      id="url-slug"
                      name="URL_slug"
                      onChange={(e) => handleChange(e)}
                      onKeyUp={(e) => handleChange(e)}
                      placeholder="URL slug"
                      maxLength="80"
                    />
                    <FormError
                      show={!urlSlug && urlSlugError}
                      error="URL Slug is required."
                    />
                    <FormError
                      show={urlSlug && urlSlugError}
                      error="URL Slug is already exist."
                    />
                  </div>
                  {/* meta keywords  */}
                  <div className="formFieldwrap ">
                    <p className='label-heading'>
                      Meta keywords
                    </p>
                    <div className={`meta-keywords-wrapper ${metaInputWrapper ? 'meta-keywords-border' : ''}`} onClick={() => setMetaInputWrapper(!metaInputWrapper)}>
                      {/* <p className="placeholder  text-xxs w-300">Enter meta keywords</p>
                      <p className="text-xxs w-500 base" > hello people</p> */}
                      <div className="meta-keywords-wrap">
                        {
                          metakeywords.length ? metakeywords.map((options, key) => (
                            <div className="chips-container" >
                              <div role={'button'} onClick={() => handleDelete(key)} className="chip-button"><span className="chip-name">{options}</span> <i className="icon-chipCross "></i></div>
                            </div>
                          )) : ""
                        }
                        <div className="input-container">
                          <input type="text" placeholder="Enter meta keywords" value={keyword} onChange={handleInput} onKeyUp={handleInput} onKeyDown={(e) => e.key === "Enter" ? handleSave(e) : e.key === "Backspace" && !e.target.value && handleRemove(e)} name="meta_input" className="meta-keyword-input" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='seo-button-wrapper'>
                  <hr className='horizontal-line' />
                  <div className='top-left-button-section seo-btn-div mt-15'>
                    <button className='button button-o-primary primary btn-oval btn-sm btn-primary-border ' onClick={handleCancel}>Cancel</button>
                    {/* {getSeodata ? <button className='button button-primary btn-oval btn-sm' onClick={HandleEdit} >Update</button> :

                      <button className='button button-primary btn-oval btn-sm' onClick={HandleSave} >Save</button>
                    } */}
                    <button className='button button-primary btn-oval btn-sm' onClick={HandleSave} >Save</button>
                  </div>
                </div>
                <div className='hire-wrapper'>
                  <div className='text-div'>
                    <p className='text-xxs w-500 base'>Hire a professional</p>
                    <p className='text-xxs w-400 base mt-10'>Optimize your store's product pages
                      with the help of an expert. <span role={'button'} className="contact-us-link text-xxs"
                        onClick={() => handleContactUs()}
                      >Contact Us </span></p>
                  </div>
                </div>
              </div>
            ) : (null)
          }
          <SeoPopup openref={openref} contactRef={contactRef} onclose={() => oncloseModal()} />
        </div>
      </div>
    </React.Fragment>
  )
}
export default SeoSettings