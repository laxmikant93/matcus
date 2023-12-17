import React from 'react'
import { useState } from 'react';
import Breadcrumb from '../../../../Common/Breadcrumb'
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';
import './bookingCollection.scss';
import AddNewElement from '../../../../Common/AddNewElement/AddNewElement';
import Doctors from './doctors.jpg';
import { useRef } from 'react';
import { useDetectOutsideClick } from '../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import SwitchButton from '../../../../Common/Button/SwitchButton';
import SearchControl from '../../../../Common/SearchControl';
import SEOSettingPopup from './SEOSettingPopup/SEOSettingPopup';
import ShowHeaderFooter from './ShowHeaderAndFooter/ShowHeaderFooter';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteCollection, editCollection, editMainBusiCollectionName, getAllCollection, getAllCollectionReset, getMainBusiCollectionName, getSingleCollectionReset } from '../../../../store/actions/bookAppointment';
import NoDataAvailable from '../../../../Common/NoDataAvailable';
import ConfirmDeletePopUp from '../Categories/ConfirmDeletePopUp';


const BookingCollection = () => {
  const history = useNavigate()
  const dispatch = useDispatch()
  // const openThreeDot = useRef(null);
  const RefThreeDot = useRef(null);
  const DeleteCollectionRef = useRef(null);
  // const [showdeleteOptions, setShowdeleteOptions] = useDetectOutsideClick(RefThreeDot, false);
  const [threeDotState, setThreeDotState] = useDetectOutsideClick(RefThreeDot, false);
  const [collectionData, setCollectionData] = useState(false);
  const showonWebsiteRef = useRef(null)
  const openSeopopupRef = useRef(null);
  const openSeoSingleCollectionRef = useRef(null);
  const [showOnWebsite, setShowOnWebsite] = useDetectOutsideClick(showonWebsiteRef, false);
  const [editTitle, setEditTitle] = useState(false);
  const [mainCollName, setMainCollName] = useState("Collection")
  const [mainCollNameStatic, setMainCollNameStatic] = useState("Department")
  const [iDForClosePopup, setIDForClosePopup] = useState("")


  const [showOnFooter, setShowOnFooter] = useState(false)
  const [showOnHeader, setShowOnHeader] = useState(false)
  const [getSeoData, setGetSeoData] = useState("")
  const [metaDescription, setmetaDescription] = useState("")
  const [urlSlug, seturlSlug] = useState("");
  const [DeleteCollectionID, setDeleteCollectionID] = useState("")


  const [searchTerm, setsearchTerm] = useState("");
  const [addMoretile, setAddMoreTile] = useState(false)
  const [seoPerCollection, setSeoPerCollection] = useState(false)
  const { user, institute, owner, getAllCollectionSuccss, getMainBusiCollection, businesstype, getAllCollectiondata, getAllCollectiondatadata
  } = useSelector((state) => {
    return {
      user: state.user,
      institute: state.user.user_institute,
      owner: state.user._id,
      businesstype: state.user.user_business_type,
      serviceListsuccess: state.bookAppointment.serviceListByCategories.success,
      getAllCollectiondata: state.bookAppointment.getAllCollection.data,
      getAllCollectionSuccss: state.bookAppointment.getAllCollection.success,
      getAllCollectiondatadata: state.bookAppointment.getAllCollection,
      getMainBusiCollection: state.bookAppointment.getMainBusiCollection.data,
    }
  });
  useEffect(() => {
    dispatch(getAllCollection(businesstype, user.user_business, owner, ""))
  }, [businesstype, dispatch, user.user_business])
  useEffect(() => {
    dispatch(getMainBusiCollectionName(user.user_business_type, institute, owner))
  }, [dispatch, institute, owner, user.user_business_type]);

  const handleThreeDot = (id) => {
    // setShowdeleteOptions(true)
    setThreeDotState(threeDotState === id ? -1 : id)
    setIDForClosePopup(id)
  }



  // const collectionList2 = [1, 2, 3, 4, 5, 6, 7];
  // const [collectionData, setCollectionData] = useState(false);
  // const showonWebsiteRef = useRef(null)
  // const [showOnWebsite, setShowOnWebsite] = useDetectOutsideClick(showonWebsiteRef, false);
  const handleShowOnWebsite = () => {
    setShowOnWebsite(!showOnWebsite);
  }
  const handleOpenSeopopUp = () => {
    openSeopopupRef.current.open();
  }
  const handleCloseSeopopUp = () => {
    openSeopopupRef.current.close();
  }
  useEffect(() => {
    setMainCollName(getMainBusiCollection?.data?.main_business_collection_name)
    setShowOnHeader(getMainBusiCollection?.data?.showOnHeader)
    setShowOnFooter(getMainBusiCollection?.data?.showOnFooter)

    setGetSeoData({
      metaTitle: getMainBusiCollection?.data?.metaTitle,
      metaDescription: getMainBusiCollection?.data?.metaDescription,
      urlSlug: getMainBusiCollection?.data?.urlSlug,
      metaKeywords: getMainBusiCollection?.data?.metaKeywords
    })

    // setShowOnFooter(getMainBusiCollection?.data?.metaKeywords)

  }, [getMainBusiCollection])
  const handleChangeName = (e) => {
    setMainCollName(e.target.value)
  }
  const handleEditTitle = () => {
    setEditTitle(!editTitle)
    let data = {
      business: institute,
      owner: owner,
      main_business_collection_name: mainCollName
    }

    dispatch(editMainBusiCollectionName(user.user_business_type, institute, owner, data))
  }
  const handleshowOnHeader = (e) => {
    let inputChecked = e.target.checked
    setShowOnHeader(inputChecked)
    // console.log(inputChecked, showOnHeader, "hhhhhhhhhhhhhh")
    let data = {
      business: institute,
      owner: owner,
      showOnHeader: inputChecked,
      main_business_collection_name: mainCollName ? mainCollName : mainCollNameStatic
    }
    dispatch(editMainBusiCollectionName(user.user_business_type, institute, owner, data))
  }
  const handleshowOnFooter = (e) => {
    let inputChecked = e.target.checked
    setShowOnFooter(inputChecked)
    let data = {
      business: institute,
      owner: owner,
      showOnFooter: inputChecked,
      main_business_collection_name: mainCollName ? mainCollName : mainCollNameStatic
    }
    dispatch(editMainBusiCollectionName(user.user_business_type, institute, owner, data))
  }
  let typing;
  const handleCollectionSearch = (evt) => {
    evt.preventDefault();
    clearTimeout(typing)
    setAddMoreTile(true)
    typing = setTimeout(() => {
      setsearchTerm(evt.target.value);
    }, 400)
    if (!evt.target.value) {
      dispatch(getAllCollection(businesstype, user.user_business, owner, ""))
      clearTimeout(typing)
      // setsearchTerm("")
    }
  }
  const handleCollectionSearchReset = () => {
    setsearchTerm("")
    dispatch(getAllCollection(businesstype, user.user_business, owner, ""))
  }
  useEffect(() => {
    if (searchTerm) {
      dispatch(getAllCollection(businesstype, user.user_business, owner, searchTerm))
    }
  }, [dispatch, institute, owner, searchTerm, user.user_business_type])


  useEffect(() => {

  })
  const slugData = (data1) => {

    if (data1?.metaTitle && data1?.metaDescription && data1?.urlSlug) {
      let data = {
        business: institute,
        owner: owner,
        metaTitle: data1?.metaTitle,
        metaDescription: data1?.metaDescription,
        urlSlug: data1?.urlSlug,
        metaKeywords: data1?.metaKeywords,
        main_business_collection_name: mainCollName ? mainCollName : mainCollNameStatic

      }
      dispatch(editMainBusiCollectionName(user.user_business_type, institute, owner, data))
    }
  }
  const handleRoute = () => {
    history("/bookingservices/collection/CreateCollection")
    // dispatch(getAllCollectionReset())
    dispatch(getSingleCollectionReset())
  }
  const handleEditCollection = (id) => {
    // console.log(id)
    history(`/bookingservices/collection/Update-collection/${id}`)
  }
  
  
  
  const DeleteCollectionhandlepopUp = (id) => {
    DeleteCollectionRef.current.open();
    setDeleteCollectionID(id)
  }
  const CloseDeleteCollectionpopUp = () => {
    DeleteCollectionRef.current.close();
  }
  const DeleteCollectionhandle = () => {
    dispatch(deleteCollection(user.user_business_type, DeleteCollectionID))
    DeleteCollectionRef.current.close();
  }
  
  // const handleOpenSeopopUp = () => {
  //   openSeoSingleCollectionRef.current.open();
  // }
  const handleCloseSeoSignleCollection = () => {
    openSeoSingleCollectionRef.current.close();
  }
  const [collectionSeoData, setCollectionSeoData] = useState()
  const [collectionIdForSeo, setCollectionIdForSeo] = useState()
  const [collectionIdForSeoData, setCollectionIdForSeoData] = useState()

  const SeoHandle = (item) => {
    openSeoSingleCollectionRef.current.open();
    setSeoPerCollection(true)
    setCollectionSeoData(item.name)
    setCollectionIdForSeo(item._id)
    // if (item._id && item.metaTitle && item.metaDescription && item.urlSlug) {
    setCollectionIdForSeoData({
      metaTitle: item.metaTitle,
      metaDescription: item.metaDescription,
      urlSlug: item.urlSlug,
      metaKeywords: item.metaKeywords
    })
    // }
    // console.log(item)
    // console.log(item.name)
  }




  // console.log(seoPerCollection, "seroper")
  // console.log(getAllCollectiondata?.length, "getAllCollectiondata.length")
  // console.log(getAllCollectiondata, "getAllCollectiondata")
  // console.log(getAllCollectionSuccss, "getAllCollectionSuccss")


  const handleSingleCollectionSeo = (data1) => {
    let data = {
      business: user.user_business,
      owner: owner,

      metaTitle: data1?.metaTitle,
      metaDescription: data1?.metaDescription,
      urlSlug: data1?.urlSlug,
      metaKeywords: data1?.metaKeywords
    }
    // setShowdeleteOptions(true)
    setThreeDotState(threeDotState === iDForClosePopup ? -1 : iDForClosePopup)

    // console.log("dasdasd")
    dispatch(editCollection(user.user_business_type, collectionIdForSeo, data))
  }
  const child = useRef(false);
  const parentHandle = (value, id) => {
    if (value === "child") {
      child.current = true;
    } else if (!child.current) {
      history(`/bookingservices/collection/Update-collection/${id}`)
      child.current = false
    }
  }
  // const parentHandle = (value, id) => {
  //   if (value === "child") {
  //     child.current = true;
  //   } else {
  //     if (!child.current) {
  //       history(`/bookingservices/collection/Update-collection/${id}`)
  //     }
  //     child.current = false
  //   }
  // }


  return (
    <div className='bookingCollection-container'>
      <Breadcrumb>
        <BreadcrumbItem to="/dashboard" title="Booking" />
        <BreadcrumbItem to="/bookingservices/collection" title="Collection" />
      </Breadcrumb>
      <div className='department-section'>
        <div className='deparment-leftSide'>
          {
            editTitle ? (<div className='deparment-edit-section'>
              <input type="text" name="" id="" className='edit-input-text'
                onChange={(e) => handleChangeName(e)}
                value={mainCollName} />
              <span className='text-xs w-400 primary done-text cursor-pointer' onClick={handleEditTitle}>Done</span>
            </div>) : (<div className='departText-wrap'>
              <h2 className='text-deparment w-600 base'>{mainCollName ? mainCollName : mainCollNameStatic}</h2>
              <div className='edit-wrap'>
                <i className='ed-icon  primary icon-pencial'></i>
                <p className='text-xs w-400 primary' onClick={handleEditTitle}>Edit</p>
              </div>
            </div>
            )
          }

        </div>
        <div className='deparment-rightSide'>
          <div className='deparment-search-wrap'>
            <SearchControl
              placeholder="Search..."
              onChange={handleCollectionSearch}
              // onKeyUp={handleSearch}
              reset={() => handleCollectionSearchReset()}
            />
          </div>
          <button className='button button-primary btn-xs' onClick={handleRoute}>Create collection</button>

        </div>
      </div>
      <p className='text-xxs w-400 mt-10'><span className='base'>Original :</span><span className='primary'>Collection</span></p>
      <div className='show-website-wrapper'>
        <div className='showWebsite-left'>
          <p className='text-xxs w-400 base'>Create collections of services here</p>
        </div>
        <div className='showWebsite-right'>
          <div className='seoSettingIcon-wrap' onClick={handleOpenSeopopUp}>
            <i className='icon-seosetting  primary'></i>
            <p className='text-xs w-400'>SEO settings</p>
          </div>
          {
            // <SEOSetting  />
            <SEOSettingPopup openpopup={openSeopopupRef} onclose={handleCloseSeopopUp} slugData={slugData} getSeoData={getSeoData} mainName={mainCollName ? mainCollName : mainCollNameStatic} />
          }
          <div className='showOnWebsite-wrap' onClick={handleShowOnWebsite}>
            <i className='setting-eye primary'></i>
            <p className='text-xs w-400'>Show on website</p>
          </div>
          {
            showOnWebsite &&
            <ShowHeaderFooter outSideClickRef={showonWebsiteRef} showOnHeader={showOnHeader} showOnFooter={showOnFooter} handleshowOnHeader={(e) => handleshowOnHeader(e)} handleshowOnFooter={(e) => handleshowOnFooter(e)} />

          }
        </div>
      </div>
      <hr />

      {getAllCollectionSuccss ?
        <>
          <div className='department-list-container '>
            {getAllCollectionSuccss && getAllCollectiondata && getAllCollectiondata?.length > 0 &&
              getAllCollectiondata?.map((item, i) => {
                return (
                  <div className='departmentImage-section' onClick={() => parentHandle("parent", item._id)}>
                    <div className='department-image-wrap'>
                      <img src={item.image ? item.image : Doctors} alt="" />
                      <div className='overlay-wrap' onClick={() => parentHandle("child")}>
                        <div className='threeDot-wrap'  >
                          <button className="dot_button" onClick={() => handleThreeDot(item._id)}>
                            <i className='ed-icon i-s  white icon-threeDot'></i>
                          </button>
                          {
                            threeDotState === item._id && 
                            // showdeleteOptions &&
                            <div className='threeDot-container'
                              ref={RefThreeDot}
                            >
                              <div className='icon-wrap mb-5'  onClick={() => handleEditCollection(item._id)}>
                                <i className='ed-icon icon-pencialNew'></i>
                                <p className=' w-400 base text-edit '>Edit</p>
                              </div>
                              <hr className='line' />

                              <div className='icon-wrap mb-5 mt-5'  onClick={() => DeleteCollectionhandlepopUp(item._id)}>
                                <i className='ed-icon icon-deleteNew'></i>
                                <p className=' w-400 base  text-edit'>Delete</p>
                              </div>
                              <hr className='line' />
                              <div className='icon-wrap mt-5'  onClick={() => SeoHandle(item)}>
                                <i className='ed-icon icon-pencialNew'></i>
                                <p className=' w-400 base  text-edit'>SEO</p>
                              </div>
                            </div>
                          }
                        </div>
                        <div className='overlay-text-wrap'>
                          <p className='text-xxs w-500 white'>{item.name} &nbsp;<span>({item.service.length})</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

            {getAllCollectionSuccss && getAllCollectiondata && getAllCollectiondata?.length >= 1 &&
              <div className='addMore-container'>
                <div className="image-drag">
                  <div className="dragbutton" onClick={handleRoute}>
                    <p className="set__icon"><i className='icon-plus'>&#43;</i></p>
                    <p className='primary text-2xs w-500 ' >Add more</p>
                  </div>
                </div>
              </div>}
          </div>
          {getAllCollectionSuccss && (getAllCollectiondata.length === 0 || getAllCollectiondata?.length === "undefined") &&
            <div className='addcollection-wrapper mt-35'>
              <AddNewElement onClick={handleRoute} title={'Add a new collection'} />
            </div>
          }
        </>

        :
        <div className="loadingGridData"><i className="ed-loadingGrid"></i></div>
      }



      <ConfirmDeletePopUp
        DeleteRef={DeleteCollectionRef}
        onClose={() => CloseDeleteCollectionpopUp()}
        HandleDeleteYes={DeleteCollectionhandle} 
        title={"Collection"}
        Subtitle={"Collection"}
        />
      <SEOSettingPopup openpopup={openSeoSingleCollectionRef} onclose={handleCloseSeoSignleCollection} getSeoData={collectionIdForSeoData} slugData={handleSingleCollectionSeo} mainName={collectionSeoData} />
                        
    </div>
  )
}

export default BookingCollection