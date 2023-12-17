import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import CheckboxInput from '../../../../Common/Form/CheckboxInput';
import './sidebar.scss'
import FormError from '../../../../Common/Form/FormError'
import FormInput from '../../../../Common/Form/FormInput'
import MaketingIcon from '../assets/icons/marketing.svg'
import CrossIcon from '../assets/icons/cross.svg'
import SeoIcon from '../assets/icons/seo.svg'
import ViewsIcon from '../assets/icons/views.svg'
import FormTextArea from '../../../../Common/Form/FormTextArea'
import MarketingSEOModal from './SEO Setting/MarketingSEOModal';
import { createCollection } from '../../../../store/actions/ecommerce/action/collection';
import { getCategoryList, getSubCategoryList, getSubSubCategoryList } from '../../../../store/actions/ecommerce/action/category';
import { validator } from '../../../../store/actions/ecommerce/utils/validator';
import AppLink from '../../../../Common/AppLink';
import SeoPopup from '../Component/SeoPopup';
import SwitchButton from '../../../../Common/Button/SwitchButton';
import { getInstituteData, patchInstituteInfo } from '../../../../store/actions/businessInfo';
import DiscartPopUp from '../Component/DiscartPopUp';
import SessionStorage from '../../../../Classes/SessionStorage';
import ValidationUtils from '../../../../Classes/ValidationUtils';
import SwitchButton1 from "../../../../Common/Button/SwitchButton";
import { getProductDetail, getProductList } from '../../../../store/actions/ecommerce/action/product';
import { useParams } from 'react-router-dom';

import { getSlugAvailibilty } from '../../../../store/actions/ecommerce/action/product';

const SideBar = ({
  active, FormErrorShow, collChosen, showOnline, COD, storagedata, contactRoute,
  changeShowOnline, catAction, subCatAction, cashOnDelivery, activeStatus: activeSt, selectedSubCat, edit, editId,
  productName, productDescription, allSeoData, getSeodata, editallSeoData, createProductHandler, editProductHandler, productDetail
  // subSubCatAction
}) => {
  const [seosetting, setSeoSetting] = useState(false);
  const [activeStatus, setActiveStatus] = useState(activeSt ? activeSt : false);
  const [newCollName, setNewCollName] = useState('');
  const [collList, setCollList] = useState([]);
  const [showCreateColl, setShowCreateColl] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [urlSlug, setUrlSlug] = useState();
  const [metaTitleError, setMetaTitleError] = useState(false);
  const [metaDescriptionError, setMetaDescriptionError] = useState(false);
  const [urlSlugError, setUrlSlugError] = useState(false);
  // const [subSubCategoryList, setSubSubCategoryList] = useState([]);
  const [statusLine, setStatusLine] = useState(activeSt ? 'This product will be shown in all sales channels.' : 'This product will be hidden from all sales channels.');

  const { adminCollectionList } = useSelector((state) => state.collectionList);
  const { CategoryList, SubCategoryList, SubSubCategoryList } = useSelector((state) => state.categoryList);
  const dispatch = useDispatch();
  const discartRef = useRef(null);

  const { user, getbusinessInfoSuccess, getbusinessInfoData, productList, productListSuccess } = useSelector((state) => {
    return {
      user: state.user,
      getbusinessInfoSuccess: state.businessInfo.getInstituiteData.success,
      getbusinessInfoData: state.businessInfo.getInstituiteData.data,
      productList: state.productList.productDetail.data,
      productListSuccess: state.productList.productDetail.success,
    };
  })
  useEffect(() => {
    // dispatch(getCategoryList());
    // dispatch(getSubCategoryList(user.user_business_business_shop_category[0]));
    catAction(user.user_business_business_shop_category[0]);
  }, []);

  useEffect(() => {
    dispatch(getInstituteData(user.user_business, user.user_business_type));
  }, [dispatch, user.user_business, user.user_business_type])
  const { id } = useParams();
  useEffect(() => {
    // dispatch(getProductDetail(id));
    dispatch(getProductDetail(id));
  }, [id])

  // useEffect(() => { 
  //   if (CategoryList.success === true && CategoryList.data.length > 0) {

  //     setCategoryList(CategoryList.data);
  //   }
  // }, [CategoryList]);


  useEffect(() => {
    if (SubCategoryList.success === true && SubCategoryList.data.length > 0) {

      setSubCategoryList(SubCategoryList.data);
    }
  }, [SubCategoryList]);

  // useEffect(() => {
  //   if (SubSubCategoryList.success === true && SubSubCategoryList.data.length > 0) {
  //     setSubSubCategoryList(SubSubCategoryList.data);
  //   }
  // }, [SubSubCategoryList]);
  const openref = useRef(null);

  useEffect(() => {
    if (adminCollectionList.success === true) {

      if (adminCollectionList.data && adminCollectionList.data.length > 0) {
        const arr = adminCollectionList.data.map((v, i) => {
          let obj = { ...v, selected: false };
          return obj;
        });
        setCollList([...arr]);
      }
    }
  }, [adminCollectionList]);



  useEffect(() => {
    if (collList.length) {
      let data = collList
      let value = data.length - 1;
      let newColl = data[value]
      let collArray = collectionList;
      collArray.push(newColl._id);
      // setCollectionList([...collArray]);
      // collChosen(collArray);
      collChosen(collectionList)
    }
  }, [collList])

  const SeoSettingModl = () => {
    setSeoSetting(!seosetting)
  }
  const CloseSeoSetting = () => {
    setSeoSetting(false)
  }

  // const catHandler = (id) => { 
  //   dispatch(getSubCategoryList(id));
  //   catAction(id);
  // };

  const subCatHandler = (id) => {
    // dispatch(getSubSubCategoryList(id));
    if (subCategoryList.length > 0) {
      subCategoryList.forEach((vl) => {
        if (vl._id === id) {
          subCatAction(vl);
        }
      });
    }

  };

  // const subSubCatHandler = (id) => 
  //   subSubCatAction(id);
  // };

  // useEffect(() => {
  //   if (adminCollectionList.success === true && adminCollectionList.data && adminCollectionList.data.length > 0) {
  //     let value = adminCollectionList.data.map((item) => {
  //       return (item._id);
  //     })
  //     setCollectionList([...value])
  //   }
  // }, [adminCollectionList.data, adminCollectionList.success])


  const setSelectedCollHandler = (e, i) => {
    // let arr = [...collList];
    // arr[i].selected = collList[i].selected ? false : true;
    // setCollList(arr);
    // let sendArr = [];
    // arr.forEach(vl => {
    //   if (vl.selected === true) {
    //     sendArr.push(vl._id);
    //   }
    // });
    // collChosen(sendArr);

    // "Check value is include in array or not?
    let array = collectionList;
    let inputchecked = e.target.checked;
    let inputValue = e.target.value;
    if (inputchecked) {
      if (!array.includes(inputValue))
        array.push(inputValue);
    }
    else {
      let index = array.indexOf(inputValue);
      array.splice(index, 1);
    }
    setCollectionList([...array]);
    collChosen(array);
  }

  const createCollHandler = async () => {
    const obj = {
      collectionName: validator('xx', newCollName),
      businessShopId: user.user_business,
    };
    if (validator('xx', newCollName)) {
      const resp = await dispatch(createCollection(obj, '2'));

      let arr = [...collList];
      let obj1 = resp[resp.length - 1];
      // obj1.selected = true;
      arr.push(obj1);
      setCollList(arr);
      let sendArr = [];
      // arr.forEach(vl => {
      //   if (vl.selected === true) {
      //     sendArr.push(vl._id);
      //   }
      // });
      collChosen(sendArr);
    }
    setShowCreateColl(false);
    setNewCollName('');
    // setCollectionList("");
  };

  const message = useRef("This product will be hidden from all sales channels.");

  const activeProdHandler = (vl) => {
    vl.preventDefault();
    active(vl.target.value);
    message.current = vl.target.value == 'true' ? 'This product will be shown in all sales channels.' : 'This product will be hidden from all sales channels.';
    setActiveStatus(vl.target.value);
  };

  const changeShow = () => {

    changeShowOnline(showOnline ? false : true);

  };

  // seo edit 

  const [editSeo, setEditSeo] = useState(false);
  const handleEdit = () => {
    setEditSeo(current => !current);

  }
  const handleContactUs = () => {
    openref.current.open()
    contactRoute(true)
  }

  const onclose = () => {
    if (getSeodata) {
      setMetaTitle(getSeodata?.metaTitle)
      setMetaDescription(getSeodata?.metaDescription)
      setUrlSlug(getSeodata?.urlSlug)
      setEditSeo(false)
      openref.current.close()

    } else {
      setMetaTitle(productName)
      setMetaDescription(productDescription)
      setUrlSlug(productName)
      setEditSeo(false)
      openref.current.close()

    }
  }

  const handleCODSetting = (e) => {
    let inputChecked = e.target.checked;
    if (user.user_razorpay_id) {
      if (inputChecked) {
        cashOnDelivery(true);
      }
      else {
        cashOnDelivery(false);
      }
    }
    else {
      if (inputChecked) {
        cashOnDelivery(true);
      }
      else {
        discartRef.current.open();
        SessionStorage.setJson("data", storagedata);
      }
    }

  }
  // console.log(getSeodata, "getSeodataaaaaaaaaaa")
  const oncloseDiscardPopup = () => {
    // discartRef.current.close()
  }
  useEffect(() => {
    if (getSeodata) {
      setMetaTitle(getSeodata?.metaTitle)
      setMetaDescription(getSeodata?.metaDescription)
      setUrlSlug(getSeodata?.urlSlug)
    } else {
      setMetaTitle(productName)
      setMetaDescription(productDescription)
      setUrlSlug(productName)
    }
  }, [productName, productDescription, getSeodata?.metaTitle, getSeodata?.metaDescription, getSeodata?.urlSlug])


  const handleChange = (e) => {
    let inputName = e.target.name
    let inputValue = e.target.value
    switch (inputName) {
      case "title_tag":
        setMetaTitle(inputValue)
        setMetaTitleError(ValidationUtils.isEmpty(inputValue));
        break;
      case "Meta_description":
        setMetaDescription(inputValue);
        setMetaDescriptionError(ValidationUtils.isEmpty(inputValue))
        // dangerouslySetInnerHTML={{
        //   __html:
        //     metaDescription ?
        //       metaDescription : "",
        // }}
        break;
      case "URL_slug":
        setUrlSlug(inputValue)
        setUrlSlugError(ValidationUtils.isEmpty(inputValue))
        break;
      default:
        return false;
    }
  }

  let saveSeoData = {
    metaTitle: metaTitle,
    metaDescription: metaDescription,
    urlSlug: urlSlug
  }

  const isFormValid = () => {
    return ValidationUtils.isNotEmpty(metaTitle)
      && ValidationUtils.isNotEmpty(metaDescription)
      && ValidationUtils.isNotEmpty(urlSlug)
  }

  const HandleSave = () => {
    if (isFormValid()) {
      allSeoData(saveSeoData)
      // console.log(" savees")
      setEditSeo(false)
      // onclose()
      // openref.current.close()
      dispatch(getSlugAvailibilty(user.user_business, urlSlug))
    } else {
      setMetaTitleError(true)
      setMetaDescriptionError(true)
      setUrlSlugError(true)
    }
  }
  const HandleEdit = () => {
    if (ValidationUtils.isNotEmpty(metaTitle) && ValidationUtils.isNotEmpty(metaDescription) && ValidationUtils.isNotEmpty(urlSlug)) {
      if (saveSeoData) {
        editallSeoData(saveSeoData)
        setEditSeo(false)
      }

      onclose()
    } else {
      setMetaTitleError(true)
      setMetaDescriptionError(true)
      setUrlSlugError(true)
    }
  }
  return (
    <React.Fragment>
      <div className='sidebar-container'>
        <div className='addProduct-container'>
          <div className='e-commerce-wrap'>
            <p className='sidebar-heading '>Product Status</p>
            <div className='sidebar-info-wrap side-padding '>
              <div className="formFieldwrap sidebar-formgroup ">
                <div className="addProduct-align-div ">
                  <select
                    id="list"
                    // name="blood_group"
                    defaultValue={false}

                    value={activeSt}
                    onChange={(e) => { activeProdHandler(e) }}
                  >
                    <option value={false}>Draft</option>
                    <option value={true}>Active</option>

                    {/* <option>Unknown</option> */}
                  </select>
                </div>
              </div>
              <p className='text-xxs w-300'>{message.current}</p>
            </div>
            {/* <hr className='horizental-line' />
             <div className='sidebar-product-status-lower-wrap '>
              <CheckboxInput
                label={"Show on online store"}
                LabelClass={"label-heading eComm-checkbox-center"}
                className={"eComm-checkbox"}
                // value={showOnline}
                checked={showOnline}
                onClick={() => { changeShow() }}
              />
            </div> */}
          </div>
        </div>

        {/* new section drowDown */}
        {/* <div className='addProduct-container  sectionGap'>
          <div className='e-commerce-wrap'>
            <p className='sidebar-heading '>Select Category</p>
            <hr className='horizontal-line' />
            <div className='sidebar-marketing-wrap side-padding'>
              <div className="cstmSelectWrap select_label_ani">
                
                <p className='text-xs w-500 pb-10'>Category</p>
                <div className='addProduct-align-div'>
                  <select
                    id="list"
                    value={selectedSubCat}
                    onChange={(e) => { subCatHandler(e.target.value) }}
                  >
                    <option value={false}>Select Category</option>
                    {subCategoryList && subCategoryList.length > 0 && subCategoryList.map((vl, i) => {
                      return <option value={vl._id} key={i}>{vl.subCategoryName}</option>
                    })}
                  </select>
                  <FormError
                    show={FormErrorShow}
                    className="mt-5"
                    error="Category is required."
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* collection section */}
        <div className='addProduct-container  sectionGap'>
          <div className='e-commerce-wrap'>
            <p className='sidebar-heading '>Collections</p>
            <hr className='horizontal-line' />
            <div className='sidebar-collection-wrap side-padding'>
              <div className='sidebar-collection-checkbox-wrap'>
                {collList && collList.length > 0 && collList.map((cl, i) => {
                  return (
                    <>
                      <CheckboxInput
                        label={cl.collectionName}
                        LabelClass={"label-heading eComm-checkbox-center"}
                        className={"eComm-checkbox"}
                        value={cl._id}
                        key={i}
                        checked={collectionList.includes(cl._id)}
                        onChange={(e) => { setSelectedCollHandler(e, i) }}
                      />
                    </>
                  );
                })}
                {/* <CheckboxInput
                  label={"All products"}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                />
                <CheckboxInput
                  label={"All products"}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                /> */}
                {/* when click on create collection this screen will be shown */}
                {showCreateColl && <div className='add-collection-screen-wrap'>
                  <CheckboxInput
                    label={""}
                    LabelClass={"label-heading eComm-checkbox-center"}
                    className={"eComm-checkbox"}
                  />
                  <div className="formFieldwrap sidebar-formgroup width-65">
                    <FormInput
                      type="text"
                      // label="name"
                      id="name"
                      name="add-collection"
                      value={newCollName}
                      placeholder=""
                      maxLength="80"
                      onChange={(e) => { setNewCollName(e.target.value) }}
                    />
                  </div>
                  <div className='collection-btn-wrap'>
                    <button className='btn-square btn-cross' onClick={() => { setShowCreateColl(false) }}>
                      <img src={CrossIcon} alt="cross icon" />
                    </button>
                    <button className='btn-square' onClick={() => { createCollHandler() }}>
                      <i className='ed-check'></i>
                    </button>
                  </div>
                </div>}
                <div className='add-more-btn-wrap add-more-btn-pt-0'>
                  {!showCreateColl &&
                    <button className='add-another-option-btn' onClick={() => { setShowCreateColl(true) }}>
                      <span><i className='ed-icon icon-plus-add primary i-xs'></i></span>
                      <span className='w-400'>Create Collection</span>
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* delivery section */}
        <div className='addProduct-container  sectionGap'>
          <div className='e-commerce-wrap'>
            <p className='sidebar-heading '>Payments</p>
            <hr className='horizontal-line' />
            <div className='sidebar-collection-wrap side-padding'>
              <div className='delivery-container'>
                <div className='text-div'>
                  <p className='text-xs w-500 base'>Cash On Delivery</p>
                </div>

                {getbusinessInfoSuccess && getbusinessInfoData && getbusinessInfoData.cash_on_delivery_enabled ?
                  <div className='switch-button'>
                    <SwitchButton
                      checked={COD}
                      onChange={(e) => handleCODSetting(e)}
                    />
                  </div>
                  :
                  <div className='switch-button'>
                    <SwitchButton
                      disabled
                      checked={COD}
                      onChange={(e) => handleCODSetting(e)}
                    />
                  </div>
                }

                <div className='switch-button'>
                  {edit === true ?
                    <DiscartPopUp onclose={() => oncloseDiscardPopup()} discartRef={discartRef} popuptext={true} editpopup={true} editId={editId} />
                    :
                    <DiscartPopUp onclose={() => oncloseDiscardPopup()} discartRef={discartRef} popuptext={true} />
                  }

                </div>

              </div>
              <p className='text-xxs w-300 toogle-text'>Turn on the toggle button to allow users to select cash on delivery payment methods for this product</p>

            </div>
          </div>
        </div>
        {/* seo setting */}
        <div className='addProduct-container  sectionGap'>
          <div className='e-commerce-wrap seo-wrap'>
            <div className='seo-text-wrapper'>
              <p className='text-s w-500 base '>SEO Settings</p>
              {editSeo ?
                <button className='add-another-option-btn' onClick={() => onclose()}>Close</button> :
                <button className='add-another-option-btn' onClick={handleEdit}> Edit</button>}
            </div>

            <hr className='horizontal-line' />
            <div className={`sidebar-collection-wrap side-padding seo-div-wrapper ${editSeo ? "" : 'seo-padding-bottom'}`}>
              <p className='text-xs w-500 base'>Search engine preview</p>
              <p className='text-xs w-500 primary mt-8'>{metaTitle}</p>
              <AppLink to="" className='seo-link'>https://justshop.edneed.com/product/{metaTitle}</AppLink>
              {/* <p className='text-xxs w-400 base'>{metaDescription}</p> */}
              <p className='sun-editor-output'
                dangerouslySetInnerHTML={{
                  __html:
                    metaDescription ?
                      metaDescription : "",
                }}
              ></p>
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
                        maxLength="500"
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
                        onChange={handleChange}
                        placeholder="URL slug"
                        maxLength="80"
                      />
                      <FormError
                        show={!urlSlug && urlSlugError}
                        error="URL Slug is required."
                      />
                    </div>
                  </div>
                  <div className='seo-button-wrapper'>
                    <hr className='horizontal-line' />
                    <div className='top-left-button-section seo-btn-div mt-15'>
                      <button className='button button-o-primary primary btn-oval btn-sm btn-primary-border ' onClick={() => onclose()}>Cancel</button>
                      {getSeodata ? <button className='button button-primary btn-oval btn-sm' onClick={HandleEdit} >Update</button> :

                        <button className='button button-primary btn-oval btn-sm' onClick={HandleSave} >Save</button>
                      }

                    </div>
                  </div>
                  <div className='hire-wrapper'>
                    <div className='text-div'>
                      <p className='text-xs w-500 base'>Hire a professional</p>
                      <p className='text-xs w-400 base mt-10'>Optimize your store's product pages
                        with the help of an expert. <button className="contact-us-link"
                          onClick={() => handleContactUs()}
                        >Contact Us </button></p>
                    </div>
                  </div>
                </div>
              ) : (null)
            }

          </div>
        </div>
      </div>
      {/* {
        seosetting && <MarketingSEOModal show={seosetting} onClose={CloseSeoSetting} />
      } */}

      {
        <SeoPopup openref={openref} onclose={() => onclose()} createProductHandler={createProductHandler} editProductHandler={editProductHandler} productDetail={productDetail} />
      }
    </React.Fragment >
  )
}

export default SideBar