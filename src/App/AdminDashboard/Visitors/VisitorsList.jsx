/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NoDataAvailable from '../../../Common/NoDataAvailable';
import BackgroundDefault from "../../../assets/images/img/BackgroundDefault.png"
import { useDetectOutsideClick } from '../../../Common/DetectOutsideClick/useDetectOutsideClick';
import FormTextArea from '../../../Common/Form/FormTextArea';
import { canceledStatus, checkOut, resetEditVisitorDetail } from '../../../store/actions/visitorManagement';
import ValidationUtils from '../../../Classes/ValidationUtils';
import ValidationFile from '../../../Classes/ValidationFile';
import Popup from '../../../Common/Popup';
import FormError from '../../../Common/Form/FormError';
import './guardVistor.style.scss'
import ImageViewer from '../../../Common/ImageViewer';


const VisitorsList = ({ visitors, visitorList }) => {

  const [visitorId, setVisitorId] = useState();
  const [cancelToggle, setCancelToggle] = useState(-1);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelReasonError, setCancelReasonError] = useState("");
  const [showMoreToggle, setshowMoreToggle] = useState(-1);
  const [checkOutPopup, setcheckOutPopup] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const CheckOutPopToggleRef = useRef();
  let history = useNavigate();
  let dispatch = useDispatch();

  const { editVisitorSuccess, editVisitorLoading } = useSelector((state) => {
    return {
      editVisitorSuccess: state.visitorManagement.editVisitor.success,
      editVisitorLoading: state.visitorManagement.editVisitor.loading
    };
  })

  const handleEdit = (e, id) => {
    history(`/edit-visitor/${id}`);
  }

  const handleViewDetail = (e, id) => {
    history(`/print-visitor-detail/${id}/view`);
  }
  const handlePrintDetail = (e, id) => {
    history(`/print-visitor-detail/${id}/print`)
  }

  const handleCancelButton = (id) => {
    setVisitorId(id);
    setIsFilled(false)
    setCancelToggle(cancelToggle === id ? -1 : id);
  };

  const handleCancelPopupNo = () => {
    setCancelToggle(-1);
  }
  useEffect(() => {
    dispatch(resetEditVisitorDetail());
    if (editVisitorSuccess && !isFilled) {
      setIsFilled(true)
      setCancelToggle(-1);
    }
  }, [editVisitorSuccess])

  const handleCheckout = (id) => {
    dispatch(checkOut(id, { check_out: new Date() }));
  }

  const handleShowMore = (id) => {
    setshowMoreToggle(showMoreToggle === id ? -1 : id);
  }

  const handleShowLess = () => {
    setshowMoreToggle(-1);
  }

  const handleCancelReasonInput = (e) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    setCancelReason(value);
    setCancelReasonError(ValidationUtils.isEmpty(value));
  }
  const handleCancelPopupYes = () => {
    if (ValidationUtils.isEmpty(cancelReason)) {
      setCancelReasonError(true);
    }

    if (!ValidationUtils.isEmpty(cancelReason)) {
      dispatch(canceledStatus(visitorId, { status: "cancelled", cancel_reason: cancelReason }));
    }
  }

  const handleCheckoutButton = () => {
    dispatch(checkOut(visitorId, { check_out: new Date() }));
  }
  // CheckIn / CheckOut
  const [ToggleSectionTitle, SetToggleSectionTitle] = useState(false)
  const [onlineShow, setOnlineShow] = useState(false)

  const handleClick = (_id) => {
    setOnlineShow(_id);
    SetToggleSectionTitle(!ToggleSectionTitle);
  };

  return (
    <React.Fragment>
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-3">Guest Details</li>
          <li className="col col-4">Check-In & Check-Out Time</li>
          <li className="col col-2">Status</li>
          <li className="col col-2">Visit Reason</li>
          {/* <li className="col col-2">Rejected Reason</li> */}

          <li className="col col-3">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {visitors.success ?
            visitorList.length ? visitorList.map((visitorsData) => {
              return (
                <div className="gridRow">
                  <ul className="topInfo topInfoPosition">
                    <li className="col col-3 " data-head="Visitor Details">
                      <div>
                        <div className="userDetails">
                          <div className='profileCircle'>
                            <ImageViewer
                              className="TableThumbnail visitorImg"
                              object={visitorsData.photo
                              }
                              defaultImage={BackgroundDefault}
                            />
                          </div>
                          <div className='profileDetails'>
                            <div className='profile-name'>
                              <p className=" primary text-xxs w-600">{visitorsData.name}</p>
                            </div>
                            <div className='profile-email mt-5'>
                              <p className="base text-2xs ">{visitorsData.visitor_email}</p>
                            </div>
                            <div className='profile-phone'>
                              <p className="base text-2xs mt-2"> {visitorsData.visitor_contact_no ? `${visitorsData.visitor_country_code}-${visitorsData.visitor_contact_no}` : ""}</p>
                            </div>
                            <div className="primary">
                              <p className='base text-2xs mt-5'>Guest's Count: {visitorsData.no_of_visit_person}</p>
                            </div>
                          </div>
                        </div>
                        <button
                          className={`btnText BtnCaret   text-xxs w-300 
                              ${ToggleSectionTitle && visitorsData._id === onlineShow
                              ? `active`
                              : ``
                            }`}
                          onClick={() => handleClick(visitorsData._id, false)}
                        >
                          {ToggleSectionTitle && visitorsData._id === onlineShow
                            ? `Show Less`
                            : `Show More`}
                        </button>
                      </div>
                    </li>
                    <li className="col col-4 " data-hea="Host Details">
                      <div>
                        <div>
                          <p className='w-500 primary text-xxs'>Check-In</p>
                          {visitorsData.check_in ?
                            <>
                              <p className="base text-2xs mt-5">
                                {moment(visitorsData.check_in).format("DD-MM-YYYY")}
                              </p>
                              <p className="base text-2xs mt-5">
                                {moment(visitorsData.check_in).format("hh:mm a")}
                              </p>
                            </>
                            : ""
                          }
                        </div>
                        <div>
                          <p className='w-500 primary text-xxs'>Check-out</p>
                          {visitorsData.check_out ?
                            <>
                              <p className="base text-2xs mt-5">
                                {moment(visitorsData.check_out).format("DD-MM-YYYY")}
                              </p>
                              <p className="base text-2xs mt-5">
                                {moment(visitorsData.check_out).format("hh:mm a")}
                              </p>
                            </>
                            : ""
                          }
                        </div>
                      </div>


                    </li>
                    <li className="col col-2 " data-head="Status">
                      <div className="visitorstatus">
                        <p className={`capitalize ${visitorsData.status ?
                          visitorsData.status.toLowerCase() === "rejected" ? "rejected"
                            : visitorsData.status.toLowerCase() === "approved" ? "approved"
                              : visitorsData.status.toLowerCase() === "pending" ? "pending" : ""
                          : ""}`}>{visitorsData.status}</p>
                      </div>

                    </li>
                    <li className="col col-2 " data-head="Visit Reason">
                      <p  className="base text-2xs mt-2"

                        dangerouslySetInnerHTML={{
                          __html:
                          visitorsData?.visit_reason
                        }}
                      ></p>
                      {/* <p className="base text-2xs mt-2">{visitorsData.visit_reason}</p> */}
                    </li>
                    {/* <li className="col col-2" data-head="Reject Reason">
                      <p className="otherText primary w-500">{visitorsData.reject_reason}</p>
                    </li> */}
                    <li className="col col-3  actionCols" >
                      <div className="actionBtn">
                        {visitorsData.status !== "pending" ? "" :
                          <button
                            className="btn-square"
                            title="Edit"
                            onClick={(e) => handleEdit(e, visitorsData._id)}
                          >
                            <span className="cssIcon">
                              <i className="ed-pen"></i>
                            </span>
                          </button>}


                        {visitorsData.status === "cancelled" || visitorsData.status === "rejected" || visitorsData.check_out
                          ?
                          ""
                          :
                          <button
                            className="btn-square"
                            title="Cancel"
                            onClick={() => handleCancelButton(visitorsData._id)}

                          >
                            <span className="cssIcon">
                              <i className="ed-trash"></i>
                            </span>
                          </button>}



                        {visitorsData.check_in && !visitorsData.check_out && visitorsData.status === "approved" ?
                          <button
                            className="btn-square"
                            title="Check Out"
                            onClick={() => handleCheckout(visitorsData._id)}
                          >
                            <span className="cssIcon">
                              <i className="ed-vistor-arrow-right-r"></i>
                            </span>
                          </button>
                          :
                          ""}

                        {visitorsData._id === visitorId && checkOutPopup &&
                          <React.Fragment>
                            <Popup
                              show={checkOutPopup}
                              removeButtonLabel={"Check-Out"}
                              cancelButtonLabel={"No, Cancel"}
                              leaveRequest={true}
                              RemoveProp={handleCheckoutButton}
                              loading={editVisitorLoading}
                              RemovePopToggleRef={CheckOutPopToggleRef}
                              CancelProp={() => setcheckOutPopup(!checkOutPopup)}
                            >
                              <p className="gray text-xxs w-300">
                                You are about to cancel the request.
                              </p>
                              <p className="dgray text-xxs w-400">Are you sure?</p>
                            </Popup>
                          </React.Fragment>
                        }
                        <button
                          className="btn-square"
                          title="print"
                          type="button"
                          onClick={(e) => handlePrintDetail(e, visitorsData._id)}
                        >
                          <span className="cssIcon">
                            <i className="ed-printer"></i>
                          </span>
                        </button>
                        <button
                          className="btn-square"
                          title=" View "
                          type="button"
                          onClick={(e) => handleViewDetail(e, visitorsData._id)}
                        >
                          <span className="cssIcon">
                            <i className="ed-eye"></i>
                          </span>
                        </button>
                      </div>
                    </li>
                    <div className='visitorListPopUp'>
                      {visitorsData._id === cancelToggle && (
                        <div className='cancelExamPopup popup removePopup active '>
                          <p className="text-xxs ">
                            Cancel Request!!
                          </p>
                          <p className="  text-xxs red w-500">
                            Are you sure?
                          </p>
                          <div className=" mt-5">
                            <FormTextArea
                              onChange={handleCancelReasonInput}
                              onKeyUp={handleCancelReasonInput}
                              value={cancelReason}
                            />
                            <FormError
                              show={cancelReasonError}
                              error="Reason cannot be empty."
                              className='guardCancelPopUpError'
                            />
                          </div>
                          <div className="removePopBtn pt-0 mt-5">
                            <button
                              className="button btn-o-silver dgray btn-sm"
                              onClick={() => handleCancelPopupNo()}
                            >
                              No
                            </button>
                            {editVisitorLoading ?
                              <button
                                className="button button-red btn-sm"
                              >
                                Cancelling...
                              </button>
                              :
                              <button
                                className="button button-red btn-sm"
                                onClick={() => handleCancelPopupYes()}
                              >
                                Yes, Cancel
                              </button>}
                          </div>
                        </div>
                      )}
                    </div>

                  </ul>
                  {visitorsData._id === onlineShow && ToggleSectionTitle && (
                    <React.Fragment>
                      <ul class="topInfo">
                        <li className="col col-4">
                          <p className="w-500 primary text-xxs">
                            Rejected Reason
                          </p>
                          <p className="otherText primary w-500">{visitorsData.reject_reason}</p>
                        </li>
                      </ul>
                    </React.Fragment>
                  )}
                </div>
              )
            }) :
              <NoDataAvailable title="No Records Found." />
            :
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          }
        </div>
      </div>

    </React.Fragment>
  );
};

export default VisitorsList;
