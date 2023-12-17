import React, { useEffect, useRef, useState } from 'react'
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import AppLink from '../../../Common/AppLink';
import DummyListProfile from "../../../assets/images/img/category-profile.png"
import FormInput from "../../../Common/Form/FormInput"
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteMainCategory, deleteService, editMainCategoryData, editMainCategoryDetails, editServiceDetails,
  getAllMainCategoryList,
} from '../../../store/actions/bookAppointment';
import NoDataAvailable from '../../../Common/NoDataAvailable';
import Popup from '../../../Common/Popup';
import './bookAppointment.style.scss'
import { useNavigate } from 'react-router-dom';
import DummyProfile from "../../../assets/images/img/DummyProfile.png"
import { useDetectOutsideClick } from '../../../Common/DetectOutsideClick/useDetectOutsideClick';
// import EditCategoryPopup from './EditCategoryPopup';
import AddCategoryPopup from './AddCategoryPopup';
import { useParams } from 'react-router-dom';
import DeleteService from './DeleteService';
import SelectTitle from '../../../Common/SectionTitle';
const BookAppointment = () => {
  const deleteServiceRef = useRef()
  let history = useNavigate();
  let dispatch = useDispatch();
  const showAddCategoryRef = useRef();
  const [services, setServices] = useState("");
  const [category, setCategory] = useState("");
  const [show, setShow] = useState(true);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [showCategory, setHideCategory] = useState(-1);
  const [updateId, setUpdateId] = useState("");
  const [categoryPopupToggle, setCategoryPopupToggle] = useState(false);
  const [serviceVissible, setServiceVissible] = useState(false);
  const { users, institute, owner, businesstype, categoryListLoading, categoryListSuccess, categoryListData } = useSelector((state) => {
    return {
      users: state.user,
      institute: state.user.user_institute,
      owner: state.user._id,
      businesstype: state.user.user_business_type,
      categoryListLoading: state.bookAppointment.getMainCategoryList.loading,
      categoryListSuccess: state.bookAppointment.getMainCategoryList.success,
      categoryListData: state.bookAppointment.getMainCategoryList.data,
      serviceListSucces: state.bookAppointment.getServiceList.success,
      serviceListData: state.bookAppointment.getServiceList.data
    }
  })

  useEffect(() => {
    dispatch(getAllMainCategoryList(institute, owner, businesstype))
  }, [])

  useEffect(() => {
    if (updateId !== "") {
      history(`/bookingservices/category-update/serviceId/${updateId}`)
    }
    return () => {
      setUpdateId("")
    }
  }, [updateId])

  const selectGroup = [
    "Status",
    "Accepted",
    "Rejected",
    "Notified",
    "Pending",
    "Booking Timings",
    "Recent to Old",
    "Old to Recent",
  ];

  let filterValues = ["Status", "Booking Timings"]
  // const SingleSelectHandel = (value) => {
  //   let selectedValue = value
  //   switch (selectedValue) {
  //     case "All":
  //       dispatch(getAppointmentList(insID));
  //       break;
  //     case "Pending":
  //       dispatch(sortAppointmentList(insID, "isStatus", selectedValue));
  //       break;
  //     case "Accepted":
  //       dispatch(sortAppointmentList(insID, "isStatus", selectedValue));
  //       break;
  //     case "Rejected":
  //       dispatch(sortAppointmentList(insID, "isStatus", selectedValue));
  //       break;
  //     case "Notified":
  //       dispatch(sortAppointmentList(insID, "isStatus", selectedValue));
  //       break;
  //     case "Recent to Old":
  //       dispatch(sortAppointmentList(insID, "sortOrder"));
  //       break;
  //     case "Old to Recent":
  //       dispatch(sortAppointmentList(insID, "sortOrder"));
  //       break;
  //     default:
  //       dispatch(getAppointmentList(insID));
  //   }
  // }

  //POPUP TO OPEN CLOSE SERVICE
  const categoryHandle = (id) => {
    setHideCategory(showCategory === id ? -1 : id);
    setCategoryPopupToggle(false);
    setIsActive(false);
  }

  //EDIT SERVICE
  const handelUpdateUser = (id) => {
    setUpdateId(id);
  }

  //FUNCTION TO HIDE AND SHOW SERVICES
  const handleShowHide = (_id, status) => {
    // setShow(!show)
    dispatch(editServiceDetails(_id, businesstype, { "service": { "visibleOneSite": status } }))
  }

  //FUNCTION TO HIDE AND SHOW CATEGORY
  const CategoryhandleShowHide = (_id, status) => {
    dispatch(editMainCategoryDetails(_id, businesstype, { "isHide": status }))
  }

  //POPUP TO DELETE SERVICE

  //DELETE SERVICE FUNCTION
  const ShowCanclePopup = (_id) => {
    deleteServiceRef.current.open()
    setServices(_id);
  };

  const popupClosehandle = () => {
    deleteServiceRef.current.close()
  }
  //DELETE CATEGORY FUNCTION
  const handleCategory = (_id) => {
    dispatch(editMainCategoryDetails(_id, businesstype))
  }

  const handleDeleteCategory = (_id) => {
    dispatch(deleteMainCategory(category, businesstype))
  };
  const [categoryData, setCategoryData] = useState()
  const [categoryUpdate, setCategoryUpdate] = useState()
  const showEditCategory = (item) => {
    setCategoryData(item)
    setCategoryUpdate(item._id)
    showAddCategoryRef.current.open()
  }
  const onCloseEditcategory = () => {
    showAddCategoryRef.current.close()
    setCategoryData("")
  }

  const handleVissible = (e, _id) => {
    let inputVissible = e.target.checked
    let data = {
      markAsFeatured: inputVissible,
    }
    if (inputVissible) {
      setServiceVissible(true);
      dispatch(editMainCategoryData(_id, businesstype, data))
    }
    else {
      setServiceVissible(false);
      dispatch(editMainCategoryData(_id, businesstype, data))
    }
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/bookingservices/book-appointment-list" title="Category List" />
      </Breadcrumb>
      <div className="PageTopHead PTH-BookingServiceList mt-10">
        <div className='PHT-Item'>
          <h1>Category<span>{categoryListSuccess && categoryListData.length}</span></h1>
          <p>Create and edit Services and categories</p>
        </div>
        <div className="PTH-Item P-Right">
          {/* <AppLink
                to={`/bookingservices/booking-list`}
                className="button btn-o-primary btn-sm bg-lightblue"
              >Booking List
              </AppLink> */}
          <AppLink
            to={`/bookingservices/category-create`}
            className="button button-primary btn-sm"
          >Add a New Service
          </AppLink>
        </div>
      </div>
      <SelectTitle type="categorySelect" />
      <SelectTitle type="bookingserviceSelect" />
      <div className="flex service-list mt-30">
        <h4 className='probottom'>Category List</h4>

        <div className='mb-40'>
          {
            categoryListSuccess && categoryListData.length > 0 ?
              (
                categoryListLoading ? (<NoDataAvailable title="Loading..." />) : (
                  <>
                    {categoryListSuccess && categoryListData?.length ? (
                      categoryListData.map((item, index) => {
                        return (
                          <article
                            key={index}
                            id={item._id}
                            className={`${showCategory === item._id ? "active" : ""}`}
                          >
                            <div className="categoryHead">
                              <div className="head_wrap">
                                <div className="profile-info">
                                  <div className="profile">
                                    <img src={item.uploadefile ? item.uploadefile : DummyListProfile} className="img-fluid" alt="" />
                                  </div>
                                  <h5>{item.main_category_name}</h5>
                                </div>
                                {
                                  showCategory === item._id ?
                                    (
                                      <div className='category_wrapper'>
                                        <div className='categoryicon_wrap'>
                                          <div className="markfeature">
                                            <label className="small">
                                              <input
                                                type="checkbox"
                                                checked={item.markAsFeatured}
                                                onClick={(e) => handleVissible(e, item._id)}
                                              />
                                              Mark as featured
                                            </label>
                                          </div>
                                          <button className="edit-btn icon" title="Edit" onClick={() => showEditCategory(item)}>
                                            <i className='icon-edit'></i>
                                          </button>
                                          <AppLink to={`/bookingservices/category-update/categoryId/${item._id}`}>
                                            <span
                                              className='icon col'
                                              onClick={() => handleCategory(item._id)}
                                              title="Add More Services"
                                            ><i className='ed-plus'>&#43;</i></span>
                                          </AppLink>
                                          <AppLink to="#">
                                            {item.isHide ?
                                              (<div className='icon'
                                                onClick={() => CategoryhandleShowHide(item._id, false)}
                                                title="Show"
                                              >
                                                <span className='iconcol'><i className='ed-eyeClose'></i></span>
                                              </div>) :
                                              (<div className='icon'
                                                onClick={() => CategoryhandleShowHide(item._id, true)}
                                                title="Hide"
                                              >
                                                <span className='iconcol'><i className='ed-eye'></i></span>
                                              </div>)}
                                          </AppLink>
                                          {/* <>
                                            <button>
                                              <span className='icon col'
                                                onClick={() =>
                                                  onClickCategoryBtnDropDownRemove(item._id)}
                                                title="Delete"
                                              ><i className='ed-trash'></i>

                                                {item._id === category && (
                                                  <Popup
                                                    show={categoryPopupToggle}
                                                    removeButtonLabel={"Delete"}
                                                    cancelButtonLabel={"Cancel"}
                                                    RemovePopToggleRef={dropdownRef}
                                                    CancelProp={handleCancel}
                                                    RemoveProp={() => handleDeleteCategory(item._id)}
                                                  // loading={buttonDeleteLoading}
                                                  >
                                                    <p className="gray text-s w-300">
                                                      You are about to remove this category.
                                                    </p>
                                                    <p className="dgray text-s w-400">Are you sure?</p>
                                                  </Popup>
                                                )}
                                              </span>

                                            </button>
                                          </> */}
                                        </div>
                                        <span className="openclose_category_icon"
                                          onClick={() => categoryHandle(item._id)}
                                          title="Close"
                                        >&#8722;</span>
                                      </div>
                                    ) : <span className="openclose_category_icon" title="Open" onClick={() => categoryHandle(item._id)} >&#43;</span>
                                }
                              </div>
                            </div>
                            {showCategory === item._id ?
                              (
                                <React.Fragment>
                                  <div className="AddedCard_collapse">
                                    <div className="Added-card">
                                      {item._id === showCategory ? item.service.map((serviceItem, key) => {
                                        return (
                                          <React.Fragment>
                                            <div className="card">
                                              <div className="gridlist">
                                                <div className='profile'>

                                                  <img src={serviceItem.image ? serviceItem.image : DummyProfile} className="img-fluid" alt="" />

                                                </div>
                                                <div className='details'>
                                                  <h4>{serviceItem.title}</h4>
                                                  <h5>{users.user_institute_institute_address ? users.user_institute_institute_address : "Office Address"}</h5>
                                                  <h5>{serviceItem.duration} min</h5>
                                                  <h5>₹ {serviceItem.sessionPrice} per session</h5>
                                                </div>
                                                <div className="function">
                                                  <AppLink to={`/bookingservices/category-update/serviceId/${serviceItem._id}`}>
                                                    <div className='icon mb-10'>
                                                      <span className='iconcol'>
                                                        <i className='icon-edit'></i>
                                                      </span>
                                                      <span>Edit</span>
                                                    </div>
                                                  </AppLink>
                                                  <>
                                                    {serviceItem.visibleOneSite ?
                                                      (<button className='icon mb-10'
                                                        onClick={() => handleShowHide(serviceItem._id, false)}>
                                                        <span className='iconcol'><i className='ed-eye'></i></span><span>Hide</span></button>)
                                                      :
                                                      (
                                                        <button className='icon mb-10'
                                                          onClick={() => handleShowHide(serviceItem._id, true)}>
                                                          <span className='iconcol'><i className='icon-eyeClose'>
                                                          </i></span><span>Unhide</span>
                                                        </button>
                                                      )
                                                    }
                                                  </>
                                                  <div>
                                                    <div className='icon' onClick={() => ShowCanclePopup(serviceItem._id)}>
                                                      <span className='iconcol'

                                                      ><i className='icon-delete'></i></span><span>Delete</span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </React.Fragment>
                                        )
                                      }) : ("")
                                      }
                                    </div>
                                  </div>
                                </React.Fragment>
                              ) : ""
                            }
                          </article>
                        );
                      })
                    ) : ""
                    }
                  </>
                )
              ) : (
                <AppLink to={`/bookingservices/category-create`} type='button' className='drapbutton mt-20'>
                  <i className='ed-icon icon-plus-add primary i-xs mr-2'></i>
                  Add a New Service
                </AppLink>
              )
          }
          {

          }
        </div>
      </div>
      {/* <AppointmentsList appointments={appointments} appointmentList={appointmentList} /> */}
      <AddCategoryPopup onCloseEditcategory={() => onCloseEditcategory()} showAddCategoryRef={showAddCategoryRef} title={"Edit category "} data={categoryData} catid={categoryUpdate} />
      <DeleteService popupClosehandle={() => popupClosehandle()} deleteServiceRef={deleteServiceRef} services={services} />

    </>

  );
}

export default BookAppointment;
