import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckboxInput from '../../../../Common/Form/CheckboxInput';
import Modals from '../../../../Common/Modals';
import ModalBody from '../../../../Common/Modals/ModalsBody';
import ModalHeader from '../../../../Common/Modals/ModalsHeader';
import NoDataAvailable from '../../../../Common/NoDataAvailable';
import SearchControl from '../../../../Common/SearchControl';
import SuccessMessagePopup from '../../../../Common/SuccessMessagePopup';
import { deleteService, getServicesBycategories, MultiDeleteOrUncat, resetMultiDeleteOrUncat } from '../../../../store/actions/bookAppointment';
import { resetInventoryDelete } from '../../../../store/actions/ecommerce/action/inventoryIndex';
import "./CategoriesServices.scss";
import ConfirmDeletePopUp from './ConfirmDeletePopUp';

const ServiceListPopup = ({ serviceListRef, onClose, data }) => {
  const DeleteRef = useRef()
  const dispatch = useDispatch();

  const [uncategorized, setUncategorized] = useState(false);
  const { user, institute, owner, serviceList, serviceListsuccess, multiDeleteOrUncatSuccess, multiDeleteOrUncatData
  } = useSelector((state) => {
    return {
      user: state.user,
      institute: state.user.user_institute,
      owner: state.user._id,
      serviceListsuccess: state.bookAppointment.serviceListByCategories.success,
      serviceList: state.bookAppointment.serviceListByCategories,
      multiDeleteOrUncatSuccess: state.bookAppointment.multiDeleteOrUncat.success,
      multiDeleteOrUncatData: state.bookAppointment.multiDeleteOrUncat.data,
    };
  });
  const [searchTerm, setsearchTerm] = useState("");
  const [categoryId, setcategoryId] = useState("")
  const [serviceIds, setServiceIds] = useState([])
  const [showPop, showPopupSuccess] = useState(false)
  const [deleteUnCatButton, setDeleteUnCatButton] = useState(false)

  useEffect(() => {
    if (data._id) {
      dispatch(getServicesBycategories(institute, owner, "", user.user_business_type, { categoryId: [data._id] }))
    }
  }, [dispatch, institute, owner, user.user_business_type, data._id, data]);
  useEffect(() => {
    setcategoryId(data._id)
  }, [data]);
  let typing;
  const handlesearchTerm = (evt) => {
    evt.preventDefault();
    clearTimeout(typing)
    typing = setTimeout(() => {
      setsearchTerm(evt.target.value);
    }, 400)
    if (!evt.target.value) {
      dispatch(getServicesBycategories(institute, owner, "", user.user_business_type, { categoryId: [data._id] }))
      clearTimeout(typing)
      // setsearchTerm("")
    }
  }
  const handlesearchTermReset = () => {
    setsearchTerm("")
    dispatch(getServicesBycategories(institute, owner, "", user.user_business_type, { categoryId: [data._id] }))
  }
  useEffect(() => {
    if (searchTerm) {
      dispatch(getServicesBycategories(institute, owner, searchTerm, user.user_business_type, { categoryId: [data._id] }))
    }
  }, [dispatch, institute, owner, searchTerm, user.user_business_type])

  const handleCancle = () => {
    onClose()
    setUncategorized(false)
    setServiceIds([])
    setDeleteUnCatButton(false)
    setsearchTerm("")
    dispatch(getServicesBycategories(institute, owner, "", user.user_business_type, { categoryId: [data._id] }))
  }
  const DeleteServiceHandle = () => {
    DeleteRef.current.open()
  }
  const DeleteServiceHandleClose = () => {
    DeleteRef.current.close()
  }
  const deleteServices = (id) => {
    DeleteRef.current.open()
    setServiceIds([id])
    // dispatch(deleteService(id, user.user_business_type));
  }
  const selectedServiceHandle = (e, item) => {
    let inputChecked = e.target.checked;
    let array = serviceIds
    if (inputChecked) {
      array.push(item._id)
      setUncategorized(true)
    } else {
      let index = array.indexOf(item._id)
      array.splice(index, 1)
      setUncategorized(false)
    }
    setServiceIds([...array])
    // // setUncategorized(true)
    // if (serviceIds.length === 0) {
    //   setDeleteUnCatButton(false)
    // }
    // else {
    //   console.log("else")
    //   setDeleteUnCatButton(true)
    // }
  }
  const selectedAllHandle = (e) => {
    // var array = serviceIds
    var array = [];
    if (e.target.checked) {
      for (let i = 0; i < serviceList?.data.length; i++) {
        array.push(serviceList?.data[i]._id)
      }
      setServiceIds([])
      setServiceIds([...array])
    } else {
      setServiceIds([])
      setDeleteUnCatButton(false)
    }
    // if (serviceIds.length === 0) {
    //   setDeleteUnCatButton(false)
    //   // alert("if")
    // }
    // else {
    //   setDeleteUnCatButton(true)
    // }
  }
  useEffect(() => {
    if (serviceIds?.length === 0) {
      setDeleteUnCatButton(false)
      // alert("if")
    }
    else {
      setDeleteUnCatButton(true)
    }
  }, [serviceIds])
  const HandleDeleteYes = () => {
    let data = {
      services: serviceIds,
      data: { isDeleted: true }
    }
    dispatch(MultiDeleteOrUncat(categoryId, user.user_business_type, data))
  }
  const Uncategorizedhandle = (id) => {
    setServiceIds(id)
    let data = {
      services: serviceIds,
      data: { unCategorized: true }
    }
    dispatch(MultiDeleteOrUncat(categoryId, user.user_business_type, data))
    // if (multiDeleteOrUncatSuccess) {
    //   setDeleteUnCatButton(false)
    // }
  }
  const UncategorizedSingleHandle = (id) => {
    // setServiceIds(id)
    let data = {
      services: [id],
      data: { unCategorized: true }
    }
    dispatch(MultiDeleteOrUncat(categoryId, user.user_business_type, data))
  }
  useEffect(() => {
    if (multiDeleteOrUncatSuccess) {
      setDeleteUnCatButton(false)
      DeleteServiceHandleClose()
      setServiceIds([])
      setUncategorized(false)
      showPopupSuccess(true)
      setTimeout(() => {
        showPopupSuccess(false)
        dispatch(resetMultiDeleteOrUncat())
      }, [2500])
    }
  }, [multiDeleteOrUncatSuccess])



  return (
    <>
      <Modals ref={serviceListRef} className="Confirm-deletePopup" Position="center" slide="top" ClosePopUp={() => handleCancle()} ModalsSize="s">
        <ModalHeader title="Services in the category" />
        <ModalBody className="model-wrap">
          <div className="serviceList-wrap">
            <h2 className="title">Selected <span className="count">{serviceIds?.length ? serviceIds?.length : 0}</span></h2>
            <div className="Column">
              <p><small>Categories : <span className="primary">{data.main_category_name}</span></small></p>
              <div className="serach-warp">
                <SearchControl
                  placeholder="Search..."
                  // value={searchTerm}
                  onChange={(e) => handlesearchTerm(e)}
                  reset={() => handlesearchTermReset()}
                />
              </div>
            </div>
          </div>
          <div className="category-servicelist-table">
            <div className="gridListTable ">
              <ul className="gridHeader topInfo">
                <li className="col text-xs w-500  primary" >
                  <CheckboxInput
                    label={""}
                    LabelClass={""}
                    className={""}
                    checked={serviceIds?.length > 0 && serviceIds?.length == serviceList.data.length ? true : false}
                    onChange={(e) => selectedAllHandle(e)}
                  // onChange={UncategorizedHandle}
                  />
                </li>
                <li className="col col-3 text-xs w-400 base" style={{ flexBasis: '33.33%' }}>Name</li>
                <li className="col col-3 text-xs w-500 " style={{ flexBasis: '33.33%' }}>Session</li>
                <li className="col col-2 text-xs w-500 " style={{ flexBasis: '16.66%' }}>Price</li>
                {
                  uncategorized ? (
                    <>
                      <li className="col col-3 text-xs w-500 " style={{ flexBasis: '33.33%' }}>Category</li>
                    </>
                  ) : (
                    <>
                      <li className="col col-2 text-xs w-500 " style={{ flexBasis: '33.33%' }}>&nbsp;</li>
                      <li className="col col-1 text-xs w-500 " style={{ flexBasis: '8.33%' }}>&nbsp;</li>
                    </>
                  )
                }
              </ul>
              <div className='gridBody'>
                <div className='gridRow'>
                  {serviceListsuccess ? (serviceList.data.length ? serviceList.data.map((item, i) => {
                    return (
                      <>
                        <ul className="topInfo">
                          <li className='col'>
                            <div className='checkbox-wrap'>
                              <CheckboxInput
                                label={""}
                                LabelClass={""}
                                className={""}
                                checked={serviceIds?.includes(item._id)}
                                onChange={(e) => selectedServiceHandle(e, item)}
                              // onChange={UncategorizedHandle}
                              />
                            </div>
                          </li>
                          <li className="col col-3" style={{ flexBasis: '33.33%' }}>
                            <div className="profile-detail">
                              <img src={item.image ? item.image : "https://images.unsplash.com/photo-1603570388466-eb4fe5617f0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"} className="img-icon" alt="" />
                              <p className="title">{item.title}</p>
                            </div>
                          </li>
                          <li className="col col-3" style={{ flexBasis: '33.33%' }}>
                            {item.duration}&nbsp;mint.
                          </li>

                          <li className="col col-2" style={{ flexBasis: '16.33%' }}>
                            ₹&nbsp;{item.sessionPrice}
                          </li>
                          {
                            // uncategorized 
                            serviceIds?.includes(item._id)
                              ? (
                                <>
                                  <li className="col col-3 text-xs w-500 " style={{ flexBasis: '33.33%' }}>{data.main_category_name}</li>
                                </>
                              ) : (
                                <>
                                  <li className="col col-2 text-xs w-500 " style={{ flexBasis: '16.33%' }} onClick={() => UncategorizedSingleHandle(item._id)}>
                                    <button className="Uncategorized-btn primary"><i className="icon-Uncategorized" ></i>Move to Uncategorized</button>
                                  </li>
                                  <li className="col col-1 text-xs w-500 " style={{ flexBasis: '8.33%' }}>
                                    <button className="delete-btn"><i className="ed-icon icon-delete i-xs lgray" onClick={() => deleteServices(item._id)}></i>Delete</button>
                                  </li>
                                </>
                              )
                          }
                        </ul>
                      </>
                    )
                  }) : <NoDataAvailable title="No records found." />)
                    : (<div className="loadingGridData"><i className="ed-loadingGrid"></i></div>)}
                </div>
              </div>
            </div>
            {
              // uncategorized
              deleteUnCatButton
                ? (
                  <div className='group-btn'>
                    <button className='button btn-o-red btn-sm' onClick={() => DeleteServiceHandle()}>Delete</button>
                    <button className='button button-primary btn-sm' onClick={() => Uncategorizedhandle()}>Move to Uncategorized</button>
                  </div>
                ) : ""
            }
          </div>
          <ConfirmDeletePopUp DeleteRef={DeleteRef} onClose={() => DeleteServiceHandleClose()} HandleDeleteYes={HandleDeleteYes} />
        </ModalBody>
        {
          multiDeleteOrUncatData?.data?.unCategorized && showPop && (
            <div className="Moved-toste-wrap">
              {/* {alert("succcc")} */}
              <p className="title">{multiDeleteOrUncatData?.services?.length} service moved to uncategorized</p>
            </div>
          )
        }
        {
          multiDeleteOrUncatData?.data?.isDeleted && showPop && (
            <div className="Moved-toste-wrap">
              <p className="title red">{multiDeleteOrUncatData?.services?.length} services deleted</p>
            </div>
          )
        }

      </Modals>
    </>
  )
}

export default ServiceListPopup