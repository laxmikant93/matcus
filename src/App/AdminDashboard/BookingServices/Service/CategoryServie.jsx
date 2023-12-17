import { array } from 'prop-types';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddNewElement from '../../../../Common/AddNewElement/AddNewElement';
import AppLink from '../../../../Common/AppLink';
import SwitchButton from '../../../../Common/Button/SwitchButton';
import { useDetectOutsideClick } from '../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import CheckboxInput from '../../../../Common/Form/CheckboxInput';
import SelectInput from '../../../../Common/Form/SelectInput';
import NoDataAvailable from '../../../../Common/NoDataAvailable';
import SearchControl from '../../../../Common/SearchControl';
import { deleteService, editServiceDetails, getAllMainCategoryList, getServicesBycategories, postServiceDetail, servicesSearch } from '../../../../store/actions/bookAppointment';
import EDropDownShowMore from '../../../Dashboard/EcommerceDashboard/Component/EDropDownShowMore';
import ConfirmDeletePopUp from '../Categories/ConfirmDeletePopUp';

import "./BookingServices.scss"

const CategoryServie = () => {
  const history = useNavigate()
  const dispatch = useDispatch();
  const [enable, setEnable] = useState(false)
  const [searchCategory, setSearchCategory] = useState("")
  const categorySelectRef = useRef(null)
  const [openCategoryPopup, setOpenCategoryPopup] = useDetectOutsideClick(categorySelectRef, false)
  const { user, institute, owner, businesstype, categoryListSuccess, categoryList, serviceListsuccess, serviceList, firstTimeSuccess
  } = useSelector((state) => {
    return {
      user: state.user,
      institute: state.user.user_institute,
      owner: state.user._id,
      businesstype: state.user.user_business_type,
      categoryListSuccess: state.bookAppointment.getMainCategoryList.success,
      categoryList: state.bookAppointment.getMainCategoryList.data,
      serviceListsuccess: state.bookAppointment.serviceListByCategories.success,
      serviceList: state.bookAppointment.serviceListByCategories,
      firstTimeSuccess: state.bookAppointment.serviceListByCategories.firstTimeSuccess,
    };
  });

  // console.log(searchCategory)
  const [unCategorized, setUnCategorized] = useState(false)
  const [categoryIds, setcategoryIds] = useState([])
  const [searchTerm, setsearchTerm] = useState("")
  const DeleteRef = useRef(null)
  useEffect(() => {
    dispatch(getAllMainCategoryList(institute, owner, user.user_business_type))
  }, [dispatch, institute, owner, user.user_business_type]);

  useEffect(() => {
    dispatch(getServicesBycategories(institute, owner, "", user.user_business_type, {}, true))
  }, [dispatch, institute, owner, user.user_business_type]);

  const SelectCategoryHandle = () => {
    setOpenCategoryPopup(true)
  }
  const handleCategorySearch = (e) => {
    setSearchCategory(e.target.value)
  }
  const handleResetCategory = () => {
    setSearchCategory("")
  }
  const [state, setState] = useState(false)
  const handleCategoryFilters = (e, item) => {
    let inputChecked = e.target.checked
    setState(true)
    let array = categoryIds
    if (inputChecked) {
      array.push(item._id)
    } else {
      let index = array.indexOf(item._id)
      array.splice(index, 1)
    }
    setcategoryIds([...array])
    // setOpenCategoryPopup(false)
  }
  const categoryApplyButton = () => {
    if (categoryIds.length > 0 || unCategorized) {
      // console.log(categoryIds, unCategorized, "if")
      dispatch(getServicesBycategories(institute, owner, "", user.user_business_type, { categoryId: categoryIds, unCategorized: unCategorized }))
    } else {
      // console.log("main")
      dispatch(getServicesBycategories(institute, owner, "", user.user_business_type))
    }
  }
  const handleAllCategory = (event) => {
    setState(true)
    if (event.target.checked) {
      let newArr = []
      for (let i = 0; i < categoryList.length; i++) {
        newArr.push(categoryList[i]._id)
      } setcategoryIds(newArr)
    }
    else {
      setcategoryIds([])
    }
  }
  const handleCheckUncategorized = (e) => {
    let inputChecked = e.target.checked
    setState(true)
    if (inputChecked) {
      setUnCategorized(true)
    } else {
      setUnCategorized(false)
    }
  }
  let typing;
  const handlesearchTerm = (evt) => {
    evt.preventDefault();
    clearTimeout(typing)

    setsearchTerm(evt.target.value);

    if (!evt.target.value) {
      dispatch(getServicesBycategories(institute, owner, "", user.user_business_type))
      clearTimeout(typing)
      // setsearchTerm("")
    }
  }
  useEffect(() => {
    if (searchTerm) {
      dispatch(getServicesBycategories(institute, owner, searchTerm, user.user_business_type))
    } else {
      setsearchTerm("")
    }
  }, [dispatch, institute, owner, searchTerm, user.user_business_type])

  const handlesearchTermReset = () => {
    dispatch(getServicesBycategories(institute, owner, "", user.user_business_type))
  }
  const handleEditService = (id) => {
    history(`/bookingservices/category-update/serviceId/${id}`)
  }
  const handleShowHide = (_id, status) => {
    dispatch(editServiceDetails(_id, businesstype, { "service": { "visibleOneSite": status } }))
  }
  // const deleteServiceHandle = (id) => {
  //   dispatch(deleteService(id, businesstype));
  //   setState(false)
  // }
  const AddtoServiceHandle = () => {
    history(`/bookingservices/category-create`)
  }
  const handleToggle = (_id, status) => {
    dispatch(editServiceDetails(_id, businesstype, { "service": { "markAsFeatured": status } }))
  }

  const [deleteID, setDeleteID] = useState("")
  const deleteServiceHandle = (id) => {
    // alert(id)
    setDeleteID(id)
    // console.log(id, "line152", DeleteRef.current)
    DeleteRef.current.open()
  }

  const DeleteServiceHandleClose = () => {
    DeleteRef.current.close()
    setDeleteID("")
  }
  const HandleDeleteYes = () => {
    setState(false)
    dispatch(deleteService(deleteID, businesstype));
    // setDeleteID("")
    DeleteRef.current.close()
  }
  return (
    <React.Fragment>
      <div className="BookingServices-wrapper mt-10">
        <div className="service-wrap">
          <div className="column">
            <h1 className="title">Services</h1>
            <p className="subtitle">Create and edit courses, classes or appointments.</p>
          </div>
          <div className="column column-right">
            <AppLink
              className="button button-primary btn-sm"
              to={`/bookingservices/category-create`}
            >Add a New Service
            </AppLink>
          </div>
        </div>
      </div>
      <div className="ServiceList-Wrapper">
        {firstTimeSuccess ?
          state || searchTerm || serviceList.data.length > 0
            // && !categoryIds?.length === 0
            ?
            <>
              <div className="servicelist-head">
                <div className="select-drop">
                  <div className='add-to-Collection-wrapper'>
                    <button className="color-black btn-drop-round category-button" onClick={SelectCategoryHandle}>
                      {/* {categoryIds?.length > 0 ? `${categoryIds?.length} Categories Selected` : "Select Category"} */}
                      {categoryIds?.length > 0 ? categoryIds.length === 1 ? categoryList.find((item) => item._id === categoryIds[0])?.main_category_name : `${categoryIds?.length} Categories Selected` : "Select Category"}
                    </button>
                    {
                      openCategoryPopup ? (
                        <EDropDownShowMore >
                          <div className='showmore-container-div ' ref={categorySelectRef}>
                            <div className="headerItem add-collection-searchbar headerSearchBar">
                              <SearchControl
                                placeholder="Search..."
                                // value={searchCategory}
                                onChange={handleCategorySearch}
                                onKeyUp={handleCategorySearch}
                                reset={() => handleResetCategory()}
                              />
                            </div>

                            <div className='showmore-checkbox-wrapper' >
                              <CheckboxInput
                                label="All"
                                // value={categoryIds}
                                LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                                className={"eComm-checkbox"}
                                checked={categoryIds.length === categoryList.length ? true : false}
                                onChange={(e) => handleAllCategory(e)}
                              />
                            </div>
                            <div className='showmore-checkbox-container '>
                              {categoryList && categoryList.length > 0 ? categoryList?.filter((category) => {
                                if (searchCategory === "") {
                                  return category;
                                } else if (
                                  category.main_category_name.toLowerCase()
                                    .includes(searchCategory.toLowerCase())
                                ) {
                                  return category;
                                }
                              }
                              ).map((item, key) => {
                                return (
                                  <React.Fragment>
                                    <div className='showmore-checkbox-wrapper inline between-xs' key={key}>
                                      <CheckboxInput
                                        label={item.main_category_name}
                                        // multiLoop={true}
                                        value={item._id}
                                        LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                                        className={"eComm-checkbox"}
                                        checked={categoryIds.includes(item._id)}
                                        onChange={(e) => handleCategoryFilters(e, item)}
                                      />
                                      <p className='text-regf w-400'>{item.service.length}</p>
                                    </div>
                                  </React.Fragment>
                                )
                              }) : ("")
                              }
                              <div className='showmore-checkbox-wrapper' >
                                <CheckboxInput
                                  label="Uncategorized"
                                  // multiLoop={true}
                                  // value={unCategorized}
                                  LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                                  className={"eComm-checkbox"}
                                  checked={unCategorized}
                                  onChange={(e) => handleCheckUncategorized(e)}
                                />
                              </div>
                            </div>

                          </div>
                          <div className='dropdown-btn-wrapper'>
                            <button className='button button-primary btn-block apply-button btn-block  btn-oval text-right mt-10 btn-2xs text-xxs' onClick={() => { categoryApplyButton() }}>Apply</button>
                          </div>
                        </EDropDownShowMore>
                      ) : ''
                    }
                  </div>
                </div>
                <div className="serach-warp">
                  <SearchControl
                    placeholder="Search..."
                    // value={searchTerm}
                    onChange={(e) => handlesearchTerm(e)}
                    // onKeyUp={handleSearch}
                    reset={() => handlesearchTermReset()}
                  />
                </div>
              </div>
              <div className="service-table-wrapper">
                <table>
                  <thead>
                    <tr className='service-tr-list'>
                      <th className='uppercase'> Name</th>
                      <th className='uppercase'>Session</th>
                      <th className='uppercase'>Price</th>
                      <th className='uppercase'>Category</th>
                      <th className='uppercase'>Featured</th>
                      <th className=''>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    <React.Fragment>
                      {firstTimeSuccess ?
                        serviceList.data && serviceList.data.length > 0 ?
                          serviceList.data.map((item) => {
                            return (
                              <React.Fragment>
                                <tr className={`${enable ? "disable" : ""}`}>
                                  <td data-label="service date">
                                    <div className="profile-detail">
                                      <img src={item.image ? item.image : "https://images.unsplash.com/photo-1603570388466-eb4fe5617f0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"} className="img-icon" alt="" />
                                      <p className="title">{item.title}</p>
                                    </div>
                                  </td>
                                  <td className='capitalize'>{item.duration}&nbsp;mint.</td>
                                  <td className='capitalize'>₹&nbsp;{item.sessionPrice}</td>
                                  <td className='capitalize'>{item?.unCategorized ? "unCategorized" : item?.categoryName?.main_category_name}</td>
                                  <td className='capitalize'>
                                    {item.markAsFeatured ?
                                      <div className="switch-wrap">
                                        <SwitchButton
                                          checked={item.markAsFeatured}
                                          onChange={(e) => handleToggle(item._id, false)} />
                                        <p className="title">Yes</p>
                                      </div> : <div className="switch-wrap">
                                        <SwitchButton
                                          checked={item.markAsFeatured}
                                          onChange={(e) => handleToggle(item._id, true)} />
                                        <p className="title">No</p>
                                      </div>}
                                  </td>
                                  <td className='capitalize'>
                                    <div className="group-icons">
                                      <button className="edit-button" title='Edit' onClick={() => handleEditService(item._id)}><i className="ed-icon icon-edit i-xxs lgray"></i></button>
                                      {
                                        item?.visibleOneSite ? (
                                          <button className="edit-button" title='Hide' onClick={() => handleShowHide(item?._id, false)}><i className="ed-icon icon-EyeIcon i-xxs lgray"></i></button>
                                        ) : (
                                          <button className="edit-button" title='Show' onClick={() => handleShowHide(item?._id, true)}><i className="ed-icon icon-EyeCloseIcon i-xxs lgray"></i></button>
                                        )
                                      }
                                      <button className="edit-button" title='Delete' onClick={() => deleteServiceHandle(item._id)}><i className="ed-icon icon-delete i-xs lgray"></i></button>
                                    </div>
                                  </td>
                                </tr>
                              </React.Fragment>
                            )
                          }
                          ) : (
                            <tr>
                              <td colspan="6">
                                <NoDataAvailable title="No records found." />
                              </td>
                            </tr>
                          )
                        : <div className="loadingGridData"><i className="ed-loadingGrid"></i></div>
                      }
                    </React.Fragment>
                  </tbody>
                </table>
              </div>
            </>
            :
            serviceListsuccess && serviceList.data.length === 0
              ?
              <AddNewElement onClick={AddtoServiceHandle} title={"Add a new service"} />
              :
              <div className="loadingGridData"><i className="ed-loadingGrid"></i></div>
          : <div className="loadingGridData"><i className="ed-loadingGrid"></i></div>}
      </div>
      <ConfirmDeletePopUp DeleteRef={DeleteRef} onClose={() => DeleteServiceHandleClose()} HandleDeleteYes={HandleDeleteYes} />

      {/* {
        serviceListsuccess && serviceList.data && serviceList?.data.length === 0 &&
        // !searchTerm && !categoryIds && !unCategorized &&
        <>
          <AddNewElement onClick={AddtoServiceHandle} />
        </>
      } */}
    </React.Fragment >
  )
}

export default CategoryServie