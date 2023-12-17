import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment';
import ReactDatePicker from 'react-datepicker'
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import SearchControl from '../../../Common/SearchControl';
import NoDataAvailable from '../../../Common/NoDataAvailable';
import './bookAppointment.style.scss'
import InputDatePicker from '../../../Common/Form/InputDatePicker';
import SwitchButton from '../../../Common/Button/SwitchButton/index';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllMainServiceList, getBookingList, getBookingListByCustomeDate, getBookingListByDate, getBookingListSearch, getBookingListSort, getDisableButtonData, geteditAppListStatus, geteditAppointment, patchDisableDataButton, resetEditAppointmentDetail,

  resetGetSingleService,

} from '../../../store/actions/bookAppointment';

import { useParams } from 'react-router-dom';
import SingleSelectDropdown from '../../../Common/Form/SingleSelectDropdown';
import AddAppointmentPopup from './AddAppointmentPopup';
import CancelBookingPopup from './CancelBookingPopup';
import ViewDetailPopup from './ViewDetailPopup';
import { useDetectOutsideClick } from '../../../Common/DetectOutsideClick/useDetectOutsideClick';
import RejectBookingPopup from './RejectBookingPopup';
import { showSuccessPopup } from '../../../store/actions/successmessagepopup';
const Bookinglist = () => {
  const dropRef = useRef();
  const viewDetailRef = useRef(null)
  const addEditRef = useRef(null)
  const cancelBokingRef = useRef(null)
  const AcceptRejectPopToggleRef = useRef();
  const RejectBokingRef = useRef(null)

  const dispatch = useDispatch();
  const { id } = useParams();
  const [bookingDate, setBookingDate] = useState();
  const [acceptPopupToggle, setAcceptPopupToggle] = useState(-1);
  const [rejectPopupToggle, setRejectPopupToggle] = useState(-1);
  const [notifyPopupToggle, setNotifyPopupToggle] = useState(-1);
  const [isFilled, setIsFilled] = useState(false);
  const [toggle, setIsToggle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // const [droplist, setDropList] = useDetectOutsideClick(dropRef, false)
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const dropdownRef = useRef(null);
  const [facultyId, setFacultyId] = useState("");
  const [editAppointment, setEditAppointment] = useState(false);
  const [viewDetails, setViewDetails] = useState([])
  const [allServicesTitle, setAllServicesTitle] = useState([])
  const [Dropdown, setDropdown] = useDetectOutsideClick(dropRef, false);

  const onClickBtnDropDownRemove = (id, isActive) => {
    setFacultyId(id);
    setIsActive(isActive);
  };
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const ShowHandlePopup = (item) => {
    setViewDetails(item)
    setEditAppointment(true)
    viewDetailRef.current.close()
    addEditRef.current.open()
  }

  const AddAppointmentShowPopup = () => {
    setEditAppointment(false)
    addEditRef.current.open()
  }

  const onCloseAddedit = () => {
    addEditRef.current.close();
    setEditAppointment(false);
    setViewDetails([])
  }



  const ShowCanclePopup = (item) => {
    setViewDetails(item)
    cancelBokingRef.current.open()
  }
  const onCloseCancel = () => {
    cancelBokingRef.current.close()
  }



  const ShowdetailPopup = (item) => {
    setViewDetails(item)
    viewDetailRef.current.open()
  }
  const onCloseViewDetails = () => {
    viewDetailRef.current.close()
  }


  const ShowRejectPopup = (item) => {
    setViewDetails(item)
    RejectBokingRef.current.open()
  }
  const onCloseRejeact = () => {
    RejectBokingRef.current.close()
  }


  const { insID, institute, ownerID, appointmentListloading, appointmentListSuccess, appointmentListData, editAppointmentLoading,
    serviceListData, editAppointmentSuccess, businesstype, getDisableDataData
  } = useSelector((state) => {
    return {
      insID: state.user.user_institute,
      ownerID: state.user._id,
      institute: state.user.user_institute,
      businesstype: state.user.user_business_type,
      appointmentListData: state.bookAppointment.getBookingList.data,
      appointmentListSuccess: state.bookAppointment.getBookingList.success,
      appointmentListloading: state.bookAppointment.getBookingList.loading,
      editAppointmentLoading: state.bookAppointment.editAppointment.loading,
      editAppointmentSuccess: state.bookAppointment.editAppointment.success,

      serviceListloading: state.bookAppointment.getallServiceList.loading,
      serviceListsuccess: state.bookAppointment.getallServiceList.success,
      serviceListData: state.bookAppointment.getallServiceList.data,
      getDisableDataData: state.bookAppointment.getDisableData.data,

    }
  })

  useEffect(() => {
    dispatch(getAllMainServiceList(institute, businesstype))
  }, [dispatch, institute])

  useEffect(() => {
    dispatch(getBookingList(insID, ownerID, businesstype));
    ShowAllHandler("showAll")
  }, [dispatch, insID, ownerID]);

  useEffect(() => {
    dispatch(resetEditAppointmentDetail());
    if (editAppointmentSuccess && !isFilled) {
      setIsFilled(true);
      setAcceptPopupToggle(-1);
      setRejectPopupToggle(-1);
      setNotifyPopupToggle(-1);
    }
  }, [dispatch, editAppointmentSuccess, isFilled])

  useEffect(() => {
    // if (searchTerm) {
    dispatch(getBookingListSearch(insID, ownerID, searchTerm, businesstype))
    // }
  }, [dispatch, insID, ownerID, searchTerm])

  let typing;
  const searchInputHandel = (evt) => {
    evt.preventDefault();
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(evt.target.value);
    }, 400);
    if (!evt.target.value) {
      clearTimeout(typing);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    if (bookingDate) {
      ShowAllHandler("calender")
      dispatch(getBookingListByDate(insID, ownerID, bookingDate, businesstype))
    }
  }, [dispatch, insID, ownerID, bookingDate])

  useEffect(() => {
    if (startDate, endDate) {
      ShowAllHandler("CustomDateSelection")
      dispatch(getBookingListByCustomeDate(insID, ownerID, startDate, endDate, businesstype))
    }
  }, [insID, ownerID, startDate, endDate])


  const filterValues = ["sortOrder"];
  const selectGroup = [
    "upcomming",
    "Recent to Old",
    "Old to Recent",
    "Accepted",
    "Cancelled",
    "Rejected",
    "Pending"
  ]

  const SingleSelectHandel = (value) => {
    const inputValue = value
    switch (inputValue) {
      case "upcomming":
        dispatch(getBookingListSort(insID, ownerID, "new", businesstype));
        break;
      case "Old to Recent":
        dispatch(getBookingListSort(insID, ownerID, "old", businesstype));
        break;

      case "Recent to Old":
        dispatch(getBookingListSort(insID, ownerID, "new", businesstype));
        break;
      case "Accepted":
        dispatch(getBookingListSort(insID, ownerID, "Accepted", businesstype));
        break;
      case "Cancelled":
        dispatch(getBookingListSort(insID, ownerID, "Cancelled", businesstype));
        break;
      case "Rejected":
        dispatch(getBookingListSort(insID, ownerID, "Rejected", businesstype));
        break;
      case "Pending":
        dispatch(getBookingListSort(insID, ownerID, "Pending", businesstype));
        break;


      default:
        dispatch(getBookingList(insID, ownerID, businesstype));
    }
  };

  const handleAcceptButton = (id) => {
    dispatch(geteditAppListStatus(id, businesstype, { isStatus: "Accepted" }));
  }

  const ShowAllHandler = (toggleForBookingSetting) => {
    setIsToggle(toggleForBookingSetting)
    if (toggleForBookingSetting === "calender") {
      dispatch(getBookingListByDate(insID, ownerID, bookingDate, businesstype))
      // dispatch(getBookingListByDate(insID, ownerID, moment(bookingDate).add(330, 'seconds')))
      // 
    }
    if (toggleForBookingSetting === "CustomDateSelection") {
      dispatch(getBookingListByCustomeDate(insID, ownerID, businesstype))
    }
    if (toggleForBookingSetting === "showAll") {
      dispatch(getBookingList(insID, ownerID, businesstype))
    }
  }
  // console.log(insID)
  useEffect(() => {
    return () => {
      dispatch(resetGetSingleService())
    }
  }, [dispatch])

  useEffect(() => {
    let array = []
    serviceListData && serviceListData.map((item) => {
      array.push(item.title)
    })
    setAllServicesTitle([...array])
  }, [serviceListData])



  const DropdownHandle = () => [
    setDropdown(!Dropdown)
  ]
  // const getFilterList = (values) => {
  //   if (values.length) {

  //   }
  // };
  // FUNCTION FOR BOOKING DISABLE

  useEffect(() => {
    dispatch(getDisableButtonData(insID, businesstype))
  }, [])

  const [bookingforservices, setBookingforservices] = useState(false)
  const [bookingform, setBookingform] = useState(false)
  const [bookingformWhatsapp, setBookingformWhatsapp] = useState(false)
  const [bookingDisableButton, setBookingDisableButton] = useState(true)
  const [disable, setDisable] = useState(false)

  useEffect(() => {
    setBookingforservices(getDisableDataData?.booking_for_service)
    setBookingform(getDisableDataData?.booking_form)
    setBookingformWhatsapp(getDisableDataData?.booking_form_whatsapp)
    setBookingDisableButton(getDisableDataData?.booking_status)
    if (getDisableDataData?.booking_status === false) {
      setDisable(true)
    }
  }, [getDisableDataData?.booking_for_service, getDisableDataData?.booking_form, getDisableDataData?.booking_form_whatsapp, getDisableDataData?.booking_status])

  // console.log(getDisableDataData._id)

  const handleRadio = (item) => {
    // console.log("hello")
    if (item === "Bookingforservices") {
      // console.log("1")
      setBookingforservices(true)
      setBookingform(false)
      setBookingformWhatsapp(false)
      let data = {
        booking_for_service: true,
        booking_form: false,
        booking_form_whatsapp: false,
        _id: getDisableDataData._id,
        business_id: insID
      }
      dispatch(patchDisableDataButton(getDisableDataData._id, businesstype, data))
      dispatch(showSuccessPopup(
        "Booking for services"
      ))
    } else if (item === "Bookingform") {
      // console.log("2")
      setBookingforservices(false)
      setBookingform(true)
      setBookingformWhatsapp(false)
      let data = {
        booking_for_service: false,
        booking_form: true,
        booking_form_whatsapp: false,
        _id: getDisableDataData._id,
        business_id: insID
      }
      dispatch(patchDisableDataButton(getDisableDataData._id, businesstype, data))
      dispatch(showSuccessPopup(
        "Booking form"
      ))
    }
    else {
      setBookingforservices(false)
      setBookingform(false)
      setBookingformWhatsapp(true)
      let data = {
        booking_for_service: false,
        booking_form: false,
        booking_form_whatsapp: true,
        _id: getDisableDataData._id,
        business_id: insID
      }
      dispatch(patchDisableDataButton(getDisableDataData._id, businesstype, data))
      dispatch(showSuccessPopup(
        "Book form Whatsapp"
      ))
      // console.log("3")
    }
  };

  // console.log(getDisableDataData)

  const handleDisableButton = (e) => {
    let inputChecked = e.target.checked;
    let data = {
      booking_status: inputChecked,
      booking_for_service: true,
      _id: getDisableDataData._id,
      business_id: insID
    }
    dispatch(patchDisableDataButton(getDisableDataData._id, businesstype, data))
    setBookingDisableButton(inputChecked)
    if (inputChecked === false) {
      setDisable(true)
      setBookingforservices(false)
      setBookingform(false)
      setBookingformWhatsapp(false)
      let data = {
        booking_for_service: false,
        booking_form: false,
        booking_form_whatsapp: false,
        booking_status: inputChecked,
        _id: getDisableDataData._id,
        business_id: insID
      }
      dispatch(patchDisableDataButton(getDisableDataData._id, businesstype, data))

    } else {
      setBookingforservices(true)

      setDisable(false)

    }
    // console.log(inputChecked)
  }

  return (
    <React.Fragment>
      <div className="">
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/bookingservices/book-appointment-list" title="Booking List" />
          {/* <BreadcrumbItem to="/bookingservices/booking-list" title="Booking List" /> */}
        </Breadcrumb>
        <div className='booklistwrapper'>
          <div className="bookhead">
            <div className='booktext'>
              <h1>Bookings <span className="w-200 text-sm mgray">{moment().format('Do MMM YYYY')}</span></h1>

            </div>
            <button className="button button-primary btn-xs" onClick={() => AddAppointmentShowPopup()}>Add Appointment</button>
            <div>

              {/* <SearchControl
                classNameWrappper="tableSearchbar"
                id="search"
                onChange={searchInputHandel}
                reset={() => setSearchTerm("")}
                name="search"
                placeholder={"Search..."}
              /> */}
              <SearchControl
                classNameWrappper="tableSearchbar"
                id="search"
                onChange={searchInputHandel}
                reset={() => setSearchTerm("")}
                name="search"
                placeholder={"Search..."}
              />
            </div>
            {/* <div>
              <div className="PTH-Item">
                <MultipleSelectDropDownCommon
                  selectGroup={allServicesTitle ? allServicesTitle : []}
                  OnSelectedValue={getFilterList}
                  name="Filter"
                  SwitchSelectData={false}
                // CourseSwitch={false}
                />
              </div>
            </div> */}
            <div>
              <div className="PTH-Item">
                <SingleSelectDropdown
                  selectGroup={selectGroup}
                  filterValues={filterValues}
                  SingleSelectHandel={SingleSelectHandel}
                  SingleSelectLabelName={"Filter"}
                />
              </div>
            </div>
            {/* <div>
              <div className="PTH-Item">
                <SingleSelectDropdown
                  selectGroup={selectGroup}
                  filterValues={filterValues}
                  SingleSelectHandel={SingleSelectHandel}
                  SingleSelectLabelName={"Sort"}
                />
              </div>
            </div> */}
            <div className="setting-btn">
              <button onClick={DropdownHandle}><i className="icon-setting"></i></button>
              {
                Dropdown && (
                  <>
                    <div className="Dropdown-wrap" ref={dropRef}>
                      <div className="book-head">
                        <h3>Disable Booking</h3>
                        <div>
                          <SwitchButton
                            checked={bookingDisableButton}
                            onChange={(e) => handleDisableButton(e)}
                          />
                        </div>
                      </div>
                      <div className="book-body" aria-disabled={bookingDisableButton ? false : true}>
                        <div className='radioFieldWrap'>
                          <label className="radio-btn">
                            <input
                              type="radio"
                              name="services"
                              disabled={disable}
                              checked={bookingforservices}
                              onChange={() => handleRadio("Bookingforservices")}
                            />
                            <span>Booking for services</span>
                          </label>
                        </div>
                        <div className='radioFieldWrap'>
                          <label className="radio-btn">
                            <input type="radio"
                              name="services"
                              checked={bookingform}
                              disabled={disable}

                              onChange={() => handleRadio("Bookingform")}

                            />
                            <span>Booking form</span>
                          </label>
                        </div>
                        <div className='radioFieldWrap'>
                          <label className="radio-btn">
                            <input type="radio"
                              name="services"
                              disabled={disable}
                              checked={bookingformWhatsapp}
                              onChange={() => handleRadio("BookingformWhatsapp")}
                            />
                            <span>Book form Whatsapp</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )
              }
            </div>
          </div>
          <div className="bookwrapper">
            <div className="Aside">
              <div>
                <label className={`active `}>
                  <input
                    type="radio"
                    defaultChecked={true}
                    value="name"
                    name="user1"
                    className='mr-5'
                    checked={toggle === "calender"}
                    onChange={() => ShowAllHandler("calender")}
                  />Calendar
                </label>
                <div className="calender mb-30 mt-20">
                  <ReactDatePicker
                    selectsRange
                    inline
                    type="date"
                    name='Booking_Date'
                    selected={bookingDate}
                    onChange={(date) => setBookingDate(date[0])}
                  />
                </div>
              </div>
              <div className='mb-20'>
                <label className={`active`}>
                  <input
                    type="radio"
                    defaultChecked={false}
                    value="name"
                    name="user1"
                    className='mr-5'
                    checked={toggle === "CustomDateSelection"}
                    onChange={() => ShowAllHandler("CustomDateSelection")}

                  />Custom Date Selection
                </label>
                <div className="DateGrid mt-20">
                  <div className="datePickerWrap">
                    <InputDatePicker
                      name="startDate"
                      type="date"
                      // selected={startDate}
                      value={startDate}
                      onSelect={(selectedDate) => setStartDate(selectedDate, "startDate")}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                    />
                  </div>
                  <span className="font-text">to</span>
                  <div className="datePickerWrap">
                    <InputDatePicker
                      name="Custom_Date"
                      type="date"
                      // selected={endDate}
                      value={endDate}
                      onSelect={(selectedDate) => setEndDate(selectedDate, "endDate")}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                    />
                  </div>
                </div>

              </div>
              <div>
                <label className={`small primary`}>
                  <input
                    type="radio"
                    defaultChecked={false}
                    value="name"
                    name="user1"
                    className='mr-5'
                    checked={toggle === "showAll"}
                    onChange={() => ShowAllHandler("showAll")}
                  />Show All
                </label>
              </div>
            </div>
            <div className="timetable">
              <div className="gridListTable">
                <ul className='gridHeader'>
                  <li className='col col-1'></li>
                  <li className='col col-2'>Name</li>
                  <li className='col col-2'>Phone </li>
                  <li className='col col-2'>Service</li>
                  <li className='col col-3'>Date & Time Slot</li>
                  <li className='col col-2 text-center'>Action</li>
                </ul>
                <div className="gridBody">
                  {appointmentListloading ? (<div className="loadingGridData">
                    <i className="ed-loadingGrid"></i>
                  </div>) :
                    (
                      <>
                        {appointmentListSuccess && appointmentListData.length ? (
                          appointmentListData.map((item, index) => {
                            return (
                              <div className="gridRow">
                                <ul className='topInfo'>
                                  <li className='col col-1 count_list'></li>
                                  <li className='col col-2'>{item.full_name ? item.full_name : item.name}</li>
                                  <li className='col col-2 text-font'>+{item.contact && `${item.countryCode} ${item.contact}`}
                                  </li>
                                  <li className='col col-2 text-font'>
                                    {item.service.title ? item.service.title : "Dermatologist"}
                                  </li>
                                  <li className='col col-3 text-font'><div>
                                    <p className=''>
                                      {moment(item.booking_date).format("l")}</p>
                                    <p className=''>
                                      {item.booking_time}</p>

                                  </div>
                                  </li>
                                  <li className='col col-2 text-font'>
                                    <div className='icon_wrapp'>

                                      {
                                        item.isStatus === "Accepted" ? <p className="secondary">Accepted</p> :
                                          item.isStatus === "Rejected" ? <p className="red">Rejected</p> :
                                            item.isStatus === "Cancelled" ? <p className="red">Cancelled</p>

                                              :
                                              (
                                                <div className="actionBtn">
                                                  <>
                                                    <div className="reject">
                                                      <button
                                                        className="btn-reject "
                                                        title="Reject"
                                                        onClick={() => ShowRejectPopup(item)}
                                                      >
                                                        <i className="icon-reject"></i>
                                                      </button>
                                                      <p className="base text-accept w-300">Reject</p>

                                                    </div>
                                                  </>
                                                  <>
                                                    <div className="accept">
                                                      <button
                                                        className="btn-accept"
                                                        title="Accept"
                                                        onClick={() => handleAcceptButton(item._id, id)}
                                                      >
                                                        <i className="icon-accept"></i>
                                                      </button>
                                                      <p className="base w-300 text-accept">Accept</p>

                                                    </div>
                                                  </>
                                                </div>
                                              )
                                      }

                                      <div className="icon-drop">
                                        <button onClick={() => onClickBtnDropDownRemove(item._id,
                                          true)}><i className="icon-3dots"></i></button>
                                        {
                                          item._id === facultyId && (
                                            <div
                                              ref={dropdownRef}
                                              className={`popup ${isActive ? "active" : "inactive"
                                                }`}
                                            >
                                              <ul className="droplist">
                                                {
                                                  item.isStatus === "Accepted" ?
                                                    <li>
                                                      <button onClick={() => ShowCanclePopup(item)}>
                                                        <i className="icon-close"></i> Cancel Booking
                                                      </button>
                                                    </li> : ""
                                                }


                                                <li>
                                                  <button onClick={() => ShowdetailPopup(item)}>
                                                    <i className="icon-Details"></i>View Details
                                                  </button>
                                                </li>

                                                <li>
                                                  <button onClick={() => ShowHandlePopup(item)}>
                                                    <i className="icon-Edit" ></i>Edit Details
                                                  </button>
                                                </li>
                                              </ul>
                                            </div>
                                          )
                                        }
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>)
                          }))
                          : <NoDataAvailable title="No Records Found." />
                        }
                      </>
                    )
                  }
                </div>
                <AddAppointmentPopup onCloseAddedit={() => onCloseAddedit()} addEditRef={addEditRef} viewDetails={viewDetails} edit={editAppointment} />
                <ViewDetailPopup onCloseViewDetails={() => onCloseViewDetails()} viewDetailRef={viewDetailRef} viewDetails={viewDetails} />
                <CancelBookingPopup onCloseCancel={() => onCloseCancel()} cancelBokingRef={cancelBokingRef} viewDetails={viewDetails} />
                <RejectBookingPopup onCloseRejeact={() => onCloseRejeact()} RejectBokingRef={RejectBokingRef} viewDetails={viewDetails} />
              </div>
            </div>
          </div>
        </div>



      </div>


    </React.Fragment>
  )
}

export default Bookinglist