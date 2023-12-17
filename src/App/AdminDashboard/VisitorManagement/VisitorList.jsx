/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import FormTextArea from '../../../Common/Form/FormTextArea'
import NoDataAvailable from '../../../Common/NoDataAvailable'
import DummyProfile from "./DummyProfile.png";
import TeacherTheme from '../../../Common/Theme/StudentTheme';
import { useDispatch } from 'react-redux';
import moment from 'moment'
import { editVisitorDetail, VisitorStatus } from '../../../store/actions/visitorManagement';
import { showSuccessPopup } from '../../../store/actions/successmessagepopup';
import ValidationUtils from '../../../Classes/ValidationUtils';
import FormError from '../../../Common/Form/FormError';
import ValidationFile from '../../../Classes/ValidationFile';
import ImageViewer from '../../../Common/ImageViewer';

const VisitorList = ({ teacherVisitorListData, teacherVisitor, currentDate }) => {

  const dispatch = useDispatch()
  const [inputState, setInputState] = useState(false);
  const handleStatus = (e, id) => {
    let inputValue = e.target.value;
    if (inputValue === "rejected") {
      setInputState(inputState == id ? -1 : id)
    } else {
      setInputState("")
    }
    if (inputValue === "approved") {
      dispatch(VisitorStatus(id, { status: inputValue, reject_reason: "", check_in: new Date() })) //app
      dispatch(showSuccessPopup("Visitor Status updated."));
    }

  }
  const [rejectReason, setrejectReason] = useState("")
  // const rejectPatchData = () => {
  //   return {
  //     reject_reason: rejectReason
  //   }
  // }
  const [cancelReasonError, setCancelReasonError] = useState(false)
  const handleChangeReason = (e) => {
    let inputValue = e.target.value
    let value = ValidationFile.spaceNotAccept(inputValue);
    setrejectReason(value)
    setCancelReasonError(ValidationUtils.isEmpty(value));
  }
  const handleSubmit = (id) => {
    if (ValidationUtils.isEmpty(rejectReason)) {
      setCancelReasonError(true)
    }
    if (!ValidationUtils.isEmpty(rejectReason)) {
      dispatch(VisitorStatus(id, { status: "rejected", reject_reason: rejectReason }))
      dispatch(showSuccessPopup("Visitor Status updated."));
      setInputState("")
      setrejectReason("")
    }
  }
  const handleClose = () => {
    setInputState("")
    setrejectReason("")
  }


  const [ToggleSectionTitle, SetToggleSectionTitle] = useState(false)
  const [onlineShow, setOnlineShow] = useState(false)

  const handleClick = (_id) => {
    setOnlineShow(_id);
    SetToggleSectionTitle(!ToggleSectionTitle);
  };
  return (
    // <React.Fragment>
    <div className="gridListTable">
      <ul className="gridHeader">
        <li className="col col-3">Guest Details</li>
        <li className="col col-4"> Check-In & Check-Out Time</li>
        <li className="col col-2">  Status</li>
        <li className="col col-3">Visit Reason</li>
        {/* <li className="col col-2">Rejected Reason</li>
        <li className="col col-2">Cancelled Reason</li> */}
      </ul>
      <div className="gridBody">
        {teacherVisitor.success ? (teacherVisitorListData.length > 0 ? (
          teacherVisitorListData.map((item) => {
            return (
              <div className="gridRow">
                <ul className="topInfo">
                  <li className="col col-3" data-head="Students">
                    <div className="userDetails">
                      <div className="profileCircle">
                        <a
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ImageViewer
                            className="ListTableImg"
                            object={item.photo}
                            defaultImage={DummyProfile}
                          />
                        </a>
                      </div>
                      <div className="profileDetails">
                        <div className="profile-name">
                          <p className='primary text-xxs w-600'> {item.name}</p>

                        </div>
                        <div className="primary">
                          <p className='base text-2xs mt-5'>{item.visitor_email}</p>
                        </div>
                        <div className="primary">
                          <p className='base text-2xs mt-3'>
                            {item.visitor_contact_no ? `${item.visitor_country_code}-${item.visitor_contact_no}` : ""}
                          </p>
                        </div>
                        <div className="primary">
                          <p className='base text-2xs mt-5'>Guest's Count: {item.no_of_visit_person}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      className={`btnText BtnCaret   text-xxs w-300 
                              ${ToggleSectionTitle && item._id === onlineShow
                          ? `active`
                          : ``
                        }`}
                      onClick={() => handleClick(item._id, false)}
                    >
                      {ToggleSectionTitle && item._id === onlineShow
                        ? `Show Less`
                        : `Show More`}
                    </button>
                  </li>
                  <li className="col col-4"
                    data-head="Leave Date(s) & Status">

                    <p className='w-600'>Check-In:</p>
                    {item.check_in ? (<>
                      <div className="text-2xs primary mt-5 w-500">
                        {moment(item.check_in).format("DD-MMM-YYYY")}
                      </div>
                      <div className="text-2xs primary w-500">
                        {moment(item.check_in).format("hh:mm a")}
                      </div>
                    </>) : ""}
                    <p className='mt-8 w-600'>Check-Out:</p>
                    {item.check_out ?
                      <>
                        <div className="text-2xs primary mt-5 w-500">
                          {moment(item.check_out).format("DD-MMM-YYYY")}
                        </div>
                        <div className="text-2xs primary w-500">
                          {moment(item.check_out).format("hh:mm a")}
                        </div>
                      </>
                      : ""
                    }
                  </li>
                  <li className="col col-2">

                    {item.status === "cancelled" ? (<p className=" mt-3">Cancelled</p>
                    )
                      : item.status === "approved" ? <p className=" mt-3 secondary">Approved</p> :
                        item.status === "rejected" ? <p className=" mt-3 red">Rejected</p>
                          :
                          (
                            <div className="selectTextType mt-3">
                              <select className={
                                item.status === "approved"
                                  ? "secondary"
                                  : item.status === "rejected"
                                    ? "red"
                                    : ""}
                                value={item.status} onChange={(e) => handleStatus(e, item._id)}
                              >
                                <option value="pending" disabled>
                                  Pending </option>
                                <option value="approved" >Approved</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            </div>)
                    }
                    {inputState === item._id ? (
                      <React.Fragment>
                        <div className="reject-wrap">
                          <div className="RR-Textarea-Wapper">
                            <FormTextArea
                              rows="1"
                              type="text"
                              placeholder="Reject Reason"
                              maxLength="500"
                              value={rejectReason}
                              onChange={handleChangeReason}
                              TextareaBtmTxt="500"
                              className='otherText'
                            ></FormTextArea>
                            <FormError
                              show={cancelReasonError}
                              error="Reason cannot be empty."
                              className="visitorFormError"
                            />

                            <div className="RR-Textarea-Action buttonAction">
                              <button
                                className="button btn-3xs button-base"
                                onClick={() => handleSubmit(item._id)}
                              >
                                Submit
                              </button>
                              <button
                                className="button btn-3xs btn-o-red red"
                                onClick={handleClose}
                              >
                                Cancel
                              </button>
                            </div>

                          </div>
                        </div>

                      </React.Fragment>) : (
                      "")}
                  </li>
                  <li className="col col-3" data-head="Request Reason">
                    <div className="RR-Wrap">
                      <div className="RR-wrap-cnt text-2xs">
                        <p className='base text-2xs'
                          dangerouslySetInnerHTML={{
                            __html:
                              item?.visit_reason
                          }}
                        ></p>
                        {/* <p className='base text-2xs'>{item.visit_reason}</p> */}
                      </div>

                    </div>
                  </li>
                  {/* <li className="col col-2" data-head="Reject Reason">
                    <div className="RR-Wrap addVisitForm">
                      {inputState === item._id ? (
                        <React.Fragment>
                          <div className="RR-Textarea-Wapper">
                            <FormTextArea
                              rows="1"
                              type="text"
                              placeholder="Reject Reason"
                              maxLength="500"
                              value={rejectReason}
                              onChange={handleChangeReason}
                              TextareaBtmTxt="500"
                              className='otherText'
                            ></FormTextArea>
                            <FormError
                              show={cancelReasonError}
                              error="Reason cannot be empty."
                              className="visitorFormError"
                            />

                            <div className="RR-Textarea-Action buttonAction">
                              <button
                                className="button btn-xs button-base"
                                onClick={() => handleSubmit(item._id)}
                              >
                                Submit
                              </button>
                              <button
                                className="button btn-xs btn-o-red red"
                                onClick={handleClose}
                              >
                                Cancel
                              </button>
                            </div>

                          </div>

                        </React.Fragment>) : (
                        "")}
                      <div className="RR-wrap-cnt text-2xs">
                        <p className='base text-2xs ' >  {item.reject_reason}</p>

                      </div>

                    </div>
                  </li>
                  <li className="col col-2" data-head="Reject Reason">
                    <div className="RR-Wrap">
                      {item.cancel_reason}
                    </div>
                  </li> */}
                </ul>

                {item._id === onlineShow && ToggleSectionTitle && (
                  <React.Fragment>
                    <ul class="topInfo">
                      <li className="col col-3">
                        <div>
                          <p className="w-500 primary  text-xxs">
                            Rejected Reason
                          </p>
                          <div className="RR-Wrap addVisitForm">

                            <div className="RR-wrap-cnt text-2xs">
                              <p className='base text-2xs ' >  {item.reject_reason}</p>

                            </div>

                          </div>
                        </div>
                      </li>

                      <li className="col col-3">
                        <div>
                          <p className="w-500 primary text-xxs">
                            Cancelled Reason
                          </p>
                          <div className="RR-Wrap">
                            {item.cancel_reason}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </React.Fragment>
                )}

              </div>
            )
          })
        ) : (

          <NoDataAvailable title="No Records Found." />
        )
        ) : (
          <div className="loadingGridData">
            <i className="ed-loadingGrid"></i>
          </div>
        )}
      </div>
    </div>
    // </React.Fragment>
  )
}

export default VisitorList