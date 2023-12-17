import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddNewElement from '../../../../Common/AddNewElement/AddNewElement';
import AppLink from '../../../../Common/AppLink';
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';
import SwitchButton from '../../../../Common/Button/SwitchButton';
import { useDetectOutsideClick } from '../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import NoDataAvailable from '../../../../Common/NoDataAvailable';
import { deleteCategory, editMainBusinessCategory, editMainCategoryData, editMainCategoryDetails, getAllMainCategoryList, getAllUnCategoryList, getMainBusinessCategory, getServicesBycategories } from '../../../../store/actions/bookAppointment';
import AddCategoryPopup from '../../BookAppointment/AddCategoryPopup';
import SEOSettingPopup from '../Collection/SEOSettingPopup/SEOSettingPopup';
import ShowHeaderFooter from '../Collection/ShowHeaderAndFooter/ShowHeaderFooter';
import "./CategoriesServices.scss";
import ConfirmDeletePopUp from './ConfirmDeletePopUp';
import ServiceListPopup from './ServiceListPopup';

const CreateCategory = () => {
  const showAddCategoryRef = useRef()
  const serviceListRef = useRef()
  const history = useNavigate()
  const dispatch = useDispatch();

  const { user, institute, owner, businesstype, categoryListSuccess, categoryList, getMainCategoryName, multiDeleteOrUncatSuccess, UncategoryList
  } = useSelector((state) => {
    return {
      user: state.user,
      institute: state.user.user_institute,
      owner: state.user._id,
      businesstype: state.user.user_business_type,
      categoryListSuccess: state.bookAppointment.getMainCategoryList.success,
      categoryList: state.bookAppointment.getMainCategoryList.data,
      getMainCategoryName: state.bookAppointment.getMainBusinessCat,
      multiDeleteOrUncatSuccess: state.bookAppointment.multiDeleteOrUncat.success,
      UncategoryList: state.bookAppointment.getUncatList,
    };
  });

  const [editName, setEditName] = useState(false);
  const [enable, setEnable] = useState(false);
  const [categoryData, setCategoryData] = useState("")
  const [categoryUpdate, setCategoryUpdate] = useState("")
  const [mainCatName, setMainCatName] = useState("Categories")
  const [mainCatNameStatic, setMainCatNameStatic] = useState("Categories")
  const [showOnFooter, setShowOnFooter] = useState(false)
  const [showOnHeader, setShowOnHeader] = useState(false)
  const [getSeoData, setGetSeoData] = useState("")
  const [create, setCreate] = useState(false)
  const DeleteRef = useRef()
  const [deleteID, setDeleteID] = useState("")
  useEffect(() => {
    dispatch(getServicesBycategories(institute, owner, "", user.user_business_type))
  }, [dispatch, institute, owner, user.user_business_type]);

  useEffect(() => {
    dispatch(getMainBusinessCategory(institute, owner, user.user_business_type))
  }, [dispatch, institute, owner, user.user_business_type]);

  // console.log('getMainCategoryName', getMainCategoryName.data.main_business_category_name)
  useEffect(() => {
    setMainCatName(getMainCategoryName?.data?.main_business_category_name
      // ? getMainCategoryName?.data?.main_business_category_name : "Categories"
    )
    setShowOnHeader(getMainCategoryName?.data?.showOnHeader)
    setShowOnFooter(getMainCategoryName?.data?.showOnFooter)

    setGetSeoData({
      metaTitle: getMainCategoryName?.data?.metaTitle,
      metaDescription: getMainCategoryName?.data?.metaDescription,
      urlSlug: getMainCategoryName?.data?.urlSlug,
      metaKeywords: getMainCategoryName?.data?.metaKeywords

    })

  }, [getMainCategoryName])
  const handleenable = () => {
    setEnable(!enable)
  }
  const handleChangeName = (e) => {
    setMainCatName(e.target.value)
  }
  const handleEditDone = () => {
    // setEditName(!editName)
    let data = {
      business: institute,
      owner: owner,
      main_business_category_name: mainCatName
    }
    dispatch(editMainBusinessCategory(institute, owner, user.user_business_type, data))
    setEditName(!editName)
  }
  const handleEditName = () => {
    setEditName(!editName)
  }
  const onCloseAddcategory = () => {
    showAddCategoryRef.current.close()
    setCategoryData("")
    setCategoryData("")
    setCategoryUpdate("")
    setCreate(false)
  }
  const onOpenAddcategory = () => {
    // alert("ope")
    setCreate(true)
    // console.log("line no 98 ncategoryData", categoryData, "categoryUpdate", categoryUpdate)
    showAddCategoryRef.current.open()
  }
  const [serviceData, setServiceData] = useState("")
  const serviceListopen = (item) => {
    setServiceData(item)
    serviceListRef.current.open()
  }
  const serviceListClose = () => {
    serviceListRef.current.close()
  }
  useEffect(() => {
    dispatch(getAllMainCategoryList(institute, owner, user.user_business_type))
  }, [dispatch, institute, owner, user.user_business_type]);
  useEffect(() => {
    dispatch(getAllUnCategoryList(institute, owner, user.user_business_type))
  }, [dispatch, institute, owner, user.user_business_type]);
  const handleEditCat = (item) => {
    setCategoryData(item)
    setCategoryUpdate(item._id)
    showAddCategoryRef.current.open()
  }
  const handleAddMoreService = (_id) => {
    dispatch(editMainCategoryDetails(_id, businesstype))
  }
  const hadleMarkAsFeature = (_id, status) => {
    dispatch(editMainCategoryData(_id, businesstype, { markAsFeatured: status }))
  }

  const CategoryhandleShowHide = (_id, status) => {
    if (status === false) {
      dispatch(editMainCategoryData(_id, businesstype, { markAsFeatured: true, isHide: false }))
    } else {
      dispatch(editMainCategoryData(_id, businesstype, { markAsFeatured: false, isHide: true }))
    }
  }
  const child = useRef(false)
  const seoPopupref = useRef(null);
  const openSEOPopup = () => {
    seoPopupref.current.open();
  }
  const closeSEOPopup = () => {
    seoPopupref.current.close();
  }

  const showonWebsiteRef = useRef(null)
  const [showOnWebsite, setShowOnWebsite] = useDetectOutsideClick(showonWebsiteRef, false);
  const handleShowOnWebsite = () => {
    setShowOnWebsite(!showOnWebsite);
  }

  let type = "Category"
  const handleChlidParentt = (selector, item) => {
    if (selector === "child") {
      child.current = true;
    } else {
      if (!child.current) {
        // history(link)
        serviceListRef.current.open()
        // setCategoryData(item)
        setServiceData(item)
      }
      child.current = false
    }
  }

  const handleshowOnHeader = (e) => {
    let inputChecked = e.target.checked
    setShowOnHeader(inputChecked)
    // console.log(inputChecked, showOnHeader, "hhhhhhhhhhhhhh")
    let data = {
      business: institute,
      owner: owner,
      showOnHeader: inputChecked,
      main_business_category_name: mainCatName ? mainCatName : mainCatNameStatic
    }
    dispatch(editMainBusinessCategory(institute, owner, user.user_business_type, data))
  }
  const handleshowOnFooter = (e) => {
    let inputChecked = e.target.checked
    setShowOnFooter(inputChecked)
    let data = {
      business: institute,
      owner: owner,
      showOnFooter: inputChecked,
      main_business_category_name: mainCatName ? mainCatName : mainCatNameStatic
    }
    dispatch(editMainBusinessCategory(institute, owner, user.user_business_type, data))
  }
  useEffect(() => {
    if (multiDeleteOrUncatSuccess) {
      dispatch(getAllMainCategoryList(institute, owner, user.user_business_type))
    }
  }, [multiDeleteOrUncatSuccess])


  const slugData = (data1) => {
    // console.log(data1, "categories ")
    if (data1?.metaTitle && data1?.metaDescription && data1?.urlSlug) {
      let data = {
        business: institute,
        owner: owner,
        metaTitle: data1?.metaTitle,
        metaDescription: data1?.metaDescription,
        urlSlug: data1?.urlSlug,
        metaKeywords: data1?.metaKeywords,
        main_business_category_name: mainCatName ? mainCatName : mainCatNameStatic

      }
      dispatch(editMainBusinessCategory(institute, owner, user.user_business_type, data))
    }

  }

  const deleteCategoryhandle = (id) => {
    setDeleteID(id)
    DeleteRef.current.open()
  }

  const DeleteServiceHandleClose = () => {
    DeleteRef.current.close()
  }
  const HandleDeleteYes = () => {
    dispatch(deleteCategory(deleteID, businesstype, { isDeleted: true }))
    DeleteRef.current.close()
  }
  // console.log(UncategoryList, "uncarlis")
  return (
    <React.Fragment>
      <div className="CategoryServices-wrapper mt-10">
        <Breadcrumb>
          <BreadcrumbItem to="/dashboard" title="Booking" />
          <BreadcrumbItem to="/bookingservices/booking-create-category" title="Categories" />
        </Breadcrumb>
        <div className="category-wrap">
          <div className="column">
            {
              editName ? (
                <>
                  <div className="edit-category-input">
                    <input type="text" placeholder=""
                      // value="Department"
                      maxLength={200}
                      className="form-control"
                      onChange={(e) => handleChangeName(e)}
                      value={mainCatName} />
                    <button className="save-btn" onClick={() => handleEditDone()}>Done</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="edit-category-Name">
                    <h1 className="title">{mainCatName ? mainCatName : "Categories"} &nbsp;<span className="count">{categoryList.length}</span></h1>
                    <button className="edit-btn" onClick={() => handleEditName()}><i className="edit-icon"></i>Edit </button>
                  </div>
                </>
              )
            }
            <p className="subtitle">Original : <span className="primary">Categories</span></p>
          </div>
          <div className="column column-right">
            <button
              className="button button-primary btn-sm"
              // to={`/bookingservices/category-create`}
              onClick={onOpenAddcategory}
            >Create category
            </button>
          </div>
        </div>
        <div className="category-wrap seo-setting">
          <div className="column">
            <p className="category-subtitle">Create categories of services here</p>
          </div>
          <div className="column btn-column">
            <button className="custom-btn" onClick={openSEOPopup}><i className="icon-Seosetting"></i>SEO settings</button>
            {
              <SEOSettingPopup openpopup={seoPopupref} onclose={closeSEOPopup} slugData={slugData} getSeoData={getSeoData} mainName={mainCatName ? mainCatName : mainCatNameStatic} />
            }
            <div className='position-relative'>
              <button className="custom-btn" onClick={handleShowOnWebsite}><i className="icon-website"></i>Show on website</button>
              {
                showOnWebsite && <ShowHeaderFooter outSideClickRef={showonWebsiteRef}
                  showOnHeader={showOnHeader}
                  showOnFooter={showOnFooter}
                  handleshowOnFooter={(e) => handleshowOnFooter(e)}
                  handleshowOnHeader={(e) => handleshowOnHeader(e)} />
              }
            </div>
          </div>
        </div>
        {categoryListSuccess && categoryList && (categoryList.length > 0 || UncategoryList?.data.length === 1) ?
          <>
            <div className="CategoryList-Wrapper">
              <div className="category-table-wrapper">
                <table>
                  <thead>
                    <tr className='category-tr-list'>
                      <th className='uppercase'> Name</th>
                      <th className='uppercase'>No. of Services</th>
                      <th className='uppercase'>Featured</th>
                      <th className='uppercase'>Bookings </th>
                      <th >&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    <React.Fragment>
                      {categoryListSuccess ? (categoryList && (categoryList.length > 0 || UncategoryList?.data.length === 1) ? (categoryList?.map((item, i) => {
                        return (
                          <>
                            <tr onClick={() => handleChlidParentt('parent', item)} className={`${enable ? "disable" : ""}`}>
                              <td data-label="service date">
                                <div className="profile-detail">
                                  <img src={item.uploadefile ? item.uploadefile : "https://images.unsplash.com/photo-1603570388466-eb4fe5617f0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"} className="img-icon" alt="" />
                                  <p className="title">{item?.main_category_name}</p>
                                </div>
                              </td>
                              <td>
                                {item?.service?.length > 0 ?
                                  <td>{item.service?.length}</td> :
                                  <AppLink to={`/bookingservices/category-update/categoryId/${item._id}`}>
                                    <button className="addservice-btn primary" onClick={() => handleAddMoreService(item._id)}
                                    >+ Add Services</button>
                                  </AppLink>
                                }
                              </td>
                              <td onClick={() => handleChlidParentt('child')}>
                                {item.markAsFeatured ?
                                  <div className="switch-wrap">
                                    <SwitchButton
                                      checked={item.markAsFeatured}
                                      onChange={(e) => hadleMarkAsFeature(item._id, false)} />
                                    <p className="title">Yes</p>
                                  </div> :
                                  <div className="switch-wrap">
                                    <SwitchButton
                                      checked={item.markAsFeatured}
                                      onChange={(e) => hadleMarkAsFeature(item._id, true)} />
                                    <p className="title">No</p>
                                  </div>}
                              </td>
                              <td>{item.count}</td>
                              <td onClick={() => handleChlidParentt('child')}>
                                <div className="group-icons" onClick={() => handleChlidParentt('child')}>
                                  <button className="edit-button" title='Edit' onClick={() => handleEditCat(item)}><i className="ed-icon icon-edit i-xxs lgray"></i></button>
                                  {/* <button className="edit-button"><i className="icon-plus">+</i></button> */}
                                  <AppLink to={`/bookingservices/category-update/categoryId/${item._id}`}>
                                    <span
                                      className='icon col'
                                      onClick={() => handleAddMoreService(item._id)}
                                      title="Add More Services"
                                    ><i className="icon-plus">&#43;</i></span>
                                  </AppLink>
                                  {
                                    item.isHide ? (
                                      <button className="edit-button" title='Show' onClick={() => CategoryhandleShowHide(item._id, false)}><i className="ed-icon icon-EyeCloseIcon i-xxs lgray"></i></button>
                                    ) : (
                                      <button className="edit-button" title='Hide' onClick={() => CategoryhandleShowHide(item._id, true)}><i className="ed-icon icon-EyeIcon i-xxs lgray"></i></button>
                                    )
                                  }
                                  <button className="edit-button" title='Delete'><i className="ed-icon icon-delete i-xs lgray" onClick={() => deleteCategoryhandle(item._id)}></i></button>


                                </div>
                              </td>
                            </tr>
                          </>
                        )
                      })) : (<NoDataAvailable title="No records found." />)) : (<div className="loadingGridData"><i className="ed-loadingGrid"></i></div>)}
                      {
                        UncategoryList.success && UncategoryList && UncategoryList?.data && UncategoryList?.data.length === 1 &&
                        <>
                          <tr className={`${enable ? "disable" : ""}`}>
                            <td data-label="service date">
                              <div className="profile-detail">
                                <img src={"https://images.unsplash.com/photo-1603570388466-eb4fe5617f0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"} className="img-icon" alt="" />
                                <p className="title">Uncategorized</p>
                              </div>
                            </td>
                            <td>
                              {UncategoryList.data ?
                                <td>{UncategoryList.data[0]?.serviceCount}</td> :
                                <AppLink to={""}>
                                  <button className="addservice-btn primary"
                                  >+ Add Services</button>
                                </AppLink>
                              }
                            </td>
                            <td></td>

                            <td>{UncategoryList.data[0]?.slotcount}</td>

                          </tr>
                        </>}
                    </React.Fragment>
                  </tbody>
                </table>
              </div>
            </div>
          </> :
          <>
            <div className="add-category-wrap">
              <AddNewElement onClick={onOpenAddcategory} title={"Add a new category"} />
            </div>
          </>
        }
      </div>

      <ConfirmDeletePopUp
        DeleteRef={DeleteRef}
        onClose={() => DeleteServiceHandleClose()}
        HandleDeleteYes={HandleDeleteYes} 
        title={"Category"}
        Subtitle={"Category"}
        />
      <ServiceListPopup onClose={serviceListClose} serviceListRef={serviceListRef} data={serviceData} />
      <AddCategoryPopup onCloseAddcategory={onCloseAddcategory} showAddCategoryRef={showAddCategoryRef} title={"Edit category"} data={categoryData} catid={categoryUpdate} create={create} />
    </React.Fragment>
  )
}

export default CreateCategory