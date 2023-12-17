// import moment from 'moment';
// import React, { useEffect, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import ValidationFile from '../../../Classes/ValidationFile';
// import ValidationUtils from '../../../Classes/ValidationUtils';
// import FormError from '../../../Common/Form/FormError';
// import FormTextArea from '../../../Common/Form/FormTextArea';
// import NoDataAvailable from "../../../Common/NoDataAvailable";
// import Popup from '../../../Common/Popup';
// import { AppointmentStatus, resetEditAppointmentDetail } from '../../../store/actions/bookAppointment';

// const AppointmentsList = ({ appointments, appointmentList }) => {

//   const [appointmentId, setAppointmentId] = useState("");
//   const [acceptPopupToggle, setAcceptPopupToggle] = useState(-1);
//   const [rejectPopupToggle, setRejectPopupToggle] = useState(-1);
//   const [showMoreToggle, setshowMoreToggle] = useState(-1);
//   const [notifyPopupToggle, setNotifyPopupToggle] = useState(-1);
//   const [isFilled, setIsFilled] = useState(false);
//   const [reject_Reason, setReject_Reason] = useState("");
//   const [reject_ReasonError, setReject_ReasonError] = useState("");

//   // eslint-disable-next-line no-unused-vars
//   let history = useNavigate();
//   let dispatch = useDispatch();
//   const AcceptRejectPopToggleRef = useRef();

//   const { editAppointmentSuccess, editAppointmentLoading } = useSelector((state) => {
//     return {
//       editAppointmentSuccess: state.bookAppointment.editAppointment.success,
//       editAppointmentLoading: state.bookAppointment.editAppointment.loading
//     };
//   })

//   const handleAcceptPopup = (id) => {
//     setAppointmentId(id);
//     setAcceptPopupToggle(acceptPopupToggle === id ? -1 : id);
//     setRejectPopupToggle(-1);
//     setNotifyPopupToggle(-1);
//   }

//   const handleAcceptButton = () => {
//     dispatch(AppointmentStatus(appointmentId, { isStatus: "Accepted" }, "accept"));
//     setIsFilled(false);
//   }

//   const handleRejectPopup = (id) => {
//     setAppointmentId(id);
//     setRejectPopupToggle(rejectPopupToggle === id ? -1 : id);
//     setReject_Reason("");
//     setReject_ReasonError("");
//     setAcceptPopupToggle(-1);
//     setNotifyPopupToggle(-1);
//   }

//   const handleRejectPopupNo = () => {
//     setRejectPopupToggle(!rejectPopupToggle);
//     setReject_Reason("");
//     setReject_ReasonError("");
//   }

//   const handleRejectButton = () => {
//     if (ValidationUtils.isEmpty(reject_Reason)) {
//       setReject_ReasonError(true);
//     }

//     if (ValidationUtils.isNotEmpty(reject_Reason)) {
//       dispatch(AppointmentStatus(appointmentId, { isStatus: "Rejected" }, "reject"));
//       setIsFilled(false);
//     }

//   }

//   const handleRejectReasonInput = (e) => {
//     let inputValue = e.target.value;
//     let value = ValidationFile.spaceNotAccept(inputValue);
//     setReject_Reason(value);
//     setReject_ReasonError(ValidationUtils.isEmpty(value));
//   }

//   useEffect(() => {
//     dispatch(resetEditAppointmentDetail());
//     if (editAppointmentSuccess && !isFilled) {
//       setIsFilled(true);
//       setAcceptPopupToggle(-1);
//       setRejectPopupToggle(-1);
//       setNotifyPopupToggle(-1);
//     }
//   }, [dispatch, editAppointmentSuccess, isFilled])

//   const handleShowMore = (id) => {
//     setshowMoreToggle(showMoreToggle === id ? -1 : id);
//   }
//   const handleShowLess = () => {
//     setshowMoreToggle(-1);
//   }

//   const handleNotifyPopup = (id) => {
//     setAppointmentId(id);
//     setNotifyPopupToggle(notifyPopupToggle === id ? -1 : id);
//     setRejectPopupToggle(-1);
//     setAcceptPopupToggle(-1);
//   }

//   const handleNotifyButton = () => {
//     dispatch(AppointmentStatus(appointmentId, { isStatus: "Notified", emailNotify: "Yes" }, "notify"));
//     setIsFilled(false);
//   }

//   return (
//     <React.Fragment>
//       <div className="gridListTable">
//         <ul className="gridHeader">
//           <li className="col col-3">User Details</li>
//           <li className="col col-2">Category & Sub-Category</li>
//           <li className="col col-2">Status</li>
//           <li className="col col-2">Booking Date & Time</li>
//           <li className="col col-2">&nbsp;</li>
//         </ul>
//         <div className="gridBody">
//           {appointments.success ?
//             appointmentList.length ? appointmentList.map((item) => {
//               return (
//                 <div className="gridRow">
//                   <ul className="topInfo">
//                     <li className="col col-3 " data-head="Title & Description">
//                       <p className="primary text-xxs w-600">{item.name}</p>
//                       <p className='base text-2xs mt-5 '>{item.email}</p>
//                       <p className='base text-2xs'>{item.contact && `${item.countryCode} - ${item.contact}`}</p>
//                     </li>


//                     <li className="col col-2" data-head="Status">
//                       <div>
//                         <p className="primary text-xxs w-600">Category:</p>
//                         <p className='base text-2xs'>{item.category}</p>
//                         <p className="primary text-xxs w-600 mt-5">Sub-Category:</p>
//                         <p className='base text-2xs'>{item.sub_category}</p>
//                       </div>
//                     </li>
//                     <li className="col col-2" data-head="Status">
//                       <div>
//                         <p className='base text-2xs'>{item.isStatus}</p>
//                       </div>
//                     </li>
//                     <li className="col col-2" data-head="Status">
//                       <div>
//                         <p className='base text-2xs'>
//                           {moment(item.booking_date_time).format("DD-MM-YYYY")}</p>
//                         <p className='base text-2xs'>
//                           {moment(item.booking_date_time).format("hh:mm a")}
//                         </p>
//                       </div>
//                     </li>
//                     <li className="col col-2 actionCols">
//                       <div className="actionBtn">
//                         {item.isStatus !== "Pending" ?
//                           ""
//                           :
//                           <button
//                             className="btn-square"
//                             title="Accept"
//                             onClick={() => handleAcceptPopup(item._id)}
//                           >
//                             <span className="cssIcon">
//                               <i className="ed-check"></i>
//                             </span>
//                           </button>}

//                         {item.isStatus !== "Pending" ?
//                           ""
//                           :
//                           <button
//                             className="btn-square"
//                             title="Reject"
//                             onClick={() => handleRejectPopup(item._id)}
//                           >
//                             <span className="cssIcon">
//                               <i className="ed-cancel"></i>
//                             </span>
//                           </button>}
//                       </div>
//                       {item.isStatus === "Accepted" || item.isStatus === "Notified" ?
//                         <button
//                           className="btn-square"
//                           title="Notify"
//                           onClick={() => handleNotifyPopup(item._id)}
//                         >
//                           <span className="cssIcon">
//                             <i className="ed-notify"></i>
//                           </span>
//                         </button> : ""}

//                       {item._id === acceptPopupToggle && (
//                         < React.Fragment >
//                           <Popup
//                             show={acceptPopupToggle}
//                             removeButtonLabel={"Accept"}
//                             cancelButtonLabel={"No, Cancel"}
//                             leaveRequest={true}
//                             RemoveProp={handleAcceptButton}
//                             loading={editAppointmentLoading}
//                             RemovePopToggleRef={AcceptRejectPopToggleRef}
//                             CancelProp={() => setAcceptPopupToggle(!acceptPopupToggle)}
//                           >
//                             <p className="gray text-xxs w-300">
//                               You are about to accept this appointment.
//                             </p>
//                             <p className="dgray text-xxs w-400">Are you sure?</p>
//                           </Popup>
//                         </React.Fragment>
//                       )}

//                       {item._id === rejectPopupToggle && (
//                         < React.Fragment >
//                           <div className='Popup RemovePopup active'>
//                             <p className="text-xxs">
//                               Reject Appointment!!
//                             </p>
//                             <p className="red text-xxs w-500">
//                               Are you sure?
//                             </p>
//                             <div className="formFieldwrap mt-5">
//                               <FormTextArea
//                                 onChange={handleRejectReasonInput}
//                                 onKeyUp={handleRejectReasonInput}
//                                 value={reject_Reason}
//                               />
//                               <FormError
//                                 show={reject_ReasonError}
//                                 error="Reason cannot be empty."
//                               />
//                             </div>
//                             <div className="removePopBtn pt-0 mt-0">
//                               <button
//                                 className="button btn-o-silver dgray btn-sm"
//                                 onClick={() => handleRejectPopupNo()}
//                               >
//                                 No, Cancel
//                               </button>
//                               {editAppointmentLoading ?
//                                 <button
//                                   className="button button-red btn-sm"
//                                 >
//                                   Rejecting...
//                                 </button>
//                                 :
//                                 <button
//                                   className="button button-red btn-sm"
//                                   onClick={() => handleRejectButton()}
//                                 >
//                                   Reject
//                                 </button>}
//                             </div>
//                           </div>
//                         </React.Fragment>
//                       )}

//                       {item._id === notifyPopupToggle && (
//                         < React.Fragment >
//                           <Popup
//                             show={notifyPopupToggle}
//                             removeButtonLabel={"Notify"}
//                             cancelButtonLabel={"No, Cancel"}
//                             leaveRequest={true}
//                             RemoveProp={handleNotifyButton}
//                             loading={editAppointmentLoading}
//                             RemovePopToggleRef={AcceptRejectPopToggleRef}
//                             CancelProp={() => setNotifyPopupToggle(!notifyPopupToggle)}
//                           >
//                             <p className="gray text-xxs w-300">
//                               You are about to notify.
//                             </p>
//                             <p className="dgray text-xxs w-400">Are you sure?</p>
//                           </Popup>
//                         </React.Fragment>
//                       )}
//                     </li>
//                   </ul>
//                   <div className='col'>
//                     {showMoreToggle === item._id ?
//                       <span className="text-xxs gray w-400" onClick={() => handleShowLess()}>Show Less</span>
//                       :
//                       <span className="text-xxs gray w-400" onClick={() => handleShowMore(item._id)}>Show More</span>}
//                   </div>

//                   <ul className='topInfo topInfoalignTop'>
//                     {showMoreToggle === item._id ?
//                       <>
//                         <li className='col col-3'>
//                           <div>
//                             <p className="otherText primary w-500">Address:</p>
//                             <>
//                               <p className='base text-2xs mt-5'>{item.address}</p></>
//                           </div>
//                         </li>
//                         <li className='col col-4'>
//                           <div>
//                             <p className="otherText primary w-500">Appointment Reason:</p>
//                             <>
//                               <p className='base text-2xs mt-5'>{item.appointment_reason}</p>
//                             </>

//                           </div>
//                         </li>
//                         <li className='col col-4'>
//                           <div>
//                             <p className="otherText primary w-500">Reject Reason:</p>
//                             <p className='base text-2xs mt-5'>{item.reject_reason}</p>
//                           </div>

//                         </li>
//                       </>
//                       :
//                       ""}
//                   </ul>
//                 </div>
//               )
//             })
//               :
//               <NoDataAvailable title="No Records Found." />
//             :
//             <div className="loadingGridData">
//               <i className="ed-loadingGrid"></i>
//             </div>
//           }

//         </div>
//       </div>
//     </React.Fragment>
//   );
// }

// export default AppointmentsList;