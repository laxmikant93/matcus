import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment';
import SearchControl from '../../../Common/SearchControl';
import NoDataAvailable from '../../../Common/NoDataAvailable';
import SingleSelectDropdown from '../../../Common/Form/SingleSelectDropdown';
import { useDispatch, useSelector } from 'react-redux';
import "./bookappointmentUser.scss";
import { getBookinguserListSearch, getuserBookingList, getUserBookingListSort } from '../../../store/actions/bookAppoinmentUserSide';
import { getAllMainServiceList } from '../../../store/actions/bookAppointment';
import AppLinkUrl from '../../../Common/AppLink/AppLinkUrl';
import { NavLink } from 'react-router-dom';
const MyBooking = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceIDArr, setServiceIDArr] = useState([]);
  const { institute, users, getBookingListData, serviceListData, getBookingListSuccess, businesstype, subdomainInstitute, subdomainUserID, subdomainBusinesstype } = useSelector((state) => {
    return {
      users: state.user,
      institute: state.user.user_institute,
      businesstype: state.user.user_business_type,
      subdomainInstitute: state.subdomainuser.user_institute,
      subdomainUserID: state.subdomainuser._id,
      subdomainBusinesstype: state.subdomainuser.user_business_type,
      serviceListloading: state.bookAppointment.getallServiceList.loading,
      serviceListsuccess: state.bookAppointment.getallServiceList.success,
      serviceListData: state.bookAppointment.getallServiceList.data,
      getBookingListLoading: state.bookAppointmentUserside.getusermylist.loading,
      getBookingListData: state.bookAppointmentUserside.getusermylist.data,
      getBookingListSuccess: state.bookAppointmentUserside.getusermylist.success,
      edituserBookingListData: state.bookAppointmentUserside.edituserBookingList.data,
      edituserBookingListSuccess: state.bookAppointmentUserside.edituserBookingList.success,
    };
  })


  useEffect(() => {
    if (AppLinkUrl.privateDomain()) {
      dispatch(getAllMainServiceList(institute, businesstype))
    } else {
      dispatch(getAllMainServiceList(subdomainInstitute, subdomainBusinesstype))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (AppLinkUrl.privateDomain()) {
      dispatch(getuserBookingList(users._id, [serviceIDArr], businesstype));
    } else {
      dispatch(getuserBookingList(subdomainUserID, [serviceIDArr], subdomainBusinesstype));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (serviceListData && serviceListData.length > 0) {
      let array = []
      serviceListData && serviceListData.map((item) => {
        array.push(item._id)
      })
      setServiceIDArr([...array])
    }
  }, [serviceListData])

  const filterValues = ["sortOrder"];
  const selectGroup = [
    "upcomming",
    "Recent to Old",
    "Old to Recent"]

  const SingleSelectHandel = (value) => {
    // let inputValue = e.target.value;
    const inputValue = value
    switch (inputValue) {
      case "upcomming":
        dispatch(getUserBookingListSort(AppLinkUrl.privateDomain() ? users._id : subdomainUserID, "Upcomming", [serviceIDArr], AppLinkUrl.privateDomain() ? businesstype : subdomainBusinesstype));
        break;
      case "Recent to Old":
        dispatch(getUserBookingListSort(AppLinkUrl.privateDomain() ? users._id : subdomainUserID, "rto", [serviceIDArr], AppLinkUrl.privateDomain() ? businesstype : subdomainBusinesstype));
        break;
      case "Old to Recent":
        dispatch(getUserBookingListSort(AppLinkUrl.privateDomain() ? users._id : subdomainUserID, "otr", [serviceIDArr], AppLinkUrl.privateDomain() ? businesstype : subdomainBusinesstype));
        break;
      default:
        dispatch(getuserBookingList(AppLinkUrl.privateDomain() ? users._id : subdomainUserID, [serviceIDArr], AppLinkUrl.privateDomain() ? businesstype : subdomainBusinesstype));
    }
  };

  useEffect(() => {
    if (searchTerm) {
      dispatch(getBookinguserListSearch(AppLinkUrl.privateDomain() ? users._id : subdomainUserID, [serviceIDArr], searchTerm, AppLinkUrl.privateDomain() ? businesstype : subdomainBusinesstype));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, users, searchTerm]);

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
  return (
    <React.Fragment>
      <div className="mybooking-wrap">
        <div className='booklistwrapper'>
          <div className="bookhead">
            <div>
              <NavLink to="/" className='booktext'>
                <h1><span className="arrow-icon">&#x2794;</span> Back to Home</h1>
              </NavLink>
            </div>
            <div>
              <SearchControl
                classNameWrappper="tableSearchbar"
                id="search"
                onChange={searchInputHandel}
                reset={() => setSearchTerm("")}
                // onKeyUp={(evt) => searchInputHandel(evt)}
                // onChange={(evt) => searchInputHandel(evt)}
                name="search"
                placeholder={"Search..."}
              />
            </div>
            {/* <div className="PTH-Item">
              <SingleSelectDropdown
                selectGroup={selectGroup}
                filterValues={filterValues}
                SingleSelectHandel={SingleSelectHandel}
              />
            </div> */}
            <div className="PTH-Item">
              <SingleSelectDropdown
                selectGroup={selectGroup}
                filterValues={filterValues}
                SingleSelectHandel={SingleSelectHandel}
              />
            </div>
          </div>
          <div className="timetable">
            <div className="gridListTable">
              <ul className='gridHeader'>
                <li className='col col-3'>Name</li>
                <li className='col col-2'>Date </li>
                <li className="col col-2">Service</li>
                {/* <li className="col col-2">Doctor</li> */}
                <li className='col col-2'>Time Slot </li>
                <li className='col col-2'>Status</li>
                {/* <li className='col col-2'></li> */}
              </ul>
              <div className="gridBody">

                <>
                  {getBookingListSuccess ? (getBookingListData && getBookingListData.length ? (
                    getBookingListData.map((item) => {
                      return (
                        <div className="gridRow">
                          <ul className={`topInfo ${false ? "reject_row" : ""}`}>
                            <li className='col col-3 textName' >{item.full_name}</li>
                            <li className='col col-2 text-font'>{moment(item.booking_date).format("DD-MM-YYYY")}</li>
                            <li className='col col-2 text-font'>{item.servicename}</li>
                            <li className='col col-2 text-font'>{item.booking_time}
                            </li>
                            <li className={`col col-2 text-font default ${item.isStatus === "Rejected" ? "reject" : ""}  ${item.isStatus === "Accepted" ? "Accepted" : ""}`}>{item.isStatus === "Pending" ? "Upcomming" : item.isStatus}
                            </li>
                            {/* <li className='col col-2 text-font'>
                              <div className="buttonGroup">
                                {item.isStatus === "Pending" || item.isStatus === "Accepted" ? <button onClick={() => handleCancel(item._id)}>Cancel</button> : ""}
                                <button>Reschedule</button>
                              </div>
                            </li> */}
                          </ul>
                        </div>)
                    }))
                    : <NoDataAvailable title="No Records Found." />
                  ) : (<div className="loadingGridData">
                    <i className="ed-loadingGrid"></i>
                  </div>)}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default MyBooking