import React, { useState, useRef, useEffect } from 'react'
import Breadcrumb from '../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem';
import GrayAuthTheme from '../../../Common/Theme/GrayAuthTheme';
import Booking from "../../../assets/Icons/icon-Booking.svg"
import Cancellation from "../../../assets/Icons/icon-Cancellation.svg"
import Rescheduling from "../../../assets/Icons/icon-Rescheduling.svg"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./bookAppointment.style.scss";
import { getServicePolicyData, postPolicyData, editPolicyData } from '../../../store/actions/bookAppointment';
import FormTextArea from '../../../Common/Form/FormTextArea';
import { showSuccessPopup } from '../../../store/actions/successmessagepopup';

const BookingSetting = () => {
  const history = useNavigate();
  const dispatch = useDispatch()
  const dropdownRef = useRef(null);
  const [showPolicy, setHidePolicy] = useState(-1);
  const [textareavalue, setTextAreaValue] = useState("")
  const [BookingPolicy, setBookingPolicy] = useState("")
  const [CancellationPolicy, setCancellationPolicy] = useState("")
  const [ReschedulingPolicy, setReschedulingPolicy] = useState("")

  const { ownerID, insID, postBookingSettingLoading, getPolicySuccess, getPolicyData, businesstype } = useSelector((state) => {
    return {
      insID: state.user.user_institute,
      ownerID: state.user._id,
      businesstype: state.user.user_business_type,
      getPolicyData: state.bookAppointment.getBookServiceList.data,
      getPolicySuccess: state.bookAppointment.getBookServiceList.success,
      getPolicyLoading: state.bookAppointment.getBookServiceList.loading,
      postBookingSettingLoading: state.bookAppointment.createBookServiceList.loading
    }
  })

  useEffect(() => {
    if (getPolicySuccess && getPolicyData) {
      setBookingPolicy(getPolicyData.booking)
      setCancellationPolicy(getPolicyData.cancellation)
      setReschedulingPolicy(getPolicyData.rescheduling)
    }
  }, [getPolicySuccess, getPolicyData])

  let policydata = {
    institute: insID,
    owner: ownerID,
    booking: BookingPolicy,
    cancellation: CancellationPolicy,
    rescheduling: ReschedulingPolicy,
    business: insID
  }

  const handleSave = () => {
    if (getPolicyData && getPolicyData._id && getPolicySuccess) {
      dispatch(editPolicyData(getPolicyData._id, businesstype, policydata))
    } else {
      dispatch(postPolicyData(businesstype, policydata))
    }



    history("/bookingservices/book-appointment-list")

    dispatch(showSuccessPopup(" Fields Successfully created !"))
  }
  const handleCancle = () => {
    history("/bookingservices/book-appointment-list")
  }

  useEffect(() => {
    dispatch(getServicePolicyData(ownerID, insID, businesstype))
  }, [dispatch])

  function PolicyHandle(index, item) {
    setHidePolicy(showPolicy === index ? -1 : index);
    setTextAreaValue(item)
  }

  const CategoryList = [
    { category: "Booking Policy", policy: "Add Booking Policies", "icon": Booking, name: "BookingPolicy" },
    { category: "Cancellation Policy", policy: "Add Cancellation Policies", "icon": Cancellation, name: "CancellationPolicy" },
    { category: "Rescheduling Policy", policy: "Add Rescheduling Policies", "icon": Rescheduling, name: "ReschedulingPolicy" },
  ]


  return (
    <React.Fragment>
      <div className="">
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          {/* <BreadcrumbItem to="/bookingservices/book-appointment-list" title="Book Appointments" /> */}
          <BreadcrumbItem to="/bookingservices/booking-setting" title="Term & Policy" />
        </Breadcrumb>
        <div className="mt-10">
          <div className='PHT-bookAppointments mb-20 border-bottom'>
            <div>
              <h1>Policy Settings</h1>
              <p>Manage your policy settings, terms of service and more. </p>
            </div>
            <div className="PTH-Item">
              <button className="button btn-o-primary primary btn-sm bg-lightblue" onClick={handleCancle}>Cancel</button>

              {postBookingSettingLoading ? (
                <button className="button button-primary btn-sm" >Saving...</button>
              ) : (
                <button className="button button-primary btn-sm" onClick={() => handleSave()}>Save</button>
              )}

            </div>
          </div>
          <div className="service-setting mb-20">
            <h4 className='probottom'>Policy List</h4>

            <div>
              {CategoryList.map((item, index) => {
                return (
                  <article
                    key={index}
                    id={index}
                    className={`${showPolicy === index ? "active" : ""}`}
                  >
                    <div className="settingHead" onClick={() => PolicyHandle(index, item.name)}>
                      <h5><img src={item.icon} alt="icons" /> {item.category}</h5>
                      {showPolicy === index ?
                        <span className="close_setting_icon mr-5">&#10095;</span>
                        : <span className="open_setting_icon mr-5">&#10095;</span>}
                    </div>
                    {showPolicy === index ?
                      (<div className="setting-card">
                        <h5>{item.policy}</h5>
                        <div>
                          <label >
                            {
                              textareavalue === "BookingPolicy" &&
                              <textarea
                                value={BookingPolicy}
                                onChange={(e) => setBookingPolicy(e.target.value)}
                                className="card"
                              />
                            }
                            {
                              textareavalue === "CancellationPolicy" &&
                              <textarea
                                value={CancellationPolicy}
                                onChange={(e) => setCancellationPolicy(e.target.value)}
                                className="card"
                              />
                            }
                            {
                              textareavalue === "ReschedulingPolicy" &&
                              <textarea
                                value={ReschedulingPolicy}
                                onChange={(e) => setReschedulingPolicy(e.target.value)}
                                className="card"
                              />
                            }
                          </label>
                        </div>
                      </div>) : ""}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default BookingSetting